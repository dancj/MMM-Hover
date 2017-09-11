/* global Module */

/* Magic Mirror
 * Module: MMM-Hover
 *
 * By Dancj
 * ISC Licensed.
 */

Module.register("{{MODULE_NAME}}", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
		i2cAddress = null,
		i2cBus = 0,
		pinTs = null,
		pinReset = null,
		defaultRate = 10
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;

		this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);

		// TODO: show DOM message
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "SWIPE") {
			this.gesture = payload;
			this.updateDom();

			// report out to listeners
			this.sendNotification(notification, payload);

		} else if (notification === "TAP") {
			this.tap = payload;
			this.updateDom();

			this.sendNotification(notification, payload);
		}
	}
});
