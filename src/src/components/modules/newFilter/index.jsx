import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/switchNew';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';

const FilterWrapper = ({
   isHaveSearch, isMulti, leftText, leftTextAcitve, onRemove, searchValue, onChangeSearch, onFilter,
   isCheckedMain, onCheckMain, setIsMulti, right,
}) => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <div className='new__filter__wrapper'>
         {isHaveSearch && (
            <Input
               value={ searchValue }
               onKeyPress={ (e) => (e.key === 'Enter' ? onFilter() : null) }
               placeholder='What are you looking for?'
               onClearSearchValue={ () => onChangeSearch('') }
               type='search'
               name='searchValue'
               onChange={ (name, value) => onChangeSearch(value) }
            />
         )}
         {
            isMobile && (
               <Switch
                  value={ isMulti }
                  onChange={ setIsMulti }
                  label='Multiselect'
                  size='medium'
                  positionText='right'
               />
            )
         }
         <div className='new__filter__wrapper__bottom'>
            <div className='new__filter__wrapper__left'>
               {isMulti ? (
                  <div className='left__active'>
                     <CheckBox
                        iconType='-'
                        checked={ isCheckedMain }
                        onChange={ onCheckMain }
                     />
                     <Text
                        inner={ leftTextAcitve }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  </div>
               ) : (
                  <Text
                     inner={ leftText }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               )}
               <div className='new__filter__divider' />
               {
                  !isMobile && (
                     <Switch
                        value={ isMulti }
                        onChange={ setIsMulti }
                        label='Multiselect'
                        size='medium'
                        positionText='right'
                     />
                  )
               }
               {isMulti && (
                  <div className='new__filter__wrapper__actions'>
                     <Text
                        inner='Actions: '
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                     <div className='new__filter__wrapper__actions__delete' role='presentation' onClick={ () => onRemove() }>
                        <IconNew name='CertificatesDeleteS' />
                     </div>
                  </div>
               )}
            </div>
            {!isMulti && (
               right
            )}
         </div>
      </div>
   );
};

FilterWrapper.propTypes = {
   isHaveSearch: PropTypes.bool,
   isMulti: PropTypes.bool,
   leftText: PropTypes.string,
   onRemove: PropTypes.func,
   searchValue: PropTypes.string,
   onChangeSearch: PropTypes.func,
   leftTextAcitve: PropTypes.string,
   onFilter: PropTypes.func,
   isCheckedMain: PropTypes.bool,
   onCheckMain: PropTypes.func,
   setIsMulti: PropTypes.func,
   right: PropTypes.any,
};

export default FilterWrapper;
