export const urlValidation = (url) => {
   const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
   if (url.match(regex)) {
      return true;
   }
   return false;
};

export const iframeValidation = (code) => {
   const regex = /(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/;
   if (code.match(regex)) {
      return true;
   }
   return false;
};
