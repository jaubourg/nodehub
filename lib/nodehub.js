"use strict";

var applyFlags = require( "./applyFlags" );
var commandLine = require( "./commandLine" );
var evalTemplateTree = require( "./evalTemplateTree" );
var getGithubUserInfo = require( "./getGithubUserInfo" );
var getGitUserName = require( "./getGitUserName" );
var initDir = require( "./initDir" );
var readFiles = require( "./readFiles" );
var writeFiles = require( "./writeFiles" );

module.exports = function( baseDir, argv, console ) {
	var templates = readFiles( __dirname + "/../template" );
	return commandLine( baseDir, argv )
		.chain( getGitUserName )
		.chain( getGithubUserInfo )
		.progress( console.log.bind( console ) )
		.chain( function( config ) {
			return templates
				.chain( applyFlags( config.flags ) )
				.chain( evalTemplateTree( config ) )
				.chain( writeFiles( config ) );
		} )
		.success( function() {
			console.log( "initial file structure is ready." );
			console.log( "Init git & install node modules..." );
		} )
		.chain( initDir )
		.success( function() {
			console.log( "Success! Everything is properly set up." );
			console.log( "\nYou can start coding now!" );
		} )
		.failure( function( error ) {
			console.error( "ERROR: " + error );
		} );
};
