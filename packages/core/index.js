#!/usr/bin/env node
const pkg = require('parent-package-json').parse()
const loadPlugin = require('parent-require')

const ORIGINAL_TEXT = 'Hello world!'

const deps = Object.keys( Object.assign({}, pkg.dependencies, pkg.devDependencies) )

// Load plugins
let transformedText = ORIGINAL_TEXT;
let lastDep;
try {
  deps.forEach((depName => {
    if (depName.startsWith('@display-hello/')) {
      lastDep = depName
      transformedText = loadPlugin(depName)(transformedText) || transformedText
    }
  }))
}
catch(err) {
  console.error(`Plugin ${lastDep} failed to initialize:`, err);
}

console.log(transformedText);