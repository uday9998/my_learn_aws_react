import React, { useRef, useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'components/elements/Icon';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';

const LessonItem = ({
   index, name, format, deleteLesson, selectLesson, sectionId, active, activeName, draft, isDisabled,
   isFreeLesson, dragHandle,
}) => {
   const icons = {
      pdf: 'File',
      ppt: 'Presentation',
      text: 'Text',
      audio: 'Audio',
      video: 'Video',
      'video-embed': 'Video',
      youtube: 'Video',
      vimeo: 'Video',
      wistia: 'Video',
      image: 'Image',
      quiz: 'Quiz',
      multimedia: 'Multimedia',
      zoom: 'Zoom',
   };
   const lessonItem = useRef(null);

   const onMouseDown = () => {
      lessonItem.current.classList.add('dragDrop_active');
   };
   const onMouseUp = () => {
      lessonItem.current.classList.remove('dragDrop_active');
   };
   const onMouseLeave = () => {
      lessonItem.current.classList.remove('dragDrop_active');
   };

   const handleDelete = (e, i) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      deleteLesson(i);
   };

   const handleClick = (e, id) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      selectLesson(sectionId, id);
   };

   // const [newName, setNewName] = useState(name);
   // useEffect(() => {
   //    if (active && window.innerWidth >= 1024) {
   //       setNewName(activeName);
   //    }
   // }, [activeName]);

   return (
      <div
         className='lessonItem'

      >
         <div
            className={
               classNames(
                  {
                     'active': active && !isDisabled,
                     'lessonItem__content': !isDisabled,
                     'lessonItem__content_disabled': isDisabled,
                  }
               )
            }
            role='presentation'
            onMouseDown={ !isDisabled && onMouseDown }
            onMouseUp={ !isDisabled && onMouseUp }
            onMouseLeave={ !isDisabled && onMouseLeave }
            onClick={ ((e) => handleClick(e, index)) }
            ref={ lessonItem }
         >
            <div>
               { dragHandle }

               <Icon name={ format ? icons[format] : 'Text' } className='lessonItem__svg' />
               <Text
                  size={ txtSizes.small }
                  type={ txtType.normal }
                  inner={ name }
               />
            </div>
            <div>
               {(draft === 1 || draft === true) && (
                  <div className='drafticon'>
                     {/* <Icon name='Draft' /> */}
                     <Text
                        size={ txtSizes.extraSmall }
                        type={ txtType.normal }
                        inner='Draft'
                     />
                  </div>
               )}
               {!!isFreeLesson && (
                  <div className='drafticon'>
                     <Text
                        size={ txtSizes.extraSmall }
                        type={ txtType.normal }
                        inner='Free'
                     />
                  </div>
               )}

               <div
                  role='presentation'
                  className='close'
                  onClick={ (e) => handleDelete(e, index) }
               >
                  <Icon name='Close' />
               </div>
            </div>

         </div>
      </div>
   );
};

LessonItem.propTypes = {
   index: PropTypes.any,
   name: PropTypes.string,
   format: PropTypes.string,
   deleteLesson: PropTypes.func,
   selectLesson: PropTypes.func,
   sectionId: PropTypes.any,
   active: PropTypes.bool,
   isFreeLesson: PropTypes.bool,
   draft: PropTypes.any,
   activeName: PropTypes.string,
   isDisabled: PropTypes.bool,
};

export default LessonItem;
