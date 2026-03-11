import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import '../index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import TestimonialCardItem from './TestimonialCardItem';

const TestimonialCard = ({
   signUp, handleInputSignUpChange, handleSignUpSave, deleteSignUp, chooseTestimonial,
   currentTestimonial, previewCheckout, updateSignUpInProgress, handleAddTestimonial, settings,
}) => {
   return (
      <ItemWrapper>
         <div className='signUpCard'>
            {signUp.testimonials && signUp.testimonials.map((testimonial, index) => (
               <TestimonialCardItem
                  key={ testimonial.id }
                  testimonial={ testimonial }
                  handleInputSignUpChange={ handleInputSignUpChange }
                  handleSignUpSave={ handleSignUpSave }
                  deleteSignUp={ deleteSignUp }
                  testimonialInput={ testimonial }
                  chooseTestimonial={ chooseTestimonial }
                  currentTestimonial={ currentTestimonial }
                  count={ index }
                  updateSignUpInProgress={ updateSignUpInProgress }
               />
            )
            )}
            {(signUp.testimonials.length === 0 || signUp.isTestimonalSaved === true) && (
               <TestimonialCardItem
                  testimonial={ signUp.newTestimonialInput }
                  newTestimonial
                  handleInputSignUpChange={ handleInputSignUpChange }
                  handleSignUpSave={ handleSignUpSave }
                  updateSignUpInProgress={ updateSignUpInProgress }
                  handleAddTestimonial={ handleAddTestimonial }
               />
            )}
            { signUp.testimonials.length !== 0 && signUp.testimonials.length !== 5 && !signUp.isTestimonalSaved && (
               <div className='btnsBlock'>
                  {settings.pricings && settings.pricings.length !== 0 && (
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.full }
                        text='Preview'
                        onClick={ () => previewCheckout() }
                     />
                  )}
                  <BaseButton
                     theme={ btnTheme.greenBordered }
                     size={ btnSize.full }
                     text='Add Another Testimonial'
                     // eslint-disable-next-line no-param-reassign
                     onClick={ () => { signUp.newTestimonialInput = {}; handleAddTestimonial(true); } }
                     style={ { width: '236px' } }
                  />
               </div>
            )
            }
         </div>
      </ItemWrapper>
   );
};

TestimonialCard.propTypes = {
   signUp: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   handleInputSignUpChange: PropTypes.func,
   deleteSignUp: PropTypes.func,
   chooseTestimonial: PropTypes.func,
   currentTestimonial: PropTypes.object,
   updateSignUpInProgress: PropTypes.bool,
   handleAddTestimonial: PropTypes.func,
   previewCheckout: PropTypes.func,
   settings: PropTypes.object,
};


export default TestimonialCard;
