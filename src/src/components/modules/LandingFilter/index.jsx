/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Switch from 'components/elements/switchNew';
import IconButton, { THEMES as iconThemes } from 'components/elements/buttons/IconButton';
import SortButton from 'components/elements/buttons/SortButton';
import './index.scss';

const LandingFilter = props => {
   const {
      count, isMultiSelect, setIsMultiSelect, title, actions,
      isHaveSorting, sortingOptions, isHaveMultiSelect, onSelectAll, selectedItems,
      onSort, selectedSortingVariant,
   } = props;
   return (
      <div className='landing__filter'>
         {count === 1 ? (
            <div className='landing__filter__start'>
               <Text
                  inner={ `1 ${ title } Page` }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
         ) : (
            <>
               <div className='landing__filter__left'>
                  <div className='landing__filter__left__title'>
                     {isMultiSelect ? (
                        <>
                           <CheckBox
                              checked={ selectedItems.length > 0 }
                              onChange={ () => onSelectAll() }
                           />
                           <Text
                              inner={ `${ selectedItems.length }/${ count } ${ title } Pages` }
                              type={ types.regularDefault }
                              size={ sizes.small }
                           />
                        </>
                     ) : (
                        <Text
                           inner={ `${ count } ${ title } Pages` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     )}
                  </div>
                  {isHaveMultiSelect && (
                     <>
                        <div className='landing__filter__left__line' />
                        <Switch
                           label='Multiselect'
                           value={ isMultiSelect }
                           positionText='right'
                           size='medium'
                           onChange={ () => {
                              setIsMultiSelect(!isMultiSelect);
                           } }
                        />
                        {isMultiSelect && selectedItems.length > 1 && (
                           <div className='landing__filter__left__actions'>
                              <Text
                                 inner='Actions: '
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                              />
                              <div className='landing__filter__left__actions__buttons'>
                                 {actions.map((e, index) => {
                                    return (
                                       <IconButton
                                          name={ e.iconName }
                                          key={ index }
                                          onClick={ () => e.onClick() }
                                          theme={ e.isDelete ? iconThemes.delete : iconThemes.light }
                                          wBorder={ true }
                                       />
                                    );
                                 })}
                              </div>
                           </div>
                        )}
                     </>
                  )}
               </div>
               {isHaveSorting && (
                  <div className='landing__filter__right'>
                     <SortButton
                        value={ selectedSortingVariant }
                        onFilter={ (value) => onSort(value) }
                        options={ sortingOptions }
                     />
                  </div>
               )}
            </>
         )}
      </div>
   );
};

LandingFilter.propTypes = {
   count: PropTypes.number,
   isMultiSelect: PropTypes.bool,
   actions: PropTypes.array,
   isHaveSorting: PropTypes.bool,
   setIsMultiSelect: PropTypes.func,
   selectedItems: PropTypes.array,
   title: PropTypes.string,
   sortingOptions: PropTypes.array,
   isHaveMultiSelect: PropTypes.bool,
   onSelectAll: PropTypes.func,
   selectedSortingVariant: PropTypes.any,
   onSort: PropTypes.func,
};


export default LandingFilter;
