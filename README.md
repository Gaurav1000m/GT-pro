# GT pro (Study With Gaurav PRO)

> Modern Educational Learning Platform for Web & Android built with HTML, CSS, JavaScript, and Capacitor.

[![Android Build CI/CD](https://github.com/Gaurav1000m/GT-pro/actions/workflows/android-build.yml/badge.svg)](https://github.com/Gaurav1000m/GT-pro/actions/workflows/android-build.yml)
[![Latest Release](https://img.shields.io/github/v/release/Gaurav1000m/GT-pro?include_prereleases&color=gold)](https://github.com/Gaurav1000m/GT-pro/releases)

---

## 📱 Application Overview

- **Application Name**: GT pro
- **Package ID**: `com.gt.pro`
- **Current Version**: `1.0.0` (versionCode `1`)
- **Default Theme**: Dark Mode
- **Key Features**:
  - **VPN Security Detection**: Protects application integrity by detecting active VPN tunnels and automatically exiting with a `"Vpn Detected"` notification.
  - **GitHub Release Update Notifier**: In-app checker querying GitHub Releases (`Gaurav1000m/GT-pro`) to alert users when a newer APK is available.
  - **Capacitor Native Integration**: Smooth status bar, splash screen, hardware back button navigation, and safe area insets.
  - **Dual Environment Support**: Works both as a standalone web app and as an Android app.

---

## 🚀 Quick Start (Web Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm start
# Opens at http://localhost:5500
```

---

## 🛠️ Building & Synchronizing Capacitor

```bash
# 1. Build the web distribution directory (www/)
npm run build

# 2. Synchronize web assets with the Android native project
npm run cap:sync

# 3. Open Android project in Android Studio
npm run cap:open
```

---

## 🤖 Building Android Binaries Locally

### Prerequisites
- JDK 17 or JDK 21
- Android SDK (API 34+)
- Ensure `android/local.properties` contains your Android SDK path:
  ```properties
  sdk.dir=/path/to/android-sdk
  ```

### Build Debug APK
```bash
cd android
./gradlew assembleDebug
# Generated at: android/app/build/outputs/apk/debug/app-debug.apk
```

### Build Release APK & AAB
```bash
cd android
./gradlew assembleRelease bundleRelease
# APK generated at: android/app/build/outputs/apk/release/app-release-unsigned.apk
# AAB generated at: android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🔒 Security & VPN Detection

GT pro enforces strict network integrity:
1. On app launch and resume, `MainActivity.java` checks:
   - `ConnectivityManager` network capabilities for `NetworkCapabilities.TRANSPORT_VPN`.
   - Network interfaces for virtual tunnel adapters (`tun0`, `ppp0`, `wg0`, `tap0`, etc.).
2. If a VPN connection is detected:
   - An Android Toast notification `"Vpn Detected"` is displayed.
   - A system security notification is triggered.
   - The app immediately invokes `finishAffinity()` and exits.

---

## 🔄 In-App Updates & Version Control

- The app monitors `https://api.github.com/repos/Gaurav1000m/GT-pro/releases/latest`.
- When a new version tag (e.g. `v1.0.1`) is published with an APK asset on GitHub, an in-app dialog prompts the user with the release highlights and a direct **Download APK** button.
- Users can also manually check for updates via the **Check for Updates** button in the sidebar drawer.

---

## 🐙 Git Workflow & Releases

### Branching Strategy
- `main`: Production-ready code and release tags.
- `development`: Active feature development and testing.

```text
feature-branch
      ↓
development
      ↓
    main
      ↓
Release Tag (e.g., v1.0.0)
```

### Version Bumping Checklist
When releasing a new version:
1. Update `"version"` in `package.json`.
2. Update `versionCode` and `versionName` in `android/app/build.gradle`.
3. Update `APP_VERSION` in `app.js`.
4. Document changes in `CHANGELOG.md`.
5. Create a Git tag and push:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
   *The GitHub Actions workflow will automatically build the APK and attach it to the GitHub Release!*

---

## ⚙️ GitHub Actions CI/CD Secrets

For automated release signing via GitHub Actions, add these repository secrets:
- `KEYSTORE_BASE64`: Base64-encoded release keystore
- `KEYSTORE_PASSWORD`: Keystore password
- `KEY_ALIAS`: Key alias name
- `KEY_PASSWORD`: Key password

---

## 📄 License
MIT License. Created by Gaurav.
