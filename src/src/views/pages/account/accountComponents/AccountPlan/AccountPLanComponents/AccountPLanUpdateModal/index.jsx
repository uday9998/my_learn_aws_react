import ModalNew from 'components/elements/ModalNew';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Checkout from 'components/elements/CardForm';
import { StripeProvider } from 'react-stripe-elements';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Text, { TextWithIcon, SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';
import Switch from 'components/elements/switchNew';
import './index.scss';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';


const UpdatePlanModal = ({
   onClose, handleConnectToPlan, isConnect, selectedPlan,
   setSelectedPlan, isUdpateCard, changePlan, progressPlanConnect,
}) => {
   const confirmStripeRef = useRef();
   const [cardProgress, setCardProgress] = useState(false);
   const onSumbit = (data) => {
      const { error, token } = data;
      if (error && error.message) {
         if (isPrint(error.message)) {
            toast.error(error.message);
         }
         setCardProgress(false);
      } else {
         setCardProgress(false);
         handleConnectToPlan(token);
      }
   };

   const getFilteredFunctions = (current, forFilter) => {
      const arrayToReturn = [];
      current.forEach((item) => {
         const searchItem = forFilter.filter((i) => i === item);
         if (!searchItem[0]) {
            arrayToReturn.push(item);
         }
      });
      return arrayToReturn;
   };


   let type = 'Essential';
   let price = selectedPlan.plans.plan_prices[selectedPlan.id];
   if (selectedPlan.id.includes('yearly')) {
      price = parseInt(selectedPlan.plans.plan_prices[selectedPlan.id] / 12, 10);
   }
   let functions = selectedPlan.plans.plan_features['miestro-essential'];
   let description = 'Great For Beginners';
   let buttonDesc = 'Change to Surge Plan';
   let buttonDescLeft = 'Change to Surge Plan';
   switch (selectedPlan.id) {
      case 'newmiestro-essential-plan-monthly':
      case 'newmiestro-essential-plan-yearly':
         type = 'Essential';
         functions = selectedPlan.plans.plan_features['miestro-essential'];
         description = 'Great For Beginners';
         buttonDesc = 'Change to Surge Plan';
         buttonDescLeft = '';
         break;
      case 'newmiestro-surge-plan-monthly':
      case 'newmiestro-surge-plan-yearly':
         type = 'Surge';
         functions = getFilteredFunctions(selectedPlan.plans.plan_features['miestro-surge'], selectedPlan.plans.plan_features['miestro-essential']);
         description = 'For The More Advanced';
         buttonDesc = 'Change to Infinite Plan';
         buttonDescLeft = 'Change to Essential Plan';
         break;
      case 'newmiestro-infinite-plan-monthly':
      case 'newmiestro-infinite-plan-yearly':
         type = 'Infinite';
         functions = getFilteredFunctions(selectedPlan.plans.plan_features['miestro-infinite'], selectedPlan.plans.plan_features['miestro-surge']);
         description = 'Recommended For Pro';
         buttonDesc = '';
         buttonDescLeft = 'Change to Surge Plan';
         break;
      default:
         type = 'Essential';
   }

   const handlSelectPlan = (planType) => {
      if (planType === '+') {
         switch (selectedPlan.id) {
            case 'newmiestro-essential-plan-monthly':
               setSelectedPlan({ ...selectedPlan, id: 'newmiestro-surge-plan-monthly' });
               break;
            case 'newmiestro-essential-plan-yearly':
               setSelectedPlan({ ...selectedPlan, id: 'newmiestro-surge-plan-yearly' });
               break;
            case 'newmiestro-surge-plan-monthly':
               setSelectedPlan({ ...selectedPlan, id: 'newmiestro-infinite-plan-monthly' });
               break;
            case 'newmiestro-surge-plan-yearly':
               setSelectedPlan({ ...selectedPlan, id: 'newmiestro-infinite-plan-yearly' });
               break;
            default:
               type = 'Essential';
         }
      } else {
         switch (selectedPlan.id) {
            case 'newmiestro-surge-plan-monthly':
               setSelectedPlan({ ...selectedPlan, id: 'newmiestro-essential-plan-monthly' });
               break;
            case 'newmiestro-surge-plan-yearly':
               setSelectedPlan({ ...selectedPlan, id: 'newmiestro-essential-plan-yearly' });
               break;
            case 'newmiestro-infinite-plan-monthly':
               setSelectedPlan({ ...selectedPlan, id: 'newmiestro-surge-plan-monthly' });
               break;
            case 'newmiestro-infinite-plan-yearly':
               setSelectedPlan({ ...selectedPlan, id: 'newmiestro-surge-plan-yearly' });
               break;
            default:
               type = 'Essential';
         }
      }
   };


   return (
      <ModalNew onCloseModal={ onClose } className='account__plan update_plan_wrapper'>
         <div className='account__plan__modal'>
            {!isUdpateCard && (
               <div className='account__plan__modal__content_img'>
                  <div className='account__plan__modal__monthly__yearly'>
                     <div className='account__plan__modal__monthly__yearly__switcher'>
                        <div>
                           <Text
                              inner='Monthly'
                              type={ txtTypes.regular }
                              size={ txtSize.medium }
                              style={ { color: selectedPlan.id.includes('monthly') ? '#fff' : 'rgba(255, 255, 255, 0.20)' } }
                           />
                        </div>
                        <Switch
                           value={ selectedPlan.id.includes('yearly') }
                           onChange={ () => setSelectedPlan({
                              ...selectedPlan,
                              id:
                        selectedPlan.id.includes('monthly') ? selectedPlan.id.replace('monthly', 'yearly') : selectedPlan.id.replace('yearly', 'monthly'),
                           }) }
                           label=''
                           size='big'
                        />
                        <div>
                           <Text
                              inner='Annual'
                              type={ txtTypes.regular }
                              size={ txtSize.medium }
                              style={ { color: selectedPlan.id.includes('yearly') ? '#fff' : 'rgba(255, 255, 255, 0.20)' } }
                           />
                        </div>
                     </div>
                     <div>
                        <Text
                           inner='Save 20% With Annual'
                           type={ txtTypes.regular }
                           size={ txtSize.small14 }
                           style={ { color: '#fff' } }
                        />
                     </div>
                  </div>
                  <div className={ `account__plan__modal__content_card card_${ type }` }>
                     <div className='account__plan__modal__content_card_title'>
                        <Text
                           inner={ `${ type } Plan` }
                           type={ txtTypes.medium150 }
                           size={ txtSize.size_32 }
                        />
                     </div>
                     <div className='plan__template__top__price_content'>
                        <div className='plan__template__top__price'>
                           <Text
                              inner={ `$${ price }` }
                              type={ txtTypes.medium }
                              size={ txtSize.size_28 }
                           />
                           <Text
                              inner='/mo'
                              size={ txtSize.large }
                              type={ txtTypes.regular160 }
                           />
                        </div>
                        <div className='plan__template__top__price_yearly'>
                           <Text
                              inner={ `$${ price * 12 }` }
                              type={ txtTypes.bold }
                              size={ txtSize.small }
                           />
                           <Text
                              inner='PER YEAR'
                              size={ txtSize.xx_small }
                              type={ txtTypes.bold }
                           />
                        </div>
                     </div>
                  </div>
                  <div className='account__plan__modal_change'>
                     <div>
                        {buttonDescLeft && (
                           <TextWithIcon
                              inner={ buttonDescLeft }
                              type={ txtTypes.regular }
                              size={ txtSize.small14 }
                              isIconRight={ false }
                              iconColor='#fff'
                              iconName='LeftArrowM'
                              onClick={ () => handlSelectPlan('-') }
                              style={ { cursor: 'pointer' } }
                           />
                        )}
                     </div>
                     <div>
                        {buttonDesc && (
                           <TextWithIcon
                              inner={ buttonDesc }
                              type={ txtTypes.regular }
                              size={ txtSize.small14 }
                              isIconRight={ true }
                              iconColor='#fff'
                              iconName='RightArrowM'
                              onClick={ () => handlSelectPlan('+') }
                              style={ { cursor: 'pointer' } }
                           />
                        )}
                     </div>
                  </div>
               </div>
            )}
            <div className='account__plan__modal__content'>
               {!isUdpateCard && (
                  <>
                     <div className='account__plan__modal__content__subtitle'>
                        <div>
                           <Text
                              inner={ `${ type } Plan` }
                              type={ txtTypes.mediumSmall }
                              size={ txtSize.xxlarge }
                           />
                        </div>
                        <div>
                           <Text
                              inner={ description }
                              type={ txtTypes.regular }
                              size={ txtSize.medium }
                           />
                        </div>
                     </div>
                     <div className='plan__template__middle__functions'>
                        {type !== 'Essential' && (
                           <Text
                              inner={ `Includes Everything In ${ type === 'Surge' ? 'Essential Plan' : 'Surge Plan' } Plus:` }
                              type={ txtTypes.regular148 }
                              size={ txtSize.medium }
                              style={ { marginBottom: '4px' } }
                           />
                        )}
                        {functions.map((item) => {
                           return (
                              <div
                                 key={ uniqueId() }
                                 className={ `plan__template__middle__functions__item plan__template__middle__functions__item__${ type }` }
                              >
                                 <div className='circle' />
                                 <Text
                                    inner={ item }
                                    type={ txtTypes.regularDefaultSmall }
                                    size={ txtSize.medium }
                                 />
                              </div>
                           );
                        })}

                     </div>
                  </>
               )}
               <Text
                  inner={ isUdpateCard ? 'Update Card' : (isConnect ? 'Change Plan' : 'Connect to plan') }
                  type={ txtTypes.medium }
                  size={ txtSize.xxlarge }
               />
               {!isConnect && (
                  <StripeProvider apiKey={ process.env.REACT_APP_STRIPE_API_KEY }>
                     <Checkout
                        ref={ confirmStripeRef }
                        getToken={ token => onSumbit(token) }
                        setUpdateCardInProgress={ (value) => setCardProgress(value) }
                     />
                  </StripeProvider>
               )}
               <div className='card__buttons'>
                  <BaseButton
                     text='Close'
                     theme={ btnThemes.secondary }
                     onClick={ () => onClose() }
                  />
                  <BaseButton
                     text={ isUdpateCard ? 'Update' : (isConnect ? 'Change' : 'Connect') }
                     theme={ btnThemes.primary }
                     disabled={ isConnect ? false : (cardProgress || progressPlanConnect) }
                     onClick={ isConnect ? () => changePlan() : () => confirmStripeRef.current.handleConfirm() }
                  />
               </div>
            </div>
         </div>

         {(cardProgress || progressPlanConnect) && (
            <LoaderSpinner />
         )}
      </ModalNew>
   );
};

UpdatePlanModal.propTypes = {
   onClose: PropTypes.func,
   handleConnectToPlan: PropTypes.func,
   isConnect: PropTypes.bool,
   selectedPlan: PropTypes.object,
   setSelectedPlan: PropTypes.func,
   isUdpateCard: PropTypes.bool,
   changePlan: PropTypes.func,
   progressPlanConnect: PropTypes.bool,
};

export default UpdatePlanModal;
