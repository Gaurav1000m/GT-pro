package com.gt.pro;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;
import com.getcapacitor.BridgeActivity;
import java.net.NetworkInterface;
import java.util.Collections;
import java.util.List;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "MainActivity";
    private static final String CHANNEL_ID = "gt_security_alerts";
    private ConnectivityManager connectivityManager;
    private ConnectivityManager.NetworkCallback vpnNetworkCallback;
    private boolean isExiting = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createNotificationChannel();

        connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);

        // Immediate check on startup: If VPN is active, exit and notify immediately
        if (isVpnActive()) {
            handleVpnDetected();
            return;
        }

        registerVpnCallback();
        configureWebView();
    }

    @Override
    public void onStart() {
        super.onStart();
        configureWebView();
    }

    private void configureWebView() {
        if (getBridge() != null && getBridge().getWebView() != null) {
            android.webkit.WebView webView = getBridge().getWebView();
            webView.setVerticalScrollBarEnabled(false);
            webView.setHorizontalScrollBarEnabled(false);
            webView.setOverScrollMode(android.view.View.OVER_SCROLL_NEVER);

            // Handle target="_blank" and window.open internally instead of launching Chrome
            webView.getSettings().setSupportMultipleWindows(true);
            webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
            webView.setWebChromeClient(new com.getcapacitor.BridgeWebChromeClient(getBridge()) {
                @Override
                public boolean onCreateWindow(android.webkit.WebView view, boolean isDialog, boolean isUserGesture, android.os.Message resultMsg) {
                    android.webkit.WebView dummyWebView = new android.webkit.WebView(view.getContext());
                    dummyWebView.setWebViewClient(new android.webkit.WebViewClient() {
                        @Override
                        public boolean shouldOverrideUrlLoading(android.webkit.WebView dummyView, android.webkit.WebResourceRequest request) {
                            view.loadUrl(request.getUrl().toString());
                            return true;
                        }
                    });
                    android.webkit.WebView.WebViewTransport transport = (android.webkit.WebView.WebViewTransport) resultMsg.obj;
                    transport.setWebView(dummyWebView);
                    resultMsg.sendToTarget();
                    return true;
                }
            });

            // Spoof User-Agent to prevent Cloudflare/Education sites from blocking WebViews
            String userAgent = webView.getSettings().getUserAgentString();
            if (userAgent != null) {
                webView.getSettings().setUserAgentString(userAgent.replace("; wv", ""));
            }

            // Override WebViewClient to ignore SSL errors and inject safe area styles
            webView.setWebViewClient(new com.getcapacitor.BridgeWebViewClient(getBridge()) {
                @Override
                public void onReceivedSslError(android.webkit.WebView view, android.webkit.SslErrorHandler handler, android.net.http.SslError error) {
                    // Ignore SSL certificate errors to allow sites with misconfigured certificates
                    handler.proceed();
                }

                @Override
                public void onPageFinished(android.webkit.WebView view, String url) {
                    super.onPageFinished(view, url);
                    // Inject Safe Area Padding on external domains
                    if (url != null && !url.contains("localhost")) {
                        String js = "if(!document.getElementById('injected-safe-area')){" +
                                    "var s=document.createElement('style');" +
                                    "s.id='injected-safe-area';" +
                                    "s.innerHTML='body { padding-top: env(safe-area-inset-top, 30px) !important; padding-bottom: env(safe-area-inset-bottom, 30px) !important; box-sizing: border-box; }';" +
                                    "document.head.appendChild(s);" +
                                    "}";
                        view.evaluateJavascript(js, null);
                    }
                }
            });
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        if (isVpnActive()) {
            handleVpnDetected();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterVpnCallback();
    }

    /**
     * Comprehensive VPN detection using NetworkCapabilities and NetworkInterface checks.
     */
    public static boolean isVpnConnected(Context context) {
        try {
            ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            if (cm != null) {
                // Check 1: Active Network Capabilities for TRANSPORT_VPN
                Network activeNetwork = cm.getActiveNetwork();
                if (activeNetwork != null) {
                    NetworkCapabilities caps = cm.getNetworkCapabilities(activeNetwork);
                    if (caps != null && caps.hasTransport(NetworkCapabilities.TRANSPORT_VPN)) {
                        return true;
                    }
                }

                // Check 2: Inspect all active networks
                Network[] allNetworks = cm.getAllNetworks();
                for (Network net : allNetworks) {
                    NetworkCapabilities caps = cm.getNetworkCapabilities(net);
                    if (caps != null && caps.hasTransport(NetworkCapabilities.TRANSPORT_VPN)) {
                        return true;
                    }
                }
            }

            // Check 3: Check virtual/tunnel network interfaces (tun, ppp, p2p, tap, wg)
            List<NetworkInterface> interfaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                if (intf.isUp() && intf.getInterfaceAddresses().size() > 0) {
                    String name = intf.getName().toLowerCase();
                    if (name.contains("tun") || name.contains("ppp") || name.contains("p2p") || 
                        name.contains("tap") || name.contains("wg") || name.startsWith("vpn")) {
                        return true;
                    }
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error checking VPN status", e);
        }
        return false;
    }

    private boolean isVpnActive() {
        return isVpnConnected(this);
    }

    private void handleVpnDetected() {
        if (isExiting) return;
        isExiting = true;

        Log.w(TAG, "VPN Detected! Displaying notification and exiting application.");

        // 1. Show User Notification in Notification Bar
        showVpnNotification();

        // 2. Show Toast: "Vpn Detected"
        new Handler(Looper.getMainLooper()).post(() -> {
            Toast.makeText(getApplicationContext(), "Vpn Detected", Toast.LENGTH_LONG).show();
        });

        // 3. Close the app and back out cleanly
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            finishAffinity();
            System.exit(0);
        }, 500);
    }

    private void registerVpnCallback() {
        if (connectivityManager == null) return;
        try {
            NetworkRequest request = new NetworkRequest.Builder()
                    .addTransportType(NetworkCapabilities.TRANSPORT_VPN)
                    .build();

            vpnNetworkCallback = new ConnectivityManager.NetworkCallback() {
                @Override
                public void onAvailable(Network network) {
                    super.onAvailable(network);
                    runOnUiThread(() -> handleVpnDetected());
                }
            };

            connectivityManager.registerNetworkCallback(request, vpnNetworkCallback);
        } catch (Exception e) {
            Log.e(TAG, "Could not register VPN network callback", e);
        }
    }

    private void unregisterVpnCallback() {
        if (connectivityManager != null && vpnNetworkCallback != null) {
            try {
                connectivityManager.unregisterNetworkCallback(vpnNetworkCallback);
            } catch (Exception e) {
                Log.e(TAG, "Error unregistering callback", e);
            }
            vpnNetworkCallback = null;
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Security Alerts";
            String description = "Security and network notifications";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(channel);
            }
        }
    }

    private void showVpnNotification() {
        try {
            Notification.Builder builder;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                builder = new Notification.Builder(this, CHANNEL_ID);
            } else {
                builder = new Notification.Builder(this);
            }

            builder.setSmallIcon(android.R.drawable.ic_dialog_alert)
                    .setContentTitle("Vpn Detected")
                    .setContentText("GT pro cannot be used while a VPN connection is active.")
                    .setAutoCancel(true);

            NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (notificationManager != null) {
                notificationManager.notify(1001, builder.build());
            }
        } catch (Exception e) {
            Log.e(TAG, "Error showing VPN notification", e);
        }
    }
}

