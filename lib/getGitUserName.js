"use strict";

var Attempt = require( "attempt-js" );
var exec = require( "./exec" );

var rUserName = /^user.name=(.+)$/m;

module.exports = function( config ) {
	return exec( "git config --list" ).chain( function( stdout ) {
		var userName = rUserName.exec( stdout );
		if ( !userName || !userName[ 1 ] ) {
			return Attempt.failure( "cannot get user.name from git config" );
		}
		config.AUTHOR_NAME = userName[ 1 ];
		return config;
	} );
};
