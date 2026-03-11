/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import { slug } from 'views/pages/DesignCourse/LessonCreate/BlockComponent';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import ImageEmail from './ImageEmail';
import AttachedFile from './AttachedFile';
import Logo from './Logo';
import LinkBlock from './LinkBlock';
import Divider from './Divider';
import TextEmail from './TextEmail';
import Footer from './Footer';
import Address from './Address';
import Button from './Button';
import EmptyBlock from './EmptyBlock';
import SocialMedia from './SocialMedia';
import EmailBlockContainer from './EmailBlockContainer';
import EmailBlock from './EmailBlock';
import './index.scss';


const EmailBlocks = ({
   onChange, setOpenSettings,
   onGeneralSettingsChange, openSettings, email, setEmail, onChooseBlock,
   deleteBlock, reOrderBlocks, duplicateBlock, onFooterChange,
}) => {
   const siteInfo = useSelector(siteInfoSelector);

   const [editableBlockOpen, setEditableBlockOpen] = useState(false);
   let blocksSort = [];
   if (email && email.blocks && !!email.blocks.length) {
      blocksSort = email.blocks.sort((a, b) => {
         return a.order - b.order;
      });
   }

   const addBlock = (type) => {
      const newBlock = {
         'email_format': type,
         slug: slug(),
         order: email.blocks.length,
         css_attributes: {},
      };
      if (type === 'EmptyBlock') {
         newBlock.css_attributes = {
            bg_color: 'inherit',
            height: 32,
         };
      } else if (type === 'Address') {
         newBlock.css_attributes = {
            lineHeight: 2,
            letterSpacing: 1,
            paddingTop: 4,
            paddingBottom: 4,
            bg_color: 'inherit',
            paddingRight: 20,
            paddingLeft: 3,
         };
      } else if (type === 'LinkBlock') {
         newBlock.links = [
            {
               link: '',
               text: 'Link Text',
            },
         ];
         newBlock.css_attributes.gap = 8;
         newBlock.css_attributes.bg_color = 'inherit';
      } else if (type === 'Button') {
         newBlock.links = [
            {
               link: '',
               text: 'Button Text',
            },
         ];
         newBlock.css_attributes = {
            gap: 8,
            style: 'filled',
            fontSize: 14,
            height: 44,
            justifyContent: 'center',
            lineHeight: 2,
            letterSpacing: 1,
            borderRadius: 12,
            amount: 1,
            buttonColor: '#6127FD',
            color: '#FFFFFF',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 4,
            paddingLeft: 4,
            bg_color: 'inherit',
         };
      } else if (type === 'Divider') {
         newBlock.css_attributes = {
            borderStyle: 'solid',
            borderColor: '#A1A5A5',
            borderWidth: 1,
            width: 320,
            justifyContent: 'center',
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 4,
            paddingLeft: 4,
            bg_color: 'inherit',
         };
      } else if (type === 'SocialMedia') {
         newBlock.links = [];

         newBlock.css_attributes = {
            gap: 32,
            icon_color: '#131F1E',
            bg_color: '#FFFFFFF',
            justifyContent: 'center',
            fontSize: 24,
            paddingTop: 4,
            paddingBottom: 4,
            links: [
               {
                  link: '',
                  text: 'Facebook',
               },
               {
                  link: '',
                  text: 'Pinterest',
               },
               {
                  link: '',
                  text: 'Youtube',
               },
               {
                  link: '',
                  text: 'Linkedin',
               },
               {
                  link: '',
                  text: 'Tumblr',
               },
               {
                  link: '',
                  text: 'Dribbble',
               },
               {
                  link: '',
                  text: 'TikTok',
               },
               {
                  link: '',
                  text: 'Discord',
               },
               {
                  link: '',
                  text: 'Twitter',
               },
               {
                  link: '',
                  text: 'Instagram',
               },
               {
                  link: '',
                  text: 'Figma',
               },
               {
                  link: '',
                  text: 'Zoom',
               },
               {
                  link: '',
                  text: 'Telegram',
               },
               {
                  link: '',
                  text: 'Meet',
               },
            ],
         };
      } else if (type === 'Image' || type === 'Logo') {
         newBlock.email_files = [];
         newBlock.css_attributes = {
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 10,
            paddingRight: 10,
            width: type === 'Logo' ? 100 : 500,
            image_link: '',
            bg_color: 'inherit',
         };
      } else if (type === 'AttachedFile') {
         newBlock.email_files = [];
      } else if (type === 'Text') {
         newBlock.css_attributes = {
            letterSpacing: 1,
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 10,
            paddingRight: 10,
            bg_color: 'inherit',
         };
      }

      setEmail({
         ...email,
         blocks: [...email.blocks, newBlock],
      });
      setOpenSettings({ currentIndex: email.blocks.length, currentBlock: newBlock });
   };

   // const min = 0;
   const chooseBlocktype = (blockType, block, index) => {
      let blockName;

      switch (blockType) {
         case 'Text': blockName = (
            <TextEmail
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         case 'Image': blockName = (
            <ImageEmail
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         case 'AttachedFile': blockName = (
            <AttachedFile
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         case 'Logo': blockName = (
            <Logo
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         case 'LinkBlock': blockName = (
            <LinkBlock
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
               onGeneralSettingsChange={ onGeneralSettingsChange }
            />
         );
            break;
         case 'SocialMedia': blockName = (
            <SocialMedia
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         case 'Button': blockName = (
            <Button
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         case 'Divider': blockName = (
            <Divider
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         case 'Address': blockName = (
            <Address
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         case 'EmptyBlock': blockName = (
            <EmptyBlock
               setActiveName={ () => {} }
               onChange={
                  (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
               block={ block }
               openSettings={ openSettings }
            />
         );
            break;
         // case 'Footer': blockName = (
         //    <Footer
         //       setActiveName={ () => {} }
         //       onChange={
         //          (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
         //       block={ block }
         //       openSettings={ openSettings }
         //    />
         // );
         //    break;
         default:
      }
      return blockName;
   };

   return (
      <div className='email__blocks'>
         <div className='email__blocks__code'>
            <div>
               <Text
                  inner='Content'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
               />
            </div>

            <div className='email__blocks__code__dict'>
               {!openSettings && (
                  <div className='email__block__global_settings' onClick={ () => setOpenSettings(true) } role='presentation'>
                     <IconNew name='SettingsProductM' />
                     <Text
                        inner='Global Settings'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
               )}
            </div>
         </div>
         {!!email && ((email.blocks && !email.blocks.length) || email.blocks === null) && (
            <>
               <div className='email__blocks__title'>
                  <div className='email__blocks__title__text'>
                     <Text
                        inner='Ready to begin?'
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
                  <div>
                     <Text
                        inner='Choose a block to start building your email.'
                        type={ txtTypes.regularDefaultSmall }
                        size={ txtSizes.size_28 }
                     />
                  </div>
                  <EmailBlock
                     email={ email }
                     addBlock={ (type) => {
                        addBlock(type, editableBlockOpen);
                        setEditableBlockOpen(false);
                     // setOpenSettings(false);
                     } }
                  />
               </div>

            </>
         )}
         {/* {editableBlockType && (
            <EmailBlockContainer>
               {chooseBlocktype(editableBlockType)}
            </EmailBlockContainer>
         )} */}
         { email && email.blocks && !!email.blocks.length
         && (
            <>
               <div
                  className='blocks_container'
                  // style={ {
                  //    width: '100%',
                  //    backgroundColor: email.css_attributes.bg_color || '#fff',
                  //    paddingTop: `${ (parseInt(email.css_attributes.paddingTop, 10)) }px`,
                  //    paddingBottom: `${ (parseInt(email.css_attributes.paddingBottom, 10)) }px`,
                  // } }
               >
                  { blocksSort.map((block, index) => {
                     return (
                        <EmailBlockContainer
                           onClick={ () => {
                              setEditableBlockOpen(index + 1);
                              setOpenSettings(false);
                           } }
                           key={ block.slug }
                           id={ block.slug }
                           deleteBlock={ () => { deleteBlock(block.slug, block.id); setOpenSettings(true); } }
                           blockId={ block.slug }
                           type={ block.email_format }
                           isActive={ openSettings.currentIndex === index }
                           duplicateBlock={ () => duplicateBlock(block, index + 1) }
                           reOrderBlocks={ (orderType) => reOrderBlocks(orderType, index) }
                           setOpenSettings={ () => setOpenSettings(index + 1) }
                           onChooseBlock={ () => onChooseBlock(block, index) }
                           //  setOpenQuizSettings={ () => setOpenQuizSettings(index + 1) }
                           openSettings={ openSettings }
                           style={ block.css_attributes || {} }
                           email={ email }
                        >
                           { chooseBlocktype(block.email_format, block, index)}
                        </EmailBlockContainer>
                     );
                  }) }

                  <div className='email__block__container__last'>
                     <div className='email__block__container__last__with__white'>
                        <div className='white__space' />
                        <div
                           className='email__block__container__last__add'
                           onClick={ () => {
                              setEditableBlockOpen(email.blocks.length + 1);
                              // setOpenSettings(false);
                           } }
                           role='presentation'
                        ><IconNew name='PlusL' />
                        </div>
                        <div className='white__space' />
                     </div>
                  </div>

                  {!!email && (email.blocks && !!email.blocks.length) && !!editableBlockOpen && (
                     <div className='email__blocks__title'><EmailBlock
                        email={ email }
                        addBlock={ (type) => {
                           addBlock(type, editableBlockOpen);
                           setEditableBlockOpen(false);
                        // setOpenSettings(false);
                        } }
                     />
                     </div>
                  )}

                  <Footer
                     setActiveName={ () => {} }
                     siteInfo={ siteInfo }
                     email={ email }
                     onFooterChange={ onFooterChange }
                     // onChange={
                     //    (name, value, isBlock, originalName) => onChange(name, value, isBlock, originalName, blockType, index) }
                     // block={ block }
                     openSettings={ openSettings }
                  />
               </div>
            </>
         )}
      </div>
   );
};

EmailBlocks.defaultProps = {
   email: '',
};

EmailBlocks.propTypes = {
   email: PropTypes.object,
   duplicateBlock: PropTypes.func,
   deleteBlock: PropTypes.func,
   setOpenSettings: PropTypes.func,
   onChange: PropTypes.func,
   reOrderBlocks: PropTypes.func,
   openSettings: PropTypes.any,
   onGeneralSettingsChange: PropTypes.func,
   setEmail: PropTypes.func,
   onChooseBlock: PropTypes.func,
   onFooterChange: PropTypes.func,
};

export default EmailBlocks;
