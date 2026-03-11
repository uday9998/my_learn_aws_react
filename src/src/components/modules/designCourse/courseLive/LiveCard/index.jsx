import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import PropTypes from 'prop-types';
import CourseLinksModalContent from 'components/modules/designCourse/CourseLinksModalContent';
import Modal from 'components/elements/Modal';

const LiveCard = ({
   handleCourseLive, settingsData, courseLinksModalOpen, handleCancelCourseLinks, goTo,
   copyCodeToClipboard, copyView, handleApproveCourseLinks, handleCourseLinks, handleInputChange,
   disableLive, authUser, app,
}) => {
   return (
      <ItemWrapper>
         <div className='liveCard'>

            { settingsData && settingsData.is_published === 1 ? (
               <> <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Your Class Is Live Congrats. To Undo This Action Simply Press The Undo Live Button.'
               />
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner='Your class is currently live. Your class will now appear in your student dashboard and will be available for enrollment and purchase.'
                  />
                  <div role='presentation' className='liveCourseLinks' onClick={ () => handleCourseLinks() }>
                     You can find the links for your class here
                  </div>
                  <div className='btnWrapper'>
                     <BaseButton
                        theme={ btnTheme.darkBlue }
                        size={ btnSize.large }
                        text='Undo Live'
                        onClick={ () => handleCourseLive() }

                     />
                  </div>
               </>
            ) : (
               <> <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Your Class Isn’t Live Yet. Get This Party Started By Pressing The Take Live Button'
               />
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner='Your class is currently in draft mode. This class won’t appear in your student dashboard and won’t be available for enrollment or purchase unless you take it live.'
                  />
                  <div className='btnWrapper'>
                     <BaseButton
                        theme={ btnTheme.darkGreen }
                        size={ btnSize.large }
                        text='Take Live'
                        onClick={ () => handleCourseLive() }
                        disabled={ disableLive }
                     />
                  </div>
               </>

            )
            }

         </div>
         {
            courseLinksModalOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth < 1024 ? '95%' : '950px' }
                  onClose={ () => handleCancelCourseLinks() }
               >

                  <CourseLinksModalContent
                     onCancel={ () => handleCancelCourseLinks() }
                     onApprove={ () => handleApproveCourseLinks() }
                     currentCourse={ settingsData }
                     goTo={ goTo }
                     handleInternalInputChange={ (name, value) => handleInputChange(name, value, 'settings') }
                     copyCodeToClipboard={ copyCodeToClipboard }
                     copyView={ copyView }
                     authUser={ authUser }
                     app={ app }

                  />

               </Modal>
            )
         }
      </ItemWrapper>
   );
};

LiveCard.propTypes = {
   handleCourseLive: PropTypes.func,
   settingsData: PropTypes.object,
   courseLinksModalOpen: PropTypes.bool,
   handleCancelCourseLinks: PropTypes.func,
   goTo: PropTypes.func,
   copyCodeToClipboard: PropTypes.func,
   copyView: PropTypes.string,
   handleApproveCourseLinks: PropTypes.func,
   handleCourseLinks: PropTypes.func,
   handleInputChange: PropTypes.func,
   disableLive: PropTypes.bool,
   authUser: PropTypes.object,
   app: PropTypes.object,
};

export default LiveCard;
