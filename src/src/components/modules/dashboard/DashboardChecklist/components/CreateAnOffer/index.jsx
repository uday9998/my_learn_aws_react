import React from 'react';
import { useHistory } from 'react-router';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Status from 'components/elements/statusNew';
import IconNew from 'components/elements/iconsSize';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

import offerCardImage from 'assets/images/dashboard/offer__card__image.png';

import './index.scss';

const CreateAnOffer = () => {
   const history = useHistory();

   const handleNavigateCreatePlan = () => {
      history.push('admin/programs/create');
   };

   return (
      <div className='create__offer__wrapper'>
         <div className='create__offer__inner__wrapper'>
            <div className='text__wrapper'>
               <Text 
                  inner='Almost there...'
                  size={ sizes.xlarge }
                  type={ types.regular148 }
                  style={ {
                     color: '#131F1E',
                  } }
               />
               <Text 
                  inner='Create an offer to start selling your product.'
                  size={ sizes.small14 }
                  style={ {
                     color: '#727978',
                     marginTop: '15px',
                  } }
               />
            </div>
            <div className='offer_card__wrapper'>
               <img src={ offerCardImage } alt='offer' />
               <div className='info__wrapper'>
                  <Text 
                     inner='Create a Product'
                  />

                  <div className='offer__icons__wrapper'>
                     <div>
                        <div>
                           <Status text='Online Course' type='publish' />
                        </div>
                     </div>
                     <IconNew name='UserS' />
                     <div>
                        <Text
                           size={ sizes.small }
                           type={ types.regularDefault }
                           inner='0'
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <BaseButton 
                  text='Create An Offer'
                  theme={ themes.primary }
                  iconName='CreateAnOfferButton'
                  onClick={ handleNavigateCreatePlan }
               />
            </div>
         </div>
      </div>
   );
};

export default CreateAnOffer;