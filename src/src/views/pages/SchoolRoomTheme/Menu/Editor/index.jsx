import React from 'react';
import PropTypes from 'prop-types';
import SectionComponentsMenu from 'views/pages/SchoolRoomTheme/Menu/SectionComponentsMenu';
import SectionsMenu from 'views/pages/SchoolRoomTheme/Menu/SectionsMenu';
import Elements from 'views/pages/SchoolRoomTheme/Menu/Elements';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import './index.scss';
import Tabs from 'components/elements/tabs';

const Editor = ({
   editableSection, sectionsSubMenu, backToCurrentMenu, showEditableComponent,
   toggleSectionComponent, addBullet, addTestimonial, sections, showSection, activeMenu,
   setActiveMenu, deleteComponent, addClass, deleteClass, addLink, landing,
   openJoinButton, setOpenJoinButton, changeProp, globalBranding, 
}) => {
   return (
      <div className='editorContainer_schoolroom'>
         <Tabs
            variants={ [
               { key: 'Sections', value: 'sections' },
               { key: 'Elements', value: 'elements' },
            ] }
            selectedVariant={ activeMenu }
            onSelect={ (variant) => {
               setActiveMenu(variant);
               if (variant === 'sections') {
                  setOpenJoinButton(false);
               }
            } }
         />
         {activeMenu === 'sections'
         && (
            <>
               { sectionsSubMenu
                  ? (
                     <SectionComponentsMenu
                        editableSection={ editableSection }
                        backToCurrentMenu={ backToCurrentMenu }
                        showEditableComponent={ showEditableComponent }
                        toggleSectionComponent={ toggleSectionComponent }
                        addBullet={ addBullet }
                        addTestimonial={ addTestimonial }
                        deleteComponent={ deleteComponent }
                        addClass={ addClass }
                        deleteClass={ deleteClass }
                        changeProp={ changeProp }
                        addLink={ addLink }
                        landing={ landing }
                        openJoinButton={ openJoinButton }
                        setOpenJoinButton={ setOpenJoinButton }
                        globalBranding={ globalBranding }
                     />
                  )
                  : (
                     <SectionsMenu
                        sections={ sections }
                        changeProp={ changeProp }
                        landing={ landing }
                        showSection={ showSection }
                     />
                  )
               }
            </>
         )
         }
         {activeMenu === 'elements'
          && (
             <Elements />
          )
         }
      </div>
   );
};

Editor.propTypes = {
   globalBranding: PropTypes.object,
   editableSection: PropTypes.object,
   sectionsSubMenu: PropTypes.bool,
   backToCurrentMenu: PropTypes.func,
   showEditableComponent: PropTypes.func,
   toggleSectionComponent: PropTypes.func,
   addBullet: PropTypes.func,
   addTestimonial: PropTypes.func,
   sections: PropTypes.array,
   showSection: PropTypes.func,
   activeMenu: PropTypes.string,
   setActiveMenu: PropTypes.func,
   deleteComponent: PropTypes.func,
   addClass: PropTypes.func,
   deleteClass: PropTypes.func,
   addLink: PropTypes.func,
   landing: PropTypes.object,
   setOpenJoinButton: PropTypes.func,
   openJoinButton: PropTypes.bool,
   changeProp: PropTypes.func,
};

export default Editor;
