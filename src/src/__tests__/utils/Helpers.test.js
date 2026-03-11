import {
  isLocalhost,
  generateRandomString,
  getPosition,
  filterObjectFalsyValues,
} from '../../utils/Helpers';

describe('Helpers utilities', () => {
  describe('isLocalhost', () => {
    const originalLocation = window.location;

    beforeEach(() => {
      delete window.location;
      window.location = { hostname: '' };
    });

    afterEach(() => {
      window.location = originalLocation;
    });

    it('should return true for localhost hostname', () => {
      window.location.hostname = 'localhost';
      expect(isLocalhost()).toBe(true);
    });

    it('should return true for IPv6 localhost [::1]', () => {
      window.location.hostname = '[::1]';
      expect(isLocalhost()).toBe(true);
    });

    it('should return true for IPv4 localhost 127.0.0.1', () => {
      window.location.hostname = '127.0.0.1';
      expect(isLocalhost()).toBe(true);
    });

    it('should return true for IPv4 localhost range 127.x.x.x', () => {
      window.location.hostname = '127.0.0.2';
      expect(isLocalhost()).toBe(true);

      window.location.hostname = '127.255.255.255';
      expect(isLocalhost()).toBe(true);
    });

    it('should return false for non-localhost hostnames', () => {
      window.location.hostname = 'example.com';
      expect(isLocalhost()).toBe(false);

      window.location.hostname = 'google.com';
      expect(isLocalhost()).toBe(false);
    });
  });

  describe('generateRandomString', () => {
    it('should generate a random string of default length 6', () => {
      const result = generateRandomString();
      expect(typeof result).toBe('string');
      expect(result.length).toBeLessThanOrEqual(6);
    });

    it('should generate a random string of specified length', () => {
      const result = generateRandomString(10);
      expect(typeof result).toBe('string');
      expect(result.length).toBeLessThanOrEqual(10);
    });

    it('should generate different strings on multiple calls', () => {
      const str1 = generateRandomString();
      const str2 = generateRandomString();
      // Very unlikely to be the same (though theoretically possible)
      expect(str1).not.toBe(str2);
    });
  });

  describe('getPosition', () => {
    it('should return the position of the nth occurrence of a substring', () => {
      const string = 'hello world, hello universe';
      expect(getPosition(string, 'hello', 1)).toBe(0);
      expect(getPosition(string, 'hello', 2)).toBe(13);
    });

    it('should handle single character substrings', () => {
      const string = 'a-b-c-d';
      expect(getPosition(string, '-', 1)).toBe(1);
      expect(getPosition(string, '-', 2)).toBe(3);
      expect(getPosition(string, '-', 3)).toBe(5);
    });

    it('should return 0 for index 0', () => {
      expect(getPosition('hello world', 'o', 0)).toBe(0);
    });

    it('should handle strings without the substring', () => {
      const string = 'hello world';
      expect(getPosition(string, 'xyz', 1)).toBe(0);
    });
  });

  describe('filterObjectFalsyValues', () => {
    it('should filter out falsy values from object', () => {
      const input = {
        name: 'John',
        age: 0,
        email: '',
        isActive: false,
        address: 'Street',
        phone: null,
        city: undefined,
      };

      const result = filterObjectFalsyValues(input);

      expect(result).toEqual({
        name: 'John',
        address: 'Street',
      });
    });

    it('should return empty object for all falsy values', () => {
      const input = {
        a: null,
        b: undefined,
        c: '',
        d: 0,
        e: false,
      };

      const result = filterObjectFalsyValues(input);
      expect(result).toEqual({});
    });

    it('should keep all truthy values', () => {
      const input = {
        name: 'Alice',
        age: 30,
        isActive: true,
        items: [1, 2, 3],
        data: { key: 'value' },
      };

      const result = filterObjectFalsyValues(input);
      expect(result).toEqual(input);
    });

    it('should handle empty object', () => {
      const result = filterObjectFalsyValues({});
      expect(result).toEqual({});
    });
  });
});
