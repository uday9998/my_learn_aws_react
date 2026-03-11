import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button, { THEMES as themes, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import { useHistory } from 'react-router';
import Icon from 'components/elements/Icon';
import TextWithSeeMore from 'components/modules/TextWithSeeMore';
import ModalVideo from 'components/modules/ModalVideo';
// import VideoAuthor from 'views/pages/VideoProgamsRoom/VideoAuthor';
import PreviewVideo from 'views/pages/Offers/components/OfferCard/previewVideo';
import ImageWithIcon from './ImageWithIcon';
import './index.scss';

function LessonWithNoPermission({
   onJoin,
   lessonName, lesson,
   course, authUser, isFreeCourse,
}) {
   const [showModal, setShowModal] = useState(course.type === '0');

   const history = useHistory();
   const handleVideoTrailer = () => {
      let videoUrl = '';
      if (!!lesson && !!lesson.is_system_preview_generated && !!lesson.poster) {
         const s3Url = process.env.REACT_APP_AWS_BUCKET_URL;
         const folderName = lesson.poster.split('.')[0];
         videoUrl = `${ s3Url }/videos/${ folderName }/outputs/preview/system2.mp4`;
      }
      return videoUrl;
      // return 'https://miestro-local.s3-us-west-2.amazonaws.com/687d792f8745a0b60e535d244b18d9f4/3e51dd3fh_1705573013765.mp4';
   };

   const videoImg = (lesson) => {
      let imageUrl = '';
      if (course.type === '0') {
         if (lesson && lesson.file && lesson.file.src) {
            return lesson.file.src;
         }
         return '';
      }
      if (lesson.css_attributes && lesson.css_attributes.image_src) {
         imageUrl = lesson.css_attributes.image_src;
      } else if (lesson.poster) {
         const s3Url = process.env.REACT_APP_AWS_BUCKET_URL;
         const folderName = lesson.poster.split('.')[0];
         const imageName = lesson.poster;
         imageUrl = `${ s3Url }/videos/${ folderName }/outputs/thumbnails/${ imageName }`;
      }
      return imageUrl;
      //  return 'https://dpqs86j6bppqj.cloudfront.net/videos/fc2g9dj03_1708329685828/outputs/thumbnails/fc2g9dj03_1708329685828.0000007.jpg';
   };

   const onLogin = () => {
      history.push('/login');
   };

   const handleShowModal = (lesson) => {
      if (!lesson.is_free_lesson) {
         setShowModal(prevState => !prevState);
      }
   };

   const hasTrailer = course.type === '1' && !!lesson && !!lesson.is_system_preview_generated
    && !!lesson.poster && !lesson.css_attributes?.hide_preview;

   // const LessonAuthor = (lesson && lesson.author) || (course && course.authors[0]);

   return (
      <div className={ course.type === '0' ? 'lesson-with-no-permission onlineLesson-with-no-permission' : 'lesson-with-no-permission' }>
         <div className='content'>
            {course.type === '1' && !hasTrailer && !!videoImg(lesson) && (
               <div onClick={ () => setShowModal(true) } role='presentation'>
                  <ImageWithIcon
                     src={ videoImg(lesson) ? videoImg(lesson) : 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png' }
                     lesson={ lesson }
                  />
               </div>
            )}

            {course.type === '1' && hasTrailer
               && (
                  <div className='videoTrailer'>
                     <PreviewVideo
                        previewSrc={ handleVideoTrailer() }
                        poster={ lesson.css_attributes && lesson.css_attributes.image_src }
                        isLesson={ true }
                     />
                     <div className='videoTrailer__text'>
                        <Icon name='PlaySmall' />
                        <Text
                           type={ TextType.regularDefault }
                           size={ TextSize.xxlarge }
                           inner='Video Trailer'
                        />

                     </div>
                  </div>
               )}

            <div className='lesson-with-no-permission__title'>
               <div className='lesson-with-no-permission__title__subtitle'>
                  <div>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.size_28 }
                        inner={ lessonName }
                     />
                  </div>
               </div>
               {course.type !== '0' && (
                  <div className='lesson-with-no-permission__btns'>
                     {!isFreeCourse() && (
                        <Button
                           size={ btnSize.new_small }
                           text='Subscribe To Watch'
                           onClick={ onJoin }
                           style={ {
                              backgroundColor: 'var(--buttonBgcolor)',
                              color: 'var(--greyscale_0)',
                           } }
                           resetBorderColor='var(--buttonBgcolor)'
                        />
                     )}
                     {!authUser && (
                        <Button
                           size={ btnSize.new_small }
                           theme={ themes.grey }
                           text='Log In'
                           onClick={ onLogin }
                        />
                     )}
                  </div>
               )}
            </div>
            {lesson && lesson.subtitle && (
               <div>
                  <TextWithSeeMore text={ lesson.subtitle } maxLength={ 310 } />
               </div>
            )}
            {/* {course.type === '0' && (
               <div className='onlineLesson-with-no-permission__instructor'>
                  <VideoAuthor LessonAuthor={ LessonAuthor } />
                  <div className='lesson-with-no-permission__btns'>
                     {!!onJoin() && (
                        <Button
                           size={ btnSize.new_small }
                           text='Subscribe To Watch'
                           onClick={ onJoin }
                           style={ {
                              backgroundColor: 'var(--buttonBgcolor)',
                              color: 'var(--schoolButtonColor)',
                           } }
                           resetBorderColor='var(--buttonBgcolor)'
                        />
                     )}
                     {!authUser && (
                        <>
                           {!!onJoin() && (
                              <div>
                                 <Text
                                    type={ TextType.regularDefault }
                                    size={ TextSize.size_14 }
                                    inner='or'
                                 />
                              </div>
                           )}
                           <Button
                              size={ btnSize.new_small }
                              theme={ themes.grey }
                              text='Log In'
                              onClick={ onLogin }
                           />
                        </>
                     )}
                  </div>
               </div>
            )} */}
         </div>
         {
            showModal && course.type === '1' && !hasTrailer && !!videoImg(lesson) && (
               <ModalVideo
                  modalLesson={ lesson }
                  handleShowModal={ handleShowModal }
                  isVideoProgram={ true }
                  course={ course }
                  videoImg={ videoImg }
                  onLogin={ onLogin }
                  onJoin={ onJoin }
                  isFreeCourse={ isFreeCourse }
                  title={ isFreeCourse() ? 'To unlock the video, you need to login.' : 'This video is exclusive to members. Subscribe now to gain access.' }
               />
            )}

         {
            showModal && course.type === '0' && (
               <ModalVideo
                  modalLesson={ lesson }
                  handleShowModal={ handleShowModal }
                  isVideoProgram={ true }
                  course={ course }
                  videoImg={ videoImg }
                  onJoin={ onJoin }
                  isSmall={ true }
                  title={ isFreeCourse() ? 'To unlock the lesson, you need to login.' : 'To unlock the lesson, you need to purchase the course.' }
                  onLogin={ onLogin }
                  isFreeCourse={ isFreeCourse }
               />
            )}
      </div>
   );
}

LessonWithNoPermission.propTypes = {
   lessonName: PropTypes.string,
   onJoin: PropTypes.func,
   lesson: PropTypes.object,
   course: PropTypes.object,
   authUser: PropTypes.object,
   isFreeCourse: PropTypes.func,
};

export default LessonWithNoPermission;
