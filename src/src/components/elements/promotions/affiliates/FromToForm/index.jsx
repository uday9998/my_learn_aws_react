import React from 'react';
import './index.scss';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import TextInput from 'components/elements/form/TextInput';

const FromToForm = () => {
   return (
      <div className='fromToForm'>
         <TextInput
            placeholder='From'
            label=''
            style={ { padding: '7px 16px' } }

         />
         <TextInput
            placeholder='To'
            label=''
            style={ { padding: '7px 16px' } }
         />
         <BaseButton
            theme={ btnTheme.lightBlue }
            size={ btnSize.large }
            text='Show'
         />
      </div>
   );
};

export default FromToForm;
