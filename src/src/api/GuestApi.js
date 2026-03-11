/* eslint-disable camelcase */
import axios from 'axios';
import { isLocalhost } from 'utils/Helpers';
import Auth from 'utils/Auth';

const baseUrl = document.querySelector('meta[name="base_url"]')?.getAttribute('content');

// Use window.location.origin as fallback if baseUrl is empty or undefined
// This ensures API calls work for any custom domain
const apiUrl = (isLocalhost() || window.location.hostname === 'vahe21.miestro.loc')
   ? process.env.REACT_APP_API_LOCAL_ENDPOINT
   : (baseUrl || window.location.origin);
const mainUrl = process.env.REACT_APP_MAIN_DOMAIN_LIVE;
// const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : process.env.REACT_APP_API_LIVE_ENDPOINT;

// instance for guest requests
const client = axios.create();

export function attempt(data) {
   return client.post(`${ apiUrl }/api/v1/auth/login`, data);
}

export function login(data) {
   return client.post(`${ apiUrl }/api/v1/auth/login`, data);
}

export function forgotPassword(data) {
   return client.post(`${ apiUrl }/api/v1/auth/password/email`, data);
}

export function resetPassword(data) {
   return client.post(`${ apiUrl }/api/v1/auth/password/reset`, data);
}

export function registerStudent(data) {
   return client.post(`${ apiUrl }/api/v1/auth/register`, data);
}
export function getSiteBuilderInfo() {
   const headers = {};
   const token = Auth.getToken();
   if (token) {
      headers.Authorization = `Bearer ${ token }`;
   }
   return client.get(`${ apiUrl }/api/v1/front/site-builder`, { headers });
}

export function SecureMemberLogin(params) {
   if (params.offer_name) {
      return client.get(`${ apiUrl }/api/v1/auth/secure-member-login/${ params.offer_name }/${ params.token }`);
   }
   return client.get(`${ apiUrl }/api/v1/auth/secure-login/${ params.token }`);
}

export function unsubscribeEmail(uuid, memberId) {
   return client.get(`${ apiUrl }/api/unsubscribe/${ uuid }/${ memberId }`);
}

export function getCategories() {
   return client.get(`${ apiUrl }/api/v1/front/category`);
}

export function downloadS3File(key, title) {
   return client.get(`${ apiUrl }/api/get-download-link?s3_key=${ key }&fileName=${ title }`);
}

export function confirmEmail(data) {
   return client.post(`${ mainUrl }/register/email-verify`, data);
}

export function resendCode(data) {
   return client.post(`${ mainUrl }/resend-code`, data);
}

export function registerAffiliate([data]) {
   return client.post(`${ apiUrl }/api/v1/auth/register`, data);
}

export function checkUserAffiliate(email) {
   return client.post(`${ apiUrl }/api/v1/auth/check-user`, { email });
}

export function unsubscribe({ site_uiid, email }) {
   return client.get(`${ apiUrl }/api/unsubscribe/${ site_uiid }/${ email }`);
}
