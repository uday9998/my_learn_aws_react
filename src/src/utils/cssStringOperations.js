export const generateCSSStringVariables = (colors) => {
   let cssString = ':root {\n';
  
   Object.keys(colors).forEach((key) => {
      const cssVariableName = `--${ key.replace(/_/g, '-') }`;
      const cssValue = colors[key];
      cssString += `  ${ cssVariableName }: ${ cssValue };\n`;
   });

   cssString += '}\n';
   return cssString;
};


export const parseCSSString = (cssString) => {
   const regex = /--([a-zA-Z0-9_-]+):\s*([^;\n]+);/g;
   const colors = {};
   let match = regex.exec(cssString);
  
   while (match !== null) {
      const variableName = match[1];
      const colorValue = match[2];
      colors[variableName] = colorValue;
      match = regex.exec(cssString);
   }
  
   return colors;
};