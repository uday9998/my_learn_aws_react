import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { find } from 'lodash';
import { Popover } from '@material-ui/core';
import { Options } from './Options';
import Icon from '../Icon';
import IconNew from '../iconsSize';

const Select = ({
   type, options, name, className = '', label, value, onChange, isDisabled = false, placeholder, iconName, iconPositionStart = false,
   disableIconAnimation = false, helpText, disableClose, hasSearch, onSearch, optionsWrapperClassName = '', emptyField, star,
   withoutWidth, removeValue,
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [width, setWidth] = React.useState('');
   const [anchorEl, setAnchorEl] = React.useState(null);
   const onSelect = (selectedItem) => {
      onChange(name, selectedItem);
      if (!disableClose) {
         setAnchorEl(null);
         setIsOpen(false);
      }
   };

   const onOpen = (e) => {
      setIsOpen(true);
      setWidth(e.currentTarget.clientWidth);
      setAnchorEl(e.currentTarget);
   };
   const wrapperRef = useRef(null);
   const onClose = () => {
      setIsOpen(false);
      setAnchorEl(null);
   };
   // useOutsideClickDetector(wrapperRef, () => setIsOpen(false));
   let innerSelect = (value || value === 0) && value !== 'undefined_undefined' ? find(options, (e) => e.value === value) : { label: placeholder };
   if (!innerSelect) {
      innerSelect = { label: placeholder };
   }
   switch (type) {
      case 'select-large':
         return (
            <>
               <div ref={ wrapperRef } role='presentation' className='SelectItem' onClick={ isDisabled ? () => {} : (e) => onOpen(e) }>
                  {label && (
                     <div className='selectItem__label'>
                        <Text
                           inner={ label }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { userSelect: 'none' } }
                        />
                     </div>
                  )}
                  <div
                     onClick={ !disableClose ? () => {} : (e) => onOpen(e) }
                     role='presentation'
                     className={ `SelectItem__button__large ${ isDisabled && ('SelectItem__disabled') } ${ isOpen && 'SelectItem__active' } ${ className }` }
                  >
                     {iconPositionStart && (
                        !iconName
                           ? (
                              <Icon className='SelectItem__button__icon' name='DownNew' />
                           )
                           : (
                              <>
                                 <Icon className='SelectItem__button__icon' name={ iconName } />
                                 <IconNew className='SelectItem__button__icon' name={ iconName } />
                              </>
                           )

                     )}
                     <Text
                        style={ { userSelect: 'none' } }
                        inner={ innerSelect.label }
                        className={ `${ !value && value !== 0 ? 'SelectItem__button__large__placeholder' : '' }` }
                        size={ txtSizes.small }
                        type={ txtTypes.select_large }
                     />
                     {!iconPositionStart && (
                        !iconName
                           ? (
                              <Icon className='SelectItem__button__icon' name='DownNew' />
                           )
                           : (
                              <>
                                 <Icon className='SelectItem__button__icon' name={ iconName } />
                                 <IconNew className='SelectItem__button__icon' name={ iconName } />
                              </>
                           )
                     )
                     }
                  </div>

               </div>
               <Popover
                  open={ isOpen }
                  anchorEl={ anchorEl }
                  onClose={ onClose }
                  className='custom-popover'
                  elevation={ 24 }
                  anchorOrigin={ {
                     vertical: 'bottom',
                     horizontal: 'center',
                  } }
                  transformOrigin={ {
                     vertical: 'top',
                     horizontal: 'center',
                  } }
               >
                  <div
                     style={ { width: `${ width }px` } }
                     className={ optionsWrapperClassName }
                  >
                     <Options
                        OptionsMap={ options }
                        onSelect={ onSelect }
                        name={ name }
                        hasSearch={ hasSearch }
                        onSearch={ onSearch }
                     />
                  </div>
               </Popover>
            </>
         );
      case 'select-transactions':
         return (
            <>
               <div ref={ wrapperRef } role='presentation' className='SelectItem' onClick={ isDisabled ? () => {} : (e) => onOpen(e) }>
                  {label && (
                     <div className='selectItem__label'>
                        <Text
                           inner={ label }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { userSelect: 'none' } }

                        />
                     </div>
                  )}
                  <div className={ `SelectItem__button__transactions ${ isDisabled ? 'SelectItem__disabled' : '' }${ isOpen ? 'SelectItem__active' : '' }${ className }` }>
                     {iconPositionStart && (
                        !iconName
                           ? (
                              <Icon className='SelectItem__button__icon' name='DownNew' />
                           )
                           : (
                              <Icon className='SelectItem__button__icon' name={ iconName } />
                           )

                     )}
                     <Text
                        style={ { userSelect: 'none' } }

                        inner={ innerSelect.label }
                        className={ `${ !value && value !== 0 ? 'SelectItem__button__transactions__placeholder' : '' }` }
                        size={ txtSizes.small }
                        type={ txtTypes.select_large }
                     />
                     {!iconPositionStart && (
                        !iconName
                           ? (
                              <Icon className='SelectItem__button__icon' name='DownNew' />
                           )
                           : (
                              <Icon className={ disableIconAnimation ? 'SelectItem__button__icon disableIconAnimation' : 'SelectItem__button__icon' } name={ iconName } />
                           )
                     )
                     }
                  </div>

               </div>
               <Popover
                  open={ isOpen }
                  anchorEl={ anchorEl }
                  onClose={ onClose }
                  className='custom-popover'
                  elevation={ 24 }
                  anchorOrigin={ {
                     vertical: 'bottom',
                     horizontal: 'center',
                  } }
                  transformOrigin={ {
                     vertical: 'top',
                     horizontal: 'center',
                  } }
               >
                  <div
                     style={ { width: `${ width }px` } }
                     className={ optionsWrapperClassName }
                  >
                     <Options
                        OptionsMap={ options }
                        onSelect={ onSelect }
                        name={ name }
                        hasSearch={ hasSearch }
                        onSearch={ onSearch }
                     />
                  </div>
               </Popover>
            </>
         );
      case 'select-medium':
         return (
            <>
               <div ref={ wrapperRef } role='presentation' className='SelectItem' onClick={ isDisabled || disableClose ? () => {} : (e) => onOpen(e) }>
                  {label && (
                     <div
                        style={ {
                           justifyContent: emptyField ? 'flex-start' : '',
                        } }
                        className='selectItem__label'>
                        <Text
                           inner={ label }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { userSelect: 'none' } }

                        />
                        {
                           star && emptyField && (
                              <span style={ {
                                 color: 'red',
                              } }>{star}
                              </span>
                           )
                        }
                        {helpText
                  && (
                     <span
                        className='inputNew_helper'>{helpText}
                     </span>
                  )
                        }
                     </div>
                  )}
                 
                  <div
                     className={ `SelectItem__button__medium ${ isDisabled ? 'SelectItem__disabled' : '' }${ isOpen ? 'SelectItem__active' : '' }${ className }` }
                     onClick={ !disableClose ? () => {} : (e) => onOpen(e) }
                     role='presentation'
                     style={ {
                        border: emptyField ? '1px solid red' : '',
                     } }
                  >
                     {iconPositionStart && (
                        !iconName
                           ? (
                              <Icon className='SelectItem__button__icon' name='DownNew' />
                           )
                           : (
                              <Icon className='SelectItem__button__icon' name={ iconName } />
                           )

                     )}
                     <Text
                        style={ { userSelect: 'none' } }
                        inner={ innerSelect.label }
                        className={ `${ !value && value !== 0 ? 'SelectItem__button__medium__placeholder' : '' }` }
                        size={ txtSizes.small }
                        type={ txtTypes.select_large }
                     />
                     {!iconPositionStart && (
                        !iconName
                           ? (
                              <div className='SelectItem__button__icon__container'>
                                 {removeValue && value && (
                                    <div
                                       className='SelectItem__button__icon__container__remove'
                                       title='Remove Autoresponder'
                                       onClick={ (e) => { e.stopPropagation(); onSelect(undefined); } }
                                       role='presentation'> <IconNew name='CategoryDecline' />
                                    </div>
                                 )}
                                 <Icon className='SelectItem__button__icon' name='DownNew' />
                              </div>
                             
                           )
                           : (
                              <Icon className={ disableIconAnimation ? 'SelectItem__button__icon disableIconAnimation' : 'SelectItem__button__icon' } name={ iconName } />
                           )
                     )
                     }
                    
                  </div>

               </div>
               <Popover
                  open={ isOpen }
                  anchorEl={ anchorEl }
                  onClose={ onClose }
                  className='custom-popover'
                  elevation={ 24 }
                  anchorOrigin={ {
                     vertical: 'bottom',
                     horizontal: 'center',
                  } }
                  transformOrigin={ {
                     vertical: 'top',
                     horizontal: 'center',
                  } }
               >
                  <div
                     style={ { width: `${ width }px` } }
                     className={ optionsWrapperClassName }
                  >
                     <Options
                        OptionsMap={ options }
                        onSelect={ onSelect }
                        name={ name }
                        hasSearch={ hasSearch }
                        onSearch={ onSearch }
                     />
                  </div>
               </Popover>
            </>
         );
      default:
         return (
            <>
               <div ref={ wrapperRef } role='presentation' className='SelectItem' onClick={ isDisabled ? () => {} : (e) => onOpen(e) }>
                  {label && (
                     <div className='selectItem__label'>
                        <Text
                           inner={ label }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                           style={ { userSelect: 'none' } }
                        />
                     </div>
                  )}
                  <div className={ `SelectItem__button ${ isDisabled && ('SelectItem__disabled') } ${ isOpen && 'SelectItem__active' } ${ className }` }>
                     {iconPositionStart && (
                        !iconName
                           ? (
                              <Icon className='SelectItem__button__icon' name='DownNew' />
                           )
                           : (
                              <Icon name={ iconName } />
                           )

                     )}
                     <Text
                        style={ { userSelect: 'none' } }
                        inner={ innerSelect.label }
                        className={ `${ !value && value !== 0 ? 'SelectItem__button__placeholder' : '' }` }
                        size={ txtSizes.xsmall }
                        type={ txtTypes.select }
                     />
                     {!iconPositionStart && (
                        !iconName
                           ? (
                              <Icon className='SelectItem__button__icon' name='DownNew' />
                           )
                           : (
                              <Icon name={ iconName } />
                           )
                     )
                     }
                  </div>

               </div>
               <Popover
                  open={ isOpen }
                  anchorEl={ anchorEl }
                  onClose={ onClose }
                  className='custom-popover'
                  elevation={ 24 }
                  anchorOrigin={ {
                     vertical: 'bottom',
                     horizontal: 'center',
                  } }
                  transformOrigin={ {
                     vertical: 'top',
                     horizontal: 'center',
                  } }
               >
                  <div
                     style={ withoutWidth ? {} : { width: `${ width }px` } }
                     className={ optionsWrapperClassName }
                  >
                     <Options
                        OptionsMap={ options }
                        onSelect={ onSelect }
                        name={ name }
                        hasSearch={ hasSearch }
                        onSearch={ onSearch }
                     />
                  </div>
               </Popover>
            </>
         );
   }
};

Select.propTypes = {
   options: PropTypes.array,
   value: PropTypes.any,
   onChange: PropTypes.func,
   iconName: PropTypes.string,
   label: PropTypes.string,
   iconPositionStart: PropTypes.bool,
   placeholder: PropTypes.string,
   type: PropTypes.string,
   className: PropTypes.string,
   isDisabled: PropTypes.bool,
   name: PropTypes.any,
   disableIconAnimation: PropTypes.bool,
   helpText: PropTypes.string,
   disableClose: PropTypes.bool,
   hasSearch: PropTypes.bool,
   onSearch: PropTypes.func,
   optionsWrapperClassName: PropTypes.string,
   emptyField: PropTypes.bool,
   star: PropTypes.string,
   withoutWidth: PropTypes.bool,
   removeValue: PropTypes.bool,
};


export default Select;
