
import React from 'react';
// import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import Router from 'routes/router';
import IconNew from 'components/elements/iconsSize';
import video from 'assets/images/quizzes/video.png';
import { useHistory } from 'react-router';
import './index.scss';

const EmptyQuizzes = () => {
   const history = useHistory();
   const goToCreatePage = () => {
      history.push(`${ Router.route('ADMIN_CREATE_QUIZ').getCompiledPath() }`);
   };
   return (
      <div className='emptyQuiz'>
         {/* <div className='emptyQuiz_header'>
            <div className='emptyQuiz_header_img'>
               <img src={ video } alt='quizzes' />
            </div>
            <div className='emptyQuiz_header_text'>
               <div>
                  <Text
                     type={ TextType.medium }
                     size={ TextSize.large }
                     inner='See how it works'
                  />
               </div>
               <div>
                  <Text
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.small }
                     inner="You can create quizzes here and add them to the lesson to better understand your students' understanding of the material."
                     style={ { color: '#444C4B' } }
                  />
               </div>
               <div>
                  <Text
                     type={ TextType.regularDefaultGrey }
                     size={ TextSize.small }
                     inner='Or create quizzes in lessons, and you can find the results of the quizzes here'
                     style={ { color: '#444C4B' } }
                  />
               </div>
            </div>
         </div> */}
         <div className='emptyQuiz_content'>
            <div className='emptyQuiz_content_icon'>
               <IconNew name='Emoji' />
            </div>
            <div>
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  inner="You don't have quizzes yet"
               />
            </div>
            <div>
               <Text
                  type={ TextType.regularDefaultSmallX }
                  size={ TextSize.size_28 }
                  inner='Create A Quiz Now'
               />
            </div>
            <div className='emptyQuiz_content_btn'>
               <BaseButton
                  theme={ btnTheme.primary }
                  size={ btnSize.large50 }
                  text='Create Quiz'
                  onClick={ goToCreatePage }
               />
            </div>
         </div>
      </div>
   );
};

EmptyQuizzes.defaultProp = {

};

EmptyQuizzes.propTypes = {

};

export default EmptyQuizzes;
