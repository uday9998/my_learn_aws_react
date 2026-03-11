import React from 'react';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import CustomSwitch from 'components/elements/form/CustomSwitch';
import PropTypes from 'prop-types';
import LandingHeader from 'views/layout/landings/LandingHeader';

const PricingHeader = ({ switchLeftorRight, handleSwitchChange }) => {
   return (
      <div className='pricingHeader'>
         <div className='pricingHeader__top'>
            {/* <Icon name='Logo' color='#3f4f65' />
            <div className='pricingHeader__navbar'>
               <span>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner='Features'
                  />
               </span>
               <span className='nav__active'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner='Pricing'
                  />
               </span>
               <span>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner='Blog'
                  />
               </span>
            </div>
            <div className='pricingHeader__login'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner='Login'
               />
               <span className='m-r-m m-l-m' />
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner='Register'
               />
            </div> */}
            <LandingHeader />
         </div>
         <div className='pricingHeader__bottom'>
            <Text
               type={ TextType.bold }
               size={ TextSize.extraLarge }
               inner='Broadcast Your Online Program To The World'
               style={ { fontSize: '48px' } }
            />
            <div className='pricingHeader__bottom-text'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.medium }
                  inner='Paying high transaction and per-user fees will cost you in the long run. Use our platforms with no limitations.'
               />
            </div>
            <div className='p-t-s flex justify-center'>
               <CustomSwitch
                  firstOption={ { inner: 'Monthly', value: 1 } }
                  secondOption={ { inner: 'Annually', value: 2 } }
                  checked={ switchLeftorRight }
                  onClick={ (name, value) => handleSwitchChange(name, value) }
                  checkedBackground='#006dff'
                  textColor='#006dff'
                  checkedTextColor='#ffffff'
                  borderColor='#006dff'
                  style={ { border: 'none' } }
               />
            </div>
         </div>
      </div>
   );
};
PricingHeader.propTypes = {
   handleSwitchChange: PropTypes.func,
   switchLeftorRight: PropTypes.number,
};

export default PricingHeader;
