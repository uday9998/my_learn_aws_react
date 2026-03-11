import React, { useState } from 'react';
import Switch from 'components/elements/form/SwitchNew';
import PropTypes from 'prop-types';
import TextArea from 'components/elements/form/CustomTextArea';
import Tabs from 'components/elements/tabs';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import './index.scss';


const Ending = ({ question, changeQuestion, isRight }) => {
   const [tab, setTab] = useState('passed_message');
   const tabVariants = [
      { value: 'passed_message', key: 'Passed Message', iconName: 'UploadMediaFirstM' },
      { value: 'mail_message', key: 'Failed Message', iconName: 'UploadMediaSecondM' },
   ];


   const onChangeQuestion = (name, value, originalName, file) => {
      changeQuestion(name, value, originalName, file);
   };


   return (
      <div className='general__quiz__ending'>
         {!isRight && (
            <div className='general__quiz__ending__content'>
               <Tabs
                  variants={ tabVariants }
                  selectedVariant={ tab }
                  // isFullWidth={ tab }
                  onSelect={ (value) => setTab(value) }
               />
               <div className='general__quiz__ending__content__box'>
                  <div className='general__quiz__ending__content__box__wrapper'>
                     {!!question.image_status && (
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
                                 onChange: (value, originalName, file) => onChangeQuestion('image_src', value, originalName, file),
                              } }
                           />
                        </div>
                     )}
                     <div>
                        <TextArea
                           title={ question.title || '' }
                           placeholder='Title'
                           name='title'
                           onInputChange={ onChangeQuestion }
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
                     <div className='grey__line' />
                     <div>
                        <TextArea
                           title={ (tab === 'passed_message' ? question.passed_message : question.fail_message) || '' }
                           placeholder={ tab === 'passed_message' ? 'Customize your passed quiz completion message here' : 'Customize your failed quiz completion message here' }
                           className='custom__textArea__theme'
                           name={ tab === 'passed_message' ? 'passed_message' : 'fail_message' }
                           onInputChange={ onChangeQuestion }
                           style={ {
                              fontSize: '16px',
                              color: '#131F1E',
                              fontWeight: '400',
                              lineHeight: '148%',
                              height: '29px',
                              //  background: '#F8FAFA',
                              // border: '1px solid #E7E9E9',
                              //  borderRadius: '12px',
                              // padding: '10px 16px',
                              //  minHeight: '187px',
                           } }
                        />
                     </div>
                  </div>
               </div>
            </div>
         )}
         {isRight && (
            <div className='general__quiz__ending__contentRigth'>
               <div className='general__quiz__ending__contentRigth__img'>
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
         )}
      </div>
   );
};

Ending.propTypes = {
   question: PropTypes.object,
   changeQuestion: PropTypes.func,
   isRight: PropTypes.bool,
};


export default Ending;
