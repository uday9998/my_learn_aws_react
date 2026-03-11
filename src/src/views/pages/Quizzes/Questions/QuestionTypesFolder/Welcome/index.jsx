import React, { useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import Input from 'components/elements/inputNew';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import PropTypes from 'prop-types';
import GeneratorModal from 'components/elements/GeneratorModal';
// import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import TextArea from '../CustomTextArea';
import './index.scss';


const Welcome = ({
   question, quizzes, changeQuestion, changeSettingsQuestion, isRight,
}) => {
   const onChangeQuestion = (name, value, originalName, file) => {
      changeQuestion(name, value, originalName, file);
   };

   const onChangeQuiz = (name, value) => {
      changeSettingsQuestion(name, value);
   };

   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });


   return (
      <div className='general__quiz__welcome'>
         { !isRight
         && (
            <div className='general__quiz__welcome__content' id='general__quiz__welcome__content'>
               <div className='general__quiz__welcome__content__wrapper'>
                  { !!question.image_status && (
                     <div>
                        <UploadMediaView
                           src={ question.image_src }
                           type='image'
                           buttonText='Image'
                           quizz={ true }
                           uploadProps={ {
                              fileLessonFormat: 'image',
                              isAmazonFile: true,
                              cropRatio: '1124x630',
                              onChange: (value, originalName, file) => {
                                 onChangeQuestion('image_src', value, originalName, file);
                              },
                           } }
                        />
                     </div>
                  )}
                  <div>
                     <TextArea
                        title={ quizzes.name }
                        placeholder='Title'
                        name='name'
                        id='test'
                        onInputChange={ (name, value) => { onChangeQuiz(name, value); } }
                        withIcon={ true }
                        iconName='Generator'
                        setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                        IToolTipTextNew='AI Generator'
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
                        title={ quizzes.description || '' }
                        placeholder='Description...'
                        className='custom__textArea__theme'
                        name='description'
                        withIcon={ true }
                        iconName='Generator'
                        setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                        IToolTipTextNew='AI Generator'
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


                  {!!quizzes.passing_grade_status && (
                     <>
                        <div className='grey__line' />
                        <div className='passing_grade_view'>
                           <div>
                              <Text
                                 inner='Passing Grade'
                                 type={ types.regular148 }
                                 size={ sizes.medium }
                              />
                           </div>
                           <div>
                              <Text
                                 inner={ `${ quizzes.passing_grade }%` }
                                 type={ types.medium150 }
                                 size={ sizes.medium }
                                 style={ { color: '#36796F' } }
                              />
                           </div>
                        </div>
                     </>
                  )}
               </div>
            </div>
         )
         }
         {isRight
            && (
               <div className='general__quiz__welcome__contentRigth'>
                  <div className='general__quiz__welcome__contentRigth__grade'>
                     <div>
                        <Switch
                           label='Passing Grade'
                           checked={ !!quizzes.passing_grade_status }
                           name='passing_grade_status'
                           space='space'
                           onChange={ (name, value) => onChangeQuiz(name, value) }
                        />
                     </div>
                     {!!quizzes.passing_grade_status && (
                        <div>
                           <Input
                              helpText=''
                              value={ quizzes.passing_grade }
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
                  <div className='grey__line' />
                  <div className='general__quiz__welcome__contentRigth__img'>
                     <Switch
                        label='Image'
                        checked={ !!question.image_status }
                        name='image_status'
                        space='space'
                        onChange={ (name, value) => {
                           onChangeQuestion(name, value);
                        } }
                     />
                  </div>

               </div>
            )
         }

         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               data={ quizzes }
               isQuiz={ true }
               title='Quiz'
               setData={ changeSettingsQuestion }
            />
         )}
      </div>
   );
};

Welcome.propTypes = {
   question: PropTypes.object,
   quizzes: PropTypes.object,
   changeQuestion: PropTypes.func,
   changeSettingsQuestion: PropTypes.func,
   isRight: PropTypes.bool,
};

export default Welcome;
