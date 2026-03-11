import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Tabs from 'components/elements/tabs';
import UpsellSectionEdit from '../UpsellSectionEdit';
import Elements from '../Elements';

const UpsellCheckoutEditor = ({
   template, setTemplate, editableSectionIndex, editableComponentIndex, editableSubComponentIndex,
   functions, selectItem, clearIds, handleDeleteComponent,
}) => {
   const [selectedTab, setSelectedTab] = useState('sections');
   const { setEditableSectionIndex } = functions;
   const tabVariants = [
      { key: 'General', value: 'sections' },
      { key: 'Blocks', value: 'blocks' },
   ];

   const handleChangeProp = (value, name, type, sectionIndex, componentIndex, subComponentIndex) => {
      const newTemplate = JSON.parse(JSON.stringify(template));
      if (type === 'section') {
         newTemplate.sections[sectionIndex].upsell_section.props[name] = value;
         setTemplate(newTemplate);
      }
      if (type === 'component') {
         newTemplate.sections[sectionIndex].upsell_components[componentIndex].props[name] = value;
         setTemplate(newTemplate);
      }
      if (type === 'subComponent') {
         newTemplate.sections[sectionIndex]
            .upsell_components[componentIndex].subcomponents[subComponentIndex].props[name] = value;
         setTemplate(newTemplate);
      }
   };


   return (
      <>
         <div className='upsell__checkout__editor'>
            {editableSectionIndex === null ? (
               <div className='upsell__checkout__editor__empty'>
                  <div className='upsell__checkout__editor__tabs'>
                     <Tabs
                        variants={ tabVariants }
                        selectedVariant={ selectedTab }
                        isFullWidth={ true }
                        onSelect={ (tab) => setSelectedTab(tab) }
                     />
                  </div>
                  {selectedTab === 'sections' ? (
                     <div className='upsell__checkout__editor__sections'>
                        {template.sections.map((e, index) => {
                           return (
                              <div
                                 role='presentation'
                                 className='upsell__checkout__editor__section'
                                 onClick={ () => setEditableSectionIndex(index) }
                              >
                                 <Text
                                    inner={ e.upsell_section.name }
                                    type={ types.regular148 }
                                    size={ sizes.medium }
                                 />
                              </div>
                           );
                        })}
                     </div>
                  ) : (
                     <Elements />
                  )}
               </div>
            ) : (
               <div className='upsell__checkout__editor__section'>
                  <UpsellSectionEdit
                     currentSection={ template.sections[editableSectionIndex] }
                     changeProp={ handleChangeProp }
                     sectionIndex={ editableSectionIndex }
                     clearIds={ clearIds }
                     subComponentIndex={ editableSubComponentIndex }
                     goBack={ () => selectItem(null, null) }
                     handleDeleteComponent={ handleDeleteComponent }
                     componentIndex={ editableComponentIndex }
                  />
               </div>
            )}

         </div>
      </>

   );
};

UpsellCheckoutEditor.propTypes = {
   template: PropTypes.object,
   editableSectionIndex: PropTypes.any,
   editableComponentIndex: PropTypes.any,
   editableSubComponentIndex: PropTypes.any,
   setTemplate: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   clearIds: PropTypes.func,
   functions: PropTypes.object,
   selectItem: PropTypes.func,
};

export default UpsellCheckoutEditor;
