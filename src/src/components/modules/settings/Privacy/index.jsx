import React from 'react';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
// import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import './index.scss';
import EditorConvertToHTML from 'components/modules/editor';

// import { terms, privacy } from './data';

const Privacy = ({
   mainhubSettings, onChange, handleFormSubmit,
   // handleCancelChanges,
}) => (

   <DynamicWrapper title='Terms & Privacy' backColor='#ffffff' openedBackColor='#ffffff' openedHasShadow isOpen={ false }>
      <div className='w-full m-t-m privacy'>
         <Text
            type={ TextType.normal }
            size={ TextSize.extraSmall }
            inner='Terms'
         />

         <div className='w-full'>
            <EditorConvertToHTML
               description={ mainhubSettings.terms || '' }
               onChange={ (data) => {
                  onChange('terms', data);
               } }
            />

         </div>

      </div>
      <div className='w-full m-t-m privacy'>
         <Text
            type={ TextType.normal }
            size={ TextSize.extraSmall }
            inner='Privacy'
         />

         <div className='w-full'>
            <EditorConvertToHTML
               description={ mainhubSettings.privacy || '' }
               onChange={ (data) => {
                  onChange('privacy', data);
               } }
            />

         </div>

      </div>
      <div className='privacy__btns'>
         {/* <div>
            <BaseButton
               theme={ btnTheme.grey }
               size={ btnSize.large }
               text='Cancel'
               onClick={ () => handleCancelChanges('privacy') }
            />
         </div> */}
         <div>
            <BaseButton
               size={ btnSize.large }
               text='Save'
               onClick={ () => handleFormSubmit('privacy') }
            />
         </div>
      </div>
   </DynamicWrapper>
);

Privacy.propTypes = {
   mainhubSettings: PropTypes.object,
   onChange: PropTypes.func,
   handleFormSubmit: PropTypes.func,
   // handleCancelChanges: PropTypes.func,
};


export default Privacy;
