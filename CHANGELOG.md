# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Note**: This is a community-maintained plugin wrapping the official TikTok Business SDK native libraries.

## [0.0.1] - 2024-11-18

### Added
- Initial release of cordova-plugin-tiktok-business-sdk
- Community-developed wrapper for TikTok Business SDK 1.5.0
- Support for Android platform (API 21+)
- Support for iOS platform (iOS 11.0+)
- SDK initialization with configuration options
- User identification functionality
- Event tracking with predefined event names
- User logout functionality
- Debug mode support
- Automatic in-app purchase tracking
- Platform version detection
- Comprehensive documentation and examples

### Features
- **initTiktokBusinessSdk**: Initialize SDK with access token, app ID, and TikTok app ID
- **setIdentify**: Set user identity with external ID, username, phone, and email
- **trackTTEvent**: Track events with optional event ID
- **logout**: Clear user session
- **getPlatformVersion**: Get current platform version

### Event Types Supported
- ACHIEVE_LEVEL
- ADD_PAYMENT_INFO
- COMPLETE_TUTORIAL
- CREATE_GROUP
- CREATE_ROLE
- GENERATE_LEAD
- IN_APP_AD_CLICK
- IN_APP_AD_IMPR
- INSTALL_APP
- JOIN_GROUP
- LAUNCH_APP
- LOAN_APPLICATION
- LOAN_APPROVAL
- LOAN_DISBURSAL
- LOGIN
- RATE
- REGISTRATION
- SEARCH
- SPEND_CREDITS
- START_TRIAL
- SUBSCRIBE
- IMPRESSION_LEVEL_AD_REVENUE
- UNLOCK_ACHIEVEMENT

### Dependencies
#### Android
- TikTok Business Android SDK 1.5.0
- Google Install Referrer 2.2
- Google Billing Library 7.1.1

#### iOS
- TikTok Business SDK 1.5.0 (via CocoaPods)

### Documentation
- Complete README with installation instructions
- Platform-specific setup guides
- Usage examples
- API reference
- Troubleshooting section
- Example app implementation

### Notes
- Custom event support with string-based event names (Android fallback)
- Custom properties support via `trackTTEventWithCustomData` method

[0.0.1]: https://github.com/yigit-serin/cordova-plugin-tiktok-business-sdk/releases/tag/v0.0.1
