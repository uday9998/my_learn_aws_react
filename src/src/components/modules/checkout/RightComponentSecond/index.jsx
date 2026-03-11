import React from 'react';
import PropTypes from 'prop-types';
import Section from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section';
import DraggableComponents from 'components/modules/checkout/DraggableComponents';
import { Droppable } from 'react-beautiful-dnd';
import './index.scss';

const RightComponentSecond = (props) => {
   const {
      sections, showEditableComponent, editableSectionFunc, isPreview, course, deleteComponent, changeProp,
      handleDeleteComponent, handleDuplicateComponent,
   } = props;
   const sectionsSort = sections[2].checkout_components.sort((a, b) => {
      return a.props.order - b.props.order;
   });
   return (
      <div>
         <Section
            slug={ sections[2].checkout_section.slug }
            item={ sections[2] }
            i={ 2 }
            onClick={ (e) => { editableSectionFunc(e); } }
            isPreview={ isPreview }
         >
            <div className='checkoutPageSecond-rightContent'>
               <Droppable
                  key={ sections[2].checkout_section.slug }
                  droppableId={ sections[2].checkout_section.slug }
                  type='element'
               >
                  {
                     (sectionProvided, snapshot) => (
                        <div
                           { ...sectionProvided.droppableProps }
                           ref={ sectionProvided.innerRef }
                           style={ snapshot.isDraggingOver
                              ? { ...sectionProvided.droppableProps.style, backgroundColor: 'rgb(217 255 210 / 50%)' }
                              : { ...sectionProvided.droppableProps.style } }
                        >
                           <DraggableComponents
                              components={ sectionsSort }
                              onClick={ (e) => showEditableComponent(e) }
                              isPreview={ isPreview }
                              bulletIconName='BulletCheckSecond'
                              disableArrow={ true }
                              checkoutType='template2'
                              course={ course }
                              deleteComponent={ deleteComponent }
                              sectionIndex={ 2 }
                              changeProp={ changeProp }
                              handleDeleteComponent={ handleDeleteComponent }
                              handleDuplicateComponent={ handleDuplicateComponent }
                              sections={ sections }
                              isDraggingOver={ snapshot.isDraggingOver }
                           />
                           {sectionProvided.placeholder}
                        </div>
                     )}
               </Droppable>
            </div>
         </Section>
      </div>
   );
};

RightComponentSecond.propTypes = {
   sections: PropTypes.array,
   editableSectionFunc: PropTypes.func,
   showEditableComponent: PropTypes.func,
   course: PropTypes.object,
   isPreview: PropTypes.bool,
   deleteComponent: PropTypes.func,
   changeProp: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
};

export default RightComponentSecond;
