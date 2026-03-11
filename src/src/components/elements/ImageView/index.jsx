/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { SIZES as btnSizes, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';

const ImageView = ({
   src, setIsOpenChangeModal, clear, changeClose, fileType, name,
}) => {
   return (
      <div className='image__view'>
         {
            fileType !== 'video' ? (
               <div>
                  {src && (
                     <img src={ src } className='image__view__prev' alt='' />
                  )}
                  <div className='image__view__content'>
                     <BaseButton
                        theme={ btnTheme.change }
                        className='image__view__change'
                        text={ name === 'banner_image' ? 'Replace Image' : 'Change Image' } 
                        onClick={ () => setIsOpenChangeModal(true) }
                        iconName={ name === 'banner_image' ? 'ChangeImage' : '' }
                        isIconRight={ true }
                     />
                     {changeClose !== 'remove' && (
                        <BaseButton
                           theme={ btnTheme.change }
                           size={ btnSizes.small }
                           text=''
                           iconName={ (changeClose === 'change' && 'ChangeImage') || (name === 'banner_image' ? 'ClearImageTrash' : 'ClearImage') }
                           className='image__view__clear'
                           onClick={ () => clear() }
                        />
                     )}
                  </div> 
               </div>
            ) : (
               <div className='video__wrapper'>
                  <BaseButton
                     theme={ btnTheme.change }
                     className='image__view__change'
                     text='Change Video'
                     onClick={ () => {
                        setIsOpenChangeModal(true);
                     } }
                  />
                  {changeClose !== 'remove' && (
                     <BaseButton
                        theme={ btnTheme.change }
                        size={ btnSizes.small }
                        text=''
                        iconName={ (changeClose === 'change' && 'ChangeImage') || 'ClearImage' }
                        className='image__view__clear'
                        onClick={ () => clear() }
                     />
                  )}
                  <video src={ src } />
               </div>
            ) 
         }
      </div>
   );
};

ImageView.propTypes = {
   src: PropTypes.string,
   setIsOpenChangeModal: PropTypes.func,
   clear: PropTypes.func,
   changeClose: PropTypes.string,
   fileType: PropTypes.string,
   name: PropTypes.string,
};

export default ImageView;
