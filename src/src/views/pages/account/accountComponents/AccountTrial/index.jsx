import React from 'react';
import Text, { SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';
import './index.scss';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import moment from 'moment';

const AccountTrial = ({ isFromPayment = false, switchTab, mainApp }) => {
   const dateCreated = moment(mainApp.created_at);
   const dateNow = moment(Date.now());
   const diffDays = dateNow.diff(dateCreated, 'days');
   const diffTrialDays = mainApp.trial - diffDays;
   if (diffTrialDays <= 0 || mainApp.trial >= 50) {
      return null;
   }

   return (
      <div className='account__trial'>
         <div className='account__trial__left'>
            <div className='account__trial__left__title'>
               <Text
                  inner='The trial period has started, you have'
                  type={ txtTypes.medium153 }
                  size={ txtSize.large }
                  style={ { color: '#3060BD' } }
               />
               <Text
                  inner={ diffTrialDays }
                  type={ txtTypes.bold }
                  size={ txtSize.large }
                  style={ { color: '#3060BD', lineHeight: '153%' } }
               />
               <Text
                  inner='days'
                  type={ txtTypes.medium153 }
                  size={ txtSize.large }
                  style={ { color: '#3060BD' } }
               />
            </div>
            <div style={ { display: 'flex', flexDirection: 'column' } }>
               <Text
                  inner={ `All Miestro functions are available to you for ${ diffTrialDays } days.` }
                  type={ txtTypes.regularDefault }
                  size={ txtSize.small }
                  style={ { color: '#444C4B' } }
               />
               <Text
                  inner='After these days, you need to decide which features will work best for you'
                  type={ txtTypes.regularDefault }
                  size={ txtSize.small }
                  style={ { color: '#444C4B' } }
               />
               {isFromPayment && (
               <>
                  <Text
                     inner='Or you can purchase it now'
                     type={ txtTypes.regularDefault }
                     size={ txtSize.small }
                     style={ { color: '#444C4B', marginTop: '20px' } }
                  />
                  <BaseButton
                     text='Go to Plans'
                     onClick={ () => switchTab('plans') }
                     style={ { maxWidth: 'min-content', marginTop: '32px' } }
                  />
               </>
               )}
            </div>
         </div>
         <div className='account__trial__right'>
            <Text
               inner='Current Plan'
               type={ txtTypes.regular148 }
               size={ txtSize.xsmall }
               style={ { color: '#444C4B' } }
            />
         </div>
      </div>
   );
};

AccountTrial.defaultProps = {
   mainApp: {},
};

AccountTrial.propTypes = {
   isFromPayment: PropTypes.bool,
   switchTab: PropTypes.func,
   mainApp: PropTypes.object,
};

export default AccountTrial;
