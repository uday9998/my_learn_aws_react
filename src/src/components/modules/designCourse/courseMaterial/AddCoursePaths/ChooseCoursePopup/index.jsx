import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import CourseType from 'components/elements/dashboard/CourseType';

const ChooseCoursePopup = ({ title, courses }) => {
   return (
      <div className='chooseCoursePopup'>
         <div className='chooseCoursePopup__title'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner={ title }
            />
         </div>
         <div className='chooseCoursePopup__courses'>
            { courses.map((course, i) => {
               return (
               // eslint-disable-next-line react/no-array-index-key
                  <div className='chooseCoursePopup__course' key={ i }>
                     <CourseType
                        title={ course.title }
                        text={ course.text }
                        img={ course.img }
                        btnText={ course.btnText }
                        onButtonClick={ course.onButtonClick }
                     />
                  </div>
               );
            }) }
         </div>
      </div>
   );
};

ChooseCoursePopup.propTypes = {
   title: PropTypes.string,
   courses: PropTypes.array,
};

ChooseCoursePopup.defaultProps = {
   title: 'Title',
   courses: [],
};

export default ChooseCoursePopup;
