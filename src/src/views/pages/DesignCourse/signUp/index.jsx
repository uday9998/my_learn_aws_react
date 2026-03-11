import React from 'react';
import PropTypes from 'prop-types';
import TabSwitch from 'components/elements/TabSwitch';
import OrderCard from 'components/modules/designCourse/signUp/signUpCards/OrderCard';
import TestimonialCard from 'components/modules/designCourse/signUp/signUpCards/TestimonialCard';
import BulletCard from 'components/modules/designCourse/signUp/signUpCards/BulletCard';
import BuyCard from 'components/modules/designCourse/signUp/signUpCards/BuyCard';
import Advanced from 'components/modules/designCourse/signUp/signUpCards/Advanced';
import SignUpItems from 'components/modules/designCourse/signUp//SignUpItems';
import './index.scss';


const SignUp = ({
   signUp, handleSignUpSave, handleInputSignUpChange, deleteSignUp, isMobile, activeTabIsMobile, onSwitchTab,
   autoResponders, autoresponderOptions, autoResponderListsOptions, goTo, plan, chooseTestimonial, currentTestimonial,
   updateSignUpInProgress, currentBullet, chooseBullet, previewCheckout, handleAddTestimonial, handleAddBullet,
   detachTag, attachTag, addTag, settings,
}) => {
   const hideTabs = (plan && plan.pricings.length === 1
      && plan.pricings.filter(freeplan => freeplan.pricing_type === 0)
  && (plan.pricings.filter(freeplan => freeplan.pricing_type === 0)).length === 1);

   return (
      <div className='d-settings h-full course-signUp w-full flex'>
         {hideTabs
            ? (
               <TabSwitch
                  initialTab='advanced'
                  hasParent={ !isMobile }
                  onSwitchTab={ onSwitchTab }
               >
                  {
                     (!isMobile || !activeTabIsMobile) && (
                        <div className='content_left course-signUp-tabs'>
                           <div className='m-r-exl course-signUp-tabs-content'>
                              <TabSwitch.Tab>
                                 <SignUpItems hideTabs={ hideTabs } />
                              </TabSwitch.Tab>
                           </div>
                        </div>
                     )
                  }
                  {
                     (!isMobile || !!activeTabIsMobile) && (
                        <div className='content_right course-signUp-right'>
                           <div className='m-l-exl settings__right'>
                              <TabSwitch.Content>
                                 <Advanced
                                    tabId='advanced'
                                    signUp={ signUp }
                                    onChange={ (key, value) => handleInputSignUpChange(key, value, 'advanced') }
                                    handleSignUpSave={ () => handleSignUpSave('advanced') }
                                    autoResponders={ autoResponders }
                                    addTag={ addTag }
                                    attachTag={ attachTag }
                                    detachTag={ detachTag }
                                    autoresponderOptions={ autoresponderOptions }
                                    autoResponderListsOptions={ autoResponderListsOptions }
                                    goTo={ goTo }
                                 />
                              </TabSwitch.Content>
                           </div>
                        </div>
                     )
                  }
               </TabSwitch>
            ) : (
               <TabSwitch
                  initialTab='order-summary'
                  hasParent={ !isMobile }
                  onSwitchTab={ onSwitchTab }
               >
                  {
                     (!isMobile || !activeTabIsMobile) && (
                        <div className='content_left course-signUp-tabs'>
                           <div className='m-r-exl course-signUp-tabs-content'>
                              <TabSwitch.Tab>
                                 <SignUpItems hideTabs={ hideTabs } />
                              </TabSwitch.Tab>
                           </div>
                        </div>
                     )
                  }
                  {
                     (!isMobile || !!activeTabIsMobile) && (
                        <div className='content_right course-signUp-right'>
                           <div className='m-l-exl settings__right'>
                              <TabSwitch.Content>
                                 <OrderCard
                                    tabId='order-summary'
                                    previewCheckout={ previewCheckout }
                                    settings={ settings }
                                    signUp={ signUp }
                                    handleInputSignUpChange={ (key, value) => handleInputSignUpChange(key, value, 'order-summary') }
                                    handleSignUpSave={ handleSignUpSave }
                                 />
                                 <TestimonialCard
                                    tabId='testimonials'
                                    signUp={ signUp }
                                    previewCheckout={ previewCheckout }
                                    settings={ settings }
                                    handleInputSignUpChange={ (key, value, id) => handleInputSignUpChange(key, value, 'testimonials', id) }
                                    handleSignUpSave={ handleSignUpSave }
                                    deleteSignUp={ (id) => deleteSignUp(id, 'testimonials') }
                                    chooseTestimonial={ chooseTestimonial }
                                    currentTestimonial={ currentTestimonial }
                                    updateSignUpInProgress={ updateSignUpInProgress }
                                    handleAddTestimonial={ handleAddTestimonial }

                                 />
                                 <BulletCard
                                    updateSignUpInProgress={ updateSignUpInProgress }
                                    tabId='bullet-points'
                                    signUp={ signUp }
                                    previewCheckout={ previewCheckout }
                                    settings={ settings }
                                    handleInputSignUpChange={ (key, value, id) => handleInputSignUpChange(key, value, 'bullet-points', id) }
                                    handleSignUpSave={ handleSignUpSave }
                                    deleteSignUp={ (id) => deleteSignUp(id, 'bullet-points') }
                                    chooseBullet={ chooseBullet }
                                    currentBullet={ currentBullet }
                                    handleAddBullet={ handleAddBullet }

                                 />
                                 <BuyCard
                                    tabId='buy-bottom'
                                    signUp={ signUp }
                                    previewCheckout={ previewCheckout }
                                    settings={ settings }
                                    handleInputSignUpChange={ (key, value) => handleInputSignUpChange(key, value, 'buy-bottom') }
                                    handleSignUpSave={ handleSignUpSave }
                                 />
                                 <Advanced
                                    tabId='advanced'
                                    signUp={ signUp }
                                    onChange={ (key, value) => handleInputSignUpChange(key, value, 'advanced') }
                                    handleSignUpSave={ () => handleSignUpSave('advanced') }
                                    autoResponders={ autoResponders }
                                    attachTag={ attachTag }
                                    addTag={ addTag }
                                    detachTag={ detachTag }
                                    autoresponderOptions={ autoresponderOptions }
                                    autoResponderListsOptions={ autoResponderListsOptions }
                                    goTo={ goTo }
                                 />
                              </TabSwitch.Content>
                           </div>
                        </div>
                     )
                  }
               </TabSwitch>
            ) }
      </div>
   );
};

SignUp.propTypes = {
   signUp: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   handleInputSignUpChange: PropTypes.func,
   deleteSignUp: PropTypes.func,
   goTo: PropTypes.func,
   plan: PropTypes.object,
   chooseTestimonial: PropTypes.func,
   currentTestimonial: PropTypes.object,
   updateSignUpInProgress: PropTypes.bool,
   chooseBullet: PropTypes.func,
   currentBullet: PropTypes.object,
   handleAddTestimonial: PropTypes.func,
   handleAddBullet: PropTypes.func,
   settings: PropTypes.object,
};

export default SignUp;
