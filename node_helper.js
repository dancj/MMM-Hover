/* Magic Mirror
 * Node Helper: MMM-Hover
 *
 * By Dancj
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var Hover 	   = require("hover-nodejs");

const hoverGestureEvents = {
	"2": "swipe-right",
	"4": "swipe-left",
	"8": "swipe-up",
	"16": "swipe-down"
};

var hoverTapEvents = {
	"1": "tap-south",
	"2": "tap-west",
	"4": "tap-north",
	"8": "tap-east",
	"16": "tap-center"
};

module.exports = NodeHelper.create({
	start: function () {
		console.log("[Hover] Starting node_helper");
		this.started = false;
	},

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		console.log("[Hover] received socket notification");
		if (notification === "CONFIG" && this.started == false) {
    		console.log("[Hover] Creatig hover in node_helper");
			const self = this;
			self.config = payload;

			var i2cBus = 1;
			var hover = new Hover(
				self.config.i2cAddress,
				self.config.pinTs,
				self.config.pinReset,
				i2cBus);

			hover.init().then(function() {
				console.log("[Hover] board ready for input");

				hover.listen(self.handleHoverEvent, self.config.pollRate || self.config.defaultRate);
			}, function (err) {
				console.error("[Hover] Could not init hover board: " + err);
			});

			self.started = true;
		}
	},

	handleHoverEvent: function (event) {
		if (this.config.debug) {
			console.log("[Hover] handled event: " + event);
		}

		if (event.substr(0,3) === "tap") {
			this.sendSocketNotification("TAP", event.substr(4));
		} else if (event.substr(0,5) === "swipe"){
			this.sendSocketNotification("SWIPE", event.substr(6);
		} else {
			console.log("[Hover] unknown event received from board: " + event);
		}
	}

});
