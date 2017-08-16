# MagicMirror-Module-Hover
This is a [MagicMirror](https://github.com/MichMich/MagicMirror) module to communicate with the  
[HoverLabs Hover](http://www.hoverlabs.co/products/hover/).

```
cd MI_MODULE_PATH && npm install
```

Run the `test` npm script
```
npm test
```

Current Tests:
- [ESLint](http://eslint.org/) for linting the javascript
- [stylelint](https://stylelint.io/) for linting the CSS with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) as its base
- [jsonlint](https://github.com/zaach/jsonlint) for linting the translation files
- [markdownlint](https://github.com/DavidAnson/markdownlint) for checking the markdown files (`README.md`, `CHANGELOG.md`, `LICENSE.txt`)
- [js-yaml](https://github.com/nodeca/js-yaml) to lint the `.travis.yml` (run through [grunt-yamllint](https://github.com/geedew/grunt-yamllint))


## Installation

`bash -c "$(curl -sL https://raw.githubusercontent.com/roramirez/MagicMirror-Module-Template/master/create_module.sh)"`

This creates a module example to start your developement.

If you have any suggest, please let me know [by an issue](https://github.com/roramirez/MagicMirror-Module-Template/issues/new).
