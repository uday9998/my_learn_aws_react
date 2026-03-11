import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from '../iconsSize';
import './index.scss';

const Persents = ({ persent, type }) => {
   return (
      <div className={ `persents${ type === 'down' ? ' persents__down' : ' persents__up' }` }>
         <div className='persents__block'>
            <IconNew name={ type === 'up' ? 'AffiliatePricingArrowUpS' : 'AffiliatePricingArrowDownS' } />
         </div>
         <Text
            inner={ `${ persent }%` }
            type={ types.regular148 }
            size={ sizes.xsmall }
            style={ { color: type === 'down' ? '#D12D36' : '#379552' } }
         />
      </div>
   );
};

Persents.propTypes = {
   persent: PropTypes.any,
   type: PropTypes.string,
};

export default Persents;
