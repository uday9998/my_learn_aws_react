/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import './index.scss';
import headerImg from 'assets/images/studentsRoom/mainhub.jpg';
import { useTranslate } from 'react-polyglot';
import Auth from 'utils/Auth';
import { useHistory } from 'react-router';
import { freeCourseCommuntiy, joinFreeLessonCourse } from 'api';
import { toast } from 'react-toastify';
import TextView from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/Text';
import isPrint from 'state/modules/designCourse/edit/Error';
import { OfferContext } from 'containers/pages/mixed/offers';
import ClassCard from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/ClassCard';
import { getLandingUrl } from 'utils/url';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import LoaderSpinner from 'components/elements/LoaderSpiner';
// import TextView from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Text';

const CourseCardTemplate1 = ({
   title, content, darkMode, image, primaryTheme, course,
   showEditableComponent, offer, goToCheckout, exploreCourse,
}) => {
   const [handleFreeCourse, { loading }] = useSubmitForm(freeCourseCommuntiy);
   const [imageLoaded, setImageLoaded] = useState(!image);
   const { free_lessons: freeLessons = [] } = course || {};
   const {
      isPreview, isPreview: preview, template, isEditor, selectedOffer,
   } = React.useContext(OfferContext);
   const filteredFreeLessons = freeLessons.filter(freeLesson => freeLesson.lesson_visiblity !== 0);
   const joined = course && course.joined_status === 1;
   const history = useHistory();
   const t = useTranslate();
   if (!offer) {
      return null;
   }
   async function handleViewFreeLessonClick(evt) {
      evt.stopPropagation();
      const courseUrlSearch = filteredFreeLessons[0] ? `?lesson=${ filteredFreeLessons[0].id }` : '';
      //  if (!(course && course.landing_custom_url && course.is_custom_url)) {
      if (Auth.getToken()) {
         if (course.joined_status !== 3) {
            try {
               await joinFreeLessonCourse(course.url);
               window.location.href = `/courses/${ course.url }${ courseUrlSearch }`;
            } catch (e) {
               const { response: { data } = {} } = e;
               if (isPrint(data)) {
                  toast.error(data);
               }
            }
         } else {
            window.location.href = `/courses/${ course.url }${ courseUrlSearch }`;
         }
      } else {
         history.push({
            pathname: '/register',
            state: { freeLessonCourse: course.url },
         });
      }
      // } else {
      //    window.open(LinkHref(course.landing_custom_url), '_blank');
      // }
   }
   const courseLowPrice = () => {
      const freeCourse = [...course.pricings];
      const pricesArr = [];
      if (course && course.pricings && course.pricings.length === 0) {
         return 'FREE';
      }
      if (course && course.pricings && freeCourse.find(freecourse => freecourse.pricing_type === 0)) {
         return 'FREE';
      }
      if (course && course.pricings) {
         course.pricings.forEach(coursePrice => {
            if (coursePrice.currency === 'USD') {
               const priceUsdInfo = {
                  value: coursePrice.price,
                  currency: '$',
               };
               pricesArr.push(priceUsdInfo);
            }
         });
      }
      if (pricesArr.length > 1) {
         pricesArr.sort((a, b) => {
            if (a.value < b.value) return -1;
            return a.value > b.value ? 1 : 0;
         });
      }
      if (pricesArr && pricesArr.length > 0) {
         return pricesArr[0];
      }
      return '';
   };
   const templateType = 'template1';
   const courseDetails = template[5].school_room_components[0].subcomponent;
   const courseContent = template[5];
   const coursName = courseDetails[0];
   const courseDescription = courseDetails[1];
   const courseAuthor = courseDetails[2];
   const textColor = '#5060FF';
   const openItem = () => {
      if (joined && course.type !== '2') {
         window.open(`/courses/${ course.url }`, '_blank');
      } else if (joined && course.type === '2') {
         window.open(`/offers/community/${ course.community_id }`, '_blank'); // open community if joined
      }
   };
   const handleBuy = (plan) => {
      const isLoggined = !!localStorage.getItem('authToken');
      if (selectedOffer.isFree && selectedOffer.plan.pricings.length === 1) {
         if (!isLoggined) {
            window.location = '/login';
            return;
         }
         if (course.type === '2') {
            // window.open(`/offers/community/${ course.community_id }`, '_blank'); // open community if joined
            // return;
            handleFreeCourse({
               courseId: course.id, pricingId: selectedOffer.plan.pricings[0].id,
            }, () => {
               window.open(`/offers/community/${ course.community_id }`, '_blank'); // open community if joined
            });
            return;
         }
         if (isLoggined) {
            handleFreeCourse({
               courseId: course.id, pricingId: selectedOffer.plan.pricings[0].id,
            }, () => {
               window.open(`/courses/${ course.url }`, '_blank'); // open course if joined
            });
         }
         if (course.joined_status !== 3) {
            handleFreeCourse({
               courseId: course.id, pricingId: selectedOffer.plan.pricings[0].id,
            }, () => {
               window.open(`/courses/${ course.url }`, '_blank'); // open course if joined
            });
         }
      }
      if (selectedOffer.plan.active_landing_url) {
         const urlLanding = getLandingUrl(selectedOffer.plan.active_landing_url);
         window.open(urlLanding, '_blank');
         return;
      }
      goToCheckout(plan);
   };

   return (
      <>
         {loading && (
            <LoaderSpinner />
         )}
         <article
            style={ {
               maxWidth: '400px',
            // '--main-color': textColor, '--buttonBgcolor': textColor, '--button-color': '#ddd',
            } }
            role='presentation'
            className={ ` courseCardContent courseCard-${ templateType }` }
         >
            <ClassCard
               slug={ courseContent.school_room_components[0].slug }
               item={ courseContent.school_room_components[0] }
               i={ 0 }
               onClick={ () => openItem() }
               isPreview={ !isPreview }
            >
               <>
                  <div className='courseCard__img'>
                     <div className='courseOverlay hoverVisible'>
                        {filteredFreeLessons.length > 0 && !joined && (courseLowPrice() !== 'FREE' || course.pricings.length > 1) && (
                           <button type='button' className='m-r-m' onClick={ handleViewFreeLessonClick }>
                              <Text inner='Free Preview' size={ TextSize.medium } type={ TextType.medium } style={ { color: 'var(--textColor)', fontFamily: primaryTheme } } />
                           </button>
                        )}
                        {/* <button type='button' onClick={ isPreview && !isDefaultPreview ? () => {} : (e) => handleJoin(e, course.id, course.active_landing_url, course.is_custom_url) }>
                        <Text inner={ (joined && isPreview) ? t('continue') : t('join') } size={ TextSize.medium } type={ TextType.medium } style={ { color: 'var(--textColor)', fontFamily: primaryTheme } } />
                     </button> */}
                        {!joined && !offer.plan.publish_without_integrations && (
                           <button type='button' onClick={ preview ? () => {} : () => handleBuy(offer.plan) }>
                              <Text inner={ (joined && isPreview) ? 'Continue' : 'Join' } size={ TextSize.medium } type={ TextType.medium } style={ { color: 'var(--textColor)', fontFamily: primaryTheme } } />
                           </button>
                        )}
                        {course.type !== '2' && (
                           <button
                              type='button'
                              onClick={ preview ? () => {} : (e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 exploreCourse(course.id);
                              } }
                           >
                              <Text inner='Explore' size={ TextSize.medium } type={ TextType.medium } style={ { color: 'var(--textColor)', fontFamily: primaryTheme } } />
                           </button>
                        )}
                        {joined && course.type === '2' && (
                           <button
                              type='button'
                              onClick={ preview ? () => {} : (e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 openItem(course.community_id);
                              } }
                           >
                              <Text inner='Go To Community' size={ TextSize.medium } type={ TextType.medium } style={ { color: 'var(--textColor)', fontFamily: primaryTheme } } />
                           </button>
                        )}
                     </div>
                     <img src={ image || 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png' } onLoad={ () => setImageLoaded(true) } alt='title' className={ `${ !imageLoaded ? 'hide-img' : '' }` } />
                     {!imageLoaded && (<div className='imageFallback animated-background' />)}
                  </div>
                  <div className={ `course-${ templateType }` }>
                     <TextView
                        { ...coursName.props }
                        slug={ coursName.slug }
                        title={ title }
                        onClick={ (e) => showEditableComponent(e) }
                        style={ { fontSize: templateType === 'template1' ? '21px' : '16px', fontFamily: primaryTheme || 'Avenir Next bold' } }
                        isPreview={ !isPreview }
                     />

                     { (courseDescription.props.hasVisibility
                && courseDescription.props.visibility)
               && (
                  <div className='courseCard__desc'>
                     <TextView
                        { ...courseDescription.props }
                        slug={ courseDescription.slug }
                        title={ content }
                        onClick={ (e) => showEditableComponent(e) }
                        isPreview={ !isPreview }
                        style={ { fontFamily: primaryTheme } }
                     />
                  </div>
               )
                     }
                     <div className='author-price'>
                        {courseAuthor.props.hasVisibility
                   && courseAuthor.props.visibility
               && (
                  <div>
                     {course && course.authors && course.authors[0] && course.authors[0].picture_src && course.authors[0].name && course.authors[0].name !== 'Author' && !course.authors[0].picture_src.includes('default.png')
               && (
                  <div>
                     <img src={ course.authors[0].picture_src } alt='author' />
                  </div>
               )}
                     {course && course.authors && course.authors[0] && course.authors[0].name && course.authors[0].name !== 'Author'
                     && (
                        <div className='author-price-name'>
                           <TextView
                              { ...courseAuthor.props }
                              slug={ courseAuthor.slug }
                              title={ course.authors[0].name }
                              onClick={ (e) => showEditableComponent(e) }
                              style={ { fontFamily: primaryTheme } }
                              isPreview={ isPreview }
                           />
                        </div>
                     )
                     }
                  </div>
               )}
                     </div>
                  </div>
               </>
            </ClassCard>
         </article>
      </>
   );
};


CourseCardTemplate1.propTypes = {
   title: PropTypes.string,
   content: PropTypes.string,
   darkMode: PropTypes.bool,
   image: PropTypes.string,
   url: PropTypes.string,
   primaryTheme: PropTypes.string,
   textColor: PropTypes.string,
   progress: PropTypes.number,
   course: PropTypes.object,
   rates: PropTypes.object,
   courseDetails: PropTypes.array,
   editableSectionFunc: PropTypes.func,
   isPreview: PropTypes.bool,
   showEditableComponent: PropTypes.func,
   templateType: PropTypes.string,
   isDefaultPreview: PropTypes.bool,
   courseContent: PropTypes.object,
   handleJoin: PropTypes.func,
   siteInfo: PropTypes.object,
   offer: PropTypes.object,
   authUser: PropTypes.object,
   uuid: PropTypes.string,
   goToCheckout: PropTypes.func,
   exploreCourse: PropTypes.func,
};

CourseCardTemplate1.defaultProps = {
   title: 'Code Class',
   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
   darkMode: false,
   progress: 0,
   image: headerImg,
   course: {},

};

export default CourseCardTemplate1;
