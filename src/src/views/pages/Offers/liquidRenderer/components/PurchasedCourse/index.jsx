import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/elements/TextNew';
import BaseButton, { THEMES as thems } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';

import './index.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const PurchasedCourse = ({
   coursesData,
}) => {
   const history = useHistory();

   const handleNavigateToCourse = (offer) => {
      history.push(`/programs/${offer.url}`);
   };
   
   // Filter courses to only include those with type "0"
   const filteredCourses = coursesData.filter(course => course.type === "0");
   
   
   return (
      <div className='purchased__course__wrapper'>
         {
            filteredCourses.length > 0 && filteredCourses.map(course => {
               return (
                  <div className='course__card' key={course.id}>
                     <div
                        style={ {
                           backgroundImage: `url(${ course.thumbnail_image })`,
                        } }
                        className='top__wrapper'>
                        <div
                           style={ {
                              background: !course.progress_percentage ? '#FFF6D7' : '#94c748',
                           } }
                           className='status__wrapper'>
                           <Text 
                              inner={ !course.progress_percentage ? 'In Progress' : 'Complete' }
                           />
                        </div>
                        <div className='image__bottom__wrapper'>
                           <Text 
                              inner={ `${ course.progress_percentage }%` }
                           />
                           <div
                              style={ {
                                 maxWidth: course.progress_percentage > 10 ? '277px' : '294px',
                              } }
                              className='progress__bar'>
                              <div
                                 style={ {
                                    width: `${ course.progress_percentage }%`,
                                 } }
                                 className='inner__progress__bar' />
                           </div>
                           <div className='purchased__course__lessons__count'>
                              <IconNew name='LessonsCount' />
                              <Text 
                                 inner={ course.lessons_count > 1 ? `${ course.lessons_count } Lessons` : `${ course.lessons_count } Lesson` }
                              />
                           </div>
                        </div>
                     </div>
                     <div className='bottom__wrapper'>
                        <div className='course__name__wrapper'>
                           <Text 
                              inner={ course.name }
                           />
                        </div>
                        <div className='widget'>
                           <Text
                              inner='Course'
                           />
                        </div>
                        <div className='description__wrapper'>
                           <Text 
                              inner={ course.description }
                           />
                        </div>
                        <div className='button__wrapper'>
                           <BaseButton 
                              text={ course.thank_you_button_text }
                              theme={ thems.blue }
                              onClick={ () => handleNavigateToCourse(course) }
                           />
                        </div>
                     </div>
                  </div>
               );   
            })
         }
         {filteredCourses.length === 0 && (
            <div className="no-courses-message">
               <Text inner="No courses found" />
            </div>
         )}
      </div>
   );
};

PurchasedCourse.propTypes = {
   coursesData: PropTypes.array,
};

export default PurchasedCourse;