/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import TextInputRange from 'components/elements/form/TextInputRange';
import Spacing from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Spacing';
import './index.scss';
import Switch from 'components/elements/switchNew';
import UploadImage from 'components/modules/uploadImage';
import Select from 'components/elements/SelectNew';


const ImageEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, visibility,
      index, picture_src, width, borderRadius, justifyContent, isClassPic, course,
      paddingBottom, paddingLeft, paddingRight, paddingTop,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];


   return (
      <div className='imageEditable' data-slug={ slug }>
         {!isClassPic && (
            <div>
               <Switch
                  label='Show Image'
                  value={ visibility === true }
                  positionText='left'
                  name='visibility'
                  size='medium'
                  onChange={ (value) => changeProp(value, 'visibility', 'component', index) }
                  isCommentPage={ true }
                  switchOnOff={ true }
               />
            </div>
         )}
         {isClassPic ? (
            <img className='checkout-img' src={ course.thumbnail_image } alt='checkouts' />
         ) : (
            <div>
               <UploadImage
                  onChange={ (name, img) => changeProp(img, 'picture_src', 'component', index) }
                  src={ picture_src || '' }
                  size='full'
                  otherProps={ {
                     cropRatio: '600x400',
                  } }
                  recomendation='600x400'
                  cropRatio='free'
                  isImageUpload={ true }
               />
            </div>
         )}
         <div className='m-t-m'>
            <Spacing
               top={ paddingTop }
               bottom={ paddingBottom }
               left={ paddingLeft }
               right={ paddingRight }
               changeProp={ changeProp }
               index={ index }
               slug={ slug }
            />
         </div>
         <div>
            <TextInputRange
               label='Border Radius (%)'
               type='range'
               leftText={ borderRadius }
               id={ `borderRadius-${ slug }` }
               min={ 0 }
               max={ 100 }
               name='borderRadius'
               value={ borderRadius }
               onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
            />
         </div>
         <div>
            <TextInputRange
               label='Width (px)'
               type='range'
               leftText={ width }
               id={ `width-${ slug }` }
               min={ 0 }
               max={ 560 }
               name='width'
               value={ width }
               onChange={ (value, name) => { changeProp(value, name, 'component', index); } }
            />
         </div>
         <div>
            <Select
               label='Align Image'
               className=''
               heading=''
               type='select-medium'
               placeholder='Align Content'
               value={ justifyContent }
               onChange={ (name, value) => changeProp(value, 'justifyContent', 'component', index) }
               options={ textAlignFlexOptions }
            />
         </div>
      </div>
   );
};


ImageEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   picture_src: PropTypes.string,
   width: PropTypes.string,
   borderRadius: PropTypes.string,
   justifyContent: PropTypes.string,
   visibility: PropTypes.bool,
   isClassPic: PropTypes.bool,
   course: PropTypes.object,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
};

export default ImageEditable;
