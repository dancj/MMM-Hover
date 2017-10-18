# MMM-Hover
This is a [MagicMirror](https://github.com/MichMich/MagicMirror) module to communicate with the  
[HoverLabs Hover](http://www.hoverlabs.co/products/hover/) (Unofficial). The Hover can detect a hand direction swiping in front of it (Up, Down, Left, Right) and taps on the board surface (Top, Left, Bottom, Top, Middle).

Uses NPM package hover-nodejs, which is based on the original python library from HoverLabs, [linked here](https://github.com/NorthMcCormick/hover-nodejs/blob/master/Hover.js).

Getting events from the Hover board is cool and all, but to make it useful these events can trigger notifications to other modules. For example, configured by default, swiping or tapping left/right will send off ```PAGE_DECREMENT``` and ```PAGE_INCREMENT``` for the [MMM-pages](https://github.com/edward-shen/MMM-pages) module to change pages.

## Installation

```
cd ~/MagicMirror/modules
git clone https://github.com/dancj/MMM-Hover

cd MMM-Hover && npm install
```

This installs required NPM packages. Set up your GPIO pins of choice in the config file.

If you have any suggestions, please let me know [with an issue](https://github.com/dancj/MMM-Hover/issues/new).

## Using the module
To use this module, add it to the modules array in the config/config.js file:
```
modules: [
	{
		module: 'MMM-Hover',
		config: {
			// See 'Configuration options' for more information.
			i2cAddress: 0x42,
			pinTs: 23,
			pinReset: 24,
			pollRate: 10
		}
	}
]
```

To customize the events triggered by Hover events, use this option:
```
modules: [
	{
		module: 'MMM-Hover',
		config: {
			// See 'Configuration options' for more information.
			i2cAddress: 0x42,
			pinTs: 23,
			pinReset: 24,
			pollRate: 10,
			triggeredEvents: {
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
		}
	}
]
```


## Raspberry Pi GPIO Pins

1. HOST_V+    ----    3V3 pin
1. RESET      ----    Any digital pin, for example: pin 18, GPIO 24 (BCM Mode)
1. SCL        ----    SCL pin
1. SDA        ----    SDA pin
1. GND        ----    Ground Pin
1. 3V3        ----    3V3 pin
1. TS         ----    Any digital pin, for example: pin 16, GPIO 23 (BCM Mode)

## Configuration Options
The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>updateInterval</code></td>
			<td>Time in ms to update display</td>
		</tr>
    <tr>
			<td><code>i2cAddress</code></td>
			<td>i2c address<br>
				<br><b>Value from HoverLabs library:</b> <code>0x42</code>
			</td>
		</tr>
    <tr>
			<td><code>pinTs</code></td>
			<td>Input pin for hover board, which will receive an 8-bit binary value to indicate the event type, gesture direction, and tap location.<br>
				<br><b>Value from HoverLabs library:</b> <code>23</code>
        <br>Note: please use BCM numbering
			</td>
		</tr>
    <tr>
			<td><code>pinReset</code></td>
			<td>Reset pin<br>
				<br><b>Value from HoverLabs library:</b> <code>24</code>
        <br>Note: please use BCM numbering
			</td>
		</tr>
    <tr>
      <td><code>pollRate</code></td>
      <td>Polling rate in milliseconds to check for input from hover board<br>
        <br><b>Value from HoverLabs library:</b> <code>1</code>
      </td>
    </tr>
		<tr>
      <td><code>debug</code></td>
      <td>Put module in debug mode (prints messages to browser console)<br>
        <br><b>Default value:</b> <code>false</code>
      </td>
    </tr>
		<tr>
      <td><code>triggeredEvents</code></td>
      <td>Notifications that get fired off upon the different taps and swipes received from Hover. Empty strings result in no action.<br>
        <br><b>Default value:</b>

```
				{
					tap: {
						up: "",
						down: "",
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
```
      </td>
    </tr>
	</tbody>
</table>


## Dependencies

Installed via `npm install`
* [hover-nodejs](https://github.com/NorthMcCormick/hover-nodejs)

## Troubleshooting

1. Page won't change

	- Check that LED on back of Hover board is lit. If not power wires are not correct
	- Check that python library from Hoverlabs works, [found here](https://github.com/hoverlabs/hover_raspberrypi). If this detects motion, you have the wiring correct.
	- Check that [MMM-pages](https://github.com/edward-shen/MMM-pages) is installed


## Developers

Run the `test` npm script, which runs linters

```
npm test
```

## LICENSE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
