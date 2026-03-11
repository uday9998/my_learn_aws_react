import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const CheckboxCircle = ({
   isChecked, onCheck, label, description, inputOptions,
   isSmall,
}) => {
   const handleCheck = () => {
      const value = isChecked ? 0 : 1;
      onCheck(value);
   };
   return (
      <div className='checkbox__circle' role='presentation' onClick={ () => handleCheck() }>
         {isChecked ? (
            <div className='checkbox__circle__check__active'>
               <span />
            </div>
         ) : (
            <div className='checkbox__circle__check' />
         )}
         <div className='checkbox__circle__right'>
            <Text
               style={ { whiteSpace: 'nowrap' } }
               inner={ label }
               type={ types.regular148 }
               size={ isSmall ? sizes.small_new : sizes.medium }
            />
            {description && (
               <Text
                  style={ { color: '#727978' } }
                  inner={ description }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            )}
            {inputOptions && (
               <Input
                  { ...inputOptions }
               />
            )}
         </div>
      </div>
   );
};

CheckboxCircle.propTypes = {
   isChecked: PropTypes.bool,
   onCheck: PropTypes.func,
   description: PropTypes.string,
   label: PropTypes.string,
   inputOptions: PropTypes.object,
   isSmall: PropTypes.bool,
};

export default CheckboxCircle;
