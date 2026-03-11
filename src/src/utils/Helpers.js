export const isLocalhost = () => {
   return Boolean(
      window.location.hostname === 'localhost'
        // [::1] is the IPv6 localhost address.
        || window.location.hostname === '[::1]'
        // 127.0.0.1/8 is considered localhost for IPv4.
        || window.location.hostname.match(
           /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
   );
};

export const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length);

export function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

export function filterObjectFalsyValues(object) {
   return Object.keys(object)
      .reduce((result, key) => {
         if (object[key]) {
            // eslint-disable-next-line no-param-reassign
            result[key] = object[key];
         }

         return result;
      }, {});
}


const baseUrl = document.querySelector('meta[name="base_url"]')?.getAttribute('content');

// Use window.location.origin as fallback if baseUrl is empty or undefined
export const apiUrl = (isLocalhost()) ? process.env.REACT_APP_API_LOCAL_ENDPOINT : (baseUrl || window.location.origin);
