import { isArray } from '../../utils/isArray';

describe('isArray utility', () => {
  it('should return the array if input is an array', () => {
    const arr = [1, 2, 3];
    expect(isArray(arr)).toBe(arr);
    expect(isArray(arr)).toEqual([1, 2, 3]);
  });

  it('should return the array for empty array', () => {
    const arr = [];
    expect(isArray(arr)).toBe(arr);
    expect(isArray(arr)).toEqual([]);
  });

  it('should convert object to array of values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = isArray(obj);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle nested objects', () => {
    const obj = {
      first: { name: 'John' },
      second: { name: 'Jane' },
    };
    const result = isArray(obj);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: 'John' });
    expect(result[1]).toEqual({ name: 'Jane' });
  });

  it('should return null for null input', () => {
    expect(isArray(null)).toBe(null);
  });

  it('should return undefined for undefined input', () => {
    expect(isArray(undefined)).toBe(undefined);
  });

  it('should return the value for falsy values', () => {
    expect(isArray(0)).toBe(0);
    expect(isArray('')).toBe('');
    expect(isArray(false)).toBe(false);
  });

  it('should handle string inputs by converting to array', () => {
    // Strings are objects in JavaScript, so Object.values will be called
    const str = 'hello';
    const result = isArray(str);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(['h', 'e', 'l', 'l', 'o']);
  });

  it('should handle objects with numeric keys', () => {
    const obj = { 0: 'a', 1: 'b', 2: 'c' };
    const result = isArray(obj);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle arrays of objects', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = isArray(arr);

    expect(result).toBe(arr);
    expect(result).toHaveLength(3);
  });

  it('should handle empty object', () => {
    const obj = {};
    const result = isArray(obj);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([]);
  });

  it('should preserve array type checking', () => {
    const arr = [1, 2, 3];
    const result = isArray(arr);

    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle arrays with mixed types', () => {
    const arr = [1, 'string', { key: 'value' }, null, undefined];
    const result = isArray(arr);

    expect(result).toBe(arr);
    expect(result).toHaveLength(5);
  });
});
