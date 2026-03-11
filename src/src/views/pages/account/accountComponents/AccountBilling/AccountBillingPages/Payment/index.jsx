import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPES as txtTypes } from 'components/elements/TextNew';
import { getProperlyPlanNameNew } from 'utils/Plans';
import EditCard from 'components/modules/EditCard';
import IconNew from 'components/elements/iconsSize';
import AccountTrial from '../../../AccountTrial';

const AccountPaymentPage = ({
   plans, TabConsumer, onUpdateCard,
   account, mainApp,
}) => {
   const getProperlyCardName = (type) => {
      switch (type) {
         case 'visa':
            return 'Visa';
         default:
            return 'Mastercard';
      }
   };

   const { switchTab } = TabConsumer;
   const { payment_information: card } = account;
   const { currentSubscription } = plans;
   const [isOpenEditPlanModal, setIsOpenEditPlanModal] = useState(false);
   return (
      <div className='account__payment'>
         {isOpenEditPlanModal && currentSubscription && (
            <EditCard onUpdate={ onUpdateCard } />
         )}
         {(!isOpenEditPlanModal && currentSubscription && card) && (
            <div className='account__payment__card'>
               <div className='account__payment__card__left'>
                  <div className='account__payment__card__left__image'>
                     <IconNew name={ `${ getProperlyCardName(card.card_type) }CardM` } />
                  </div>
                  <div className='account__payment__card__left__title'>
                     <Text
                        inner={ `${ getProperlyCardName(card.card_type) } ended in ${ card.last4 }` }
                        type={ txtTypes.mediumSmall }
                        size={ txtSizes.medium }
                     />
                     <Text
                        inner={ `Expires: ${ card.expiry_month < 10 ? `0${ card.expiry_month }` : 'expiry_month' }/${ card.expiry_year }` }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: '#444C4B' } }
                     />
                  </div>
               </div>
               <div className='account__payment__card__right' role='presentation' onClick={ () => setIsOpenEditPlanModal(true) }>
                  <IconNew name='EditCardM' />
                  <Text
                     inner='Update'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
            </div>
         )}
         {!isOpenEditPlanModal && (
            <>
               {currentSubscription ? (
                  <div className='account__payment__plan'>
                     <div className='account__payment__plan__left'>
                        <Text
                           inner={ `${ getProperlyPlanNameNew(currentSubscription.plan_name) }` }
                           type={ txtTypes.medium153 }
                           size={ txtSizes.large }
                           style={ { color: '#3060BD' } }
                        />
                        <Text
                           inner={ `Your next bill is for $${ currentSubscription.price } on ${ currentSubscription.next_billing_at }` }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { color: '#444C4B' } }
                        />
                     </div>
                     <div className='account__payment__plan__right'>
                        <Text
                           inner='Current Plan'
                           type={ txtTypes.regular148 }
                           size={ txtSizes.small }
                           style={ { color: '#727978' } }
                        />
                     </div>
                  </div>
               ) : (
                  <AccountTrial switchTab={ switchTab } isFromPayment={ true } mainApp={ mainApp } />
               )}
            </>
         )}
      </div>
   );
};

AccountPaymentPage.propTypes = {
   plans: PropTypes.object,
   account: PropTypes.object,
   TabConsumer: PropTypes.object,
   onUpdateCard: PropTypes.func,
   mainApp: PropTypes.object,
};

export default AccountPaymentPage;
