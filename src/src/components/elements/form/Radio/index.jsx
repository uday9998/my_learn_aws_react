/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import Tooltip from 'components/elements/members/Tooltip';

const RadioBox = ({
   name, checked, onChange, label, className, color, type,
   labelNode, hasTooltip, disabled,
}) => {
   const isChecked = !!checked;
   return (
      <div className={ `radioBox flex ${ className }` }>
         <input type={ type || 'radio' } name={ name } className='save_draft' id={ `save_draft-${ name }` } checked={ isChecked } onChange={ disabled ? () => {} : () => onChange(name, !isChecked) } />
         <label htmlFor={ `save_draft-${ name }` }>
            <Icon name={ isChecked ? 'CheckedCircle' : 'UncheckedCircle' } color={ color } />
            {labelNode || (
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.regular }
                  inner={ label }
                  color='#3f4f65'
               />
            )}
         </label>
         {hasTooltip && (
            <Tooltip
               hintText='Miestro default system generated URL.'
               left={ true }
            />
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
   disabled: PropTypes.bool,
   className: PropTypes.any,
   color: PropTypes.string,
   type: PropTypes.string,
   labelNode: PropTypes.node,
   hasTooltip: PropTypes.bool,
};

RadioBox.defaultProps = {
   checked: false,
   label: 'label',
   className: '',
   color: '',
   disabled: false,
   onChange: () => {},
   type: '',
};
