import React from 'react';
import './index.scss';
import EmailsDesign from 'components/modules/settings/EmailsDesign';
import EmailsSetting from 'components/modules/settings/EmailsSetting';
import TimeSetting from 'components/modules/settings/TimeSetting';


const EmailsSettings = () => {
   return (
      <div className='mob-EmailsSettings w-full'>
         <EmailsDesign />
         <div className='m-t-exs w-full'>
            <EmailsSetting />
         </div>
         <div className='m-t-exs w-full'>
            <TimeSetting />
         </div>
      </div>
   );
};

export default EmailsSettings;
