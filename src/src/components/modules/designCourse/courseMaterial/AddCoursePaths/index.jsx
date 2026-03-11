import React from 'react';
import './index.scss';
import chooseCourse from 'assets/images/dashboard/choose-course-type.png';
import startScratch from 'assets/images/dashboard/painting-dashboard.png';
import fullCourse from 'assets/images/dashboard/full-online-course.png';
import microCourse from 'assets/images/dashboard/micro-course.png';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import ChooseCoursePopup from './ChooseCoursePopup';
import AddCoursePopup from './AddCoursePopup';

const CourseType = ({
   onChooseCoursePath,
   modalType,
   onInputChange,
   onClickCreate,
   onClickCancel,
   courseName,
   defaultNames,
}) => {
   const defaultNamesValue = {
      micro: {
         title: 'Micro Class',
         text: 'Create consumable class that are in 5-10 increments',
         btnText: 'Choose',
         img: microCourse,
         onButtonClick: () => onChooseCoursePath('micro'),
      },
      full: {
         title: 'Full Online Class',
         text: 'Build a full online class using the best practices',
         btnText: 'Choose',
         img: fullCourse,
         onButtonClick: () => onChooseCoursePath('full'),
      },
      webinar: {
         title: 'Membership Program',
         text: 'Create a membership style program for your customers on a recurring basis',
         btnText: 'Choose',
         img: chooseCourse,
         onButtonClick: () => onChooseCoursePath('webinar'),
      },
   };

   let data = [
      {
         title: 'Start From Scratch',
         text: 'Choose to start a class completely from scratch',
         btnText: 'Start from scratch',
         img: startScratch,
         onButtonClick: () => onChooseCoursePath('scratch'),
      },
      {
         title: 'Choose A Type Of Class',
         text: 'Explore different template classes and find the right one for your business',
         btnText: 'Choose Class',
         img: chooseCourse,
         onButtonClick: () => onChooseCoursePath('choose'),
      },
   ];
   if (modalType === 'choose-name') {
      data = [];
      defaultNames.forEach(el => {
         if (defaultNamesValue[el]) {
            data.push(defaultNamesValue[el]);
         }
      });
   }

   return (
      <div className='chooseCourse-wraper'>
         <div className='chooseCourse-wraper-header'>
            <div className='closeIcon' role='presentation' onClick={ () => onClickCancel(null, false) }>
               <Icon name='CloseX' />
            </div>
         </div>
         {
            modalType !== 'add-name' && (
               <ChooseCoursePopup
                  title={ modalType === 'choose-path' ? 'Choose Your Class Path' : 'Choose A Class Type' }
                  courses={ data }
               />
            )
         }
         {
            modalType === 'add-name' && (

               <AddCoursePopup
                  onInputChange={ onInputChange }
                  onClickCancel={ () => onClickCancel('choose-path', true) }
                  onClickCreate={ onClickCreate }
                  courseName={ courseName }
               />
            )
         }
      </div>
   );
};

CourseType.propTypes = {
   onChooseCoursePath: PropTypes.func,
   onInputChange: PropTypes.func,
   onClickCancel: PropTypes.func,
   onClickCreate: PropTypes.func,
   modalType: PropTypes.string,
   courseName: PropTypes.string,
   defaultNames: PropTypes.array,
};

CourseType.defaultProps = {
   onChooseCoursePath: () => {},
   onClickCreate: () => {},
   onInputChange: () => {},
   onClickCancel: () => {},
};

export default CourseType;
