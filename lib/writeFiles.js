"use strict";

var Attempt = require( "attempt-js" );
var fs = require( "fs" );
var path = require( "path" );

function writeFile( filename, data ) {
	return new Attempt( function( success, failure ) {
		if ( typeof data === "string" ) {
			fs.writeFile( filename, data, {
				encoding: "utf8"
			}, function( error ) {
				if ( error ) {
					return failure( error );
				}
				success();
			} );
		} else {
			fs.mkdir( filename, function( error ) {
				if ( error ) {
					return failure( error );
				}
				var sync = [];
				for ( var sub in data ) {
					if ( data.hasOwnProperty( sub ) ) {
						sync.push( writeFile( path.resolve( filename, sub ), data[ sub ] ) );
					}
				}
				Attempt.joinArray( sync ).success( function() {
					success();
				} ).failure( failure );
			} );
		}
	} );
}

module.exports = function( config ) {
	return function( tree ) {
		return writeFile( config.PROJECT_DIRECTORY, tree ).chain( function() {
			return config;
		} );
	};
};
