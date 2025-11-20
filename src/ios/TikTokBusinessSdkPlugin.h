#import <Cordova/CDV.h>

@interface TikTokBusinessSdkPlugin : CDVPlugin

- (void)getPlatformVersion:(CDVInvokedUrlCommand*)command;
- (void)initTiktokBusinessSdk:(CDVInvokedUrlCommand*)command;
- (void)setIdentify:(CDVInvokedUrlCommand*)command;
- (void)trackTTEvent:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;

@end
