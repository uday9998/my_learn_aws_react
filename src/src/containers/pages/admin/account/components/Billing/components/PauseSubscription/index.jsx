import { useEffect, useRef, useState } from 'react';
import { STEPS_DATA, STEPS_NAMES } from 'constants/pricing';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import PropTypes from 'prop-types';
import { updateMeta } from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';


import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import messageIcon from 'assets/images/pricing/messageIcon.png';
import BeforeCancel from './components/BeforeCancel';

import './index.scss';

const PauseSubscription = ({
   handleChangeModal,
   plans,
   type,
   planName,
   handleKeepSubscription,
   handleTogglePauseModal,
   handleShowPricingList,
}) => {
   const [sendQuestions] = useSubmitForm(updateMeta);
   const [stepsData, setStepsData] = useState(STEPS_DATA);
   const [stepNumber, setStepNumber] = useState(0);
   const [isShowTextarea, setIsShowTextarea] = useState({
      show: false,
      value: 'open',
   });
   const [isShowCancelModal, setIsShowCancelModal] = useState({
      show: false,
      optionName: '',
   });
   const modalRef = useRef(null);
   useOutsideClickDetector(modalRef, handleChangeModal);

   useEffect(() => {
      if (!stepNumber) {
         const otherStep = stepsData[STEPS_NAMES[stepNumber]].find(step => step.text === 'Other');
         if (otherStep.isChecked) {
            setIsShowTextarea(prevState => {
               return {
                  ...prevState,
                  show: true,
               };
            });
         }
      }
   }, [stepNumber]);

   const handleChangeCheck = (checkTitle) => {
      if (checkTitle === 'Other') {
         setIsShowTextarea(prevState => {
            return {
               ...prevState,
               show: true,
               value: '',
            };
         });
      } else {
         setIsShowTextarea(prevState => {
            return {
               ...prevState,
               show: false,
               value: 'open',
            };
         });
      }
      
      setStepsData(prevState => {
         return {
            ...prevState,
            [STEPS_NAMES[stepNumber]]: prevState[STEPS_NAMES[stepNumber]].map(step => {
               if (checkTitle === step.text) {
                  return {
                     ...step,
                     isChecked: true,
                  };
               }

               return {
                  ...step,
                  isChecked: false,
               };
            }),
         };
      });
   };

   const handleContinue = () => {
      const step = stepsData[STEPS_NAMES[stepNumber]].find(step => step.isChecked);
      sendQuestions({
         key: 'cancel_msg',
         value: step.text === 'Other' ? isShowTextarea.value : step.text,
      });
      setStepNumber(prevState => prevState + 1);
      setIsShowTextarea(prevState => {
         return {
            ...prevState,
            show: false,
         };
      });
   };

   const handlePrevStep = () => {
      setStepNumber(prevState => prevState - 1);
   };

   const handleChangeTextarea = (e) => {
      setIsShowTextarea(prevState => {
         return {
            ...prevState,
            value: e.target.value,
         };
      });
   };

   const handleCancelApply = () => {
      const step = stepsData[STEPS_NAMES[stepNumber]].find(step => step.isChecked);
      if (step.text.includes('Cancel')) {
         setIsShowCancelModal(prevState => {
            return {
               ...prevState,
               show: true,
               optionName: 'Cancel Subscription',
            };
         });
      } else if (step.text.includes('Downgrade')) {
         localStorage.setItem('downgrade', 'showModal');
         handleKeepSubscription();
         handleShowPricingList();
      } else if (step.text.includes('Keep')) {
         handleKeepSubscription();
      } else if (step.text.includes('Pause')) {
         handleTogglePauseModal();
      }
   };

   const handlePreviousCancelState = () => {
      setIsShowCancelModal(false);
   };

   const handleOpenSupportChat = () => { if (window.OpenWidget) { window.OpenWidget.call('maximize'); } };

   return (
      <div className='modal__wrapper'>
         {
            isShowCancelModal.show ? (
               <BeforeCancel 
                  handlePreviousCancelState={ handlePreviousCancelState }
                  handleChangeModal={ handleChangeModal }
                  optionName={ isShowCancelModal.optionName }
                  plans={ plans }
                  type={ type }
                  planName={ planName }
               />
            ) : (
               <div ref={ modalRef } className='modal__inner__wrapper'>
                  <div className='top__section'>
                     <Text 
                        inner='We’re Sad To See You Go'
                        size={ sizes.xxlarge }
                        type={ types.new__weight }
                        style={ {
                           color: '#131F1E',
                        } }
                     />
                     <Text 
                        inner={ stepNumber > 0 ? 'What would you like to do?' : 'What is the reason you’re leaving?' }
                        size={ sizes.size_14 }
                        type={ types.new__weight__second }
                        style={ {
                           color: '#131F1E',
                        } }
                     />
                     <div className='info__section'>
                        <div>
                           <IconNew name='infoM' />
                        </div>
                        <Text 
                           inner={ stepNumber > 0 ? 'Select which option you prefer' : 'Select the reason you are canceling subscription' }
                           size={ sizes.size_14 }
                           type={ types.new__weight__second }
                           style={ {
                              color: '#131F1E',
                              lineHeight: 1.7,
                           } }
                        />
                     </div>
                  </div>
                  <div className='bottom__section'>
                     <div
                        style={ {
                           marginBottom: isShowTextarea.show && '16px',
                        } }
                        className='steps__wrapper'>
                        {
                           stepsData[STEPS_NAMES[stepNumber]].map(step => {
                              return (
                                 <CheckboxCircle
                                    label={ step.text }
                                    isChecked={ step.isChecked }
                                    onCheck={ () => { handleChangeCheck(step.text); } }
                                    isSmall={ true }
                                 />
                              );
                           })
                        }
                     </div>
                     {
                        isShowTextarea.show ? (
                           <div className='textarea__wrapper'>
                              <textarea onChange={ handleChangeTextarea } value={ isShowTextarea.value } />
                           </div>
                        ) : null
                     }
                     <div className='buttons__wrapper'>
                        <BaseButton 
                           text={ stepNumber > 0 ? 'Previous Step' : 'Cancel' }
                           theme={ themes.secondary }
                           style={ {
                              width: '135px',
                              height: '44px',
                              fontSize: '14px',
                           } }
                           onClick={ stepNumber > 0 ? handlePrevStep : handleChangeModal }
                        />
                        <BaseButton 
                           text={ stepNumber > 0 ? 'Apply' : 'Continue' }
                           disabled={ !isShowTextarea.value }
                           style={ {
                              width: '135px',
                              height: '44px',
                              fontSize: '14px',
                           } }
                           onClick={ stepNumber === 1 ? handleCancelApply : handleContinue }
                        />
                     </div>
                     {
                        stepNumber > 0 ? (
                           <div className='modal__footer__wrapper'>
                              <div className='or__section'>
                                 <div />
                                 <Text 
                                    inner='or'
                                    size={ sizes.size_14 }
                                    type={ types.new__weight__second }
                                    style={ {
                                       color: '#727978',
                                    } }
                                 />
                                 <div />
                              </div>
                              <div role='presentation' onClick={ handleOpenSupportChat } className='contact__wrapper'>
                                 <img src={ messageIcon } alt='message' />
                                 <Text 
                                    inner='Contact Us'
                                    size={ sizes.small }
                                    style={ {
                                       color: '#24554E',
                                    } }
                                 />
                              </div> 
                           </div>
                        ) : null
                     }
                  </div>
               </div>
            )
         }
      </div>
   );
};

PauseSubscription.propTypes = {
   handleChangeModal: PropTypes.func,
   handleKeepSubscription: PropTypes.func,
   handleTogglePauseModal: PropTypes.func,
   handleShowPricingList: PropTypes.func,
   plans: PropTypes.object,
   type: PropTypes.string,
   planName: PropTypes.string,
};

export default PauseSubscription;