"use strict";

var Attempt = require( "attempt-js" );
var request = require( "request" );

module.exports = function( config ) {
	return new Attempt( function( success, failure, progress ) {
		var url = "https://api.github.com/users/" + config.AUTHOR_NAME;
		progress( "requesting " + url + "..." );
		request( {
			url: url,
			headers: {
				"User-Agent": "nodehub"
			}
		}, function( error, response, body ) {
			if ( error ) {
				return failure( error );
			}
			if ( response.statusCode !== 200 ) {
				return failure( "github responded with " + response.statusCode + ": " + body );
			}
			var data = JSON.parse( body );
			config.AUTHOR_EMAIL = data.email;
			config.AUTHOR_FULLNAME = data.name || config.AUTHOR_NAME;
			config.AUTHOR_URL = data.blog ||
				// jscs:disable
				data.html_url
				// jscs:enable
			;
			progress( "github user info retrieved." );
			success( config );
		} );
	} );
};
