"use strict";

var path = require( "path" );
var wrench = require( "wrench" );

[
	{
		name: "create",
		method: wrench.mkdirSyncRecursive
	},
	{
		name: "remove",
		method: wrench.rmdirSyncRecursive
	}
].forEach( function( config ) {
	module.exports[ config.name ] = function() {
		var dirname = path.resolve.apply( path, arguments );
		try {
			config.method( dirname );
		} catch ( e ) {
			return false;
		}
		return dirname;
	};
} );
