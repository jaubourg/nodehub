"use strict";

var exec = require( "./exec" );

module.exports = function( config ) {
	var repoURL = "https://" + config.AUTHOR_NAME + "@github.com/" +
		config.AUTHOR_NAME + "/" + config.PROJECT_NAME + ".git";
	return exec( [
		"git init",
		"git remote add origin " + repoURL
	], config.PROJECT_DIRECTORY );
};
