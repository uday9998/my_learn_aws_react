import { OfferContext } from 'containers/pages/mixed/offers';
import React from 'react';
import DraggableComponents from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/DraggableComponents';
import { Droppable } from 'react-beautiful-dnd';
import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';

const SchoolRoomBelowContent = () => {
   const {
      template, onClickElement, isEditor, deleteComponent, changeProp, handleDuplicateComponent,
      handleDeleteComponent, dragStart
   } = React.useContext(OfferContext);
   const beforeFooter = template[6];
   const beforeFooterIndex = 6;
   const sectionsSort = beforeFooter.school_room_components.sort((a, b) => {
      return a.props.order - b.props.order;
   });

   const sectionIsEmpty = sectionsSort.every(component => component.props.deleted || component.props.visibility === false);

   const getDroppableSectionStyles = (sectionProvided, snapshot) => {
      const droppableSectionStyles = { ...sectionProvided.droppableProps.style };

      if (snapshot.isDraggingOver || (dragStart && sectionIsEmpty)) {
         droppableSectionStyles.backgroundColor = '#A6C9C5';
      }

      return droppableSectionStyles;
   };

   return (
      <Section
         slug={ beforeFooter.school_room_section.slug }
         item={ beforeFooter }
         i={ beforeFooterIndex }
         onClick={ (e) => { onClickElement(e); } }
         isPreview={ !isEditor }
         beforFooterIsEmpty={ sectionsSort.filter(el => (el.props.deleted !== true
         && el.props.visibility !== false)).length === 0
         && isEditor }
      >
         <Droppable
            key={ beforeFooter.school_room_section.slug }
            droppableId={ beforeFooter.school_room_section.slug }
            type='element'
         >
            {
               (sectionProvided, snapshot) => (
                  <div
                     className={ sectionIsEmpty && isEditor ? 'schoolroomheader_empty' : '' }
                     { ...sectionProvided.droppableProps }
                     ref={ sectionProvided.innerRef }
                     style={ getDroppableSectionStyles(sectionProvided, snapshot) }
                  >
                     <DraggableComponents
                        components={ sectionsSort }
                        onClick={ (e) => onClickElement(e) }
                        isPreview={ !isEditor }
                        bulletIconName='BulletCheckSecond'
                        disableArrow={ true }
                        type='1'
                        sectionIndex={ beforeFooterIndex }
                        deleteComponent={ deleteComponent }
                        changeProp={ changeProp }
                        handleDuplicateComponent={ handleDuplicateComponent }
                        handleDeleteComponent={ handleDeleteComponent }
                        showLastDropMessage={ snapshot.isDraggingOver && !sectionIsEmpty }
                     />
                     {snapshot.isDraggingOver && sectionIsEmpty && <section className='drop_element_here'>DROP ELEMENT HERE</section>}
                     {sectionProvided.placeholder}
                  </div>
               )}
         </Droppable>
      </Section>
   );
};


export default SchoolRoomBelowContent;
