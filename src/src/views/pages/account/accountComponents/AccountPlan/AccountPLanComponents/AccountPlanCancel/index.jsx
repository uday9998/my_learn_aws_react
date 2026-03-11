import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import Text, { SIZES as txtSize, TYPES as txtTypes, TextWithIcon } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
// import DeleteModal from 'components/elements/DeleteModal';

const AccountPlanCancel = ({
   isCancelled, onReactivate, setIsOpenPlanCardModal, plans,
}) => {
   // const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

   useEffect(() => {
      if (window.isOrtto) {
         delete window.isOrtto;
         setIsOpenPlanCardModal(true);
      }
   }, []);

   const handleOpenSupportChat = () => {
      // document.querySelector('body>#ap3-talk-widget-ui').shadowRoot.querySelector('#__root').querySelector('div').click();
      // document.querySelector('.circleRollButton').click();
      window.open('https://support.miestro.com', '_blank');
   };

   return (
      <div className='account__plan__cancel'>
         {/* {isCancelled && (
            <>
               <TextWithIcon
                  inner='Close Miestro account'
                  type={ txtTypes.medium }
                  size={ txtSize.xlarge }
                  color='#131F1E'
                  tooltip='ToolTip'
                  isWithoutIcon={ true }
               />
               {isOpenCancelModal && (
                  <DeleteModal
                     title='Are you sure you want to cancel your subscription?'
                     deleteText='Cancel Subscription'
                     onDelete={ () => onCancel() }
                     onCancel={ () => setIsOpenCancelModal(false) }
                  />
               )}
               <Text
                  inner="If you have a reasons to close your account, you can cancel your subscription. All of your information will be kept for three months, after which it will be deleted. We'll send you an email about it."
                  type={ txtTypes.regularDefault }
                  size={ txtSize.small14 }
                  style={ { color: '#444C4B', paddingTop: '4px' } }
               />
               <div className='account__plan__cancel__help'>
                  <Text
                     inner='But you can also contact us, and together we will find a way out of this situation.'
                     type={ txtTypes.regularDefault }
                     size={ txtSize.small14 }
                     style={ { color: ' #444C4B', textAlign: 'center' } }
                  />
               </div>
            </>
         )} */}
         <div className='account__plan__cancel__buttons'>
            <BaseButton
               text='Contact Us'
               style={ { maxWidth: 'max-content' } }
               onClick={ handleOpenSupportChat }
            />
            {plans.customer_id && (
               <BaseButton
                  text='Update Card'
                  style={ { maxWidth: 'max-content' } }
                  onClick={ () => setIsOpenPlanCardModal(true) }
               />
            )}
            {isCancelled && (
               <BaseButton
                  text='Reactivate'
                  theme={ btnThemes.secondary }
                  style={ { maxWidth: 'max-content' } }
                  onClick={ () => onReactivate() }
               />
            )}
            {/* <BaseButton
                  text='Cancel Subscription'
                  theme={ btnThemes.secondary }
                  style={ { maxWidth: 'max-content', borderColor: '#D12D36', color: '#D12D36' } }
                  onClick={ () => setIsOpenCancelModal(true) }
               /> */}
         </div>
      </div>
   );
};

AccountPlanCancel.propTypes = {
   // onCancel: PropTypes.func,
   onReactivate: PropTypes.func,
   isCancelled: PropTypes.bool,
   setIsOpenPlanCardModal: PropTypes.func,
   plans: PropTypes.object,
};

export default AccountPlanCancel;
