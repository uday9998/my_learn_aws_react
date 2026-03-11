import React from 'react';
import './index.scss';
import AddSectionModule from 'components/modules/designCourse/courseMaterial/AddSection';
import NewSection from 'components/modules/designCourse/courseMaterial/NewSection';

const AddSection = () => {
   return (
      <div className='d-addSection flex w-full'>
         <div className='content_left'>
            <div className='m-r-exl'>
               <AddSectionModule />
            </div>
         </div>
         <div className='content_right'>
            <div className='m-l-exl'>
               <NewSection />
            </div>
         </div>
      </div>
   );
};

export default AddSection;
