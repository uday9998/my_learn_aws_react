import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';

const PostEditorInlineEdtior = ({ positionElement }) => {
   const [isOpenInsertLink, setIsOpenInsertLink] = useState(false);
   const [link, setLink] = useState('');
   const element = document.querySelector('trix-editor');
   const handleInlineEditorChange = (type) => {
      if (type === 'italic') {
         if (!element.editor.attributeIsActive('italic')) {
            element.editor.activateAttribute('italic');
            return;
         }
         element.editor.deactivateAttribute('italic');
         return;
      }
      if (!element.editor.attributeIsActive('bold')) {
         element.editor.activateAttribute('bold');
         return;
      }
      element.editor.deactivateAttribute('bold');
   };

   const handleInsertLink = () => {
      setIsOpenInsertLink(false);
      setLink('');
      if (!element.editor.attributeIsActive('href')) {
         element.editor.activateAttribute('href', link);
         return;
      }
      element.editor.deactivateAttribute('href');
   };

   const handleOrderList = () => {
      if (!element.editor.attributeIsActive('bullet')) {
         element.editor.activateAttribute('bullet');
         return;
      }
      element.editor.deactivateAttribute('bullet');
   };

   const handleNumberedList = () => {
      if (!element.editor.attributeIsActive('number')) {
         element.editor.activateAttribute('number');
         return;
      }
      element.editor.deactivateAttribute('number');
   };

   const isActiveClass = (name) => {
      if (element.editor.attributeIsActive(name)) {
         return ' trix-custom-editor-innerEditor-button-active';
      }
      return '';
   };

   const openLink = () => {
      if (!element.editor.attributeIsActive('href')) {
         setIsOpenInsertLink(true);
         return;
      }
      element.editor.deactivateAttribute('href');
   };

   const head1 = () => {
      if (!element.editor.attributeIsActive('heading1')) {
         element.editor.activateAttribute('heading1');
         return;
      }
      element.editor.deactivateAttribute('heading1');
   };


   return (
      <ClickOutside onClick={ () => {} }>
         <div
            className='trix-custom-editor-innerEditor'
            style={ {
               top: positionElement.y,
               left: positionElement.x,
            } }
         >
            {isOpenInsertLink ? (
               <div className='trix-custom-editor-innerEditor-link'>
                  <Input
                     name='link'
                     placeholder='Paste link...'
                     onChange={ (name, value) => setLink(value) }
                  />
                  <Button text={ !isActiveClass('href') ? 'Link' : 'Unlink' } onClick={ () => handleInsertLink() } />
               </div>
            ) : (
               <>
                  <div
                     className={ `trix-custom-editor-innerEditor-button${ isActiveClass('italic') }` }
                     role='presentation'
                     onClick={ () => handleInlineEditorChange('italic') }
                  >
                     <IconNew name='trixItalic' />
                  </div>
                  <div
                     className={ `trix-custom-editor-innerEditor-button${ isActiveClass('bold') }` }
                     role='presentation'
                     onClick={ () => handleInlineEditorChange() }
                  >
                     <IconNew name='trixBold' />
                  </div>
                  <div
                     className={ `trix-custom-editor-innerEditor-button${ isActiveClass('heading1') }` }
                     role='presentation'
                     onClick={ () => head1() }
                  >
                     <IconNew name='trixHeading1' />
                  </div>
                  <div
                     className={ `trix-custom-editor-innerEditor-button${ isActiveClass('number') }` }
                     role='presentation'
                     onClick={ () => handleNumberedList() }
                  >
                     <IconNew name='trixInlineNumber' />
                  </div>
                  <div
                     className={ `trix-custom-editor-innerEditor-button${ isActiveClass('bullet') }` }
                     role='presentation'
                     onClick={ () => handleOrderList() }
                  >
                     <IconNew name='trixInlineFirst' />
                  </div>
                  <div
                     className={ `trix-custom-editor-innerEditor-button${ isActiveClass('href') }` }
                     role='presentation'
                     onClick={ () => openLink() }
                  >
                     <IconNew name='trixLinkInline' />
                  </div>
               </>
            )}
         </div>
      </ClickOutside>
   );
};

PostEditorInlineEdtior.propTypes = {
   positionElement: PropTypes.object,
};

export default PostEditorInlineEdtior;
