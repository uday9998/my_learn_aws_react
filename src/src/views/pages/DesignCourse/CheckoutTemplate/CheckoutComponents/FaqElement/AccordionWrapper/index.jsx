import React, { useState } from 'react';
import './index.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from './Icon.jsx';

const AccordionWrapper = ({
   children,
   style,
   title,
   isOpen,
   setIsOpen,
   hasShadow,
   openedHasShadow,
   backColor,
   openedBackColor,
   iconColor,
   borderRadius,
   borderColor,
   paddingTop,
   paddingLeft,
   paddingBottom,
   paddingRight,
}) => {
   const [visibility, setVisibility] = useState(isOpen);

   const setOpenVisibility = (visible) => {
      setIsOpen(visible);
   };

   return (
      <div
         style={ {
            ...style,
            borderRadius: `${borderRadius}px`,
            borderColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            paddingLeft: `${paddingLeft}px`,
            paddingRight: `${paddingRight}px`,
            backgroundColor: visibility ? openedBackColor : backColor,
         } }
         className={
            classnames(
               'accordionWrapper',
               {
                  'accordionWrapper__hasShadow': visibility ? openedHasShadow : hasShadow,
                  'accordionWrapper__open': visibility,
               })
         }
      >
         <div
            className='accordionWrapper__title'
            role='presentation'
            onClick={ () => {
               setVisibility(!visibility);
               setOpenVisibility(!visibility);
            } }
         >
            <span>{title}</span>
            <Icon
               isOpen={ visibility }
               color={ iconColor }
            />
         </div>
         <div
            className={`accordionWrapper__content${visibility ? ' show' : ''}`}
         >
            {children}
         </div>
      </div>
   );
};

AccordionWrapper.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]).isRequired,
   style: PropTypes.object,
   title: PropTypes.any,
   isOpen: PropTypes.bool,
   setIsOpen: PropTypes.func,
   hasShadow: PropTypes.bool,
   openedHasShadow: PropTypes.bool,

   backColor: PropTypes.string,
   openedBackColor: PropTypes.string,
   iconColor: PropTypes.string,
   borderRadius: PropTypes.number,
   borderColor: PropTypes.string,
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingBottom: PropTypes.number,
   paddingRight: PropTypes.number,
};

AccordionWrapper.defaultProps = {
   title: 'Title',
   isOpen: false,
   setIsOpen: () => {},
   hasShadow: false,
   openedHasShadow: false,

   backColor: 'transparent',
   openedBackColor: '#121212',
   iconColor: '#fff',
   borderRadius: '20px',
   borderColor: '#525355',
   paddingTop: 23,
   paddingLeft: 40,
   paddingBottom: 23,
   paddingRight: 40,
};

export default AccordionWrapper;
