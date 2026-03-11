import { renderHook } from '@testing-library/react';
import { createRef } from 'react';
import useOutsideClickDetector from '../../../utils/hooks/useOutsideClickDetector';

describe('useOutsideClickDetector hook', () => {
  let ref;
  let handleOutsideClick;

  beforeEach(() => {
    ref = createRef();
    ref.current = document.createElement('div');
    document.body.appendChild(ref.current);
    handleOutsideClick = jest.fn();
  });

  afterEach(() => {
    if (ref.current) {
      document.body.removeChild(ref.current);
    }
    jest.clearAllMocks();
  });

  it('should call handler when clicking outside element', () => {
    renderHook(() => useOutsideClickDetector(ref, handleOutsideClick));

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);

    const event = new MouseEvent('mousedown', { bubbles: true });
    outsideElement.dispatchEvent(event);

    expect(handleOutsideClick).toHaveBeenCalled();

    document.body.removeChild(outsideElement);
  });

  it('should not call handler when clicking inside element', () => {
    renderHook(() => useOutsideClickDetector(ref, handleOutsideClick));

    const event = new MouseEvent('mousedown', { bubbles: true });
    ref.current.dispatchEvent(event);

    expect(handleOutsideClick).not.toHaveBeenCalled();
  });

  it('should handle null ref gracefully', () => {
    const nullRef = createRef();
    renderHook(() => useOutsideClickDetector(nullRef, handleOutsideClick));

    const event = new MouseEvent('mousedown', { bubbles: true });
    document.body.dispatchEvent(event);

    // Should not throw error
    expect(handleOutsideClick).not.toHaveBeenCalled();
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useOutsideClickDetector(ref, handleOutsideClick)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
