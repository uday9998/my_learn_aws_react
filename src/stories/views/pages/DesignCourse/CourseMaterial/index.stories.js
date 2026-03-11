import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Layout from 'views/layout';
import SideBar from 'components/modules/Sidebar';
import CourseEmpty from 'views/pages/DesignCourse/courseMaterial/CourseEmpty';
import AddSection from 'views/pages/DesignCourse/courseMaterial/AddSection';
import CourseSection from 'views/pages/DesignCourse/courseMaterial/CourseSection';
import CourseHeader from 'views/layout/designCourse/CourseHeader';
import CourseSectionModule from 'components/modules/designCourse/courseMaterial/CourseSection';
import AudioLesson from 'components/modules/designCourse/courseMaterial/AudioLesson';
import VideoLesson from 'components/modules/designCourse/courseMaterial/VideoLesson';
import QuizLesson from 'components/modules/designCourse/courseMaterial/QuizLesson';
import ImageLesson from 'components/modules/designCourse/courseMaterial/ImageLesson';
import PdfLesson from 'components/modules/designCourse/courseMaterial/PdfLesson';
import PptLesson from 'components/modules/designCourse/courseMaterial/PptLesson';
import TextLesson from 'components/modules/designCourse/courseMaterial/TextLesson';
import FileLesson from 'components/modules/designCourse/courseMaterial/FileLesson';
import AudioSettings from 'components/modules/designCourse/courseMaterial/AudioSettings';
import AudioResources from 'components/modules/designCourse/courseMaterial/AudioResources';
import AudioComments from 'components/modules/designCourse/courseMaterial/AudioComments';
import BackdropFilter from 'components/elements/BackdropFilter';
import DeleteLesson from 'components/modules/designCourse/courseMaterial/Popups/DeleteLesson';
import UploadFile from 'components/modules/designCourse/courseMaterial/Popups/UploadFile';

const indexHash = (() => {
   let scopedIdex = 0;
   return () => {
      return ++scopedIdex;
   };
})();

