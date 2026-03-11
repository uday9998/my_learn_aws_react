/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { LANDING_URL } from 'utils/constants';
import { apiUrl } from 'utils/Helpers';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import IconNew from 'components/elements/iconsSize';
import UnsavedPopup from 'components/elements/checkoutPopup';
import { useHistory } from 'react-router';

const PageBuilder = ({ url }) => {
   const [iframeLoading, setIframeLoading] = useState(true);
   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
   const [showPopUp, setShowPopUp] = useState(false);
   const history = useHistory();

   useEffect(() => {
      const handleMessage = (event) => {
         if (event.origin !== LANDING_URL) {
            return; 
         }

         if (event.data.type === 'unsavedChanges') {
            setHasUnsavedChanges(event.data.hasUnsavedChanges);
         }
      };

      window.addEventListener('message', handleMessage);

      return () => {
         window.removeEventListener('message', handleMessage);
      };
   }, []);

   const handleGoBack = () => {
      if (hasUnsavedChanges) {
         setShowPopUp(true);
      } else {
         history.goBack();
      }
   };

   const handleCloseModal = () => {
      setShowPopUp(false);
   };

   const handleYes = () => {
      history.goBack();
   };

   return (
      <div className='d-pageBuilder h-full w-full flex' id='pageBuilder'>
         {
            showPopUp && (
               <UnsavedPopup
                  handleCloseModal={ handleCloseModal }
                  handleYes={ handleYes }
               />
            )
         }
         <style dangerouslySetInnerHTML={ {
            __html: `
                  .adminContent { padding: 0px; }
               `,
         } }
         />
         {!iframeLoading && (
            <div
               className='d-pageBuilder__goBack'
               role='presentation'
               onClick={ handleGoBack }
            >
               <IconNew name='arrowLeftL' />
            </div>
         )}
         <iframe
            src={ `${ LANDING_URL }/landing?mode=admin&url=${ url }&token=${ localStorage.authToken }&apiUrl=${ apiUrl }` }
            frameBorder='0'
            title='pageBuilder'
            onLoad={ () => { setIframeLoading(false); } }
         />
         {iframeLoading
            && <LoaderSpinner />}
      </div>
   );
};

PageBuilder.propTypes = {
   url: PropTypes.string,
};

PageBuilder.displayName = 'iframe';

export default PageBuilder;
