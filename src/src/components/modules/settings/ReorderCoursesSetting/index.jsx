import React from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import ReorderCoursesContainer from 'containers/pages/admin/designCourse/reorderCourses';


const ReorderCourses = () => {
   return (
      <DynamicWrapper openedHasShadow backColor='#ffffff' openedBackColor='#ffffff' title='Reorder Courses' isOpen={ false }>
         <div className='w-full'>
            <ReorderCoursesContainer />
         </div>
      </DynamicWrapper>
   );
};

ReorderCourses.propTypes = {

};


export default ReorderCourses;
