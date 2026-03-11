import React from 'react';
import './index.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';

export const LabelPositions = {
   left: 'left',
   right: 'right',
};

const CheckBox = ({
   name, checked, onChange, label, disabled, labelPosition, iconType, textProps, textSize,
   labelStyle, checkBoxColor, previewMode, generalProps, isError, textColor
}) => {
   const isChecked = !!checked;
   return (
      <div
         onClick={ disabled ? () => {} : (e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange(name, !isChecked);
         } }
         role='presentation'
         className={
            classNames(
               'checkBox',
               {
                  'checkBox__disabled': disabled,
                  'checkBox__isChecked__disabled': isChecked && disabled,
                  'checkBox__isChecked': isChecked && !disabled,
                  'checkBox__isNotChecked': !isChecked && !disabled,
                  'checkBox__left': !!label && labelPosition === 'left',
                  'checkBox__error': isError,
               })
         }
      >
         <div className='checkBox__square'>
            {isChecked && (iconType === 'icon' ? <Icon name='Checkbox' /> : (<div className='checkBox__square__icon' />))}
         </div>
         {!!label && (
            <div className='checkBox__label'>
               {
                  !labelStyle ? (
                     <Text
                        size={ textSize ? textSizes[textSize] : textSizes.medium }
                        type={ textTypes.regular }
                        inner={ label }
                        { ...textProps }
                        style={ { ...labelStyle, color: textColor || (previewMode && generalProps.other_page_section.props.textColor) } }
                     />
                  ) : (
                     <span
                        style={ {
                           color: (previewMode && generalProps.other_page_section.props.textColor) || labelStyle.color,
                           fontWeight: 'bold',
                           fontSize: '14px',
                        } }
                        className='checkbox_text'>I agree to the <span id='selected'>Terms of Service</span> and <span id='selected'>Privacy Policy</span>
                     </span>
                  )  
               }
            </div>
         )}
      </div>
   );
};

export default CheckBox;

CheckBox.propTypes = {
   name: PropTypes.string,
   checked: PropTypes.any,
   onChange: PropTypes.func,
   label: PropTypes.any,
   iconType: PropTypes.string,
   disabled: PropTypes.bool,
   textProps: PropTypes.object,
   labelPosition: PropTypes.string,
   textSize: PropTypes.string,
   labelStyle: PropTypes.object,
   checkBoxColor: PropTypes.string,
   previewMode: PropTypes.bool,
   generalProps: PropTypes.object,
   isError: PropTypes.bool,
   textColor: PropTypes.string,
};

CheckBox.defaultProps = {
   checked: false,
   label: '',
   onChange: () => {},
   labelPosition: 'right',
   iconType: 'icon',
};
