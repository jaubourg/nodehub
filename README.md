[![NPM][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devDependency-image]][devDependency-url]
[![gratipay][gratipay-image]][gratipay-url]

# nodehub

jaubourg's simple node/github project init.

## Install

`npm -g install nodehub`

## Usage

`nodehub <project_name> [ "<project_short_description>" ] [ +bin ] [ +global ]`

Where:

+ `+bin` indicates the package provides a command line script
+ `+global` indicates the package should be installed globally

## In a Nutshell

`nodehub superpack` will:

1. create a subdirectory called `superpack`
2. check for your git username using the git command (in my case `jaubourg`)
3. get your info from [GitHub](https://github.com/) (email, web page)
4. create a file structure with:
  + configuration for:
    - [JSCS](http://jscs.info/)
    - [JSHint](http://jshint.com/)
    - [Travis CI](https://travis-ci.org/)
  + the text of the MIT license with proper copyright
  + a properly filled `package.json` file
  + a skeleton `README.md` with nice badges
  + a lib subdirectory with a main js file named after the project
  + same with a bin subdirectory is the `+bin` flag has been used
  + a Gruntfile that will export source coverage reports to [Coveralls](https://coveralls.io/) when execute on Travis CI
5. Initialize git and point it to `https://jaubourg@github.com/jaubourg/superpack.git`
6. NPM-install the dev dependencies

You just have to code from there!

## Configuration on your end

1. Create the corresponding repository on [GitHub](https://github.com/)
2. Add it to [Travis CI](https://travis-ci.org/)
3. Add it to [Coveralls](https://coveralls.io/)

Then push!

## License

Copyright (c) 2015 [Julian Aubourg](mailto:j@ubourg.net)

Licensed under the [MIT license](https://raw.githubusercontent.com/jaubourg/nodehub/master/LICENSE-MIT).

[coveralls-image]: https://img.shields.io/coveralls/jaubourg/nodehub.svg
[coveralls-url]: https://coveralls.io/r/jaubourg/nodehub
[dependency-image]: https://img.shields.io/david/jaubourg/nodehub.svg
[dependency-url]: https://david-dm.org/jaubourg/nodehub
[devDependency-image]: https://img.shields.io/david/dev/jaubourg/nodehub.svg
[devDependency-url]: https://david-dm.org/jaubourg/nodehub#info=devDependencies
[gratipay-image]: https://img.shields.io/gratipay/jaubourg.svg
[gratipay-url]: https://gratipay.com/jaubourg/
[npm-image]: https://img.shields.io/npm/v/nodehub.svg
[npm-url]: https://npmjs.org/package/nodehub
[travis-image]: https://img.shields.io/travis/jaubourg/nodehub.svg
[travis-url]: https://travis-ci.org/jaubourg/nodehub
