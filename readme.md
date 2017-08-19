# MagicMirror-Module-Hover
This is a [MagicMirror](https://github.com/MichMich/MagicMirror) module to communicate with the  
[HoverLabs Hover](http://www.hoverlabs.co/products/hover/). The Hover can detect a hand direction swiping in front of it (Up, Down, Left, Right) and taps on the board surface (Top, Left, Bottom, Top, Middle).

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
		}
	}
]
```

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
			<td><code>sensorPIN</code></td>
			<td>The pin your PIR-sensor is connected to.<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>22</code>
				<br><b>Note:</b> Please use BCM-numbering.
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
- [ESLint](http://eslint.org/) for linting the javascript
- [stylelint](https://stylelint.io/) for linting the CSS with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) as its base
- [jsonlint](https://github.com/zaach/jsonlint) for linting the translation files
- [markdownlint](https://github.com/DavidAnson/markdownlint) for checking the markdown files (`README.md`, `CHANGELOG.md`, `LICENSE.txt`)
- [js-yaml](https://github.com/nodeca/js-yaml) to lint the `.travis.yml` (run through [grunt-yamllint](https://github.com/geedew/grunt-yamllint))

## LICENSE

Copyright for portions of project MMM-Hover are held by NorthMcCormick, 2017 as part of project hover-nodejs. Adapted by dancj, 2017 to fit in a MagicMirror Module.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
