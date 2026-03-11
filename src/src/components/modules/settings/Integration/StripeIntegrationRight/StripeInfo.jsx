import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import stripeinfoIMG from 'assets/images/stripeinfo.png';

const StripeInfo = ({ info }) => {
   return (
      <div className='stripe-info'>
         <div className='stripe-info-header'>
            <img src={ stripeinfoIMG } alt='' srcSet='' />
         </div>
         <div className='stripe-info-body'>
            <div>
               {info.email && (
                  <div>
                     <div>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           inner='Stripe Email'
                           color='#3f4f65'
                        />
                     </div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.small }
                        inner={ info.email }
                        color='#3f4f65'
                     />
                  </div>
               )}
               {info.accountId && (
                  <div>
                     <div>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           inner='Stripe Account Id'
                           color='#3f4f65'
                        />
                     </div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.small }
                        inner={ info.accountId }
                        color='#3f4f65'
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

StripeInfo.propTypes = {
   info: PropTypes.object,
};

export default StripeInfo;
