import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import generateTemplate from 'utils/generateUpsselTemplate';
import FrameWrapper from 'components/modules/frame';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button, Image, Text } from 'utils/pageBuilder/newElements';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import UpsellCheckoutTemplateFirst from './templates/Template1';
import UpsellCheckoutHeader from './components/UpsellCheckoutHeader';
import UpsellCheckoutEditor from './components/UpsellCheckoutEditor';
import ToggleEditor from '../DesignCourse/CheckoutTemplate/Menu/ToggleEditor';

const UpsellCheckoutView = ({
   templateName, inputs, isPreview, goBack, handleSaveTemplate, initalTemplate, isHidenScroll,
   isDownSell,
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
   const [template, setTemplate] = useState(initalTemplate || generateTemplate(inputs));
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
      const currentSection = newSections.filter((section) => section.upsell_section.slug === destination.droppableId)[0];
      let draggableComponent;
      currentSection.upsell_components.forEach((component) => {
         if (component.slug === draggableId) {
            draggableComponent = component;
         }
      });
      if (source.droppableId !== 'newElements') {
         currentSection.upsell_components.splice(source.index, 1);
         currentSection.upsell_components.splice(destination.index, 0, draggableComponent);
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
         currentSection.upsell_components.splice(destination.index, 0, componentType());
      }
      currentSection.upsell_components.forEach((component, i) => {
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
      newSections[sectionIndex].upsell_components = newSections[sectionIndex].upsell_components.filter((e) => e.slug !== slug);
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
         <div className='editor'>
            <HeaderTypeFirst
               title={ `Preview ${ isDownSell ? 'Downsell' : 'Upsell' } Page` }
               goBack={ () => {
                  setLivePreview(null);
               } }
            />
            <div className='upsell__checkout' style={ { margin: '60px 0px' } }>
               <div className='upsell__checkout__theme upsell__checkout__theme__closed'>
                  <div className={ classes[selectedFrameWrapper] }>
                     <FrameWrapper
                        viewMode={ selectedFrameWrapper }
                     >
                        {templateName === 'Template one' && (
                           <UpsellCheckoutTemplateFirst
                              data={ inputs }
                              isPreview={ true }
                              template={ template || generateTemplate(inputs) }
                           />
                        )}
                     </FrameWrapper>
                  </div>
               </div>
            </div>
         </div>
      );
   }
   if (isPreview) {
      return (
         <div className='editor'>
            <div className='upsell__checkout'>
               <div className='upsell__checkout__theme upsell__checkout__theme__closed' style={ { overflow: isHidenScroll ? 'inherit' : 'auto' } }>
                  <div className={ classes[selectedFrameWrapper] }>
                     <FrameWrapper
                        viewMode={ selectedFrameWrapper }
                     >
                        {templateName === 'Template one' && (
                           <UpsellCheckoutTemplateFirst
                              data={ inputs }
                              isPreview={ isPreview }
                              template={ template || generateTemplate(inputs) }
                           />
                        )}
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
         newTemplate.sections[sectionIndex].upsell_section.props[name] = value;
         setTemplate(newTemplate);
      }
      if (type === 'component') {
         newTemplate.sections[sectionIndex].upsell_components[componentIndex].props[name] = value;
         setTemplate(newTemplate);
      }
      if (type === 'subComponent') {
         if (newTemplate.sections[sectionIndex]
            .upsell_components[componentIndex].subcomponents) {
            newTemplate.sections[sectionIndex]
               .upsell_components[componentIndex].subcomponents[subComponentIndex].props[name] = value;
            setTemplate(newTemplate);
            return;
         }
         newTemplate.sections[sectionIndex]
            .upsell_components[componentIndex].subcomponent[subComponentIndex].props[name] = value;
         setTemplate(newTemplate);
      }
   };

   return (
      <DragDropContext onDragEnd={ handleElementOnDragEnd }>
         <div className='editor'>
            <UpsellCheckoutHeader
               goBack={ goBack }
               handleSave={ handleSave }
               isDownSell={ isDownSell }
               handleUndo={ handleUndo }
               handleRedo={ handleRedo }
               handlePreview={ () => setLivePreview(true) }
               selectedMod={ selectedFrameWrapper }
               setSelectedMod={ (mod) => setSelectedFrameWrapper(mod) }
            />
            <div className='upsell__checkout'>
               <UpsellCheckoutEditor
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
               <div className={ `upsell__checkout__theme${ !isOpenEditor ? ' upsell__checkout__theme__closed' : '' }` }>
                  <ToggleEditor
                     setCloseEditor={ setIsOpenEditor }
                     closeEditor={ isOpenEditor }
                  />
                  <div className={ classes[selectedFrameWrapper] }>
                     <FrameWrapper
                        viewMode={ selectedFrameWrapper }
                     >
                        {templateName === 'Template one' && (
                           <UpsellCheckoutTemplateFirst
                              data={ inputs }
                              isPreview={ isPreview }
                              selectItem={ selectItem }
                              template={ template }
                              handleChangeProp={ handleChangeProp }
                           />
                        )}
                     </FrameWrapper>
                  </div>
               </div>
            </div>
         </div>
      </DragDropContext>
   );
};

UpsellCheckoutView.propTypes = {
   templateName: PropTypes.string,
   isPreview: PropTypes.bool,
   goBack: PropTypes.func,
   isDownSell: PropTypes.bool,
   inputs: PropTypes.object,
   handleSaveTemplate: PropTypes.func,
   initalTemplate: PropTypes.object,
   isHidenScroll: PropTypes.bool,
};

export default UpsellCheckoutView;
