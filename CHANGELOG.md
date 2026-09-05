# Changelog

All notable changes to the **GT pro** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-09-05

### Added
- **Capacitor 8 Android Integration**:
  - Converted existing web application into a high-performance Android application using `@capacitor/core`, `@capacitor/cli`, and `@capacitor/android`.
  - App ID: `com.gt.pro`
  - Application Name: `GT pro`
  - Web root: `www`
  - Full support for adaptive icons (`mipmap-anydpi-v26`), legacy icons, and dark-themed launch splash screen.
- **VPN Security Detection & Auto-Exit**:
  - Native Android detection (`MainActivity.java`) inspecting `ConnectivityManager` network capabilities (`TRANSPORT_VPN`) and network interface bindings (`tun`, `ppp`, `p2p`, `tap`, `wg`).
  - Automatically raises Toast `"Vpn Detected"` and system security alert notification.
  - Automatically terminates/backs out of the application (`finishAffinity()`) if a VPN is detected on launch, resume, or dynamically connected during usage.
  - Security modal overlay fallback in web frontend.
- **GitHub Release Update Notifier & Version Control**:
  - In-app update checker dynamically querying GitHub Releases API (`https://api.github.com/repos/Gaurav1000m/GT-pro/releases/latest`).
  - Automatic check on application launch and manual "Check for Updates" trigger in category sidebar.
  - Glassmorphism update dialog with version tag, release changelog, direct APK download button, and snooze support.
- **Initial Dark UI Enforcement**:
  - Guaranteed default dark mode theme across HTML markup, inline head bootstrap script, local storage cache, and native Android status bar (`#000000`).
- **Hardware Back Button Navigation**:
  - Intelligent back button routing: closes open modals (update dialog, category sidebar), returns from sub-screens (Donation, Library, Explore) back to Home screen, clears search input, and exits cleanly.
- **CI/CD Automation (GitHub Actions)**:
  - `.github/workflows/android-build.yml` automating Node setup, web build, Capacitor sync, Android SDK setup, Debug APK, Release APK, and Release AAB generation.
  - Automatic publishing of release APKs to GitHub Releases on version tags (`v*`).
- **Git Repository & Documentation**:
  - Comprehensive `.gitignore` protecting secrets, keystores, and build caches.
  - Detailed `README.md` with instructions for web testing, Capacitor sync, local Android builds, and release deployments.
