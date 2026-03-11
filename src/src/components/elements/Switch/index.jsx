import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const Switch = ({ value, onChange }) => {
   return (
      <div className='switch__wrapper'>
         <div
            role='presentation'
            onClick={ () => onChange('monthly') }
            className={ classNames('right__wrapper', {
               active_monthly: value === 'monthly',
            }) }>
            <Text
               inner='Monthly'
               type={ types.regular148 }
               size={ sizes.medium }
            />
         </div>
         <div
            role='presentation'
            onClick={ () => onChange('annual') }
            className={ classNames('left__wrapper', {
               active_annual: value === 'annual',
            }) }>
            <Text
               inner='Annual (Save up to 20%)'
               type={ types.regular148 }
               size={ sizes.medium }
            />
         </div>
      </div>
   );
};

Switch.propTypes = {
   value: PropTypes.bool,
   onChange: PropTypes.func,
};

export default Switch;