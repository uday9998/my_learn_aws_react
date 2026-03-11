import React from 'react';
import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';
import { OfferContext } from 'containers/pages/mixed/offers';
import DraggableComponents from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/DraggableComponents';
import { Droppable } from 'react-beautiful-dnd';
import './index.scss';

const SchoolRoomAboveContent = () => {
   const {
      template, onClickElement, isEditor, deleteComponent, changeProp, handleDuplicateComponent,
      handleDeleteComponent, dragStart,
   } = React.useContext(OfferContext);
   const headline = template[3];
   const sectionsSort = headline.school_room_components.sort((a, b) => {
      return a.props.order - b.props.order;
   });
   const headlineIndex = 3;

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
         slug={ headline.school_room_section.slug }
         item={ headline }
         i={ headlineIndex }
         onClick={ (e) => { onClickElement(e); } }
         isPreview={ !isEditor }
      >
         <Droppable
            key={ headline.school_room_section.slug }
            droppableId={ headline.school_room_section.slug }
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
                        deleteComponent={ deleteComponent }
                        sectionIndex={ headlineIndex }
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

SchoolRoomAboveContent.propTypes = {

};

export default SchoolRoomAboveContent;
