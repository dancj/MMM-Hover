# MMM-Hover
This is a [MagicMirror](https://github.com/MichMich/MagicMirror) module to communicate with the  
[HoverLabs Hover](http://www.hoverlabs.co/products/hover/) (Unofficial). The Hover can detect a hand direction swiping in front of it (Up, Down, Left, Right) and taps on the board surface (Top, Left, Bottom, Top, Middle).

Based on a JS adaptation of the original python library from HoverLabs, [linked here](https://github.com/NorthMcCormick/hover-nodejs/blob/master/Hover.js).

```
cd MMM-Hover && npm install
```

Run the `test` npm script

```
npm test
```

## Installation

```
cd MMM-Hover && npm install
```

This installs required NPM packages. Set up your pins of choice in the config file.

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
	</tbody>
</table>


## Dependencies

Installed via `npm install`
* [onoff](https://www.npmjs.com/package/onoff)
* [i2c-bus](https://www.npmjs.com/package/i2c-bus)

## Developers

Pull requests welcome.

Current Tests:
* [ESLint](http://eslint.org/) for linting the javascript
* [stylelint](https://stylelint.io/) for linting the CSS with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) as its base
* [jsonlint](https://github.com/zaach/jsonlint) for linting the translation files
* [markdownlint](https://github.com/DavidAnson/markdownlint) for checking the markdown files (`README.md`, `CHANGELOG.md`, `LICENSE.txt`)
* [js-yaml](https://github.com/nodeca/js-yaml) to lint the `.travis.yml` (run through [grunt-yamllint](https://github.com/geedew/grunt-yamllint))

## LICENSE

Copyright for portions of project MMM-Hover are held by NorthMcCormick, 2017 as part of project hover-nodejs. Adapted by dancj, 2017 to fit in a MagicMirror Module.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
