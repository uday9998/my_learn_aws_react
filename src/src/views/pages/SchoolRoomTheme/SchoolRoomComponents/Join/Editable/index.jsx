import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Select from 'components/elements/SelectNew';


const JoinEditable = ({
   courses, selectedClass, setSelectedClass, goTo, setGoTo, publishedLandings,
   setCourseLandingList, courseLandingList, courseIsCustomUrlList, setCourseIsCustomUrlList,
}) => {
   let courseActiveLanding;
   let courseCustomUrl;
   const coursesForSelectOption = [];
   let goToOptions = [
      { label: 'Go to Checkout', value: 'go_to_checkout' },
      { label: 'Go to Landing', value: 'go_to_landing' },
   ];
   if (courses && !!courses.courses.length) {
      courses.courses.forEach(course => {
         if (selectedClass === course.id) {
            if (course.landing_custom_url) {
               goToOptions = [
                  { label: 'Go to Checkout', value: 'go_to_checkout' },
                  { label: 'Go to Landing', value: 'go_to_landing' },
                  { label: 'Use Custom URL', value: 'custom_url' }];
            } else {
               goToOptions = [
                  { label: 'Go to Checkout', value: 'go_to_checkout' },
                  { label: 'Go to Landing', value: 'go_to_landing' },
               ];
            }
         }

         courseActiveLanding = { ...courseActiveLanding, [course.id]: course.active_landing_url };
         courseCustomUrl = { ...courseCustomUrl, [course.id]: course.is_custom_url };
         coursesForSelectOption.push(
            {
               label: course.name,
               value: course.id,
               name: course.name,
               activeLandingUrl: course.active_landing_url,
               isCustomUrl: course.is_custom_url,
            });
      });
   }


   const chooseCourseLanding = publishedLandings.map(landing => {
      return (
         {
            label: landing.name,
            value: landing.url,
         });
   });

   useEffect(() => {
      if (!!coursesForSelectOption.length && Object.keys(courseLandingList).length === 0) {
         setCourseLandingList(courseActiveLanding);
      }
      if (!!coursesForSelectOption.length && Object.keys(courseIsCustomUrlList).length === 0) {
         setCourseIsCustomUrlList(courseCustomUrl);
      }
   }, []);


   return (
      <div className='joinEditable'>
         <div>
            <Select
               style={ { height: '40px' } }
               id='course_join'
               label='Course name'
               type='select-medium'
               placeholder='Select Class'
               options={ coursesForSelectOption }
               value={ selectedClass }
               name='course_id'
               onChange={ (name, value, option) => {
                  setSelectedClass(value);
                  if ((Object.keys(courseIsCustomUrlList).length === 0 && option.isCustomUrl)
                  || courseIsCustomUrlList[value]) {
                     setGoTo('custom_url');
                  } else if ((Object.keys(courseLandingList).length === 0 && option.activeLandingUrl)
                  || courseLandingList[value]) {
                     setGoTo('go_to_landing');
                  } else {
                     setGoTo('go_to_checkout');
                  }
               } }
               icon='Down'
            />
         </div>
         {selectedClass
         && (
            <div className='m-t-m'>
               <Select
                  style={ { height: '40px' } }
                  id='go_to_join'
                  type='select-medium'
                  label='Destination'
                  placeholder='Go to'
                  options={ goToOptions }
                  value={ goTo }
                  name='go_to'
                  onChange={ (name, value) => {
                     setGoTo(value); if (value === 'go_to_checkout') {
                        setCourseLandingList({ ...courseLandingList, [selectedClass]: null });
                        setCourseIsCustomUrlList({ ...courseIsCustomUrlList, [selectedClass]: false });
                     } else if (value === 'custom_url') {
                        setCourseLandingList({ ...courseLandingList, [selectedClass]: null });
                        setCourseIsCustomUrlList({ ...courseIsCustomUrlList, [selectedClass]: true });
                     } else if (value === 'go_to_landing') {
                        setCourseIsCustomUrlList({ ...courseIsCustomUrlList, [selectedClass]: false });
                     }
                  } }
                  icon='Down'
               />
            </div>
         )}
         {selectedClass && goTo === 'go_to_landing'
         && (
            <div className='m-t-m'>
               <Select
                  style={ { height: '40px' } }
                  id='active_landing_url'
                  label='Select a landing page'
                  placeholder='Choose Landing'
                  options={ chooseCourseLanding }
                  type='select-medium'
                  value={ courseLandingList[selectedClass] }
                  name='landing_join_url'
                  onChange={ (name, value) => {
                     setCourseLandingList({ ...courseLandingList, [selectedClass]: value });
                  } }
                  icon='Down'
               />
            </div>
         )}
      </div>
   );
};

JoinEditable.propTypes = {
   courses: PropTypes.object,
   selectedClass: PropTypes.any,
   setSelectedClass: PropTypes.func,
   goTo: PropTypes.string,
   setGoTo: PropTypes.func,
   publishedLandings: PropTypes.array,
   courseLandingList: PropTypes.any,
   setCourseLandingList: PropTypes.func,
   setCourseIsCustomUrlList: PropTypes.func,
   courseIsCustomUrlList: PropTypes.object,
};

export default JoinEditable;
