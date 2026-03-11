import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
// import MiestroStep from 'components/elements/dashboard/MiestroStep';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import addVideo from 'assets/images/dashboard/add-video.png';
import choosePlan from 'assets/images/dashboard/choose-plan.png';
import customize from 'assets/images/dashboard/customize.png';
import ProgressCircle from 'components/modules/dashboard/ProgressCircle';

const GetStarted = ({
   steps, onPassStep,
}) => {
   const stepImage = {
      'updated-settings': customize,
      'added-lesson': addVideo,
      'connected-payment': choosePlan,
   };
   let passStepCount = 0;
   steps.forEach(element => {
      const status = element.pivot.status;
      passStepCount += status;
   });
   const percent = passStepCount === 0 ? 0 : (passStepCount / steps.length) * 100;
   if (passStepCount === steps.length) {
      return null;
   }
   return (
      <div className='getStarted'>
         <div className='getStarted__progress'>
            <ProgressCircle
               size={ percent.toString() }
               text='Completed'
               stpesCount={ steps.length }
               passStepsCount={ passStepCount }
            />
         </div>
         <div className='getStarted__steps'>
            {
               steps.map(elm => {
                  const pivot = elm.pivot || {};
                  return (
                     <div
                        key={ elm.id }
                        className='getStarted__step1'
                     >
                        {
                           stepImage[elm.slug] && (
                              <div>
                                 <img src={ stepImage[elm.slug] } alt='customize' />
                              </div>
                           )
                        }
                        <div className='getStarted__step1__container'>
                           <div>
                              <Text
                                 type={ textType.normal }
                                 size={ textSize.extraSmall }
                                 inner={ elm.title }

                              />
                           </div>
                           <div className='getStarted__step1__content'>
                              <Text
                                 type={ textType.regular }
                                 size={ textSize.extraSmall }
                                 inner={ elm.description }


                              />
                           </div>
                        </div>
                        {
                           pivot.status ? (
                              <div className='step__done'>
                                 <Icon name='Step' />
                                 <Text
                                    type={ textType.normal }
                                    size={ textSize.small }
                                    inner=' All Done'
                                 />

                              </div>
                           ) : (
                              <div className='step__undone'>
                                 <BaseButton
                                    theme={ btnTheme.lightGreen }
                                    size={ btnSize.full }
                                    text='Try It Now'
                                    onClick={ () => onPassStep(elm.slug) }
                                 />
                              </div>
                           )
                        }
                     </div>
                  );
               })
            }
            {/* <MiestroStep text='Start with your first class in Miestro' finished={ true } />
            <MiestroStep text='Sign up for training' />
            <div className='getStarted__steps_buttonContent'>
               <div>
                  <MiestroStep text='Connect your payment methods' finished={ true } />
                  <MiestroStep text='Subscribe to a payment plan' finished={ true } />
                  <MiestroStep text='Integrate Miestro' finished={ true } />
               </div>
               <div className='getStarted__signUp getStarted__signUp_mobile '>
                  <div className='getStarted__text'>
                     <Text
                        type={ textType.regular }
                        size={ textSize.extraSmall }
                        inner='I will tell you from experience my webinars fill up ridiculously fast... but themain reason I will tell you from experience my webinars fill up ridiculously fast... but themain reason'
                        color='#6c7f99'
                     />
                  </div>
                  <div className='getStarted__buttons'>
                     <BaseButton
                        theme={ buttonTheme.lightGreen }
                        size={ buttonSizes.large }
                        margin={ true }
                        text='Learn More'
                     />
                     <BaseButton
                        theme={ buttonTheme.darkGreen }
                        size={ buttonSizes.large }
                        text='Sign Up For Training'
                     />
                  </div>
               </div>
            </div> */}
         </div>

         {/* <div className='getStarted__signUp getStarted__signUp_desctop '>
            <div className='getStarted__text'>
               <Text
                  type={ textType.regular }
                  size={ textSize.extraSmall }
                  inner='I will tell you from experience my webinars fill up ridiculously fast... but themain reason I will tell you from experience my webinars fill up ridiculously fast... but themain reason'
                  color='#6c7f99'
               />
            </div>
            <div className='getStarted__buttons'>
               <BaseButton
                  theme={ buttonTheme.lightGreen }
                  size={ buttonSizes.large }
                  margin={ true }
                  text='Learn More'
               />
               <BaseButton
                  theme={ buttonTheme.darkGreen }
                  size={ buttonSizes.large }
                  text='Sign Up For Training'
               />
            </div>
         </div> */}
      </div>
   );
};
GetStarted.propTypes = {
   steps: PropTypes.array,
   onPassStep: PropTypes.func,
};
GetStarted.defaultProps = {
   onPassStep: () => {},
};

export default GetStarted;
