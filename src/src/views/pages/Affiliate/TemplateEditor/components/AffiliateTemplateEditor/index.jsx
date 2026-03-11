import React from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import AffiliateSectionEdit from '../AffiliateSectionEdit';

const AffiliateTemplateEditor = ({
   template, setTemplate, editableSectionIndex, editableComponentIndex, editableSubComponentIndex,
   functions, selectItem, clearIds, handleDeleteComponent,
}) => {
   const { setEditableSectionIndex } = functions;

   const handleChangeProp = (value, name, type, sectionIndex, componentIndex, subComponentIndex) => {
      const newTemplate = JSON.parse(JSON.stringify(template));
      if (type === 'section') {
         newTemplate.sections[sectionIndex].affiliate_section.props[name] = value;
         setTemplate(newTemplate);
      }
      if (type === 'component') {
         newTemplate.sections[sectionIndex].affiliate_components[componentIndex].props[name] = value;
         setTemplate(newTemplate);
      }
      if (type === 'subComponent') {
         newTemplate.sections[sectionIndex]
            .affiliate_components[componentIndex].subcomponents[subComponentIndex].props[name] = value;
         setTemplate(newTemplate);
      }
   };


   return (
      <>
         <div className='affiliate__checkout__editor'>
            {editableSectionIndex === null ? (
               <div className='affiliate__checkout__editor__empty'>
                  <div className='affiliate__checkout__editor__sections'>
                     {template.sections.map((e, index) => {
                        if (index !== 1) {
                           return (
                              <div
                                 role='presentation'
                                 className='affiliate__checkout__editor__section'
                                 onClick={ () => setEditableSectionIndex(index) }
                              >
                                 <Text
                                    inner={ e.affiliate_section.name }
                                    type={ types.regular148 }
                                    size={ sizes.medium }
                                 />
                              </div>
                           );
                        }
                        return null;
                     })}
                  </div>
               </div>
            ) : (
               <div className='affiliate__checkout__editor__section'>
                  <AffiliateSectionEdit
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

AffiliateTemplateEditor.propTypes = {
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

export default AffiliateTemplateEditor;
