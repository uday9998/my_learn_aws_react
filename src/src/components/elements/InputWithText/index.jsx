import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Input from 'components/elements/inputNew';
import IconNew from '../iconsSize';

const InputWithText = ({
   inputProps, text, copy, label,
}) => {
   return (
      <div className='input__with__text'>
         <div className='input__with__text__label'>
            <Text
               inner={ label }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div>
         <div className='input__with__text__bottom'>
            <Text
               inner={ text }
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
            <div className='input__with__text__bottom__input'>
               <Input
                  { ...inputProps }
               />
               <div
                  className='input__with__text__bottom__input__icon'
                  role='presentation'
                  onClick={ () => copy() }
               >
                  <IconNew name='ProgramCopyL' />
               </div>
            </div>
         </div>
      </div>
   );
};

InputWithText.propTypes = {
   inputProps: PropTypes.object,
   copy: PropTypes.func,
   label: PropTypes.string,
   text: PropTypes.string,
};

export default InputWithText;
