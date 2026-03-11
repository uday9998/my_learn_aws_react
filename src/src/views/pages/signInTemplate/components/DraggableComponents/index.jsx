import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import useDraggableInPortal from 'utils/pageBuilder/useDraggableInPortal';
import UpsellViewImage from '../../View/Image';
import UpsellViewProduct from '../../View/Product';
import UpsellViewText from '../../View/Text';
import UpsellViewPricing from '../../View/Pricing';
import UpsellViewButton from '../../View/Button';
import UpsellViewGuarantee from '../../View/Guarantee';
import UpsellViewContact from '../../View/Contact';

import './index.scss';

const DraggableComponents = ({
   components, selectItem, isPreview, data, sectionIndex, changeProp,
}) => {
   const renderDraggable = useDraggableInPortal();
   const getCurrentItem = (type) => {
      switch (type) {
         case 'image':
            return UpsellViewImage;
         case 'product':
            return UpsellViewProduct;
         case 'text':
            return UpsellViewText;
         case 'pricing':
            return UpsellViewPricing;
         case 'button':
            return UpsellViewButton;
         case 'guarantee':
            return UpsellViewGuarantee;
         case 'contactBottom':
            return UpsellViewContact;
         default:
            return null;
      }
   };
   return (
      <div className='upsell-drag'>
         {components.map((component, i) => {
            if ((component.props.visibility !== false)) {
               return (
                  <Draggable
                     draggableId={ component.slug }
                     index={ i }
                     key={ component.slug }
                     isDragDisabled={ !!component.props.isNotDraggables }
                  >
                     {renderDraggable((sectionDragProvided) => {
                        const Component = getCurrentItem(component.type);
                        if (!Component) {
                           return (
                              <div>
                                undefined
                              </div>
                           );
                        }
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
                                 <Component
                                    { ...component.props }
                                    isPreview={ isPreview }
                                    selectItem={ selectItem }
                                    subcomponents={ component.subcomponents || component.subcomponent }
                                    index={ i }
                                    changeSubProp={ changeProp }
                                    data={ data }
                                    changeProp={ (value, name) => changeProp(value, name, 'component', sectionIndex, i) }
                                    sectionIndex={ sectionIndex }
                                 />
                              </div>
                           </Fragment>
                        );
                     })}
                  </Draggable>

               );
            }
            return null;
         })}
      </div>
   );
};

DraggableComponents.propTypes = {
   components: PropTypes.array,
   selectItem: PropTypes.func,
   isPreview: PropTypes.bool,
   data: PropTypes.object,
   changeProp: PropTypes.func,
   sectionIndex: PropTypes.number,
};

export default DraggableComponents;
