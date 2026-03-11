let HelpShelfLoader = {};

export function useScript() {
   window.helpShelfSettings = {
      'siteKey': 'EVEqU1WP',
      'userId': '',
      'userEmail': '',
      'userFullName': '',
      'userAttributes': {
         // Add custom user attributes here
      },
      'companyAttributes': {
         // Add custom company attributes here
      },
   };
   const po = document.createElement('script');
   (function () {
      po.type = 'text/javascript';
      po.id = 'hs-loader';
      po.async = true;
      po.src = 'https://s3.amazonaws.com/helpshelf-production/gen/loader/EVEqU1WP.min.js';
      // eslint-disable-next-line no-multi-assign

      // eslint-disable-next-line no-multi-assign
      po.onload = po.onreadystatechange = function () {
         const rs = this.readyState;
         // eslint-disable-next-line eqeqeq
         if (rs && rs != 'complete' && rs != 'loaded') return;
         // eslint-disable-next-line no-undef
         HelpShelfLoader = new HelpShelfLoaderClass();
         HelpShelfLoader.identify(window.helpShelfSettings);
      };
      const s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
   }());
   return () => {
      document.body.removeChild(po);
   };
}
export function HasOpen() {
   HelpShelfLoader.showHelpShelf();
}
export function HasClose() {
   // closeHelpShelf;
   HelpShelfLoader.closeHelpShelf();
}
