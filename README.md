# bmg-ui
A mindsmash-ui fork for bmg.

See license notes below.

## Contents
* [Install with bower](#install-with-bower-to-use-the-theme-css-or-scss-version)  
* [Use in an SCSS project](#use-in-a-sass-scss-project)
* [Use in a CSS project](#use-with-pure-css)
* [Change and publish bmg-ui itself](#install-with-npm-to-change-and-deploy-the-theme)

## Install with bower to use the theme (CSS or SCSS version)
```shell
$ bower install bmg-ui
```

## Use in a Sass (SCSS) project
Include the theme variables before adding any bootstrap files
> You need to install boostrap yourself (`$ bower install bootstrap-sass`), as it is no
> dependency of this project (the css version already includes bootstrap).

```SCSS
@import "path/to/bmg-ui/dist/scss/variables"; // to override bootstrap's variables
@import "/path/to/bootstrap-sass/assets/stylesheets/bootstrap"; // load original bootstrap
@import "path/to/bmg-ui/dist/scss/bmg-ui"; // then load our own styles
```

## Use with pure CSS
Include the bmg-ui.css to your website, it includes
the complete bootstrap css files:

```html
<head>
  <!-- add the bmg-ui theme -->
  <link rel="stylesheet" href="path/to/bmg-ui/css/bmg-ui.css">

  <!-- then add your custom styles -->
  <link rel="stylesheet" href="path/to/custom.css">
</head>
```

## Install with npm to change and deploy the theme
You need:
- node.js with npm
- gulp

Clone the project, then follow the instructions below.

### Development mode
`$ npm install` Install all dependencies

`$ gulp dev` Start development mode: a demo page is started. Edit html or scss and see updates in realtime

#### Local development and testing
To test UI-Kit changes with an existing project that has an dependency to the BMG UI-Kit you can use the bower link functionality.
- `bower link` within the UI-Kit root to create a global link
- `bower link bmg-ui` within the package that requires the UI-Kit (a link "overrides" an installed UI-Kit version)

Please also read the documentation for the [bower link](https://bower.io/docs/api/#link "bower link") functionality.

### Publish a new version
`$ gulp build` Create new release files in `dist/`.

`$ npm version <patch|minor|major>` Automatically update package.json and create a git tag.

`$ git push --follow-tags` Push the tagged version, this creates a new **bower** version.

### Contribute
If you want to contribute to this project, simply fork it on Github, do your changes and create a pull request that
describes your changes. If it's all nice and clean, it might get merged.

Please keep always in mind that a BMG UI-Kit change/improvement can affect other BMG applications.

If you want to add a new feature please consider/decide whether this improvement should be 
- an improvement only for the own application -> implement it in your own application or
- an improvement also needed by other applications -> implement it in the BMG UI-Kit

### Talk to

* Sascha Zuske (sascha dot zuske at mindsmash dot com)
* Daniel Busch (daniel dot busch at mindsmash dot com)

## License

This project is made open source for documentation purposes only and must not be used without prior written approval of mindsmash GmbH.

Copyright 2016 mindsmash GmbH - All rights reserved.
