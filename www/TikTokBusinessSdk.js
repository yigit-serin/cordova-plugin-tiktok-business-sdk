var exec = require('cordova/exec');

/**
 * TikTok Business SDK Event Names
 */
var EventName = {
    ACHIEVE_LEVEL: 'ACHIEVE_LEVEL',
    ADD_PAYMENT_INFO: 'ADD_PAYMENT_INFO',
    COMPLETE_TUTORIAL: 'COMPLETE_TUTORIAL',
    CREATE_GROUP: 'CREATE_GROUP',
    CREATE_ROLE: 'CREATE_ROLE',
    GENERATE_LEAD: 'GENERATE_LEAD',
    IN_APP_AD_CLICK: 'IN_APP_AD_CLICK',
    IN_APP_AD_IMPR: 'IN_APP_AD_IMPR',
    INSTALL_APP: 'INSTALL_APP',
    JOIN_GROUP: 'JOIN_GROUP',
    LAUNCH_APP: 'LAUNCH_APP',
    LOAN_APPLICATION: 'LOAN_APPLICATION',
    LOAN_APPROVAL: 'LOAN_APPROVAL',
    LOAN_DISBURSAL: 'LOAN_DISBURSAL',
    LOGIN: 'LOGIN',
    RATE: 'RATE',
    REGISTRATION: 'REGISTRATION',
    SEARCH: 'SEARCH',
    SPEND_CREDITS: 'SPEND_CREDITS',
    START_TRIAL: 'START_TRIAL',
    SUBSCRIBE: 'SUBSCRIBE',
    IMPRESSION_LEVEL_AD_REVENUE: 'IMPRESSION_LEVEL_AD_REVENUE',
    UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT'
};

/**
 * TikTok Business SDK Plugin
 */
var TikTokBusinessSdk = {
    /**
     * Event names constant
     */
    EventName: EventName,

    /**
     * Get platform version
     * @param {Function} success - Success callback
     * @param {Function} error - Error callback
     */
    getPlatformVersion: function(success, error) {
        exec(success, error, 'TikTokBusinessSdk', 'getPlatformVersion', []);
    },

    /**
     * Initialize TikTok Business SDK
     * @param {Object} config - Configuration object
     * @param {string} config.accessToken - TikTok Business SDK access token (required)
     * @param {string} config.appId - Application ID (required)
     * @param {string} config.ttAppId - TikTok application ID (required)
     * @param {boolean} [config.openDebug=false] - Enable debug mode
     * @param {boolean} [config.enableAutoIapTrack=true] - Enable automatic in-app purchase tracking
     * @param {boolean} [config.disableAutoEnhancedDataPostbackEvents=false] - Disable auto enhanced data postback events
     * @param {Function} success - Success callback
     * @param {Function} error - Error callback
     */
    initTiktokBusinessSdk: function(config, success, error) {
        if (!config || !config.accessToken || !config.appId || !config.ttAppId) {
            error('accessToken, appId, and ttAppId are required');
            return;
        }

        var args = {
            accessToken: config.accessToken,
            appId: config.appId,
            ttAppId: String(config.ttAppId), // Ensure ttAppId is always a string
            openDebug: config.openDebug || false,
            enableAutoIapTrack: config.enableAutoIapTrack !== false,
            disableAutoEnhancedDataPostbackEvents: config.disableAutoEnhancedDataPostbackEvents || false
        };

        exec(success, error, 'TikTokBusinessSdk', 'initTiktokBusinessSdk', [args]);
    },

    /**
     * Set user identity
     * @param {Object} identity - Identity object
     * @param {string} identity.externalId - External user identifier (required)
     * @param {string} [identity.externalUserName] - External username
     * @param {string} [identity.phoneNumber] - User phone number
     * @param {string} [identity.email] - User email address
     * @param {Function} success - Success callback
     * @param {Function} error - Error callback
     */
    setIdentify: function(identity, success, error) {
        if (!identity || !identity.externalId) {
            error('externalId is required');
            return;
        }

        var args = {
            externalId: identity.externalId,
            externalUserName: identity.externalUserName || null,
            phoneNumber: identity.phoneNumber || null,
            email: identity.email || null
        };

        exec(success, error, 'TikTokBusinessSdk', 'setIdentify', [args]);
    },

    /**
     * Track TikTok event
     * @param {Object} eventData - Event data object
     * @param {string} eventData.event - Event name from EventName enum (required)
     * @param {string} [eventData.eventId] - Custom event identifier
     * @param {Function} success - Success callback
     * @param {Function} error - Error callback
     */
    trackTTEvent: function(eventData, success, error) {
        if (!eventData || !eventData.event) {
            error('event is required');
            return;
        }

        var args = {
            eventName: eventData.event,
            eventId: eventData.eventId || null
        };

        exec(success, error, 'TikTokBusinessSdk', 'trackTTEvent', [args]);
    },

    /**
     * Track TikTok event with custom properties
     * @param {Object} eventData - Event data object
     * @param {string} eventData.eventName - Event name (required)
     * @param {string} [eventData.eventId] - Custom event identifier
     * @param {Object} [eventData.properties] - Custom properties object
     * @param {Function} success - Success callback
     * @param {Function} error - Error callback
     */
    trackTTEventWithCustomData: function(eventData, success, error) {
        if (!eventData || !eventData.eventName) {
            error('eventName is required');
            return;
        }

        var args = {
            eventName: eventData.eventName,
            eventId: eventData.eventId || null,
            properties: eventData.properties || {}
        };

        exec(success, error, 'TikTokBusinessSdk', 'trackTTEventWithCustomData', [args]);
    },

    /**
     * Logout current user
     * @param {Function} success - Success callback
     * @param {Function} error - Error callback
     */
    logout: function(success, error) {
        exec(success, error, 'TikTokBusinessSdk', 'logout', []);
    }
};

module.exports = TikTokBusinessSdk;
