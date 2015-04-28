"use strict";

var nodehub = require( "../lib/nodehub" );

var dir = require( "./util/dir" );
var fs = require( "fs" );
var silentConsole = require( "./util/silentConsole" );

function binGlobalTests( bin, global ) {
	var dirname = ( bin ? "" : "no_" ) + "bin_" + ( global ? "" : "no_" ) + "global";
	return function( __ ) {
		__.expect( 12 );
		var argv = [ 1, 2, dirname ];
		if ( bin ) {
			argv.push( "+bin" );
		}
		if ( global ) {
			argv.push( "+global" );
		}
		nodehub( __dirname, argv, silentConsole )
			.success( function() {
				var config = require( "./" + dirname + "/package.json" );
				__.strictEqual( "bin" in config, bin, "bin" );
				__.strictEqual( fs.existsSync( __dirname + "/" + dirname + "/bin" ), bin, "no bin directory" );
				__.strictEqual( "preferGlobal" in config && config.preferGlobal, global, "global" );
				for ( var name in config.devDependencies ) {
					if ( config.devDependencies.hasOwnProperty( name ) ) {
						__.ok( fs.existsSync( __dirname + "/" + dirname + "/node_modules/" + name ), name );
					}
				}
			} )
			.failure( function() {
				__.ok( false, "unexpected error: " + [].slice.call( arguments ) );
			} )
			.always( function() {
				dir.remove( __dirname, dirname );
				__.done();
			} );
	};
}

module.exports = {
	"no name": function( __ ) {
		__.expect( 1 );
		nodehub( __dirname, [], silentConsole )
			.success( function() {
				__.ok( false, "unexpected success: " + [].slice.call( arguments ) );
			} )
			.failure( function( error ) {
				__.ok( /^Usage:/.test( error ), "wrong usage" );
			} )
			.always( function() {
				__.done();
			} );
	},
	"dir exists": function( __ ) {
		__.expect( 1 );
		var dirname = dir.create( __dirname, "exists" );
		nodehub( __dirname, [ 1, 2, "exists" ], silentConsole )
			.success( function() {
				__.ok( false, "unexpected success: " + [].slice.call( arguments ) );
			} )
			.failure( function( error ) {
				__.strictEqual( error, dirname + " already exists!", "detected" );
			} )
			.always( function() {
				dir.remove( dirname );
				__.done();
			} );
	},
	"no bin, no global": binGlobalTests( false, false ),
	"bin, no global": binGlobalTests( true, false ),
	"no bin, global": binGlobalTests( false, true ),
	"bin, global": binGlobalTests( true, true )
};
