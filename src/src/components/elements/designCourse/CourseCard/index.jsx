/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import './index.scss';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import DropTriggle from 'components/elements/newDropTriggle';
import Status from 'components/elements/statusNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import DesignCourseSectionDripDate from 'components/modules/designCourse/DesignCourseDripDate';
import SearchText from 'components/elements/searchText';
import { useHistory } from 'react-router';
import Router from 'routes/router';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import ChooseStatus from '../ChooseStatus';
import UnpublishWarningModal from '../unpublishWarningModal';

// import CourseDetails from 'components/modules/designCourse/settings/CourseDetails';

const CourseCard = ({
   image, title, isPublished, selectCourse, count,
   handleDuplicateCourse, handleDeleteCourse, handleCourseLinks,
   isShowCourse, showCourse, courseId, courseType, isMultiSelected, isChecked, onCheck, hideCourseHandle,
   search, isMobileTable, publishingDate, allowDelete, planNames, isCommunity, course, courses,
}) => {
   const [openDateModal, setOpenDateModal] = useState(false);
   const [isOpenUnpublishWarngingModal, setIsOpenUnpublishWarngingModal] = useState(false);
   const toggleItems = useRef([]);
   const history = useHistory();
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState(false);

   const handleDuplicate = (e) => {
      if (Array.isArray(permissions)) {
         handleDuplicateCourse(e);
      } else if (courses.length < permissions.course.courses_count) {
         handleDuplicateCourse(e);
      } else {
         setShowPopup(true);
         setPopupTitle('Product');
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   const previewCourse = () => {
      if (course.type === '1') {
         return window.open('/portal/membership', '_blank');
      }
      return window.open(`/programs/${ course.url }`, '_blank');
   };

   const forCopyRef = useRef([
      {
         trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => { selectCourse(); },
      },
   ]);
   const previewRef = useRef([]);

   if ((isPublished === 1 && courseType !== '2') || courseType === '1') {
      previewRef.current = [
         {
            trash: false, iconName: 'eyeGreyM', name: 'Preview', onClick: () => { previewCourse(); },
         },
      ];
   } 


   // if (isPublished === 1) {
   //    toggleItems.current = [
   //       {
   //          trash: false, iconName: isShowCourse ? 'EyeSlashM' : 'eyeM', name: isShowCourse === 1 ? 'Hide' : 'Show', onClick: (e) => { showCourse(e); },
   //       },
   //       {
   //          trash: false, iconName: 'DuplicateMediaM', name: 'Duplicate', onClick: (e) => { handleDuplicateCourse(e); },
   //       },
   //    ];
   // } else {
   toggleItems.current = [
      {
         trash: false,
         iconName: 'DuplicateMediaM',
         name: 'Duplicate',
         onClick: (e) => { handleDuplicate(e); },
      },
   ];
   // }

   toggleItems.current = [...toggleItems.current, {
      trash: true,
      iconName: 'TrashSettingsM',
      name: 'Delete',
      onClick: (e) => { handleDeleteCourse(e); },
      disabled: !allowDelete || count > (isCommunity ? 1 : 0),
      tooltipText: !allowDelete || count > (isCommunity ? 1 : 0) ? 'You can not delete this product.' : '',
   }];

   const statusType = () => {
      let statusText = '';
      let type = '';
      switch (courseType) {
         case '0': statusText = 'Online Course'; type = 'course';
            break;
         case '1': statusText = 'Video Membership'; type = 'publish';
            break;
         case '2': statusText = 'Community'; type = 'drip';
            break;
         default:
      }
      return { statusText, type };
   };

   const handleChangeStatus = (id, data) => {
      if (data === 1 && isPublished === 1 && !allowDelete) {
         setIsOpenUnpublishWarngingModal(true);
      } else if (course.type === '0' && !course.allow_publish && data === 0) {
         if (course.plan_for_course && !!course.plan_for_course.length && course.plan_for_course[0].id) {
            if (isPrint('For publishing a product, you need to add integration.')) {
               toast.error('For publishing a product, you need to add integration.');
            }
            history.push(`${ Router.route('ADMIN_COURSES_PLAN_EDIT').getCompiledPath({ id: course.plan_for_course[0].id }) }#main`);
         } else {
            if (isPrint('For publishing a product, you need to create pricing.')) {
               toast.error('For publishing a product, you need to create pricing.');
            }
            history.push(

               {
                  pathname: `${ Router.route('ADMIN_COURSES_PLAN_CREATE').getCompiledPath({ id: course.id }) }`,
                  state: { saveCourse: true },
               }

            );
         }
      } else if (course.type === '2' && !course.allow_publish && data === 0) {
         if (course.plan_for_course && !!course.plan_for_course.length && course.plan_for_course[0].id) {
            if (isPrint('For publishing a product, you need to add integration.')) {
               toast.error('For publishing a product, you need to add integration.');
            }
            history.push(`${ Router.route('ADMIN_COMMUNITY_PRICING').getCompiledPath({ planId: course.plan_for_course[0].id, id: course.community_id }) }`);
         } else {
            if (isPrint('For publishing a product, you need to create pricing.')) {
               toast.error('For publishing a product, you need to create pricing.');
            }
            history.push(

               {
                  pathname: `${ Router.route('ADMIN_COMMUNITY_PRICING_CREATE').getCompiledPath({ id: course.community_id, courseId: course.id }) }`,
                  state: { saveCourse: true },
               }

            );
         }
      } else {
         hideCourseHandle(id, data);
      }
   };

   return (
      <div className='courseCard__checked'>
         {
            showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
         }
         {isMultiSelected && (
            <CheckBox
               checked={ isChecked }
               onChange={ () => onCheck(!isChecked) }
            />
         )}
         {!isMobileTable && (
            <div
               className='courseCard'
            >
               <div className='courseCard__img'>
                  <img src={ image } alt='bio_image' title='' />
               </div>
               <div className='courseCard__content'>
                  <div className='courseCard__content__left'>
                     <div className='courseCard__content__left__top'>
                        <div style={ { cursor: 'pointer' } } role='presentation' onClick={ () => selectCourse() }>
                           <SearchText
                              textProps={ {
                                 size: textSize.small,
                                 type: textType.regular148,
                                 inner: title,
                              } }
                              activeColor='rgba(0,176,255,0.2)'
                              searchText={ search }
                           />
                        </div>
                        {/* {isShowCourse === 0 && (
                           <div>
                              <Status text='Hidden' type='draft' />
                           </div>
                        )} */}
                     </div>
                     <div className='courseCard__enrolled flex align-center'>
                        <div>
                           <div>
                              <Status text={ statusType().statusText } type={ statusType().type } />
                           </div>
                        </div>
                        <IconNew name='UserS' />
                        <div>
                           <Text
                              size={ textSize.small_14 }
                              type={ textType.regularDefault }
                              inner={ count }
                           />
                        </div>
                        {course.type === '1' && (
                           <>
                              <div className='courseCard__grey__line' />
                              <div className='courseCard__lesson__count'>
                                 <IconNew name='VideoCountS' />
                                 <div>
                                    <Text
                                       size={ textSize.small_14 }
                                       type={ textType.regularDefault }
                                       inner={ course.lessons_count }
                                    />
                                 </div>
                              </div>
                           </>
                        )}

                     </div>

                  </div>
                  {/* {subtitle && (
               <div className='course__subtitle'>
                  <Text
                     type={ textType.regular }
                     size={ textSize.extraSmall }
                     inner={ subtitle }
                  />
               </div>
            ) } */}
                  {/* <div className='m-t-exl courseCard__published'>
               <Text
                  size={ textSize.extraSmall }
                  type={ textType.normal }
                  inner={ isPublished === 1 ? 'Published' : 'Unpublished' }
                  color='#7cb740'
               />
            </div> */}
                  <div className='courseCard__content__right'>
                     <div className='courseCard__actions'>
                        {/* <div className='courseCard__edit' title='Edit'>
                     <Icon name='Pencil' />
                  </div>
                  <div
                     className='courseCard__duplicate'
                     role='presentation'
                     onClick={ (e) => {
                        handleDuplicateCourse(e);
                     } }
                     id={ `class-${ courseId }` }
                     title='Duplicate'
                  >
                     <Icon name='Copy' />
                  </div> */}

                        <div className='courseCard__link' role='presentation' onClick={ (e) => handleCourseLinks(e) } title='Links'>
                           <IconNew name='LinkM' />
                           <div>
                              <Text
                                 size={ textSize.small }
                                 type={ textType.regularDefault }
                                 inner='Links'
                              />
                           </div>
                        </div>


                        {/* {isPublished === 1 && (
                     <div className='courseCard__hide' role='presentation' onClick={ (e) => showCourse(e) } title={ isShowCourse === 1 ? 'Hide' : 'Show' }>
                        <Icon name={ isShowCourse === 1 ? 'EyeSlashShow' : 'EyeSlash' } />
                     </div>
                  )}
                  {count === 0 || count === 1 ? (
                     <div className='courseCard__delete' role='presentation' onClick={ (e) => handleDeleteCourse(e) } title='Delete'>
                        <Icon name='Delete' />
                     </div>
                  ) : '' } */}

                        <ChooseStatus
                           isPublished={ isPublished }
                           onClick={ (data) => {
                              handleChangeStatus(courseId, data);
                           } }
                           openModal={ () => {
                              if (isPublished === 1 && !allowDelete) {
                                 setIsOpenUnpublishWarngingModal(true);
                                 return;
                              }
                              setOpenDateModal(true);
                           } }
                           publishDate={ publishingDate }
                           publishTime=''
                           isCommunity={ courseType === '2' }
                        />

                        {/* {isPublished === 3 && (
                        <div className='courseCard__drip'>
                           {dateUserTimeZoneFormat}
                        </div>
                     )} */}
                        <div>
                           <DropTriggle
                              options={ [
                                 ...previewRef.current,
                                 ...forCopyRef.current,
                                 ...toggleItems.current,
                              ] }
                              isCommunity={ courseType === '2' || courseType === '1' }
                           />
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         )}
         {isMobileTable && (
            <div
               className='courseCard'
            >
               <div className='courseCard__mob'>
                  <div className='courseCard__img'>
                     <img src={ image } alt='bio_image' title='' />
                  </div>
                  <div className='courseCard__content'>
                     <div className='courseCard__content__left'>
                        <div className='courseCard__content__left__top'>
                           <div style={ { cursor: 'pointer' } } role='presentation' onClick={ () => selectCourse() }>
                              <SearchText
                                 textProps={ {
                                    size: textSize.small,
                                    type: textType.regular148,
                                    inner: title,
                                 } }
                                 activeColor='rgba(0,176,255,0.2)'
                                 searchText={ search }
                              />
                           </div>
                        </div>
                        <div className='courseCard__enrolled flex align-center'>
                           <div>
                              <div>
                                 <Status text={ statusType().statusText } type={ statusType().type } />
                              </div>
                           </div>
                           <IconNew name='UserS' />
                           <div>
                              <Text
                                 size={ textSize.small }
                                 type={ textType.regularDefault }
                                 inner={ `${ courseType === '2' ? count : count - 1 < 0 ? 0 : count - 1 }` }
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div>
                  <div className='courseCard__content__right'>
                     <div className='courseCard__actions'>
                        <div className='courseCard__actions__left'>
                           <div className='courseCard__link' role='presentation' onClick={ (e) => handleCourseLinks(e) } title='Links'>
                              <IconNew name='LinkM' />
                              <div>
                                 <Text
                                    size={ textSize.small }
                                    type={ textType.regularDefault }
                                    inner='Links'
                                 />
                              </div>
                           </div>
                           <ChooseStatus
                              isPublished={ isPublished }
                              onClick={ (data) => handleChangeStatus(courseId, data) }
                              openModal={ () => {
                                 if (isPublished === 1 && !allowDelete) {
                                    setIsOpenUnpublishWarngingModal(true);
                                    return;
                                 }
                                 setOpenDateModal(true);
                              } }
                              publishDate={ publishingDate }
                              publishTime=''
                              isMob={ true }
                              isCommunity={ courseType === '2' }
                           />
                        </div>
                        <div>
                           <DropTriggle
                              isMob={ true }
                              options={ [
                                 ...previewRef.current,
                                 ...forCopyRef.current,
                                 ...toggleItems.current,
                              ] }
                              isCommunity={ courseType === '2' }
                           />
                        </div>

                     </div>
                  </div>
               </div>
               {/* {isShowCourse === 0 && (
                  <div className='course__status'>
                     <Status text='Hidden' type='draft' />
                  </div>
               )} */}
            </div>
         )}
         {openDateModal && (
            <DesignCourseSectionDripDate
               onSave={ (status, data) => {
                  hideCourseHandle(courseId, 3, data);
                  setOpenDateModal(false);
               } }
               onCancel={ () => setOpenDateModal(false) }
            />
         )}
         {/* <ApproveModal
                  title='Date of publication'
                  btnText='Save Publication Date'
                  onApprove={ (data) => { hideCourseHandle(courseId, 3, data); setOpenDateModal(false); } }
                  onCancel={ () => setOpenDateModal(false) }
                  isBlogDate={ true }
               /> */}
         {
            isOpenUnpublishWarngingModal && (
               <UnpublishWarningModal
                  onClose={ () => setIsOpenUnpublishWarngingModal(false) }
                  planNames={ planNames }
               />
            )
         }
      </div>
   );
};

CourseCard.propTypes = {
   image: PropTypes.string,
   title: PropTypes.string,
   isPublished: PropTypes.any,
   selectCourse: PropTypes.func,
   count: PropTypes.number,
   showCourse: PropTypes.func,
   handleDuplicateCourse: PropTypes.func,
   handleDeleteCourse: PropTypes.func,
   handleCourseLinks: PropTypes.func,
   isShowCourse: PropTypes.number,
   hideCourseHandle: PropTypes.func,
   isMultiSelected: PropTypes.bool,
   onCheck: PropTypes.func,
   courseId: PropTypes.number,
   courseType: PropTypes.string,
   isChecked: PropTypes.bool,
   search: PropTypes.string,
   isMobileTable: PropTypes.bool,
   publishingDate: PropTypes.string,
   allowDelete: PropTypes.bool,
   planNames: PropTypes.array,
   isCommunity: PropTypes.bool,
   course: PropTypes.object,
   courses: PropTypes.array,
};

CourseCard.defaultValue = {
   image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg',
};

export default CourseCard;
