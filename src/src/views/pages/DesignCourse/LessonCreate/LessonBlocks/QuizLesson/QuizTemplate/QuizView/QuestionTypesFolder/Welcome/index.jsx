import React, { useState } from 'react';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import Input from 'components/elements/inputNew';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import PropTypes from 'prop-types';
// import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import TextArea from '../CustomTextArea';
import './index.scss';


const Welcome = ({
   question, quizzes, changeQuestion, changeSettingsQuestion,
}) => {
   const [welcome, setWelcome] = useState(quizzes);
   const [newQuestion, setNewQuestion] = useState(question);

   const onChangeQuestion = (name, value, originalName, file) => {
      if (originalName) {
         setNewQuestion({
            ...newQuestion, [name]: value, original_name: originalName, file,
         });
      } else {
         setNewQuestion({ ...newQuestion, [name]: value });
      }
      changeQuestion(name, value, originalName, file);
   };

   const onChangeQuiz = (name, value) => {
      setWelcome({ ...welcome, [name]: value });
      changeSettingsQuestion(name, value);
   };

   return (
      <div className='quiz__welcome'>
         <div className='quiz__welcome__header'>
            <div className='quiz__welcome__title'>
               <div className='quiz__welcome__title__left'>
                  <div><IconNew name='WelcomeQuizM' /></div>
                  <div>
                     <Text
                        type={ types.regularDefault }
                        size={ sizes.small }
                        inner='Welcome screen'
                     />
                  </div>
               </div>
               <div className='quiz__welcome__title__right'>
                  <IconNew name='SelectButtonPersonalL' />
               </div>
            </div>
            {/* <div className='quiz__welcome__settings'>
               <div><IconNew name='SectionSettingsM' color='#24554E' /></div>
               <div>
                  <Text
                     type={ types.regularDefaultSmallX }
                     size={ sizes.small }
                     inner='Quiz Settings'
                     style={ { color: '#24554E' } }
                  />
               </div>
            </div> */}
         </div>
         <div className='quiz__welcome__content' id='quiz__welcome__content'>
            <div className='quiz__welcome__content__img'>
               <Switch
                  label='Image'
                  checked={ !!newQuestion.image_status }
                  name='image_status'
                  space='space'
                  onChange={ (name, value) => {
                     onChangeQuestion(name, value);
                  } }

               />
            </div>
            { !!newQuestion.image_status && (
               <div>
                  <UploadMediaView
                     src={ newQuestion.image_src }
                     type='image'
                     buttonText='Image'
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        cropRatio: '490x226',
                        onChange: (value, originalName, file) => {
                           onChangeQuestion('image_src', value, originalName, file);
                        },
                     } }
                  />
               </div>
            )}
            <div>
               <TextArea
                  title={ welcome.name }
                  placeholder='Title'
                  name='name'
                  id='test'
                  onInputChange={ (name, value) => { onChangeQuiz(name, value); } }
                  style={ {
                     fontSize: '20px',
                     color: '#131F1E',
                     fontWeight: '700',
                     lineHeight: '160%',
                     height: '29px',
                     textAlign: 'center',
                  } }
               />
            </div>
            <div>
               <TextArea
                  title={ welcome.description || '' }
                  placeholder='Description...'
                  className='custom__textArea__theme'
                  name='description'
                  onInputChange={ (name, value) => { onChangeQuiz(name, value); } }
                  style={ {
                     fontSize: '16px',
                     color: '#131F1E',
                     fontWeight: '400',
                     lineHeight: '148%',
                     height: '29px',
                  } }
               />
            </div>
            <div className='grey__line' />
            <div>
               <div>
                  <Switch
                     label='Passing Grade'
                     checked={ !!welcome.passing_grade_status }
                     name='passing_grade_status'
                     space='space'
                     onChange={ (name, value) => onChangeQuiz(name, value) }
                  />
               </div>
            </div>
            {!!welcome.passing_grade_status && (
               <div>
                  <Input
                     helpText=''
                     value={ welcome.passing_grade }
                     max={ 100 }
                     min={ 0 }
                     onChange={ (name, value) => {
                        const re = /^[0-9\b]+$/;
                        if ((value === '' || re.test(value)) && value < 101) {
                           onChangeQuiz(name, value);
                        }
                     } }
                     name='passing_grade'
                     label=''
                     withIcon={ true }
                     iconName='ProcentM'
                  />
               </div>
            )}
         </div>
      </div>
   );
};

Welcome.propTypes = {
   question: PropTypes.object,
   quizzes: PropTypes.object,
   changeQuestion: PropTypes.func,
   changeSettingsQuestion: PropTypes.func,
};

export default Welcome;
