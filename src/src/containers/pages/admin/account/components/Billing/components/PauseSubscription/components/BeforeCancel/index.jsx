
import { useRef, useState } from 'react';
import { CANCEL_MODAL_DATA } from 'constants/pricing';
import PropTypes from 'prop-types';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { connectToPlan, updatePricingPlan } from 'api';
import { getConnectPlanType } from 'utils/pricing';

import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

import IconNew from 'components/elements/iconsSize';

import timeIcon from 'assets/images/pricing/time__icon.png';
import CancelModal from '../CancelModal';

import './index.scss';


const BeforeCancel = ({
   handlePreviousCancelState,
   handleChangeModal,
   optionName,
   plans,
   type,
   planName,
}) => {
   const [isShowCancelModal, setIsShowCancelModal] = useState(false);
   const modalRef = useRef(null);
   useOutsideClickDetector(modalRef, () => handleChangeModal());
   const [connectPlan] = useSubmitForm(connectToPlan);
   const [updatePlan] = useSubmitForm(updatePricingPlan);

   const handleShowCancelModal = (isCancel, link) => {
      if (isCancel.includes('Cancel')) {
         setIsShowCancelModal(prevState => !prevState);
      } else {
         window.open(link, '_target');
      }
   };

   const handleUpdatePlan = () => {
      if (!plans.currentSubscription?.plan_name || plans.currentSubscription.plan_name?.includes('starter')) {
         connectPlan(getConnectPlanType(type, planName), res => {
            window.open(res.url);
            localStorage.removeItem('showPlans');
         });
      } else {
         updatePlan({}, res => {
            window.open(res.url);
            
            localStorage.removeItem('showPlans');
         });
      }
   };

   return (
      <>
         {
            isShowCancelModal ? (
               <CancelModal 
                  handleShowCancelModal={ handleShowCancelModal }
                  handleChangeModal={ handleChangeModal }
               />
            ) : (
               <div ref={ modalRef } className='cancel__modal__wrapper'>
                  <div className='top__section'>
                     <img src={ timeIcon } alt='time' />
                     <Text 
                        inner='Wait! Before you cancel...'
                        size={ sizes.xxlarge_new }
                        style={ {
                           marginBottom: '12px',
                        } }
                     />
                     <div className='subtitle__wrapper'>
                        <Text 
                           inner="We have several resources available for those who are just setting up or are having technical issues. Before you go, we'd urge you to check these out first:"
                           size={ sizes.size_14 }
                           type={ types.new__weight__second }
                           style={ {
                              color: '#727978',
                              lineHeight: 1.7,
                           } }
                        />
                     </div>
                  </div>
                  <div className='bottom__section'>
                     <div className='list__wrapper'>
                        {
                           CANCEL_MODAL_DATA.map(modalData => {
                              return (
                                 <div key={ modalData.text } role='presentation' onClick={ () => handleShowCancelModal(modalData.text, modalData.link) } className='text__icon__wrapper'>
                                    <IconNew name={ modalData.iconName } />
                                    <Text 
                                       inner={ modalData.text }
                                       size={ sizes.medium }
                                       type={ types.bold700 }
                                       style={ {
                                          color: '#131F1E',
                                       } }
                                    />
                                 </div>
                              );
                           })
                        }
                        <div role='presentation' onClick={ !optionName.includes('Cancel') ? handleUpdatePlan : () => handleShowCancelModal(optionName) } className='text__icon__wrapper'>
                           <IconNew name={ optionName.includes('Cancel') ? 'Cancel' : 'Downgrade' } />
                           <Text 
                              inner={ optionName }
                              size={ sizes.medium }
                              type={ types.bold700 }
                              style={ {
                                 color: '#131F1E',
                              } }
                           />
                        </div>
                     </div>
                     <div className='button__wrapper'>
                        <BaseButton 
                           text='Previous Step'
                           theme={ themes.secondary }
                           style={ {
                              width: '135px',
                              height: '44px',
                              fontSize: '14px',
                           } }
                           onClick={ handlePreviousCancelState }
                        />
                        <BaseButton 
                           text='Continue'
                           style={ {
                              width: '135px',
                              height: '44px',
                              fontSize: '14px',
                           } }
                           onClick={ () => handleShowCancelModal('Cancel') }
                        />
                     </div>
                  </div>
               </div>
            )
         }
      </>
   );
};

BeforeCancel.propTypes = {
   handlePreviousCancelState: PropTypes.func,
   handleChangeModal: PropTypes.func,
   optionName: PropTypes.string,
   plans: PropTypes.object,
   type: PropTypes.string,
   planName: PropTypes.string,
};

export default BeforeCancel;