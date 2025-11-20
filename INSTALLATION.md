# Installation Guide

This guide will help you install and configure the cordova-plugin-tiktok-business-sdk in your Cordova application.

> **Note**: This is a community-developed plugin that wraps the official TikTok Business SDK native libraries. It is not officially maintained by TikTok.

## Prerequisites

Before installing the plugin, ensure you have:

- Node.js and npm installed
- Cordova CLI installed (`npm install -g cordova`)
- A Cordova project created
- TikTok Business SDK credentials (Access Token, App ID, TikTok App ID)

## Quick Installation

### From Local Directory

```bash
cordova plugin add /path/to/cordova-plugin-tiktok-business-sdk
```

### From npm (when published)

```bash
cordova plugin add cordova-plugin-tiktok-business-sdk
```

### From Git Repository

```bash
cordova plugin add https://github.com/yigit-serin/cordova-plugin-tiktok-business-sdk.git
```

## Platform-Specific Setup

### Android Setup

#### 1. Minimum Requirements

- Android SDK API Level 21 (Android 5.0) or higher
- Gradle 7.0 or higher

#### 2. Verify Installation

Check that the plugin is installed:

```bash
cordova plugin ls
```

You should see:
```
cordova-plugin-tiktok-business-sdk 0.0.1 "TikTok Business SDK"
```

#### 3. ProGuard Configuration (Optional)

If you're using ProGuard for code obfuscation, add these rules to `platforms/android/app/proguard-rules.pro`:

```proguard
-keep class com.tiktok.** { *; }
-keep class com.android.billingclient.api.** { *; }
-keep class androidx.lifecycle.** { *; }
```

#### 4. Build Configuration

The plugin automatically adds the required dependencies:
- TikTok Business Android SDK 1.5.0
- Google Install Referrer 2.2
- Google Billing Library 7.1.1

#### 5. Build the App

```bash
cordova build android
```

#### 6. Run on Device/Emulator

```bash
cordova run android
```

### iOS Setup

#### 1. Minimum Requirements

- iOS 11.0 or higher
- CocoaPods 1.10.0 or higher
- Xcode 12.0 or higher

#### 2. Install CocoaPods (if not already installed)

```bash
sudo gem install cocoapods
```

#### 3. Add the Plugin

```bash
cordova plugin add cordova-plugin-tiktok-business-sdk
```

#### 4. Install iOS Dependencies

```bash
cd platforms/ios
pod install
cd ../..
```

#### 5. Configure Info.plist

