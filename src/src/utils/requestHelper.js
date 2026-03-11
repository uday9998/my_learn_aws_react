export function removeUnusedKeys(obj, keys) {
   const o = { ...obj };
   // eslint-disable-next-line no-restricted-syntax
   for (const k of keys) {
      if (!o[k]) {
         delete o[k];
      }
   }
   return o;
}
