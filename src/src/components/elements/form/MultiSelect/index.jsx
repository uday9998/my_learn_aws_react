import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import Text, { SIZES as textSize, TYPE as textType } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import classnames from 'classnames';
import closeIcon from 'assets/images/small-close.png';
import './index.scss';
import Tooltip from 'components/elements/members/Tooltip';

const MultiSelect = ({
   style, options, icon, iconColor, label, id, placeholder, padding, onAddValue, onRemoveValue, selectedValues,
   hasTooltip, 
}) => {
   const [isOpened, setIsOpened] = useState(false);
   const wrapperRef = useRef(null);
   useOutsideClickDetector(wrapperRef, () => setIsOpened(false));


   const getOptionsField = () => {
      return (
         options.map((option, index) => {
            return (
               <div
                  className={ classnames('multiSelect__option', { 'multiSelect__option-checked': selectedValues.includes(option) }) }
                  onClick={ () => {
                     if (!selectedValues.includes(option)) {
                        onAddValue(option);
                     } else onRemoveValue(option);

                     setIsOpened(false);
                  } }
                  key={ index.toString() }
                  role='presentation'
               >
                  <Text
                     size={ textSize.extraSmall }
                     type={ textType.normal }
                     inner={ option }
                  />
               </div>
            );
         })
      );
   };

   return (
      <div
         className='multiSelect'
         ref={ wrapperRef }
      >
         <div className='flex'>
            {
               label
            && (
               // eslint-disable-next-line jsx-a11y/label-has-associated-control
               <label htmlFor={ id }>
                  <Text
                     size={ textSize.extraSmall }
                     type={ textType.normal }
                     inner={ label }
                  />
               </label>
            )
            }
            {
               hasTooltip && <Tooltip hintText='By selecting one or more programs you can create bundled packages of your courses.' isComment={ true } />
            }
         </div>
         <div
            onClick={ () => {
               setIsOpened(!isOpened);
            }
            }
            className={ classnames(
               'multiSelect-basic',
               {
                  'multiSelect__bordered': isOpened,
               }
            ) }
            style={ {
               ...style,
               height: selectedValues.length ? 'auto' : '47px',
            } }
            role='presentation'
            id={ id }
         >
            <div
               className='selectedValuesList'>
               { selectedValues.length ? selectedValues.map((item, index) => {
                  return (
                     <span className='selectedItem' key={ index.toString() }>
                        <Text
                           size={ textSize.extraSmall }
                           type={ textType.regular }
                           inner={ item }
                           style={ { fontSize: '12px' } }
                        />
                        <span className='remove-icon' onClick={ () => onRemoveValue(item) } role='presentation'>
                           <img src={ closeIcon } alt='' />
                        </span>
                     </span>
                  );
               }) : (
                  <Text
                     size={ textSize.extraSmall }
                     type={ textType.regular }
                     inner={ placeholder }
                     color='#8a94a2'
                     bold
                  />
               ) }
            </div>
            <span

               className='inline-flex'
               role='presentation'
               style={ { transform: isOpened ? 'rotate(180deg)' : 'rotate(0deg)' } }
            >
               <Icon
                  name='DownNew'
                  color={ iconColor || '#c2cedb' }
               />
            </span>
         </div>
         <div className='multiSelect__drop-down' style={ { display: isOpened ? 'block' : 'none' } }>
            {getOptionsField()}
         </div>
      </div>
   );
};

MultiSelect.propTypes = {
   style: PropTypes.object,
   options: PropTypes.array,
   onAddValue: PropTypes.func,
   onRemoveValue: PropTypes.func,
   id: PropTypes.string,
   label: PropTypes.any,
   selectedValues: PropTypes.array,
   icon: PropTypes.string,
   placeholder: PropTypes.string,
   padding: PropTypes.string,
   iconColor: PropTypes.string,
   hasTooltip: PropTypes.bool,
};

MultiSelect.defaultProps = {
   options: [],
   icon: 'Down',
   placeholder: '',
   padding: '12px 32px 12px 25px',
   onAddValue: () => {},
   selectedValues: [],
   onRemoveValue: () => {},
};

export default MultiSelect;
