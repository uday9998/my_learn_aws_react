import React from 'react';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import PropTypes from 'prop-types';
import DraggableComponents from 'components/modules/checkout/DraggableComponents';
import { Droppable } from 'react-beautiful-dnd';
import './index.scss';

const CheckoutHeader = ({
   showEditableComponent, sections, isPreview, course, deleteComponent, changeProp,
   handleDeleteComponent, handleDuplicateComponent,
}) => {
   const sectionsSort = sections[0].checkout_components.sort((a, b) => {
      return a.props.order - b.props.order;
   });

   return (
      <div>
         <div className='checkoutSubheaderThird'>
            <Droppable
               key={ sections[0].checkout_section.slug }
               droppableId={ sections[0].checkout_section.slug }
               type='element'
            >
               {
                  (sectionProvided, snapshot) => (
                     <div
                        className={ sectionsSort.filter(el => el.props.deleted !== true).length === 0 && !isPreview ? 'checkoutSubheader_empty' : '' }
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
                           checkoutType='template3'
                           course={ course }
                           deleteComponent={ deleteComponent }
                           sectionIndex={ 0 }
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
      </div>
   );
};

CheckoutHeader.propTypes = {
   siteInfo: PropTypes.object,
   showEditableComponent: PropTypes.func,
   sections: PropTypes.array,
   isPreview: PropTypes.bool,
   course: PropTypes.object,
   deleteComponent: PropTypes.func,
   changeProp: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      siteInfo: siteInfoSelector(state),
   };
};
const mapDispatchToProps = () => {
   return {


   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutHeader);
