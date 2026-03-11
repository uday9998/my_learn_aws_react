import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { pauseSession } from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';

import { SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import LoaderSpinner from 'components/modules/designCourse/settings/LoaderSpiner';
import { getConstantData, getPlanType } from 'utils/pricing';
import { siteDetailsInitOperation } from 'state/modules/common/operations';
import { connect } from 'react-redux';
import PricingCard from './components/PricingCard';
import Summary from './components/Summary';
import Invoices from './components/Invoices';
import PricingList from './components/PricingList';
import PricingCardMobile from './components/PricingCardMobile';
import PauseSubscription from './components/PauseSubscription';
import MessageModal from './components/PauseSubscription/components/MessageModal';
import PauseSubscriptionPricing from './components/PauseSubscription/components/PauseSubscriptionPricing';

import './index.scss';


const Billing = ({
   plans,
   showPricings,
   handleShowPricingList,
   mainApp,
   authUser,
   getPlans,
   init,
}) => {
   const [sendSessionid] = useSubmitForm(pauseSession);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
   const [isOpenModal, setIsopenModal] = useState(false);
   const [loading, setIsLoading] = useState(false);
   const [isOpenSubscriptionModal, setIsOpenSubscriptionModal] = useState(false);
   const history = useHistory();
   const location = useLocation();
   const [type, setType] = useState('monthly');
   const [messageModalOptions, setMessageModalOptions] = useState({
      isShow: false,
      subtitleText: '',
   });
   const priceData = getPlanType(getConstantData(mainApp.plan_name, plans, authUser), mainApp);
   const [currency, setCurrency] = useState({
      currencyCode: 'USD',
      currencyAmount: 0,
   });

   useEffect(() => {
      fetch('https://ipapi.co/json/')
         .then(countryData => countryData.json())
         .then(resCountryData => {
            const currencyCode = resCountryData.currency;

            fetch(`https://exchange-rates.abstractapi.com/v1/live/?api_key=${ process.env.REACT_APP_ABSTRACT_API_KEY }&base=USD&target=${ currencyCode }`)
               .then(currencyData => currencyData.json())
               .then(response => {
                  if (!response?.error) {
                     setCurrency(() => {
                        return {
                           currencyCode,
                           currencyAmount: response.exchange_rates[currencyCode],
                        };
                     });
                  } 
               }).catch(() => {
                  return 'not found';
               });
         });
   }, []);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      // Refresh plan data when user returns from Stripe checkout
      const handleWindowFocus = () => {
         if (getPlans && typeof getPlans === 'function') {
            getPlans();
         }
      };

      const handleVisibilityChange = () => {
         if (!document.hidden) {
            if (getPlans && typeof getPlans === 'function') {
               getPlans();
            }
         }
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('focus', handleWindowFocus);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
         window.removeEventListener('resize', handleResize);
         window.removeEventListener('focus', handleWindowFocus);
         document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
   }, [getPlans]);

   const handleChangeModal = () => {
      setIsopenModal(prevState => !prevState);
   };
   
   const handleToggleLoading = () => {
      setIsLoading(prevState => !prevState);
   };

   const removeSessionId = () => {
      const currentHash = location.hash;
      const [hashPath, hashQuery] = currentHash.split('?');
      if (hashQuery) {
         const searchParams = new URLSearchParams(hashQuery);
         searchParams.delete('type'); 
         const newHash = searchParams.toString()
            ? `${ hashPath }?${ searchParams.toString() }` 
            : `${ hashPath }`;

         history.push(`${ location.pathname }${ newHash }`);
         localStorage.setItem('isNavigated', 'yes');
      }
   };

   const handleOkay = () => {
      setMessageModalOptions(prevState => {
         return {
            ...prevState,
            isShow: false,
         };
      });
   };

   useEffect(() => {
      if (history.location?.hash && history.location?.hash.includes('type=cancel')) {
         setMessageModalOptions(prevState => {
            return {
               ...prevState,
               isShow: true,
               subtitleText: `${ priceData.title } Plan subscription canceled`,
            };
         });
      } else if (history.location?.hash && history.location?.hash.includes('pause_plan_checkout_success=true&?session_id')) {
         const splitedSessionId = history.location?.hash.split('=')[2];
         sendSessionid(splitedSessionId, res => {
            if (res.url) {
               init();
               removeSessionId();
            }
         });
      } else if (localStorage.getItem('isNavigated') === 'yes') {
         setMessageModalOptions(prevState => {
            return {
               ...prevState,
               isShow: true,
               subtitleText: `${ priceData.title } Plan subscription Paused & Preserve Plan`,
            };
         });

         localStorage.removeItem('isNavigated');
      }
   }, []);
   
   const handleChangePlanType = (type) => {
      setType(type);
   };

   const handleKeepSubscription = () => {
      setIsopenModal(false);
   };

   const handleTogglePauseModal = () => {
      setIsOpenSubscriptionModal(prevState => !prevState);
      setIsopenModal(false);
   };

   return (
      <>
         {
            !showPricings ? (
               <div className='parent__billing__wrapper'>
                  {
                     isOpenSubscriptionModal && (
                        <PauseSubscriptionPricing 
                           handleTogglePauseModal={ handleTogglePauseModal }
                        />
                     )
                  }
                  {
                     isOpenModal && (
                        <PauseSubscription
                           planName={ priceData.title }
                           type={ type }
                           handleChangeModal={ handleChangeModal }
                           plans={ plans }
                           handleKeepSubscription={ handleKeepSubscription }
                           handleTogglePauseModal={ handleTogglePauseModal }
                           handleShowPricingList={ handleShowPricingList }
                        />
                     ) 
                  }
                  {
                     messageModalOptions.isShow && (
                        <MessageModal 
                           handleOkay={ handleOkay }
                           subtitleText={ messageModalOptions.subtitleText }
                        />
                     )
                  }
                  <div className='card__button__wrapper'>
                     {
                        isMobile ? (
                           <PricingCardMobile 
                              handleShowPricingList={ handleShowPricingList }
                              plans={ plans }
                              priceData={ priceData }
                              handleChangeModal={ handleChangeModal }
                           />
                        ) : (
                           <PricingCard 
                              plans={ plans }
                              mainApp={ mainApp }
                              authUser={ authUser }
                              handleShowPricingList={ handleShowPricingList }
                              getPlans={ getPlans }
                              handleChangeModal={ handleChangeModal }
                              handleToggleLoading={ handleToggleLoading }
                              priceData={ priceData }
                              init={ init }
                           />
                        )
                     }
                     
                     <div className='button__wrapper'>
                        <TextWithIcon 
                           inner='See All Plans'
                           iconName='ArrowRight'
                           size={ sizes.small14_500 }
                           style={ {
                              color: '#24554E',
                           } }
                           isIconRight={ true }
                           onClick={ handleShowPricingList }
                        />
                     </div>
                     {
                        loading ? <LoaderSpinner /> : !!plans.subscriptions?.length && (
                           <Invoices 
                              plans={ plans }
                              currency={ currency }
                           />
                        )
                     }
                  </div>
                  {
                     !isMobile && mainApp?.plan_name && !mainApp.plan_name.toLowerCase().includes('life') && (
                        <Summary 
                           plans={ plans }
                           priceData={ priceData }
                        />
                     )
                  }
               </div>
            ) : <PricingList handleChangePlanType={ handleChangePlanType } currency={ currency } plans={ plans } />
         }
      </>
      
   );
};

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: () => {
         dispatch(siteDetailsInitOperation());
      },
   };
};

Billing.propTypes = {
   plans: PropTypes.object,
   showPricings: PropTypes.bool,
   handleShowPricingList: PropTypes.func,
   getPlans: PropTypes.func,
   mainApp: PropTypes.object,
   authUser: PropTypes.object,
   init: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);