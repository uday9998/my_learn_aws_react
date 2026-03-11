import React from 'react';
import CheckoutView from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutThemes/CheckoutView';
import CheckoutViewSecond from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutThemes/CheckoutViewSecond';
import CheckoutViewThird from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutThemes/CheckoutViewThird';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import CheckoutViewFifth from '../CheckoutThemes/CheckoutViewFifth';
import CheckoutViewSixth from '../CheckoutThemes/CheckoutViewSixth';
import CheckoutTemplateSeven from '../CheckoutThemes/CheckoutTemplateSeven';
import './index.scss';


const CheckoutTemplatePreview = ({
   course, location, sections, customFieldsData,
}) => {
   const handleElementOnDragEnd = () => {};
   return (
      <DragDropContext onDragEnd={ handleElementOnDragEnd }>
         <div
            className='d-checkout w-full'
         >
            {location === 'template1' && (
               <CheckoutView
                  sections={ sections }
                  showEditableComponent={ () => {} }
                  toggleSectionComponent={ () => {} }
                  showSection={ () => {} }
                  editableSectionFunc={ () => {} }
                  course={ course }
                  isPreview={ true }
                  customFieldsData={ customFieldsData }
                  templateName={ location }
               />
            )}
            {location === 'template2' && (
               <CheckoutViewSecond
                  sections={ sections }
                  showEditableComponent={ () => {} }
                  toggleSectionComponent={ () => {} }
                  showSection={ () => {} }
                  editableSectionFunc={ () => {} }
                  course={ course }
                  isPreview={ true }
                  customFieldsData={ customFieldsData }
               />
            )}
            {location === 'template3' && (
               <CheckoutViewThird
                  sections={ sections }
                  showEditableComponent={ () => {} }
                  toggleSectionComponent={ () => {} }
                  showSection={ () => {} }
                  editableSectionFunc={ () => {} }
                  course={ course }
                  isPreview={ true }
                  customFieldsData={ customFieldsData }
               />
            )}
            {
               location === 'template4' && (
                  <CheckoutView
                     sections={ sections }
                     showEditableComponent={ () => {} }
                     toggleSectionComponent={ () => {} }
                     showSection={ () => {} }
                     editableSectionFunc={ () => {} }
                     course={ course }
                     isPreview={ true }
                     customFieldsData={ customFieldsData }
                     templateName={ location }
                  />
               )
            }
            {
               location === 'template5' && (
                  <CheckoutViewFifth
                     sections={ sections }
                     showEditableComponent={ () => {} }
                     toggleSectionComponent={ () => {} }
                     showSection={ () => {} }
                     editableSectionFunc={ () => {} }
                     course={ course }
                     isPreview={ true }
                     customFieldsData={ customFieldsData }
                     templateName={ location }
                  />
               )
            }
            {
               location === 'template6' && (
                  <CheckoutViewSixth
                     sections={ sections }
                     showEditableComponent={ () => {} }
                     toggleSectionComponent={ () => {} }
                     showSection={ () => {} }
                     editableSectionFunc={ () => {} }
                     course={ course }
                     isPreview={ true }
                     customFieldsData={ customFieldsData }
                     templateName={ location }
                  />
               )
            }
            {
               location === 'template7' && (
                  <CheckoutTemplateSeven
                     sections={ sections }
                     showEditableComponent={ () => {} }
                     toggleSectionComponent={ () => {} }
                     showSection={ () => {} }
                     editableSectionFunc={ () => {} }
                     course={ course }
                     isPreview={ true }
                     customFieldsData={ customFieldsData }
                     templateName={ location }
                  />
               )
            }
         </div>
      </DragDropContext>
   );
};

CheckoutTemplatePreview.propTypes = {
   course: PropTypes.object,
   location: PropTypes.string,
   sections: PropTypes.array,
   customFieldsData: PropTypes.object,
};

export default CheckoutTemplatePreview;
