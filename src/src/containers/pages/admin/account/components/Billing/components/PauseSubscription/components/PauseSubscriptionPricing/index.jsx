import { useRef, useState } from 'react';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { pausePlan } from 'api';
import PropTypes from 'prop-types';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';

import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import PauseCards from './components/PauseCards';
import MessageModal from '../MessageModal';

import './index.scss';

const PauseSubscriptionPricing = ({
   handleTogglePauseModal,
}) => {
   const [pauseMyPlan] = useSubmitForm(pausePlan);
   const [isLoading, setIsLoading] = useState(false);

   const modalRef = useRef(null);
   useOutsideClickDetector(modalRef, () => handleTogglePauseModal());

   const handlePausePreservePlan = () => {
      setIsLoading(true);
      pauseMyPlan('pause-plan-10-monthly', res => {
         setIsLoading(false);
         window.open(res.url, '_blank');
      });
   };

   const handlePauseProgram = () => {
      setIsLoading(true);
      pauseMyPlan('pause-plan-49-monthly', res => {
         setIsLoading(false);
         window.open(res.url, '_blank');
      });
   };

   return (
      <div className='pause__modal__wrapper'>
         {
            isLoading && <MessageModal isLoading={ true } />
         }
         
         <div ref={ modalRef } className='modal__inner__wrapper'>
            <div className='top__section__wrapper'>
               <div className='texts__wrapper'>
                  <Text 
                     inner='Pause Subscription'
                     size={ sizes.new_size_28 }
                     type={ types.new__weight }
                     style={ {
                        color: '#131F1E',
                     } }
                  />
                  <Text 
                     inner="By pausing your marketplace and subscribing to GOAT university, you'll keep all of your settings and records safe while enjoying unlimited access to this exclusive resource."
                     size={ sizes.small_new }
                     style={ {
                        color: '#727978',
                        lineHeight: 1.6,
                     } }
                  />
               </div>
               <div role='presentation' onClick={ handleTogglePauseModal } className='icon__wrapper'>
                  <IconNew name='Cancel' />
               </div>
            </div>
            <div className='cards__wrapper'> 
               <PauseCards
                  subtitleText='For just $10.00 per month, you can pause your account while keeping all your settings and records safe. Enjoy peace of mind knowing your data and preferences remain intact during your subscription.'
                  iconName='Bag'
                  priceText='10'
                  titleText='Pause & Preserve Plan'
                  handlePausePreservePlan={ handlePausePreservePlan }
               />
               <PauseCards
                  subtitleText="Elevate your journey with our GOAT Program. This premium plan offers monthly live calls where you can learn directly from our co-founders and top sellers. Additionally, you'll get unlimited access to all of our exclusive training materials and resources."
                  iconName='Like' 
                  priceText='49'
                  titleText='GOAT Program + Pause & Preserve Your Plan'
                  handlePausePreservePlan={ handlePauseProgram }
               />
            </div>
            <div className='footer__wrapper'>
               <div>
                  <IconNew name='infoM' />
               </div>
               <Text 
                  inner="By pausing your account and subscribing to Miestro, you'll keep all of your settings and records safe while enjoying unlimited access to this exclusive resource. Choose the plan that fits your needs and continue to grow with confidence."
                  size={ sizes.size_14 }
                  type={ types.new__weight__second }
                  style={ {
                     color: '#131F1E',
                     lineHeight: 1.7,
                  } }
               />
            </div>
         </div>
      </div>
   );
};

PauseSubscriptionPricing.propTypes = {
   handleTogglePauseModal: PropTypes.func,
};

export default PauseSubscriptionPricing;