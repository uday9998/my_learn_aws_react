export const LinkHref = (customUrl) => {
   let newUrl = customUrl;
   if (!customUrl.match(/^https?:\/\//i)) {
      newUrl = `http://${ customUrl }`;
   }
   return newUrl;
};

export const getLandingUrl = (url) => {
   const isAuthToken = localStorage.authToken ? `?token=${ localStorage.authToken }` : '';
   return `${ window.location.origin }/p/${ url }${ isAuthToken }`;
};
