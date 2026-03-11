import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';

const TextLesson = ({
   block,
}) => {
   // useEffect(() => {
   //    setTextTitle(title);
   //    setActiveName(title);
   //    setTextDescription(description);
   // }, [title, description]);

   // const onClick = () => {
   //    if (inputRef && inputRef.current) {
   //       setTextDescription(inputRef.current.initialValue);
   //       inputRef.current.reload();
   //    }
   // };


   const styles = block.css_attributes;
   const buttonStyle = {
      fontSize: `${styles.fontSize}px`,
      height: `${styles.height}px`,
      lineHeight: `${styles.lineHeight}px`,
      letterSpacing: `${styles.letterSpacing}px`,
      borderRadius: `${styles.borderRadius}px`,
      backgroundColor: styles.style === 'outline' ? 'transparent' : styles.buttonColor,
      color: styles.color,
      fontFamily: styles.fontFamily,
      fontWeight: styles.fontWeight,
      maxHeight: 'min-content',
   };

   // style={ (block.css_attributes && block.css_attributes.letterSpacing) ? { letterSpacing: `${ block.css_attributes.letterSpacing }px` } : {} }
   return (
      <div className='buttonBlock' style={ { gap: `${styles.gap}px`, justifyContent: styles.justifyContent } }>
         {block.links && !!block.links.length && block.links.map((link, i) => {
            const newIndex = i + 1;
            return (
               <div key={ newIndex }>
                  <BaseButton
                     text={ link.text }
                     theme={ btnTheme.primary }
                     size={ btnSize.large120 }
                     style={ buttonStyle }
                  />
               </div>
            );
         })
         }
         {/* <InlineEditor
            text={ block.description || '<div>Link Text</div>' }
            onChange={ (value) => changeLesson('description', value) }
            placegolder='Title here...'
         /> */}
         {/* <TextArea
            title={ block.description || '' }
            placeholder='New Text'
            name='description'
            onInputChange={ (name, value) => changeLesson(name, value) }
            style={ {
               fontSize: '16px',
               color: '#444C4B',
               fontWeight: '400',
               lineHeight: '148%',
               height: 'auto',
            } }
         /> */}
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

TextLesson.propTypes = {
   block: PropTypes.object,
};

export default TextLesson;
