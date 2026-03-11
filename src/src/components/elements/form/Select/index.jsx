/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import Text, {
   SIZES as textSize, TYPE as textType, TYPE, SIZES,
} from 'components/elements/Text';
import arrowIcon from 'assets/images/landings/arrow.png';
import CheckBox from 'components/elements/form/CheckBox';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';


const Select = ({
   style, options, iconColor, label, id, placeholder, name, value, radius, typeOval,
   hasBorder, onChange, disabled, fontStyles, darkMode, multiple, selectedValues, color,
   selectedValue, isConditionSelect,
   selectWithImage, lang, isMenuLang, direction = 'bottom',
}) => {
   const [isOpened, setIsOpened] = useState(false);
   const selectedOption = options && !!options.length && options.find(option => option.value === value);

   const wrapperRef = useRef(null);
   useOutsideClickDetector(wrapperRef, () => setIsOpened(false));
   const getOptionsField = () => {
      return (
         options && !!options.length && options.map((option, index) => {
            const checked = selectedValues.includes(option.value);
            return (
               <div
                  className={ `SelectElement__option ${ multiple && 'SelectElement__option_multiple' } ` }
                  onClick={ () => {
                     setIsOpened(!isOpened);
                     onChange(name, option.value, option);
                  } }
                  id={ index }
                  key={ index }
               >
                  {multiple ? (
                     <CheckBox
                        filled
                        className='multiple_selecte_checkbox'
                        selectedIcon='MSCheckBoxOn'
                        notSelectedIcon='MSCheckBoxOff'
                        checked={ checked }
                        labelNode={ (
                           <Text
                              size={ SIZES.extraSmall }
                              type={ TYPE.demyBold }
                              inner={ option.label }
                              style={ multiple && { color: checked ? color : '#3f4f65' } }
                           />
                        ) }
                     />
                  ) : (
                     <>
                        { selectWithImage && (
                           <img
                              src={ `${ process.env.PUBLIC_URL }/flags/${ option.label }.svg` }
                              alt={ `Flag of ${ option.label }` }
                              title={ option.name }
                              width='15px'
                           />
                        )}
                        <Text
                           size={ textSize.extraSmall }
                           type={ textType.normal }
                           inner={ option.label }
                           style={ fontStyles ? { fontFamily: `${ option.value }` } : '' }
                           color={ isMenuLang && iconColor }
                        />

                     </>
                  )}
               </div>
            );
         })
      );
   };

   async function handleClick() {
      if (disabled || (multiple && isOpened)) return;
      const url = window.location.href.split('/')[4];
      await setIsOpened(!isOpened);
      if (!isOpened && url !== 'programs' && document.getElementsByClassName('editorContainer_schoolroom')[0] && document.getElementsByClassName('editorContainer_schoolroom')[0].clientHeight - wrapperRef.current.getBoundingClientRect().y < 100) {
         document.getElementsByClassName('editorContainer_schoolroom')[0].scrollTop += 150;
      } else if (!isOpened && url === 'programs' && document.getElementsByClassName('editorContainer_checkout')[0] && document.getElementsByClassName('editorContainer_checkout')[0].clientHeight - wrapperRef.current.getBoundingClientRect().y < 100) {
         document.getElementsByClassName('editorContainer_checkout')[0].scrollTop += 150;
      } else if (!isOpened && document.getElementsByClassName('content_right')[0] && document.getElementsByClassName('content_right')[0].clientHeight - wrapperRef.current.getBoundingClientRect().y < 100) {
         document.getElementsByClassName('content_right')[0].scrollTop += 100;
      }
   }
   return (
      <div className='SelectElement' ref={ wrapperRef }>
         {
            direction === 'top'
            && (
               <div className='SelectElement__drop-down SelectElement__drop-top' style={ { display: isOpened ? 'block' : 'none' } }>
                  {isConditionSelect
               && (
                  <>
                     <div className='SelectElement__option__title'>Member Data</div>
                     <div className='SelectElement__option__titleTags'>Tags</div>
                     <div className='SelectElement__option__titleCourse'>Class Data</div>
                     <div className='SelectElement__option__titleCoupon'>Coupon</div>
                  </>
               )
                  }
                  {getOptionsField()}
               </div>
            )
         }
         {
            label
               && (
                  <label htmlFor={ id }>
                     <Text
                        size={ textSize.extraSmall }
                        type={ textType.demiBold }
                        inner={ label }
                        line24
                     />
                  </label>
               )
         }
         <div
            className={ classnames(
               'SelectElement-basic',
               {
                  'SelectElement__cursor-pointer': !disabled,
                  'SelectElement__type-oval': typeOval,
                  'SelectElement__ovalBorder': typeOval && hasBorder,
                  'SelectElement__bordered': !typeOval && isOpened,
                  'disabled': disabled,
               }
            ) }
            style={ {
               ...style,
               borderRadius: typeOval ? radius : '4px',
            } }
            onClick={ handleClick }
         >
            <div
               className='SelectElement__text'
            >
               { selectWithImage && (
                  <img
                     src={ `${ process.env.PUBLIC_URL }/flags/${ lang }.svg` }
                     alt={ `Flag of ${ lang }` }
                     title={ selectedOption.name }
                     width='15px'
                  />
               )}
               <Text
                  size={ textSize.extraSmall }
                  type={ textType.regular }
                  inner={ selectedValue || (selectedOption && selectedOption.label) || placeholder }
                  // eslint-disable-next-line no-nested-ternary
                  color={ !isMenuLang ? (darkMode ? '#fff' : (typeOval ? '#3f4f65' : '#8a94a2')) : iconColor }
                  bold
               />

            </div>
            <span className='inline-flex' style={ { transform: isOpened ? 'rotate(180deg)' : '' } }>
               <img src={ arrowIcon } alt='default' />
            </span>
         </div>
         {
            direction === 'bottom'
            && (
               <div className='SelectElement__drop-down' style={ { display: isOpened ? 'block' : 'none' } }>
                  {isConditionSelect
               && (
                  <>
                     <div className='SelectElement__option__title'>Member Data</div>
                     <div className='SelectElement__option__titleTags'>Tags</div>
                     <div className='SelectElement__option__titleCourse'>Class Data</div>
                     <div className='SelectElement__option__titleCoupon'>Coupon</div>
                  </>
               )
                  }
                  {getOptionsField()}
               </div>
            )
         }
      </div>
   );
};

Select.propTypes = {
   style: PropTypes.object,
   options: PropTypes.array,
   selectedValues: PropTypes.array,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   radius: PropTypes.string,
   typeOval: PropTypes.bool,
   hasBorder: PropTypes.bool,
   iconColor: PropTypes.string,
   selectedValue: PropTypes.string,
   name: PropTypes.string,
   color: PropTypes.string,
   value: PropTypes.any,
   disabled: PropTypes.bool,
   multiple: PropTypes.bool,
   onChange: PropTypes.func,
   fontStyles: PropTypes.bool,
   isConditionSelect: PropTypes.bool,
   darkMode: PropTypes.bool,
   selectWithImage: PropTypes.bool,
   lang: PropTypes.string,
   isMenuLang: PropTypes.bool,
   direction: PropTypes.oneOf(['top', 'bottom']),
   id: PropTypes.any,
};

Select.defaultProps = {
   options: [],
   selectedValues: [],
   placeholder: '',
   radius: '32px',
   typeOval: false,
   hasBorder: false,
   onChange: () => {},
   fontStyles: false,
   darkMode: false,

};

export default Select;
