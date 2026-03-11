const { default: QueryParams } = require('./QueryParams');

const includePath = (path) => {
   return window.location.pathname.includes(path);
};

const isPageBuilder = () => {
   if (includePath('landings') && window.location.pathname.split('/').length > 3 && window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] === 'edit') {
      return true;
   }
   if (QueryParams.getHash() === 'upsellview') {
      return true;
   }
   if (window.location.path) {
      return true;
   }
   if (includePath('admin/community')) {
      return true;
   }
   if (includePath('admin/quizzes/edit')) {
      return true;
   }
   if (includePath('admin/quiz/result')) {
      return true;
   }
   if (includePath('certificates') && window.location.pathname.split('/').length > 3 && !window.location.pathname.includes('settings')) {
      return true;
   }
   if (includePath('checkout')) {
      return true;
   }
   if (includePath('/emails/') && !includePath('/emails/tracking')) {
      return true;
   }
   if (includePath('portal/template')) {
      return true;
   }
   if (includePath('checkout') && includePath('offer')) {
      return true;
   }
   if (includePath('settings/notification')) {
      return true;
   }
   if (includePath('blog') && includePath('edit')) {
      return true;
   }
   if ((includePath('lessons') && includePath('lessons')) || includePath('videos')) {
      return true;
   }
   if (includePath('affiliate') && includePath('template')) {
      return true;
   }
   if (includePath('other-page/edit')) {
      return true;
   }
   if (includePath('thank-you/preview')) {
      return true;
   }
   if (includePath('other-pages/preview')) {
      return true;
   }
   return false;
};
export default isPageBuilder;
