import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import FrameWrapper from 'components/modules/frame';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button, Image, Text } from 'utils/pageBuilder/newElements';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import ToggleEditor from 'views/pages/DesignCourse/CheckoutTemplate/Menu/ToggleEditor';
import AffiliateTemplateHeader from './components/AffiliateTemplateHeader';
import AffiliateTemplateEditor from './components/AffiliateTemplateEditor';
import AffiliateTemplateTypeFirst from './templates/Template1';

const AffiliateTemplate = ({
   isPreview, goBack, handleSaveTemplate, initalTemplate, isHidenScroll,

}) => {
   const classes = {
      desktop: 'DesktopMod',
      phone: 'PhoneMode',
      tablet: 'TabletMode',
   };
   const [editableSectionIndex, setEditableSectionIndex] = useState(null);
   const [editableComponentIndex, setEditableComponentIndex] = useState(null);
   const [editableSubComponentIndex, setEditableSubComponentIndex] = useState(null);
   const [isOpenEditor, setIsOpenEditor] = useState(true);
   const [template, setTemplate] = useState(initalTemplate);
   const [livePreview, setLivePreview] = useState(false);
   const [selectedFrameWrapper, setSelectedFrameWrapper] = useState('desktop');
   const [undo, setUndo] = useState([]);
   const [redo, setRedo] = useState([]);
   // HANDLE SELECT ITEM FROM TEMPLATE

   const selectItem = (event, sectionIndex, componentIndex = null, subComponentIndex = null) => {
      if (isPreview || livePreview) {
         return;
      }
      if (event) {
         event.preventDefault();
         event.stopPropagation();
      }
      setEditableSectionIndex(sectionIndex);
      setEditableComponentIndex(componentIndex);
      setEditableSubComponentIndex(subComponentIndex);
   };

   // CHANGE TEMPLATE

   const handleChangeTemplate = (newTemplate) => {
      setUndo([...undo, JSON.stringify(template)]);
      setTemplate(newTemplate);
   };

   // UNDO REDO
   const handleUndo = () => {
      if (undo.length > 0) {
         const undoTemplate = JSON.parse(undo.at(-1));
         setRedo([...redo, JSON.stringify(template)]);
         setTemplate(undoTemplate);
         setUndo(undo.filter((e, index) => index !== undo.length - 1));
         return;
      }
      if (isPrint('Nothing to undo.')) {
         toast.error('Nothing to undo.');
      }
   };

   const handleRedo = () => {
      if (redo.length > 0) {
         const redoTemplate = JSON.parse(redo.at(-1));
         setTemplate(redoTemplate);
         setRedo(redo.filter((e, index) => index !== redo.length - 1));
         setUndo([...undo, JSON.stringify(template)]);
         return;
      }
      if (isPrint('Nothing to redo.')) {
         toast.error('Nothing to redo.');
      }
   };

   const handleElementOnDragEnd = (result) => {
      const { source, destination, draggableId } = result;
      if (!destination) {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }
      if (destination && destination.droppableId === 'newElements') {
         return;
      }
      if (destination && destination.droppableId !== source.droppableId && source.droppableId !== 'newElements') {
         if (isPrint("The element can't be added in this area.")) {
            toast.error("The element can't be added in this area.");
         }
         return;
      }
      setUndo([...undo, JSON.stringify(template)]);
      const newSections = [...template.sections];
      // eslint-disable-next-line max-len
      const currentSection = newSections.filter((section) => section.affiliate_section.slug === destination.droppableId)[0];
      let draggableComponent;
      currentSection.affiliate_components.forEach((component) => {
         if (component.slug === draggableId) {
            draggableComponent = component;
         }
      });
      if (source.droppableId !== 'newElements') {
         currentSection.affiliate_components.splice(source.index, 1);
         currentSection.affiliate_components.splice(destination.index, 0, draggableComponent);
      } else {
         let componentType = Text;
         switch (draggableId) {
            case 'Text': componentType = Text;
               break;
            case 'Button': componentType = Button;
               break;
            case 'Image': componentType = Image;
               break;
            default:
         }
         currentSection.affiliate_components.splice(destination.index, 0, componentType());
      }
      currentSection.affiliate_components.forEach((component, i) => {
         const orderedComponent = component;
         orderedComponent.props.order = i;
      });
      setTemplate({
         sections: newSections,
      });
   };

   const handleDeleteComponent = (slug, sectionIndex) => {
      setUndo([...undo, JSON.stringify(template)]);
      const newSections = [...template.sections];
      // eslint-disable-next-line max-len
      newSections[sectionIndex].affiliate_components = newSections[sectionIndex].affiliate_components.filter((e) => e.slug !== slug);
      setTemplate({
         sections: newSections,
      });
   };

   const handleSave = (isExit) => {
      if (isExit) {
         goBack();
      }
      handleSaveTemplate(template);
   };

   if (livePreview) {
      return (
         <div className='editor' style={ { width: '100%' } }>
            <HeaderTypeFirst
               title='Preview Page'
               goBack={ () => {
                  setLivePreview(null);
               } }
            />
            <div className='affiliate__checkout' style={ { margin: '0px 0px' } }>
               <div className='affiliate__checkout__theme affiliate__checkout__theme__closed'>
                  <div className={ classes[selectedFrameWrapper] }>
                     <FrameWrapper
                        viewMode={ selectedFrameWrapper }
                     >
                        <AffiliateTemplateTypeFirst
                           isPreview={ true }
                           template={ template }
                        />
                     </FrameWrapper>
                  </div>
               </div>
            </div>
         </div>
      );
   }
   if (isPreview) {
      return (
         <div className='editor' style={ { width: '100%' } }>
            <div className='affiliate__checkout'>
               <div className='affiliate__checkout__theme affiliate__checkout__theme__closed' style={ { overflow: isHidenScroll ? 'inherit' : 'auto', height: '100%' } }>
                  <div className={ classes[selectedFrameWrapper] }>
                     <FrameWrapper
                        viewMode={ selectedFrameWrapper }
                     >
                        <AffiliateTemplateTypeFirst
                           isPreview={ isPreview }
                           template={ template }
                        />
                     </FrameWrapper>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   const handleChangeProp = (value, name, type, sectionIndex, componentIndex, subComponentIndex) => {
      const newTemplate = JSON.parse(JSON.stringify(template));
      setUndo([...undo, JSON.stringify(template)]);
      if (type === 'section') {
         newTemplate.sections[sectionIndex].affiliate_section.props[name] = value;
         setTemplate(newTemplate);
      }
      if (type === 'component') {
         newTemplate.sections[sectionIndex].affiliate_components[componentIndex].props[name] = value;
         setTemplate(newTemplate);
      }
      if (type === 'subComponent') {
         if (newTemplate.sections[sectionIndex]
            .affiliate_components[componentIndex].subcomponents) {
            newTemplate.sections[sectionIndex]
               .affiliate_components[componentIndex].subcomponents[subComponentIndex].props[name] = value;
            setTemplate(newTemplate);
            return;
         }
         newTemplate.sections[sectionIndex]
            .affiliate_components[componentIndex].subcomponent[subComponentIndex].props[name] = value;
         setTemplate(newTemplate);
      }
   };

   return (
      <DragDropContext onDragEnd={ handleElementOnDragEnd }>
         <div className='editor' style={ { width: '100%' } }>
            <AffiliateTemplateHeader
               goBack={ goBack }
               handleSave={ handleSave }
               handleUndo={ handleUndo }
               handleRedo={ handleRedo }
               handlePreview={ () => setLivePreview(true) }
               selectedMod={ selectedFrameWrapper }
               setSelectedMod={ (mod) => setSelectedFrameWrapper(mod) }
            />
            <div className='affiliate__checkout'>
               <AffiliateTemplateEditor
                  handleDeleteComponent={ handleDeleteComponent }
                  template={ template }
                  selectItem={ selectItem }
                  setTemplate={ (data) => handleChangeTemplate(data) }
                  functions={ { setEditableSectionIndex } }
                  editableSectionIndex={ editableSectionIndex }
                  clearIds={ (isSubComponent) => {
                     if (isSubComponent) {
                        setEditableSubComponentIndex(null);
                        return;
                     }
                     setEditableComponentIndex(null);
                  } }
                  editableComponentIndex={ editableComponentIndex }
                  editableSubComponentIndex={ editableSubComponentIndex }
               />
               <div className={ `affiliate__checkout__theme${ !isOpenEditor ? ' affiliate__checkout__theme__closed' : '' }` }>
                  <ToggleEditor
                     setCloseEditor={ setIsOpenEditor }
                     closeEditor={ isOpenEditor }
                  />
                  <div className={ classes[selectedFrameWrapper] }>
                     <FrameWrapper
                        viewMode={ selectedFrameWrapper }
                     >
                        <AffiliateTemplateTypeFirst
                           isPreview={ isPreview }
                           selectItem={ selectItem }
                           template={ template }
                           handleChangeProp={ handleChangeProp }
                        />
                     </FrameWrapper>
                  </div>
               </div>
            </div>
         </div>
      </DragDropContext>
   );
};

AffiliateTemplate.propTypes = {
   isPreview: PropTypes.bool,
   goBack: PropTypes.func,
   handleSaveTemplate: PropTypes.func,
   initalTemplate: PropTypes.object,
   isHidenScroll: PropTypes.bool,
};

export default AffiliateTemplate;
