# cordova-plugin-tiktok-business-sdk

A community-developed Cordova plugin that provides easy integration with TikTok Business SDK 1.5.0 for Android and iOS platforms.

> **Note**: This plugin is not officially maintained by TikTok. It is a community-driven wrapper around the official [TikTok Business Android SDK](https://github.com/tiktok/tiktok-business-android-sdk) and [TikTok Business iOS SDK](https://github.com/tiktok/tiktok-business-ios-sdk) for use in Cordova/PhoneGap applications.

## Features

- 🔧 **SDK Initialization**: Initialize TikTok Business SDK with your app credentials
- 👤 **User Identification**: Set user identity for personalized tracking
- 📊 **Event Tracking**: Track custom events and user actions
- 🔐 **Authentication**: Handle user login/logout states
- 🎯 **Cross-Platform**: Works on both Android and iOS
- 🐛 **Debug Mode**: Enable debug mode for development and testing

## Requirements

- Cordova: `>=9.0.0`
- Cordova Android: `>=9.0.0`
- Cordova iOS: `>=6.0.0`
- Android: API level 21+
- iOS: iOS 11.0+

## Installation

```bash
cordova plugin add cordova-plugin-tiktok-business-sdk
```

Or install from local directory:

```bash
cordova plugin add /path/to/cordova-plugin-tiktok-business-sdk
```

## Platform Setup

### Android

The plugin automatically configures the required dependencies and permissions. However, you may need to add ProGuard rules if you're using code obfuscation.

Add the following to your `platforms/android/app/proguard-rules.pro`:

```
-keep class com.tiktok.** { *; }
-keep class com.android.billingclient.api.** { *; }
-keep class androidx.lifecycle.** { *; }
```

For the latest Android integration requirements, refer to TikTok Business documentation: [Android Integration Guide](https://business-api.tiktok.com/portal/docs?id=1739585434183746).

### iOS

The plugin automatically adds the required tracking usage description to your Info.plist. However, you should request tracking authorization in your app.

Add the following code to your app's initialization (e.g., in `deviceready` event):

```javascript
// Request tracking authorization on iOS
if (cordova.platformId === 'ios') {
    // The plugin handles this automatically, but you can also manually trigger it
    // by calling the native requestTrackingAuthorization method if needed
}
```

For the latest iOS integration requirements, refer to TikTok Business documentation: [iOS Integration Guide](https://business-api.tiktok.com/portal/docs?id=1739585432134657).

## Usage

### 1. Initialize the SDK

```javascript
document.addEventListener('deviceready', function() {
    TikTokBusinessSdk.initTiktokBusinessSdk(
        {
            accessToken: 'your_access_token',
            appId: 'your_app_id',
            ttAppId: 'your_tiktok_app_id',
            openDebug: true, // Enable debug mode
            enableAutoIapTrack: true, // Enable automatic in-app purchase tracking
            disableAutoEnhancedDataPostbackEvents: false
        },
        function(success) {
            console.log('TikTok SDK initialized successfully');
        },
        function(error) {
            console.error('TikTok SDK initialization failed:', error);
        }
    );
}, false);
```

### 2. Set User Identity

```javascript
TikTokBusinessSdk.setIdentify(
    {
        externalId: 'user_123',
        externalUserName: 'john_doe',
        phoneNumber: '+1234567890',
        email: 'john@example.com'
    },
    function(success) {
        console.log('User identity set successfully');
    },
    function(error) {
        console.error('Failed to set user identity:', error);
    }
);
```

### 3. Track Events

```javascript
// Track a login event
TikTokBusinessSdk.trackTTEvent(
    {
        event: TikTokBusinessSdk.EventName.LOGIN,
        eventId: 'login_123'
    },
    function(success) {
        console.log('Event tracked successfully');
    },
    function(error) {
        console.error('Failed to track event:', error);
    }
);

// Track a purchase event
TikTokBusinessSdk.trackTTEvent(
    {
        event: TikTokBusinessSdk.EventName.ADD_PAYMENT_INFO,
        eventId: 'purchase_456'
    },
    function(success) {
        console.log('Purchase event tracked');
    },
    function(error) {
        console.error('Failed to track purchase:', error);
    }
);

// Track without event ID
TikTokBusinessSdk.trackTTEvent(
    {
        event: TikTokBusinessSdk.EventName.COMPLETE_TUTORIAL
    },
    function(success) {
        console.log('Tutorial completion tracked');
    },
    function(error) {
        console.error('Failed to track tutorial:', error);
    }
);

// Track custom event (uses string event name)
TikTokBusinessSdk.trackTTEvent(
    {
        event: 'page_view', // Custom event name as string
        eventId: 'home_page'
    },
    function(success) {
        console.log('Custom event tracked');
    },
    function(error) {
        console.error('Failed to track custom event:', error);
    }
);

// Track event with custom properties
TikTokBusinessSdk.trackTTEventWithCustomData(
    {
        eventName: 'PURCHASE',
        eventId: 'order_123',
        properties: {
            currency: 'USD',
            value: 99.99,
            content_type: 'product',
            content_id: 'SKU_123',
            quantity: 2
        }
    },
    function(success) {
        console.log('Event with custom properties tracked');
    },
    function(error) {
        console.error('Failed to track event with properties:', error);
    }
);
```

**Note**: 
- For predefined events, use `event` with `EventName` enum
- For custom events, use `event` or `eventName` with a string value
- For events with custom properties, use `trackTTEventWithCustomData` method

### 4. Logout

```javascript
TikTokBusinessSdk.logout(
    function(success) {
        console.log('User logged out successfully');
    },
    function(error) {
        console.error('Failed to logout:', error);
    }
);
```

### 5. Get Platform Version

```javascript
TikTokBusinessSdk.getPlatformVersion(
    function(version) {
        console.log('Platform version:', version);
    },
    function(error) {
        console.error('Failed to get platform version:', error);
    }
);
```

## Available Events

The plugin provides a comprehensive set of predefined events accessible via `TikTokBusinessSdk.EventName`:

| Event | Constant |
|-------|----------|
| Achieve Level | `ACHIEVE_LEVEL` |
| Add Payment Info | `ADD_PAYMENT_INFO` |
| Complete Tutorial | `COMPLETE_TUTORIAL` |
| Create Group | `CREATE_GROUP` |
| Create Role | `CREATE_ROLE` |
| Generate Lead | `GENERATE_LEAD` |
| In-App Ad Click | `IN_APP_AD_CLICK` |
| In-App Ad Impression | `IN_APP_AD_IMPR` |
| Install App | `INSTALL_APP` |
| Join Group | `JOIN_GROUP` |
| Launch App | `LAUNCH_APP` |
| Loan Application | `LOAN_APPLICATION` |
| Loan Approval | `LOAN_APPROVAL` |
| Loan Disbursal | `LOAN_DISBURSAL` |
| Login | `LOGIN` |
| Rate | `RATE` |
| Registration | `REGISTRATION` |
| Search | `SEARCH` |
| Spend Credits | `SPEND_CREDITS` |
| Start Trial | `START_TRIAL` |
| Subscribe | `SUBSCRIBE` |
| Impression Level Ad Revenue | `IMPRESSION_LEVEL_AD_REVENUE` |
| Unlock Achievement | `UNLOCK_ACHIEVEMENT` |

## API Reference

### TikTokBusinessSdk.initTiktokBusinessSdk(config, success, error)

Initialize the TikTok Business SDK.

**Parameters:**
- `config` (Object) - Configuration object
  - `accessToken` (String, required) - Your TikTok Business SDK access token
  - `appId` (String, required) - Your application ID
  - `ttAppId` (String, required) - Your TikTok application ID
  - `openDebug` (Boolean, optional) - Enable debug mode (default: false)
  - `enableAutoIapTrack` (Boolean, optional) - Enable automatic in-app purchase tracking (default: true)
  - `disableAutoEnhancedDataPostbackEvents` (Boolean, optional) - Disable auto enhanced data postback events (default: false)
- `success` (Function) - Success callback
- `error` (Function) - Error callback

### TikTokBusinessSdk.setIdentify(identity, success, error)

Set user identity information.

**Parameters:**
- `identity` (Object) - Identity object
  - `externalId` (String, required) - External user identifier
  - `externalUserName` (String, optional) - External username
  - `phoneNumber` (String, optional) - User phone number
  - `email` (String, optional) - User email address
- `success` (Function) - Success callback
- `error` (Function) - Error callback

### TikTokBusinessSdk.trackTTEvent(eventData, success, error)

Track a TikTok event.

**Parameters:**
- `eventData` (Object) - Event data object
  - `event` (String, required) - Event name from EventName enum
  - `eventId` (String, optional) - Custom event identifier
- `success` (Function) - Success callback
- `error` (Function) - Error callback

### TikTokBusinessSdk.logout(success, error)

Logout the current user.

**Parameters:**
- `success` (Function) - Success callback
- `error` (Function) - Error callback

### TikTokBusinessSdk.getPlatformVersion(success, error)

Get the platform version information.

**Parameters:**
- `success` (Function) - Success callback with version string
- `error` (Function) - Error callback

## Error Handling

All methods provide error callbacks for handling failures:

```javascript
TikTokBusinessSdk.initTiktokBusinessSdk(
    config,
    function(success) {
        console.log('Success!');
    },
    function(error) {
        console.error('Error:', error);
        // Handle error appropriately
    }
);
```

## Platform-Specific Notes

### Android
- Requires minimum API level 21
- Automatically includes required dependencies:
  - TikTok Business Android SDK 1.5.0
  - Google Install Referrer 2.2
  - Google Billing Library 7.1.1
- Refer to TikTok docs for ProGuard rules and advanced setup: [Android Integration Guide](https://business-api.tiktok.com/portal/docs?id=1739585434183746)

### iOS
- Requires iOS 11.0+
- Automatically includes TikTok Business SDK 1.5.0 via CocoaPods
- Tracking authorization is handled automatically
- See: [iOS Integration Guide](https://business-api.tiktok.com/portal/docs?id=1739585432134657)

## Example App

Here's a complete example of using the plugin in a Cordova app:

```javascript
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        // Initialize TikTok SDK
        TikTokBusinessSdk.initTiktokBusinessSdk(
            {
                accessToken: 'YOUR_ACCESS_TOKEN',
                appId: 'YOUR_APP_ID',
                ttAppId: 'YOUR_TIKTOK_APP_ID',
                openDebug: true
            },
            function() {
                console.log('TikTok SDK initialized');
                app.setupEventListeners();
            },
            function(error) {
                console.error('SDK init failed:', error);
            }
        );
    },

    setupEventListeners: function() {
        // Login button
        document.getElementById('loginBtn').addEventListener('click', function() {
            TikTokBusinessSdk.setIdentify(
                {
                    externalId: 'user_' + Date.now(),
                    email: 'user@example.com'
                },
                function() {
                    TikTokBusinessSdk.trackTTEvent(
                        { event: TikTokBusinessSdk.EventName.LOGIN },
                        function() { console.log('Login tracked'); },
                        function(err) { console.error('Track failed:', err); }
                    );
                },
                function(err) { console.error('Identify failed:', err); }
            );
        });

        // Purchase button
        document.getElementById('purchaseBtn').addEventListener('click', function() {
            TikTokBusinessSdk.trackTTEvent(
                {
                    event: TikTokBusinessSdk.EventName.ADD_PAYMENT_INFO,
                    eventId: 'purchase_' + Date.now()
                },
                function() { console.log('Purchase tracked'); },
                function(err) { console.error('Track failed:', err); }
            );
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', function() {
            TikTokBusinessSdk.logout(
                function() { console.log('Logged out'); },
                function(err) { console.error('Logout failed:', err); }
            );
        });
    }
};

app.initialize();
```

## Troubleshooting

### Android

**Issue: Build fails with dependency conflicts**
- Solution: Make sure your `config.xml` has the correct Android platform version
- Check that JitPack repository is accessible

**Issue: ProGuard errors**
- Solution: Add the ProGuard rules mentioned in the Platform Setup section

### iOS

**Issue: Pod installation fails**
- Solution: Run `pod repo update` and try again
- Make sure you have CocoaPods 1.10.0 or later

**Issue: Tracking authorization not working**
- Solution: Ensure `NSUserTrackingUsageDescription` is in your Info.plist
- The plugin adds this automatically, but verify it's present

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [existing issues](https://github.com/yigit-serin/cordova-plugin-tiktok-business-sdk/issues)
2. Create a new issue with detailed information
3. Include your Cordova version, platform, and error logs

## Changelog

### 0.0.1 (Initial Release)
- Initial release with TikTok Business SDK 1.5.0 integration
- Support for Android and iOS platforms
- SDK initialization
- User identification
- Event tracking
- Logout functionality
- Debug mode support

## Disclaimer

This plugin is an independent, community-maintained project and is **not officially affiliated with, endorsed by, or supported by TikTok or ByteDance**. It serves as a wrapper around the official TikTok Business SDK native libraries to enable their use in Cordova applications.

For official TikTok Business SDK support and documentation, please refer to:
- [TikTok Business Android SDK](https://github.com/tiktok/tiktok-business-android-sdk)
- [TikTok Business iOS SDK](https://github.com/tiktok/tiktok-business-ios-sdk)
- [TikTok Business API Documentation](https://business-api.tiktok.com/portal/docs)

## Acknowledgments

- TikTok/ByteDance for developing and maintaining the native TikTok Business SDKs
- Cordova team for the excellent plugin framework
- Community contributors for feedback and improvements

## Related Resources

- [TikTok Business SDK Documentation](https://business-api.tiktok.com/portal/docs)
- [Android Integration Guide](https://business-api.tiktok.com/portal/docs?id=1739585434183746)
- [iOS Integration Guide](https://business-api.tiktok.com/portal/docs?id=1739585432134657)
- [Cordova Plugin Development Guide](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/)

## License

MIT License - See [LICENSE](LICENSE) file for details.

This plugin wraps the official TikTok Business SDK libraries, which are subject to their own licenses and terms of service.
