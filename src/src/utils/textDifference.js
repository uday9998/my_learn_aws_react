
const findTheDifference = (s, t) => {
   let a = 0; let
      b = 0; let
      i = 0;
   while (s[i]) {
      a ^= s.charCodeAt(i).toString(2);
      b ^= t.charCodeAt(i).toString(2);
      i++;
   }
   b ^= t.charCodeAt(i).toString(2);
   const charCode = parseInt(a ^ b, 2);
   return String.fromCharCode(charCode);
};
export default findTheDifference;
