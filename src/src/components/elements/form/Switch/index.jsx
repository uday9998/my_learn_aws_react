/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import './index.scss';

const Switch = ({
   name, checked, onChange, isCommentPage, switchOnOff, label, disabled,
}) => {
   return (
      <div>
         {label && (
            <Text
               size={ textSize.extraSmall }
               type={ textType.demiBold }
               inner={ label }
               className='m-r-exs'
               color='#3f4f65'
            />
         )}
         <label className={ `${ isCommentPage ? 'switch_old switch__green' : 'switch_old' } ${ disabled ? 'disabled-checker' : '' }` }>
            <input disabled={ disabled } type='checkbox' checked={ checked } onChange={ (e) => onChange(name, e.target.checked) } />
            <span className='slider round' />
            {switchOnOff && <div className={ checked ? 'switchOnOff up' : 'switchOnOff dn' } data-content={ checked ? 'ON' : 'OFF' } />}
         </label>
      </div>
   );
};

export default Switch;

Switch.propTypes = {
   name: PropTypes.string,
   checked: PropTypes.bool,
   onChange: PropTypes.func,
   isCommentPage: PropTypes.bool,
   switchOnOff: PropTypes.bool,
   disabled: PropTypes.bool,
   label: PropTypes.string,
};

Switch.defaultProps = {
   checked: false,
   isCommentPage: false,
   label: '',
   disabled: false,
};
