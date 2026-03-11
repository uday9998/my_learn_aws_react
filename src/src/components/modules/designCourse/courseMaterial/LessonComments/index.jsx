import React, { useState } from 'react';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import Switch from 'components/elements/form/Switch';
import PropTypes from 'prop-types';

const LessonComments = ({
   isOpen, lesson, toggleCommentShow, text, onCommentChange, createComment, user,
}) => {
   const [isChecked, setIsChecked] = useState(lesson.comment_status + 1);
   const commentsVisibilities = [
      {
         title: 'Visible',
      },
      {
         title: 'Hidden',
         hint: 'No comments section will uppear',
      },
      {
         title: 'Locked',
         hint: "The previous comments will appear but can't be added to",
      },
   ];

   return (
      <DynamicWrapper
         isOpen={ isOpen }
         title='Comments'
         openedBackColor='#ffffff'
         openedHasShadow
         hasCommentTooltip
         tooltipText='Select your comment status.'
      >
         {/* <div className='m-t-l'>
            <Switch
               checked={ !!lesson.comment_status }
               onChange={ () => toggleCommentShow(lesson.id) }
               isCommentPage={ true }
            />
         </div> */}
         {/* <div className='lessonComments__item'>
            <Text
               inner={ lesson.comment_status ? 'Disable Comments For This Lesson' : 'Enable Comments For This Lesson' }
               type={ textType.normal }
               size={ textSize.extraSmall }
            />
         </div> */}
         <div className='lessonComments__visibility'>
            {commentsVisibilities.map((commentsVisibility, i) => {
               const n = i;
               let commentStatus = 1;
               if (i === 0) {
                  commentStatus = 2;
               } else if (i === 1) {
                  commentStatus = 1;
               } else if (i === 2) {
                  commentStatus = 3;
               }
               return (
                  <div
                     className={ isChecked === commentStatus ? 'visibility visibility__checked' : 'visibility' }
                     key={ n }
                     onClick={ () => { setIsChecked(commentStatus); toggleCommentShow(lesson.id, commentStatus - 1); } }
                     role='presentation'
                  >
                     <div className='visibility__left'>
                        <div className={ isChecked === commentStatus ? 'circle__checked' : 'circle' }>
                           {isChecked && <div className='green__circle' />}
                        </div>
                     </div>
                     <div className='visibility__right'>
                        <div>
                           <Text
                              type={ textType.demiBold }
                              size={ textSize.medium }
                              inner={ commentsVisibility.title }
                           />
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <form onSubmit={ createComment } style={ { width: '100%' } }>
            <div className='lessonComments__item'>
               <TextInput
                  label={ user.name }
                  placeholder='Comments'
                  value={ text }
                  onChange={ onCommentChange }
                  id='comments'
                  userAvatar={ user.picture_full_src }
                  user
               />
            </div>
            <div className='lessonComments__buttons'>
               <BaseButton
                  type='submit'
                  theme={ buttonTheme.darkGreen }
                  size={ buttonSizes.large }
                  text='Post Comment'
               />
            </div>
         </form>
      </DynamicWrapper>
   );
};

LessonComments.propTypes = {
   isOpen: PropTypes.bool,
   lesson: PropTypes.object,
   toggleCommentShow: PropTypes.func,
   text: PropTypes.string,
   onCommentChange: PropTypes.func,
   createComment: PropTypes.func,
   user: PropTypes.object,
};

LessonComments.defaultProps = {
   isOpen: false,
};

export default LessonComments;