The plugin automatically adds the tracking usage description. Verify it's present in `platforms/ios/[YourApp]/[YourApp]-Info.plist`:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We need your permission to track your usage of this app for analytics and advertising purposes</string>
```

You can customize this message if needed.

#### 6. Build the App

```bash
cordova build ios
```

#### 7. Run on Device/Simulator

```bash
cordova run ios
```

Or open the workspace in Xcode:

```bash
open platforms/ios/YourApp.xcworkspace
```

## Verification

### 1. Check Plugin Installation

```bash
cordova plugin ls
```

Expected output:
```
cordova-plugin-tiktok-business-sdk 0.0.1 "TikTok Business SDK"
```

### 2. Test Basic Functionality

Add this code to your app's JavaScript:

```javascript
document.addEventListener('deviceready', function() {
    TikTokBusinessSdk.getPlatformVersion(
        function(version) {
            console.log('Platform version:', version);
            alert('Plugin is working! Platform: ' + version);
        },
        function(error) {
            console.error('Plugin error:', error);
            alert('Plugin error: ' + error);
        }
    );
}, false);
```

### 3. Initialize SDK

```javascript
TikTokBusinessSdk.initTiktokBusinessSdk(
    {
        accessToken: 'YOUR_ACCESS_TOKEN',
        appId: 'YOUR_APP_ID',
        ttAppId: 'YOUR_TIKTOK_APP_ID',
        openDebug: true
    },
    function() {
        console.log('SDK initialized successfully');
    },
    function(error) {
        console.error('SDK initialization failed:', error);
    }
);
```

## Troubleshooting

### Common Issues

#### Plugin Not Found

**Problem:** `cordova plugin ls` doesn't show the plugin

**Solution:**
1. Remove and re-add the plugin:
   ```bash
   cordova plugin remove cordova-plugin-tiktok-business-sdk
   cordova plugin add /path/to/plugin
   ```
2. Clean and rebuild:
   ```bash
   cordova clean
   cordova build
   ```

#### Android Build Fails

**Problem:** Gradle build fails with dependency errors

**Solution:**
1. Check your `config.xml` has correct Android platform version:
   ```xml
   <engine name="android" spec="^9.0.0" />
   ```
2. Clean the Android platform:
   ```bash
   cordova platform remove android
   cordova platform add android
   ```
3. Ensure JitPack repository is accessible (check your internet connection)

#### iOS Build Fails

**Problem:** CocoaPods installation fails

**Solution:**
1. Update CocoaPods:
   ```bash
   sudo gem install cocoapods
   pod repo update
   ```
2. Clean pods and reinstall:
   ```bash
   cd platforms/ios
   rm -rf Pods Podfile.lock
   pod install
   cd ../..
   ```
3. Rebuild:
   ```bash
   cordova build ios
   ```

#### TikTokBusinessSdk is undefined

**Problem:** JavaScript error: `TikTokBusinessSdk is not defined`

**Solution:**
1. Ensure you're calling the SDK after `deviceready` event:
   ```javascript
   document.addEventListener('deviceready', function() {
       // Use TikTokBusinessSdk here
   }, false);
   ```
2. Verify the plugin is installed: `cordova plugin ls`
3. Check that `cordova.js` is included in your HTML:
   ```html
   <script src="cordova.js"></script>
   ```

#### SDK Initialization Fails

**Problem:** SDK initialization returns an error

**Solution:**
1. Verify your credentials are correct
2. Check internet connectivity
3. Enable debug mode to see detailed logs:
   ```javascript
   openDebug: true
   ```
4. Check device logs:
   - Android: `adb logcat`
   - iOS: Xcode Console

## Advanced Configuration

### Custom Plugin Variables

You can set custom variables when adding the plugin:

```bash
cordova plugin add cordova-plugin-tiktok-business-sdk \
  --variable TIKTOK_SDK_VERSION="1.5.0"
```

### Removing the Plugin

```bash
cordova plugin remove cordova-plugin-tiktok-business-sdk
```

### Updating the Plugin

```bash
cordova plugin remove cordova-plugin-tiktok-business-sdk
cordova plugin add cordova-plugin-tiktok-business-sdk
```

## Getting Credentials

To use the TikTok Business SDK, you need to obtain credentials from TikTok Business:

1. Go to [TikTok Business Center](https://business.tiktok.com/)
2. Create or log in to your account
3. Navigate to Events Manager
4. Create a new pixel or select an existing one
5. Get your Access Token, App ID, and TikTok App ID

## Next Steps

After successful installation:

1. Read the [README.md](README.md) for usage examples
2. Check out the [example app](example/README.md)
3. Review the [API documentation](README.md#api-reference)
4. Test the integration in development mode
5. Deploy to production with proper credentials

## Support

If you encounter issues during installation:

1. Check this troubleshooting guide
2. Review the [main README](README.md)
3. Check [existing issues](https://github.com/yigit-serin/cordova-plugin-tiktok-business-sdk/issues)
4. Create a new issue with:
   - Installation command used
   - Error messages
   - Platform and version information
   - Steps to reproduce

## Additional Resources

- [Cordova Plugin Development Guide](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/)
- [TikTok Business SDK Documentation](https://business-api.tiktok.com/portal/docs)
- [Android Integration Guide](https://business-api.tiktok.com/portal/docs?id=1739585434183746)
- [iOS Integration Guide](https://business-api.tiktok.com/portal/docs?id=1739585432134657)
