/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import TextInputRange from 'components/elements/form/TextInputRange';
import Switch from 'components/elements/switchNew';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import './index.scss';
import UploadImage from 'components/modules/uploadImage';


const ImageEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, visibility,
      index, picture_src, width, borderRadius, justifyContent, isClassPic,
      paddingBottom, paddingLeft, paddingRight, paddingTop,
   } = props;
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);
   // const [linkImage, setLinkImage] = useState(isClassPic ? course.thumbnail_image : picture_src);
   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];
   // useEffect(() => {
   //    setLinkImage(course.thumbnail_image);
   // }, [course]);
   return (
      <div className='imageEditable' data-slug={ slug }>
         {!isClassPic && (
            <div>
               <Switch
                  label='Show Image'
                  name='visibility'
                  value={ visibility === true }
                  size='medium'
                  positionText='left'
                  onChange={ () => changeProp(!(visibility === true), 'visibility', 'component', index) }
                  isCommentPage={ true }
                  switchOnOff={ true }
               />
            </div>
         )}
         {/* {isClassPic ? (
            <div>
               <DragAndDropUploadImage
                  onChange={ img => changeProp(img, 'thumbnail_image', 'component', index, '', true) }
                  crop=''
                  src={ linkImage }
               />
            </div>
         ) : ( */}
         <div>
            <UploadImage
               label='Upload Image'
               onChange={ (name, img) => changeProp(img, 'picture_src', 'component', index) }
               src={ picture_src || '' }
               recomendation='1920x800'
               recomendationText='Recommended size – 1920x800'
               isImageUpload={ true }
            />
         </div>
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
               type='select-medium'
               heading=''
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
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
};

export default ImageEditable;
