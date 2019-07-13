/**
 * This plugin translates the text to Brazilian Portuguese.
 */
module.exports = function(text) {
  return text
    .replace(/hello/gi, 'Olá')
    .replace(/world/gi, 'mundo');
}