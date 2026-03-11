import {
  getStorageFreeSize,
  isOneTimeUser,
  getProgressBarData,
} from '../../utils/storage';

describe('Storage utilities', () => {
  describe('getStorageFreeSize', () => {
    it('should calculate free size for Life Time Launch Codes plan', () => {
      const planName = 'Life Time Launch Codes';
      const storageLimit = null;
      const uploadVideosSize = 5; // 5 GB

      const result = getStorageFreeSize(planName, storageLimit, uploadVideosSize);
      const expected = 10 * 1024 * 1024 * 1024 - 5 * 1024 * 1024 * 1024; // 10 GB - 5 GB
      expect(result).toBe(expected);
    });

    it('should calculate free size for Premium Plan Lifetime Code', () => {
      const planName = 'Premium Plan Lifetime Code';
      const storageLimit = null;
      const uploadVideosSize = 8;

      const result = getStorageFreeSize(planName, storageLimit, uploadVideosSize);
      const expected = 20 * 1024 * 1024 * 1024 - 8 * 1024 * 1024 * 1024; // 20 GB - 8 GB
      expect(result).toBe(expected);
    });

    it('should calculate free size for Growth Plan Lifetime Codes', () => {
      const planName = 'Growth Plan Lifetime Codes';
      const storageLimit = null;
      const uploadVideosSize = 15;

      const result = getStorageFreeSize(planName, storageLimit, uploadVideosSize);
      const expected = 40 * 1024 * 1024 * 1024 - 15 * 1024 * 1024 * 1024; // 40 GB - 15 GB
      expect(result).toBe(expected);
    });

    it('should use custom storage limit when provided', () => {
      const planName = 'Life Time Launch Codes';
      const storageLimit = 50; // Custom 50 GB
      const uploadVideosSize = 10;

      const result = getStorageFreeSize(planName, storageLimit, uploadVideosSize);
      const expected = 50 * 1024 * 1024 * 1024 - 10 * 1024 * 1024 * 1024;
      expect(result).toBe(expected);
    });

    it('should return 0 for unknown plan types', () => {
      const planName = 'Unknown Plan';
      const storageLimit = null;
      const uploadVideosSize = 5;

      const result = getStorageFreeSize(planName, storageLimit, uploadVideosSize);
      expect(result).toBe(-5 * 1024 * 1024 * 1024); // 0 - 5 GB
    });

    it('should handle zero upload size', () => {
      const planName = 'Life Time Launch Codes';
      const storageLimit = null;
      const uploadVideosSize = 0;

      const result = getStorageFreeSize(planName, storageLimit, uploadVideosSize);
      expect(result).toBe(10 * 1024 * 1024 * 1024);
    });
  });

  describe('isOneTimeUser', () => {
    it('should return true for Life Time Launch Codes', () => {
      expect(isOneTimeUser('Life Time Launch Codes')).toBe(true);
    });

    it('should return true for Premium Plan Lifetime Code', () => {
      expect(isOneTimeUser('Premium Plan Lifetime Code')).toBe(true);
    });

    it('should return true for Growth Plan Lifetime Codes', () => {
      expect(isOneTimeUser('Growth Plan Lifetime Codes')).toBe(true);
    });

    it('should return false for non-lifetime plans', () => {
      expect(isOneTimeUser('Monthly Plan')).toBe(false);
      expect(isOneTimeUser('Annual Plan')).toBe(false);
      expect(isOneTimeUser('Free Plan')).toBe(false);
      expect(isOneTimeUser('Unknown Plan')).toBe(false);
      expect(isOneTimeUser('')).toBe(false);
    });
  });

  describe('getProgressBarData', () => {
    it('should calculate progress for Life Time Launch Codes plan', () => {
      const authUser = { storage_limit: null };
      const fileSizeInfo = { size: 5 }; // 5 MB (will be converted to GB internally)
      const mainApp = { plan_name: 'Life Time Launch Codes' };

      const result = getProgressBarData(authUser, fileSizeInfo, mainApp);

      expect(result.gbDefaultSize).toBe(10);
      expect(result.progresPercent).toBeGreaterThan(0);
      expect(result.gbSize).toBeGreaterThan(0);
    });

    it('should calculate progress for Premium Plan Lifetime Code', () => {
      const authUser = { storage_limit: null };
      const fileSizeInfo = { size: 10 };
      const mainApp = { plan_name: 'Premium Plan Lifetime Code' };

      const result = getProgressBarData(authUser, fileSizeInfo, mainApp);

      expect(result.gbDefaultSize).toBe(20);
      expect(result.progresPercent).toBeGreaterThan(0);
      expect(result.gbSize).toBeGreaterThan(0);
    });

    it('should calculate progress for Growth Plan Lifetime Codes', () => {
      const authUser = { storage_limit: null };
      const fileSizeInfo = { size: 20 };
      const mainApp = { plan_name: 'Growth Plan Lifetime Codes' };

      const result = getProgressBarData(authUser, fileSizeInfo, mainApp);

      expect(result.gbDefaultSize).toBe(40);
      expect(result.progresPercent).toBeGreaterThan(0);
      expect(result.gbSize).toBeGreaterThan(0);
    });

    it('should use custom storage limit from authUser', () => {
      const authUser = { storage_limit: 50 };
      const fileSizeInfo = { size: 5 };
      const mainApp = { plan_name: 'Life Time Launch Codes' };

      const result = getProgressBarData(authUser, fileSizeInfo, mainApp);

      expect(result.gbDefaultSize).toBe(50);
    });

    it('should cap progress at 100% when storage is full', () => {
      const authUser = { storage_limit: null };
      const fileSizeInfo = { size: 15000 }; // Very large size
      const mainApp = { plan_name: 'Life Time Launch Codes' };

      const result = getProgressBarData(authUser, fileSizeInfo, mainApp);

      expect(result.progresPercent).toBe(100);
      expect(result.gbSize).toBe(0);
    });

    it('should round progress percent', () => {
      const authUser = { storage_limit: null };
      const fileSizeInfo = { size: 3.333 };
      const mainApp = { plan_name: 'Life Time Launch Codes' };

      const result = getProgressBarData(authUser, fileSizeInfo, mainApp);

      expect(Number.isInteger(result.progresPercent)).toBe(true);
    });

    it('should format gbSize to 2 decimal places', () => {
      const authUser = { storage_limit: null };
      const fileSizeInfo = { size: 1.234 };
      const mainApp = { plan_name: 'Life Time Launch Codes' };

      const result = getProgressBarData(authUser, fileSizeInfo, mainApp);

      const decimalPlaces = result.gbSize.toString().split('.')[1]?.length || 0;
      expect(decimalPlaces).toBeLessThanOrEqual(2);
    });

    it('should return undefined values for unrecognized plans', () => {
      const authUser = { storage_limit: null };
      const fileSizeInfo = { size: 5 };
      const mainApp = { plan_name: 'Unknown Plan' };

      const result = getProgressBarData(authUser, fileSizeInfo, mainApp);

      expect(result.progresPercent).toBe(0);
      expect(result.gbSize).toBe(0);
      expect(result.gbDefaultSize).toBe(0);
    });
  });
});
