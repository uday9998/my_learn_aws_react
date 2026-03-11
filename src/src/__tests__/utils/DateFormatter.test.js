import dateFormatter from '../../utils/DateFormatter';

// Mock moment
jest.mock('moment', () => {
  return (date) => ({
    format: (formatString) => {
      if (!date) return '';
      // Simple mock implementation for testing
      if (formatString === 'MMM D, YYYY') {
        const d = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
      }
      return date;
    }
  });
});

describe('DateFormatter', () => {
  it('should format valid date strings', () => {
    const result = dateFormatter('2024-01-15');
    expect(result).toBe('Jan 15, 2024');
  });

  it('should format Date objects', () => {
    const date = new Date('2024-06-20');
    const result = dateFormatter(date);
    expect(result).toBe('Jun 20, 2024');
  });

  it('should handle different date formats', () => {
    expect(dateFormatter('2024-12-25')).toBe('Dec 25, 2024');
    expect(dateFormatter('2024-03-01')).toBe('Mar 1, 2024');
  });

  it('should return falsy for null input', () => {
    const result = dateFormatter(null);
    expect(result).toBeFalsy();
  });

  it('should return falsy for undefined input', () => {
    const result = dateFormatter(undefined);
    expect(result).toBeFalsy();
  });

  it('should return falsy for empty string input', () => {
    const result = dateFormatter('');
    expect(result).toBeFalsy();
  });
});
