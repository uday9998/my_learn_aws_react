import React from 'react';
import CourseCommissions from 'components/modules/courseReports/CourseCommissions';
import Select from 'components/elements/form/Select';
import Sales from 'components/modules/courseReports/Sales';

const CourseReports = () => {
   return (
      <div className='mob-courseReports-page w-full'>
         <Select
            typeOval
            icon='TriangleDown'
            hasBorder
            padding='11px 16px 11px 28px'
            placeholder='All Classes'
         />
         <div className='m-b-l' />
         <CourseCommissions />
         <Sales />
      </div>
   );
};

export default CourseReports;
