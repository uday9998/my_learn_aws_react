export const isColorLight = (color) => {
   // Convert hex to RGB
   const r = parseInt(color.substring(1, 3), 16);
   const g = parseInt(color.substring(3, 5), 16);
   const b = parseInt(color.substring(5, 7), 16);
  
   // Calculate relative luminance
   const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
   // Threshold for light/dark
   return luminance > 128;
};