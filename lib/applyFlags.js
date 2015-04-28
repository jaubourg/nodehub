"use strict";

module.exports = function( flags ) {
	return function( tree ) {
		var packageJSON = JSON.parse( tree[ "package.json" ] );
		if ( !flags.bin ) {
			delete tree.bin;
			delete packageJSON.bin;
		}
		if ( !flags.global ) {
			delete packageJSON.preferGlobal;
		}
		tree[ "package.json" ] = JSON.stringify( packageJSON, null, "\t" );
		return tree;
	};
};
