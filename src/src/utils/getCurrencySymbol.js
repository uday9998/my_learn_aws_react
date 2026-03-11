const getCurrencySumbol = (symbolName) => {
   switch (symbolName) {
      case 'AUD': return 'AUD:$';
      case 'CAD': return 'CAD:$';
      case 'CZK': return 'Kč';
      case 'DKK': return 'DKK:kr';
      case 'EUR': return '€';
      case 'HKD': return 'HK$';
      case 'ILS': return '₪';
      case 'MXN': return 'MXN:$';
      case 'NZD': return 'NZD:$';
      case 'NOK': return 'NOK:kr';
      case 'PHP': return '₱';
      case 'PLN': return 'zł';
      case 'GBP': return '£';
      case 'RUB': return '₽';
      case 'SGD': return 'S$';
      case 'SEK': return 'SEK:kr';
      case 'CHF': return 'Fr';
      case 'THB': return '฿';
      case 'USD': return '$';
      case 'INR': return '₹';
      case 'RON': return 'lei';
      case 'TRY': return '₺';
      case 'JPY': return '¥';
      case 'NGN': return 'NGN';
      case 'GHS': return 'GHS';
      case 'ZAR': return 'ZAR';
      case 'KES': return 'KES';
      case null: return '';
      case undefined: return '';
      default: return symbolName;
   }
};

export const priceOption = [
   { label: 'Australia (AUD)', value: 'AUD' },
   { label: 'Canada (CAD)', value: 'CAD' },
   { label: 'Czech Republic (CZK)', value: 'CZK' },
   { label: 'Denmark (DKK)', value: 'DKK' },
   { label: 'Eurozone (EUR)', value: 'EUR' },
   { label: 'Hong Kong (HKD)', value: 'HKD' },
   { label: 'Israel (ILS)', value: 'ILS' },
   { label: 'Mexico (MXN)', value: 'MXN' },
   { label: 'New Zealand (NZD)', value: 'NZD' },
   { label: 'Norway (NOK)', value: 'NOK' },
   { label: 'Philippines (PHP)', value: 'PHP' },
   { label: 'Romania (RON)', value: 'RON' },
   { label: 'Poland (PLN)', value: 'PLN' },
   { label: 'United Kingdom (GBP)', value: 'GBP' },
   { label: 'Russia (RUB)', value: 'RUB' },
   { label: 'Singapore (SGD)', value: 'SGD' },
   { label: 'Sweden (SEK)', value: 'SEK' },
   { label: 'Switzerland (CHF)', value: 'CHF' },
   { label: 'Thailand (THB)', value: 'THB' },
   { label: 'United States (USD)', value: 'USD' },
   { label: 'India (INR)', value: 'INR' },
   { label: 'Turkey (TRY)', value: 'TRY' },
   { label: 'Japan (JPY)', value: 'JPY' },
   { label: 'Nigerian Naira (NGN)', value: 'NGN' },
   { label: 'Ghanaian Cedi (GHS)', value: 'GHS' },
   { label: 'South African Rand (ZAR)', value: 'ZAR' },
   { label: 'Kenyan Shilling (KES)', value: 'KES' },
];

export const priceOptionPaypal = [
   { label: 'Australia (AUD)', value: 'AUD' },
   { label: 'Canada (CAD)', value: 'CAD' },
   { label: 'Czech Republic (CZK)', value: 'CZK' },
   { label: 'Denmark (DKK)', value: 'DKK' },
   { label: 'Eurozone (EUR)', value: 'EUR' },
   { label: 'Hong Kong (HKD)', value: 'HKD' },
   { label: 'Israel (ILS)', value: 'ILS' },
   { label: 'Mexico (MXN)', value: 'MXN' },
   { label: 'New Zealand (NZD)', value: 'NZD' },
   { label: 'Norway (NOK)', value: 'NOK' },
   { label: 'Philippines (PHP)', value: 'PHP' },
   { label: 'Romania (RON)', value: 'RON' },
   { label: 'Poland (PLN)', value: 'PLN' },
   { label: 'United Kingdom (GBP)', value: 'GBP' },
   { label: 'Russia (RUB)', value: 'RUB' },
   { label: 'Singapore (SGD)', value: 'SGD' },
   { label: 'Sweden (SEK)', value: 'SEK' },
   { label: 'Switzerland (CHF)', value: 'CHF' },
   { label: 'Thailand (THB)', value: 'THB' },
   { label: 'United States (USD)', value: 'USD' },
   { label: 'Japan (JPY)', value: 'JPY' },
];

export default getCurrencySumbol;
