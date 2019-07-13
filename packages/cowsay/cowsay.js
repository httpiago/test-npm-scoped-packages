const cow = require('cowsay')

/**
 * This plugin is a wrapper of cowsay package
 * @see https://www.npmjs.com/package/cowsay
 */
module.exports = function(text) {
  return cow.say({ text })
}
