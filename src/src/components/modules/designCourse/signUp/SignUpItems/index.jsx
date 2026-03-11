import React from 'react';
import SignUpItem from 'components/modules/designCourse/signUp/SignUpItem';
import PropTypes from 'prop-types';

const SignUpItems = ({ TabConsumer, hideTabs }) => {
   const { activeTab, switchTab } = TabConsumer;
   return (
      <div className='signUpItems w-full'>
         {!hideTabs && (
         <>
            <div className='m-b-exs'>
               <SignUpItem
                  text='Edit Order Summary'
                  icon='Order'
                  tabId='order-summary'
                  active={ activeTab === 'order-summary' }
                  switchTab={ switchTab }
               />
            </div>
            <div className='m-b-exs'>
               <SignUpItem
                  text='Edit Testimonials'
                  icon='Testimonial'
                  tabId='testimonials'
                  active={ activeTab === 'testimonials' }
                  switchTab={ switchTab }
               />
            </div>
            <div className='m-b-exs'>
               <SignUpItem
                  text='Edit Bullet Points'
                  icon='Bullet'
                  tabId='bullet-points'
                  active={ activeTab === 'bullet-points' }
                  switchTab={ switchTab }
               />
            </div>
            <div className='m-b-exs'>
               <SignUpItem
                  text='Edit Buy Button'
                  icon='BuyButton'
                  tabId='buy-bottom'
                  active={ activeTab === 'buy-bottom' }
                  switchTab={ switchTab }
               />
            </div>
         </>
         )}
         <div className='m-b-exs'>
            <SignUpItem
               text='Advanced'
               icon='Advanced'
               tabId='advanced'
               active={ activeTab === 'advanced' }
               switchTab={ switchTab }
            />
         </div>
      </div>
   );
};

SignUpItems.propTypes = {
   TabConsumer: PropTypes.any,
   hideTabs: PropTypes.bool,
};


export default SignUpItems;
