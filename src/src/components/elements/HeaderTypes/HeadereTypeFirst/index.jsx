import React from 'react';
import PropTypes from 'prop-types';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import SwitchNew from 'components/elements/switchNew';

import './index.scss';

const HeaderTypeFirst = ({
   title, goBack, onSave, buttonText, buttonProps = {}, isPlaylist, handleSaveAndContinue,
   previewPlaylist, isMobile, handleShowActionMenu, isFirstPage, createPlaylist, handleChangeShowSearch,
   isOpenSearch, isBridge, handleChange, bridge,
}) => {
   const handleSaveAndClose = () => {
      handleSaveAndContinue();
      goBack();
   };

   const getButtons = () => {
      if (isPlaylist && !isMobile) {
         return (
            <div className='playlist__buttons__wrapper'>
               <Button
                  iconName='CheckoutActiveEyeM'
                  isIconRight={ true }
                  text='Preview'
                  theme={ themes.secondary }
                  size={ btnSizes.small }
                  style={ { maxHeight: '44px' } }
                  onClick={ previewPlaylist }
               />
               <Button
                  text='Save'
                  size={ btnSizes.large }
                  { ...buttonProps }
                  onClick={ handleSaveAndContinue }
               />
               <Button
                  text='Save & Close'
                  size={ btnSizes.large }
                  { ...buttonProps }
                  onClick={ handleSaveAndClose }
               />
            </div>
         );
      } if (isPlaylist && isMobile) {
         return (
            <Button
               isIconRight={ true }
               text='Actions'
               theme={ themes.secondary }
               size={ btnSizes.small }
               style={ { maxHeight: '44px' } }
               onClick={ handleShowActionMenu }
            />
         );
      }
      if (isBridge) {
         return (
            <div className='playlist__buttons__wrapper'>
               <SwitchNew
                  value={ bridge.enableBridge }
                  onChange={ (value) => handleChange('enableBridge', value) }
                  size='medium'
                  label='Show'
                  positionText='left'
               />
               <Button
                  iconName='CheckoutActiveEyeM'
                  isIconRight={ true }
                  text='Preview Connect Page'
                  theme={ themes.secondary }
                  size={ btnSizes.small }
                  style={ { maxHeight: '44px' } }
                  onClick={ previewPlaylist }
               />
               <Button
                  text='Save & Close'
                  size={ btnSizes.large }
                  { ...buttonProps }
                  onClick={ handleSaveAndClose }
               />
            </div>
         );
      }  
   };

   return (
      <div className='header__type__first'>
         <div className='header__type__first__left'>
            {goBack && <Icon name='ArrowBackNew' onClick={ goBack } />}
            <Text
               inner={ title }
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
         </div>
         {
            isFirstPage && isMobile && (
               <div className='search__add__wrapper'>
                  <div role='presentation' onClick={ handleChangeShowSearch }>
                     <IconNew name={ isOpenSearch ? 'PlaylistCloseSearch' : 'PlaylistSearch' } />
                  </div>
                  {
                     !isOpenSearch && (
                        <Button
                           theme={ themes.primary }
                           size={ btnSizes.new_small_weight }
                           text='Add New Playlist'
                           iconName='Plus'
                           isIconRight={ true }
                           onClick={ createPlaylist }
                        />
                     )
                  }
                  
               </div>
            )
         }
         {onSave && (
            <div className='header__type__first__right'>
               <Button
                  text={ buttonText || 'Save & Close' }
                  size={ btnSizes.large }
                  { ...buttonProps }
                  onClick={ onSave }
               />
            </div>
         )}
         {
            getButtons()
         }
      </div>
   );
};

HeaderTypeFirst.propTypes = {
   title: PropTypes.string,
   goBack: PropTypes.func,
   onSave: PropTypes.func,
   handleSaveAndContinue: PropTypes.func,
   buttonProps: PropTypes.object,
   buttonText: PropTypes.string,
   isPlaylist: PropTypes.bool,
   isMobile: PropTypes.bool,
   isOpenSearch: PropTypes.bool,
   isFirstPage: PropTypes.bool,
   previewPlaylist: PropTypes.func,
   handleShowActionMenu: PropTypes.func,
   handleChangeShowSearch: PropTypes.func,
   createPlaylist: PropTypes.func,
   isBridge: PropTypes.bool,
   bridge: PropTypes.object,
   handleChange: PropTypes.func,
};

export default HeaderTypeFirst;
