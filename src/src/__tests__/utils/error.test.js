import React from 'react';
import { ErrorPrinter } from '../../utils/error';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('react-toastify');
jest.mock('state/modules/designCourse/edit/Error', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

describe('ErrorPrinter utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display single error message', () => {
    const data = {
      errors: {
        email: ['Email is required'],
      },
    };

    ErrorPrinter({ data });

    expect(toast.error).toHaveBeenCalled();
  });

  it('should display multiple error messages', () => {
    const data = {
      errors: {
        email: ['Email is required'],
        password: ['Password is required'],
        name: ['Name must be at least 3 characters'],
      },
    };

    ErrorPrinter({ data });

    expect(toast.error).toHaveBeenCalled();
  });

  it('should handle string errors', () => {
    const data = {
      errors: {
        general: 'Something went wrong',
      },
    };

    ErrorPrinter({ data });

    expect(toast.error).toHaveBeenCalledWith('Something went wrong');
  });

  it('should handle array errors', () => {
    const data = {
      errors: {
        field: ['Error one', 'Error two'],
      },
    };

    ErrorPrinter({ data });

    expect(toast.error).toHaveBeenCalled();
  });

  it('should handle empty errors object', () => {
    const data = {
      errors: {},
    };

    ErrorPrinter({ data });

    // Should not crash
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should handle undefined data', () => {
    ErrorPrinter({ data: undefined });

    // Should not crash
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should handle data without errors property', () => {
    const data = {
      message: 'Some message',
    };

    ErrorPrinter({ data });

    // Should not crash
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should render HTML errors safely', () => {
    const data = {
      errors: {
        field1: ['Error 1'],
        field2: ['Error 2'],
      },
    };

    ErrorPrinter({ data });

    expect(toast.error).toHaveBeenCalled();
    const callArg = toast.error.mock.calls[0][0];
    expect(React.isValidElement(callArg)).toBe(true);
  });
});
