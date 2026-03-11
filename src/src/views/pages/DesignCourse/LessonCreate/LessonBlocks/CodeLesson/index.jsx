import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
// import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
// import TextInput from 'components/elements/form/TextInput';
// import TextArea from 'components/elements/form/TextArea';
// import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
// import EditorConvertToHTML from 'components/modules/editor';
// import isPrint from 'state/modules/designCourse/edit/Error';
// import { toast } from 'react-toastify';
import TextArea from 'components/elements/form/CustomTextArea';

const CodeLesson = ({
   onChange, block,
}) => {
   const changeLesson = (name, value) => {
      onChange(name, value, true);
   };
   const rowCount = (block.description && block.description.split('\n').length > 16) ? block.description.split('\n').length : 16;

   return (
      // <div className='codeLesson'>
      //    <EditorConvertToHTML
      //       ref={ inputRef }
      //       isCustomCode={ true }
      //       description={ description }
      //       onClick={ () => onClick() }
      //       data={ textDescription || '' }
      //       isCancel={ isCancel }
      //       initial={ description }
      //       onChange={ (data) => {
      //          changeLesson(data);
      //       } }
      //    />
      <div className='code__lesson'>
         <div className='code__lesson__left'>
            {new Array(rowCount).fill(0).map((row, index) => {
               const number = index + 1;
               return <div key={ number }>{number}<br /></div>;
            })}
         </div>
         <TextArea
            title={ block.description || '' }
            placeholder='Paste your code here'
            name='description'
            onInputChange={ (name, value) => changeLesson('description', value) }
            style={ {
               fontSize: '14px',
               color: '#727978',
               fontWeight: '400',
               lineHeight: '168%',
               height: 'auto',
            } }
         />
         {/* <div>
            <code>
               <div>{textDescription}</div>
            </code>
         </div> */}
      </div>
   // <ItemWrapper>
   //    <div className='textLesson'>
   //       <div className='textLesson__fields'>
   //          <Text
   //             type={ textType.bold }
   //             size={ textSize.medium }
   //             inner={ title }
   //             style={ { marginBottom: '36px' } }
   //          />
   //          <TextInput
   //             placeholder='Enter Lesson Title'
   //             label='Lesson Title'
   //             rightLabel={ `${ charectersLimit }/150` }
   //             id='textTitle'
   //             name='textTitle'
   //             value={ textTitle || '' }
   //             onChange={ (name, value) => {
   //                if (value.length < 151) {
   //                   setTextTitle(value);
   //                   setActiveName(value);
   //                   getCharectersLength(value.length);
   //                } else if (isPrint('You have reached the character limitation')) {
   //                   toast.error('You have reached the character limitation');
   //                }
   //             } }
   //          />
   //          <div className='textLesson__content'>
   //             <Text
   //                size={ textSize.extraSmall }
   //                type={ textType.normal }
   //                inner='Lesson Content'
   //             />
   //             <EditorConvertToHTML
   //                ref={ inputRef }
   //                description={ description }
   //                onClick={ () => onClick() }
   //                data={ textDescription || '' }
   //                isCancel={ isCancel }
   //                initial={ description }
   //                onChange={ (data) => {
   //                   setTextDescription(data);
   //                } }
   //             />
   //          </div>

   //       </div>
   //       <div className='textLesson__buttons'>
   //          {((((textDescription && textDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !textDescription) && textTitle === title) ? null : (
   //             <BaseButton
   //                theme={ buttonTheme.grey }
   //                size={ buttonSizes.large }
   //                text='Cancel'
   //                margin
   //                onClick={ () => {
   //                   setTextTitle(title);
   //                   setIsCancel(!isCancel);
   //                   setTextDescription(description);
   //                   onClick();
   //                } }
   //             />
   //          )

   //          }

   //          <BaseButton
   //             theme={ buttonTheme.darkGreen }
   //             size={ buttonSizes.large }
   //             text='Save'
   //             className='save-lesson'
   //             onClick={ () => saveLesson() }
   //          />
   //       </div>
   //    </div>
   // </ItemWrapper>
   );
};

CodeLesson.propTypes = {
   block: PropTypes.object,
   description: PropTypes.string,
   onChange: PropTypes.func,
};

export default CodeLesson;
