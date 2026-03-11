import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import FrameWrapper from 'components/modules/frame';
import CheckoutView from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutThemes/CheckoutView'
import CheckoutViewSecond from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutThemes/CheckoutViewSecond'
import CheckoutViewThird from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutThemes/CheckoutViewThird'
import ToggleEditor from 'views/pages/DesignCourse/CheckoutTemplate/Menu/ToggleEditor'
import CheckoutViewFifth from '../CheckoutViewFifth'
import CheckoutViewSixth from '../CheckoutViewSixth'
import CheckoutTemplateSeven from '../CheckoutTemplateSeven'

import './index.scss'

const CheckoutTheme = ({
   showEditableComponent,
   toggleSectionComponent,
   editableSectionFunc,
   sections,
   showSection,
   course,
   customFieldsData,
   deleteComponent,
   viewMode,
   changeProp,
   handleDeleteComponent,
   handleDuplicateComponent,
   templateName
}) => {
   const [closeEditor, setCloseEditor] = useState(false)
   return (
      <div
         id='right_container'
         className={
            closeEditor
               ? `checkoutTheme checkoutTheme-close ${templateName}`
               : `checkoutTheme checkoutTheme-with-menu ${templateName} `
         }
      >
         <ToggleEditor
            setCloseEditor={setCloseEditor}
            closeEditor={closeEditor}
         />

         <div
            className={classNames({
               desktopMode: viewMode === '',
               phoneModeCheckout: viewMode === 'phone',
               tabletModeCheckout: viewMode === 'tablet'
            })}
         >
            {/* <FrameWrapper
               viewMode={ viewMode }
               sections={ sections }
               showEditableComponent={ showEditableComponent }
               toggleSectionComponent={ toggleSectionComponent }
               showSection={ showSection }
               editableSectionFunc={ editableSectionFunc }
               course={ course }
               customFieldsData={ customFieldsData }
               deleteComponent={ deleteComponent }
               closeEditor={ closeEditor }
            > */}
            {/* <TabSwitch.Content>
                  <CheckoutView
                     tabId='template1'
                     sections={ sections }
                     showEditableComponent={ showEditableComponent }
                     toggleSectionComponent={ toggleSectionComponent }
                     showSection={ showSection }
                     editableSectionFunc={ editableSectionFunc }
                     course={ course }
                     customFieldsData={ customFieldsData }
                     deleteComponent={ deleteComponent }
                     closeEditor={ closeEditor }
                     changeProp={ changeProp }
                     handleDeleteComponent={ handleDeleteComponent }
                     handleDuplicateComponent={ handleDuplicateComponent }
                  />
                  <CheckoutViewSecond
                     tabId='template2'
                     sections={ sections }
                     showEditableComponent={ showEditableComponent }
                     toggleSectionComponent={ toggleSectionComponent }
                     showSection={ showSection }
                     editableSectionFunc={ editableSectionFunc }
                     course={ course }
                     customFieldsData={ customFieldsData }
                     deleteComponent={ deleteComponent }
                     closeEditor={ closeEditor }
                     changeProp={ changeProp }
                     handleDeleteComponent={ handleDeleteComponent }
                     handleDuplicateComponent={ handleDuplicateComponent }
                  />
                  <CheckoutViewThird
                     tabId='template3'
                     sections={ sections }
                     showEditableComponent={ showEditableComponent }
                     toggleSectionComponent={ toggleSectionComponent }
                     showSection={ showSection }
                     editableSectionFunc={ editableSectionFunc }
                     course={ course }
                     customFieldsData={ customFieldsData }
                     deleteComponent={ deleteComponent }
                     closeEditor={ closeEditor }
                     changeProp={ changeProp }
                     handleDeleteComponent={ handleDeleteComponent }
                     handleDuplicateComponent={ handleDuplicateComponent }
                  />
               </TabSwitch.Content> */}
            {templateName === 'template2' && (
               <CheckoutTemplateSeven
                  sections={sections}
                  showEditableComponent={showEditableComponent}
                  toggleSectionComponent={toggleSectionComponent}
                  showSection={showSection}
                  editableSectionFunc={editableSectionFunc}
                  course={course}
                  customFieldsData={customFieldsData}
                  deleteComponent={deleteComponent}
                  closeEditor={closeEditor}
                  changeProp={changeProp}
                  handleDeleteComponent={handleDeleteComponent}
                  handleDuplicateComponent={handleDuplicateComponent}
                  templateName={templateName}
               />
            )}
            {templateName === 'template3' && (
               <CheckoutTemplateSeven
                  sections={sections}
                  showEditableComponent={showEditableComponent}
                  toggleSectionComponent={toggleSectionComponent}
                  showSection={showSection}
                  editableSectionFunc={editableSectionFunc}
                  course={course}
                  customFieldsData={customFieldsData}
                  deleteComponent={deleteComponent}
                  closeEditor={closeEditor}
                  changeProp={changeProp}
                  handleDeleteComponent={handleDeleteComponent}
                  handleDuplicateComponent={handleDuplicateComponent}
                  templateName={templateName}
               />
            )}
            {templateName === 'template1' && (
               <CheckoutTemplateSeven
                  sections={sections}
                  showEditableComponent={showEditableComponent}
                  toggleSectionComponent={toggleSectionComponent}
                  showSection={showSection}
                  editableSectionFunc={editableSectionFunc}
                  course={course}
                  customFieldsData={customFieldsData}
                  deleteComponent={deleteComponent}
                  closeEditor={closeEditor}
                  changeProp={changeProp}
                  handleDeleteComponent={handleDeleteComponent}
                  handleDuplicateComponent={handleDuplicateComponent}
                  templateName={templateName}
               />
            )}
            {templateName === 'template4' && (
               <CheckoutTemplateSeven
                  sections={sections}
                  showEditableComponent={showEditableComponent}
                  toggleSectionComponent={toggleSectionComponent}
                  showSection={showSection}
                  editableSectionFunc={editableSectionFunc}
                  course={course}
                  customFieldsData={customFieldsData}
                  deleteComponent={deleteComponent}
                  closeEditor={closeEditor}
                  changeProp={changeProp}
                  handleDeleteComponent={handleDeleteComponent}
                  handleDuplicateComponent={handleDuplicateComponent}
                  templateName={templateName}
               />
            )}
            {templateName === 'template5' && (
               <CheckoutTemplateSeven
                  sections={sections}
                  showEditableComponent={showEditableComponent}
                  toggleSectionComponent={toggleSectionComponent}
                  showSection={showSection}
                  editableSectionFunc={editableSectionFunc}
                  course={course}
                  customFieldsData={customFieldsData}
                  deleteComponent={deleteComponent}
                  closeEditor={closeEditor}
                  changeProp={changeProp}
                  handleDeleteComponent={handleDeleteComponent}
                  handleDuplicateComponent={handleDuplicateComponent}
                  templateName={templateName}
               />
            )}
            {templateName === 'template6' && (
               <CheckoutTemplateSeven
                  sections={sections}
                  showEditableComponent={showEditableComponent}
                  toggleSectionComponent={toggleSectionComponent}
                  showSection={showSection}
                  editableSectionFunc={editableSectionFunc}
                  course={course}
                  customFieldsData={customFieldsData}
                  deleteComponent={deleteComponent}
                  closeEditor={closeEditor}
                  changeProp={changeProp}
                  handleDeleteComponent={handleDeleteComponent}
                  handleDuplicateComponent={handleDuplicateComponent}
                  templateName={templateName}
               />
            )}
            {templateName === 'template7' && (
               <CheckoutTemplateSeven
                  sections={sections}
                  showEditableComponent={showEditableComponent}
                  toggleSectionComponent={toggleSectionComponent}
                  showSection={showSection}
                  editableSectionFunc={editableSectionFunc}
                  course={course}
                  customFieldsData={customFieldsData}
                  deleteComponent={deleteComponent}
                  closeEditor={closeEditor}
                  changeProp={changeProp}
                  handleDeleteComponent={handleDeleteComponent}
                  handleDuplicateComponent={handleDuplicateComponent}
                  templateName={templateName}
               />
            )}
            {/* </FrameWrapper> */}
         </div>
      </div>
   )
}

CheckoutTheme.propTypes = {
   course: PropTypes.object,
   showEditableComponent: PropTypes.func,
   templateName: PropTypes.string,
   toggleSectionComponent: PropTypes.func,
   editableSectionFunc: PropTypes.func,
   sections: PropTypes.array,
   showSection: PropTypes.func,
   customFieldsData: PropTypes.object,
   deleteComponent: PropTypes.func,
   viewMode: PropTypes.string,
   changeProp: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func
}

export default CheckoutTheme
