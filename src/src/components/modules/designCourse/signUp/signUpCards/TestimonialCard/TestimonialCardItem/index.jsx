/* eslint-disable no-nested-ternary */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import camera from 'assets/images/camera.png';
import Icon from 'components/elements/Icon';
import testimonialDeafultImg from 'assets/images/testimonials.png';
import useS3Upload from 'components/modules/S3Upload';
import Tooltip from 'components/elements/members/Tooltip';


const TestimonialCardItem = ({
   handleInputSignUpChange, handleSignUpSave, testimonial, newTestimonial = false,
   currentTestimonial, chooseTestimonial, deleteSignUp = () => {}, count,
   handleAddTestimonial,
}) => {
   if ((testimonial && testimonial.picture_src && testimonial.picture_src.split('.com')[0] === 'https://miestro.s3.amazonaws') || testimonial.picture_src === 'testimonial.png') {
      // eslint-disable-next-line no-param-reassign
      testimonial.picture_src = testimonialDeafultImg;
   }
   const widget = useRef();
   const [charectersLimit, setCharectersLimit] = useState(0);

   function onWidgetMount(widgetFunctions) {
      widget.current = widgetFunctions;
   }

   const { progressEL, uploadButton: uploadWidget } = useS3Upload(null, {
      buttonProps: {},
      onChange: (src) => {
         const update = newTestimonial ? testimonial.id : 'update';
         handleInputSignUpChange('picture_src', src, update);
      },
      fileLessonFormat: 'image',
      cropRatio: true,
   }, onWidgetMount);


   const getCharectersLength = (l) => setCharectersLimit(l);

   return (
      <div className='m-b-exl p-b-exl testimonialItem'>
         {uploadWidget}
         <div className='testimonial-title flex'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner={ newTestimonial ? 'New Testimonial' : 'Testimonials' }
            />
            <Tooltip
               hintText='Do you have customer testimonial about your course. This would be a good place to add that and showcase what other customers are saying.'
               style={ { top: '-3px' } }
               hintStyle={ { bottom: 'auto', top: '18px', width: '230px' } }
            />
         </div>
         {!newTestimonial && (
            <div className={ testimonial.picture_src ? 'testimonial__delete' : 'testimonial__delete_margin' }>
               <div className='textArea'>
                  <span className='textBasic dont-break-out textBasic_type_normal textBasic_size_extraSmall comment'>Testimonial {count + 1}</span>
               </div>
               <div role='presentation' onClick={ () => deleteSignUp(testimonial.id) }>
                  <Icon name='Delete' />
               </div>
            </div>

         )}
         <div className={ (!testimonial.picture_src) ? 'uploadImg' : 'authorImg' }>
            <img
               // eslint-disable-next-line max-len
               src={ currentTestimonial && currentTestimonial.id === testimonial.id ? (currentTestimonial.picture_src ? currentTestimonial.picture_src : camera) : (testimonial.picture_src ? testimonial.picture_src : camera) }
               alt={ currentTestimonial && currentTestimonial.id === testimonial.id ? currentTestimonial.picture_src ? currentTestimonial.author_name : 'camera' : (testimonial.picture_src ? testimonial.author_name : 'camera') }
               className={ testimonial.picture_src ? 'author-image' : '' }
            />

            {newTestimonial ? (
               <BaseButton
                  size={ btnSize.medium }
                  text='Upload'
                  onClick={ () => {
                     widget.current.openWidget();
                  } }
               />
            ) : (
               <BaseButton
                  size={ btnSize.medium }
                  text={ currentTestimonial && currentTestimonial.id === testimonial.id ? 'Upload' : 'Edit' }
                  onClick={ currentTestimonial && currentTestimonial.id === testimonial.id ? () => {
                     widget.current.openWidget();
                  } : () => chooseTestimonial(testimonial.id) }
               />
            ) }


         </div>
         <div className='uploadProg'>
            {progressEL}
         </div>

         { newTestimonial ? (
            <>
               <div className='inputsBlock'>
                  <TextArea
                     label='Comment'
                     rightLabel={ `${ charectersLimit }/250` }
                     placeholder='Type comment here'
                     name='text'
                     value={ testimonial.text }
                     onChange={ (key, value) => {
                        return (
                           handleInputSignUpChange(key, value, testimonial.id),
                           getCharectersLength(value.length)
                        );
                     } }
                  />
                  <TextInput
                     label='Author'
                     placeholder='Type author here'
                     name='author_name'
                     value={ testimonial.author_name }
                     onChange={ (key, value) => handleInputSignUpChange(key, value, testimonial.id) }
                  />
               </div>
               <div className='testimonial__btnsBlock new-testimonial'>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Cancel'
                     onClick={ () => handleAddTestimonial(false) }
                  />
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.large }
                     text='Save'
                     // disabled={ updateSignUpInProgress }
                     onClick={ () => { handleSignUpSave('testimonials', testimonial.id); } }
                  />
               </div>
            </>
         ) : currentTestimonial && currentTestimonial.id === testimonial.id ? (
            <div className='inputsBlock'>
               <TextArea
                  label='Comment'
                  rightLabel={ `${ currentTestimonial.text.length }/250` }
                  placeholder='Type comment here'
                  name='text'
                  value={ currentTestimonial.text }
                  onChange={ (key, value) => handleInputSignUpChange(key, value, 'update') }
               />
               <TextInput
                  label='Author'
                  placeholder='Type author here'
                  name='author_name'
                  value={ currentTestimonial.author_name }
                  onChange={ (key, value) => handleInputSignUpChange(key, value, 'update') }
               />
               <div className='testimonial__btnsBlock new-testimonial'>
                  {/* {!newTestimonial && (
            <>
               <BaseButton
                  theme={ btnTheme.lightGreen }
                  size={ btnSize.large }
                  text='Preview'
               />
            </>
            )} */}
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Cancel'
                     onClick={ () => chooseTestimonial(0) }
                  />
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.large }
                     text='Save'
                     // disabled={ updateSignUpInProgress }
                     onClick={ () => { handleSignUpSave('testimonials', testimonial.id); } }
                  />
               </div>

            </div>
         ) : (
            <>
               <div className='inputsBlock'>
                  <div>
                     <div className='textArea'>
                        <span className='textBasic dont-break-out textBasic_type_normal textBasic_size_extraSmall comment'>Comment</span>
                     </div>
                     <div className='textArea__div'>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.small }
                           inner={ testimonial.text }
                        />
                        <div className='testimonial__edit' role='presentation' onClick={ () => chooseTestimonial(testimonial.id) }>
                           <Icon name='EditItem' />
                        </div>
                     </div>

                  </div>
                  <div className='textInput__div'>
                     <div className='textArea'>
                        <span className='textBasic dont-break-out textBasic_type_normal textBasic_size_extraSmall comment'>Author</span>
                     </div>
                     <div className='textArea__div'>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.small }
                           inner={ testimonial.author_name }
                        />
                        <div className='testimonial__edit' role='presentation' onClick={ () => chooseTestimonial(testimonial.id) }>
                           <Icon name='EditItem' />
                        </div>
                     </div>

                  </div>
               </div>

            </>
         )
         }

      </div>
   );
};

TestimonialCardItem.propTypes = {
   testimonial: PropTypes.object,
   newTestimonial: PropTypes.bool,
   handleInputSignUpChange: PropTypes.func,
   handleSignUpSave: PropTypes.func,
   deleteSignUp: PropTypes.func,
   chooseTestimonial: PropTypes.func,
   currentTestimonial: PropTypes.object,
   count: PropTypes.number,
   handleAddTestimonial: PropTypes.func,
};


export default TestimonialCardItem;
