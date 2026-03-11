import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import completions from 'assets/images/promotions/completions.png';
import PropTypes from 'prop-types';

const AffiliateCommission = ({ title, name }) => {
   return (
      <ItemWrapper style={ { borderColor: '#dfe5eb', boxShadow: 'none' } }>
         <div className='affiliateCommission'>
            <img src={ completions } alt='' />
            <div className='affiliateCommission__text'>
               <Text
                  type={ TextType.normaL }
                  size={ TextSize.large }
                  inner={ `${ title }` }
               />
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ `${ name }` }
                  color='#3f4f6552'
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

AffiliateCommission.propTypes = {
   title: PropTypes.string,
   name: PropTypes.string,
};

AffiliateCommission.defaultProps = {
   title: '$0.00',
   name: '',
};

export default AffiliateCommission;
