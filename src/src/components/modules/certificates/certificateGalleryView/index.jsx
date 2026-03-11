import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
// import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
// import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import { uniqueId } from 'lodash';

const CertificateGalleryView = ({
   galleryItems, onSelectGalleryItem, activeThumbnail,
}) => {
   return (
      <div className='certificate__view__gallery'>
         {/* <div className='certificate__view__gallery__canva'>
            <Text
               inner='Your own design'
               type={ TextType.regularDefault }
               size={ TextSize.small }
            />
            <BaseButton
               text='Design'
               iconName='CanvaCertificateM'
               isIconRight={ true }
               theme={ btnThemes.canva }
               onClick={ () => {} }
            />
         </div> */}
         {galleryItems.map((item) => {
            return (
               <div key={ uniqueId() } className='certificate__view__gallery__content'>
                  <div className='certificate__view__gallery__divider' />
                  <div role='presentation' onClick={ () => onSelectGalleryItem(item) } className='certificate__view__gallery__item'>
                     <img
                        src={ item.img }
                        alt=''
                        style={ { border: activeThumbnail === item.name ? '1px solid #24554E' : '' } }
                     />
                  </div>
               </div>
            );
         })}
      </div>
   );
};
CertificateGalleryView.propTypes = {
   galleryItems: PropTypes.array,
   onSelectGalleryItem: PropTypes.func,
   activeThumbnail: PropTypes.string,
};

export default React.memo(CertificateGalleryView, (prevProps, nextProps) => {
   return prevProps.activeThumbnail === nextProps.activeThumbnail;
});
