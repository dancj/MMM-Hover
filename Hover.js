var Gpio 		= require('onoff').Gpio;
var i2c 		= require('i2c-bus');

var i2cAddress = null,
	i2cBus = 0,
	pinTs = null,
	pinReset = null,
	bus = null,
	defaultRate = 10,
	buffer = new Buffer(18);
	
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

function Hover(address, tsPin, resetPin, i2cBusToUse) {
	this.debug = false;
	
	i2cAddress	= address;
	i2cBus		= i2cBusToUse;
	pinTs 		= new Gpio(tsPin, 'in');
	pinReset 	= new Gpio(resetPin, 'out');
}

Hover.prototype.init = function(handlerCallback) {
	var vm = this;
	
	return new Promise(function(resolve, reject) {
		
		bus = i2c.open(1, {}, function(err) {
			if(err) {
				if(vm.debug) {
					console.error(err);
				}
				
				reject(err);
			}else{
				setTimeout(function() {
					pinReset.write(true);
					pinReset.setDirection('in');

					setTimeout(function() {
						if(this.debug) {
							console.log('Hover ready');
						}
						
						resolve();
					}, 500);	
				}, 500);
			}
		});
	});
};

Hover.prototype.listen = function(callback, rate) {
	var vm = this;

	if(!rate) {
		rate = defaultRate;
	}

	setInterval(function() {
		pinTs.read(function(err, value) {
			if(value === 0) {
				pinTs.setDirection('out');
				pinTs.setActiveLow(false);
				
				try {
					bus.readI2cBlockSync(i2cAddress, 0, 18, buffer);
					
					var guestureEvent = buffer[10];
					var touchEvent = (((buffer[14] & 0b11100000) >> 5) | ((buffer[15] & 0b00000011) << 3));
					
					if(guestureEvent) {
						var eventValue = (1 << (buffer[10] - 1)).toString();	
						
						if(hoverGestureEvents[eventValue] !== undefined) {
							if(vm.debug) {
								console.log(hoverGestureEvents[eventValue]);
							}
							
							callback(hoverGestureEvents[eventValue]);
						}
					}

					if(touchEvent) {
						var eventValue = touchEvent.toString();
						
						if(hoverTapEvents[eventValue] !== undefined) {
							if(vm.debug) {
								console.log(hoverTapEvents[eventValue]);
							}
							
							callback(hoverTapEvents[eventValue]);
						}
					}
				} catch(e){
					console.error(e);
					console.error('Continuing to listen anyway');
				}
				
				pinTs.writeSync(1);
				pinTs.setDirection('in');
			}
		});
	}, rate);
};

module.exports = Hover;