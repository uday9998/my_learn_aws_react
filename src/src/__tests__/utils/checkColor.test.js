import { isColorLight } from '../../utils/checkColor';

describe('checkColor utilities', () => {
  describe('isColorLight', () => {
    it('should return true for white color', () => {
      expect(isColorLight('#ffffff')).toBe(true);
      expect(isColorLight('#FFFFFF')).toBe(true);
    });

    it('should return false for black color', () => {
      expect(isColorLight('#000000')).toBe(false);
    });

    it('should return true for light colors', () => {
      expect(isColorLight('#ffff00')).toBe(true); // Yellow
      expect(isColorLight('#00ffff')).toBe(true); // Cyan
      expect(isColorLight('#ff00ff')).toBe(true); // Magenta
      expect(isColorLight('#cccccc')).toBe(true); // Light gray
    });

    it('should return false for dark colors', () => {
      expect(isColorLight('#0000ff')).toBe(false); // Blue
      expect(isColorLight('#00ff00')).toBe(false); // Green
      expect(isColorLight('#ff0000')).toBe(false); // Red
      expect(isColorLight('#333333')).toBe(false); // Dark gray
    });

    it('should handle medium luminance colors', () => {
      expect(isColorLight('#808080')).toBe(false); // Medium gray (luminance = 128)
      expect(isColorLight('#909090')).toBe(true); // Slightly lighter gray
    });

    it('should correctly calculate luminance for various colors', () => {
      // Orange (high luminance)
      expect(isColorLight('#ffa500')).toBe(true);

      // Dark blue (low luminance)
      expect(isColorLight('#00008b')).toBe(false);

      // Light blue
      expect(isColorLight('#add8e6')).toBe(true);

      // Dark green
      expect(isColorLight('#006400')).toBe(false);
    });

    it('should handle lowercase hex colors', () => {
      expect(isColorLight('#ffffff')).toBe(true);
      expect(isColorLight('#000000')).toBe(false);
    });

    it('should handle uppercase hex colors', () => {
      expect(isColorLight('#FFFFFF')).toBe(true);
      expect(isColorLight('#000000')).toBe(false);
    });

    it('should handle mixed case hex colors', () => {
      expect(isColorLight('#FfFfFf')).toBe(true);
      expect(isColorLight('#aAbBcC')).toBe(true);
    });
  });
});
