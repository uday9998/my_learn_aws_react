export const isArray = (obj) => {
   if (!obj) {
      return obj;
   }
   if (Array.isArray(obj)) {
      return obj;
   }
   return Object.values(obj);
};
