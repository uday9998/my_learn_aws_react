import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import './index.scss';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import Icon from 'components/elements/Icon';


const TagSelect = ({
   values = [], options = [], onAttachTag, atachTag, isHaveDetach, onDetach, placeholder, isNotTag,
}) => {
   const isTagAttached = (tag) => {
      return values.filter((value) => value.text === tag.text).length;
   };
   const [isOpenTagSelect, setIsOpenTagSelect] = useState('');
   const [isInput, setIsInput] = useState(false);
   const [filteredOptions, setFilteredOptions] = useState(options.filter((option) => isTagAttached(option)));
   const [title, setTitle] = useState('');
   useEffect(() => {
      setFilteredOptions(options.filter((option) => !isTagAttached(option)));
   }, [values]);

   useEffect(() => {
      setFilteredOptions(options.filter((option) => !isTagAttached(option)));
   }, [options]);

   return (
      <div className='tag__select__item'>
         <div
            className='tag__input'
            role='presentation'
            onClick={ () => setIsOpenTagSelect(true) }
         >
            <div className='tag__input__left'>
               {isInput ? (
                  <input
                     value={ title }
                     onChange={ (e) => setTitle(e.target.value) }
                     placeholder={ isNotTag ? 'Enter name' : 'Enter tag name' }
                  />
               ) : (
                  <div className='tag__select__flex'>
                     {values.length ? values.map((value, index) => {
                        return (
                           <div
                              key={ uniqueId() }
                              role='presentation'
                              className='tag__select__value'
                              onClick={ (e) => {
                                 e.stopPropagation();
                                 e.preventDefault();
                              } }
                           >
                              <Text
                                 inner={ value.text }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                              {isHaveDetach && (
                                 <div
                                    className='tag__view__delete'
                                    role='presentation'
                                    onClick={ (e) => {
                                       e.preventDefault();
                                       e.stopPropagation();
                                       onDetach(value.text, value.id, index);
                                    } }
                                 >
                                    <Icon name='DeleteTag' />
                                 </div>
                              )}
                           </div>
                        );
                     }) : (
                        <Text
                           inner={ placeholder }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { color: '#727978' } }
                        />
                     )}
                  </div>
               )}
            </div>
            <div className='tag__input__right'>
               <div
                  className='tag__icon'
                  role='presentation'
                  onClick={ () => {
                     setIsOpenTagSelect(!isOpenTagSelect);
                     setIsInput(false);
                     setTitle('');
                  } }
               >
                  <div
                     className='tag__icon__button'
                     style={ { transform: isOpenTagSelect ? 'rotate(180deg)' : 'rotate(0deg)' } }
                  >
                     <Icon name='DownNew' />
                  </div>
               </div>
            </div>
         </div>
         {isOpenTagSelect && (
            <ClickOutside onClick={ () => {
               if (!isInput) {
                  setIsOpenTagSelect(false);
               }
            } }
            >
               {isInput ? (
                  <div className='tag__select__options'>
                     <div
                        className='tag__select__option tag__select__option__add'
                        role='presentation'
                        onClick={ () => {
                           onAttachTag({ name: title }, true);
                           setTitle('');
                           setIsInput(false);
                        } }
                     >
                        <Icon name='plusNew' />
                        <Text
                           inner={ `Add "${ title }"` }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </div>
                  </div>
               ) : (
                  <div className='tag__select__options'>
                     {filteredOptions.map((option) => {
                        return (
                           <div
                              className='tag__select__option'
                              key={ uniqueId() }
                              role='presentation'
                              onClick={ () => {
                                 atachTag(option.text, option);
                                 setIsOpenTagSelect(false);
                              } }
                           >
                              <Text
                                 inner={ option.text }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                           </div>
                        );
                     })}
                     <div
                        className='tag__select__option tag__select__option__add'
                        role='presentation'
                        onClick={ () => {
                           setIsInput(true);
                        } }
                     >
                        <Icon name='plusNew' />
                        <Text
                           inner='Add new'
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </div>
                  </div>
               )}
            </ClickOutside>
         )}
      </div>
   );
};

TagSelect.propTypes = {
   values: PropTypes.array,
   onAttachTag: PropTypes.func,
   isHaveDetach: PropTypes.bool,
   options: PropTypes.array,
   atachTag: PropTypes.func,
   placeholder: PropTypes.string,
   onDetach: PropTypes.func,
   isNotTag: PropTypes.bool,
};

export default TagSelect;
