import { updateArrayByObjectKey } from '../../utils/arrays';

describe('Array utilities', () => {
  describe('updateArrayByObjectKey', () => {
    it('should update existing object in array', () => {
      const array = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Bob' },
      ];

      const checkFunction = (item) => item.id === 2;
      const newValue = { id: 2, name: 'Janet' };

      const result = updateArrayByObjectKey(checkFunction, array, newValue);

      expect(result).toHaveLength(3);
      expect(result[1]).toEqual({ id: 2, name: 'Janet' });
      expect(result[0]).toEqual({ id: 1, name: 'John' });
      expect(result[2]).toEqual({ id: 3, name: 'Bob' });
    });

    it('should add new object when not found in array', () => {
      const array = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];

      const checkFunction = (item) => item.id === 3;
      const newValue = { id: 3, name: 'Bob' };

      const result = updateArrayByObjectKey(checkFunction, array, newValue);

      expect(result).toHaveLength(3);
      expect(result[2]).toEqual({ id: 3, name: 'Bob' });
    });

    it('should not mutate original array', () => {
      const array = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];

      const originalArray = [...array];
      const checkFunction = (item) => item.id === 1;
      const newValue = { id: 1, name: 'Johnny' };

      updateArrayByObjectKey(checkFunction, array, newValue);

      expect(array).toEqual(originalArray);
    });

    it('should update first matching object', () => {
      const array = [
        { id: 1, type: 'A' },
        { id: 2, type: 'A' },
        { id: 3, type: 'B' },
      ];

      const checkFunction = (item) => item.type === 'A';
      const newValue = { id: 1, type: 'A', updated: true };

      const result = updateArrayByObjectKey(checkFunction, array, newValue);

      expect(result[0]).toEqual({ id: 1, type: 'A', updated: true });
      expect(result[1]).toEqual({ id: 2, type: 'A' }); // Second match unchanged
    });

    it('should handle empty array', () => {
      const array = [];
      const checkFunction = (item) => item.id === 1;
      const newValue = { id: 1, name: 'John' };

      const result = updateArrayByObjectKey(checkFunction, array, newValue);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(newValue);
    });

    it('should work with complex check functions', () => {
      const array = [
        { id: 1, status: 'active', priority: 1 },
        { id: 2, status: 'inactive', priority: 2 },
        { id: 3, status: 'active', priority: 3 },
      ];

      const checkFunction = (item) => item.status === 'active' && item.priority > 2;
      const newValue = { id: 3, status: 'active', priority: 3, updated: true };

      const result = updateArrayByObjectKey(checkFunction, array, newValue);

      expect(result[2]).toEqual(newValue);
    });

    it('should handle objects with nested properties', () => {
      const array = [
        { id: 1, user: { name: 'John', email: 'john@example.com' } },
        { id: 2, user: { name: 'Jane', email: 'jane@example.com' } },
      ];

      const checkFunction = (item) => item.user.email === 'john@example.com';
      const newValue = { id: 1, user: { name: 'Johnny', email: 'john@example.com' } };

      const result = updateArrayByObjectKey(checkFunction, array, newValue);

      expect(result[0].user.name).toBe('Johnny');
    });
  });
});
