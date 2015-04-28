"use strict";

var Attempt = require( "attempt-js" );
var cashe = require( "cashe" );

var execInDir = cashe( function( dir ) {
	var exec = require( "child_process" ).exec;
	return function( command ) {
		return new Attempt( function( success, failure ) {
			exec( command, {
				cwd: dir,
				encoding: "utf8"
			}, function( error, stdout ) {
				if ( error ) {
					return failure( error );
				}
				success( stdout );
			} );
		} );
	};
} );

module.exports = function( commands, dir ) {
	var exec = execInDir(  dir || process.cwd() );
	return !Array.isArray( commands ) ? exec( commands ) : commands.reduce( function( attempt, command ) {
		return !attempt ? exec( command ) : attempt.chain( function() {
			return exec( command );
		} );
	}, false );
};
