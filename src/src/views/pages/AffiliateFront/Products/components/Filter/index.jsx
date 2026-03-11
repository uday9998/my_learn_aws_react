import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SortButton from 'components/elements/buttons/SortButton';

const AffiliateProductsFilter = ({ sort, onChange, offersCount }) => {
   const sortOptions = {
      A_Z: 'Name A to Z',
      Z_A: 'Name Z to A',
   };
   return (
      <div className='affiliate__products__top'>
         <Text
            inner={ `${ offersCount } Offers` }
            type={ types.regularDefault }
            size={ sizes.small }
         />
         <SortButton
            type='first'
            options={ sortOptions }
            value={ sort }
            onFilter={ (val) => onChange(val) }
         />
      </div>
   );
};

AffiliateProductsFilter.propTypes = {
   sort: PropTypes.string,
   onChange: PropTypes.func,
   offersCount: PropTypes.number,
};

export default AffiliateProductsFilter;
