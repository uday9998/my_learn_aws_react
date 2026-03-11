export default (keysArr, checkedObj) => {
   const result = {};
   keysArr.map(key => {
      if (key in checkedObj) {
         result[key] = checkedObj[key];
      }
      return key;
   });

   return result;
};
