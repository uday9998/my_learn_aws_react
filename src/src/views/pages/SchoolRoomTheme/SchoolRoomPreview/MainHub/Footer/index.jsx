import React from 'react';
import PropTypes from 'prop-types';
import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';
import DraggableComponents from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/DraggableComponents';
import { Droppable } from 'react-beautiful-dnd';
import './index.scss';

const Footer = ({
   sections, isPreview, editableSectionFunc, showEditableComponent, primaryTheme, deleteComponent,
}) => {
   const sectionsSort = sections[4].school_room_components.sort((a, b) => {
      return a.props.order - b.props.order;
   });

   return (
      <Section
         slug={ sections[4].school_room_section.slug }
         item={ sections[4] }
         i={ 2 }
         onClick={ (e) => { editableSectionFunc(e); } }
         isPreview={ isPreview }
      >
         <Droppable
            key={ sections[4].school_room_section.slug }
            droppableId={ sections[4].school_room_section.slug }
            type='element'
         >
            {
               (sectionProvided, snapshot) => (
                  <div
                     className={ sectionsSort.filter(el => (el.props.deleted !== true && el.props.visibility !== false)).length === 0 && !isPreview ? 'schoolroomheader_empty' : '' }
                     { ...sectionProvided.droppableProps }
                     ref={ sectionProvided.innerRef }
                     isdraggingover={ snapshot.isdraggingover }
                     style={ snapshot.isDraggingOver
                        ? { ...sectionProvided.droppableProps.style, backgroundColor: '#A6C9C5' }
                        : { ...sectionProvided.droppableProps.style } }
                  >
                     <DraggableComponents
                        components={ sectionsSort }
                        onClick={ (e) => showEditableComponent(e) }
                        isPreview={ isPreview }
                        bulletIconName='BulletCheckSecond'
                        disableArrow={ true }
                        type='1'
                        style={ { fontFamily: primaryTheme } }
                        deleteComponent={ deleteComponent }
                        sectionIndex={ 4 }
                     />
                     {sectionProvided.placeholder}
                  </div>
               )}
         </Droppable>
      </Section>
   );
};


Footer.propTypes = {
   sections: PropTypes.array,
   editableSectionFunc: PropTypes.func,
   isPreview: PropTypes.bool,
   showEditableComponent: PropTypes.func,
   primaryTheme: PropTypes.string,
   deleteComponent: PropTypes.func,
};

Footer.defaultProps = {
   isPreview: false,
   editableSectionFunc: () => {},
   showEditableComponent: () => {},
};

export default Footer;
