export const searchWordInMessage = (message, searchWords) => {
   let isIncluding = false;
   const regexFirst = /<p><!--block-->/g;
   const regexSecond = /<\/p>/g;
   const messagesWord = message.trim().split(' ').map(e => e.replace(regexFirst, '').replace(regexSecond, '').toLowerCase());
   searchWords.forEach(element => {
      if (messagesWord.includes(element.toLowerCase()) && element !== '') {
         isIncluding = true;
      }
   });
   return isIncluding;
};
