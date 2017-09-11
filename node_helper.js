/* Magic Mirror
 * Node Helper: MMM-Hover
 *
 * By Dancj
 * ISC Licensed.
 */

var NodeHelper = require("node_helper");
var Gpio 		= require('onoff').Gpio;
var i2c 		= require('i2c-bus');

var i2cBus = null;

const hoverGestureEvents = {
	'2': 'swipe-right',
	'4': 'swipe-left',
	'8': 'swipe-up',
	'16': 'swipe-down'
};

var hoverTapEvents = {
	'1': 'tap-south',
	'2': 'tap-west',
	'4': 'tap-north',
	'8': 'tap-east',
	'16': 'tap-center'
};

module.exports = NodeHelper.create({
	start: function () {
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
		if (notification === 'CONFIG' && this.started == false) {
      	const self = this;
				this.config = payload;

				this.pinTs 		= new Gpio(this.config.pinTs, 'in');
				this.pinReset = new Gpio(this.config.resetPin, 'out');

		}
	},

	initHover: function (callback) {
		var self = this;

		return new Promise(function (resolve, reject) {
			i2cBus = i2c.open(1, {}, function (err) {
				if (err) {
					if (self.config.debug) {
						console.error(err);
					}
					reject(err);
				} else {
					setTimeout(function() {
						self.pinReset.write(true);
						self.pinReset.setDirection('in');

						setTimeout(function () {
							if (self.config.debug) {
								console.log('hover ready');
							}
							resolve();
						}, 500);
					}, 500);
				}
			})
		});
	},

	/// Magic numbers and bitwise math in here come from HoverLabs python library for RPi
	/// https://github.com/hoverlabs/hover_raspberrypi/blob/master/Hover_library.py
	listenHover: function (callback, rate) {
		var self = this;

		if (!rate) {
			rate = self.config.defaultRate;

			setInterval(function () {
				self.pinTs.read(function(err, value) {
					if (value === 0) {
						pinTs.setDirection('out');
						pinTs.setActiveLow(false);

						try {
							i2cBus.readI2cBlockSync(self.config.i2cAddress, 0, 18, buffer);

							var gestureEvent = buffer[10];
							var touchEvent = (((buffer[14] & 0b11100000) >> 5 | ((buffer[15] & 0b00000011) << 3));

							if (gestureEvent) {
								var eventValue = (1 << (buffer[10] - 1)).toString();

								if (hoverGestureEvents[eventValue] !== undefined) {
									if (self.config.debug) {
										console.log(hoverGestureEvents[eventValue]);
									}
									callback(hoverGestureEvents[eventValue]);
								}
							}

							if (touchEvent) {
								var eventValue = touchEvent.toString();

								if (hoverTapEvents[eventValue] !== undefined) {
									if (self.config.debug) {
										console.log(hoverTapEvents[eventValue]);
									}
									callback(hoverTapEvents[eventValue]);
								}
							}
						} catch (e) {
							console.error(e);
							console.error('MMM-Hover continuing to listen anyway');
						}

						pinTs.writeSync(1);
						pinTs.setDirection('in');
					}
				});
			}, rate);
		}
	}

});
