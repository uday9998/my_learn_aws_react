import getCurrencySymbol, { priceOption, priceOptionPaypal } from '../../utils/getCurrencySymbol';

describe('Currency Symbol utilities', () => {
  describe('getCurrencySymbol', () => {
    it('should return correct symbols for major currencies', () => {
      expect(getCurrencySymbol('USD')).toBe('$');
      expect(getCurrencySymbol('EUR')).toBe('€');
      expect(getCurrencySymbol('GBP')).toBe('£');
      expect(getCurrencySymbol('JPY')).toBe('¥');
    });

    it('should return correct symbols for regional currencies', () => {
      expect(getCurrencySymbol('AUD')).toBe('AUD:$');
      expect(getCurrencySymbol('CAD')).toBe('CAD:$');
      expect(getCurrencySymbol('INR')).toBe('₹');
      expect(getCurrencySymbol('PHP')).toBe('₱');
    });

    it('should return correct symbols for Nordic currencies', () => {
      expect(getCurrencySymbol('DKK')).toBe('DKK:kr');
      expect(getCurrencySymbol('NOK')).toBe('NOK:kr');
      expect(getCurrencySymbol('SEK')).toBe('SEK:kr');
    });

    it('should return correct symbols for Eastern European currencies', () => {
      expect(getCurrencySymbol('CZK')).toBe('Kč');
      expect(getCurrencySymbol('PLN')).toBe('zł');
      expect(getCurrencySymbol('RON')).toBe('lei');
      expect(getCurrencySymbol('RUB')).toBe('₽');
      expect(getCurrencySymbol('TRY')).toBe('₺');
    });

    it('should return correct symbols for Asian currencies', () => {
      expect(getCurrencySymbol('HKD')).toBe('HK$');
      expect(getCurrencySymbol('SGD')).toBe('S$');
      expect(getCurrencySymbol('THB')).toBe('฿');
    });

    it('should return correct symbols for Middle Eastern and African currencies', () => {
      expect(getCurrencySymbol('ILS')).toBe('₪');
      expect(getCurrencySymbol('NGN')).toBe('NGN');
      expect(getCurrencySymbol('GHS')).toBe('GHS');
      expect(getCurrencySymbol('ZAR')).toBe('ZAR');
      expect(getCurrencySymbol('KES')).toBe('KES');
    });

    it('should return correct symbols for other currencies', () => {
      expect(getCurrencySymbol('MXN')).toBe('MXN:$');
      expect(getCurrencySymbol('NZD')).toBe('NZD:$');
      expect(getCurrencySymbol('CHF')).toBe('Fr');
    });

    it('should return empty string for null', () => {
      expect(getCurrencySymbol(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(getCurrencySymbol(undefined)).toBe('');
    });

    it('should return the input for unknown currency codes', () => {
      expect(getCurrencySymbol('XYZ')).toBe('XYZ');
      expect(getCurrencySymbol('UNKNOWN')).toBe('UNKNOWN');
    });

    it('should handle all supported currencies', () => {
      const supportedCurrencies = [
        'AUD', 'CAD', 'CZK', 'DKK', 'EUR', 'HKD', 'ILS', 'MXN',
        'NZD', 'NOK', 'PHP', 'PLN', 'GBP', 'RUB', 'SGD', 'SEK',
        'CHF', 'THB', 'USD', 'INR', 'RON', 'TRY', 'JPY', 'NGN',
        'GHS', 'ZAR', 'KES'
      ];

      supportedCurrencies.forEach(currency => {
        const symbol = getCurrencySymbol(currency);
        expect(symbol).toBeTruthy();
        expect(typeof symbol).toBe('string');
      });
    });
  });

  describe('priceOption', () => {
    it('should contain all supported currencies', () => {
      expect(priceOption).toBeInstanceOf(Array);
      expect(priceOption.length).toBeGreaterThan(20);
    });

    it('should have correct structure for each option', () => {
      priceOption.forEach(option => {
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('value');
        expect(typeof option.label).toBe('string');
        expect(typeof option.value).toBe('string');
      });
    });

    it('should include major currencies', () => {
      const values = priceOption.map(opt => opt.value);
      expect(values).toContain('USD');
      expect(values).toContain('EUR');
      expect(values).toContain('GBP');
      expect(values).toContain('JPY');
    });

    it('should have labels with country names', () => {
      const usdOption = priceOption.find(opt => opt.value === 'USD');
      expect(usdOption.label).toContain('United States');

      const eurOption = priceOption.find(opt => opt.value === 'EUR');
      expect(eurOption.label).toContain('Eurozone');
    });
  });

  describe('priceOptionPaypal', () => {
    it('should be a subset of priceOption', () => {
      expect(priceOptionPaypal).toBeInstanceOf(Array);
      expect(priceOptionPaypal.length).toBeLessThanOrEqual(priceOption.length);
    });

    it('should have correct structure for each option', () => {
      priceOptionPaypal.forEach(option => {
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('value');
      });
    });

    it('should include currencies supported by PayPal', () => {
      const values = priceOptionPaypal.map(opt => opt.value);
      expect(values).toContain('USD');
      expect(values).toContain('EUR');
      expect(values).toContain('GBP');
      expect(values).toContain('JPY');
    });

    it('should not include currencies not supported by PayPal', () => {
      const values = priceOptionPaypal.map(opt => opt.value);
      // PayPal doesn't support INR, NGN, etc. in the provided list
      expect(values).not.toContain('INR');
      expect(values).not.toContain('TRY');
      expect(values).not.toContain('NGN');
    });
  });
});
