export const SliceAndConnectText = (text = '', count) => {
   if (!text) return '';
   return `${ text.slice(0, count) }${ text.length > count ? '...' : '' }`;
};

export default SliceAndConnectText;
