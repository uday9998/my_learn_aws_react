import React, { useEffect } from 'react';
// import CoursesContainer from 'containers/pages/mixed/courses';
import Offers from '../../offers';


const SchoolRoomTempPreviewContainer = () => {
   useEffect(() => {
      if (!window.sections) {
         window.location.href = '/admin';
      }
   }, []);
   return (
      <Offers
         sections={ window.sections }
         editableSectionFunc={ () => {} }
         showEditableComponent={ () => {} }
         editorCourses={ window.courses }
         landing={ window.landing }
         handleElementOnDragEnd={ () => {} }
         deleteComponent={ () => {} }
         editableClass={ {} }
         viewMode=''
         previewMode={ true }
      />
   );
   // return (
   //    <CoursesContainer
   //       tempSections={ window.sections }
   //       isDefaultPreview={ true }
   //       isTempPreview={ true }
   //       editableSectionFunc={ () => {} }
   //       showEditableComponent={ () => {} }
   //       editorCourses={ window.courses }
   //       landing={ window.landing }
   //       handleElementOnDragEnd={ () => {} }
   //       deleteComponent={ () => {} }
   //       editableClass={ {} }
   //       viewMode=''
   //    />
   // );
};


export default SchoolRoomTempPreviewContainer;
