/* eslint-disable camelcase */
import React, { forwardRef, useRef, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import LessonMenu from 'components/modules/designCourse/courseMaterial/LessonMenu';
import Tooltip from 'components/elements/members/Tooltip';
import Modal from 'components/elements/Modal';
import IntegrationModalContent from 'components/elements/IntegrationModalContent';

const SetionItem = forwardRef(({
   style, addLesson, children, title, active,
   selectSection, sectionId, lastSectionId, className, integrations, goToIntegration,
   dragHandle, showMenu, onChangeAddLesson, ...rest
}, ref) => {
   const defaultLessons = [
      {
         name: 'Audio',
         icon: 'Audio',
         value: 'audio',
      },
      {
         name: 'Video',
         icon: 'Video',
         value: 'video',
      },
      {
         name: 'Text',
         icon: 'Text',
         value: 'text',
      },
      {
         name: 'PDF',
         icon: 'File',
         value: 'pdf',
      },
      {
         name: 'PowerPoint',
         icon: 'Presentation',
         value: 'ppt',
      },
      {
         name: 'Image',
         icon: 'Image',
         value: 'image',
      },
      {
         name: 'Quiz',
         icon: 'Quiz',
         value: 'quiz',
      },
      {
         name: 'Multimedia',
         icon: 'Multimedia',
         value: 'multimedia',
      },
      {
         name: 'Live lesson',
         icon: 'Zoom',
         value: 'zoom',
      },
   ];
   const lessonMenuRef = useRef(null);
   const [isOpenIntegrationModal, setIsOpenIntegrationModal] = useState(false);
   return (
      <>
         {isOpenIntegrationModal && (
            <Modal
               blurColor='rgba(63, 79, 101, 0.6)'
               contentBgColor='#fff'
               contentPosition={ window.innerWidth < 1024 ? 'full-screen' : 'center' }
               closeOnClickOutside={ true }
               onClose={ () => setIsOpenIntegrationModal(false) }
            >
               <IntegrationModalContent
                  content='Hang On! You’ll need to integrate with a Zoom account first'
                  onCancel={ () => setIsOpenIntegrationModal(false) }
                  onApprove={ () => goToIntegration() }
               />
            </Modal>
         )
         }
         <div
            role='presentation'
            onClick={ (e) => {
               e.stopPropagation();
               selectSection(e.target, lessonMenuRef.current);
            } }
            style={ style }
            ref={ ref }
            { ...rest }
         >
            <ItemWrapper
               border={ active }
            >
               <div className='SetionItem courseSection'>
                  <div className='section__dragHandle'>
                     { dragHandle }
                  </div>

                  <Text
                     type={ textType.bold }
                     size={ textSize.medium }
                     inner={ title }
                     bold={ true }
                  />
                  <Tooltip
                     hintText='You can drag and drop lessons from one section to the other.'
                     style={ { top: '22px', right: '14px', position: 'absolute' } }
                     left={ true }
                     hintStyle={ { top: '18px', right: '12px' } }
                  />
                  { children }
                  <div
                     onClick={ (e) => {
                        const diff = e.target.parentNode.getBoundingClientRect().y;
                        const elementScroll = document.querySelector('#course_left_content_scroll');
                        const parentNode = e.target.parentNode.parentNode;
                        e.preventDefault();
                        const element = document.querySelector('#course_left_content');
                        if (e.target.parentNode && e.target.parentNode.parentNode) {
                           if (!showMenu && (e.target.id === `addLesson${ lastSectionId }`) && element) {
                              element.scroll(0, elementScroll.clientHeight);
                           } else if (!showMenu && parentNode.getBoundingClientRect().y > 100 && element) {
                              element.scroll(0, diff - elementScroll.getBoundingClientRect().top);
                           } else if (!showMenu && parentNode.getBoundingClientRect().y < 20) {
                              element.scroll(0, diff - elementScroll.getBoundingClientRect().top - 322);
                           }
                        }
                        e.stopPropagation();
                     } }
                     role='presentation'
                     id={ `section${ sectionId }` }
                     ref={ lessonMenuRef }
                     className={ cx(
                        'selectBtn-wrapper',
                        {
                           'selectBtn_active': showMenu,
                        })
                     }
                  >
                     <BaseButton
                        theme={ btnType.darkGreen }
                        size={ btnSize.large }
                        text='Add Lesson'
                        onClick={ () => {
                           onChangeAddLesson(lessonMenuRef.current);
                        } }
                        id={ `addLesson${ sectionId }` }
                     />
                     { showMenu ? (
                        <LessonMenu
                           lessons={ defaultLessons }
                           addLesson={ (arg) => {
                              if (arg === 'zoom') {
                                 if (integrations.zoom === null) {
                                    setIsOpenIntegrationModal(true);
                                 } else {
                                    addLesson(arg);
                                    onChangeAddLesson(lessonMenuRef.current, true);
                                 }
                              } else {
                                 addLesson(arg);
                                 onChangeAddLesson(lessonMenuRef.current, true);
                              }
                           } }
                        />
                     ) : null }
                  </div>
               </div>
            </ItemWrapper>
         </div>
      </>
   );
});

SetionItem.propTypes = {
   lessons: PropTypes.array,
   addLesson: PropTypes.func,
   selectLesson: PropTypes.func,
   deleteLesson: PropTypes.func,
   title: PropTypes.string,
   selectSection: PropTypes.func,
   onReorderLessons: PropTypes.func,
   onChangeAddLesson: PropTypes.func,
   active: PropTypes.bool,
   currentLesson: PropTypes.any,
   sectionId: PropTypes.any,
   lastSectionId: PropTypes.number,
   activeName: PropTypes.string,
   className: PropTypes.string,
   showMenu: PropTypes.bool,
   style: PropTypes.object,
   children: PropTypes.node,
   dragHandle: PropTypes.node,
   integrations: PropTypes.object,
};

export default SetionItem;
