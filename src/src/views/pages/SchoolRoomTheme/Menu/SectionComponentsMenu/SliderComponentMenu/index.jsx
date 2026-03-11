import React, {
   Fragment, useEffect, useRef, useState, 
} from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import Icon from 'components/elements/Icon';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

const SliderComponentMenu = ({
   component, componentSubComponents, showEditableComponent, toggleSectionComponent,
   editableSection, i, deleteClass,
}) => {
   const [displayName, setDisplayName] = useState('none');
   const [notActiveElement, setNotActiveElement] = useState('');
   const renderDraggable = useDraggableInPortal();

   const handleCheckDisplaySetting = () => {
      const displayName = !!localStorage.getItem('display');
      if (displayName) {
         localStorage.removeItem('display');
      }
      if (displayName) {
         setDisplayName('block');
         localStorage.removeItem('display');
      } else if (componentSubComponents.length > 1) {
         setDisplayName('none');
      }
   };

   useEffect(() => {
      if (componentSubComponents.length < 2) {
         handleCheckDisplaySetting();
      } else {
         setNotActiveElement('none');
      }
   }, [componentSubComponents.length]);

   return (
      <Droppable
         key={ component.slug }
         droppableId='sliderComponent'
         type='sliderComponent'
      >
         {
            (sectionProvided, snapshot) => (
               <div
                  { ...sectionProvided.droppableProps }
                  ref={ sectionProvided.innerRef }
                  style={ snapshot.isDraggingOver
                     ? { ...sectionProvided.droppableProps.style, backgroundColor: '#A6C9C5' }
                     : { ...sectionProvided.droppableProps.style } }
               >
                  {componentSubComponents && !!componentSubComponents.length
                  && componentSubComponents.map((subComponent, j) => {
                     if (subComponent.props.classType === component.props.school_class_type) {
                        return (
                           subComponent.deleted !== true && (
                              <Draggable
                                 draggableId={ subComponent.slug }
                                 index={ j }
                                 key={ subComponent.slug }
                                 isDragDisabled={ subComponent.type !== 'class' }
                              >
                                 {renderDraggable((sectionDragProvided) => {
                                    return (
                                       <Fragment>
                                          <div
                                             ref={ sectionDragProvided.innerRef }
                                             { ...sectionDragProvided.draggableProps }
                                             style={ { ...sectionDragProvided.draggableProps.style } }
                                             className='SectionComponents_name_dragable_content'
                                          >
                                             <div
                                                { ...sectionDragProvided.dragHandleProps }
                                                className='SectionComponents_name_dragable_icon'
                                             ><Icon name='Dragdrop' />
                                             </div>
                                             <Fragment key={ subComponent.slug }>
                                                <div
                                                   id='added__product'
                                                   className='item SectionComponents_name_dragable_item'
                                                   role='presentation'
                                                   onClick={ e => toggleSectionComponent(e) }
                                                >
                                                   <Text
                                                      inner={ subComponent.name }
                                                      type={ types.regular148 }
                                                      size={ sizes.medium }
                                                   />
                                                   <div className='component_arrow'>
                                                      <IconNew name='SchoolRoomComponentDown' />
                                                   </div>
                                                </div>
                                                <div className='SubSectionComponent' id={ `${ subComponent.slug } ${ displayName === 'block' ? 'active' : '' }` } style={ { display: j < 1 ? displayName : notActiveElement } }>
                                                   {editableSection
                                                   && showEditableComponent(
                                                      subComponent,
                                                      subComponent.slug,
                                                      i,
                                                      j
                                                   )}
                                                   {!!subComponent.subcomponent && !!subComponent.subcomponent.length
                                                   && subComponent.subcomponent.map((classProps, k) => {
                                                      return (
                                                         classProps.deleted !== true && (
                                                            <Fragment key={ classProps.slug }>
                                                               <div
                                                                  className='item'
                                                                  role='presentation'
                                                                  onClick={ e => toggleSectionComponent(e) }
                                                               >
                                                                  <Text
                                                                     inner={ classProps.name }
                                                                     type={ types.regular148 }
                                                                     size={ sizes.medium }
                                                                  />
                                                                  <div className='component_arrow'>
                                                                     <IconNew name='SchoolRoomComponentDown' />
                                                                  </div>
                                                               </div>
                                                               <div className='SubSubSectionComponent' id={ classProps.slug } style={ { display: 'none' } }>
                                                                  {editableSection
                                                                  && showEditableComponent(
                                                                     classProps,
                                                                     classProps.slug,
                                                                     i,
                                                                     j,
                                                                     k
                                                                  )}
                                                               </div>
                                                            </Fragment>
                                                         )
                                                      );
                                                   })}
                                                   <div className='m-t-exl flex justify-center'>
                                                      <Button
                                                         theme={ themes.red }
                                                         text='Delete'
                                                         onClick={ () => deleteClass(i, j) }
                                                      />
                                                   </div>
                                                </div>
                                             </Fragment>
                                          </div>
                                       </Fragment>
                                    );
                                 })}
                              </Draggable>
                           )
                        );
                     }
                     return null;
                  })}
                  {sectionProvided.placeholder}
               </div>
            )}
      </Droppable>
   );
};

SliderComponentMenu.propTypes = {
   showEditableComponent: PropTypes.func,
   toggleSectionComponent: PropTypes.func,
   editableSection: PropTypes.object,
   i: PropTypes.number,
   componentSubComponents: PropTypes.array,
   component: PropTypes.object,
   deleteClass: PropTypes.func,
};

export default SliderComponentMenu;
