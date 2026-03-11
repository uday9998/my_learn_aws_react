import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import Text, {
   SIZES as textSize,
   TYPES as textType
} from 'components/elements/TextNew'
import LoaderSpinner from 'components/elements/LoaderSpiner'
import DripContent from 'components/modules/studentsRoom/dripContent'
import LessonWithNoPermission from 'components/modules/studentsRoom/LessonWithNoPermission'
import Button, {
   THEMES as themes
} from 'components/elements/buttons/BaseButtonNew'
import { onDownload } from 'utils/mediaLibrary'
import { copyToClipBoard } from 'utils/copy'
import TextWithSeeMore from 'components/modules/TextWithSeeMore'
import Video from '../Video'
import ShareVideoModal from './ShareVideoModal'
import { FileText, Download } from 'lucide-react'

const VideoView = ({
   lesson,
   getLessonInProgress,
   primaryTheme,
   onAddNoCompletedVideoView,
   onAddCompletedVideoView,
   onJoin,
   textColor,
   isFreeCourse,
   playlistData,
   course,
   authUser
}) => {
   const [isShareModalOpen, setIsShareModalOpen] = useState(false)
   const defaultPosterImage =
      'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png'

   let view
   const showBlocks = (blockFormat, block) => {
      let videoStyle = {}

      if (block && block.css_attributes && !!block.css_attributes.width) {
         if (
            block.css_attributes &&
            block.css_attributes.width &&
            block.css_attributes.width === 1
         ) {
            videoStyle = { maxWidth: '620px' }
         }
      }

      switch (blockFormat) {
         case 'Video':
            view = (
               <Video
                  lesson={block}
                  primaryTheme={primaryTheme}
                  textColor={textColor}
                  isVideoProgram={true}
                  onAddNoCompletedVideoView={() =>
                     onAddNoCompletedVideoView(
                        block &&
                           block.videos &&
                           block.videos[0] &&
                           block.videos[0].id
                     )
                  }
                  onAddCompletedVideoView={() =>
                     onAddCompletedVideoView(
                        block &&
                           block.videos &&
                           block.videos[0] &&
                           block.videos[0].id
                     )
                  }
                  course={course}
                  authUser={authUser}
                  playlistData={playlistData}
               />
            )
            break
         case 'Video-url':
            if (block.videos && block.videos[0] && block.videos[0].src) {
               if (block.videos[0].video_type === 'youtube') {
                  view = (
                     <div className='LessonIframe' style={videoStyle}>
                        <div className='LessonView__iframe' style={videoStyle}>
                           <div className='embed-container'>
                              <iframe
                                 src={
                                    block.videos[0].src &&
                                    `https://www.youtube.com/embed/${block.videos[0].src}?autoplay=${block.autoplay}`
                                 }
                                 width='500'
                                 height='400'
                                 frameBorder='0'
                                 allow={block.autoplay ? 'autoplay' : ''}
                                 allowFullScreen
                              />
                           </div>
                        </div>
                     </div>
                  )
               } else if (block.videos[0].video_type === 'wistia') {
                  view = (
                     <div className='LessonIframe' style={videoStyle}>
                        <div className='LessonView__iframe' style={videoStyle}>
                           <div className='embed-container'>
                              <iframe
                                 src={
                                    block.videos[0].src &&
                                    `//fast.wistia.net/embed/iframe/${
                                       block.videos[0].src
                                    }${
                                       block.css_attributes &&
                                       block.css_attributes.autoplay
                                          ? '?autoplay=true'
                                          : ''
                                    }`
                                 }
                                 width='500'
                                 height='400'
                                 frameBorder='0'
                                 scrolling='no'
                                 className='wistia_embed'
                                 name='wistia_embed'
                                 allow={
                                    block.css_attributes &&
                                    block.css_attributes.autoplay
                                       ? 'autoplay'
                                       : ''
                                 }
                                 allowFullScreen
                              />
                           </div>
                        </div>
                     </div>
                  )
               } else if (block.videos[0].video_type === 'vimeo') {
                  view = (
                     <div className='LessonIframe' style={videoStyle}>
                        <div className='LessonView__iframe' style={videoStyle}>
                           <div className='embed-container'>
                              <iframe
                                 src={
                                    block.videos[0].src &&
                                    `https://player.vimeo.com/video/${
                                       block.videos[0].src
                                    }?byline=0&amp;portrait=0&autoplay=${
                                       block.css_attributes &&
                                       block.css_attributes.autoplay
                                    }`
                                 }
                                 width='500'
                                 height='400'
                                 frameBorder='0'
                                 allow={
                                    block.css_attributes &&
                                    block.css_attributes.autoplay
                                       ? 'autoplay'
                                       : ''
                                 }
                                 allowFullScreen
                              />
                           </div>
                        </div>
                     </div>
                  )
               }
            }
            break
         case 'Video-embed':
            view = block && block.videos && block.videos[0] && (
               <div className='LessonIframe'>
                  <div className='LessonView__iframe' style={videoStyle}>
                     <div
                        className='embed-container'
                        dangerouslySetInnerHTML={{
                           __html: block.videos[0].src
                        }}
                     />
                  </div>
               </div>
            )
            break
         default:
            view = null
      }
      return view
   }

   const renderDefaultImage = () => {
      const getImageSrc = () => {
         if (lesson.css_attributes && lesson.css_attributes.image_src) {
            return lesson.css_attributes.image_src
         }

         if (lesson.poster) {
            return lesson.poster
         }

         return defaultPosterImage
      }

      return (
         <div
            className='LessonVideo'
            style={{
               position: 'relative',
               background: '#f0f0f0',
               minHeight: '300px',
               marginBottom: '20px'
            }}
         >
            <img
               src={getImageSrc()}
               alt='Lesson placeholder'
               style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block'
               }}
            />
         </div>
      )
   }

   const hasValidBlocks = () => {
      if (!lesson.blocks || lesson.blocks.length === 0) {
         return false
      }
      return lesson.blocks.some(block => {
         return showBlocks(block.lesson_format, block) !== null
      })
   }

   const shouldShowVideoContent = () => {
      return hasValidBlocks() || (lesson.blocks && lesson.blocks.length > 0)
   }

   const shouldRenderDefaultImage = () => {
      // Never render default image if lesson has image_src - let Video component handle it
      if (lesson.css_attributes && lesson.css_attributes.image_src) {
         return false
      }

      // Never render default image if lesson has poster
      if (lesson.poster) {
         return false
      }

      // Only render default image if there are NO blocks at all AND no video content AND no image_src
      return (!lesson.blocks || lesson.blocks.length === 0) && !hasValidBlocks()
   }

   const getVideoUrl = () => {
      if (
         !lesson ||
         !lesson.blocks ||
         !lesson.blocks[0] ||
         !lesson.blocks[0].videos ||
         !lesson.blocks[0].videos[0]
      ) {
         return window.location.href
      }

      return window.location.href
   }

   return (
      <div>
         {getLessonInProgress && <LoaderSpinner />}
         <div className='studentsRoom__main'>
            {(lesson.status === 1 || lesson.status === 3) &&
               !getLessonInProgress && (
                  <>
                     {lesson &&
                     !lesson.is_free_lesson &&
                     lesson.is_drip_turned_on &&
                     lesson.is_driplesson ? (
                        <DripContent lesson={lesson} />
                     ) : (
                        <div>
                           {!getLessonInProgress && (
                              <div>
                                 {lesson.blocks &&
                                    lesson.blocks.map(block => {
                                       if (
                                          showBlocks(block.lesson_format, block)
                                       ) {
                                          return (
                                             <div key={block.id}>
                                                {showBlocks(
                                                   block.lesson_format,
                                                   block
                                                )}
                                             </div>
                                          )
                                       }
                                       return null
                                    })}

                                 {shouldRenderDefaultImage() &&
                                    renderDefaultImage()}

                                 {shouldShowVideoContent() &&
                                    lesson.status === 1 && (
                                       <div className='VideoView__title'>
                                          <div>
                                             <div>
                                                <Text
                                                   inner={lesson.name}
                                                   type={textType.bold}
                                                   size={textSize.size_28}
                                                />
                                             </div>
                                             {lesson && lesson.subtitle && (
                                                <div className='text-container'>
                                                   <TextWithSeeMore
                                                      text={lesson.subtitle}
                                                      maxLength={310}
                                                   />
                                                </div>
                                             )}
                                          </div>
                                          <div className='VideoView__title__bookmark__btn'>
                                             {lesson.blocks &&
                                                lesson.blocks[0] &&
                                                lesson.blocks[0]
                                                   .css_attributes &&
                                                !!lesson.blocks[0]
                                                   .css_attributes
                                                   .downloadable &&
                                                lesson.blocks[0].videos &&
                                                lesson.blocks[0].videos[0]
                                                   ?.src && (
                                                   <div className='Video__download'>
                                                      <Button
                                                         text='Download'
                                                         theme={themes.grey}
                                                         size='xsmall'
                                                         iconName='DownloadM'
                                                         isIconRight={true}
                                                         onClick={() =>
                                                            onDownload(
                                                               lesson.blocks[0]
                                                                  .videos &&
                                                                  lesson
                                                                     .blocks[0]
                                                                     .videos[0] &&
                                                                  lesson
                                                                     .blocks[0]
                                                                     .videos[0]
                                                                     .src,
                                                               lesson.blocks[0]
                                                                  .videos[0]
                                                                  .name,
                                                               true
                                                            )
                                                         }
                                                      />
                                                   </div>
                                                )}
                                             {lesson.blocks &&
                                                lesson.blocks[0] &&
                                                lesson.blocks[0].videos &&
                                                lesson.blocks[0].videos[0]
                                                   ?.src && (
                                                   <div className='Video__download'>
                                                      <Button
                                                         text='Share'
                                                         theme={themes.grey}
                                                         size='xsmall'
                                                         iconName='ExternalLinkM'
                                                         isIconRight={true}
                                                         onClick={() =>
                                                            setIsShareModalOpen(
                                                               true
                                                            )
                                                         }
                                                      />
                                                   </div>
                                                )}
                                          </div>
                                       </div>
                                    )}

                                 {/* Video Resources Section */}
                                 {lesson.blocks &&
                                    lesson.blocks[0] &&
                                    lesson.blocks[0].css_attributes &&
                                    lesson.blocks[0].css_attributes
                                       .video_resources &&
                                    lesson.blocks[0].css_attributes
                                       .video_resources.length > 0 && (
                                       <div className='VideoView__resources'>
                                          <div className='VideoView__resources__title'>
                                             <Text
                                                inner='Resources'
                                                type={textType.bold}
                                                size={textSize.medium}
                                             />
                                          </div>
                                          <div className='VideoView__resources__list'>
                                             {lesson.blocks[0].css_attributes.video_resources.map(
                                                resource => (
                                                   <div
                                                      key={resource.id}
                                                      className='VideoView__resource__item'
                                                   >
                                                      <FileText size={20} style={{ flexShrink: 0 }} />

                                                      <Text
                                                         inner={
                                                            (
                                                               resource.fileName ||
                                                               'Download File'
                                                            ).length > 50
                                                               ? (
                                                                    resource.fileName ||
                                                                    'Download File'
                                                                 ).substring(
                                                                    0,
                                                                    50
                                                                 ) + '...'
                                                               : resource.fileName ||
                                                                 'Download File'
                                                         }
                                                         type={
                                                            textType.regular
                                                         }
                                                         size={
                                                            textSize.small
                                                         }
                                                         className='VideoView__resource__filename'
                                                      />

                                                      <Download
                                                         size={20}
                                                         style={{ flexShrink: 0, cursor: 'pointer' }}
                                                         onClick={() =>
                                                            onDownload(
                                                               resource.src,
                                                               resource.fileName,
                                                               true
                                                            )
                                                         }
                                                      />
                                                   </div>
                                                )
                                             )}
                                          </div>
                                       </div>
                                    )}

                                 {shouldRenderDefaultImage() &&
                                    lesson.status === 1 && (
                                       <div className='VideoView__title'>
                                          <div>
                                             <div>
                                                <Text
                                                   inner={lesson.name}
                                                   type={textType.bold}
                                                   size={textSize.size_28}
                                                />
                                             </div>
                                             {lesson && lesson.subtitle && (
                                                <div className='text-container'>
                                                   <TextWithSeeMore
                                                      text={lesson.subtitle}
                                                      maxLength={310}
                                                   />
                                                </div>
                                             )}
                                          </div>
                                       </div>
                                    )}

                                 {lesson.status === 3 &&
                                    lesson.is_free_lesson !== 1 && (
                                       <LessonWithNoPermission
                                          primaryTheme={primaryTheme}
                                          textColor={textColor}
                                          onJoin={onJoin}
                                          isFreeCourse={isFreeCourse}
                                          lessonName={lesson.name}
                                          lesson={lesson}
                                          course={course}
                                          authUser={authUser}
                                       />
                                    )}
                              </div>
                           )}
                        </div>
                     )}
                  </>
               )}
         </div>

         <ShareVideoModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            videoUrl={getVideoUrl()}
         />
      </div>
   )
}

VideoView.propTypes = {
   lesson: PropTypes.object,
   onAddNoCompletedVideoView: PropTypes.func,
   onAddCompletedVideoView: PropTypes.func,
   onJoin: PropTypes.func,
   primaryTheme: PropTypes.string,
   getLessonInProgress: PropTypes.bool,
   textColor: PropTypes.string,
   course: PropTypes.object,
   authUser: PropTypes.object,
   playlistData: PropTypes.object,
   isFreeCourse: PropTypes.func
}

VideoView.defaultProps = {}

export default VideoView
