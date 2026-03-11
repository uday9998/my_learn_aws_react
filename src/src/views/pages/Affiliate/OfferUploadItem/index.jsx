import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import UploadWithExtensions from 'components/elements/UploadMediaViews/UploadWithExtensions';
import Line from 'components/elements/Line';
import IconButton from 'components/elements/buttons/IconButton';
import SliceAndConnectText from 'utils/getSplitedText';
import IconNew from 'components/elements/iconsSize';

export const File = ({
   type, data, onDelete,
}) => {
   const [isHiden, setIsHiden] = useState(false);
   if (type === 'image') {
      return (
         <div
            className='affiliate__promotion__file'
            onMouseEnter={ () => setIsHiden(true) }
            onMouseLeave={ () => setIsHiden(false) }
            role='presentation'
         >
            <div className='left'>
               <img src={ data.src || data.file.src } alt='' />
               <Text
                  inner={ SliceAndConnectText(data.name || data.file.name, 16) }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
               />
            </div>
            {isHiden && onDelete && (
               <IconButton
                  name='AffiliateDeleteM'
                  onClick={ () => onDelete() }
               />
            )}
         </div>
      );
   }
   if (type === 'url') {
      return (
         <div
            className='affiliate__promotion__file'
            onMouseEnter={ () => setIsHiden(true) }
            onMouseLeave={ () => setIsHiden(false) }
            role='presentation'
         >
            <div className='link__left'>
               <TextWithIcon
                  inner='External Link'
                  type={ types.regular148 }
                  iconName='BlankAffiliateM'
                  isIconRight={ true }
                  iconGap='5.5'
                  generalStyles={ { cursor: 'pointer' } }
                  onClick={ () => window.open(data.src || data.file.src, '_blank') }
                  size={ sizes.xsmall }
               />
               <Text
                  inner={ SliceAndConnectText(data.src || data.file.src, 20) }
                  type={ types.medium150 }
                  size={ sizes.xx_small }
                  style={ { color: '#727978', cursor: 'pointer' } }
                  onClick={ () => window.open(data.src || data.file.src, '_blank') }
               />
            </div>
            <div className='link__right'>
               {isHiden && onDelete && (
                  <IconButton
                     name='AffiliateDeleteM'
                     onClick={ () => onDelete() }
                  />
               )}
            </div>
         </div>
      );
   }
   return (
      <div
         className='affiliate__promotion__file'
         onMouseEnter={ () => setIsHiden(true) }
         onMouseLeave={ () => setIsHiden(false) }
         role='presentation'
      >
         <div className='left'>
            <div className='img'>
               <IconNew name='FileAffiliateM' />
            </div>
            <Text
               inner={ SliceAndConnectText(data.name || data.file.name, 16) }
               type={ types.regular148 }
               size={ sizes.xsmall }
            />
         </div>
         <div className='right'>
            {isHiden && onDelete && (
               <IconButton
                  name='AffiliateDeleteM'
                  onClick={ () => onDelete() }
               />
            )}
         </div>
      </div>
   );
};

