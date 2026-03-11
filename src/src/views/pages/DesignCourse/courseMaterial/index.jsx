/* eslint-disable max-len */
import React, { useRef, useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LessonItem from 'components/elements/designCourse/courseMaterial/LessonItem';
import Icon from 'components/elements/Icon';
import SectionItem from 'components/modules/reorderLessons/SectionItem';
import LessonItems from 'components/modules/reorderLessons/SectionSortableList/LessonItems.jsx';
import NewSection from 'components/modules/designCourse/courseMaterial/NewSection';
import AudioLesson from 'components/modules/designCourse/courseMaterial/AudioLesson';
import LessonSettings from 'components/modules/designCourse/courseMaterial/LessonSettings';
import LessonResources from 'components/modules/designCourse/courseMaterial/LessonResources';
import LessonComments from 'components/modules/designCourse/courseMaterial/LessonComments';
import VideoLesson from 'components/modules/designCourse/courseMaterial/VideoLesson';
import FileLesson from 'components/modules/designCourse/courseMaterial/FileLesson';
import PdfLesson from 'components/modules/designCourse/courseMaterial/PdfLesson';
import PptLesson from 'components/modules/designCourse/courseMaterial/PptLesson';
import QuizLesson from 'components/modules/designCourse/courseMaterial/QuizLesson';
import TextLesson from 'components/modules/designCourse/courseMaterial/TextLesson';
import ImageLesson from 'components/modules/designCourse/courseMaterial/ImageLesson';
import CourseEmpty from 'views/pages/DesignCourse/courseMaterial/CourseEmpty';
import AddSectionModule from 'components/modules/designCourse/courseMaterial/AddSection';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import SectionSortableList from 'components/modules/reorderLessons/SectionSortableList';
import ZoomLesson from 'components/modules/designCourse/courseMaterial/ZoomLesson';

const CourseMaterial = ({
   addLesson, deleteLesson, selectLesson, lessonActionInProgress, deleteSection,
   sections, addingSection, handleAddingSection, handleInputChange, removeFile, editSection, zoomLoader,
   createSection, selectSection, currentSection, currentLesson, lessonContent, saveLesson, addQuestion, saveZoomSettingsView,
   updateQuestion, deleteQuestion, commentsSectionData, lessonResources, lessonResourceActionInProgress, goToIntegration,
   deleteLessonResource, editLessonResource, openResourceEdit, currentResource, mobileCourse, saveLessonSettings, settingsActionInProgress,
   onReorderSections, openSelectVideoModal, isQuestionSaved, addQuestionAction, uploadVideosSize, authUser, app, mainApp, handleSaveVideoLessonImg, integrations,
}) => {
   const newSectionDiv = useRef(null);
   const scrollingDiv = useRef(null);
   const addLessonMenuRef = useRef(null);
   useEffect(() => {
      if (addingSection) {
         const topPos = newSectionDiv && newSectionDiv.current ? newSectionDiv.current.offsetTop : 0;
         if (scrollingDiv && scrollingDiv.current) scrollingDiv.current.scrollTop = topPos;
      }
   }, [addingSection]);

   const [newSectionTilte, setNewSectionTilte] = useState('');
   const [activeName, setActiveName] = useState('Lesson Title');
   const [addLessonSectionId, setAddLessonSectionId] = useState();
   function handleChildClick(newSectionTilteAuto) {
      setNewSectionTilte(newSectionTilteAuto);
   }


   useEffect(() => {
      function onClickOutSide({ target }) {
         if (addLessonMenuRef.current
            && !addLessonMenuRef.current.contains(target)
         ) {
            setAddLessonSectionId(null);
         }
      }
      document.addEventListener('mousedown', onClickOutSide, false);
      return () => {
         document.removeEventListener('mousedown', onClickOutSide);
      };
   }, [setAddLessonSectionId, addLessonMenuRef.current]);

   function onSectionChange(addLessonMenuEl, sectionId) {
      selectSection(sectionId);
      addLessonMenuRef.current = addLessonMenuEl;
   }

   function onChangeAddLesson(sectionId, addLessonMenuEl, isClose) {
      addLessonMenuRef.current = addLessonMenuEl;
      setAddLessonSectionId(isClose ? null : sectionId);
   }

   function onReorder(newSections, formatedSections) {
      onReorderSections(newSections, formatedSections);
   }

   return (
      <div className='d-courseMaterial h-full flex w-full'>
         {
            sections.length === 0 ? (
               <CourseEmpty
                  addingSection={ addingSection }
                  handleAddingSection={ (bool) => handleAddingSection(bool) }
                  handleInputChange={ (name, value, target) => handleInputChange(name, value, target) }
                  createSection={ createSection }
                  newSectionDiv={ newSectionDiv }
                  scrollingDiv={ scrollingDiv }
                  handleChildClick={ handleChildClick }
                  newSectionTilte={ newSectionTilte }
               />
            ) : (
               <>
                  {
                     ((mobileCourse && !mobileCourse.isActiveLessonTab) || window.innerWidth > 1023) && (
                        <div
                           className='content_left mob-content_left w-half'
                           ref={ scrollingDiv }
                           id='course_left_content'
                        >
                           {(!mobileCourse.isActiveLessonTab || window.innerWidth > 1023)
                            && (
                               <div
                                  className='m-r-exl mob-content_left-content'
                                  onClick={ (e) => e.stopPropagation() }
                                  role='presentation'
                                  id='course_left_content_scroll'
                               >
                                  <SectionSortableList sections={ sections } onChange={ onReorder }>
                                     {(provided, snapshot, section, getItemStyle) => (
                                        <SectionItem
                                           ref={ provided.innerRef }
                                           selectSection={
                                              addLessonMenuEl => onSectionChange(addLessonMenuEl, section.id)
                                           }
                                           title={ section.name }
                                           showMenu={ section.id === addLessonSectionId }
                                           onChangeAddLesson={ (addLessonMenuEl, isClose = false) => onChangeAddLesson(section.id, addLessonMenuEl, isClose) }
                                           addLesson={
                                              (lessonFormat) => {
                                                 addLesson(section.id, lessonFormat);
                                              }
                                           }
                                           integrations={ integrations }
                                           goToIntegration={ goToIntegration }
                                           lastSectionId={ sections[sections.length - 1].id }
                                           dragHandle={ (
                                              <span
                                                 className='dragHandleIcon'
                                                 { ...provided.dragHandleProps }

                                              >
                                                 <Icon name='Dragdrop' />
                                              </span>
                                           ) }
                                           style={ getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style
                                           ) }
                                           active={
                                              (currentSection && section.id === currentSection.id)
                                             || (currentLesson && section.id === currentLesson.section_id)
                                           }
                                           { ...provided.draggableProps }
                                        >
                                           <>
                                              <LessonItems
                                                 subItems={ section.lessons }
                                                 type={ String(section.id) }
                                              >
                                                 {(item, p) => {
                                                    return (
                                                       <LessonItem
                                                          index={ item.id }
                                                          key={ item.id }
                                                          name={ item.name }
                                                          draft={ item.draft }
                                                          isFreeLesson={ item.is_free_lesson }
                                                          format={ item.lesson_format }
                                                          active={ currentLesson ? currentLesson.id === item.id : null }
                                                          sectionId={ item.section_id }
                                                          deleteLesson={ () => deleteLesson(section.id, item.id) }
                                                          activeName={ activeName }
                                                          isDisabled={ !!item.prerequisite }
                                                          selectLesson={ (sectionId, lessonId) => selectLesson(sectionId, lessonId) }
                                                          dragHandle={ (
                                                             <span
                                                                className='dragHandleIcon lessonDragIcon'
                                                                { ...p.dragHandleProps }
                                                             >
                                                                <Icon name='Dragdrop' color='#C2CEDB' />
                                                             </span>
                                                          ) }
                                                       />
                                                    );
                                                 }}
                                              </LessonItems>
                                              {provided.placeholder}
                                           </>
                                        </SectionItem>
                                     )}
                                  </SectionSortableList>
                                  {
                                     addingSection && window.innerWidth > 1023 ? (
                                        <div className='m-b-exl m-t-m' ref={ newSectionDiv }>
                                           <AddSectionModule newSectionTilte={ newSectionTilte } />
                                        </div>
                                     ) : (
                                        <div className='m-t-m'>
                                           <BaseButton
                                              theme={ btnType.blueBordered }
                                              size={ btnSize.full }
                                              text='Add Section'
                                              onClick={ () => handleAddingSection(true) }
                                           />
                                        </div>

                                     )

                                  }
                                  <div style={ { height: '220px' } } />
                               </div>
                            ) }

                           {/* <SortableContainer onSortEnd={ onSortEnd } helperClass='sortableHelper' useDragHandle>
                              <div
                                 className='m-r-exl mob-content_left-content'
                                 onClick={ (e) => e.stopPropagation() }
                                 role='presentation'
                                 id='course_left_content_scroll'
                              >
                                 {
                                    (!mobileCourse.isActiveLessonTab || window.innerWidth > 1023) && sections.map((section, index) => (
                                       <SortableList
                                          index={ index }
                                          key={ section.id }
                                          id={ section.id }
                                          sectionId={ section.id }
                                          lastSectionId={ sections[sections.length - 1].id }
                                          section={ section }
                                          active={
                                             (currentSection && section.id === currentSection.id)
                                             || (currentLesson && section.id === currentLesson.section_id)
                                          }
                                          title={ section.name }
                                          lessons={ section.lessons }
                                          addLesson={
                                             (lessonFormat) => addLesson(
                                                section.id,
                                                lessonFormat)
                                          }
                                          selectedLessons={ selectedLessons }
                                          deleteLesson={ deleteLesson }
                                          selectLesson={ (sectionId, lessonId) => selectLesson(sectionId, lessonId) }
                                          selectSection={ () => selectSection(section.id) }
                                          currentLesson={ currentLesson }
                                          onReorderLessons={ (data => onReorderLessons(data, section.id)) }
                                          activeName={ activeName }
                                       />
                                    ))
                                 }
                                 <div className={ `${ mobileCourse.isActiveLessonTab ? '' : 'm-t-m m-b-exl' }` }>
                                    {
                                       addingSection && window.innerWidth > 1023 ? (
                                          <div className='m-b-exl' ref={ newSectionDiv }>
                                             <AddSectionModule newSectionTilte={ newSectionTilte } />
                                          </div>
                                       ) : (
                                          <BaseButton
                                             theme={ btnType.blueBordered }
                                             size={ btnSize.full }
                                             text='Add Section'
                                             onClick={ () => handleAddingSection(true) }
                                          />

                                       )

                                    }
                                 </div>
                              </div>
                           </SortableContainer> */}

                        </div>

                     )
                  }
                  {
                     ((mobileCourse && mobileCourse.isActiveLessonTab) || window.innerWidth > 1023) && (
                        <div className='content_right mob-courseMaterial-lesson'>
                           {
                              !lessonActionInProgress && (
                                 <div className={ `${ mobileCourse.isActiveLessonTab ? 'lesson-content' : 'm-l-exl' }` }>
                                    {
                                       currentLesson && !addingSection
                                          ? {
                                             video: <VideoLesson
                                                title={ currentLesson.name }
                                                autoplay={ currentLesson.autoplay }
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                src={ lessonContent && lessonContent.src }
                                                posterImg={ lessonContent && lessonContent.picture_src }
                                                lessonContentId={ lessonContent && lessonContent.id }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                handleSaveVideoLessonImg={
                                                   (videoId, imgSrc) => handleSaveVideoLessonImg(videoId, imgSrc)
                                                }
                                                type='video'
                                                settingsActionInProgress={ settingsActionInProgress }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                                uploadVideosSize={ uploadVideosSize }
                                                authUser={ authUser }
                                                app={ app }
                                                lessonContent={ lessonContent }
                                             />,
                                             youtube: <VideoLesson
                                                title={ currentLesson.name }
                                                autoplay={ currentLesson.autoplay }
                                                src={ lessonContent && lessonContent.src }
                                                removeFile={ removeFile }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                type='youtube'
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                                uploadVideosSize={ uploadVideosSize }
                                                authUser={ authUser }
                                                app={ app }
                                                lessonContent={ lessonContent }
                                                mainApp={ mainApp }
                                             />,
                                             vimeo: <VideoLesson
                                                title={ currentLesson.name }
                                                autoplay={ currentLesson.autoplay }
                                                src={ lessonContent && lessonContent.src }
                                                removeFile={ removeFile }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                type='vimeo'
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                                uploadVideosSize={ uploadVideosSize }
                                                authUser={ authUser }
                                                app={ app }
                                                lessonContent={ lessonContent }
                                                mainApp={ mainApp }
                                             />,
                                             wistia: <VideoLesson
                                                title={ currentLesson.name }
                                                autoplay={ currentLesson.autoplay }
                                                src={ lessonContent && lessonContent.src }
                                                removeFile={ removeFile }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                type='wistia'
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                openSelectVideoModal={ openSelectVideoModal }
                                                setActiveName={ setActiveName }
                                                uploadVideosSize={ uploadVideosSize }
                                                authUser={ authUser }
                                                app={ app }
                                                lessonContent={ lessonContent }
                                                mainApp={ mainApp }
                                             />,
                                             'video-embed': <VideoLesson
                                                title={ currentLesson.name }
                                                autoplay={ currentLesson.autoplay }
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                embedSrc={ lessonContent && lessonContent.src }
                                                removeFile={ removeFile }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                type='video-embed'
                                                settingsActionInProgress={ settingsActionInProgress }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                                uploadVideosSize={ uploadVideosSize }
                                                authUser={ authUser }
                                                lessonContent={ lessonContent }
                                                app={ app }
                                                mainApp={ mainApp }
                                             />,
                                             audio: <AudioLesson
                                                title={ currentLesson.name }
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                src={ lessonContent && lessonContent.src }
                                                lessonContent={ lessonContent }
                                                removeFile={ removeFile }
                                                autoplay={ currentLesson.autoplay }
                                                settingsActionInProgress={ settingsActionInProgress }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                             />,
                                             zoom: <ZoomLesson
                                                title={ currentLesson.name }
                                                zoomLoader={ zoomLoader }
                                                userZoomType={ currentLesson.zoom_user_type }
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                src={ lessonContent && lessonContent.src }
                                                lessonContent={ lessonContent }
                                                zoomSettings={ currentLesson.zoom_meeting ? currentLesson.zoom_meeting : {} }
                                                removeFile={ removeFile }
                                                autoplay={ currentLesson.autoplay }
                                                settingsActionInProgress={ settingsActionInProgress }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                handleZoomSettingsSave={
                                                   (params, data) => saveZoomSettingsView(currentLesson.section_id, currentLesson.id, params, data)
                                                }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                             />,
                                             text: <TextLesson
                                                title={ currentLesson.name }
                                                description={ lessonContent && lessonContent.description }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                setActiveName={ setActiveName }
                                             />,
                                             image: <ImageLesson
                                                title={ currentLesson.name }
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                src={ lessonContent && lessonContent.src }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }

                                                extension={ lessonContent && lessonContent.extension }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                             />,
                                             pdf: <PdfLesson
                                                title={ currentLesson.name }
                                                src={ lessonContent && lessonContent.src }
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                removeFile={ removeFile }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                             />,
                                             ppt: <PptLesson
                                                title={ currentLesson.name }
                                                src={ lessonContent && lessonContent.src }
                                                description={ currentLesson.description ? currentLesson.description : (lessonContent && lessonContent.description) }
                                                removeFile={ removeFile }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                openSelectVideoModal={ () => openSelectVideoModal(currentLesson.section_id, currentLesson.id) }
                                                setActiveName={ setActiveName }
                                             />,
                                             quiz: <QuizLesson
                                                title={ currentLesson.name }
                                                questions={ lessonContent }
                                                addQuestion={
                                                   (params) => addQuestion(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                updateQuestion={
                                                   (questionId, params) => updateQuestion(currentLesson.section_id, currentLesson.id, questionId, params)
                                                }
                                                deleteQuestion={
                                                   (questionId) => deleteQuestion(currentLesson.section_id, currentLesson.id, questionId)
                                                }
                                                isQuestionSaved={ isQuestionSaved }
                                                addQuestionAction={ addQuestionAction }
                                                setActiveName={ setActiveName }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                             />,
                                             multimedia: <FileLesson
                                                title={ currentLesson.name }
                                                src={ lessonContent && lessonContent.src }
                                                handleSave={
                                                   (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                setActiveName={ setActiveName }
                                             />,
                                          }[currentLesson.lesson_format]
                                          : !addingSection && (
                                             <NewSection
                                                sectionAdded={ true }
                                                title={ currentSection && currentSection.name }
                                                editSection={ (params) => editSection(currentSection && currentSection.id, params) }
                                                deleteSection={ () => deleteSection(currentSection && currentSection.id) }
                                                onChildClick={ handleChildClick }
                                             />
                                          )
                                    }
                                    {
                                       currentLesson && !addingSection && (
                                       <>
                                          <div className='m-t-exs'>
                                             {/* {!settingsActionInProgress && ( */}
                                             <LessonSettings
                                                currentLesson={ currentLesson }
                                                title={ currentLesson.description }
                                                handleSave={
                                                   (params) => saveLessonSettings(currentLesson.section_id, currentLesson.id, params)
                                                }
                                                handleInputChange={ (name, value, target) => handleInputChange(name, value, target) }
                                             />

                                             {/*  )} */}

                                          </div>
                                          <div className='m-t-exs'>
                                             { !lessonResourceActionInProgress && (
                                                <LessonResources
                                                   lessonResources={ lessonResources }
                                                   handleSave={
                                                      (params) => saveLesson(currentLesson.section_id, currentLesson.id, params)
                                                   }
                                                   handleDelete={
                                                      (resourceId) => deleteLessonResource(currentLesson.section_id, currentLesson.id, resourceId)

                                                   }
                                                   handleEdit={
                                                      (params) => editLessonResource(currentLesson.section_id, currentLesson.id, params)

                                                   }
                                                   handleInputChange={ (name, value, target) => handleInputChange(name, value, target) }
                                                   openResourceEdit={ openResourceEdit }
                                                   currentResource={ currentResource }
                                                />
                                             )
                                             }

                                          </div>
                                          <div className='m-t-exs'>
                                             <LessonComments
                                                { ...commentsSectionData }
                                             />
                                          </div>
                                       </>
                                       )
                                    }
                                    {
                                       addingSection && (
                                          <NewSection
                                             sectionAdded={ false }
                                             createSection={ createSection }
                                             onChildClick={ handleChildClick }
                                          />
                                       )
                                    }
                                 </div>
                              )
                           }

                        </div>
                     )
                  }


               </>
            )
         }

      </div>
   );
};


CourseMaterial.propTypes = {
   addLesson: PropTypes.func,
   selectLesson: PropTypes.func,
   deleteLesson: PropTypes.func,
   selectedLessons: PropTypes.array,
   sections: PropTypes.array,
   addingSection: PropTypes.bool,
   lessonActionInProgress: PropTypes.bool,
   handleAddingSection: PropTypes.func,
   saveLesson: PropTypes.func,
   handleInputChange: PropTypes.func,
   createSection: PropTypes.func,
   currentSection: PropTypes.any,
   selectSection: PropTypes.func,
   currentLesson: PropTypes.any,
   lessonContent: PropTypes.any,
   removeFile: PropTypes.func,
   editSection: PropTypes.func,
   deleteSection: PropTypes.func,
   addQuestion: PropTypes.func,
   updateQuestion: PropTypes.func,
   deleteQuestion: PropTypes.func,
   commentsSectionData: PropTypes.object,
   lessonResources: PropTypes.array,
   deleteLessonResource: PropTypes.func,
   lessonResourceActionInProgress: PropTypes.bool,
   editLessonResource: PropTypes.func,
   openResourceEdit: PropTypes.func,
   currentResource: PropTypes.object,
   mobileCourse: PropTypes.object,
   saveLessonSettings: PropTypes.func,
   onReorderLessons: PropTypes.func,
   onReorderSections: PropTypes.func,
   openSelectVideoModal: PropTypes.func,
   settingsActionInProgress: PropTypes.bool,
   isQuestionSaved: PropTypes.bool,
   addQuestionAction: PropTypes.func,
   uploadVideosSize: PropTypes.object,
   authUser: PropTypes.object,
   app: PropTypes.object,
   mainApp: PropTypes.object,
   handleSaveVideoLessonImg: PropTypes.func,
   integrations: PropTypes.object,
   goToIntegration: PropTypes.func,
   saveZoomSettingsView: PropTypes.func,
   zoomLoader: PropTypes.bool,
};

export default CourseMaterial;
