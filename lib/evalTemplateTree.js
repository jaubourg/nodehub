"use strict";

var rItem = /%([^%]+)%/g;

module.exports = function( data ) {
	function evalString( string ) {
		return string.replace( rItem, function( _, key ) {
			return data[ key ];
		} );
	}
	function evalTree( tree ) {
		var output = {};
		var key;
		for ( key in tree ) {
			if ( tree.hasOwnProperty( key ) ) {
				output[ evalString( key, data ) ] =
					( ( typeof tree[ key ] === "string" ) ? evalString : evalTree )( tree[ key ] );
			}
		}
		return output;
	}
	return evalTree;
};
