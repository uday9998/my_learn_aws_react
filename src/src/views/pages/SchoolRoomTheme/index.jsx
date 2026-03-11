import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ToggleEditor from 'views/pages/SchoolRoomTheme/Menu/ToggleEditor';
// import FrameWrapper from 'components/modules/frame';
import classNames from 'classnames';
import './index.scss';
import Offers from 'containers/pages/mixed/offers';

const SchoolRoomTheme = ({
   showEditableComponent, editableSectionFunc, sections, offers, landing,
   handleElementOnDragEnd, deleteComponent, editableClass, viewMode,
   changeProp, handleDuplicateComponent, handleDeleteComponent,
   handleJoin, courses, globalBranding, dragStart, match, addClass, toggleSectionComponent,
}) => {
   const [closeEditor, setCloseEditor] = useState(false);
   return (
      <div id='right_container' className={ closeEditor ? 'schoolRoomTheme schoolRoomTheme-close' : 'schoolRoomTheme' }>
         <ToggleEditor setCloseEditor={ setCloseEditor } closeEditor={ closeEditor } />
         <div className={
            classNames({
               'phoneModeOffer': viewMode === 'phone',
               'tabletModeOffer': viewMode === 'tablet',
            })
         }
         >
            {/* <FrameWrapper viewMode={ viewMode }> */}
            <Offers
               isEditor={ true }
               addClass={ addClass }
               dragStart={ dragStart }
               showEditableComponent={ editableSectionFunc }
               settings={ landing }
               globalBranding={ globalBranding }
               handleDeleteComponent={ handleDeleteComponent }
               handleDuplicateComponent={ handleDuplicateComponent }
               offers={ offers }
               changeProp={ changeProp }
               handleElementOnDragEnd={ handleElementOnDragEnd }
               deleteComponent={ deleteComponent }
               sections={ sections }
               toggleSectionComponent={ toggleSectionComponent }
               courseContainerProps={ {
                  sections,
                  editableSectionFunc,
                  showEditableComponent,
                  editorCourses: courses,
                  landing,
                  handleElementOnDragEnd,
                  deleteComponent,
                  editableClass,
                  viewMode,
                  changeProp,
                  handleJoin,
                  handleDuplicateComponent,
                  handleDeleteComponent,
               } }
               closeEditor={ closeEditor }
               match={ match }
            />

            {/* </FrameWrapper> */}
         </div>
      </div>
   );
};

SchoolRoomTheme.propTypes = {
   offers: PropTypes.array,
   showEditableComponent: PropTypes.func,
   editableSectionFunc: PropTypes.func,
   sections: PropTypes.array,
   landing: PropTypes.object,
   handleElementOnDragEnd: PropTypes.func,
   deleteComponent: PropTypes.func,
   editableClass: PropTypes.object,
   viewMode: PropTypes.string,
   changeProp: PropTypes.func,
   addClass: PropTypes.func,
   handleJoin: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   toggleSectionComponent: PropTypes.func,
   courses: PropTypes.array,
   globalBranding: PropTypes.object,
   dragStart: PropTypes.bool,
   match: PropTypes.object,
};

export default SchoolRoomTheme;
