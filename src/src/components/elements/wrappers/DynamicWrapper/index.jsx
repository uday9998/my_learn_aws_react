import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import classnames from 'classnames';
import Tooltip from 'components/elements/members/Tooltip';
import Switch from 'components/elements/form/Switch';

const DynamicWrapper = ({
   children, isOpen, style, title, hasTooltip,
   borderColor, hasShadow, openedHasShadow, padding, backColor, openedBackColor,
   setIsOpen, hasCommentTooltip, hasEmailToolTip, tooltipText, notifyName, notifyEnrollment, handleInputChange,
   controlOpen, onStateChange, hasTrackingTooltip,
}) => {
   const [visibility, setVisibility] = useState(isOpen);
   const setOpenVisibility = (visible) => {
      setIsOpen(visible);
   };
   useEffect(() => {
      if (typeof controlOpen === 'boolean') {
         setVisibility(controlOpen);
      }
   }, [controlOpen]);

   useEffect(() => {
      if (typeof visibility === 'boolean' && typeof onStateChange === 'function') {
         onStateChange(visibility);
      }
   }, [visibility]);

   async function ChangeDisplay() {
      await setVisibility(!visibility);
      await setOpenVisibility(!visibility);
   }
   return (
      <div
         style={ visibility ? {
            ...style, borderColor, padding, backgroundColor: backColor,
         } : {
            borderColor, padding, backgroundColor: openedBackColor,
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
            onClick={ async () => {
               await ChangeDisplay();
            } }
         >
            <div className='flex'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ title }
               />
               {!!notifyName && (
                  <div className='m-l-s'>
                     <Switch
                        checked={ notifyEnrollment === 1 }
                        name={ notifyName }
                        onChange={ (name, value) => handleInputChange(name, value) }
                        isCommentPage={ true }
                        switchOnOff={ true }
                     />
                  </div>
               )
               }
            </div>
            {
               hasTooltip && visibility && <Tooltip />
            }
            {hasCommentTooltip && visibility
            && <Tooltip hintText={ tooltipText } isLessonSettings={ true } isComment={ true } />}
            {hasEmailToolTip && visibility && (
               <Tooltip
                  hintText={ tooltipText }
                  hintStyle={ { bottom: 'auto', top: '22px', left: '-110px' } }
               />
            )}
            {hasTrackingTooltip && visibility
            && <Tooltip hintText={ tooltipText } />}
            <Icon
               name='TriangleSvg'
               isOpen={ visibility }
            />
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
   hasTooltip: PropTypes.bool,
   borderColor: PropTypes.string,
   hasShadow: PropTypes.bool,
   openedHasShadow: PropTypes.bool,
   padding: PropTypes.string,
   backColor: PropTypes.string,
   openedBackColor: PropTypes.string,
   setIsOpen: PropTypes.func,
   notifyName: PropTypes.string,
   notifyEnrollment: PropTypes.number,
   handleInputChange: PropTypes.func,
   onStateChange: PropTypes.func,
   hasCommentTooltip: PropTypes.bool,
   hasEmailToolTip: PropTypes.bool,
   controlOpen: PropTypes.bool,
   tooltipText: PropTypes.string,
   hasTrackingTooltip: PropTypes.bool,
};

DynamicWrapper.defaultProps = {
   isOpen: false,
   title: 'Title',
   hasTooltip: false,
   borderColor: '#dfe5eb',
   hasShadow: false,
   padding: '23px 40px',
   backColor: '#fbfdff',
   openedBackColor: '#fbfdff',
   openedHasShadow: false,
   setIsOpen: () => {},
   notifyName: '',
};

export default DynamicWrapper;
