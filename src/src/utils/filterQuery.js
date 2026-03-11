export function filterQuery(param) {
   let query = '';
   if (Object.keys(param).length) {
      Object.keys(param).forEach((input) => {
         if (param[input] && param[input] !== 'all' && param[input] !== 'all_courses' && input !== 'searchFrom' && input !== 'searchTo') {
            if (query === '') {
               query = `${ input }=${ param[input] }`;
            } else {
               query = `${ query }&${ input }=${ param[input] }`;
            }
         }
      }
      );
   }
   return query;
}
