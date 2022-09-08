#!/usr/bin/env node

/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* eslint-env node */

'use strict';

const glob = require( 'glob' );
const path = require( 'path' );
const { red } = require( './ansi-colors' );

// This script ensures that the "manual" test directories are only located in the root
// of the "tests" directories. Previously, they have been nested deeper, which prevents
// those tests from being compiled while running tests using the `--files` argument.
// See: https://github.com/ckeditor/ckeditor5/issues/12251

const manualDirectoriesNotInTestsRoot = new Set(
	glob.sync( '**/tests/*/**/manual/**/*.js', {
		ignore: [ '**/node_modules/**' ],
		cwd: path.join( __dirname, '..', '..' )
	} ).map( path => path.replace( /[^/]+.js$/, '*.js' ) )
);

if ( manualDirectoriesNotInTestsRoot.size ) {
	console.log( red( 'All "manual" test directories should be directly in the root of the "tests" directory.' ) );
	console.log( red( 'Following ones do not follow this rule:' ) );
	console.log( red( [ ...manualDirectoriesNotInTestsRoot ].map( str => ` - ${ str }` ).join( '\n' ) ) );

	process.exit( 1 );
}
