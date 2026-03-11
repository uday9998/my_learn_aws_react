import React, { useState } from 'react';
import './index.scss';
import PricingHeader from 'components/modules/pricing/PricingHeader';
import AllPlansCard from 'components/modules/pricing/AllPlansCard';
import CommonQuestions from 'components/modules/pricing/CommonQuestions';
import PlanCard from 'components/modules/plans/PlanCard';
import LandingFooter from 'views/layout/landings/LandingFooter';
import LandingGetStarted from 'views/layout/landings/LandingGetStarted';
import { questions, planCards } from './data';


const Pricing = () => {
   const [switchLeftorRight, setswitchLeftorRight] = useState(1);
   function handleSwitchChange(name, value) {
      setswitchLeftorRight(value);
   }
   return (
      <div className='landingPricing'>
         <PricingHeader switchLeftorRight={ switchLeftorRight } handleSwitchChange={ handleSwitchChange } />
         <div className='flex justify-center mob-cardContent' style={ { position: 'relative' } }>
            <div className='asd' />
            <div className='landingPricing__main'>
               <div className='landingPricing__plans'>
                  <div>
                     <PlanCard
                        popular
                        active
                        annually={ switchLeftorRight }
                        title={ planCards[0].title }
                        price={ planCards[0].price }
                        orders={ planCards[0].orders }
                        annuallyPrice={ planCards[0].annuallyPrice }
                        style={ { paddingBottom: '40px' } }
                        hasPriceGetStarted={ true }
                     />
                  </div>
                  <div className='m-l-exl m-r-exl mob-margin'>
                     <PlanCard
                        annually={ switchLeftorRight }
                        title={ planCards[1].title }
                        price={ planCards[1].price }
                        orders={ planCards[1].orders }
                        annuallyPrice={ planCards[1].annuallyPrice }
                        ordersTitle='Includes Everything In Pro Plus:'
                        style={ { paddingBottom: '48px' } }
                        hasPriceGetStarted={ true }
                     />
                  </div>
                  <div>
                     <PlanCard
                        title={ planCards[2].title }
                        price={ planCards[2].price }
                        orders={ planCards[2].orders }
                        annuallyPrice={ planCards[2].annuallyPrice }
                        ordersTitle='Includes Everything In Pro Plus:'
                        hasPrice={ false }
                        style={ { paddingBottom: '24px' } }

                     />
                  </div>
               </div>
               <AllPlansCard />
               <div className='m-t-exl' />
               <CommonQuestions questions={ questions } />
            </div>
         </div>
         <LandingGetStarted />
         <LandingFooter />
      </div>
   );
};


export default Pricing;
