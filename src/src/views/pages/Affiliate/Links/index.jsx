import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';

const AffiliateLinks = ({ onPrevPage, onNextPage }) => {
   return (
      <div className='affiliate__links'>
         <div className='affiliate__links__top'>
            <Text
               inner='3. Affiliate Links'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Text
               inner='Set up all the links that users will see in their affiliate accounts'
               type={ types.regular148 }
               size={ sizes.medium }
               style={ { color: '#444C4B' } }
            />
         </div>
         <div className='affiliate__links__content'>
         asd
         </div>
         <div className='affiliate__links__buttons'>
            <Button
               text='Previous'
               theme={ themes.secondary }
               onClick={ () => onPrevPage() }
            />
            <Button
               text='Next Step'
               onClick={ () => onNextPage() }
            />
         </div>
      </div>
   );
};

AffiliateLinks.propTypes = {
   onPrevPage: PropTypes.func,
   onNextPage: PropTypes.func,
};

export default AffiliateLinks;
