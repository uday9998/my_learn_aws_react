import React from 'react';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import NavPanel from 'views/layout/designCourse/NavPanel/index.mob';
import CourseEmpty from 'views/pages/DesignCourse/courseMaterial/CourseEmpty/index.mob';
import AddSection from 'views/pages/DesignCourse/courseMaterial/AddSection/index.mob';
import CourseSection from 'views/pages/DesignCourse/courseMaterial/CourseSection/index.mob';
import AudioLesson from 'views/pages/DesignCourse/courseMaterial/AudioLesson/index.mob';
import VideoLesson from 'views/pages/DesignCourse/courseMaterial/VideoLesson/index.mob';
import QuizLesson from 'views/pages/DesignCourse/courseMaterial/QuizLesson/index.mob';
import TextLesson from 'views/pages/DesignCourse/courseMaterial/TextLesson/index.mob';
import FileLesson from 'views/pages/DesignCourse/courseMaterial/FileLesson/index.mob';
import ImageLesson from 'views/pages/DesignCourse/courseMaterial/ImageLesson/index.mob';
import PPTLesson from 'views/pages/DesignCourse/courseMaterial/PPTLesson/index.mob';
import PDFLesson from 'views/pages/DesignCourse/courseMaterial/PDFLesson/index.mob';
import NewSection from 'views/pages/DesignCourse/courseMaterial/NewSection/index.mob';
import BackdropFilter from 'components/elements/BackdropFilter';
import DeleteLesson from 'components/modules/designCourse/courseMaterial/Popups/DeleteLesson';
import UploadFile from 'components/modules/designCourse/courseMaterial/Popups/UploadFile';

const indexHash = (() => {
   let scopedIdex = 0;
   return () => {
      return ++scopedIdex;
   };
})();

storiesOf('App|Views/pages/designCourse/CourseMaterial/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Empty', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
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
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
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

      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <CourseSection
                  lessons={ lessons }
                  addLesson={ (lesson) => addLesson(lesson) }
                  selectedLessons={ selectedLessons }
                  deleteLesson={ (lesson) => deleteLesson(lesson) }
               />
            </Layout.Content>
         </Layout>
      );
   }))
   .add('Audio Lesson', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <AudioLesson />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Video Lesson', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <VideoLesson />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Video Lesson Added', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <VideoLesson
                  lessonAdded
               />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Quiz Lesson', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <QuizLesson />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Text Lesson', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <TextLesson />
            </Layout.Content>
         </Layout>
      );
   })
   .add('File Lesson', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <FileLesson />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Image Lesson', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <ImageLesson />
            </Layout.Content>
         </Layout>
      );
   })
   .add('PowerPoint Lesson', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <PPTLesson />
            </Layout.Content>
         </Layout>
      );
   })
   .add('PDF Lesson', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <PDFLesson />
            </Layout.Content>
         </Layout>
      );
   })
   .add('New Section', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <NewSection />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Uploading Files', () => {
      return (
         <BackdropFilter active>
            <Layout>
               <Layout.Header>
                  <SiteHeader
                     hasShadow={ false }
                  />
                  <NavPanel />
               </Layout.Header>
               <Layout.Content>
                  <PDFLesson />
               </Layout.Content>
            </Layout>
            <div style={ { maxWidth: '360px' } } className='flex align-center w-full'>
               <UploadFile />
            </div>
         </BackdropFilter>
      );
   })
   .add('Delete Lesson Modal', () => {
      return (
         <BackdropFilter active>
            <Layout>
               <Layout.Header>
                  <SiteHeader
                     hasShadow={ false }
                  />
                  <NavPanel />
               </Layout.Header>
               <Layout.Content>
                  <PDFLesson />
               </Layout.Content>
            </Layout>
            <div className='w-full flex align-center' style={ { maxWidth: '360px' } }>
               <DeleteLesson />
            </div>
         </BackdropFilter>
      );
   });
