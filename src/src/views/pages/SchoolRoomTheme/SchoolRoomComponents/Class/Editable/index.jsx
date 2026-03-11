/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import Spacing from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Spacing';
import './index.scss';
import Select from 'components/elements/SelectNew';
import UploadImage from 'components/modules/uploadImage';


const ClassEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar,
      index, picture_src, subIndex,
      courses, paddingTop, paddingBottom, paddingLeft, paddingRight,
      justifyContent, alignItems, slider, classType, offers,
      product_id,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);

   // ;
   const coursesForSelectOption = offers.map(offer => ({
      label: offer.name,
      value: offer.id,
      name: offer.name,
      id: offer.id,
      ...offer,
   }));

   let filteredCourses = coursesForSelectOption;
   let sliderCourses = [];
   sliderCourses = !!slider.subcomponent && slider.subcomponent.filter((course) => course.props.classType === 'slider');
   if (sliderCourses.length !== 0 && classType === 'slider') {
      filteredCourses = coursesForSelectOption.filter((courseOption) => {
         return sliderCourses.filter((sliderCourse) => {
            return sliderCourse.props.product_id === courseOption.id;
         }).length === 0;
      });
   }
   const AlignItemsFlexOptions = [
      { label: 'Top', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Bottom', value: 'flex-end' },
   ];

   const JustifyContentFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];
   // filteredCourses.find((e) => e.value === value)
   const selectedProduct = coursesForSelectOption.find((e) => e.id === product_id);

   const getSliderImg = (image, offer) => {
      let imgDefault = 'remove';
      if (image) {
         if ((offer && offer.type === '2' && offer.communities && offer.communities.file_id)
         || (offer && offer.type !== '2' && !offer.thumbnail_image.includes('thumbnail.png'))) {
            imgDefault = 'change';
         } else {
            imgDefault = '';
         }
         return { image, imgDefault };
      } if (offer && offer.type === '2' && offer.communities && offer.communities.file_id) {
         return { image: offer.communities.file_id, imgDefault };
      } if (offer && offer.type !== '2' && !offer.thumbnail_image.includes('thumbnail.png')) {
         return { image: offer.thumbnail_image, imgDefault };
      }
      return '';
   };

   return (
      <div className='classEditable' data-slug={ slug }>
         <div>
            <div>
               <Select
                  style={ { height: '40px' } }
                  id='course'
                  type='select-medium'
                  placeholder='Choose Product'
                  options={ product_id || product_id === 0
                     ? [...filteredCourses, {
                        label: selectedProduct && selectedProduct.name,
                        value: product_id,
                     }]
                     : filteredCourses }
                  name='product_id'
                  onChange={ (name, value) => {
                     changeProp(value, 'product_id', 'subcomponent', index, subIndex, true);
                  } }
                  icon='Down'
                  value={ product_id }
               />
            </div>
            <div className='m-b-m'>
               <UploadImage
                  onChange={ (name, img) => changeProp(img, 'picture_src', 'subcomponent', index, subIndex, true) }
                  otherProps={ {
                     crop: '1920x1080',
                  } }
                  changeClose={ getSliderImg(picture_src, selectedProduct).imgDefault }
                  src={ getSliderImg(picture_src, selectedProduct).image }
                  size='full'
                  recomendation='1920x1080'
                  cropRatio='1920x1080'
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
                  subIndex={ subIndex }
                  slug={ slug }
                  componentType='subcomponent'
                  unit='px'
                  min={ 0 }
                  max={ 100 }
               />
            </div>
            <div className='m-b-m'>
               <Select
                  label='Justify Content'
                  className=''
                  type='select-medium'
                  heading=''
                  placeholder='Justify Content'
                  value={ justifyContent === 'start' ? 'flex-start' : justifyContent }
                  onChange={ (name, value) => changeProp(value, 'justifyContent', 'subcomponent', index, subIndex) }
                  options={ JustifyContentFlexOptions }
               />
            </div>
            <div className='m-b-m'>
               <Select
                  label='Align Items'
                  className=''
                  type='select-medium'
                  heading=''
                  placeholder='Align Items'
                  value={ alignItems }
                  onChange={ (name, value) => changeProp(value, 'alignItems', 'subcomponent', index, subIndex) }
                  options={ AlignItemsFlexOptions }
               />
            </div>
         </div>
      </div>
   );
};


ClassEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   picture_src: PropTypes.string,
   subIndex: PropTypes.number,
   courses: PropTypes.object,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   product_id: PropTypes.any,
   justifyContent: PropTypes.string,
   alignItems: PropTypes.string,
   slider: PropTypes.object,
   classType: PropTypes.string,
   offers: PropTypes.array,
};

export default ClassEditable;
