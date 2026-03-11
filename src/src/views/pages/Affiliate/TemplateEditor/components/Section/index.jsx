import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import { Droppable } from 'react-beautiful-dnd';
import DraggableComponents from '../DraggableComponents';

const AffiliateSectionTop = ({
   section, data, isPreview, selectItem, sectionIndex, changeProp,
}) => {
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         className={ classNames({
            'affiliate__section__top': true,
         }) }
         // onMouseOver={ toggle }
         // onMouseOut={ toggle }
         onClick={ (e) => {
            if (!isPreview) {
               selectItem(e, sectionIndex);
            }
         } }
         role='presentation'
         style={ { background: section.affiliate_section.props.bgColor } }
      >
         <Droppable
            key={ section.affiliate_section.slug }
            droppableId={ section.affiliate_section.slug }
            type='element'
         >
            {
               (sectionProvided, snapshot) => (
                  <div
                     className='affiliate__section__top__item'
                     { ...sectionProvided.droppableProps }
                     ref={ sectionProvided.innerRef }
                     style={ snapshot.isDraggingOver
                        ? { ...sectionProvided.droppableProps.style, backgroundColor: '#A6C9C5' }
                        : { ...sectionProvided.droppableProps.style } }
                  >
                     <DraggableComponents
                        components={ section.affiliate_components }
                        isPreview={ isPreview }
                        selectItem={ selectItem }
                        data={ data }
                        changeProp={ changeProp }
                        sectionIndex={ sectionIndex }
                     />
                     {sectionProvided.placeholder}
                  </div>
               )
            }
         </Droppable>
         {/* {section.affiliate_components.map((e, index) => {
            const Component = getCurrentItem(e.type);
            if (!Component) {
               return (
                  <div>
                        undefined
                  </div>
               );
            }
            return (
               <div className='affiliate__section__top__item'>
                  <Component
                     { ...e.props }
                     isPreview={ isPreview }
                     selectItem={ selectItem }
                     subcomponents={ e.subcomponents }
                     index={ index }
                     data={ data }
                     sectionIndex={ sectionIndex }
                  />
               </div>
            );
         })} */}
      </div>
   );
};

AffiliateSectionTop.propTypes = {
   data: PropTypes.object,
   sectionIndex: PropTypes.number,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.func,
   changeProp: PropTypes.func,
   section: PropTypes.object,
};

export default AffiliateSectionTop;
