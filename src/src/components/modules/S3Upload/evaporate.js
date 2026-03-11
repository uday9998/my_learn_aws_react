import Evaporate from 'evaporate';
import Auth from 'utils/Auth';
import sha256 from 'js-sha256';
import sparkMD5 from 'spark-md5';

import { isLocalhost } from 'utils/Helpers';

const {
   REACT_APP_AWS_KEY, REACT_APP_AWS_BUCKET, REACT_APP_API_LOCAL_ENDPOINT, REACT_APP_AWS_S3_REGION,
} = process.env;
const baseUrl = document.querySelector('meta[name="base_url"]')?.getAttribute('content');
const apiUrl = (isLocalhost() || window.location.hostname === 'vahe21.miestro.loc') ? REACT_APP_API_LOCAL_ENDPOINT : (baseUrl || window.location.origin);


const config = {
   signerUrl: `${ apiUrl }/api/s3-sign`,
   timeUrl: `${ apiUrl }/api/get-time`,
   aws_key: REACT_APP_AWS_KEY,
   bucket: REACT_APP_AWS_BUCKET,
   cloudfront: true,
   awsRegion: REACT_APP_AWS_S3_REGION,
   computeContentMd5: true,
   cryptoMd5Method: (d) => btoa(sparkMD5.ArrayBuffer.hash(d, true)),
   cryptoHexEncodedHash256: sha256,
   signHeaders: {
      Authorization: () => {
         return `Bearer ${ Auth.getToken() }`;
      },
   },
};

let evaporate = null;

export default async function init() {
   try {
      const instance = await Evaporate.create(config);
      evaporate = instance;
      return evaporate;
   } catch (reason) {
      throw reason;
   }
}
