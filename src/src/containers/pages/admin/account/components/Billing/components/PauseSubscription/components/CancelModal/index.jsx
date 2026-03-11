import { useRef } from 'react';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';

import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { cancelPlan } from 'api';
import PropTypes from 'prop-types';

import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

import './index.scss';

const CancelModal = ({
   handleShowCancelModal,
   handleChangeModal,
}) => {
   const [cancelSubscription] = useSubmitForm(cancelPlan);
   const modalRef = useRef(null);
   useOutsideClickDetector(modalRef, () => handleChangeModal());

   const handleCancelPlan = () => {
      cancelSubscription({}, res => {
         window.open(res.url, '_blank');
      });
   };

   return (
      <div ref={ modalRef } className='cancel__modal__wrapper'>
         <div className='cancel__top__section'>
            <Text 
               inner='Cancel Your Subscription'
               size={ sizes.xxlarge_new }
               style={ {
                  color: '#131F1E',
               } }
            />
            <div className='subtitle__wrapper'>
               <Text 
                  inner="You'll lose access to your subscription and at the end of your current billing period."
                  size={ sizes.size_14 }
                  type={ types.new__weight__second }
                  style={ {
                     color: '#727978',
                     lineHeight: 1.7,
                  } }
               />
            </div>
            <Text
               inner='Are you sure you want to cancel?'
               type={ types.bold700 }
               size={ sizes.size_14 }
            />
         </div>
         <div className='buttons__wrapper'>
            <BaseButton 
               text='No I don’t anymore'
               theme={ themes.secondary }
               style={ {
                  width: '135px',
                  height: '44px',
                  fontSize: '14px',
               } }
               onClick={ () => handleShowCancelModal('Cancel') }
            />
            <BaseButton 
               text='Confirm & Cancel'
               theme={ themes.red }
               style={ {
                  width: '135px',
                  height: '44px',
                  fontSize: '14px',
               } }
               onClick={ handleCancelPlan }
            />
         </div>
      </div>
   );
};

CancelModal.propTypes = {
   handleShowCancelModal: PropTypes.func,
   handleChangeModal: PropTypes.func,
};

export default CancelModal;