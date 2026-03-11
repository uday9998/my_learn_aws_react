import React from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import PropTypes from 'prop-types';
import CourseItemV1 from 'components/elements/members/CourseItem/V1';
import CourseItemV2 from 'components/elements/members/CourseItem/V2';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import Text from 'components/elements/Text';


const course2 = [
   {
      name: 'Class Code Masterclass',
      progress: 64,
      activity: 'Last Active 2 days ago',
      initialDate: '11/05/18',
      signCount: 1,
   },
   {
      name: 'Facebook Ads That Convert',
      progress: 48,
      activity: 'Yesterday',
      initialDate: '09/02/18',
      signCount: 1,
   },
];

const SettingCourses = ({
   isOpen, v2, courses, lastLogin, handlePauseCurrentMemberCourse,
   handleDeleteCurrentMemberCourse,
}) => {
   return (
      <DynamicWrapper
         isOpen={ isOpen }
         title='Class'
         borderColor='#cddaf1'
      >
         {v2 ? (
            <div className='settingCourses'>
               <CourseItemV2 course={ course2[0] } />
               <CourseItemV2 course={ course2[1] } />
            </div>
         )
            : (
               <div className='settingCourses'>
                  { courses.length === 0 ? (
                     <div className='settingCourses_empty'>
                        <img src={ NoSearchSvg } alt='noCredit' />
                        <Text
                           size='small'
                           type='normal'
                           color='#8a94a2'
                           inner='No Classes'
                        />
                        <Text
                           size='small'
                           type='normal'
                           color='#8a94a2'
                           inner='No data available in table'
                           style={ { fontSize: '12px' } }
                        />
                     </div>
                  )
                     : (
                        <> {courses.map(course => {
                           return (


                              <div key={ course.id }>
                                 <CourseItemV1
                                    course={ course }
                                    lastLogin={ lastLogin }
                                    handlePauseCurrentMemberCourse={ handlePauseCurrentMemberCourse }
                                    handleDeleteCurrentMemberCourse={ handleDeleteCurrentMemberCourse }
                                 />
                                 <div className='settingCourses__border' />
                              </div>
                           );
                        })

                        }
                        </>
                     )
                  }

               </div>
            )}
      </DynamicWrapper>
   );
};

SettingCourses.propTypes = {
   isOpen: PropTypes.bool,
   v2: PropTypes.bool,
   courses: PropTypes.array,
   lastLogin: PropTypes.string,
   handlePauseCurrentMemberCourse: PropTypes.func,
   handleDeleteCurrentMemberCourse: PropTypes.func,
};

SettingCourses.defaultProps = {
   isOpen: false,
   v2: false,
};

export default SettingCourses;
