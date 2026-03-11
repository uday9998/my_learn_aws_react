import React, { useEffect, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import NotificationEdtiHeader from './NotificationEditComponents/NotificationEditHeader';
import NotificationEditLeft from './NotificationEditComponents/NotificationEditLeft';
import NotificationEditRight from './NotificationEditComponents/NotificationEditRight';

const NotificationsEidtView = ({
   onPreview, onSave, goBack, data, isLoadingNotification, metaDataDefault,
}) => {
   const [inputs, setInputs] = useState({ ...data.settings });

   useEffect(() => {
      setInputs({
         ...data.settings,
      });
   }, [data]);

   const handleInputChange = (name, value) => {
      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   const onClear = () => {
      setInputs({
         ...metaDataDefault.settings,
      });
   };

   return (
      <div className='notification__edit__view'>
         <NotificationEdtiHeader
            onClear={ onClear }
            onPreview={ onPreview }
            onSave={ () => onSave({ ...data, settings: inputs }) }
            goBack={ goBack }
         />
         <div className='notification__edit__view__bottom'>
            {isLoadingNotification ? (
               <LoaderSpinner />
            ) : (
               <>
                  <NotificationEditLeft goBack={ goBack } inputs={ inputs } handleInputChange={ handleInputChange } />
                  <NotificationEditRight data={ inputs } onInputChange={ handleInputChange } settings={ data } />
               </>
            )}
         </div>
      </div>
   );
};

NotificationsEidtView.propTypes = {
   onPreview: PropTypes.func,
   onSave: PropTypes.func,
   goBack: PropTypes.func,
   isLoadingNotification: PropTypes.bool,
   data: PropTypes.object,
   metaDataDefault: PropTypes.object,
};

export default NotificationsEidtView;
