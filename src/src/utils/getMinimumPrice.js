import { parseFloatNew } from 'utils/numberParseFloat';

const typeOptions = [
   'Free',
   'One Time Plan',
   'Subscription',
];

export const currencyPath = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';

export const getMinimumPrice = (pricings, currencyData) => {
   const all = pricings.map((e) => {
      let priceWithUsd = e.price;
      if (e.currency !== 'USD' && e.pricing_type !== 0) {
         priceWithUsd = (1 / currencyData.usd[e.currency.toLowerCase()]) * e.price;
      }
      return {
         price: priceWithUsd ? parseFloatNew(priceWithUsd) : 0,
         realPrice: e.price,
         realCurrency: e.currency,
         pricingType: typeOptions[e.pricing_type],
         paymentFrequence: e.payment_frequence,
      };
   });

   const sortedPrices = all.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
   return sortedPrices && sortedPrices[0];
};
