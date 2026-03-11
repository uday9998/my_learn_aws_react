import React from 'react';
import Text, { SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import PropTypes from 'prop-types';
import './index.scss';

const Item = ({ title }) => {
   return (
      <div className='account__plans__features__item'>
         <IconNew
            name='AccountCheckX'
         />
         <Text
            inner={ title }
            type={ txtTypes.regularDefault }
            size={ txtSize.medium }
            style={ { color: '#3F4F65' } }
         />
      </div>
   );
};
Item.propTypes = {
   title: PropTypes.string,
};

const AccountPLanFeatures = () => {
   return (
      <div className='account__plans__features'>
         <Text
            inner='All plans include these core features:'
            type={ txtTypes.medium153 }
            size={ txtSize.large }
         />
         <div className='account__plans__features__flex'>
            <div className='line'>
               <Item title='Create Certificates' />
               <Item title='Unlimited Emails' />
               <Item title='Powerful Automations' />
            </div>
            <div className='line'>
               <Item title='Landing Page Builder' />
               <Item title='Create Certificates' />
               <Item title='Unlimited Video Hosting' />
            </div>
            <div className='line'>
               <Item title='99.9% uptime' />
               <Item title='Quiz Feature' />
               <Item title='Checkout Pages' />
            </div>
         </div>
      </div>
   );
};


AccountPLanFeatures.propTypes = {};


export default AccountPLanFeatures;
