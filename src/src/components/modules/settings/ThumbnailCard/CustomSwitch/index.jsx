/* eslint-disable max-len */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Icon from 'components/elements/Icon';

const CustomSwitch = ({
   firstOption, secondOption, icon, borderColor, style, name,
   checkedBorder, backgroundColor, checkedBackground, onClick, checked, textColor, checkedTextColor,
}) => {
   const initialBorder = borderColor && { border: `1px solid ${ borderColor }`, boxShadow: `0px 0 0px 1px ${ borderColor }` };
   const initialbackground = backgroundColor && { background: `${ backgroundColor }` };
   const checkedStyle = (checkedBorder && { border: `2px solid ${ checkedBorder }` }) || (checkedBackground && { background: `${ checkedBackground }` });

   return (
      <>
         <Text
            size={ textSizes.extraSmall }
            type={ textType.normal }
            inner='Color Palettes'
         />
         <div className='customSwitch__mainhub' style={ style }>
            <div
               role='presentation'
               className='customSwitch__firstOption'
               style={ Object.assign({}, initialbackground, checked === firstOption.value && initialBorder) }
               onClick={ () => onClick(name, firstOption.value) }
            >
               {
                  icon
               && (
                  <div className='customSwitch__icon'>
                     <Icon name={ icon } color='#7cb740' />
                  </div>
               )
               }
               {/* <Text
                  type={ textType.normal }
                  size={ textSizes.small }
                  inner={ firstOption.inner }
                  color={ checked === firstOption.value ? checkedTextColor : textColor }
               /> */}
               <span className='pallette1-color-1' />
               <span className='pallette1-color-2' />
               <span className='pallette1-color-3' />
               <span className='pallette1-color-4' />
            </div>
            <div
               role='presentation'
               className='customSwitch__secondOption'
               style={ Object.assign({}, initialbackground, checked === secondOption.value && initialBorder) }
               onClick={ () => onClick(name, secondOption.value) }
            >
               {
                  icon
               && (
                  <div className='customSwitch__icon'>
                     <Icon name={ icon } color='#006dff' />
                  </div>
               )
               }
               <span className='pallette-color-1' />
               <span className='pallette-color-2' />
               <span className='pallette-color-3' />
               <span className='pallette-color-4' />
               {/* <Text
                  type={ textType.normal }
                  size={ textSizes.small }
                  inner={ secondOption.inner }
                  color={ checked === secondOption.value ? checkedTextColor : textColor }
               /> */}
            </div>
         </div>
      </>
   );
};

CustomSwitch.propTypes = {
   firstOption: PropTypes.object.isRequired,
   secondOption: PropTypes.object.isRequired,
   icon: PropTypes.string,
   borderColor: PropTypes.string,
   backgroundColor: PropTypes.string,
   checkedBackground: PropTypes.string,
   checkedBorder: PropTypes.string,
   checkedTextColor: PropTypes.string,
   textColor: PropTypes.string,
   onClick: PropTypes.func,
   checked: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
   ]),
   name: PropTypes.string,
   style: PropTypes.object,
};


export default CustomSwitch;
