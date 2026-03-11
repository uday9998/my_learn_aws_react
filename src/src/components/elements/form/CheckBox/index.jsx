/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import Icon from 'components/elements/Icon';

const CheckBox = ({
   name, checked, onChange, label, filled, primaryTheme, isStudentRoom, labelNode,
   selectedIcon, notSelectedIcon, color, disabled,
}) => {
   const isChecked = !!checked;
   return (
      filled ? (
         <div className={ disabled ? 'FilledCheckBox FilledCheckBox__disabled' : 'FilledCheckBox' } onClick={ disabled ? () => {} : () => onChange(name, !isChecked) } role='presentation'>
            <Icon name={ isChecked ? selectedIcon : notSelectedIcon } color={ color } />
            <span className='FilledCheckBox__label'>
               {labelNode || (
                  <Text
                     size={ txtSizes.extraSmall }
                     type={ txtType.normal }
                     inner={ label }
                     style={ (isStudentRoom ? { fontFamily: primaryTheme, color } : {}) }
                  />
               )}
            </span>
         </div>
      ) : (
         <div className='CheckBox'>
            <input type='checkbox' name={ name } id='save_draft' checked={ isChecked } onChange={ () => onChange(name, !isChecked) } />
            <label htmlFor='save_draft'>
               {
                  labelNode || (
                     <Text
                        size={ txtSizes.extraSmall }
                        type={ txtType.regular }
                        inner={ label }
                        color='#3f4f65'
                     />
                  )
               }
            </label>
         </div>
      )
   );
};

export default CheckBox;

CheckBox.propTypes = {
   name: PropTypes.string,
   checked: PropTypes.any,
   onChange: PropTypes.func,
   label: PropTypes.any,
   labelNode: PropTypes.node,
   filled: PropTypes.bool,
   isStudentRoom: PropTypes.bool,
   primaryTheme: PropTypes.string,
   disabled: PropTypes.bool,
   color: PropTypes.string,
   selectedIcon: PropTypes.string,
   notSelectedIcon: PropTypes.string,
};

CheckBox.defaultProps = {
   checked: false,
   label: 'label',
   filled: false,
   onChange: () => {},
   isStudentRoom: false,
   selectedIcon: 'Selected',
   notSelectedIcon: 'NotSelected',
   color: '#3F4F65',
};
