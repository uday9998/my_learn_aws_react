import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import TextArea from 'components/elements/form/TextArea';

import './index.scss';


const AddNewScriptItem = ({
   createScript, type, handleScriptInputChange, newScript, mode, currentScript, updateScript, emptyScript,
   addNewScript, setAddNewScript,
}) => {
   let ButtonText = 'Add Header Script';
   let placeHolderText = 'Enter Header Script';
   let labelText = 'Header Script';
   if (type === 'body') {
      ButtonText = 'Add Footer Script';
      placeHolderText = 'Enter Footer Script';
      labelText = 'Footer Script';
   }
   return (
      <div>
         {!addNewScript && mode !== 'edit' && currentScript && !currentScript.id && (
            <div className='m-t-m m-b-m'>
               <BaseButton
                  theme={ btnTheme.greenBordered }
                  size={ btnSize.full }
                  text={ ButtonText }
                  style={ { width: '236px' } }
                  // eslint-disable-next-line no-param-reassign
                  onClick={ () => setAddNewScript(true) }
               />
            </div>
         )}
         {(addNewScript || mode === 'edit') && (
            <div>
               <div className='w-full'>
                  <TextArea
                     label={ labelText }
                     placeholder={ placeHolderText }
                     name={ mode === 'edit' ? 'currentScript' : 'newScript' }
                     value={ newScript }
                     onChange={ (key, value) => handleScriptInputChange(key, value) }
                  />
               </div>
               <div className='flex flex-right'>
                  <div className='m-r-m'>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Cancel'
                        onClick={ () => { emptyScript(); setAddNewScript(false); } }
                     />
                  </div>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.large }
                     text='Save'
                     onClick={ mode === 'edit' ? () => updateScript(currentScript) : () => { createScript({ type, script: newScript }); setAddNewScript(false); } }
                  />
               </div>
            </div>
         )}
      </div>
   );
};

AddNewScriptItem.propTypes = {
   createScript: PropTypes.func,
   type: PropTypes.string,
   handleScriptInputChange: PropTypes.func,
   newScript: PropTypes.string,
   currentScript: PropTypes.object,
   mode: PropTypes.string,
   updateScript: PropTypes.func,
   emptyScript: PropTypes.func,
   addNewScript: PropTypes.bool,
   setAddNewScript: PropTypes.func,
};


export default AddNewScriptItem;
