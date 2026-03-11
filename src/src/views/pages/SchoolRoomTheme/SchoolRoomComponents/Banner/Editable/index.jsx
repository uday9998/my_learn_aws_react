/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import defaultImg from 'assets/images/studentsRoom/mainhub-header.png';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/switchNew';
import UploadImage from 'components/modules/uploadImage';

const BannerEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, school_show_banner,
      index,
      school_banner_src,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   useEffect(() => {
      changeProp(true, 'school_show_banner', 'component', index);
   }, []);


   return (
      <div className='bannerEditable' data-slug={ slug }>
         <div className='m-t-m m-b-m'>
            <Text
               type={ types.regularDefault }
               size={ sizes.small }
               inner='Banner will show before the slider'
               className='text-center'
               color='#828c9b'
            />
         </div>
         <div className='switch__wrapper'>
            <Switch
               label='Show Banner'
               positionText='left'
               value={ school_show_banner === true }
               name='school_show_banner'
               size='medium'
               // onChange={ (value) => changeProp(value, 'school_show_banner', 'component', index) }
               isCommentPage={ true }
               switchOnOff={ true }
            />
         </div>
         <div style={ { marginTop: '12px' } }>
            <UploadImage
               name='thumbnail_image'
               onChange={ (name, url) => {
                  changeProp(url, 'school_banner_src', 'component', index);
               } }
               src={ school_banner_src === 'Banner Img Src' ? defaultImg : school_banner_src }
               otherProps={ {
                  cropRatio: '1920x1080',
               } }
               size='full'
               recomendation='1920x1080'
               cropRatio='1920x1080'
               isImageUpload={ true }
            />
         </div>
      </div>
   );
};


BannerEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   school_banner_src: PropTypes.string,
   school_show_banner: PropTypes.bool,
};

export default BannerEditable;
