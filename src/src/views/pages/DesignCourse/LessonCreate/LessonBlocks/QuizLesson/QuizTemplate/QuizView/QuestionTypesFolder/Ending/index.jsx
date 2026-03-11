import React, { useState } from 'react';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import PropTypes from 'prop-types';
import TextArea from 'components/elements/form/CustomTextArea';
import Tabs from 'components/elements/tabs';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import './index.scss';


const Ending = ({ question, changeQuestion }) => {
   const [tab, setTab] = useState('passed_message');
   const tabVariants = [
      { value: 'passed_message', key: 'Passed Message', iconName: 'UploadMediaFirstM' },
      { value: 'mail_message', key: 'Fail Message', iconName: 'UploadMediaSecondM' },
   ];

   const [ending, setEnding] = useState(question);

   const onChangeQuestion = (name, value, originalName, file) => {
      if (originalName) {
         setEnding({
            ...ending, [name]: value, original_name: originalName, file,
         });
      } else {
         setEnding({ ...ending, [name]: value });
      }
      changeQuestion(name, value, originalName, file);
   };


   return (
      <div className='quiz__ending'>
         <div className='quiz__ending__header'>
            <div className='quiz__ending__title'>
               <div className='quiz__ending__title__left'>
                  <div><IconNew name='EndingQuizM' /></div>
                  <div>
                     <Text
                        type={ types.regularDefault }
                        size={ sizes.small }
                        inner='Ending'
                     />
                  </div>
               </div>
               <div className='quiz__ending__title__right'>
                  <IconNew name='SelectButtonPersonalL' />
               </div>
            </div>
         </div>
         <div className='quiz__ending__content'>
            <div className='quiz__ending__content__img'>
               <Switch
                  label='Image'
                  checked={ !!ending.image_status }
                  name='image_status'
                  space='space'
                  onChange={ (name, value) => {
                     onChangeQuestion(name, value);
                  } }
               />
            </div>
            {!!ending.image_status && (
               <div>
                  <UploadMediaView
                     src={ ending.image_src }
                     type='image'
                     buttonText='Image'
                     uploadProps={ {
                        fileLessonFormat: 'image',
                        isAmazonFile: true,
                        cropRatio: '490x226',
                        onChange: (value, originalName, file) => onChangeQuestion('image_src', value, originalName, file),
                     } }
                  />
               </div>
            )}
            <Tabs
               variants={ tabVariants }
               selectedVariant={ tab }
               // isFullWidth={ tab }
               onSelect={ (value) => setTab(value) }
            />
            <div>
               <TextArea
                  title={ ending.title || 'Title' }
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
                  title={ (tab === 'passed_message' ? ending.passed_message : ending.fail_message) || '' }
                  placeholder={ tab === 'passed_message' ? 'Passed Message...' : 'Failed Message...' }
                  className='custom__textArea__theme'
                  name={ tab === 'passed_message' ? 'passed_message' : 'fail_message' }
                  onInputChange={ onChangeQuestion }
                  style={ {
                     fontSize: '16px',
                     color: '#131F1E',
                     fontWeight: '400',
                     lineHeight: '148%',
                     height: '29px',
                     background: '#F8FAFA',
                     border: '1px solid #E7E9E9',
                     borderRadius: '12px',
                     padding: '10px 16px',
                     minHeight: '187px',
                  } }
               />
            </div>
         </div>
      </div>
   );
};

Ending.propTypes = {
   question: PropTypes.object,
   changeQuestion: PropTypes.func,
};


export default Ending;
