import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import QueryParams from 'utils/QueryParams';
import AddFirstSection from 'components/modules/designCourse/courseMaterial/AddFirstSection';
import AddSectionTutorial from 'components/modules/designCourse/courseMaterial/AddSectionTutorial';
import AddSectionModule from 'components/modules/designCourse/courseMaterial/AddSection';
import NewSection from 'components/modules/designCourse/courseMaterial/NewSection';

const CourseEmpty = ({
   addingSection, handleAddingSection, sectionTitle, createSection, newSectionDiv, scrollingDiv,
   handleChildClick, newSectionTilte,
}) => {
   // const lastPartOfUrl = QueryParams.getLastPartOfUrl();

   return (
      <div className='d-courseEmpty flex w-full'>
         <div
            className={ `content_left ${ addingSection ? 'd-course-add-wrapper' : 'empty-wraper' }` }
            style={ addingSection ? {
               width: '50%',
               maxWidth: '40%',
            } : null }
            ref={ scrollingDiv }
         >
            <div className='m-r-exl left-section'>
               {
                  addingSection
                     ? <AddSectionModule newSectionTilte={ newSectionTilte } />
                     : (
                        <AddFirstSection
                           handleAddingSection={ handleAddingSection }
                        />
                     )

               }
            </div>
         </div>
         <div className='content_right'>
            <div className={ `m-l-exl ${ addingSection ? 'm-course-add-wrapper' : 'empty-wraper' }` } ref={ newSectionDiv }>
               {
                  addingSection
                     ? (
                        <NewSection
                           title={ sectionTitle }
                           createSection={ createSection }
                           onChildClick={ handleChildClick }
                        />
                     )
                     : <AddSectionTutorial />
               }
            </div>
         </div>
      </div>
   );
};

CourseEmpty.propTypes = {
   addingSection: PropTypes.bool,
   sectionTitle: PropTypes.string,
   handleAddingSection: PropTypes.func,
   createSection: PropTypes.func,
   newSectionDiv: PropTypes.any,
   scrollingDiv: PropTypes.any,
   handleChildClick: PropTypes.func,
   newSectionTilte: PropTypes.string,
};

CourseEmpty.defaultValue = {
   addingSection: false,
   handleAddingSection: () => {},
};

export default CourseEmpty;
