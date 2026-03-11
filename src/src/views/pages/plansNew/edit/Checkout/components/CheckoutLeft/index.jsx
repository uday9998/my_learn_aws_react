import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckoutImage1 from 'assets/images/checkout/template7.png';
import IconButton from 'components/elements/buttons/IconButton';
import Button from 'components/elements/buttons/BaseButtonNew';

const CheckoutLeftTemplates = ({
   onPreview,
   isActive,
   makeActiveLanding,
   isMobile,
}) => {
   const checkoutTemplateNames = (name) => {
      let newName = '';
      switch (name) {
         case 'template1': newName = 'Serenity';
            break;
         default:
            newName = name;
      }
      return newName;
   };

   return (
      <div className='plan__edit__checkout__left'>
         <div className='plan__edit__checkout__left__top'>
            <Text
               inner='Template'
               type={ types.regularDefault }
               size={ sizes.xlarge }
               miniText={ 1 }
            />
            {
               isMobile && (
                  <div className='plan__edit__checkout__right__top__right'>
                     <IconButton
                        name='CheckoutPreviewM'
                        onClick={ () => onPreview() }
                     />
                     <Button
                        text={ isActive ? 'Applied' : 'Apply' }
                        onClick={ makeActiveLanding }
                        disabled={ isActive }
                     />
                  </div>
               )
            }
         </div>
         <div className='plan__edit__checkout__left__data'>
            <div className='plan__edit__checkout__left__data__item__active'>
               <img src={ CheckoutImage1 } alt='checkout template' />
               <div className='plan__edit__checkout__left__data__item__active__checkbox'>
                  <div className='circle' />
                  <Text
                     inner={ checkoutTemplateNames('template1') }
                     type={ types.regularDefault }
                     size={ sizes.medium }
                     style={ { color: '#FFF' } }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

CheckoutLeftTemplates.propTypes = {
   onPreview: PropTypes.func,
   isActive: PropTypes.bool,
   makeActiveLanding: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default CheckoutLeftTemplates;