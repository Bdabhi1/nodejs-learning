/**
 * @file Simple string utility functions
 */

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The input string
 * @return {string} The string with first letter capitalized
 */
function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || !str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Reverses a string
 * @param {string} str - The input string
 * @return {string} The reversed string
 */
function reverseString(str) {
  if (typeof str !== 'string') return '';
  return str.split('').reverse().join('');
}

/**
 * Truncates a string to specified length and adds ellipsis
 * @param {string} str - The input string
 * @param {number} maxLength - Maximum length before truncation
 * @return {string} The truncated string
 */
function truncate(str, maxLength = 30) {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Counts words in a string
 * @param {string} str - The input string
 * @return {number} Number of words
 */
function countWords(str) {
  if (typeof str !== 'string') return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Converts a string to slug format (lowercase, hyphens instead of spaces)
 * @param {string} str - The input string
 * @return {string} The slugified string
 */
function slugify(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Export functions for users of the package
module.exports = {
  capitalizeFirstLetter,
  reverseString,
  truncate,
  countWords,
  slugify
}; 