#!/usr/bin/env node
const { resolve } = require('path')
const { readFileSync: readFile } = require('fs')
const parentProjectPath = resolve()
const parentPkg = JSON.parse( readFile( resolve(parentProjectPath, 'package.json'), 'utf8') )

const ORIGINAL_TEXT = 'Hello world!'

const scope = '@display-hello/'
const plugins = Object.keys( Object.assign({}, parentPkg.dependencies, parentPkg.devDependencies) )
  .filter(name => name.startsWith(scope) && name !== `${scope}core`)

/**
 * Load plugins
 *
 * Logic: Each plugin (a normal package of npm) exports by default a function,
 * the code below requests all plugins and calls the function exported by each with the last version of the text
 * in the first parameter and the function must return a modification of the text.
 * Inspiration: https://github.com/parcel-bundler/parcel/blob/master/packages/core/parcel-bundler/src/Bundler.js#L204
 */
let lastVersionOfText = ORIGINAL_TEXT;
let lastPlugin;
try {
  plugins.forEach(name => {
    lastPlugin = name

    const transformedText = loadPlugin(name)(lastVersionOfText) || lastVersionOfText
    lastVersionOfText = transformedText
  })
}
catch(err) {
  console.error(`Plugin ${lastPlugin} failed to initialize:`, err)
}

function loadPlugin(moduleName) {
  /** @see https://nodejs.org/api/modules.html#modules_require_resolve_request_options */
  const modulePath = require.resolve(moduleName, { paths: [parentProjectPath] })
  return require(modulePath)
}

// END
console.log(lastVersionOfText);