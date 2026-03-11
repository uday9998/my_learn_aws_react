import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Select from 'components/elements/form/Select';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import timezonsData from 'utils/timezons.json';

const TimeSetting = ({
   emailSettings, onChange, handleFormSubmit, handleCancelChanges,
}) => {
   const emailSendTimes = [];
   // eslint-disable-next-line camelcase
   emailSettings.email_send_times.map(
      // eslint-disable-next-line camelcase
      email_send_time => emailSendTimes.push({ label: email_send_time, value: email_send_time })
   );
   return (
      <DynamicWrapper
         isOpen={ false }
         title='Time Zone And Time Settings'
         borderColor='#cddaf1'
         openedHasShadow
         openedBackColor='#fff'
         backColor='#fff'
      >
         <div className='timeSetting'>
            <div>
               <Select
                  label='Time zone'
                  placeholder='UTC/GMT + 00:00 Africa/Dakar'
                  iconColor='#3f4f65'
                  name='timezone'
                  value={ emailSettings.timezone }
                  options={ timezonsData }
                  onChange={ onChange }
               />
            </div>
            <div className='m-t-exl'>
               <Select
                  label='Send Time'
                  placeholder='00:00'
                  iconColor='#3f4f65'
                  name='email_send_time'
                  value={ emailSettings.email_send_time }
                  options={ emailSendTimes }
                  onChange={ onChange }
               />
            </div>
            <div className='timeSetting__btns'>
               <div>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Cancel'
                     onClick={ () => handleCancelChanges('timezone') }
                  />
               </div>
               <div>
                  <BaseButton
                     size={ btnSize.large }
                     text='Save'
                     onClick={ () => handleFormSubmit('timezone') }
                  />
               </div>
            </div>
         </div>
      </DynamicWrapper>
   );
};

TimeSetting.propTypes = {
   emailSettings: PropTypes.object,
   onChange: PropTypes.func,
   handleFormSubmit: PropTypes.func,
   handleCancelChanges: PropTypes.func,
};

export default TimeSetting;
