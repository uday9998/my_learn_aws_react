import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Button from 'components/elements/buttons/BaseButtonNew';
import Input from 'components/elements/inputNew';

import './index.scss';

const HeaderTypeSecond = ({
   title,
   searchValue,
   onChangeSearchValue,
   isHaveBaseButton,
   buttonProps,
   isHidenSearch,
   textSize,
   paddingTop,
}) => {
   return (
      <div
         style={ {
            paddingTop,
         } }
         className='header__type__second'>
         <div className='header__type__second__top'>
            <div className='header__type__second__top__left'>
               <Text
                  inner={ title }
                  type={ types.mediumTitle }
                  size={ textSize ? sizes[textSize] : sizes.size_28 }
               />
               {/* <IToolTip
                  tooltip={ tooltip }
                  iconName='TooltipQuestion'
               /> */}
            </div>
            {isHaveBaseButton && (
               <Button
                  isHidenDiv={ true }
                  { ...buttonProps }
               />
            )}
         </div>
         {!isHidenSearch && (
            <Input
               value={ searchValue }
               onChange={ (name, value) => onChangeSearchValue(value) }
               type='search'
               placeholder='Search'
            />
         )}
      </div>
   );
};

HeaderTypeSecond.propTypes = {
   title: PropTypes.string,
   tooltip: PropTypes.string,
   onChangeSearchValue: PropTypes.func,
   searchValue: PropTypes.string,
   isHaveBaseButton: PropTypes.bool,
   buttonProps: PropTypes.object,
   isHidenSearch: PropTypes.bool,
   textSize: PropTypes.bool,
   paddingTop: PropTypes.number,
};

export default HeaderTypeSecond;
