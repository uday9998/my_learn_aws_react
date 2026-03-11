export default function getColor(rgbOrHex, opacity) {
   let rgba;

   if (!rgbOrHex) {
      throw new Error('No color provided');
   }

   if (rgbOrHex.charAt(0) === '#') {
      // Hexadecimal color
      let color = rgbOrHex.substr(1);
      // Expand short hex format (#fff) to full format (#ffffff)
      if (color.length === 3 || color.length === 4) {
         color = color.split('').map(c => c + c).join('');
      } else if (color.length === 5 || color.length === 6) {
         color += 'f'; // Add missing 'f' if it's 5 characters
      }
      const hexRegex = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      const result = hexRegex.exec(color);

      if (result) {
         const r = parseInt(result[1], 16);
         const g = parseInt(result[2], 16);
         const b = parseInt(result[3], 16);
         rgba = [r, g, b, opacity || 1];
      } else {
         return rgbOrHex;
         // throw new Error('Invalid hexadecimal color format');
      }
   } else if (rgbOrHex.startsWith('rgb(') && rgbOrHex.endsWith(')')) {
      // RGB or RGBA color
      const rgbValues = rgbOrHex.slice(4, -1).split(',').map(value => parseInt(value.trim(), 10));

      if (rgbValues.length >= 3 && rgbValues.length <= 4) {
         rgba = rgbValues.slice(0, 3);
         if (rgbValues.length === 4) {
            rgba[3] = opacity || rgbValues[3];
         } else if (opacity !== undefined) {
            rgba.push(opacity);
         }
      } else {
         return rgbOrHex;
         // throw new Error('Invalid RGB or RGBA color format');
      }
   } else if (rgbOrHex.startsWith('rgba(') && rgbOrHex.endsWith(')')) {
      // RGBA color
      const rgbaValues = rgbOrHex.slice(5, -1).split(',').map(value => parseFloat(value.trim()));

      if (rgbaValues.length === 4) {
         rgba = rgbaValues;
         if (opacity !== undefined) {
            rgba[3] = opacity;
         }
      } else {
         // throw new Error('Invalid RGBA color format');
         return rgbOrHex;
      }
   } else {
      // throw new Error('Invalid color format');
      return rgbOrHex;
   }

   return `rgba(${ rgba[0] }, ${ rgba[1] }, ${ rgba[2] }, ${ rgba[3] })`;
}
