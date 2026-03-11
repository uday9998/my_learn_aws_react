import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import FirstBadgeCard from 'components/modules/promotions/gamification/FirstBadgeCard';
import AddBadgeCard from 'components/modules/promotions/gamification/AddBadgeCard';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import CongratulationsCard from 'components/modules/promotions/gamification/CongratulationsCard';
import Modal from 'components/elements/Modal';
import CongratsCard from 'components/modules/promotions/gamification/CongratsCard';

const Gamification = (props) => {
   const {
      badges, courses, onSaveClick, deleteGamificationsClick, addBadge,
      addingBadge, currentBadge, handleInputChange, freeLessons, selectedCourseId,
      gamificationInputs, handleBadgeInputChange, onCancelClick, handleChooseBadge,
      handleUpdate, chooseBadgeInProgress, handleSelectCourse, mobileShowCurrentBudge,
   } = props;
   const [previewModalOpen, setPreviewModalOpen] = useState(false);
   const onPreviewClick = () => {
      setPreviewModalOpen(true);
   };

   const handleGotit = () => {
      setPreviewModalOpen(false);
   };

   return (
      <div className='gamification__content h-full'>
         { badges.length === 0 && !addingBadge ? (
            <div className='firstBadgeCardWrapper'>
               <FirstBadgeCard
                  addBadge={ addBadge }
               />
            </div>
         ) : (
            <>
               {
                  (!mobileShowCurrentBudge || window.innerWidth >= 1024) && (
                     <div className={ `gamification__left content_left ${ addingBadge ? 'mobile-gamification-hidden' : '' }` }>
                        <div className='m-r-exl gamification__leftContent'>
                           {
                              badges.map((badge) => {
                                 return (
                                    <div key={ badge.id } className='m-b-s'>
                                       <CongratsCard
                                          active={ !addingBadge && badge.id === currentBadge.id }
                                          title={ badge.title }
                                          lesson={ badge.lesson && badge.lesson.name }
                                          course={ (badge.lesson && badge.lesson.section && badge.lesson.section.course)
                                        && badge.lesson.section.course.name }
                                          deleteGamificationsClick={ () => deleteGamificationsClick(badge.id) }
                                          handleChooseBadge={ () => handleChooseBadge(badge.id) }
                                          img={ badge.badge_src }
                                       />
                                    </div>
                                 );
                              })
                           }
                           <div className='mob_addBadgeButton'>
                              <BaseButton
                                 theme={ btnTheme.darkGreen }
                                 size={ btnSize.large }
                                 text='Add Badge'
                                 onClick={ () => addBadge() }
                              />
                           </div>
                           {
                              addingBadge && (
                                 <ItemWrapper border>
                                    <div style={ { padding: '16px 32px' } }>
                                       <Text
                                          type={ textType.regular }
                                          size={ textSize.small }
                                          inner='Enter the name of badge on the right'
                                          bold={ true }
                                          color='#8a94a2'
                                       />
                                    </div>
                                 </ItemWrapper>
                              )
                           }
                        </div>
                     </div>
                  )
               }

               {(mobileShowCurrentBudge || window.innerWidth >= 1024) && (

                  <div className='content_right gamification__right'>
                     {
                        !chooseBadgeInProgress && (
                           <AddBadgeCard
                              checked={ gamificationInputs.file }
                              currentBadge={ addingBadge ? gamificationInputs : currentBadge }
                              handleChange={ addingBadge ? handleBadgeInputChange : handleInputChange }
                              changeTab={ handleBadgeInputChange }
                              img={ addingBadge ? '' : currentBadge.badge_src }
                              onCancelClick={ onCancelClick }
                              onPreviewClick={ onPreviewClick }
                              onSaveClick={ () => onSaveClick(gamificationInputs) }
                              handleUpdate={ handleUpdate }
                              badges={ badges }
                              handleSelectCourse={ (id) => handleSelectCourse(id, addingBadge) }
                              courses={ courses }
                              freeLessons={ freeLessons }
                              addingBadge={ addingBadge }
                              selectedCourseId={ selectedCourseId }
                           />
                        )
                     }
                     {
                        previewModalOpen && (
                           <Modal
                              blurColor='rgba(63, 79, 101, 0.6)'
                              contentBgColor='#fff'
                              contentPosition='center'
                              closeOnClickOutside={ true }
                              // contentWidth='320'
                              onClose={ () => setPreviewModalOpen(false) }
                           >
                              <div>
                                 <CongratulationsCard
                                    badgeTitle={ addingBadge ? gamificationInputs.title : currentBadge.title }
                                    image={ addingBadge ? gamificationInputs.badge_src : currentBadge.badge_src }
                                    successMessage={ addingBadge
                                       ? gamificationInputs.success_message
                                       : currentBadge.success_message }
                                    handleGotit={ handleGotit }
                                    bgColor={ addingBadge
                                       ? gamificationInputs.badge_bg_color
                                       : currentBadge.badge_bg_color }
                                    btnColor={ addingBadge
                                       ? gamificationInputs.badge_btn_color
                                       : currentBadge.badge_btn_color }
                                    btnText={ addingBadge
                                       ? gamificationInputs.badge_btn_text
                                       : currentBadge.badge_btn_text }
                                    btnTextColor={ addingBadge
                                       ? gamificationInputs.badge_btn_text_color
                                       : currentBadge.badge_btn_text_color }
                                 />
                              </div>
                           </Modal>
                        )
                     }

                  </div>
               )}

            </>
         ) }
      </div>
   );
};

Gamification.propTypes = {
   gamificationInputs: PropTypes.object,
   badges: PropTypes.array,
   onSaveClick: PropTypes.func,
   handleUpdate: PropTypes.func,
   handleBadgeInputChange: PropTypes.func,
   onCancelClick: PropTypes.func,
   deleteGamificationsClick: PropTypes.func,
   courses: PropTypes.array,
   addBadge: PropTypes.func,
   addingBadge: PropTypes.bool,
   handleChooseBadge: PropTypes.func,
   currentBadge: PropTypes.object,
   handleInputChange: PropTypes.func,
   chooseBadgeInProgress: PropTypes.bool,
   handleSelectCourse: PropTypes.func,
   freeLessons: PropTypes.array,
   selectedCourseId: PropTypes.any,
   mobileShowCurrentBudge: PropTypes.bool,
};


export default Gamification;
