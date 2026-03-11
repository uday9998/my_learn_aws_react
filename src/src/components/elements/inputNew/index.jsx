/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { v4 as uuidv4 } from 'uuid';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import IToolTip from 'components/elements/IToolTIp';
import IToolTipNew from 'components/elements/IToolTipNew';
import moment from 'moment';
import Text, { TYPES as txtTypes, SIZES as sizes } from 'components/elements/TextNew';
import { TimePicker } from 'antd';
import 'antd/dist/reset.css';
import { copyToClipBoard } from 'utils/copy';
import {
   borderColor, giveBackgroundColors, isLight, mainBgColor, primaryButtonTextColor,
   setPrimaryColors,
} from 'utils/pageBuilder/schoolRoomColor';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import Icon from '../Icon';
import { Calendar } from '../CalendarNew';
import { ColendarPeriod } from '../CalendarPeriod';
import IconNew from '../iconsSize';
import ErrorMessageWrapper from '../errorMessageWrapper';


const Input = function ({
   isError, min, placeholder, value, onChange, onKeyPress, children,
   isCloseHidenOnEmpty, classI, name, isPassword, type, disabled,
   onClearSearchValue, id, label, helpText, data, onSearch, isAnimatedLabel,
   from, to, IToolTipText, minNumber, isHaveCopyButton, withIcon, iconName,
   bottomText, onBlur, inputRef, maxNumber, maxlength, isLabelHtml, setOpenModal, IToolTipTextNew,
   isCertificate, leftText, textColor, inputTextColor, newBorderColor, maxLengthTextArea,
   isDisabledHtmlText, isDiv, autoComplete, characterLimit, errorMessages = [], textareaRef,
}) {
   const { location: { pathname } } = useHistory();

   const dataRef = useRef(null);
   const intervalRef = useRef(null);

   const siteInfo = useSelector(siteInfoSelector);
   const [types, setTypes] = useState(type);
   const [classis, setClassis] = useState('');
   const [isOpenCalendar, setIsOpenCalendar] = useState(false);
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   useOutsideClickDetector(dataRef, () => setIsOpenCalendar(false));

   useEffect(() => {
      setTypes(type);
   }, [type]);

   useEffect(() => {
      if (isOpenCalendar && type === 'date' && isCertificate) {
         if (document.getElementsByClassName('modal__new__content') && document.getElementsByClassName('modal__new__content')[0]) {
            const el = document.getElementsByClassName('modal__new__content')[0];
            el.scrollTop = el.scrollHeight;
         }
      }
   }, [isOpenCalendar]);

   useEffect(() => {
      const checkColor = isLight(mainBgColor(siteInfo)) || pathname.includes('my-account') || (pathname.includes('admin') && !pathname.includes('other-page'));

      if (isLight(mainBgColor(siteInfo))) {
         giveBackgroundColors(checkColor, siteInfo);
      } else if (pathname.includes('my-account', siteInfo)) {
         giveBackgroundColors(checkColor);
      } else if (pathname.includes('admin/portal/template')) {
         giveBackgroundColors(false, siteInfo);
      } else if (pathname.includes('admin')) {
         giveBackgroundColors(checkColor, siteInfo);
      } else {
         giveBackgroundColors(checkColor, siteInfo);
      }
      const templateName = pathname.split('/').find(name => name.includes('template'));

      setPrimaryColors(siteInfo, templateName || siteInfo.active_school_room.school_room_theme_name);
   }, [pathname]);

   const onChangeNumberInput = (e) => {
      // const toUpdate = Number(e.target.value);
      // if (toUpdate && toUpdate <= maxNumber && toUpdate >= minNumber) {
      //    onChange(e.target.name, Number(e.target.value));
      // }
      if (e.target.value.length !== 0) {
         if (Number(e.target.value) <= maxNumber) {
            if (minNumber || typeof minNumber === 'number') {
               if (Number(e.target.value) > minNumber) {
                  onChange(e.target.name, e.target.value.length !== 0 ? Number(e.target.value) : '');
               }
            } else {
               onChange(e.target.name, e.target.value.length !== 0 ? Number(e.target.value) : '');
            }
         }
      } else if (!minNumber || typeof minNumber !== 'number') {
         onChange(e.target.name, e.target.value.length !== 0 ? Number(e.target.value) : '');
      }
   };


   const onMouseDownInputNumber = (action) => {
      let innerValue = value;
      const innitial = action === '-' ? Number(innerValue - 1) : Number(innerValue + 1);
      if (minNumber !== undefined) {
         if (innitial > minNumber && innitial <= maxNumber) {
            innerValue = innitial;
            onChange(name, innitial);
         }
      } else if (innitial <= maxNumber) {
         innerValue = innitial;
         onChange(name, innitial);
      }
      if (name !== 'trial_period') {
         intervalRef.current = setInterval(() => {
            const newValue = action === '-' ? Number(innerValue - 1) : Number(innerValue + 1);
            if (minNumber !== undefined) {
               if (newValue > minNumber && newValue <= maxNumber) {
                  innerValue = newValue;
                  onChange(name, newValue);
               }
            } else if (newValue <= maxNumber) {
               innerValue = newValue;
               onChange(name, newValue);
            }
         }, 200);
      }
   };

   const onMouseUpInputNumber = () => {
      clearInterval(intervalRef.current);
   };

   const onChangeTextInput = (e) => {
      const newValue = e.target.value;
      if (maxlength === 'unset') {
         onChange(name, newValue);
         return;
      }
      let textMaxLength = maxlength;
      if (type === 'textarea') {
         textMaxLength = maxLengthTextArea;
      }

      if (newValue.length > Number(textMaxLength)) {
         const errorMessage = `There is a limit of ${ textMaxLength } characters for you to write.`;

         if (localErrorMessages.includes(errorMessage)) return;

         setLocalErrorMessages(prev => [...prev, errorMessage]);

         setTimeout(() => {
            setLocalErrorMessages(prev => prev.filter(message => message !== errorMessage));
         }, 1000);
         return;
      }

      onChange(name, newValue);
   };

   if (types === 'custom') {
      return (
         <div className={ `${ classI }` }>
            {(label || helpText || IToolTipText) && (
               <div className='input_header'>
                  {!isAnimatedLabel ? (
                     <label htmlFor={ id } className={ `input__default__label ${ disabled ? 'inputNew_label_disabled' : '' } ` }>{label}</label>
                  ) : ''}
                  {helpText
                     && <span className='inputNew_helper'>{helpText}</span>}
                  {IToolTipText && <IToolTip tooltip={ IToolTipText } />}
               </div>
            )}
            <div>
               {children}
            </div>
            {data.length ? (
               <div className='input_footer'>
                  {data.map((e) => {
                     return (
                        <div className='input_footer_message' key={ uuidv4() }>
                           <Icon name={ e.status } />
                           <span className={ `input_footer_text input_footer_text_${ e.status }` }>{e.message}</span>
                        </div>
                     );
                  })}
               </div>
            ) : ''}
         </div>
      );
   }
   if (types === 'search') {
      return (
         <div className={ `inputSearch ${ classI }` }>
            {(label || helpText) && (
               <div className='input_header'>
                  <label htmlFor={ id } className={ `inputNew_label ${ disabled ? 'inputNew_label_disabled' : '' } ${ isError ? 'inputNew_label_error' : '' }` }>{label}</label>
                  {helpText
                     && <span className='inputNew_helper'>{helpText}</span>}
               </div>
            )}
            <div className={ `inputNew ${ classis } ${ disabled ? 'input_new_disabled' : '' }` }>
               <div className='inputNew__search'>
                  <div role='presentation' onClick={ (!disabled && onSearch) ? () => onSearch(value) : () => { } } className={ `inputNew_icon ${ !value ? 'inputNew_icon_inactive' : '' }` }><Icon name='searchNew' /></div>
                  <input
                     id={ id }
                     value={ value }
                     ref={ inputRef }
                     name={ name }
                     type='text'
                     autoComplete='off'
                     onKeyDown={ onKeyPress }
                     disabled={ disabled }
                     onFocus={ () => setClassis('focused') }
                     onBlur={ onBlur ? (e) => { setClassis(''); onBlur(e.target.name, e.target.value, e); } : () => setClassis('') }
                     placeholder={ placeholder || '' }
                     onChange={ (e) => { onChange(e.target.name, e.target.value, e); } }
                     className=' input_new'
                  />
               </div>
               {/* {value && ( */}
               {isCloseHidenOnEmpty ? (
                  <>
                     {value && (
                        <div
                           role='presentation'
                           onClick={ !disabled ? () => {
                              onChange(name, '');
                              onClearSearchValue();
                           } : () => { } }
                           className='inputNew_search inputNew_icon'
                        ><Icon name='clearNew' />
                        </div>
                     )}
                  </>
               ) : (
                  <div
                     role='presentation'
                     onClick={ !disabled ? () => {
                        onChange(name, '');
                        onClearSearchValue();
                     } : () => { } }
                     className='inputNew_search inputNew_icon'
                  ><Icon name='clearNew' color='#797278' />
                  </div>
               )}

               {/* )} */}
            </div>
            {data.length ? (
               <div className='input_footer'>
                  {data.map((e) => {
                     return (
                        <div className='input_footer_message' key={ uuidv4() }>
                           <Icon name={ e.status } />
                           <span className={ `input_footer_text input_footer_text_${ e.status }` }>{e.message}</span>
                        </div>
                     );
                  })}
               </div>
            ) : ''}
         </div>
      );
   }
   if (types === 'textarea') {
      return (
         <div className={ `text_area ${ classI }` }>
            {(helpText || label || IToolTipText) ? (
               <div className='input_header' style={ { marginBottom: '8px' } }>
                  <label htmlFor={ id } className={ `inputNew_label ${ disabled ? 'inputNew_label_disabled' : '' } ${ isError ? 'inputNew_label_error' : '' }` }>{label}</label>
                  {
                     characterLimit && <span className='character__limit'>{value?.length || 0}/{characterLimit}</span>
                  }
                  {helpText
                     && <span className='inputNew_helper'>{helpText}</span>}
                  {IToolTipText && <IToolTip tooltip={ IToolTipText } />}
               </div>
            ) : (
               <></>
            )}
            <ErrorMessageWrapper errorMessages={ [...errorMessages, ...localErrorMessages] }>
               <textarea
                  id={ id }
                  value={ value }
                  name={ name }
                  disabled={ disabled }
                  ref={ textareaRef || inputRef }
                  onFocus={ () => setClassis('focused') }
                  onBlur={ () => setClassis('') }
                  placeholder={ placeholder || '' }
                  onChange={ (e) => { onChangeTextInput(e); } }
                  className={ `text_area_new  ${ iconName === 'Generator' ? 'text_area_new_with_generator' : '' }  ${ disabled ? 'text_area_new_disabled' : '' }` }
               />
            </ErrorMessageWrapper>
            {withIcon && (
               <div className='textarea__inputNew__icon' onClick={ () => setOpenModal(name, value) } role='presentation'>
                  {!IToolTipTextNew && <IconNew name={ iconName } />}
                  {IToolTipTextNew && <IToolTipNew tooltip={ IToolTipTextNew } iconName={ iconName } id='tooltip1' />}
               </div>
            )}
            {data.length ? (
               <div className='input_footer'>
                  {data.map((e) => {
                     return (
                        <div className='input_footer_message' key={ uuidv4() }>
                           <Icon name={ e.status } />
                           <span className={ `input_footer_text input_footer_text_${ e.status }` }>{e.message}</span>
                        </div>
                     );
                  })}
               </div>
            ) : ''}
            {bottomText && (
               <div className='input_footer'>
                  <Text
                     inner={ bottomText }
                     type={ txtTypes.regular148 }
                     style={ { color: '#727978' } }
                     size={ sizes.xsmall }
                  />
               </div>
            )}
         </div>
      );
   }
   if (type === 'date-period') {
      return (
         <div className={ `input_date ${ classI }` } ref={ dataRef }>
            {(label || helpText) && (
               <div className='input_header'>
                  <label htmlFor={ id } className={ `inputNew_label ${ disabled ? 'inputNew_label_disabled' : '' } ${ isError ? 'inputNew_label_error' : '' }` }>{label}</label>
                  {helpText
                  && <span className='inputNew_helper'>{helpText}</span>}
               </div>
            )}
            <div className={ `inputNew ${ classis } ${ isOpenCalendar ? 'inputNew_active' : '' } ${ disabled ? 'input_new_disabled' : '' }` }>
               <input
                  id={ id }
                  // value={ from ? (`${ from.getMonth() + 1 }/${ from.getDate() }/${ from.getFullYear() }${ to ? `-${ to.getMonth() + 1 }/${ to.getDate() }/${ to.getFullYear() }` : '' }`) : '' }
                  value={ from ? `${ moment(from).format('MMMM DD, YYYY') }${ to ? ` - ${ moment(to).format('MMMM DD, YYYY') }` : '' }` : '' }
                  name={ name }
                  type='text'
                  // disabled={ true }
                  ref={ inputRef }
                  onFocus={ () => setClassis('focused') }
                  onBlur={ () => setClassis('') }
                  placeholder={ placeholder || 'Select date' }
                  className=' input_new input_new_date'
                  onClick={ () => (disabled ? {} : setIsOpenCalendar(!isOpenCalendar)) }
                  readOnly
               />
               <div className='inputNew_calendar'>
                  <div role='presentation' disabled={ disabled } className={ `inputNew__calendar__icon ${ value ? 'inputNew__calendar__icon__selected' : '' } ${ isOpenCalendar ? 'inputNew__calendar__icon__active' : '' }` } onClick={ () => (disabled ? {} : setIsOpenCalendar(!isOpenCalendar)) }><Icon name='Date' /></div>
                  <div className='calendar__wrapper'>
                     {isOpenCalendar
                     && (
                        <ColendarPeriod
                           onChange={ (typeChange, date) => {
                              switch (typeChange) {
                                 case 'from':
                                    onChange(`${ name }To`, null);
                                    onChange(`${ name }From`, date);
                                    break;
                                 default:
                                    onChange(`${ name }To`, date);
                                    setIsOpenCalendar(false);
                              }
                           } }
                           from={ from || new Date() }
                           to={ to }
                        />
                        // <Calendar
                        //    value={ value || new Date() }
                        //    from={ from || new Date() }
                        //    to={ to }
                        //    period={ true }
                        //    onChange={ (date, typeChange) => {
                        //       if (to) {
                        //          onChange(`${ name }To`, null);
                        //          onChange(`${ name }From`, date);
                        //       } else if (from) {
                        //          if (!moment(from).isBefore(date)) {
                        //             onChange(`${ name }From`, date);
                        //          } else {
                        //             onChange(`${ name }To`, date);
                        //          }
                        //       } else {
                        //          onChange(`${ name }From`, date);
                        //       }
                        //    } }
                        //    min={ min }
                        // />
                     )}
                  </div>
               </div>
            </div>
            {data.length ? (
               <div className='input_footer'>
                  {data.map((e) => {
                     return (
                        <div className='input_footer_message' key={ uuidv4() }>
                           <Icon name={ e.status } />
                           <span className={ `input_footer_text input_footer_text_${ e.status }` }>{e.message}</span>
                        </div>
                     );
                  })}
               </div>
            ) : ''}
         </div>
      );
   }
   if (type === 'date') {
      return (
         <div className={ `input_date ${ classI }` } ref={ dataRef }>
            {(label || helpText) && (
               <div className='input_header'>
                  <label htmlFor={ id } className={ `inputNew_label ${ disabled ? 'inputNew_label_disabled' : '' } ${ isError ? 'inputNew_label_error' : '' }` }>{label}</label>
                  {helpText
                     && <span className='inputNew_helper'>{helpText}</span>}
               </div>
            )}
            <ErrorMessageWrapper errorMessages={[...errorMessages, ...localErrorMessages]}>
               <div className={ `inputNew ${ classis } ${ isOpenCalendar ? 'inputNew_active' : '' } ${ disabled ? 'input_new_disabled' : '' }` }>
                  <input
                     id={ id }
                     value={ value ? moment((`${ value.getMonth() + 1 }/${ value.getDate() }/${ value.getFullYear() }`)).format('MMMM DD, YYYY') : '' }
                     name={ name }
                     type='text'
                     ref={ inputRef }
                     disabled={ disabled }
                     onFocus={ () => setClassis('focused') }
                     onBlur={ () => setClassis('') }
                     placeholder={ placeholder || 'Select date' }
                     className=' input_new input_new_date'
                     onClick={ () => (disabled ? {} : setIsOpenCalendar(!isOpenCalendar)) }
                     readOnly
                  />
                  <div className='inputNew_calendar'>
                     <div role='presentation' disabled={ disabled } className={ `inputNew__calendar__icon ${ value ? 'inputNew__calendar__icon__selected' : '' } ${ isOpenCalendar ? 'inputNew__calendar__icon__active' : '' }` } onClick={ () => (disabled ? {} : setIsOpenCalendar(!isOpenCalendar)) }><Icon name='Date' /></div>
                     <div className='calendar__wrapper'>
                        {isOpenCalendar
                           && (
                              <Calendar
                                 value={ value || new Date() }
                                 onChange={ (date, typeChange) => {
                                    if (typeChange === 'select' || typeChange === 'prev-select') {
                                       setIsOpenCalendar(false);
                                    }
                                    onChange(name, date);
                                 } }
                                 min={ min }
                              />
                           )}
                     </div>
                  </div>
               </div>
            </ErrorMessageWrapper>
            {data.length ? (
               <div className='input_footer'>
                  {data.map((e) => {
                     return (
                        <div className='input_footer_message' key={ uuidv4() }>
                           <Icon name={ e.status } />
                           <span className={ `input_footer_text input_footer_text_${ e.status }` }>{e.message}</span>
                        </div>
                     );
                  })}
               </div>
            ) : ''}
         </div>
      );
   }
   if (type === 'time') {
      return (
         <div className={ `${ classI }` }>
            {(label || helpText || IToolTipText) && (
               <div className='input_header'>
                  {!isAnimatedLabel ? (
                     <label htmlFor={ id } className={ `input__default__label ${ disabled ? 'inputNew_label_disabled' : '' } ` }>{label}</label>
                  ) : ''}
                  {helpText
                     && <span className='inputNew_helper'>{helpText}</span>}
                  {IToolTipText && <IToolTip tooltip={ IToolTipText } />}
               </div>
            )}
            <div className={ `inputNew inputNew_${ classis } ${ disabled ? 'input_new_disabled' : '' }` }>
               {isAnimatedLabel && (
                  <label htmlFor={ id } className={ `inputNew_label ${ disabled ? 'inputNew_label_disabled' : '' } label_${ classis } ${ !value && isAnimatedLabel && 'inputNew_label_animation' } ${ isError ? 'inputNew_label_error' : '' }` }>{label}</label>
               )}
               {/* <input
                   id={ id }
                   value={ value }
                   name={ name }
                   type='text'
                   disabled={ disabled }
                   onFocus={ () => {
                      setClassis('focused');
                   } }
                   onBlur={ () => {
                      setClassis('');
                   } }
                   placeholder={ placeholder || '' }
                   onChange={ (e) => { onChange(e.target.name, e.target.value); } }
                   className=' input_new'
                /> */}
               <TimePicker className='inputNew__timepicker' onChange={ (time, timeString) => onChange(name, timeString) } defaultValue={ moment('00:00:00', 'HH:mm:ss') } value={ value ? moment(value, 'HH:mm:ss') : '' } placeholder={ placeholder } />
               {isPassword
                  && <div role='presentation' className='inputNew_icon show-hide' onClick={ () => setTypes(types === 'text' ? 'password' : 'text') }>{types !== 'password' ? <Icon name='Show' /> : <Icon name='UnShown' />}</div>}
            </div>
            {data.length ? (
               <div className='input_footer'>
                  {data.map((e) => {
                     return (
                        <div className='input_footer_message' key={ uuidv4() }>
                           <Icon name={ e.status } />
                           <span className={ `input_footer_text input_footer_text_${ e.status }` }>{e.message}</span>
                        </div>
                     );
                  })}
               </div>
            ) : ''}
         </div>
      );
   }
   if (type !== 'number') {
      // style={ { background: 'rgba(255, 255, 255, 0.05)' } }
      return (
         <div className={ `input ${ classI }` }>
            {(label || helpText || IToolTipText) && (
               <div
                  className='input_header'
                  style={ {
                     justifyContent: newBorderColor ? 'flex-start' : '',
                  } }>
                  {(!isAnimatedLabel && !isLabelHtml) ? (
                     <>
                        <label htmlFor={ id } className={ `input__default__label ${ disabled ? 'inputNew_label_disabled' : '' } ` } style={ { color: textColor } }>{label}</label>
                        {
                           characterLimit && <span className='character__limit'>{value?.length || 0}/{characterLimit}</span>
                        }
                        {
                           newBorderColor && (
                              <span style={ {
                                 color: 'red',
                              } }>*
                              </span>
                           )
                        }
                     </>
                  ) : ''}
                  {helpText
                     && <span className='inputNew_helper'>{helpText}</span>}
                  {IToolTipText && <IToolTip tooltip={ IToolTipText } />}
               </div>
            )}
            {label && isLabelHtml
               && (
                  <div className='input_header html_label'>
                     <label htmlFor={ id } className={ `input__default__label ${ disabled ? 'inputNew_label_disabled' : '' } ` }><div dangerouslySetInnerHTML={ { __html: label } } /> </label>
                  </div>
               )
            }
            <ErrorMessageWrapper errorMessages={ [...errorMessages, ...localErrorMessages] }>
               <div
                  className={ `inputNew inputNew_${ classis } ${ disabled ? 'input_new_disabled' : '' }` }
                  style={ {
                     border: newBorderColor ? `1px solid ${ newBorderColor }` : '',
                  } }>
                  {isAnimatedLabel && !isLabelHtml && (
                     <label htmlFor={ id } className={ `inputNew_label ${ disabled ? 'inputNew_label_disabled' : '' } label_${ classis } ${ !value && isAnimatedLabel && 'inputNew_label_animation' } ${ isError ? 'inputNew_label_error' : '' }` }>{label}</label>
                  )}
                  {
                     leftText && (
                        <span>{ leftText }</span>
                     )
                  }
                  {(!(isDisabledHtmlText || isDiv)) && (
                     <input
                        id={ id }
                        value={ value }
                        name={ name }
                        type={ types }
                        disabled={ disabled }
                        ref={ inputRef }
                        onKeyDown={ onKeyPress }
                        onFocus={ () => {
                           setClassis('focused');
                        } }
                        onBlur={ onBlur ? (e) => { setClassis(''); onBlur(e.target.name, e.target.value, e); } : () => setClassis('') }
                        placeholder={ placeholder || '' }
                        onChange={ (e) => { onChangeTextInput(e); } }
                        className=' input_new'
                        style={ {
                           color: textColor,
                        } }
                     />
                  )}
                  {(isDisabledHtmlText || isDiv)
                  && (
                     <div
                        className='disabledHtmlText'
                        dangerouslySetInnerHTML={ { __html: value } }
                     />
                  )
                  }
                  {isPassword
                     && <div role='presentation' className='inputNew_icon show-hide' onClick={ () => setTypes(types === 'text' ? 'password' : 'text') }>{types !== 'password' ? <Icon name='Show' /> : <Icon name='UnShown' />}</div>}
                  {isHaveCopyButton && (
                     <div role='presentation' className='inputNew__copy__icon' onClick={ () => copyToClipBoard(value) }>
                        <IconNew name='CopyProgramM' />
                     </div>
                  )}
                  {withIcon && (
                     <div className='inputNew__icon' onClick={ () => setOpenModal(name, value) } role='presentation'>
                        {!IToolTipTextNew && <IconNew name={ iconName } />}
                        {IToolTipTextNew && <IToolTipNew tooltip={ IToolTipTextNew } iconName={ iconName } id='tooltip2' />}
                     </div>
                  )}
               </div>
            </ErrorMessageWrapper>
            {data.length ? (
               <div className='input_footer'>
                  {data.map((e) => {
                     return (
                        <div className='input_footer_message' key={ uuidv4() }>
                           <Icon name={ e.status } />
                           <span className={ `input_footer_text input_footer_text_${ e.status }` }>{e.message}</span>
                        </div>
                     );
                  })}
               </div>
            ) : ''}
            {bottomText && (
               <div className='input_footer'>
                  <Text
                     inner={ bottomText }
                     type={ txtTypes.regular148 }
                     style={ { color: '#727978' } }
                     size={ sizes.xsmall }
                  />
               </div>
            )}
         </div>
      );
   }

   return (
      <div className={ `input_number ${ classI }` }>
         {(label || helpText) && (
            <div className='input_header'>
               <label htmlFor={ id } className={ `inputNew_label ${ disabled ? 'inputNew_label_disabled' : '' } ${ isError ? 'inputNew_label_error' : '' }` }>{label}</label>
               {helpText
                  && <span className='inputNew_helper'>{helpText}</span>}
            </div>
         )}
         <ErrorMessageWrapper errorMessages={[...errorMessages, ...localErrorMessages]}>
            <div className={ `inputNew ${ classis } ${ disabled ? 'inputNew_disabled' : '' }` }>
               <input
                  autoComplete={ autoComplete }
                  value={ value }
                  name={ name }
                  type='number'
                  disabled={ disabled }
                  ref={ inputRef }
                  onFocus={ () => setClassis('focused') }
                  onBlur={ () => setClassis('') }
                  placeholder={ placeholder || 'number' }
                  onChange={ onChangeNumberInput }
                  className='input_new  input_number'
                  onKeyDown={ onKeyPress }
               />
               <div className='input_buttons'>
                  <button
                     type='button'
                     className='input_number_button'
                     onMouseDown={ () => (disabled ? {} : onMouseDownInputNumber('+')) }
                     onMouseUp={ disabled ? () => {} : () => onMouseUpInputNumber() }
                  >
                     <Icon name='ArrowUpSmall' />
                  </button>
                  <button
                     type='button'
                     style={ { transformt: 'rotate(90deg)' } }
                     className='input_number_button'
                     onMouseDown={ () => (disabled ? {} : onMouseDownInputNumber('-')) }
                     onMouseUp={ disabled ? () => {} : () => onMouseUpInputNumber() }
                  >
                     <Icon name='ArrowDownSmall' />
                  </button>
               </div>
            </div>
         </ErrorMessageWrapper>
         {/* <div className='input_footer'>
               {data.map((e) => {
                  return (
                     <div className='input_footer_message' key={ uuidv4() }>
                        <Icon name={ e.status } />
                        <span className={ `input_footer_text input_footer_text_${ e.status }` }>{e.message}</span>
                     </div>
                  );
               })}
            </div> */}
      </div>

   );
};

