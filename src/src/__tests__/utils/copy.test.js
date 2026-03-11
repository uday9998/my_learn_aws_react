import { copyToClipBoard } from '../../utils/copy';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('react-toastify');
jest.mock('state/modules/designCourse/edit/Error', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('copy utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('copyToClipBoard', () => {
    it('should copy text to clipboard', () => {
      const text = 'https://example.com/test-link';

      copyToClipBoard(text);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
    });

    it('should show success toast after copying', () => {
      const text = 'Test text to copy';

      copyToClipBoard(text);

      expect(toast.success).toHaveBeenCalledWith('Link copied succesfully!');
    });

    it('should handle empty string', () => {
      copyToClipBoard('');

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
      expect(toast.success).toHaveBeenCalled();
    });

    it('should handle long text', () => {
      const longText = 'A'.repeat(1000);

      copyToClipBoard(longText);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(longText);
      expect(toast.success).toHaveBeenCalled();
    });

    it('should handle special characters', () => {
      const specialText = 'Test!@#$%^&*()_+-={}[]|\\:";\'<>?,./~`';

      copyToClipBoard(specialText);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(specialText);
      expect(toast.success).toHaveBeenCalled();
    });

    it('should handle URLs', () => {
      const url = 'https://example.com/path?param=value&other=test#hash';

      copyToClipBoard(url);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(url);
      expect(toast.success).toHaveBeenCalled();
    });

    it('should handle multiline text', () => {
      const multilineText = 'Line 1\nLine 2\nLine 3';

      copyToClipBoard(multilineText);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(multilineText);
      expect(toast.success).toHaveBeenCalled();
    });
  });
});
