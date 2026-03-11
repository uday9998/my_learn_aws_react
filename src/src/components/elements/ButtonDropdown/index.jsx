import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import DropDownItem from './DropDownItem';
import './index.scss';

export const THEMES = {
   primary: 'primary',
   more: 'more',
   secondary: 'secondary',
   tertiary: 'tertiary',
   change: 'change',
};

export const SIZES = {
   small: 'small',
   medium: 'medium',
   large: 'large',
};
const ButtonDropdown = ({
   theme, size, inner, children,
}) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className='button__dropdown'>
         <BaseButton
            text={ inner }
            theme={ theme }
            iconName='DropdownNew'
            isOpen={ isOpen }
            size={ size }
            onClick={ () => setIsOpen(true) }
         />
         {isOpen && (
            <ClickOutside onClick={ () => setIsOpen(false) }>
               <div className='dropdown__content'>
                  {children}
               </div>
            </ClickOutside>
         )}
      </div>
   );
};

ButtonDropdown.propTypes = {
   theme: PropTypes.string,
   size: PropTypes.string,
   inner: PropTypes.string,
   children: PropTypes.any,
};

ButtonDropdown.Item = DropDownItem;

export default ButtonDropdown;
