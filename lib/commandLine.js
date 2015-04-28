"use strict";

var Attempt = require( "attempt-js" );
var fs = require( "fs" );
var path = require( "path" );

var rFlag = /^\+/;

function parseArgv( argv ) {
	argv = argv.slice( 2 );
	var flags = {};
	argv = argv.filter( function( arg ) {
		if ( rFlag.test( arg ) ) {
			flags[ arg.substr( 1 ) ] = true;
			return false;
		}
		return true;
	} );
	return {
		argv: argv,
		flags: flags
	};
}

module.exports = function( parentDir, argv ) {
	var parsed = parseArgv( argv );
	return new Attempt( function( success, failure, progress ) {
		var name = parsed.argv[ 0 ];
		var desc = parsed.argv[ 1 ] || "";
		if ( !name ) {
			return failure( "Usage: nodehub <project_name> [ <project_desc> ]" );
		}
		var dir = path.resolve( parentDir, name );
		progress( "starting initialization of project " + name + " in " + dir + "..." );
		fs.exists( dir, function( exists ) {
			if ( exists ) {
				return failure( dir + " already exists!" );
			}
			success( {
				flags: parsed.flags,
				YEAR: ( new Date() ).getFullYear(),
				PROJECT_NAME: name,
				PROJECT_DESC: desc,
				PROJECT_DIRECTORY: dir
			} );
		} );
	} );
};
