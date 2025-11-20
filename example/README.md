# TikTok Business SDK Example App

This is a complete example application demonstrating how to use the cordova-plugin-tiktok-business-sdk in a Cordova app.

> **Note**: This example uses a community-developed plugin that wraps the official TikTok Business SDK native libraries.

## Features Demonstrated

- ✅ SDK Initialization
- ✅ User Identity Management
- ✅ Event Tracking
- ✅ User Logout
- ✅ Platform Version Detection
- ✅ Error Handling
- ✅ Activity Logging

## Setup

### 1. Create a new Cordova project

```bash
cordova create TikTokExample com.example.tiktok TikTokExample
cd TikTokExample
```

### 2. Add platforms

```bash
cordova platform add android
cordova platform add ios
```

### 3. Install the plugin

```bash
# Install from local directory
cordova plugin add /path/to/cordova-plugin-tiktok-business-sdk

# Or install from npm (when published)
# cordova plugin add cordova-plugin-tiktok-business-sdk
```

### 4. Copy example files

Copy the contents of this example directory to your Cordova project's `www` directory:

```bash
cp -r example/* /path/to/TikTokExample/www/
```

### 5. Configure your credentials

Open `www/index.html` in a browser or text editor and enter your TikTok Business SDK credentials:
- Access Token
- App ID
- TikTok App ID

You can get these credentials from the [TikTok Business Center](https://business.tiktok.com/).

### 6. Build and run

#### For Android:
```bash
cordova build android
cordova run android
```

#### For iOS:
```bash
cordova build ios
cordova run ios
```

## Usage Guide

### 1. Initialize SDK

1. Enter your credentials in the form fields:
   - Access Token
   - App ID
   - TikTok App ID
2. Click "Initialize SDK" button
3. Wait for success message

### 2. Set User Identity

1. Enter user information:
   - User ID (required)
   - Username (optional)
   - Email (optional)
2. Click "Set Identity" button

### 3. Track Events

1. Select an event type from the dropdown
2. Click "Track Event" button
3. The event will be tracked with a unique event ID

### 4. Logout

Click "Logout User" button to clear the current user session.

## Available Event Types

The example app includes the following event types:

- **LOGIN**: User login
- **REGISTRATION**: User registration
- **ADD_PAYMENT_INFO**: User added payment information
- **COMPLETE_TUTORIAL**: User completed tutorial
- **ACHIEVE_LEVEL**: User achieved a level
- **SEARCH**: User performed a search
- **SUBSCRIBE**: User subscription

You can add more event types by editing the `eventType` select element in `index.html`.

## Activity Log

The app includes an activity log that shows:
- SDK initialization status
- User identity updates
- Event tracking results
- Error messages
- Timestamps for all actions

## Customization

### Adding More Event Types

Edit `index.html` and add more options to the event type select:

```html
<select id="eventType">
    <option value="LOGIN">Login</option>
    <option value="YOUR_EVENT">Your Event</option>
    <!-- Add more events -->
</select>
```

### Styling

The app uses inline CSS for simplicity. You can extract the styles to a separate CSS file:

1. Create `www/css/index.css`
2. Move the `<style>` content to the CSS file
3. Link it in `index.html`:

```html
<link rel="stylesheet" href="css/index.css">
```

### Debug Mode

Debug mode is enabled by default in the example. To disable it, modify the initialization in `js/index.js`:

```javascript
TikTokBusinessSdk.initTiktokBusinessSdk(
    {
        accessToken: accessToken,
        appId: appId,
        ttAppId: ttAppId,
        openDebug: false, // Change to false
        enableAutoIapTrack: true,
        disableAutoEnhancedDataPostbackEvents: false
    },
    // ...
);
```

## Troubleshooting

### SDK Initialization Fails

- Verify your credentials are correct
- Check that you have internet connectivity
- Ensure the plugin is properly installed: `cordova plugin ls`
- Check the device logs for detailed error messages

### Events Not Tracking

- Make sure SDK is initialized before tracking events
- Verify user identity is set if required
- Check the activity log for error messages

### iOS Build Issues

- Run `pod install` in the `platforms/ios` directory
- Ensure you have the latest CocoaPods version
- Check that iOS deployment target is set to 11.0 or higher

### Android Build Issues

- Verify Android SDK is properly configured
- Check that minimum SDK version is 21 or higher
- Ensure JitPack repository is accessible

## Testing

### Test Credentials

For testing purposes, you can use test credentials provided by TikTok Business. Contact TikTok Business support to get test credentials.

### Test Events

The example app generates unique event IDs using timestamps. In production, you should use meaningful event IDs that help you track user actions.

## Production Checklist

Before deploying to production:

- [ ] Replace test credentials with production credentials
- [ ] Disable debug mode (`openDebug: false`)
- [ ] Implement proper error handling
- [ ] Add analytics for tracking plugin usage
- [ ] Test on multiple devices and OS versions
- [ ] Review and comply with TikTok's privacy policies
- [ ] Implement user consent for tracking (if required by law)

## Resources

- [TikTok Business SDK Documentation](https://business-api.tiktok.com/portal/docs)
- [Plugin Documentation](../README.md)
- [Cordova Documentation](https://cordova.apache.org/docs/en/latest/)

## Support

If you encounter any issues with the example app:

1. Check the [main plugin README](../README.md)
2. Review the [troubleshooting section](#troubleshooting)
3. Open an issue on GitHub with:
   - Device information
   - OS version
   - Error messages
   - Steps to reproduce

## License

This example app is provided as-is under the MIT License.
