export function updateArrayByObjectKey(checkFunction, array, newValue) {
   const result = [...array];
   const oldIndex = result.findIndex(checkFunction);
   if (oldIndex !== -1) {
      result[oldIndex] = newValue;
   } else {
      result.push(newValue);
   }
   return result;
}
