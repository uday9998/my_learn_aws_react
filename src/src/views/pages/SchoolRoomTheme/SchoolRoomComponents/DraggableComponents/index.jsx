import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import Text from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Text';
import Bullets from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Bullets';
import Button from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Button';
import Image from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Image';
import Video from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Video';
import Divider from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Divider';
import FAQ from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/FAQ';
import CallToAction from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/CallToAction';
import CustomCode from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/CustomCode';
import CountDown from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/CountDown';
import Banner from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Banner';
import VideoSection from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/VideoSection';
import './index.scss';

const DraggableComponents = ({
   components, onClick, isPreview, bulletIconName, style, type, sectionIndex,
   changeProp, handleDuplicateComponent, handleDeleteComponent, showLastDropMessage
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
               style={ style }
               changeProp={ changeProp }
               index={ index }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
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
               type={ type }
               index={ index }
               style={ style }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               changeProp={ changeProp }
            />
         );
            break;
         case 'button': ComponentName = (
            <Button
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               style={ style }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         );
            break;
         case 'image': ComponentName = (
            <Image
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               type={ type }
               style={ style }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         );
            break;
         case 'video': ComponentName = (
            <Video
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               style={ style }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         );
            break;
         case 'divider': ComponentName = (
            <Divider
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         );
            break;
         case 'FAQ': ComponentName = (
            <FAQ
               { ...component }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               style={ style }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
               changeProp={ changeProp }
            />
         );
            break;
         case 'calltoaction': ComponentName = (
            <CallToAction
               { ...component }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               changeProp={ changeProp }
               style={ style }
               index={ index }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
            />
         );
            break;
         case 'customcode': ComponentName = (
            <CustomCode
               { ...component }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               style={ style }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         );
            break;
         case 'countdown': ComponentName = (
            <CountDown
               { ...component }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               style={ style }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         );
            break;
         // eslint-disable-next-line no-unused-expressions
         case 'banner': component.props.school_show_banner ? ComponentName = (
            <Banner
               { ...component.props }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               showTitle={ component.subcomponent[0].props.visibility }
               bannerTitle={ component.subcomponent[0] }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
               changeProp={ changeProp }
            />
         ) : ComponentName = '';
            break;
         case 'videosection': ComponentName = (
            <VideoSection
               { ...component }
               slug={ component.slug }
               onClick={ onClick }
               isPreview={ isPreview }
               style={ style }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         );
            break;
         default:
      }
      return ComponentName;
   };


   return (
      <div className='schoolroom-drag'>
         {components.map((component, i) => {
            if (!component.props.deleted && (component.props.visibility !== false)) {
               return (
                  <Draggable
                     draggableId={ component.slug }
                     index={ i }
                     key={ component.slug }
                     isDragDisabled={ !!component.props.isNotDraggables || isPreview }
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
         {showLastDropMessage && <section className='drop_element_here'>DROP ELEMENT HERE</section>}
      </div>
   );
};

DraggableComponents.propTypes = {
   components: PropTypes.array,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   bulletIconName: PropTypes.string,
   disableArrow: PropTypes.bool,
   type: PropTypes.string,
   style: PropTypes.object,
   sectionIndex: PropTypes.number,
   changeProp: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   showLastDropMessage: PropTypes.bool,
};

export default DraggableComponents;
