import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import './index.scss';

const UpsellSelect = ({
   isInitialOpen, label, children, clearIds,
}) => {
   const [isOpen, setIsOpen] = useState(isInitialOpen);
   useEffect(() => {
      setIsOpen(isInitialOpen);
   }, [isInitialOpen]);
   return (
      <div className='upsell__select'>
         <div
            className='upsell__select__item'
            role='presentation'
            style={ { background: isOpen ? '#E8F2F1' : 'inherit' } }
            onClick={ () => {
               if (isInitialOpen && isOpen) {
                  clearIds();
               }
               setIsOpen(!isOpen);
            } }
         >
            <Text
               inner={ label }
               type={ types.regular148 }
               size={ sizes.medium }
            />
            <div
               className='upsell__select__item__arrow'
               style={ { transform: `rotate(${ isOpen ? 180 : 0 }deg)` } }
            >
               <IconNew name='UpsellSelectArrowM' />
            </div>
         </div>
         {isOpen && (
            children
         )}
      </div>
   );
};

UpsellSelect.propTypes = {
   isInitialOpen: PropTypes.bool,
   label: PropTypes.string,
   children: PropTypes.any,
   clearIds: PropTypes.func,
};

export default UpsellSelect;
