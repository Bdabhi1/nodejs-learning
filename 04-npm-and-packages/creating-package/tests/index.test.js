const stringUtils = require('../index');

describe('String Utilities', () => {
  describe('capitalizeFirstLetter', () => {
    test('capitalizes the first letter', () => {
      expect(stringUtils.capitalizeFirstLetter('hello')).toBe('Hello');
    });
    
    test('returns empty string for empty input', () => {
      expect(stringUtils.capitalizeFirstLetter('')).toBe('');
    });
    
    test('handles non-string input', () => {
      expect(stringUtils.capitalizeFirstLetter(123)).toBe('');
    });
  });
  
  describe('reverseString', () => {
    test('reverses a string', () => {
      expect(stringUtils.reverseString('hello')).toBe('olleh');
    });
    
    test('handles empty string', () => {
      expect(stringUtils.reverseString('')).toBe('');
    });
    
    test('handles non-string input', () => {
      expect(stringUtils.reverseString(123)).toBe('');
    });
  });
  
  describe('truncate', () => {
    test('truncates long strings', () => {
      const longStr = 'This is a very long string that should be truncated';
      expect(stringUtils.truncate(longStr, 20)).toBe('This is a very long...');
    });
    
    test('does not truncate short strings', () => {
      const shortStr = 'Short string';
      expect(stringUtils.truncate(shortStr, 20)).toBe(shortStr);
    });
    
    test('uses default length if not specified', () => {
      const longStr = 'This is a string that is longer than thirty characters and should be truncated';
      expect(stringUtils.truncate(longStr)).toBe('This is a string that is longer...');
    });
  });
  
  describe('countWords', () => {
    test('counts words correctly', () => {
      expect(stringUtils.countWords('This has five words in it')).toBe(5);
    });
    
    test('handles extra spaces', () => {
      expect(stringUtils.countWords('  Extra   spaces    between  ')).toBe(3);
    });
    
    test('returns 0 for empty string', () => {
      expect(stringUtils.countWords('')).toBe(0);
    });
    
    test('handles non-string input', () => {
      expect(stringUtils.countWords(123)).toBe(0);
    });
  });
  
  describe('slugify', () => {
    test('converts string to slug format', () => {
      expect(stringUtils.slugify('This is a Test String!')).toBe('this-is-a-test-string');
    });
    
    test('handles special characters', () => {
      expect(stringUtils.slugify('Product Name (Special Edition) @ $99')).toBe('product-name-special-edition-99');
    });
    
    test('removes duplicate hyphens', () => {
      expect(stringUtils.slugify('Multiple   spaces &  special -- chars')).toBe('multiple-spaces-special-chars');
    });
    
    test('trims hyphens from ends', () => {
      expect(stringUtils.slugify('- Trim hyphens -')).toBe('trim-hyphens');
    });
  });
}); 