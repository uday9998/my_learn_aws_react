import React from 'react';
import PropTypes from 'prop-types';
import SectionComponentsMenu from 'views/pages/DesignCourse/CheckoutTemplate/Menu/SectionComponentsMenu';
import SectionsMenu from 'views/pages/DesignCourse/CheckoutTemplate/Menu/SectionsMenu';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Elements from 'views/pages/DesignCourse/CheckoutTemplate/Menu/Elements';
import './index.scss';

const Editor = ({
   editableSection, sectionsSubMenu, backToCurrentMenu, showEditableComponent,
   toggleSectionComponent, addBullet, addTestimonial, sections, showSection, activeMenu,
   setActiveMenu, deleteComponent,
}) => {
   return (
      <div className='editorContainer_checkout'>
         <div className='editorContainer_menu'>
            <div
               className={ activeMenu === 'sections' ? 'editorContainer_sections green_color' : 'editorContainer_sections' }
               onClick={ () => setActiveMenu('sections') }
               role='presentation'
            >
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ (editableSection && editableSection.checkout_section.name) || 'Sections' }
                  color={ activeMenu === 'sections' ? '#fff' : '#3f4f65' }
               />
            </div>
            {/* <div
               className={ activeMenu === 'elements' ? 'editorContainer_elements green_color' : 'editorContainer_elements' }
               onClick={ () => setActiveMenu('elements') }
               role='presentation'
            >
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner='Elements'
                  color={ activeMenu === 'elements' ? '#fff' : '#3f4f65' }
               />
            </div> */}
         </div>
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
                     />
                  )
                  : (
                     <SectionsMenu
                        sections={ sections }
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
};

export default Editor;
