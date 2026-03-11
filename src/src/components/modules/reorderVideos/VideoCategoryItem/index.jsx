import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import UploadImage from 'components/modules/uploadImage';
import Button from 'components/elements/buttons/BaseButtonNew';
import Seo from 'components/modules/Seo';
import LinkViewWithEditOneLine from 'components/modules/LinkViewWithEditOneLine';
import LinkEdit from 'components/elements/LinkEdit';

const VideoCategoryItem = ({
   item, rename, isCategorySettings, goToSettings, setIsOpenDeletePopup,
   seo, setSeo, removeCategory,
}) => {
   const [isOpenRename, setIsOpenRename] = useState(false);
   const [newName, setNewName] = useState('');
   const [newImg, setNewImg] = useState(item.picture_src);
   const [newDesc, setNewDesc] = useState(item.description);
   const [isOpenDesc, setIsOpenDesc] = useState(false);
   const inputRef = useRef(null);

   useEffect(() => {
      if (!item.id) {
         setIsOpenRename(true);
      }
   }, []);

   useEffect(() => {
      if (!item.id) {
         if (inputRef.current) {
            inputRef.current.focus();
         }
      }
   }, [isOpenRename]);

   const saveName = async (link) => {
      const { data: { errors = {} } = {} } = await rename({ name: link }, item.id) || {};

      if (Object.values(errors).length) return errors;

      setNewName('');
      setIsOpenRename(false);
   };

   const saveCategoryLink = async (url, setLink, onClose) => {
      const { data: { errors = {} } = {} } = await rename({ link: url }, item.id) || {};

      if (Object.values(errors).length) return errors;

      setLink('');
      onClose(false);
   };

   return (
      <div className='videoCategoryItem__category'>
         <div className='videoCategoryItem__category__img'>
            <UploadImage
               src={ newImg === 'thumbnail.png' ? null : newImg }
               disabled={ !item.id }
               cropRatio='1920x1080'
               onChange={ (name, value) => {
                  setNewImg(value);
                  if (value !== item.picture_src) {
                     rename({
                        picture_src: value,
                     }, item.id);
                  }
               } }
               isImageUpload={ true }
               name='picture_src' />
            { (!newImg || newImg === 'thumbnail.png') && (
               <Text
                  inner='Recommended size – 1920 x 1080'
                  size={ sizes.xsmall }
                  type={ types.regularDefaultGrey }
               />
            )}
         </div>
         <div className='videoCategoryItem__content'>
            <div className='videoCategoryItem__category__name'>
               {!isOpenRename && (
                  <div className='videoCategoryItem__category__name__edit'>
                     <Text
                        inner={ item.name }
                        size={ sizes.medium }
                        type={ types.bold }
                     />
                     <div
                        className='videoCategoryItem__top__right__block'
                        role='presentation'
                        onClick={ () => {
                           setIsOpenRename(true);
                           setNewName(item.name);
                        } }
                     >
                        <IconNew name='RenameCategoryM' />
                     </div>
                  </div>
               )}
               {isOpenRename && (
                  <LinkEdit
                     editableLink={ newName }
                     allowSpacing={ true }
                     maxLength={ 190 }
                     minLength={ 1 }
                     inputRef={ inputRef }
                     errorMessage='The Name field is required.'
                     onClose={ () => {
                        setIsOpenRename(false);
                        setNewName('');
                        if (!item.id) {
                           removeCategory();
                        }
                     } }
                     onSave={ saveName }
                  />
               )}
               {!isOpenRename && !isCategorySettings && (
                  <div className='videoCategoryItem__top__right'>
                     <div
                        className='videoCategoryItem__top__right__block_icon'
                        role='presentation'
                        onClick={ () => window.open(`/portal/membership/${ item.link }`, '_blank') }
                     >
                        <IconNew name='EyeM' />
                     </div>
                     <div
                        className='videoCategoryItem__top__right__block_icon'
                        role='presentation'
                        onClick={ () => goToSettings(item.id) }
                     >
                        <IconNew name='SettingsM' />
                     </div>
                     {!item.is_default && (
                        <div
                           className='videoCategoryItem__top__right__block_icon videoCategoryItem__top__right__block_icon__delete'
                           role='presentation'
                           onClick={ () => setIsOpenDeletePopup(true) }
                        >
                           <IconNew name='TrashCategoryM' />
                        </div>
                     )}
                  </div>
               )}
            </div>
            <div className='videoCategoryItem_desc'>
               {item.description && !isOpenDesc && (
                  <Text
                     inner={ item.description }
                     size={ sizes.xsmall }
                     type={ types.regularDefault }
                  />
               )}
               {!isOpenDesc && item.description && (
                  <div
                     className='videoCategoryItem__top__right__block'
                     role='presentation'
                     onClick={ () => {
                        setNewDesc(item.description);
                        setIsOpenDesc(true);
                     } }
                  >
                     <IconNew name='RenameCategoryM' />
                  </div>
               )}

               {!isOpenDesc && !item.description && (
                  <Button
                     iconName='plusNew'
                     theme='tertiaryGreen'
                     size='xsmall'
                     text='Add Category Description'
                     isIconRight={ true }
                     disabled={ !item.id }
                     isHidenDiv={ true }
                     onClick={ () => {
                        setNewDesc(item.description);
                        setIsOpenDesc(true);
                     } }
                     iconColor='#24554E'
                  />
               )}
               {isOpenDesc && (
                  <LinkEdit
                     editableLink={ newDesc }
                     allowSpacing={ true }
                     isTextarea={ true }
                     maxLength={ 190 }
                     minLength={ 1 }
                     errorMessage=''
                     onClose={ () => {
                        setIsOpenDesc(false);
                        setNewDesc('');
                     } }
                     onSave={ (link) => {
                        rename({
                           description: link,
                        }, item.id);
                        setNewDesc('');
                        setIsOpenDesc(false);
                     } }
                  />
               )}
            </div>
            {isCategorySettings
            && <div className='videoCategoryItem__margin' />
            }
            {isCategorySettings && (
               <LinkViewWithEditOneLine
                  label='Category Link'
                  copyUrl={ `${ window.location.origin }/portal/membership/${ item.link }` }
                  isValid={ true }
                  constantUrlStart={ `${ window.location.origin }/portal/membership/` }
                  editableLink={ item.link }
                  constantUrlEnd=''
                  onSave={ saveCategoryLink }
               />
            )}
            {isCategorySettings && (
               <Seo
                  rename={ rename }
                  inputs={ item }
                  seo={ seo }
                  setSeo={ setSeo } />
            )}
         </div>

      </div>
   );
};

VideoCategoryItem.propTypes = {
   item: PropTypes.object,
   isCategorySettings: PropTypes.bool,
   rename: PropTypes.func,
   goToSettings: PropTypes.func,
   setIsOpenDeletePopup: PropTypes.func,
   seo: PropTypes.object,
   setSeo: PropTypes.func,
   removeCategory: PropTypes.func,
};

export default VideoCategoryItem;
