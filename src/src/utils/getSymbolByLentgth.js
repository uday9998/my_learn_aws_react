export const getSymbolByLength = (text, symbol) => {
   const arraySymbol = [];
   for (let i = 0; i < text.length; i++) {
      arraySymbol.push(symbol);
   }
   return arraySymbol.join('');
};
