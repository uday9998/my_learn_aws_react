export const checkLink = (string) => {
   let newstring = string;
   if (!(/(http(s?)):\/\//i.test(string))) {
      newstring = `http://${ string }`;
   }
   return newstring;
};
