package com.gt.pro;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.TranslateAnimation;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;
import com.getcapacitor.BridgeWebViewClient;

import java.net.NetworkInterface;
import java.util.Collections;
import java.util.List;

@SuppressLint("SetJavaScriptEnabled")
public class MainActivity extends BridgeActivity {

    private static final String TAG = "MainActivity";
    private static final String CHANNEL_ID = "gt_security_alerts";

    // ===== In-App Browser Components =====
    private FrameLayout inAppBrowserContainer;
    private WebView inAppWebView;
    private TextView toolbarTitle;
    private TextView btnBack, btnForward;
    private ProgressBar browserProgress;
    private boolean isBrowserOpen = false;

    // ===== VPN Detection =====
    private ConnectivityManager connectivityManager;
    private ConnectivityManager.NetworkCallback vpnNetworkCallback;
    private boolean isExiting = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createNotificationChannel();

        connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);

        if (isVpnActive()) {
            handleVpnDetected();
            return;
        }

        registerVpnCallback();
        configureMainWebView();
        buildInAppBrowser();
    }

    @Override
    public void onStart() {
        super.onStart();
        configureMainWebView();
    }

    // =========================================================
    //  MAIN APP WEBVIEW CONFIGURATION
    // =========================================================
    private void configureMainWebView() {
        if (getBridge() == null || getBridge().getWebView() == null) return;

        WebView webView = getBridge().getWebView();
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);

        // Support window.open() — we intercept and show in our overlay
        webView.getSettings().setSupportMultipleWindows(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        // Spoof UA: drop "; wv" so educational sites don't block WebViews
        String ua = webView.getSettings().getUserAgentString();
        if (ua != null) {
            webView.getSettings().setUserAgentString(ua.replace("; wv", ""));
        }

        // Chrome client: intercept window.open() / target="_blank"
        webView.setWebChromeClient(new BridgeWebChromeClient(getBridge()) {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog,
                                          boolean isUserGesture, android.os.Message resultMsg) {
                // Capture the URL being opened via a dummy WebView transport
                WebView tempView = new WebView(view.getContext());
                tempView.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest req) {
                        openInAppBrowser(req.getUrl().toString());
                        return true;
                    }
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView v, String url) {
                        openInAppBrowser(url);
                        return true;
                    }
                });
                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(tempView);
                resultMsg.sendToTarget();
                return true;
            }
        });

        // WebViewClient: intercept ALL link clicks on external URLs
        webView.setWebViewClient(new BridgeWebViewClient(getBridge()) {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (isExternalUrl(url)) {
                    openInAppBrowser(url);
                    return true;
                }
                return super.shouldOverrideUrlLoading(view, request);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (isExternalUrl(url)) {
                    openInAppBrowser(url);
                    return true;
                }
                return super.shouldOverrideUrlLoading(view, url);
            }

            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler,
                                           android.net.http.SslError error) {
                handler.proceed(); // Proceed past SSL errors
            }
        });
    }

    /** Returns true for any real http(s) URL that is NOT the local app server */
    private boolean isExternalUrl(String url) {
        if (url == null) return false;
        return (url.startsWith("http://") || url.startsWith("https://"))
                && !url.contains("localhost")
                && !url.contains("127.0.0.1")
                && !url.startsWith("capacitor://");
    }

    // =========================================================
    //  BUILD IN-APP BROWSER OVERLAY
    //  Slides up from the bottom over the entire screen.
    //  Has a dark toolbar with: ← Back  → Fwd  [domain title]  ✕ Close
    //  Shows a coloured progress bar while the page loads.
    // =========================================================
    @SuppressLint("SetJavaScriptEnabled")
    private void buildInAppBrowser() {

        int TOOLBAR_HEIGHT_DP = 52;
        int PROGRESS_HEIGHT_DP = 3;

        // ---- Root container (full screen, z-order above everything) ----
        inAppBrowserContainer = new FrameLayout(this);
        inAppBrowserContainer.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        inAppBrowserContainer.setVisibility(View.GONE);
        inAppBrowserContainer.setBackgroundColor(Color.parseColor("#09090b"));

        // ---- TOOLBAR ----
        LinearLayout toolbar = new LinearLayout(this);
        toolbar.setOrientation(LinearLayout.HORIZONTAL);
        toolbar.setBackgroundColor(Color.parseColor("#18181b"));
        toolbar.setGravity(Gravity.CENTER_VERTICAL);
        toolbar.setPadding(dp(2), dp(0), dp(6), dp(0));
        FrameLayout.LayoutParams tbParams = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, dp(TOOLBAR_HEIGHT_DP));
        tbParams.gravity = Gravity.TOP;
        toolbar.setLayoutParams(tbParams);

        // Back button ←
        btnBack = makeToolbarBtn("←", 22);
        btnBack.setOnClickListener(v -> {
            if (inAppWebView != null && inAppWebView.canGoBack()) inAppWebView.goBack();
        });

        // Forward button →
        btnForward = makeToolbarBtn("→", 22);
        btnForward.setAlpha(0.3f);
        btnForward.setOnClickListener(v -> {
            if (inAppWebView != null && inAppWebView.canGoForward()) inAppWebView.goForward();
        });

        // Title (domain)
        toolbarTitle = new TextView(this);
        LinearLayout.LayoutParams titleParams =
                new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
        titleParams.setMargins(dp(8), 0, dp(8), 0);
        toolbarTitle.setLayoutParams(titleParams);
        toolbarTitle.setTextColor(Color.parseColor("#d4d4d8"));
        toolbarTitle.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f);
        toolbarTitle.setMaxLines(1);
        toolbarTitle.setEllipsize(android.text.TextUtils.TruncateAt.END);
        toolbarTitle.setGravity(Gravity.CENTER);
        toolbarTitle.setText("Opening...");

        // Close button ✕
        TextView btnClose = makeToolbarBtn("✕", 18);
        btnClose.setTextColor(Color.parseColor("#f87171")); // red close
        btnClose.setOnClickListener(v -> closeInAppBrowser());

        toolbar.addView(btnBack);
        toolbar.addView(btnForward);
        toolbar.addView(toolbarTitle);
        toolbar.addView(btnClose);

        // ---- PROGRESS BAR ----
        browserProgress = new ProgressBar(this, null,
                android.R.attr.progressBarStyleHorizontal);
        browserProgress.setMax(100);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            browserProgress.setProgressTintList(
                    android.content.res.ColorStateList.valueOf(Color.parseColor("#6366f1")));
        }
        FrameLayout.LayoutParams pbParams = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, dp(PROGRESS_HEIGHT_DP));
        pbParams.gravity = Gravity.TOP;
        pbParams.topMargin = dp(TOOLBAR_HEIGHT_DP);
        browserProgress.setLayoutParams(pbParams);
        browserProgress.setVisibility(View.GONE);

        // ---- WEBVIEW ----
        inAppWebView = new WebView(this);
        FrameLayout.LayoutParams wvParams = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT);
        wvParams.topMargin = dp(TOOLBAR_HEIGHT_DP + PROGRESS_HEIGHT_DP);
        inAppWebView.setLayoutParams(wvParams);

        WebSettings ws = inAppWebView.getSettings();
        ws.setJavaScriptEnabled(true);
        ws.setDomStorageEnabled(true);
        ws.setDatabaseEnabled(true);
        ws.setLoadWithOverviewMode(true);
        ws.setUseWideViewPort(true);
        ws.setBuiltInZoomControls(false);
        ws.setDisplayZoomControls(false);
        ws.setSupportZoom(true);
        ws.setAllowFileAccess(true);
        ws.setAllowContentAccess(true);
        ws.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        ws.setCacheMode(WebSettings.LOAD_DEFAULT);
        ws.setMediaPlaybackRequiresUserGesture(false);

        // Spoof UA so sites don't block Android WebView
        String ua = ws.getUserAgentString();
        if (ua != null) ws.setUserAgentString(ua.replace("; wv", ""));

        inAppWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler,
                                           android.net.http.SslError error) {
                handler.proceed();
            }

            @Override
            public void onPageStarted(WebView view, String url,
                                      android.graphics.Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                if (browserProgress != null) browserProgress.setVisibility(View.VISIBLE);
                updateNavButtons();
                String domain = extractDomain(url);
                if (toolbarTitle != null && !domain.isEmpty())
                    toolbarTitle.setText(domain);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                updateNavButtons();
                String domain = extractDomain(url);
                if (toolbarTitle != null && !domain.isEmpty())
                    toolbarTitle.setText(domain);
            }
        });

        inAppWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int prog) {
                if (browserProgress == null) return;
                browserProgress.setProgress(prog);
                if (prog >= 100) {
                    new Handler(Looper.getMainLooper()).postDelayed(() -> {
                        if (browserProgress != null)
                            browserProgress.setVisibility(View.GONE);
                    }, 400);
                } else {
                    browserProgress.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onReceivedTitle(WebView view, String title) {
                // Keep domain name in title (cleaner than page title)
                String domain = extractDomain(view.getUrl());
                if (toolbarTitle != null)
                    toolbarTitle.setText(domain.isEmpty() ? title : domain);
            }
        });

        // ---- Assemble ----
        inAppBrowserContainer.addView(inAppWebView);
        inAppBrowserContainer.addView(browserProgress);
        inAppBrowserContainer.addView(toolbar);

        addContentView(inAppBrowserContainer, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
    }

    // =========================================================
    //  OPEN / CLOSE
    // =========================================================
    public void openInAppBrowser(String url) {
        if (url == null || url.isEmpty()) return;
        runOnUiThread(() -> {
            if (inAppWebView == null) return;

            inAppWebView.loadUrl(url);

            // Show domain immediately in toolbar
            String domain = extractDomain(url);
            if (toolbarTitle != null)
                toolbarTitle.setText(domain.isEmpty() ? "Loading..." : domain);

            // Animate slide up (only animate first open)
            if (!isBrowserOpen) {
                isBrowserOpen = true;
                inAppBrowserContainer.setVisibility(View.VISIBLE);
                TranslateAnimation slideUp = new TranslateAnimation(
                        Animation.RELATIVE_TO_SELF, 0f,
                        Animation.RELATIVE_TO_SELF, 0f,
                        Animation.RELATIVE_TO_SELF, 1f,
                        Animation.RELATIVE_TO_SELF, 0f);
                slideUp.setDuration(320);
                slideUp.setInterpolator(new DecelerateInterpolator(1.5f));
                inAppBrowserContainer.startAnimation(slideUp);
            }

            updateNavButtons();
        });
    }

    private void closeInAppBrowser() {
        if (!isBrowserOpen || inAppBrowserContainer == null) return;

        TranslateAnimation slideDown = new TranslateAnimation(
                Animation.RELATIVE_TO_SELF, 0f,
                Animation.RELATIVE_TO_SELF, 0f,
                Animation.RELATIVE_TO_SELF, 0f,
                Animation.RELATIVE_TO_SELF, 1f);
        slideDown.setDuration(280);
        slideDown.setInterpolator(new AccelerateInterpolator(1.5f));
        slideDown.setAnimationListener(new Animation.AnimationListener() {
            @Override public void onAnimationStart(Animation a) {}
            @Override public void onAnimationRepeat(Animation a) {}
            @Override
            public void onAnimationEnd(Animation a) {
                runOnUiThread(() -> {
                    inAppBrowserContainer.setVisibility(View.GONE);
                    isBrowserOpen = false;
                    if (inAppWebView != null) {
                        inAppWebView.stopLoading();
                        inAppWebView.loadUrl("about:blank");
                    }
                    if (toolbarTitle != null) toolbarTitle.setText("Opening...");
                    if (browserProgress != null) browserProgress.setVisibility(View.GONE);
                });
            }
        });
        inAppBrowserContainer.startAnimation(slideDown);
    }

    private void updateNavButtons() {
        if (inAppWebView == null) return;
        runOnUiThread(() -> {
            if (btnBack != null)
                btnBack.setAlpha(inAppWebView.canGoBack() ? 1.0f : 0.30f);
            if (btnForward != null)
                btnForward.setAlpha(inAppWebView.canGoForward() ? 1.0f : 0.30f);
        });
    }

    // =========================================================
    //  ANDROID BACK BUTTON
    // =========================================================
    @Override
    public void onBackPressed() {
        if (isBrowserOpen) {
            if (inAppWebView != null && inAppWebView.canGoBack()) {
                inAppWebView.goBack();
            } else {
                closeInAppBrowser();
            }
            return;
        }
        super.onBackPressed();
    }

    // =========================================================
    //  HELPERS
    // =========================================================
    /** Build a compact text-based toolbar button */
    private TextView makeToolbarBtn(String label, int textSizeSp) {
        TextView tv = new TextView(this);
        tv.setText(label);
        tv.setTextColor(Color.parseColor("#a1a1aa"));
        tv.setTextSize(TypedValue.COMPLEX_UNIT_SP, textSizeSp);
        tv.setTypeface(Typeface.DEFAULT_BOLD);
        tv.setPadding(dp(14), dp(8), dp(14), dp(8));
        tv.setGravity(Gravity.CENTER);
        tv.setClickable(true);
        tv.setFocusable(true);
        return tv;
    }

    /** Extracts clean domain (e.g. "physics.pw.live") from a URL */
    private String extractDomain(String url) {
        if (url == null || url.isEmpty()) return "";
        try {
            java.net.URI uri = new java.net.URI(url);
            String host = uri.getHost();
            if (host != null) return host.replaceFirst("^www\\.", "");
        } catch (Exception ignored) {}
        return "";
    }

    /** Convert dp → px */
    private int dp(int dp) {
        return Math.round(dp * getResources().getDisplayMetrics().density);
    }

    // =========================================================
    //  VPN DETECTION
    // =========================================================
    @Override
    public void onResume() {
        super.onResume();
        if (isVpnActive()) handleVpnDetected();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterVpnCallback();
        if (inAppWebView != null) {
            inAppWebView.destroy();
            inAppWebView = null;
        }
    }

    public static boolean isVpnConnected(Context context) {
        try {
            ConnectivityManager cm =
                    (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            if (cm != null) {
                Network activeNet = cm.getActiveNetwork();
                if (activeNet != null) {
                    NetworkCapabilities caps = cm.getNetworkCapabilities(activeNet);
                    if (caps != null && caps.hasTransport(NetworkCapabilities.TRANSPORT_VPN))
                        return true;
                }
                for (Network net : cm.getAllNetworks()) {
                    NetworkCapabilities caps = cm.getNetworkCapabilities(net);
                    if (caps != null && caps.hasTransport(NetworkCapabilities.TRANSPORT_VPN))
                        return true;
                }
            }
            List<NetworkInterface> ifaces =
                    Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : ifaces) {
                if (intf.isUp() && !intf.getInterfaceAddresses().isEmpty()) {
                    String name = intf.getName().toLowerCase();
                    if (name.contains("tun") || name.contains("ppp") || name.contains("p2p")
                            || name.contains("tap") || name.contains("wg")
                            || name.startsWith("vpn")) return true;
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "VPN check error", e);
        }
        return false;
    }

    private boolean isVpnActive() { return isVpnConnected(this); }

    private void handleVpnDetected() {
        if (isExiting) return;
        isExiting = true;
        showVpnNotification();
        new Handler(Looper.getMainLooper()).post(() ->
                Toast.makeText(getApplicationContext(),
                        "VPN Detected — GT pro cannot be used with VPN active.",
                        Toast.LENGTH_LONG).show());
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            finishAffinity();
            System.exit(0);
        }, 600);
    }

    private void registerVpnCallback() {
        if (connectivityManager == null) return;
        try {
            NetworkRequest req = new NetworkRequest.Builder()
                    .addTransportType(NetworkCapabilities.TRANSPORT_VPN).build();
            vpnNetworkCallback = new ConnectivityManager.NetworkCallback() {
                @Override
                public void onAvailable(Network network) {
                    super.onAvailable(network);
                    runOnUiThread(() -> handleVpnDetected());
                }
            };
            connectivityManager.registerNetworkCallback(req, vpnNetworkCallback);
        } catch (Exception e) {
            Log.e(TAG, "VPN callback registration failed", e);
        }
    }

    private void unregisterVpnCallback() {
        if (connectivityManager != null && vpnNetworkCallback != null) {
            try { connectivityManager.unregisterNetworkCallback(vpnNetworkCallback); }
            catch (Exception ignored) {}
            vpnNetworkCallback = null;
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel ch = new NotificationChannel(
                    CHANNEL_ID, "Security Alerts", NotificationManager.IMPORTANCE_HIGH);
            ch.setDescription("Security and network notifications");
            NotificationManager nm = getSystemService(NotificationManager.class);
            if (nm != null) nm.createNotificationChannel(ch);
        }
    }

    private void showVpnNotification() {
        try {
            Notification.Builder b = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                    ? new Notification.Builder(this, CHANNEL_ID)
                    : new Notification.Builder(this);
            b.setSmallIcon(android.R.drawable.ic_dialog_alert)
             .setContentTitle("VPN Detected")
             .setContentText("GT pro cannot be used while a VPN is active.")
             .setAutoCancel(true);
            NotificationManager nm =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) nm.notify(1001, b.build());
        } catch (Exception e) {
            Log.e(TAG, "VPN notification error", e);
        }
    }
}
