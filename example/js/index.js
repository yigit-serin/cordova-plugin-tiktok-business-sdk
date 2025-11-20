var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        this.log('Device is ready', 'success');
        this.updateStatus('Device ready! Configure and initialize SDK.', 'success');
        this.setupEventListeners();
        this.getPlatformInfo();
    },

    // Setup event listeners
    setupEventListeners: function() {
        document.getElementById('initBtn').addEventListener('click', this.initializeSDK.bind(this));
        document.getElementById('identifyBtn').addEventListener('click', this.setUserIdentity.bind(this));
        document.getElementById('trackBtn').addEventListener('click', this.trackEvent.bind(this));
        document.getElementById('logoutBtn').addEventListener('click', this.logout.bind(this));
    },

    // Get platform information
    getPlatformInfo: function() {
        TikTokBusinessSdk.getPlatformVersion(
            function(version) {
                app.log('Platform: ' + version, 'info');
            },
            function(error) {
                app.log('Failed to get platform version: ' + error, 'error');
            }
        );
    },

    // Initialize TikTok SDK
    initializeSDK: function() {
        var accessToken = document.getElementById('accessToken').value;
        var appId = document.getElementById('appId').value;
        var ttAppId = document.getElementById('ttAppId').value;

        if (!accessToken || !appId || !ttAppId) {
            this.updateStatus('Please fill in all required fields', 'error');
            this.log('Missing required fields', 'error');
            return;
        }

        this.updateStatus('Initializing SDK...', 'info');
        this.log('Initializing SDK with provided credentials...', 'info');

        TikTokBusinessSdk.initTiktokBusinessSdk(
            {
                accessToken: accessToken,
                appId: appId,
                ttAppId: ttAppId,
                openDebug: true,
                enableAutoIapTrack: true,
                disableAutoEnhancedDataPostbackEvents: false
            },
            function() {
                app.updateStatus('SDK initialized successfully!', 'success');
                app.log('✓ SDK initialized successfully', 'success');
            },
            function(error) {
                app.updateStatus('SDK initialization failed: ' + error, 'error');
                app.log('✗ SDK initialization failed: ' + error, 'error');
            }
        );
    },

    // Set user identity
    setUserIdentity: function() {
        var userId = document.getElementById('userId').value;
        var userName = document.getElementById('userName').value;
        var userEmail = document.getElementById('userEmail').value;

        if (!userId) {
            this.updateStatus('User ID is required', 'error');
            this.log('User ID is required', 'error');
            return;
        }

        this.log('Setting user identity...', 'info');

        TikTokBusinessSdk.setIdentify(
            {
                externalId: userId,
                externalUserName: userName || null,
                email: userEmail || null
            },
            function() {
                app.updateStatus('User identity set successfully!', 'success');
                app.log('✓ User identity set: ' + userId, 'success');
            },
            function(error) {
                app.updateStatus('Failed to set identity: ' + error, 'error');
                app.log('✗ Failed to set identity: ' + error, 'error');
            }
        );
    },

    // Track event
    trackEvent: function() {
        var eventType = document.getElementById('eventType').value;
        var eventId = 'event_' + Date.now();

        this.log('Tracking event: ' + eventType + ' (ID: ' + eventId + ')', 'info');

        TikTokBusinessSdk.trackTTEvent(
            {
                event: TikTokBusinessSdk.EventName[eventType],
                eventId: eventId
            },
            function() {
                app.updateStatus('Event tracked successfully!', 'success');
                app.log('✓ Event tracked: ' + eventType, 'success');
            },
            function(error) {
                app.updateStatus('Failed to track event: ' + error, 'error');
                app.log('✗ Failed to track event: ' + error, 'error');
            }
        );
    },

    // Logout
    logout: function() {
        this.log('Logging out user...', 'info');

        TikTokBusinessSdk.logout(
            function() {
                app.updateStatus('User logged out successfully!', 'success');
                app.log('✓ User logged out', 'success');
                
                // Clear form fields
                document.getElementById('userId').value = '';
                document.getElementById('userName').value = '';
                document.getElementById('userEmail').value = '';
            },
            function(error) {
                app.updateStatus('Failed to logout: ' + error, 'error');
                app.log('✗ Failed to logout: ' + error, 'error');
            }
        );
    },

    // Update status message
    updateStatus: function(message, type) {
        var statusEl = document.getElementById('status');
        statusEl.textContent = message;
        statusEl.className = 'status ' + type;
    },

    // Add log entry
    log: function(message, type) {
        var logEl = document.getElementById('log');
        var entry = document.createElement('div');
        entry.className = 'log-entry ' + (type || 'info');
        
        var timestamp = new Date().toLocaleTimeString();
        entry.textContent = '[' + timestamp + '] ' + message;
        
        logEl.appendChild(entry);
        logEl.scrollTop = logEl.scrollHeight;
    }
};

// Initialize app
app.initialize();
