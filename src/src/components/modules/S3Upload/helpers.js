export function getInitialCropSize(aspect, imageWidth, imageHeight, freeRatio) {
   const result = { width: imageWidth, height: imageHeight };
   if (typeof aspect !== 'number' || freeRatio) {
      return result;
   }
   for (let width = imageWidth; width > 0; width--) {
      const height = width * aspect;
      if (height <= imageHeight) {
         result.width = width;
         result.height = height;
         return result;
      }
   }
   return result;
}
