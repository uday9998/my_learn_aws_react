/* eslint-disable no-bitwise */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import Text, { SIZES as txtSizes, TYPES as txtTypes } from 'components/elements/TextNew';
import Popover from '@material-ui/core/Popover';
import Icon from 'components/elements/Icon';
import IconNew from 'components/elements/iconsSize';
import Tooltip from 'components/elements/members/Tooltip';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';

const ColorInput = ({
   label, subLabel, name, value, style, placeholder, onChange, withIcon, left,
   hasTooltip, isPageBuilder, isSettings, needHexFromPicker,
   size,
}) => {
   const convertString = {
      'white': '#fff',
   };
   function hexToRgbA(hex) {
      let c;
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
         c = hex.substring(1).split('');
         if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
         }
         c = `0x${ c.join('') }`;

         return {
            r: (c >> 16) & 255,
            g: (c >> 8) & 255,
            b: c & 255,
            a: '1',
         };
      }

      return {
         r: 255,
         g: 255,
         b: 255,
         a: 1,
      };
   }

   const colorInput = useRef();
   const defaultColorInRGB = hexToRgbA(value);

   const siteInfo = useSelector(siteInfoSelector);


   const [displayColorPicker, setDisplayColorPicker] = useState(false);
   const [color, setColor] = useState(defaultColorInRGB);
   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (e) => {
      let topp = 50;
      let paddingBottom = '200px';
      if (window.innerWidth > 1023) {
         topp = 150;
         paddingBottom = '32px';
      }
      setAnchorEl(e.currentTarget);

      if (!displayColorPicker) {
         const body = document.querySelector('body');
         const root = document.querySelector('#root');
         const contentRight = document.querySelector('.content_right');
         const contentLeft = document.querySelector('.content_left');
         const adminContent = document.querySelector('.adminContent') || document.querySelector('.adminContentAlt');
         const mobileSiteHeader = document.querySelector('.mob-siteHeader');
         const siteHeader = document.querySelector('.header');
         let headerHeight;
         if (mobileSiteHeader) {
            headerHeight = mobileSiteHeader.offsetHeight;
         } else headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
         const elTop = e.clientY - headerHeight - topp;
         if (left && contentLeft) {
            contentLeft.style.paddingBottom = paddingBottom;
            contentLeft.style.overflowY = 'hidden';
            contentLeft.scrollTop += elTop;
         } else if (contentRight) {
            contentRight.style.paddingBottom = paddingBottom;
            contentRight.style.overflowY = 'hidden';
            contentRight.scrollTop += elTop;
         }
         if (!isPageBuilder) {
            adminContent.scrollTop += elTop;
         }
         body.style.overflowY = 'hidden';
         root.style.overflowY = 'hidden';
         if (document.querySelector('.adminContent') && !isSettings) {
            adminContent.style.overflowY = 'hidden';
         }
      } else {
         const body = document.querySelector('body');
         const root = document.querySelector('#root');
         const contentRight = document.querySelector('.content_right');
         const contentLeft = document.querySelector('.content_left');
         const adminContent = document.querySelector('.adminContent') || document.querySelector('.adminContentAlt');
         if (left && contentLeft) {
            contentLeft.style.overflowY = 'auto';
            contentLeft.style.paddingBottom = '32px';
         } else if (contentRight) {
            contentRight.style.overflowY = 'auto';
            contentRight.style.paddingBottom = '32px';
         }
         body.style.overflowY = 'auto';
         root.style.overflowY = 'auto';
         if (document.querySelector('.adminContent')) {
            adminContent.style.overflowY = 'auto';
         }
      }
      setDisplayColorPicker(!displayColorPicker);
   };
   const handleClose = () => {
      setDisplayColorPicker(false);
      setAnchorEl(null);
      const body = document.querySelector('body');
      const root = document.querySelector('#root');
      const contentRight = document.querySelector('.content_right');
      const contentLeft = document.querySelector('.content_left');
      const adminContent = document.querySelector('.adminContent') || document.querySelector('.adminContentAlt');
      if (left && contentLeft) {
         contentLeft.style.overflowY = 'auto';
         contentLeft.style.paddingBottom = '32px';
      } else if (contentRight) {
         contentRight.style.overflowY = 'auto';
         contentRight.style.paddingBottom = '32px';
      }
      body.style.overflowY = 'auto';
      root.style.overflowY = 'auto';
      if (document.querySelector('.adminContent') && !isSettings) {
         adminContent.style.overflowY = 'unset';
      }
   };

   useEffect(() => {
      return () => {
         handleClose();
      };
   }, []);

   const handleChange = (checkedColor) => {
      if (needHexFromPicker) {
         onChange(colorInput.current.name, checkedColor.hex);
         setColor(`rgba(${ checkedColor.rgb.r }, ${ checkedColor.rgb.g }, ${ checkedColor.rgb.b }, ${ checkedColor.rgb.a })`);
         return;
      }

      setColor(`rgba(${ checkedColor.rgb.r }, ${ checkedColor.rgb.g }, ${ checkedColor.rgb.b }, ${ checkedColor.rgb.a })`);
      onChange(colorInput.current.name, `rgba(${ checkedColor.rgb.r }, ${ checkedColor.rgb.g }, ${ checkedColor.rgb.b }, ${ checkedColor.rgb.a })`);
   };

   const handleOnBlur = (e) => {
      // const validHex = /^#[0-9A-F]{3,6}$/i.test(e.target.value);
      const hexRegex = /^#?([a-fA-F0-9]{3}){1,2}([a-fA-F0-9]{2})?$/;
      const rgbRegex = /^rgba?\((\s*\d+\s*),(\s*\d+\s*),(\s*\d+\s*)(,\s*(0|1|0\.\d+))?\)$/;
      if (!hexRegex.test(e.target.value) && !rgbRegex.test(e.target.value)) {
         onChange(e.target.name, null);
      }
   };

   const handleInputChange = (e) => {
      onChange(e.target.name, e.target.value);
      const rgb = hexToRgbA(e.target.value);
      setColor(rgb);
   };

   const styles = reactCSS({
      'default': {
         color: {
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            border: 'solid 1px #E7E9E9',
            background: value || '#fff',
         },
         colorswatch: {
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            background: value || '#fff',
         },
         colorMainhub: {
            width: '48px',
            height: '48px',
            borderRadius: '0 4px 4px 0px',
            background: value || `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
         },
         swatch: {
            padding: '0px',
            background: value || '#fff',
            borderRadius: '1px',
            display: 'inline-block',
            cursor: 'pointer',
         },
         swatchMainhub: {
            padding: '0px',
            background: value || '#fff',
            borderRadius: '0 4px 4px 0px',
            display: 'inline-block',
            cursor: 'pointer',
         },
         popover: {
            position: 'absolute',
            zIndex: '2',
            right: '30px',
            top: '42px',
            paddingBottom: '20px',
         },
         cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
         },
      },
   });

   function rgbaToHex(rgba) {
      // const parts = rgba.substring(rgba.indexOf('(')).split(',');
      // const r = parseInt(parts[0].substring(1), 10);
      // const g = parseInt(parts[1], 10);
      // const b = parseInt(parts[2], 10);
      // const a = parseFloat(parts[3].substring(0, parts[3].length - 1));

      // const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

      // if (a === 1) {
      //    return hex;
      // }
      // let alphaHex = Math.round(a * 255).toString(16);
      // if (alphaHex.length === 1) {
      //    alphaHex = `0${ alphaHex }`;
      // }
      // return hex + alphaHex;
      // Check if the input is in the correct format (e.g., rgba(255, 0, 0, 0.5))
      const rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/;
      const match = rgba.match(rgbaRegex);

      // If the input doesn't match the expected format, return null
      if (!match) {
         return null;
      }

      // Extract RGBA values from the match
      const [, red, green, blue, alpha] = match;

      // Convert RGBA values to hexadecimal format
      const redHex = Number(red).toString(16).padStart(2, '0');
      const greenHex = Number(green).toString(16).padStart(2, '0');
      const blueHex = Number(blue).toString(16).padStart(2, '0');
      const alphaHex = alpha ? Math.round(Number(alpha) * 255).toString(16).padStart(2, '0') : 'ff';

      // Construct the hexadecimal color value
      return `#${ redHex }${ greenHex }${ blueHex }${ alphaHex }`;
   }


   const convertHexToRGB = (hex) => {
      // if (!hex.includes('#')) {
      //    return hex;
      // }
      // let c;
      // if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      //    c = hex.substring(1).split('');
      //    if (c.length == 3) {
      //       c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      //    }
      //    c = `0x${ c.join('') }`;
      //    return `rgba(${ [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') },1)`;
      // }
      if (convertString[hex]) {
         return convertString[hex];
      }
      // if (hex.includes('#')) {
      //    return hex.replaceAll('#', '');
      // }
      if (hex.includes('rgb')) {
         return rgbaToHex(hex);
      }
      return hex;
   };

   return (
      <div className='colorInput'>
         <div className='colorInput__label m-t-exs flex'>
            <Text
               size={ size ? txtSizes[`${ size }`] : txtSizes.small }
               type={ txtTypes.regularDefault }
               inner={ label }
            />
            { hasTooltip && (
               <Tooltip
                  hintText='This will change the color of the lessons, buttons and other features in the Watch Room.'
               />
            )}
         </div>
         {
            subLabel && (
               <div className='colorInput__subLabel m-t-exs'>
                  <Text
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.xsmall }
                     inner={ subLabel }
                     line24
                  />
               </div>
            )
         }
         <div className='colorInput__wrapper m-t-exs'>
            <div className='colorInput__inputWrapper'>
               <div style={ withIcon ? styles.color : styles.swatchMainhub } onClick={ (e) => handleClick(e) } className={ withIcon ? 'colorInput__picker' : 'colorInput__pickerMainhub' }>
                  <div style={ withIcon ? styles.colorswatch : styles.colorMainhub } />
               </div>
               <div className='colorHash'>
                  <IconNew name='colorHash' />
               </div>
               <input
                  type='text'
                  name={ name }
                  style={ style }
                  placeholder={ placeholder }
                  value={ value ? convertHexToRGB(value) : '' }
                  onChange={ handleInputChange }
                  className='colorInput__input'
                  ref={ colorInput }
                  onBlur={ handleOnBlur }
               />

               <Popover
                  open={ displayColorPicker }
                  anchorEl={ anchorEl }
                  onClose={ handleClose }
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
                  <div>
                     <div onClick={ handleClose } />
                     <SketchPicker color={ color } onChangeComplete={ handleChange } />
                  </div>
               </Popover>
            </div>
            {/* {
               withHint && (
                  <div className='hintIcon'>
                     <Icon name='Hint' color='#C2CEDB' />
                  </div>
               )
            } */}
         </div>
      </div>


   );
};

ColorInput.propTypes = {
   placeholder: PropTypes.string,
   label: PropTypes.string,
   style: PropTypes.object,
   subLabel: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func,
   name: PropTypes.string,
   isSettings: PropTypes.bool,
   withIcon: PropTypes.bool,
   left: PropTypes.bool,
   hasTooltip: PropTypes.bool,
   isPageBuilder: PropTypes.bool,
   needHexFromPicker: PropTypes.bool,
   size: PropTypes.string,
};

ColorInput.defaultProps = {
   placeholder: '#ffffff',
   label: 'Color',
   isSettings: true,
   withIcon: true,
   left: false,
   isPageBuilder: false,
};

export default ColorInput;
