/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import classNames from 'classnames';

export const Themes = {
   light: 'light',
   dark: 'dark',
};

export const LabelPositions = {
   left: 'left',
   right: 'right',
};

const RadioBox = ({
   name, checked, onChange, label, labelPosition, disabled, theme, borderColor,
}) => {
   const isChecked = !!checked;
   return (
      <div
         onClick={ disabled ? () => {} : () => onChange(name, !isChecked) }
         role='presentation'
         className={
            classNames(
               'radioBox',
               {
                  [`radioBox__${ theme }`]: theme,
                  'radioBox__disabled': disabled,
                  'radioBox__isChecked__disabled': isChecked && disabled,
                  'radioBox__isChecked': isChecked && !disabled,
                  'radioBox__isNotChecked': !isChecked && !disabled,
                  'radioBox__left': !!label && labelPosition === 'left',
               })
         }
      >
         <div
            className='radioBox__circle'
            style={ {
               border: borderColor && checked ? `1px solid ${ borderColor }` : '',
            } }>
            {isChecked && <div className='radioBox__circle__checked' style={ { background: borderColor || '' } } />}
         </div>
         {!!label && (
            <div className='radioBox__label'>
               <Text
                  size={ textSizes.medium }
                  type={ textTypes.regular }
                  inner={ label }
               />
            </div>
         )}
      </div>
   );
};

export default RadioBox;

RadioBox.propTypes = {
   name: PropTypes.string,
   checked: PropTypes.any,
   onChange: PropTypes.func,
   label: PropTypes.any,
   theme: PropTypes.string,
   labelPosition: PropTypes.string,
   disabled: PropTypes.bool,
   borderColor: PropTypes.string,
};

RadioBox.defaultProps = {
   checked: false,
   label: 'label text',
   onChange: () => {},
   theme: 'light',
   labelPosition: 'right',
   disabled: false,
};
