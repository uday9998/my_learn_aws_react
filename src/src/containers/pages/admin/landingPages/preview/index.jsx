import React, { useState } from 'react';
import { LANDING_URL } from 'utils/constants';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const LandingPagesPreviewContainer = (props) => {
   const { match } = props;
   const [iframeLoading, setIframeLoading] = useState(true);
   return (
      <>
         <iframe
            src={ `${ LANDING_URL }/landing?templateId=${ match.params.id }&preview=true&token=${ localStorage.authToken }` }
            frameBorder='0'
            title='pageBuilder'
            onLoad={ () => { setIframeLoading(false); } }
         />
         {iframeLoading
            && <LoaderSpinner />}
      </>
   );
};

LandingPagesPreviewContainer.propTypes = {
   match: PropTypes.object,
};


export default LandingPagesPreviewContainer;
