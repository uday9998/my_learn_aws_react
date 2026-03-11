import React, { useState } from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import PropTypes from 'prop-types';
import PlansTable from 'components/elements/plans/PlansTable';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import { reactivateSub } from 'api/AuthApi';
import { toast } from 'react-toastify';
import * as operations from 'state/modules/OldPlans/operations';
import { connect } from 'react-redux';
import { getProperlyPlanName } from 'utils/Plans';
import CancelPopup from 'components/elements/plans/CancelPopup';
import Modal from 'components/elements/Modal';
import isPrint from 'state/modules/designCourse/edit/Error';

const PlanSubscription = ({
   subscription, openUpdatCardModal, getPlans, onCancel, refunded,
}) => {
   const {
      // eslint-disable-next-line camelcase
      plan_name, trial_start, next_billing_at, price,
   } = subscription;
   const [cancelPopupIsOpen, setCancelPopupIsOpen] = useState(false);
   // eslint-disable-next-line camelcase
   let body = [[getProperlyPlanName(plan_name), trial_start, subscription.status !== 0 ? next_billing_at : 'Cancelled', price]];
   if (refunded.state) {
      body = [[getProperlyPlanName(plan_name), trial_start, subscription.status !== 0 ? next_billing_at : 'Refunded', price]];
   }
   const table = {
      head: ['Plan', 'Purchase Date', 'Next Billing Date', 'Price'],
      body,
   };

   function onCancelModalClose() {
      setCancelPopupIsOpen(false);
   }

   function onCancelClick() {
      onCancel();
      setCancelPopupIsOpen(!cancelPopupIsOpen);
   }

   const reactivateSubscribtion = async ($id) => {
      try {
         const { status } = await reactivateSub($id);
         if (status === 204) {
            getPlans();
            if (isPrint('Your account has been reactivated')) {
               toast.success('Your account has been reactivated');
            }
         } else if (isPrint('There was an issue reactivating you account, please contact support.')) {
            toast.error('There was an issue reactivating you account, please contact support.');
         }
      } catch (error) {
         if (error && error.response && error.response.data && error.response.data.message) {
            if (isPrint(error.response.data.message)) {
               toast.error(error.response.data.message);
            }
         } else if (isPrint('There was an issue reactivating you account, please contact support.')) {
            toast.error('There was an issue reactivating you account, please contact support.');
         }
      }
   };

   return (
      <SelectedWrapper hasShadow>
         <div className='planSubscription m-b-m'>
            <div className='planSubscription__header m-b-m'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner='Subscription'
                  style={ { flex: 1 } }
               />
               { !subscription.cancelled && (
                  <div style={ { display: 'flex' } }>
                     { subscription.status !== 0
                       && (
                          <>
                             <div className='planSubscription__headerButton'>
                                <BaseButton
                                   theme={ btnTheme.lightGreen }
                                   size={ btnSize.medium }
                                   text='Cancel'
                                   // onClick={ (ev) => window.cancelPKSubscription(ev, ev.target, 'D2BKp7ladeP1E0zRQjrmNgoYAQ6L9v3y', subscription.customer_secret_id) }
                                   //   onClick={ () => window.HelpCrunch('openChat') }
                                   //   onClick={ () => setCancelPopupIsOpen(true) }
                                   onClick={ () => window.open('https://support.miestro.com', '_blank') }
                                />
                             </div>
                             <div className='planSubscription__headerButton'>
                                <BaseButton
                                   theme={ btnTheme.darkGreen }
                                   size={ btnSize.medium }
                                   text='Update Card'
                                   onClick={ openUpdatCardModal }
                                />
                             </div>
                          </>
                       )
                     }
                     { subscription.status === 0
                       && (
                          <div className='planSubscription__headerButton'>
                             <BaseButton
                                theme={ btnTheme.darkGreen }
                                size={ btnSize.medium }
                                text='Reactivate'
                                onClick={ () => reactivateSubscribtion(subscription.id) }
                             />

                          </div>
                       )
                     }
                  </div>
               ) }
            </div>
            <div className='plantableContainer'>
               <PlansTable table={ table } />
            </div>
         </div>
         {
            cancelPopupIsOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth >= 1024 ? '430px' : '300px' }
                  onClose={ () => onCancelModalClose(false) }
               >
                  <div>
                     <CancelPopup
                        onClose={ () => onCancelModalClose(false) }
                        onConfirm={ () => onCancelClick() }
                     />
                  </div>
               </Modal>
            )
         }
      </SelectedWrapper>
   );
};

PlanSubscription.propTypes = {
   // eslint-disable-next-line react/no-unused-prop-types
   table: PropTypes.object,
   subscription: PropTypes.object,
   openUpdatCardModal: PropTypes.func,
   getPlans: PropTypes.func,
   onCancel: PropTypes.func,
   refunded: PropTypes.any,
};

PlanSubscription.defaultProps = {
   table: {},
   openUpdatCardModal: () => {},
   subscription: {},
};

const mapStateToProps = () => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {
      getPlans: () => dispatch(operations.getPlansOperation()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanSubscription);