storiesOf('App|Views/pages/designCourse/CourseMaterial/desktop', module)
   .addDecorator(withKnobs)
   .add('Empty', () => {
      return (
         <Layout>
            <Layout.LeftBar>
               <SideBar />
            </Layout.LeftBar>
            <Layout.Header>
               <CourseHeader />
            </Layout.Header>
            <Layout.Content>
               <CourseEmpty />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Add Section', () => {
      return (
         <Layout>
            <Layout.LeftBar>
               <SideBar />
            </Layout.LeftBar>
            <Layout.Header>
               <CourseHeader />
            </Layout.Header>
            <Layout.Content>
               <AddSection />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Section Added', withState({
      lessons: [
         {
            name: 'Audio',
            icon: 'Audio',
            active: false,
         },
         {
            name: 'Video',
            icon: 'Video',
            active: false,
         },
         {
            name: 'Text',
            icon: 'Text',
            active: false,
         },
         {
            name: 'PDF',
            icon: 'File',
            active: false,
         },
         {
            name: 'PowerPoint',
            icon: 'Presentation',
            active: false,
         },
         {
            name: 'Image',
            icon: 'Image',
            active: false,
         },
         {
            name: 'Quiz',
            icon: 'Quiz',
            active: false,
         },
         {
            name: 'Multimedia',
            icon: 'Multimedia',
            active: false,
         },
      ],
      selectedLessons: [],
   })(({ store }) => {
      const { state: { lessons, selectedLessons } } = store;

      const addLesson = (lesson) => {
         const index = indexHash();
         const newSelectedLessons = [...selectedLessons];
         newSelectedLessons.push({ ...lesson, selected: true, index });

         store.set({ selectedLessons: newSelectedLessons });
      };

      const deleteLesson = (lesson) => {
         const withoutDeleted = selectedLessons.filter((elem) => {
            return elem.index !== lesson.index;
         });
         store.set({ selectedLessons: withoutDeleted });
      };

      const selectLesson = (id) => {
         const setActiveLesson = selectedLessons.map(lesson => {
            return lesson.index === id ? { ...lesson, active: true } : { ...lesson, active: false };
         });
         store.set({ selectedLessons: setActiveLesson });
      };

      const activeLesson = selectedLessons.find(e => e.active === true) || {};

      return (
         <Layout>
            <Layout.LeftBar>
               <SideBar />
            </Layout.LeftBar>
            <Layout.Header>
               <CourseHeader />
            </Layout.Header>
            <Layout.Content>
               <CourseSection
                  lessons={ lessons }
                  selectedLessons={ selectedLessons }
                  addLesson={ (lesson) => addLesson(lesson) }
                  deleteLesson={ (lesson) => deleteLesson(lesson) }
                  selectLesson={ (id) => selectLesson(id) }
                  activeLesson={ activeLesson }
               />
            </Layout.Content>
         </Layout>
      );
   }))
   .add('Adding Audio Lesson', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['Audio'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <AudioLesson />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Audio Lesson Settings', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['Audio'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <AudioLesson
                           lessonAdded
                        />
                        <div className='m-t-exs' />
                        <AudioSettings isOpen />
                        <div className='m-t-exs' />
                        <AudioResources />
                        <div className='m-t-exs' />
                        <AudioComments />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Audio Lesson Resourses', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['Audio'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <AudioLesson
                           lessonAdded
                        />
                        <div className='m-t-exs' />
                        <AudioSettings />
                        <div className='m-t-exs' />
                        <AudioResources isOpen />
                        <div className='m-t-exs' />
                        <AudioComments />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Audio Lesson Comments', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['Audio'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <AudioLesson
                           lessonAdded
                        />
                        <div className='m-t-exs' />
                        <AudioSettings />
                        <div className='m-t-exs' />
                        <AudioResources />
                        <div className='m-t-exs' />
                        <AudioComments isOpen />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Audio Lesson Added', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['Audio'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <AudioLesson
                           lessonAdded
                        />
                        <div className='m-t-exs' />
                        <AudioSettings />
                        <div className='m-t-exs' />
                        <AudioResources />
                        <div className='m-t-exs' />
                        <AudioComments />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Adding Video Lesson', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['video'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <VideoLesson />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Video Lesson Added', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['video'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <VideoLesson
                           lessonAdded
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Adding Quiz Lesson', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['quiz'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <QuizLesson />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Adding Image Lesson', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['image'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <ImageLesson />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Adding PowerPoint Lesson', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['presentation'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <PptLesson />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Adding PDF Lesson', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['multimedia'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <PdfLesson />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Adding Text Lesson', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['text'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <TextLesson />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Adding File Lesson', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['file'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <FileLesson />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Adding File', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <CourseSectionModule
                           addedLessons={ ['file'] }
                        />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <FileLesson upload />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Delete Lesson Modal', () => {
      return (
         <BackdropFilter active>
            <div className='container'>
               <SideBar />
               <div className='design-course'>
                  <CourseHeader />
                  <div className='design-course__content'>
                     <div className='design-course__left'>
                        <div className='design-course__left-container'>
                           <CourseSectionModule
                              addedLessons={ ['file'] }
                           />
                        </div>
                     </div>
                     <div className='design-course__right'>
                        <div className='design-course__right-container'>
                           <FileLesson />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='deleteLessonPopup'>
               <DeleteLesson />
            </div>
         </BackdropFilter>
      );
   })
   .add('Uploading Files', () => {
      return (
         <BackdropFilter active>
            <div className='container'>
               <SideBar />
               <div className='design-course'>
                  <CourseHeader />
                  <div className='design-course__content'>
                     <div className='design-course__left'>
                        <div className='design-course__left-container'>
                           <CourseSectionModule
                              addedLessons={ ['file'] }
                           />
                        </div>
                     </div>
                     <div className='design-course__right'>
                        <div className='design-course__right-container'>
                           <FileLesson />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='uploadFilePopup'>
               <UploadFile />
            </div>
         </BackdropFilter>
      );
   });