const OfferUploadItem = ({
   isDocument, offer, handleAddPromotion, onDelete, handleAddDocument, imageUrl
}) => {
   const [isOpenContent, setIsOpenContent] = useState(false);
   const [isOpenUpload, setIsOpenUpload] = useState(false);

   const isHaveFiles = !((isDocument && offer.program_documents.length) || (!isDocument && offer.program_promotional_documents.length));

   return (
      <div className='offer__upload__item'>
         <div className='offer__upload__item__top'>
            <div className='offer__upload__item__top__left'>
               <div className='image_wrapper'>
                  <img src={ imageUrl } alt='' />
               </div>
               <div className='content'>
                  <Text
                     inner='Design Master 2.0'
                     type={ types.regular148 }
                     size={ sizes.medium }
                  />
                  {/* <div className='content__links'>
                     <TextWithIcon
                        iconName='LinkAffiliateL'
                        inner='2'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        isIconRight={ false }
                     />
                  </div> */}
               </div>
            </div>
            {
               isHaveFiles && (
                  isOpenContent ? (
                     <Button
                        text='Cancel'
                        theme={ themes.secondary }
                        onClick={ () => setIsOpenContent(false) }
                     />
                  ) : (
                     <Button
                        theme={ themes.secondary }
                        iconName='PlusAffiliateM'
                        isIconLeft={ false }
                        isIconRight={ true }
                        text={ isDocument ? 'Add Program Documents' : 'Add Promotional Materials' }
                        onClick={ () => setIsOpenContent(true) }
                     />
                  )
               )
            }
         </div>
         {(!isHaveFiles || isOpenContent) && (
            <div className='offer__upload__item__bottom'>
               {isDocument ? (
                  <>
                     {offer.program_documents.length !== 0 ? (
                        <>
                           <div className='offer__upload__item__bottom__promotions'>
                              <div className='top'>
                                 <Text
                                    inner={ `Uploaded Files (${ offer.program_documents.length })` }
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                 />
                                 <div className='top__files'>
                                    {offer.program_documents.map((media, index) => {
                                       return (
                                          <File
                                             type={ (media.extension !== undefined || (media.file && media.file.extension !== undefined)) ? 'document' : 'url' }
                                             onDelete={ () => onDelete('document', index, offer.id) }
                                             data={ media }
                                          />
                                       );
                                    })}
                                 </div>
                              </div>
                              <Line />
                              {!isOpenUpload ? (
                                 <Button
                                    text='Upload More Files'
                                    theme={ themes.secondary }
                                    iconName='DefaultUpload'
                                    iconColor='#24554E'
                                    isIconLeft={ false }
                                    isIconRight={ true }
                                    style={ { width: '100%' } }
                                    onClick={ () => setIsOpenUpload(true) }
                                 />
                              ) : (
                                 <UploadWithExtensions
                                    onChange={ (url, name) => {
                                       handleAddDocument(offer.id, {
                                          src: url,
                                          name,
                                          extension: name.split('.').at(-1),
                                       });
                                       setIsOpenUpload(false);
                                    } }
                                    onAddLink={ (link) => {
                                       handleAddDocument(offer.id, {
                                          src: link,
                                          name: 'link',
                                       });
                                       setIsOpenUpload(false);
                                    } }
                                    extensions='webm pdf pptx csv'
                                    linkBottomText='This method will only show affiliates the link where they can go and download all the materials.'
                                    secondaryText='Recommended max size: 100mb'
                                 />
                              )}
                           </div>
                        </>
                     ) : (
                        <UploadWithExtensions
                           onChange={ (url, name) => {
                              handleAddDocument(offer.id, {
                                 src: url,
                                 extension: name.split('.').at(-1),
                                 name,
                              });
                              setIsOpenUpload(false);
                           } }
                           onAddLink={ (link) => {
                              handleAddDocument(offer.id, {
                                 src: link,
                                 name: 'link',
                              });
                              setIsOpenUpload(false);
                           } }
                           extensions='webm pdf pptx csv'
                           linkBottomText='This method will only show affiliates the link where they can go and download all the materials.'
                           secondaryText='Recommended max size: 100mb'
                        />
                     )}
                  </>
               ) : (
                  <>
                     {offer.program_promotional_documents.length !== 0 ? (
                        <>
                           <div className='offer__upload__item__bottom__promotions'>
                              <div className='top'>
                                 <Text
                                    inner={ `Uploaded Files (${ offer.program_promotional_documents.length })` }
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                 />
                                 <div className='top__files'>
                                    {offer.program_promotional_documents.map((media, index) => {
                                       return (
                                          <File
                                             type={ (media.extension !== undefined || (media.file && media.file.extension !== undefined)) ? 'image' : 'url' }
                                             onDelete={ () => onDelete('image', index, offer.id) }
                                             data={ media }
                                          />
                                       );
                                    })}
                                 </div>
                              </div>
                              <Line />
                              {!isOpenUpload ? (
                                 <Button
                                    text='Upload More Files'
                                    theme={ themes.secondary }
                                    iconName='DefaultUpload'
                                    iconColor='#24554E'
                                    isIconLeft={ false }
                                    isIconRight={ true }
                                    style={ { width: '100%' } }
                                    onClick={ () => setIsOpenUpload(true) }
                                 />
                              ) : (
                                 <UploadWithExtensions
                                    onChange={ (url, name) => {
                                       handleAddPromotion(offer.id, {
                                          src: url,
                                          name,
                                          extension: name.split('.').at(-1),
                                       });
                                       setIsOpenUpload(false);
                                    } }
                                    onAddLink={ (link) => {
                                       handleAddPromotion(offer.id, {
                                          name: link,
                                          src: link,
                                       });
                                       setIsOpenUpload(false);
                                    } }
                                    extensions='png jpg jpeg tiff'
                                    linkBottomText='This method will only show affiliates the link where they can go and download all the materials.'
                                    secondaryText='Recommended max size: 100mb'
                                 />
                              )}
                           </div>
                        </>
                     ) : (
                        <UploadWithExtensions
                           onChange={ (url, name) => {
                              handleAddPromotion(offer.id, {
                                 src: url,
                                 name,
                                 extension: name.split('.').at(-1),
                              });
                           } }
                           onAddLink={ (link) => {
                              handleAddPromotion(offer.id, {
                                 name: link,
                                 src: link,
                              });
                              setIsOpenUpload(false);
                           } }
                           extensions='png jpg jpeg tiff'
                           linkBottomText='This method will only show affiliates the link where they can go and download all the materials.'
                           secondaryText='Recommended max size: 100mb'
                        />
                     )}
                  </>
               )}
            </div>
         )}
      </div>
   );
};

OfferUploadItem.propTypes = {
   offer: PropTypes.object,
   isDocument: PropTypes.bool,
   onDelete: PropTypes.func,
   handleAddPromotion: PropTypes.func,
   handleAddDocument: PropTypes.func,
   imageUrl: PropTypes.string,
};

File.propTypes = {
   type: PropTypes.string,
   data: PropTypes.any,
   onDelete: PropTypes.func,
};

export default OfferUploadItem;
