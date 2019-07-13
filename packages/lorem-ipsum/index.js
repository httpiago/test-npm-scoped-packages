/**
 * This plugin adds the initial Lorem ipsum excerpt to the end of the text
 * @see https://lipsum.com/
 */
module.exports = function(text) {
  return text.replace('!', '! Lorem ipsum dolor sit amet.');
}