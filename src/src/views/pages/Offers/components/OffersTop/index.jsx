import React, { useEffect, useState } from 'react';
import './index.scss';
import { OfferContext } from 'containers/pages/mixed/offers';
import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import PropTypes from 'prop-types';
import OfferSliderItem from '../OfferSliderItem';
import OffersHeader from '../OffersHeader';
import SchoolRoomBanner from '../Banner';
import OffersSlider from '../OffersSlider';
import OfferSliderItemTemplate2 from '../OfferSliderItem/sliderItemTemplate2';
import OfferSliderItemTemplate3 from '../OfferSliderItem/sliderItemTemplate3';
import HeroDefaultSection from '../HeroDefaultSection';

const OffersTop = ({
   addClass,
}) => {
   const {
      onClickElement,
      isEditor,
      selectedOffer,
      schoolRoomSettings,
      template,
      selectedOfferCourse,
      user,
      handleBuyOffer,
      products,
      isCategoryFrontPage,
      changeProp,
      isPreview,
      isPortal,
      isBridgePage,
   } = React.useContext(OfferContext);
   const sections = template;
   const hero = sections[2];
   const [templateName, setTemplateName] = useState('');
   const heroComponents = hero.school_room_components;
   const slider = heroComponents[1];
   const banner = heroComponents[0];
   let sliderArray = [];
   const siteInfo = useSelector(siteInfoSelector);

   useEffect(() => {
      const templateName = localStorage.getItem('templateName');

      if (templateName && (window.location.pathname.includes('admin') || window.location.pathname.includes('temp-portal'))) {
         setTemplateName(templateName);
      }

      return () => {
         localStorage.removeItem('templateName');
      };
   }, []);

   if (!isCategoryFrontPage) {
      if (banner.props.school_show_banner && banner.props.school_banner_src) {
         sliderArray.push(
            <SchoolRoomBanner
               { ...banner.props }
               slug={ banner.slug }
               picture_src={ banner.props.school_banner_src }
               key={ banner.slug }
               height={ hero.school_room_section.props.school_slider_height }
               title={ banner.subcomponent[0].props.text || '' }
               showOpacity={ hero.school_room_section.props.school_header_opacity }
               sliderOpacity={ hero.school_room_section.props.opacity }
               bannerTitle={
                  banner.subcomponent[0]
               }
            />
         );
      }

      if (!!slider.subcomponent && !!slider.subcomponent.length) {
         slider.subcomponent.forEach((course) => {
            if (course.props.product_id && course.props.classType === slider.props.school_class_type) {
               const product = products.find((e) => e.id === course.props.product_id);
               
               const productImage = product?.thumbnail_image || 
                                  product?.image || 
                                  product?.file?.src ||
                                  course.props.picture_src;


               const enhancedProps = {
                  ...course.props,
                  picture_src: productImage,
               };

               if (schoolRoomSettings.school_room_theme_name === 'template2' || templateName === 'template2') {
                  sliderArray.push(
                     <OfferSliderItemTemplate2
                        height={ hero.school_room_section.props.school_slider_height }
                        showOpacity={ hero.school_room_section.props.school_header_opacity }
                        sliderOpacity={ hero.school_room_section.props.opacity }
                        { ...enhancedProps }
                        offer={ product }
                        slug={ course.slug }
                        subcomponent={ course.subcomponent }
                        user={ user }
                        titleProps={ course.subcomponent[0].props }
                        descriptionProps={ {} }
                        buttonProps={ course.subcomponent[1].props }
                        secondButtonProps={ {} }
                        lessonsCount={ 0 }
                        coursesCount={ 0 }
                        key={ course.slug }
                     />
                  );
               } else if (schoolRoomSettings.school_room_theme_name === 'template3' || templateName === 'template3') {
                  sliderArray.push(
                     <OfferSliderItemTemplate3
                        height={ hero.school_room_section.props.school_slider_height }
                        showOpacity={ hero.school_room_section.props.school_header_opacity }
                        sliderOpacity={ hero.school_room_section.props.opacity }
                        { ...enhancedProps }
                        offer={ product }
                        slug={ course.slug }
                        subcomponent={ course.subcomponent }
                        user={ user }
                        titleProps={ course.subcomponent[0].props }
                        descriptionProps={ {} }
                        buttonProps={ course.subcomponent[1].props }
                        secondButtonProps={ {} }
                        lessonsCount={ 0 }
                        coursesCount={ 0 }
                        key={ course.slug }
                     />
                  );
               } else {
                  sliderArray.push(
                     <OfferSliderItem
                        height={ hero.school_room_section.props.school_slider_height }
                        showOpacity={ hero.school_room_section.props.school_header_opacity }
                        sliderOpacity={ hero.school_room_section.props.opacity }
                        { ...enhancedProps }
                        offer={ product }
                        slug={ course.slug }
                        subcomponent={ course.subcomponent }
                        user={ user }
                        titleProps={ course.subcomponent[0].props }
                        descriptionProps={ {} }
                        buttonProps={ course.subcomponent[1].props }
                        secondButtonProps={ {} }
                        lessonsCount={ 0 }
                        coursesCount={ 0 }
                        key={ course.slug }
                     />
                  );
               }
            }
         });
      }

      if (selectedOffer) {
         if (schoolRoomSettings.school_room_theme_name === 'template3' || templateName === 'template3') {
            sliderArray = [
               <OfferSliderItemTemplate3
                  height={ hero.school_room_section.props.school_slider_height }
                  offer={ selectedOffer.plan }
                  user={ user }
                  picture_src={ selectedOffer.plan?.file?.src || 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png' }
                  showOpacity={ hero.school_room_section.props.school_header_opacity }
                  sliderOpacity={ hero.school_room_section.props.opacity }
                  handleBuyOffer={ handleBuyOffer }
                  showPrimaryButton={ !(Boolean(user) && selectedOffer.plan.joined) }
                  coursesCount={ selectedOffer.courses_count }
                  lessonsCount={ selectedOffer.lessons_count }
                  key="selected-offer-template3"
               />,
            ];
         } else if (schoolRoomSettings.school_room_theme_name === 'template2' || templateName === 'template2') {
            sliderArray = [
               <OfferSliderItemTemplate2
                  height={ hero.school_room_section.props.school_slider_height }
                  offer={ selectedOffer.plan }
                  user={ user }
                  picture_src={ selectedOffer.plan?.file?.src || 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png' }
                  handleBuyOffer={ handleBuyOffer }
                  showPrimaryButton={ !(Boolean(user) && selectedOffer.plan.joined) }
                  alignItems='flex-start'
                  justifyContent='center'
                  showOpacity={ hero.school_room_section.props.school_header_opacity }
                  coursesCount={ selectedOffer.courses_count }
                  lessonsCount={ selectedOffer.lessons_count }
                  key="selected-offer-template2"
               />,
            ];
         } else {
            sliderArray = [
               <OfferSliderItem
                  height={ hero.school_room_section.props.school_slider_height }
                  showOpacity={ hero.school_room_section.props.school_header_opacity }
                  sliderOpacity={ hero.school_room_section.props.opacity }
                  offer={ selectedOffer.plan }
                  user={ user }
                  alignItems='center'
                  justifyContent='start'
                  paddingLeft='45'
                  picture_src={ selectedOffer.plan?.file?.src || 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png' }
                  handleBuyOffer={ handleBuyOffer }
                  showPrimaryButton={ !(Boolean(user) && selectedOffer.plan.joined) }
                  lessonsCount={ selectedOffer.lessons_count }
                  coursesCount={ selectedOffer.courses_count }
                  key="selected-offer-template1"
               />,
            ];
         }
      }
   }

   const slug = template[2].school_room_section.slug;
   const schoolSliderStatus = template[2].school_room_section.props.school_slider_status;
   const findedTemplate = templateName 
      ? siteInfo.all_school_room.find(
         template => template.school_room_theme_name === templateName
      )?.css.default_banner_liquid.content
      : null;

   return (
      <div
         className={ `offers__top ${ templateName || schoolRoomSettings.school_room_theme_name } ` }
      >
         <OffersHeader
            isPreview={ !isEditor }
            schoolSliderStatus={ schoolSliderStatus }
         />
         {
            !isBridgePage && !isCategoryFrontPage && (
               <Section
                  slug={ slug }
                  item={ template[2] }
                  i={ 2 }
                  onClick={ (e) => { 
                     onClickElement(e);
                  } }
                  isPreview={ !isEditor }
                  dontMarkOnHover={ !(sliderArray.length) }
               >
                  {
                     !!schoolSliderStatus && !selectedOfferCourse && !isCategoryFrontPage && sliderArray.length ? (
                        <OffersSlider
                           sliderArray={ sliderArray }
                           height={ hero.school_room_section.props.school_slider_height }
                           isPreview={ !isEditor }
                           showOpacity={ hero.school_room_section.props.school_header_opacity }
                           sliderOpacity={ hero.school_room_section.props.opacity }
                           defaultSliderTemplate={ findedTemplate || schoolRoomSettings.css.default_banner_liquid.content }
                           schoolRoomThemeName={ templateName || schoolRoomSettings.school_room_theme_name }
                        />
                     ) : !isPortal && template[2].school_room_section.props.school_slider_status && window.location.pathname.includes('admin') ? (
                        <HeroDefaultSection
                           heroData={ hero }
                           changeProp={ changeProp }
                           onClick={ onClickElement }
                           isPreview={ isEditor }
                           onClickElement={ onClickElement }
                           addClass={ addClass }
                        />
                     ) : null
                  }
               </Section>
            )
         }
      </div>
   );
};

OffersTop.propTypes = {
   addClass: PropTypes.func,
};

export default OffersTop;