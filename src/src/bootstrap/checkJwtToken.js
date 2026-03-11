import moment from 'moment';
import QueryParams from 'utils/QueryParams';
import Auth from 'utils/Auth';
import { initSiteDetails } from 'api/AuthApi';

function urlBase64Decode(str) {
   let output = str.replace('-', '+').replace('_', '/');
   switch (output.length % 4) {
      case 0:
         break;
      case 2:
         output += '==';
         break;
      case 3:
         output += '=';
         break;
      default:
         throw new Error('Illegal base64url string!');
   }
   return window.atob(output);
}

function getClaimsFromToken(token) {
   let claims = {};
   if (token === undefined || token === 'undefined' || token === null || token === 'null' || token === '') {
      return null;
   }
   const encoded = token.split('.')[1];
   if (!encoded) {
      return null;
   }
   try {
      claims = JSON.parse(urlBase64Decode(encoded));
   } catch (e) {
      return null;
   }
   return claims;
}

function isTokenExpired(expTime, expDiff = 20) {
   const nowTimestamp = moment().utc().unix();
   const diff = expTime - nowTimestamp;
   if (diff <= expDiff) {
      return true;
   }
   return false;
}

export default () => {
   const tokenFromQuery = QueryParams.get('jwt-token');
   const isLogin = QueryParams.get('isLogin');
   const trialStartQuery = QueryParams.get('trial-start');
   const isFirstVisit = QueryParams.get('first_login') === 'true';
   const showIntro = QueryParams.get('show_intro') === 'true';
   const faildPayment = QueryParams.get('failed_payment') === 'true';
   const isOrtto = QueryParams.get('is_ortto') === 'true';

   if (isFirstVisit) {
      window.isFirstVisit = true;
   }
   if (faildPayment) {
      window.faildPayment = true;
   }

   if (showIntro) {
      window.showIntro = true;
   }

   if (isOrtto) {
      window.isOrtto = true;
   }

   if (trialStartQuery) {
      initSiteDetails().then((initData) => {
         if (initData.data && initData.data.user && initData.data.user.uuid) {
            window.dataLayer.push({
               'event': 'trial started',
               'id': initData.data.user.uuid,
               'plan': initData.data.user.plan_name,
            });
         }
      });
   }

   if (tokenFromQuery) {
      Auth.setToken(tokenFromQuery);
   }

   if (isLogin) {
      const apiUrl = process.env.REACT_APP_MAIN_DOMAIN;
      const isLive = apiUrl === 'miestro.com';
      if (isLive) {
         localStorage.setItem('login', 1);
      }
   }

   if (Auth.isTokenExists()) {
      const token = Auth.getToken();
      const claims = getClaimsFromToken(token);
      if (!claims) {
         Auth.logout();
      } else {
         const isExpired = isTokenExpired(claims.exp);
         if (isExpired) {
            Auth.logout();
         }
      }
   }
};
