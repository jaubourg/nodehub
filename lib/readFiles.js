"use strict";

var Attempt = require( "attempt-js" );
var fs = require( "fs" );
var path = require( "path" );

var readFile = module.exports = function( filename ) {
	return new Attempt( function( success, failure ) {
		fs.stat( filename, function( statError, stats ) {
			if ( statError ) {
				return failure( statError );
			}
			if ( stats.isDirectory() ) {
				fs.readdir( filename, function( dirError, files ) {
					if ( dirError ) {
						return failure( dirError );
					}
					var result = {};
					Attempt.joinArray( files.map( function( name ) {
						return readFile( path.resolve( filename, name ) ).success( function( content ) {
							result[ name ] = content;
						} );
					} ) ).success( function() {
						success( result );
					} ).failure( failure );
				} );
			} else {
				fs.readFile( filename, {
					encoding: "utf8"
				}, function( error, content ) {
					if ( error ) {
						return failure( error );
					}
					success( content );
				} );
			}
		} );
	} );
};
