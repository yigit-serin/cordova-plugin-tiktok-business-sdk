package com.tiktok.cordova;

import android.content.Context;
import com.tiktok.TikTokBusinessSdk;
import com.tiktok.appevents.base.EventName;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

/**
 * TikTok Business SDK Cordova Plugin for Android
 */
public class TikTokBusinessSdkPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Context context = this.cordova.getActivity().getApplicationContext();

        switch (action) {
            case "getPlatformVersion":
                this.getPlatformVersion(callbackContext);
                return true;

            case "initTiktokBusinessSdk":
                JSONObject config = args.getJSONObject(0);
                this.initTiktokBusinessSdk(config, callbackContext, context);
                return true;

            case "setIdentify":
                JSONObject identity = args.getJSONObject(0);
                this.setIdentify(identity, callbackContext);
                return true;

            case "trackTTEvent":
                JSONObject eventData = args.getJSONObject(0);
                this.trackTTEvent(eventData, callbackContext);
                return true;

            case "trackTTEventWithCustomData":
                JSONObject customEventData = args.getJSONObject(0);
                this.trackTTEventWithCustomData(customEventData, callbackContext);
                return true;

            case "logout":
                this.logout(callbackContext);
                return true;

            default:
                return false;
        }
    }

    /**
     * Get platform version
     */
    private void getPlatformVersion(CallbackContext callbackContext) {
        String version = "Android " + android.os.Build.VERSION.RELEASE;
        callbackContext.success(version);
    }

    /**
     * Initialize TikTok Business SDK
     */
    private void initTiktokBusinessSdk(JSONObject config, CallbackContext callbackContext, Context context) {
        try {
            String accessToken = config.getString("accessToken");
            String appId = config.getString("appId");
            String ttAppId = config.getString("ttAppId");
            boolean openDebug = config.optBoolean("openDebug", false);
            boolean enableAutoIapTrack = config.optBoolean("enableAutoIapTrack", true);
            boolean disableAutoEnhancedDataPostbackEvents = config.optBoolean("disableAutoEnhancedDataPostbackEvents", false);

            if (accessToken == null || accessToken.isEmpty() ||
                appId == null || appId.isEmpty() ||
                ttAppId == null || ttAppId.isEmpty()) {
                callbackContext.error("accessToken, appId, and ttAppId are required");
                return;
            }

            TikTokBusinessSdk.TTConfig ttConfig = new TikTokBusinessSdk.TTConfig(context, accessToken);
            ttConfig.setAppId(appId);
            ttConfig.setTTAppId(ttAppId);

            if (openDebug) {
                ttConfig.openDebugMode();
            }

            if (enableAutoIapTrack) {
                ttConfig.enableAutoIapTrack();
            }

            if (disableAutoEnhancedDataPostbackEvents) {
                ttConfig.disableAutoEnhancedDataPostbackEvent();
            }

            TikTokBusinessSdk.initializeSdk(ttConfig, new TikTokBusinessSdk.TTInitCallback() {
                @Override
                public void success() {
                    callbackContext.success();
                }

                @Override
                public void fail(int code, String msg) {
                    callbackContext.error("Initialization failed: " + msg + " (code: " + code + ")");
                }
            });

        } catch (JSONException e) {
            callbackContext.error("Invalid configuration: " + e.getMessage());
        }
    }

    /**
     * Set user identity
     */
    private void setIdentify(JSONObject identity, CallbackContext callbackContext) {
        try {
            String externalId = identity.getString("externalId");
            String externalUserName = identity.optString("externalUserName", null);
            String phoneNumber = identity.optString("phoneNumber", null);
            String email = identity.optString("email", null);

            if (externalId == null || externalId.isEmpty()) {
                callbackContext.error("externalId is required");
                return;
            }

            TikTokBusinessSdk.identify(externalId, externalUserName, phoneNumber, email);
            callbackContext.success();

        } catch (JSONException e) {
            callbackContext.error("Invalid identity data: " + e.getMessage());
        }
    }

    /**
     * Track TikTok event
     */
    private void trackTTEvent(JSONObject eventData, CallbackContext callbackContext) {
        try {
            String eventName = eventData.getString("eventName");
            String eventId = eventData.optString("eventId", null);

            if (eventName == null || eventName.isEmpty()) {
                callbackContext.error("eventName is required");
                return;
            }

            // Try to use predefined EventName enum first, fallback to custom event string
            try {
                EventName event = EventName.valueOf(eventName);
                
                if (eventId != null && !eventId.isEmpty()) {
                    TikTokBusinessSdk.trackTTEvent(event, eventId);
                } else {
                    TikTokBusinessSdk.trackTTEvent(event);
                }
            } catch (IllegalArgumentException e) {
                // Not a predefined event, use custom event with string
                if (eventId != null && !eventId.isEmpty()) {
                    TikTokBusinessSdk.trackEvent(eventName, eventId);
                } else {
                    TikTokBusinessSdk.trackEvent(eventName);
                }
            }

            callbackContext.success("Event tracked successfully");

        } catch (JSONException e) {
            callbackContext.error("Invalid event data: " + e.getMessage());
        } catch (Exception e) {
            callbackContext.error("Track event failed: " + e.getMessage());
        }
    }

    /**
     * Track TikTok event with custom properties
     */
    private void trackTTEventWithCustomData(JSONObject eventData, CallbackContext callbackContext) {
        try {
            String eventName = eventData.getString("eventName");
            String eventId = eventData.optString("eventId", null);
            JSONObject properties = eventData.optJSONObject("properties");

            if (eventName == null || eventName.isEmpty()) {
                callbackContext.error("eventName is required");
                return;
            }

            // Create properties object with custom properties
            JSONObject props = new JSONObject();
            
            if (eventId != null && !eventId.isEmpty()) {
                props.put("event_id", eventId);
            }

            // Add custom properties
            if (properties != null) {
                Iterator<String> keys = properties.keys();
                while (keys.hasNext()) {
                    String key = keys.next();
                    Object value = properties.get(key);
                    props.put(key, value);
                }
            }

            TikTokBusinessSdk.trackEvent(eventName, props);
            callbackContext.success("Event with custom data tracked successfully");

        } catch (JSONException e) {
            callbackContext.error("Invalid event data: " + e.getMessage());
        } catch (Exception e) {
            callbackContext.error("Track event with custom data failed: " + e.getMessage());
        }
    }

    /**
     * Logout current user
     */
    private void logout(CallbackContext callbackContext) {
        TikTokBusinessSdk.logout();
        callbackContext.success();
    }
}
