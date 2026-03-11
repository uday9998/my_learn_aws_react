import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { connectToPlan, updatePricingPlan } from 'api';
import { getConnectPlanType, getPriceData } from 'utils/pricing';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Switch from 'components/elements/switchNew';

import './index.scss';

const FeaturesTop = ({
   type,
   handleChangeType,
   plans,
   currency,
}) => {  
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
   const [updatePlan] = useSubmitForm(updatePricingPlan);
   const [connectPlan] = useSubmitForm(connectToPlan);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const changeType = () => {
      if (type === 'monthly') {
         handleChangeType('annual');
      } else {
         handleChangeType('monthly');
      }
   };

   const handleUpdatePlan = (planName) => {
      if (!plans.currentSubscription?.plan_name || plans.currentSubscription.plan_name?.includes('starter')) {
         connectPlan(getConnectPlanType(type, planName), res => {
            window.open(res.url);
         });
      } else {
         updatePlan({}, res => {
            window.open(res.url);
         });
      }
   };

   return (
      <div className='info__wrapper'>
         <div className='switch__wrapper'>
            <div className='inner__wrapper'>
               <Text 
                  inner='Monthly'
                  style={ {
                     color: type === 'monthly' ? '#fff' : 'rgb(67, 70, 76)',
                  } }
                  size={ sizes.small14 }
               />
               <Switch 
                  value={ type === 'annual' }
                  onChange={ changeType }
               />
               <Text
                  inner='Annual'
                  style={ {
                     color: type === 'annual' ? '#fff' : 'rgb(67, 70, 76)',
                  } }
                  size={ sizes.small14 }
               />
            </div>
            <Text
               inner='Save 20% With Annual'
               style={ {
                  color: '#fff',
               } } 
               size={ sizes.small14 }
            />
         </div>
         <div className='price__info__wrapper'>
            {/* <div className='price__wrapper'>
               <Text 
                  inner={ isMobile ? 'Starter' : 'Starter Plan' }
                  size={ sizes.new_size_28 }
               />
               <Text
                  inner='Free'
                  size={ sizes.xlarge }
                  style={ {
                     color: '#2585EB',
                  } }
               />
               {
                  !isMobile && (
                     <BaseButton
                        text={ plans.currentSubscription?.plan_name?.includes('starter') ? 'Current Plan' : 'Get Started Now' }
                        theme={ themes.new_privacy }
                        disabled={ plans.currentSubscription?.plan_name?.includes('starter') }
                        onClick={ () => handleUpdatePlan('Starter') }
                     />
                  )
               }
               {
                  !isMobile && (
                     <div
                        style={ {
                           background: '#F1F6FF',
                        } }
                        className='widget__wrapper'>
                        <Text 
                           inner='Great For Beginners'
                           size={ sizes.size_14 }
                           style={ {
                              color: '#3060BD',
                           } }
                        />
                     </div>
                  )
               }
            </div> */}
            <div className='price__wrapper'>
               <Text 
                  inner={ isMobile ? 'Essential' : 'Essential Plan' }
                  size={ sizes.new_size_28 }
               />
               <div className='price'>
                  <Text
                     inner={ getPriceData('essential', currency, type) }
                     size={ sizes.xlarge }
                     style={ {
                        color: '#AC890A',
                     } }
                  />
                  <Text 
                     inner='/mo'
                     size={ sizes.size_14 }
                     style={ {
                        color: '#727978',
                     } }
                  />
               </div>
               {
                  !isMobile && (
                     <BaseButton
                        text={ plans.currentSubscription?.plan_name?.includes('essential') ? 'Current Plan' : 'Get Started Now' }
                        theme={ themes.new_privacy }
                        disabled={ plans.currentSubscription?.plan_name?.includes('essential') }
                        onClick={ () => handleUpdatePlan('Essential') }
                     />
                  )
               }
               {
                  !isMobile && (
                     <div
                        style={ {
                           background: '#FFF6D7',
                        } }
                        className='widget__wrapper'>
                        <Text 
                           inner='Great For Intermediate'
                           size={ sizes.size_14 }
                           style={ {
                              color: '#AC890A',
                           } }
                        />
                     </div>
                  )
               }
            </div>
            <div className='price__wrapper'>
               <Text 
                  inner={ isMobile ? 'Surge' : 'Surge Plan' }
                  size={ sizes.new_size_28 }
               />
               <div className='price'>
                  <Text
                     inner={ getPriceData('surge', currency, type) }
                     size={ sizes.xlarge }
                     style={ {
                        color: '#379552',
                     } }
                  />
                  <Text
                     inner='/mo'
                     size={ sizes.size_14 }
                     style={ {
                        color: '#727978',
                     } } />
               </div>
               {
                  !isMobile && (
                     <BaseButton
                        text={ plans.currentSubscription?.plan_name?.includes('essential') ? 'Current Plan' : 'Get Started Now' }
                        theme={ themes.new_privacy }
                        disabled={ plans.currentSubscription?.plan_name?.includes('essential') }
                        onClick={ () => handleUpdatePlan('Surge') }
                     />
                  )
               }
               {
                  !isMobile && (
                     <div
                        style={ {
                           background: '#DEFBE6',
                        } }
                        className='widget__wrapper'>
                        <Text 
                           inner='For The More Advanced'
                           size={ sizes.size_14 }
                           style={ {
                              color: '#379552',
                    
                           } }
                        />
                     </div>
                  )
               }
            </div>
            <div className='price__wrapper'>
               <Text 
                  inner={ isMobile ? 'Infinite' : 'Infinite Plan' }
                  size={ sizes.new_size_28 }
               />
               <div className='price'>
                  <Text
                     inner={ getPriceData('infinite', currency, type) }
                     size={ sizes.xlarge }
                     style={ {
                        color: '#DA47FF',
                     } }
                  />
                  <Text
                     inner='/mo'
                     size={ sizes.size_14 }
                     style={ {
                        color: '#727978',
                     } } />
               </div>
               {
                  !isMobile && (
                     <BaseButton
                        text={ plans.currentSubscription?.plan_name?.includes('essential') ? 'CurrentPlan' : 'Get Started Now' }
                        theme={ themes.new_privacy }
                        disabled={ plans.currentSubscription?.plan_name?.includes('essential') }
                        onClick={ () => handleUpdatePlan('Infinite') }
                     />
                  )
               }
               {
                  !isMobile && (
                     <div
                        style={ {
                           background: '#F9E1FF',
                        } }
                        className='widget__wrapper'>
                        {/* <Text 
                           inner='Recommended For Pro'
                           size={ sizes.size_14 }
                           style={ {
                              color: '#D220FF',
                     
                           } }
                        /> */}
                     </div>
                  )
               }
            </div>
            <div className='price__wrapper'>
               <Text 
                  inner={ isMobile ? 'Custom' : 'Custom Plan' }
                  size={ sizes.new_size_28 }
               />
               <div className='price'>
                  <Text
                     inner= "Contact Us"
                     size={ sizes.xlarge }
                     style={ {
                        color: '#DA47FF',
                     } }
                  />
                  
               </div>
               {
                  !isMobile && (
                     <BaseButton
                     text={plans.currentSubscription?.plan_name?.includes('essential') ? 'Current Plan' : 'Talk to a Real Human'}
                     theme={themes.new_privacy}
                     disabled={plans.currentSubscription?.plan_name?.includes('essential')}
                     onClick={() => {
                      
                         window.open("https://training.miestro.com/demo", "_blank");
                       
                     }}
                   />
                  )
               }
               {
                  !isMobile && (
                     <div
                        style={ {
                           background: '#F9E1FF',
                        } }
                        className='widget__wrapper'>
                        {/* <Text 
                           inner='Recommended For Pro'
                           size={ sizes.size_14 }
                           style={ {
                              color: '#D220FF',
                     
                           } }
                        /> */}
                     </div>
                  )
               }
            </div>
         </div>
      </div>
   );
};

FeaturesTop.propTypes = {
   type: PropTypes.string,
   handleChangeType: PropTypes.func,
   plans: PropTypes.object,
   currency: PropTypes.object,
};

export default FeaturesTop;