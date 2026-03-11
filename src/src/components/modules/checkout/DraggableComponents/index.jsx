import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Text from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Text';
import Logo from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Logo';
import Image from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Image';
import Divider from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Divider';
import Button from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Button';
import Video from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Video';
import Testimonials from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Testimonials';
import Bullets from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Bullets';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import Pricings from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Pricings';
import FaqElement from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/FaqElement';
import './index.scss';

const DraggableComponents = ({
   components, onClick, isPreview, bulletIconName, disableArrow, checkoutType, course, sectionIndex,
   siteInfo, changeProp, handleDuplicateComponent, handleDeleteComponent, pricings, templateName, sections, isDraggingOver
}) => {
   const renderDraggable = useDraggableInPortal();
   const componentTypeFunction = (component, index) => {
      let ComponentName;

      switch (component.type) {
         case 'text': ComponentName = (
            <Text
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               course={ course }
               changeProp={ changeProp }
               index={ index }
               sectionIndex={ sectionIndex }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               templateName={ templateName }
               sections={ sections }
            />
         );
            break;
         case 'logo': ComponentName = (
            <Logo
               { ...component.props }
               handleDeleteComponent={ handleDeleteComponent }
               handleDuplicateComponent={ handleDuplicateComponent }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               course={ course }
               siteInfo={ siteInfo }
            />
         );
            break;
         case 'button': ComponentName = (
            <Button
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               sectionIndex={ sectionIndex }
               index={ index }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               className='actions__visible'
            />
         );
            break;
         case 'image': ComponentName = (
            <Image
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               checkoutType={ checkoutType }
               course={ course }
               sectionIndex={ sectionIndex }
               index={ index }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               templateName={ templateName }
            />
         );
            break;
         case 'testimonials': ComponentName = (
            <Testimonials
               { ...component }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               disableArrow={ disableArrow }
               checkoutType={ checkoutType }
               index={ index }
               changeProp={ changeProp }
               sectionIndex={ sectionIndex }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               templateName={ templateName }
            />
         );
            break;
         case 'bullets': ComponentName = (
            <Bullets
               { ...component }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               bulletIconName={ bulletIconName }
               checkoutType={ checkoutType }
               index={ index }
               changeProp={ changeProp }
               sectionIndex={ sectionIndex }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               pricings={ pricings }
               sections={ sections }
               templateName={ templateName }
            />
         );
            break;
         case 'video': ComponentName = (
            <Video
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               sectionIndex={ sectionIndex }
               index={ index }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
            />
         );
            break;
         case 'pricing': ComponentName = (
            <Pricings
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               sectionIndex={ sectionIndex }
               index={ index }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               data={ pricings }
               templateName={ templateName }
               sections={ sections }
            />
         );
            break;
         case 'divider': ComponentName = (
            <Divider
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               sectionIndex={ sectionIndex }
               index={ index }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
            />
         );
            break;
         case 'faqElement': ComponentName = (
            <FaqElement
               { ...component.props }
               slug={ component.slug }
               changeProp={ changeProp }
               onClick={ onClick }
               isPreview={ isPreview }
               sectionIndex={ sectionIndex }
               index={ index }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
            />
         );
            break;
         default:
      }
      return ComponentName;
   };

   return (
      <div className='checkout-drag'>
         {components.map((component, i) => {
            if (!component.props.deleted && (component.props.visibility !== false)) {
               return (
                  <Draggable
                     draggableId={ `${component.slug}_${component.type}` }
                     index={ i }
                     key={ component.slug }
                     isDragDisabled={ !!component.props.isNotDraggables }
                  >
                     {renderDraggable((sectionDragProvided) => {
                        return (
                           <Fragment>
                              {sectionDragProvided.draggableProps.style.position !== 'fixed' && sectionDragProvided.draggableProps.style.transform !== null && <section className='drop_element_here'>DROP ELEMENT HERE</section> }
                              <div
                                 ref={ sectionDragProvided.innerRef }
                                 { ...sectionDragProvided.draggableProps }
                                 { ...sectionDragProvided.dragHandleProps }
                                 style={ { ...sectionDragProvided.draggableProps.style } }
                                 className='draggable_component'
                              >
                                 {componentTypeFunction(component, i)}
                              </div>
                           </Fragment>
                        );
                     })}
                  </Draggable>

               );
            }
            return null;
         })}
         {isDraggingOver && <section className='drop_element_here'>DROP ELEMENT HERE</section>}
      </div>
   );
};

DraggableComponents.propTypes = {
   components: PropTypes.array,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   bulletIconName: PropTypes.string,
   disableArrow: PropTypes.bool,
   checkoutType: PropTypes.string,
   course: PropTypes.object,
   sectionIndex: PropTypes.number,
   siteInfo: PropTypes.object,
   changeProp: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   pricings: PropTypes.array,
   templateName: PropTypes.string,
   sections: PropTypes.array,
   isDraggingOver: PropTypes.bool,
};

export default DraggableComponents;
