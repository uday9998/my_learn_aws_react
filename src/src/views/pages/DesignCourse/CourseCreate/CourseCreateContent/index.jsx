import React, { useEffect, useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useLocation } from 'react-router-dom';

import './index.scss';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Button, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import { isMembershipExist } from 'api/AuthApi';
import { useApiQuery } from 'utils/hooks/useQuery';
import img1 from 'assets/images/first-step-program.png';
import img2 from 'assets/images/second-step-program.png';
import img3 from 'assets/images/third-step-program.png';
import img1Disabled from 'assets/images/membership-disabled.png';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { useSelector, useDispatch } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import _ from 'lodash';
import { coursesSelector } from 'state/modules/designCourse/courses/selectors';
import { getCoursesStart } from 'state/modules/mainhub/actions';
import { getCoursesOperation } from 'state/modules/designCourse/courses/operations';

const CourseCreateContent = ({ onSelect }) => {
   const {
      data: isDisableMembership, loading,
   } = useApiQuery(isMembershipExist);
   const membershipExist = isDisableMembership && isDisableMembership.exists;
   const [productsState, setProductsState] = useState({
      onlineCourse: false,
      community: false,
   });
   const { permissions } = useSelector(siteInfoSelector);
   const courses = useSelector(coursesSelector);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!courses.length) {
         getCoursesOperation(1)(dispatch);
      }
   }, []);

   useEffect(() => {
      const onlineCourseCount = _.filter(courses, ['type', '0']).length;
      const communityCount = _.filter(courses, ['type', '2']).length;

      if (!Array.isArray(permissions) && permissions.commmunities && permissions.course) {
         setProductsState(prevState => {
            return {
               ...prevState,
               community: permissions.commmunities.count === communityCount,
               onlineCourse: permissions.course.courses_count === onlineCourseCount,
            };
         });
      }
   }, [courses]);

   const location = useLocation();
   const [focusedBlock, setFocusedBlock] = useState('first');
   const getImageByBlock = () => {
      if (focusedBlock === 'first') {
         if (!membershipExist) {
            return img1;
         }
         return img1Disabled;
      } if (focusedBlock === 'second') {
         return img2;
      }
      return img3;
   };

   useEffect(() => {
      if (location?.state?.productName) {
         onSelect(location.state.productName);
         location.state.productName = '';
      }
   }, []);

   return (
      <>
         {loading && <LoaderSpinner />}
         {!loading && (
            <div
               className='course__create__content'
            >

               <Text
                  inner='What Type Of Product Would You Like To Create?'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <div className='course__create__content__items '>
                  <div
                     onFocus={ () => {} }
                     className={ membershipExist ? 'course__create__content__item__disabled' : 'course__create__content__item' }
                     role='presentation'
                     onClick={ membershipExist ? null : () => onSelect('program') }
                     onMouseOver={ () => setFocusedBlock('first') }
                  >
                     <div className='course__create__content__item__icon icon__green'>
                        <IconNew name='ProgramVideoL' />
                     </div>
                     <Text
                        inner='Video Membership'
                        type={ types.regular148 }
                        size={ sizes.medium }
                        // style={ membershipExist ? { color: ' #A1A5A5' } : {} }
                     />
                     <Text
                        inner='Create a video membership experience where your audience can access a library of your unique video content.'
                        type={ types.regularLarge }
                        size={ sizes.medium }
                        style={ { color: '#727978', margin: '4px 0px 16px' } }
                     />
                     {/* <div
                  className='course__create__content__item__select'
                  role='presentation'
                  onClick={ () => onSelect('program') }
               >
                  <Text
                     inner='Start Building'
                     type={ types.regular148 }
                     size={ sizes.medium }
                     style={ { textDecoration: 'underline', cursor: 'pointer' } }
                  />
                  <IconNew name='arrowRightProgramM' />
               </div> */}
                     <Button
                        text='Start Building'
                        className='course__create__content__item__select'
                        theme={ btnTheme.secondary }
                        size={ btnSize.largeFull }
                        onClick={ membershipExist ? null : () => onSelect('program') }
                        //  disabled={ membershipExist }
                     />
                  </div>
                  <div
                     onFocus={ () => {} }
                     role='presentation'
                     onClick={ productsState.onlineCourse ? null : () => onSelect('onlineCourse') }
                     className={ productsState.onlineCourse ? 'course__create__content__item__disabled' : 'course__create__content__item' }
                     onMouseOver={ () => setFocusedBlock('second') }
                  >
                     <div className='course__create__content__item__icon icon__blue'>
                        <IconNew name='ProgramCourseL' />
                     </div>
                     <Text
                        inner='Online Course'
                        type={ types.regular148 }
                        size={ sizes.medium }
                     />
                     <Text
                        inner='Turn your expertise into a course that helps you connect with your audience and grow your business.'
                        type={ types.regularLarge }
                        size={ sizes.medium }
                        style={ { color: '#727978', margin: '4px 0px 16px' } }
                     />
                     {/* <div
                  className='course__create__content__item__select'
                  role='presentation'
                  onClick={ () => onSelect('onlineCourse') }
               >
                  <Text
                     inner='Start Building'
                     type={ types.regular148 }
                     size={ sizes.medium }
                     style={ { textDecoration: 'underline', cursor: 'pointer' } }
                  />
                  <IconNew name='arrowRightProgramM' />
               </div> */}
                     <Button
                        text='Start Building'
                        className='course__create__content__item__select'
                        theme={ btnTheme.secondary }
                        size={ btnSize.largeFull }
                        onClick={ () => onSelect('onlineCourse') }
                     />
                  </div>
                  <div
                     onFocus={ () => {} }
                     className={ productsState.community ? 'course__create__content__item__disabled course__community' : 'course__create__content__item course__community' }
                     role='presentation'
                     onClick={ productsState.community ? null : () => onSelect('community') }
                     onMouseOver={ () => setFocusedBlock('third') }
                  >
                     <div className='course__create__content__item__icon icon__pink'>
                        <IconNew name='ProgramCommunityL' />
                     </div>
                     <Text
                        inner='Community'
                        type={ types.regular148 }
                        size={ sizes.medium }
                     />
                     <Text
                        inner='Build an area for your audience to share their common interests and connect with each other.'
                        type={ types.regularLarge }
                        size={ sizes.medium }
                        style={ { color: '#727978', margin: '4px 0px 16px' } }
                     />
                     {/* <div
                  className='course__create__content__item__select'
                  role='presentation'
                  onClick={ () => onSelect('community') }
               >
                  <Text
                     inner='Start Building'
                     type={ types.regular148 }
                     size={ sizes.medium }
                     style={ { textDecoration: 'underline', cursor: 'pointer' } }
                  />
                  <IconNew name='arrowRightProgramM' />
               </div> */}
                     <Button
                        text='Start Building'
                        className='course__create__content__item__select'
                        theme={ btnTheme.secondary }
                        size={ btnSize.largeFull }
                        onClick={ () => onSelect('community') }
                     />
                  </div>
               </div>
               <div className='course__create__content__img'>
                  <img src={ getImageByBlock() } alt='' />
                  {focusedBlock === 'first' && membershipExist && (
                     <div className='course__create__content__img__desc'>
                        <Text
                           inner='You already have a Video Membership.'
                           type={ types.bold }
                           size={ sizes.medium }
                        />
                        <Text
                           inner='At this time, you can only have one'
                           type={ types.regularDefault }
                           size={ sizes.small_14 }
                        />
                     </div>
                  )}
               </div>

            </div>
         )}
      </>
   );
};

CourseCreateContent.propTypes = {
   onSelect: PropTypes.func,
};

export default CourseCreateContent;
