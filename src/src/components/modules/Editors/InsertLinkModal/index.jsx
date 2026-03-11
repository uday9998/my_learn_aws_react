import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Modal from 'components/elements/Modal';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import Input from 'components/elements/inputNew';

const InsertLinkModal = ({
   linkText, setLinkText, linkURL, setLinkURL, handleLinkInsert, setShowLinkModal, 
}) => {
   return (
      <Modal>
         <div className='editor__approve__modal'>
            <div className='editor__approve__modal__background' />
            <div className='editor__approve__modal__content'>
               <Text
                  inner='Add Link'
                  type={ txtTypes.medium }
                  size={ txtSizes.xxlarge }
               />
               <div className='editor__approve__modal__content__inputs'>
                  <Input
                     label='Text'
                     type='text'
                     value={ linkText }
                     name='text'
                     onChange={ (name, value) => setLinkText(value) }
                     placeholder='Enter display text'
                  />
                  <Input
                     label='Link'
                     type='text'
                     value={ linkURL }
                     name='link'
                     onChange={ (name, value) => setLinkURL(value) }
                     placeholder='Enter link URL'
                  />
               </div>
               <div className='editor__approve__modal__content__footer'>
                  <BaseButton
                     text='Cancel'
                     size={ btnSize.large120 }
                     theme={ btnTheme.secondary }
                     onClick={ () => { setShowLinkModal(false); setLinkURL(''); setLinkText(''); } }
                  />
                  <BaseButton
                     text='Insert Link'
                     theme={ btnTheme.primary }
                     size={ btnSize.large120 }
                     onClick={ handleLinkInsert }
                  />                   
               </div>
            </div>
         </div>
      </Modal>
   );
};


InsertLinkModal.propTypes = {
   linkText: PropTypes.string,
   setLinkText: PropTypes.func, 
   linkURL: PropTypes.string,
   setLinkURL: PropTypes.func, 
   handleLinkInsert: PropTypes.func, 
   setShowLinkModal: PropTypes.func,
};
 
export default InsertLinkModal;