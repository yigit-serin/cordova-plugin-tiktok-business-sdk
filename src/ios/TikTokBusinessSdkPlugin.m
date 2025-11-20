#import "TikTokBusinessSdkPlugin.h"
#import <TikTokBusinessSDK/TikTokBusinessSDK.h>

@implementation TikTokBusinessSdkPlugin

/**
 * Get platform version
 */
- (void)getPlatformVersion:(CDVInvokedUrlCommand*)command {
    NSString* version = [NSString stringWithFormat:@"iOS %@", [[UIDevice currentDevice] systemVersion]];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:version];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/**
 * Initialize TikTok Business SDK
 */
- (void)initTiktokBusinessSdk:(CDVInvokedUrlCommand*)command {
    NSDictionary* config = [command.arguments objectAtIndex:0];
    
    NSString* accessToken = [config objectForKey:@"accessToken"];
    NSString* appId = [config objectForKey:@"appId"];
    NSString* ttAppId = [config objectForKey:@"ttAppId"];
    BOOL openDebug = [[config objectForKey:@"openDebug"] boolValue];
    
    // enableAutoIapTrack defaults to true
    // If not provided or explicitly set to false, disable payment tracking
    id enableAutoIapTrackValue = [config objectForKey:@"enableAutoIapTrack"];
    BOOL enableAutoIapTrack = (enableAutoIapTrackValue == nil) ? YES : [enableAutoIapTrackValue boolValue];
    
    // Note: disableAutoEnhancedDataPostbackEvents is not available in iOS SDK
    // BOOL disableAutoEnhancedDataPostbackEvents = [[config objectForKey:@"disableAutoEnhancedDataPostbackEvents"] boolValue];
    
    if (!accessToken || [accessToken length] == 0 ||
        !appId || [appId length] == 0 ||
        !ttAppId || [ttAppId length] == 0) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR 
                                                          messageAsString:@"accessToken, appId, and ttAppId are required"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }
    
    // TikTok SDK configWithAccessToken method expects NSString for tiktokAppId
    // (despite the property being NSNumber in the header)
    TikTokConfig* ttConfig = [TikTokConfig configWithAccessToken:accessToken 
                                                           appId:appId 
                                                     tiktokAppId:ttAppId];
    
    if (openDebug) {
        [ttConfig enableDebugMode];
    }
    
    if (!enableAutoIapTrack) {
        [ttConfig disablePaymentTracking];
    }
    
    [ttConfig setLogLevel:TikTokLogLevelDebug];
    
    [TikTokBusiness initializeSdk:ttConfig completionHandler:^(BOOL success, NSError * _Nullable error) {
        CDVPluginResult* pluginResult;
        
        if (success) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        } else {
            NSString* errorMessage = error ? error.localizedDescription : @"Initialization failed";
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR 
                                              messageAsString:errorMessage];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

/**
 * Set user identity
 */
- (void)setIdentify:(CDVInvokedUrlCommand*)command {
    NSDictionary* identity = [command.arguments objectAtIndex:0];
    
    NSString* externalId = [identity objectForKey:@"externalId"];
    NSString* externalUserName = [identity objectForKey:@"externalUserName"];
    NSString* phoneNumber = [identity objectForKey:@"phoneNumber"];
    NSString* email = [identity objectForKey:@"email"];
    
    if (!externalId || [externalId length] == 0) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR 
                                                          messageAsString:@"externalId is required"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }
    
    [TikTokBusiness identifyWithExternalID:externalId 
                          externalUserName:externalUserName ?: @"" 
                               phoneNumber:phoneNumber ?: @"" 
                                     email:email ?: @""];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/**
 * Track TikTok event
 */
- (void)trackTTEvent:(CDVInvokedUrlCommand*)command {
    NSDictionary* eventData = [command.arguments objectAtIndex:0];
    
    NSString* eventName = [eventData objectForKey:@"eventName"];
    NSString* eventId = [eventData objectForKey:@"eventId"];
    
    if (!eventName || [eventName length] == 0) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR 
                                                          messageAsString:@"eventName is required"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }
    
    [TikTokBusiness trackEvent:eventName withId:eventId ?: @""];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/**
 * Track TikTok event with custom properties
 */
- (void)trackTTEventWithCustomData:(CDVInvokedUrlCommand*)command {
    NSDictionary* eventData = [command.arguments objectAtIndex:0];
    
    NSString* eventName = [eventData objectForKey:@"eventName"];
    NSString* eventId = [eventData objectForKey:@"eventId"];
    NSDictionary* properties = [eventData objectForKey:@"properties"];
    
    if (!eventName || [eventName length] == 0) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR 
                                                          messageAsString:@"eventName is required"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }
    
    // Create TikTokBaseEvent with custom properties
    TikTokBaseEvent* customEvent = [[TikTokBaseEvent alloc] initWithEventName:eventName];
    
    if (eventId && [eventId length] > 0) {
        [customEvent addPropertyWithKey:@"event_id" value:eventId];
    }
    
    // Add custom properties
    if (properties && [properties isKindOfClass:[NSDictionary class]]) {
        for (NSString* key in properties) {
            id value = properties[key];
            [customEvent addPropertyWithKey:key value:value];
        }
    }
    
    [TikTokBusiness trackTTEvent:customEvent];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/**
 * Logout current user
 */
- (void)logout:(CDVInvokedUrlCommand*)command {
    [TikTokBusiness logout];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
