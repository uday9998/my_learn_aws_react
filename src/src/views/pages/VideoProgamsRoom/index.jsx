import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import OffersOtherHeader from 'views/pages/Offers/components/OffersOtherHeader';
import OffersOtherFooter from 'views/pages/Offers/components/OffersOtherFooter';
import Text, { TextWithIcon, SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import defaultImage from 'assets/images/plan/default.png';
import ImageWithIcons from 'components/elements/ImageWithIcons';
import VideoAuthor from 'views/pages/VideoProgamsRoom/VideoAuthor';
import moment from 'moment';
import { videoImg } from 'utils/videoImg';
import {
   portalMenu,
} from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import VideoLesson from './VideoLesson';

const VideoWithDurationDetection = ({ src, onDurationDetected }) => {
   const videoRef = React.useRef(null);
   
   React.useEffect(() => {
      const videoElement = videoRef.current;
      
      if (!videoElement || !src) return;
      
      const handleLoadedMetadata = () => {
         const durationSeconds = videoElement.duration;
         if (durationSeconds && !isNaN(durationSeconds) && durationSeconds > 0) {
            if (onDurationDetected) {
               onDurationDetected(durationSeconds);
            }
         }
      };
      
      const handleError = (error) => {
      };
      
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.addEventListener('error', handleError);
      
      if (videoElement.readyState >= 1) {
         handleLoadedMetadata();
      }
      
      return () => {
         videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
         videoElement.removeEventListener('error', handleError);
      };
   }, [src, onDurationDetected]);
   
   return (
      <video 
         ref={videoRef}
         src={src}
         preload="metadata"
         style={{ display: 'none', width: 0, height: 0 }}
      />
   );
};

VideoWithDurationDetection.propTypes = {
   src: PropTypes.string,
   onDurationDetected: PropTypes.func
};

const VideoProgramsRoom = ({
   active, course, changeLesson, activeLesson, courseComplatePercent,
   sections, lessons, author, lesson,
   getLessonInProgress, isChecked,
   authUser, textColor, commentsCount, siteInfo,
   isUnreadComments,
   logout, onJoin, isFreeCourse, playlistData,
}) => {
   const { data: portalMenuData, loading: loadingMenu } = useApiQuery(
      portalMenu);
   
   const [detectedDurations, setDetectedDurations] = useState({});
   const isLoggedIn = !!authUser;
   
   // Force reload page for non-logged-in users to ensure correct styles
   React.useLayoutEffect(() => {
      if (!isLoggedIn) {
         const hasReloaded = window.location.search.includes('reloaded=true');
         if (!hasReloaded) {
            // Preserve the language preference through the reload
            const savedLang = localStorage.getItem('currentLanguage');
            const currentUrl = new URL(window.location);
            currentUrl.searchParams.set('reloaded', 'true');
            if (savedLang) {
               currentUrl.searchParams.set('lang', savedLang);
            }
            window.location.href = currentUrl.toString();
         }
      }
   }, []);

   // Apply translation for both logged-in and logged-out users
   useEffect(() => {
      // First check URL params for language (for non-logged users after reload)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');

      // Restore language preference on page load
      const savedLanguage = urlLang || localStorage.getItem('currentLanguage');

      if (savedLanguage && savedLanguage !== 'en') {
         // Save to localStorage if it came from URL
         if (urlLang) {
            localStorage.setItem('currentLanguage', urlLang);
         }

         let attempts = 0;
         const maxAttempts = 50; // Try for up to 5 seconds

         // Wait for Google Translate to be available then apply the saved language
         const applyTranslation = () => {
            const translateElement = document.querySelector('.goog-te-combo');
            if (translateElement && translateElement.options && translateElement.options.length > 1) {
               // Ensure the element is ready with options loaded
               translateElement.value = savedLanguage;
               translateElement.dispatchEvent(new Event('change'));
               // Remove opacity once translation is applied
               document.documentElement.style.opacity = '1';
            } else if (attempts < maxAttempts) {
               // If Google Translate is not ready yet, try again
               attempts++;
               setTimeout(applyTranslation, 100);
            } else {
               // Fallback: show content even if translation failed
               document.documentElement.style.opacity = '1';
            }
         };
         applyTranslation();
      } else {
         // If English, ensure opacity is set to 1
         document.documentElement.style.opacity = '1';
      }
   }, []);

   useEffect(() => {
      let styleTag;
      const cssVariablesList = {};
      const originalStyles = {};

      if (siteInfo && siteInfo.membership.active_school_room) {
         styleTag = document.createElement('style');
         const cssStrings = Object.keys(siteInfo.membership.active_school_room.css)
            .filter(key => key.includes('_css'))
            .map(key => siteInfo.membership.active_school_room.css[key].content);

         const combinedCssString = cssStrings.join('\n');
         styleTag.innerHTML = combinedCssString;
         
         const headerProps = siteInfo.membership.landing_data[1].school_room_section.props;
         const footer = siteInfo.membership.landing_data[7].school_room_section;
         
         cssVariablesList['--header-background-color'] = headerProps.bgColor;
         cssVariablesList['--header-color'] = headerProps.color;
         cssVariablesList['--header-logo-height'] = `${headerProps.logoHeigth || 30}px`;
         cssVariablesList['--footer-background'] = footer.props.bgColor;
         
         Object.keys(cssVariablesList).forEach(key => {
            originalStyles[key] = document.body.style.getPropertyValue(key);
            document.body.style.setProperty(key, cssVariablesList[key]);
         });
         
         document.head.appendChild(styleTag);
      }

      return () => {
         if (styleTag && document.head.contains(styleTag)) {
            document.head.removeChild(styleTag);
         }
         
         Object.keys(originalStyles).forEach(key => {
            if (originalStyles[key]) {
               document.body.style.setProperty(key, originalStyles[key]);
            } else {
               document.body.style.removeProperty(key);
            }
         });
      };
   }, [siteInfo]);

   const LessonAuthor = lesson.author || (course && course.authors && course.authors[0]);

   const handleDurationDetected = (lessonId, duration) => {
      setDetectedDurations(prev => ({
         ...prev,
         [lessonId]: duration
      }));
   };
   
   const handleVideoImg = (lesson) => {
      const defaultImageUrl = 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png';
      const result = videoImg(lesson, defaultImageUrl);
      return result || defaultImageUrl;
   };

   const needsFrontendDuration = (lesson) => {
      if (detectedDurations[lesson.id]) {
         return false;
      }
      
      if (lesson.duration) {
         return false;
      }
      
      if (lesson.videos && lesson.videos.length > 0) {
         const video = lesson.videos[0];
         if (video.duration || (video.video_length && video.video_length > 0)) {
            return false;
         }
      }
      
      if (lesson?.blocks?.[0]?.videos?.[0]?.duration) {
         return false;
      }
      
      return true;
   };

   const getVideoTime = (lesson) => {
      if (detectedDurations[lesson.id]) {
         const seconds = detectedDurations[lesson.id];
         const duration = moment.duration(seconds, 'seconds');
         return moment.utc(duration.asMilliseconds()).format('H[:]mm[:]ss');
      }
      
      if (lesson.duration) {
         const seconds = lesson.duration;
         const duration = moment.duration(seconds, 'seconds');
         return moment.utc(duration.asMilliseconds()).format('H[:]mm[:]ss');
      }
      
      if (lesson.videos && lesson.videos.length > 0) {
         const video = lesson.videos[0];
         
         if (video.duration) {
            const seconds = video.duration;
            const duration = moment.duration(seconds, 'seconds');
            return moment.utc(duration.asMilliseconds()).format('H[:]mm[:]ss');
         }
         
         if (video.video_length && video.video_length > 0) {
            const seconds = video.video_length;
            const duration = moment.duration(seconds, 'seconds');
            return moment.utc(duration.asMilliseconds()).format('H[:]mm[:]ss');
         }
      }
      
      if (lesson?.blocks?.[0]?.videos?.[0]?.duration) {
         const seconds = lesson.blocks[0].videos[0].duration;
         const duration = moment.duration(seconds, 'seconds');
         return moment.utc(duration.asMilliseconds()).format('H[:]mm[:]ss');
      }
      
      if (needsFrontendDuration(lesson)) {
         return "calculating...";
      }
      
      return "-- : --";
   };

   const getVideoSource = (lesson) => {
      if (lesson.videos && lesson.videos.length > 0 && lesson.videos[0].src) {
         return lesson.videos[0].src;
      }
      
      if (lesson.video_src) {
         return lesson.video_src;
      }
      
      if (lesson?.blocks?.[0]?.videos?.[0]?.src) {
         return lesson.blocks[0].videos[0].src;
      }
      
      return null;
   };

   return (
      <>
         {loadingMenu && (<LoaderSpinner />)}
         {!loadingMenu && (
            <>
               <OffersOtherHeader
                  site={ siteInfo }
                  course={ course }
                  isPreview={ true }
                  user={ authUser }
                  template={ siteInfo.membership.landing_data }
                  schoolRoomSettings={ siteInfo.membership.active_school_room }
                  isEditor={ false }
                  logout={ logout }
                  portalMenuData={ portalMenuData }
               />

               <div className='videoProgramContent'>
                  <div className='videoProgramContent__left'>
                     <VideoLesson
                        commentsCount={ commentsCount }
                        onJoin={ onJoin }
                        siteInfo={ siteInfo }
                        course={ course }
                        activeLesson={ activeLesson }
                        courseComplatePercent={ courseComplatePercent }
                        active={ active }
                        sections={ sections }
                        lessons={ lessons }
                        lesson={ lesson }
                        LessonAuthor={ LessonAuthor }
                        author={ author }
                        getLessonInProgress={ getLessonInProgress }
                        isChecked={ isChecked }
                        textColor={ textColor }
                        commentsData={ {
                           courseId: course.id,
                           courseName: course.url,
                           sectionId: lesson.section_id,
                           lessonId: lesson.id,
                        } }
                        authUser={ authUser }
                        isUnreadComments={ isUnreadComments }
                        changeLesson={ changeLesson }
                        isFreeCourse={ isFreeCourse }
                        playlistData={ playlistData }
                     />
                  </div>
                  {(lessons.length > 1 && course.is_playlist === 1) && (
                     <div className='videoProgramContent__right'>
                        <VideoAuthor LessonAuthor={ LessonAuthor } />
                        <div className='videoProgramContent__right__videos'>
                           <div>
                              <Text
                                 inner={ `${ lessons.length } videos` }
                                 type={ textType.regularDefault }
                                 size={ textSize.small }
                              />
                           </div>
                           <div className='videoProgramContent__right__videos__content'>
                              {lessons.map((lesson) => {
                                 const videoSrc = getVideoSource(lesson);
                                 const needsDuration = needsFrontendDuration(lesson);
                                 const timeDisplay = getVideoTime(lesson);
                                 
                                 return (
                                    <div
                                       key={ lesson.id }
                                       className='videoProgramContent__right__videos__content__item'
                                       role='presentation'
                                       onClick={ () => changeLesson(lesson.id, lesson) }
                                       style={ lesson.id === activeLesson ? { background: 'var(--activeColor)' } : { } }
                                    >
                                       {videoSrc && needsDuration && (
                                          <VideoWithDurationDetection
                                             src={videoSrc}
                                             onDurationDetected={(duration) => handleDurationDetected(lesson.id, duration)}
                                          />
                                       )}
                                       
                                       <div style={ { height: '68px', width: '120px', flex: 'none' } }>
                                          <ImageWithIcons
                                             src={ handleVideoImg(lesson) }
                                             lesson={ (lesson.status === 3 && lesson)
                                                || (!lesson.joined && (course.is_free_lesson
                                                   ? { is_free_lesson: true } : lesson))
                                             }
                                          />
                                       </div>
                                       <div>
                                          <div>
                                             <Text
                                                inner={ lesson.name }
                                                type={ textType.regularDefault }
                                                size={ textSize.small_14 }
                                             />
                                          </div>
                                          {!lesson.is_playlist && (
                                             <div>
                                                <Text
                                                   inner={ timeDisplay }
                                                   type={ textType.regularDefault }
                                                   size={ textSize.small_14 }
                                                />
                                             </div>
                                          )}
                                          {!!lesson.is_playlist && (
                                             <div className='playlistIconText'>
                                                <TextWithIcon
                                                   iconName='VideoQueueS'
                                                   inner={ lesson.blocks_count }
                                                   iconColor='var(--memberTextColor)'
                                                   type={ textType.regularDefaultSmall }
                                                   size={ textSize.xsmall }
                                                   style={ { color: 'var(--memberTextColor)' } }
                                                   iconGap={ 8 }
                                                   className='playlistIcon'
                                                />
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     </div>
                  )}
               </div>
               <OffersOtherFooter
                  site={ siteInfo }
                  course={ course }
                  isPreview={ true }
                  user={ authUser }
                  template={ siteInfo.membership.landing_data }
                  schoolRoomSettings={ siteInfo.membership.active_school_room }
                  isEditor={ false }
                  logout={ logout }
               />
            </>
         )}
      </>
   );
};

VideoProgramsRoom.propTypes = {
   lessons: PropTypes.array,
   lesson: PropTypes.object,
   author: PropTypes.object,
   sections: PropTypes.array,
   active: PropTypes.number,
   course: PropTypes.object,
   changeLesson: PropTypes.func,
   activeLesson: PropTypes.number,
   courseComplatePercent: PropTypes.number,
   isChecked: PropTypes.array,
   getLessonInProgress: PropTypes.bool,
   textColor: PropTypes.string,
   authUser: PropTypes.object,
   playlistData: PropTypes.object,
   commentsCount: PropTypes.any,
   siteInfo: PropTypes.object,
   isUnreadComments: PropTypes.bool,
   logout: PropTypes.func,
   onJoin: PropTypes.func,
   isFreeCourse: PropTypes.func,
};

VideoProgramsRoom.defaultProps = {
   active: 1,
   activeLesson: 1,
   courseComplatePercent: 0,
   isChecked: [],
   changeLesson: () => {},
   textColor: '#7cb740',
};

export default VideoProgramsRoom;