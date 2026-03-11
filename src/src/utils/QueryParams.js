/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import queryString from 'query-string';
import { history } from 'state/store';

class QueryParams {
   static getAll() {
      return queryString.parse(window.location.search);
   }

   static get(param) {
      return QueryParams.getAll()[param];
   }

   static getHash() {
      return window.location.hash.substr(1);
   }

   static setHash(value) {
      history.replace({
         path: '/offers/community/1',
         hash: value,
      });
   }

   static setCommunityHash(value, id) {
      history.push({
         pathname: window.location.pathname.includes('admin') ? `/admin/community/${ id }` : `/portal/community/${ id }`,
         hash: value,
      });
   }

   static getParsedSearchParams() {
      const querySearchParams = history.location.search;
      return queryString.parse(querySearchParams);
   }

   static setQueryParam(key, value) {
      const parsedParams = QueryParams.getParsedSearchParams();
      parsedParams[key] = value;
      const stringify = queryString.stringify(parsedParams, { encode: false });
      history.replace({
         path: window.location.pathname,
         hash: window.location.hash,
         search: stringify,
      });
   }

   static setQueryParamForMembership(key, value, path) {
      const parsedParams = QueryParams.getParsedSearchParams();
      parsedParams[key] = value;
      const stringify = queryString.stringify(parsedParams, { encode: false });
      history.replace({
         path,
         hash: window.location.hash,
         search: stringify,
      });
   }

   static deletQueryParam() {
      history.replace({
         path: window.location.pathname,
         hash: window.location.hash,
         search: '',
      });
   }

   static removeQueryParam(key) {
      const parsedParams = QueryParams.getParsedSearchParams();
      delete parsedParams[key];
      const stringify = queryString.stringify(parsedParams, { encode: false });
      history.replace({
         path: window.location.pathname,
         hash: window.location.hash,
         search: stringify,
      });
   }

   static generateQuery = (params) => {
      const query = [];

      Object.keys(params).forEach((key) => {
         if (key) {
            if (params[key]) {
               key !== 'count' && key !== 'page' ? query.push(`query[]=${ key }=${ params[key] }`) : query.push(`${ key }=${ params[key] }`);
            }
         }
      });
      return query;
   }

   static getLastPartOfUrl = () => {
      const lastPartOfUrlAndHash = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

      return lastPartOfUrlAndHash.split('#')[0];
   }
}
export default QueryParams;
