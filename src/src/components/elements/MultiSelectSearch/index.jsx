/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import './index.scss';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Input from 'components/elements/inputNew';
import Button, { THEMES as themes, SIZES as btnSIzes } from 'components/elements/buttons/BaseButtonNew';
import Icon from '../Icon';
import LoaderMini from '../loaderMini';
import Line from '../Line';
import CheckBox from '../form/CheckBoxNew';

const MultiSelectSearch = ({
   values = [], label, placeholder, helperText, onChange, query, all,
}) => {
   const [filter, { loading }] = useSubmitForm(query);
   const [options, setOptions] = useState([]);
   const getViewVariants = () => {
      return values.map((e) => all.find((z) => z.id === e));
   };
   const [checkedIds, setCheckedIds] = useState([]);
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [search, setSearch] = useState('');
   useEffect(() => {
      filter(search, (data) => {
         setOptions(data.filter((e) => {
            return !values.includes(e.id);
         }));
         setCheckedIds([]);
      });
   }, [search, values]);

   //    useEffect(() => {
   //       setOptions(options.filter((e) => !values.includes(e.id)));
   //    }, [values]);

   const openList = (e) => {
      setAnchorEl(e.currentTarget);
   };
   const closePopover = () => {
      setCheckedIds([]);
      setSearch('');
      setIsOpenTriangle(false);
   };

   const handleCheckAll = () => {
      if (checkedIds.length !== options.length) {
         setCheckedIds(options.map((e) => e.id));
         return;
      }
      setCheckedIds([]);
   };

   const handleCheckItem = (id) => {
      if (checkedIds.includes(id)) {
         setCheckedIds(checkedIds.filter((e) => e !== id));
         return;
      }
      setCheckedIds([...checkedIds, id]);
   };

   const handleSave = () => {
      onChange([...values, ...checkedIds]);
      setIsOpenTriangle(false);
      setCheckedIds([]);
      setSearch('');
   };

   const handleDeleteFromList = (id, e) => {
      e.preventDefault();
      e.stopPropagation();
      onChange(values.filter((item) => item !== id));
   };

   return (
      <div className='select__search'>
         <div className='select__search__input'>
            <div className='select__search__input__top'>
               {label ? (
                  <Text
                     inner={ label }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               ) : (
                  <div />
               )}
               {helperText && (
                  <Text
                     inner={ helperText }
                     type={ types.regular148 }
                     size={ sizes.xsmall }
                     style={ { color: '#727978' } }
                  />
               )}
            </div>
            <Popover
               open={ isOpenTriangle }
               anchorEl={ anchorEl }
               onClose={ () => setIsOpenTriangle(false) }
               className='custom-popover'
               elevation={ 24 }
               anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'left',
               } }
               transformOrigin={ {
                  vertical: 'top',
                  horizontal: 'left',
               } }
            >
               <div className='select__search__popover' style={ { width: anchorEl ? `${ anchorEl.clientWidth }px` : '200p' } }>
                  <div className='select__search__popover__top'>
                     <Input
                        value={ search }
                        onChange={ (name, value) => setSearch(value) }
                        type='search'
                        placeholder='search'
                     />
                     {!loading && (
                        <div className='select__search__popover__top__checkbox'>
                           <CheckBox
                              checked={ checkedIds.length > 0 }
                              onChange={ handleCheckAll }
                           />
                           <Text
                              inner={ `${ checkedIds.length }/${ options.length } Select All Plans` }
                              type={ types.mediumLarge }
                              size={ sizes.small }
                           />
                        </div>
                     )}
                  </div>
                  <Line />
                  {loading ? (
                     <LoaderMini />
                  ) : (
                     <>
                        <div className='select__search__popover__list'>
                           {options.map((e, index) => {
                              return (
                                 <div className='select__search__popover__option' key={ index }>
                                    <CheckBox
                                       checked={ checkedIds.includes(e.id) }
                                       onChange={ () => handleCheckItem(e.id) }
                                    />
                                    <Text
                                       inner={ e.name }
                                       type={ types.regularDefault }
                                       size={ sizes.small }
                                    />
                                 </div>
                              );
                           })}
                        </div>
                     </>
                  )}
                  <Line />
                  <div className='select__search__popover__buttons'>
                     <Button
                        theme={ themes.secondary }
                        size={ btnSIzes.small }
                        text='Cancel'
                        onClick={ () => closePopover() }
                     />
                     <Button
                        theme={ themes.secondar }
                        size={ btnSIzes.small }
                        text='Add Plan'
                        disabled={ checkedIds.length === 0 }
                        onClick={ () => handleSave() }
                     />
                  </div>
               </div>
            </Popover>
            <div
               className={ `select__search__input__bottom${ isOpenTriangle ? ' select__search__input__bottom__active' : '' }` }
               role='presentation'
               onClick={ (e) => {
                  openList(e);
                  setIsOpenTriangle(true);
               } }
            >
               <div className='select__search__input__bottom__content'>
                  {values.length ? (
                     <>
                        {/* {values.length === all.length ? (
                           <Text
                              inner={ fullText }
                              type={ types.regularDefault }
                              size={ sizes.small }
                           />
                        ) : (
                           <>
                              {getViewVariants().map((e, index) => {
                                 return (
                                    <div className='select__search__input__option' key={ index }>
                                       <Text
                                          inner={ e.name }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                       <div className='select__search__input__option__delete' role='presentation' onClick={ (event) => handleDeleteFromList(e.id, event) }>
                                          <Icon name='DeleteTag' />
                                       </div>
                                    </div>
                                 );
                              })}
                           </>
                        )} */}
                        {getViewVariants().map((e, index) => {
                           return (
                              <div className='select__search__input__option' key={ index }>
                                 <Text
                                    inner={ e.name }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                 />
                                 <div className='select__search__input__option__delete' role='presentation' onClick={ (event) => handleDeleteFromList(e.id, event) }>
                                    <Icon name='DeleteTag' />
                                 </div>
                              </div>
                           );
                        })}
                     </>
                  ) : (
                     <>
                        {placeholder && (
                           <Text
                              inner={ placeholder }
                              type={ types.regularDefault }
                              size={ sizes.small }
                              style={ { color: '#727978' } }
                           />
                        )}
                     </>
                  )}
               </div>
               <div
                  className='select__search__input__bottom__icon'
                  style={ { transform: isOpenTriangle ? 'rotate(180deg)' : 'rotate(0deg)' } }
               >
                  <Icon name='DownNew' />
               </div>
            </div>
         </div>
      </div>
   );
};

MultiSelectSearch.propTypes = {
   values: PropTypes.array,
   helperText: PropTypes.string,
   label: PropTypes.string,
   query: PropTypes.func,
   placeholder: PropTypes.string,
   all: PropTypes.array,
   onChange: PropTypes.func,
};

export default MultiSelectSearch;
