"use strict";

var exec = require( "./exec" );

module.exports = function( config ) {
	return exec( "npm install", config.PROJECT_DIRECTORY );
};
