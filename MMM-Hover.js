/* global Module */

/* Magic Mirror
 * Module: MMM-Hover
 *
 * By (Dancj) Dan Thayer
 * MIT Licensed.
 */

Module.register("MMM-Hover", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
		i2cAddress: null,
		i2cBus: 0,
		pinTs: null,
		pinReset: null,
		defaultRate: 10,
		pollRate: 0,
		debug: false,
		triggeredEvents: { // TODO: trigger multiple events from the same event
			tap: {
				north: "",
				south: "",
				west: "PAGE_DECREMENT",
				east: "PAGE_INCREMENT",
				center: ""
			},
			swipe: {
				up: "",
				down: "",
				left: "PAGE_DECREMENT",
				right: "PAGE_INCREMENT"
			}
		}
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;

		this.sendSocketNotification("CONFIG", this.config);
		Log.info("Starting module: " + this.name);

		// TODO: show DOM message?
	},
	
	notificationReceived: function (notification, payload, sender) {
		// do nothing
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "SWIPE") {

			var event = this.config.triggeredEvents.swipe[payload];
			Log.info("Hover detected Swipe in direction: " + payload + ", triggering: " + event);
			if (event) {
				// report out to listeners
				this.sendNotification(event, "");
			}

		} else if (notification === "TAP") {

			var event = this.config.triggeredEvents.tap[payload];
			Log.info("Hover detected Tap at position: " + payload + ", triggering" + event);
			if (event) {
				this.sendNotification(event, "");
			}
		}
	}
});
