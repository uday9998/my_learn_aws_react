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
   const initialBorder = borderColor && { border: `2px solid ${ borderColor }` };
   const initialbackground = backgroundColor && { background: `${ backgroundColor }` };
   const checkedStyle = (checkedBorder && { border: `2px solid ${ checkedBorder }` }) || (checkedBackground && { background: `${ checkedBackground }` });

   return (
      <div className='customSwitch' style={ style }>
         <div
            role='presentation'
            className='customSwitch__firstOption'
            style={ Object.assign({}, initialBorder, initialbackground, checked === firstOption.value && checkedStyle) }
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
            <Text
               type={ textType.normal }
               size={ textSizes.small }
               inner={ firstOption.inner }
               color={ checked === firstOption.value ? checkedTextColor : textColor }
            />
         </div>
         <div
            role='presentation'
            className='customSwitch__secondOption'
            style={ Object.assign({}, initialBorder, initialbackground, checked === secondOption.value && checkedStyle) }
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
            <Text
               type={ textType.normal }
               size={ textSizes.small }
               inner={ secondOption.inner }
               color={ checked === secondOption.value ? checkedTextColor : textColor }
            />
         </div>
      </div>
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
