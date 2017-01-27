# Unofficial HoverLabs Hover (Version 1) NodeJS Module

HoverLabs ships a really neat board which lets your users interact with circuits using in-air gestures and taps. I've ported the Python library for the legacy Hover (has not been tested with the new, but might be backwards compatible) to use in NodeJS becuase I hate Python.

## Important

This library is only meant to detect things for the legacy Hover board, or Hover Original. I'm waiting on my 2.0 board to write up a v2 version. 

## Requirements

I have tested and built this using NodeJS ~4.x, Rasbpian running Jessie, on a PI 3. I'm curious to see how capable other boards or set ups are, the libraries should be pretty straight forward and compatible with other node versions.

## Installation

Grab it with NPM

`npm install hover-nodejs --save`

Then require it in your project `var Hover = require('hover-nodejs');`

## Use it

Here's a full working sample:

```javascript

var Hover = require('hover-nodejs');

var hover = new Hover(0x42, 23, 24, 1); // These are the default pins and addresses that HoverLabs uses in all their Pi samples.

//hover.debug = true; // Uncomment this to see a few behind the scenes logs in case you're having trouble

hover.init().then(function() {
	// Ready to listen or do anything else
	console.log('Hover ready');
	
	hover.listen(handleHoverEvent, 1);
	
}, function(error) {
	console.error('Could not init hover board');
	console.error(error);
});

var handleHoverEvent = function(event) {
	console.log(event);
};
```

That's it. Dead simple, asyncronous, and ready for action.
