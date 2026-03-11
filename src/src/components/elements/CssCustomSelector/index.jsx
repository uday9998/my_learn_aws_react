import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';


const CssCustomSelector = ({
   name, label, value, onChange,
}) => {
   const [innerValue, setInnerValue] = useState(['0', '0', '0', '0']);
   useEffect(() => {
      if (value) {
         const data = value.split(' ');
         setInnerValue([...(data.map((e) => `${ Number.parseFloat(e) }`))]);
      }
   }, [value]);
   const getChangeContent = () => {
      return `${ innerValue[0] }px ${ innerValue[1] }px ${ innerValue[2] }px ${ innerValue[3] }px`;
   };

   const handleInnerInputChange = (index, posValue) => {
      const i = Number.parseFloat(posValue);
      if (i < 99) {
         const copy = innerValue;
         copy[index] = `${ i }`;
         setInnerValue(copy);
         onChange(name, getChangeContent());
      }
   };

   return (
      <div className='css__selector'>
         {label && (
            <Text
               inner={ label }
               type={ txtTypes.regularDefault }
               size={ txtSizes.small }
            />
         )}
         <div className='css__selector__rect'>
            <div className='rect__item rect__top'>
               <input type='text' value={ innerValue[0] } onChange={ (e) => handleInnerInputChange(0, e.target.value) } />
            </div>
            <div className='rect__item rect__right'>
               <input type='text' value={ innerValue[1] } onChange={ (e) => handleInnerInputChange(1, e.target.value) } />
            </div>
            <div className='rect__item rect__bottom'>
               <input type='text' value={ innerValue[2] } onChange={ (e) => handleInnerInputChange(2, e.target.value) } />
            </div>
            <div className='rect__item rect__left'>
               <input type='text' value={ innerValue[3] } onChange={ (e) => handleInnerInputChange(3, e.target.value) } />
            </div>
            <div className='rect' />
         </div>
      </div>
   );
};

CssCustomSelector.propTypes = {
   name: PropTypes.string,
   label: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func,
};

export default CssCustomSelector;