Input.defaultProps = {
   type: 'text',
   isPassword: false,
   placeholder: '',
   value: '',
   name: '',
   classI: '',
   onChange: () => {},
   label: '',
   data: [],
   isError: false,
   onSearch: () => {},
   isAnimatedLabel: false,
   onClearSearchValue: () => {},
   onKeyPress: () => {},
   isCloseHidenOnEmpty: true,
   onBlur: () => {},
   maxNumber: 999999,
   maxlength: 150,
   maxLengthTextArea: 2000,
   setOpenModal: () => {},
};

Input.propTypes = {
   type: PropTypes.string,
   isPassword: PropTypes.bool,
   placeholder: PropTypes.string,
   value: PropTypes.any,
   name: PropTypes.string,
   IToolTipText: PropTypes.string,
   classI: PropTypes.string,
   onChange: PropTypes.func,
   disabled: PropTypes.bool,
   id: PropTypes.string,
   label: PropTypes.string,
   helpText: PropTypes.string,
   data: PropTypes.array,
   isError: PropTypes.bool,
   onSearch: PropTypes.func,
   min: PropTypes.number,
   isAnimatedLabel: PropTypes.bool,
   inputRef: PropTypes.object,
   children: PropTypes.any,
   from: PropTypes.any,
   minNumber: PropTypes.number,
   onClearSearchValue: PropTypes.func,
   onKeyPress: PropTypes.func,
   to: PropTypes.any,
   isCloseHidenOnEmpty: PropTypes.bool,
   isHaveCopyButton: PropTypes.bool,
   withIcon: PropTypes.bool,
   iconName: PropTypes.string,
   bottomText: PropTypes.string,
   onBlur: PropTypes.func,
   maxNumber: PropTypes.number,
   maxlength: PropTypes.number,
   isLabelHtml: PropTypes.bool,
   setOpenModal: PropTypes.func,
   IToolTipTextNew: PropTypes.string,
   isCertificate: PropTypes.bool,
   leftText: PropTypes.string,
   textColor: PropTypes.string,
   inputTextColor: PropTypes.string,
   newBorderColor: PropTypes.string,
   maxLengthTextArea: PropTypes.number,
   isDisabledHtmlText: PropTypes.bool,
   isDiv: PropTypes.bool,
   autoComplete: PropTypes.string,
   characterLimit: PropTypes.string,
   errorMessages: PropTypes.array,
   textareaRef: PropTypes.any,
};

export default Input;
