import React, { useState } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon.jsx';

const DynamicWrapper = ({
   children, isOpen, style, title,
   borderColor, hasShadow, openedHasShadow, padding, backColor, openedBackColor,
   setIsOpen,
}) => {
   const [visibility, setVisibility] = useState(isOpen);
   const setOpenVisibility = (visible) => {
      setIsOpen(visible);
   };
   return (
      <div
         style={ {
            ...style, borderColor, padding, backgroundColor: visibility ? openedBackColor : backColor,
         } }
         className={
            classnames(
               'dynamicWrapper',
               {
                  'dynamicWrapper__hasShadow': visibility ? openedHasShadow : hasShadow,
               })
         }
      >
         <div
            className='dynamicWrapper__title'
            role='presentation'
            onClick={ () => { setVisibility(!visibility); setOpenVisibility(!visibility); } }
         >
            <span>{title}</span>
            <Icon isOpen={ visibility } />
         </div>
         { visibility && (
            <div className='dynamicWrapper__content'>
               {children}
            </div>
         )}
      </div>
   );
};

DynamicWrapper.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]).isRequired,
   isOpen: PropTypes.bool,
   style: PropTypes.object,
   title: PropTypes.any,
   borderColor: PropTypes.string,
   hasShadow: PropTypes.bool,
   openedHasShadow: PropTypes.bool,
   padding: PropTypes.string,
   backColor: PropTypes.string,
   openedBackColor: PropTypes.string,
   setIsOpen: PropTypes.func,
};

DynamicWrapper.defaultProps = {
   isOpen: false,
   title: 'Title',
   borderColor: '#dfe5eb',
   hasShadow: false,
   padding: '23px 40px',
   backColor: '#fbfdff',
   openedBackColor: '#fbfdff',
   openedHasShadow: false,
   setIsOpen: () => {},
   // children: '',
};

export default DynamicWrapper;
