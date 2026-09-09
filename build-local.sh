#!/bin/bash
set -e

WORK_DIR="$HOME/local-android-env"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

echo "=== 1. Downloading Node.js ==="
if [ ! -d "$WORK_DIR/node-v22" ]; then
    wget -qO node.tar.xz https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-x64.tar.xz
    tar -xf node.tar.xz
    mv node-v22.14.0-linux-x64 node-v22
    rm node.tar.xz
fi
export PATH="$WORK_DIR/node-v22/bin:$PATH"

echo "=== 2. Downloading and Extracting Java JDK 21 ==="
if [ ! -d "$WORK_DIR/jdk-21" ]; then
    wget -qO jdk21.tar.gz https://download.java.net/java/GA/jdk21.0.2/f2283984656d49d69e91c558476027ac/13/GPL/openjdk-21.0.2_linux-x64_bin.tar.gz
    tar -xzf jdk21.tar.gz
    mv jdk-21.0.2 jdk-21
    rm jdk21.tar.gz
fi
export JAVA_HOME="$WORK_DIR/jdk-21"
export PATH="$JAVA_HOME/bin:$PATH"

echo "=== 3. Downloading Android Command Line Tools ==="
if [ ! -d "$WORK_DIR/android-sdk/cmdline-tools/latest" ]; then
    mkdir -p "$WORK_DIR/android-sdk/cmdline-tools"
    wget -qO cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
    unzip -q cmdline-tools.zip -d "$WORK_DIR/android-sdk/cmdline-tools"
    mv "$WORK_DIR/android-sdk/cmdline-tools/cmdline-tools" "$WORK_DIR/android-sdk/cmdline-tools/latest"
    rm cmdline-tools.zip
fi
export ANDROID_HOME="$WORK_DIR/android-sdk"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

echo "=== 4. Setting up Project Dependencies ==="
cd /home/gaurav/Downloads/Study/GT-pro
echo "Running npm install..."
npm install

echo "Syncing Capacitor..."
rm -rf android/capacitor-cordova-android-plugins/cordova.variables.gradle
npx cap sync android

echo "=== 5. Building the APK ==="
cd android
chmod +x gradlew
./gradlew assembleDebug

echo "=== 6. Copying APK to project root ==="
cp app/build/outputs/apk/debug/app-debug.apk /home/gaurav/Downloads/Study/GT-pro/gt-pro-latest.apk
echo "Build complete! APK is located at: /home/gaurav/Downloads/Study/GT-pro/gt-pro-latest.apk"
