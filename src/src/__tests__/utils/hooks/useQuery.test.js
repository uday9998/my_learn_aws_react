import { renderHook, waitFor } from '@testing-library/react';
import { useApiQuery } from '../../../utils/hooks/useQuery';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('react-toastify');
jest.mock('state/modules/designCourse/edit/Error', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));
jest.mock('utils/Auth', () => ({
  logout: jest.fn(),
}));

describe('useApiQuery hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    const mockQuery = jest.fn(() => Promise.resolve({ data: {}, status: 200 }));
    const { result } = renderHook(() => useApiQuery(mockQuery, []));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockQuery = jest.fn(() =>
      Promise.resolve({ data: mockData, status: 200 })
    );

    const { result } = renderHook(() => useApiQuery(mockQuery, []));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.status).toBe(200);
    expect(result.current.error).toBe(false);
  });

  it('should call callback after successful fetch', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockQuery = jest.fn(() =>
      Promise.resolve({ data: mockData, status: 200 })
    );
    const mockCallback = jest.fn();

    renderHook(() => useApiQuery(mockQuery, [], { callback: mockCallback }));

    await waitFor(() => expect(mockCallback).toHaveBeenCalledWith(mockData));
  });

  it('should handle errors', async () => {
    const mockError = new Error('API Error');
    const mockQuery = jest.fn(() => Promise.reject(mockError));

    const { result } = renderHook(() => useApiQuery(mockQuery, []));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toEqual(mockError);
  });

  it('should call custom onError handler', async () => {
    const mockError = new Error('API Error');
    const mockQuery = jest.fn(() => Promise.reject(mockError));
    const mockOnError = jest.fn();

    renderHook(() =>
      useApiQuery(mockQuery, [], { onError: mockOnError })
    );

    await waitFor(() => expect(mockOnError).toHaveBeenCalledWith(mockError));
  });

  it('should not make API call when query is null', () => {
    const { result } = renderHook(() => useApiQuery(null, []));

    expect(result.current.loading).toBe(false);
  });

  it('should allow setting data manually', async () => {
    const mockQuery = jest.fn(() =>
      Promise.resolve({ data: { id: 1 }, status: 200 })
    );

    const { result } = renderHook(() => useApiQuery(mockQuery, []));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const newData = { id: 2, name: 'Updated' };
    result.current.setData(newData);

    expect(result.current.data).toEqual(newData);
  });
});
