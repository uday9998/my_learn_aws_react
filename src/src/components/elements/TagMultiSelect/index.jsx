/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import './index.scss';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import Icon from '../Icon';
import BaseButton, { SIZES as sizes } from '../buttons/BaseButtonNew';
import ErrorMessageWrapper from '../errorMessageWrapper';

const TagSelect = ({
   values = [], options = [], onAttachTag, atachTag, isHaveDetach, onDetach, placeholder, isNotTag, isBlog, tagName,
}) => {
   const isTagAttached = (tag) => {
      if (isNotTag) {
         return values.filter((value) => value.id === tag.id).length;
      }
      return values.filter((value) => value.created_at === tag.created_at).length;
   };
   const [isOpenTagSelect, setIsOpenTagSelect] = useState('');
   const [isInput, setIsInput] = useState(false);
   const [filteredOptions, setFilteredOptions] = useState(options.filter((option) => isTagAttached(option)));
   const [title, setTitle] = useState('');
   const [searchTerm, setSearchTerm] = useState('');
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   useEffect(() => {
      setFilteredOptions(options.filter((option) => !isTagAttached(option)));
   }, [values, options]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);

         setTimeout(() => {
            setLocalErrorMessages(prev => prev.filter(msg => msg !== message));
         }, 1500);
      }
   };

   const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
         onAttachTag({ name: title }, true);
         setTitle('');
         setIsInput(false);
      }
   };

   const handleAddTag = async () => {
      if (!isInput) {
         setIsOpenTagSelect(false);
         setIsInput(true);
         return;
      }

      const errorMessages = await onAttachTag({ name: title }, true) || [];

      if (errorMessages.length) {
         addLocalErrorMessage(errorMessages);
         return;
      }

      setIsInput(false);
      setTitle('');
   };

   const filteredTags = filteredOptions.filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase()));

   return (
      <div className='tag__select__item'>
         <ErrorMessageWrapper errorMessages={ localErrorMessages }>
            <div
               className='tag__input'
               role='presentation'
               onClick={ () => filteredTags.length !== 0 && setIsOpenTagSelect(!isInput && !isOpenTagSelect) }
            >
               <div className='tag__input__left'>
                  {!isBlog && !isInput && (
                     <div className='tag__search'>
                        <input
                           type='text'
                           value={ searchTerm }
                           onChange={ (e) => setSearchTerm(e.target.value) }
                           placeholder='Search tags...'
                        />
                     </div>
                  )
                  }
                  {isInput ? (
                     <input
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                        onKeyDown={ handleKeyDown }
                        placeholder={ isNotTag ? 'Enter name' : `Enter ${ tagName } Name` }
                     />
                  ) : (
                     <div className='tag__select__flex'>
                        {values.length ? values.map((value) => {
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
                                    inner={ value.name }
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
                                          onDetach(value.id);
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
               {!isInput && filteredTags.length !== 0 && (
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
               )}
            </div>
         </ErrorMessageWrapper>
         {isOpenTagSelect && filteredTags.length > 0 && (
            <ClickOutside onClick={ () => {
               if (!isInput) {
                  setIsOpenTagSelect(false);
               }
            } }
            >
               <div className='tag__select__options'>
                  {filteredTags.map((option) => {
                     return (
                        <div
                           className='tag__select__option'
                           key={ uniqueId() }
                           role='presentation'
                           onClick={ () => {
                              atachTag(option.id, option);
                              setIsOpenTagSelect(false);
                           } }
                        >
                           <Text
                              inner={ option.name }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                     );
                  })}
               </div>

            </ClickOutside>
         )}
         <BaseButton
            iconName='Plus'
            text={ `Add ${ tagName }` }
            isIconRight={ true }
            onClick={ handleAddTag }
            style={ {
               marginTop: '30px',
               padding: '10px 16px 10px 16px',
            } }
            size={ sizes.new_small }
            iconColor='#fff'
         />
      </div>
   );
};

TagSelect.defaultProps = {
   tagName: 'Tag',
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
   isBlog: PropTypes.bool,
   tagName: PropTypes.string,
};

export default TagSelect;
