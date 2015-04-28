"use strict";

var Attempt = require( "attempt-js" );
var initGit = require( "./initGit" );
var npmInstall = require( "./npmInstall" );

module.exports = function( config ) {
	return Attempt.join(
		initGit( config ),
		npmInstall( config )
	);
};
