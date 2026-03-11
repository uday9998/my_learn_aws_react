import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { SecureMemberLogin } from 'api/GuestApi';

function SecureLogin(props) {
   const { match: { params } } = props;
   const [redirectUrl, setRedirectUrl] = useState('');
   useEffect(() => {
      SecureMemberLogin(params)
         .then(data => {
            localStorage.setItem('authToken', data.data.token);
            let redirect = '/portal/membership';
            if (params.redirect) {
               if (params.redirect === 'thank-you' && data.data.plan) {
                  redirect = `/thank-you/${ data.data.plan }`;
               }
               if (params.redirect === 'portal') {
                  redirect = '/portal/membership';
               }
            } else if (data.data.course_url) {
               redirect = `/programs/${ data.data.course_url }`;
            }
            setRedirectUrl(redirect);
         })
         .catch(() => {
            setRedirectUrl('/portal/membership');
         }
         );
   }, []);

   if (redirectUrl) window.location.href = redirectUrl;
   return (<span>secure login ...</span>);
}

SecureLogin.propTypes = {
   match: PropTypes.object,
};

export default SecureLogin;
