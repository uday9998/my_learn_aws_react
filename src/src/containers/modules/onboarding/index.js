import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'components/elements/Icon';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import { isOnboardingLoadingSelector, uncheckedStepsSelector, authUserSelector } from 'state/modules/common/selectors';
import { answerOnboardingQuestionOperation } from 'state/modules/common/operations';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import ModalNew from 'components/elements/ModalNew';
import VideoItem from 'components/elements/designCourse/courseMaterial/VideoItem';
import { allQuestionsAnswered } from 'state/modules/common/actions';
import VerifyEmailModal from '../verifyEmail'; 
import QuestionContent from './questionContent';
import './style.scss';
import logo from '../../../assets/images/miestrologo.svg'

const ONBOARDING_QUESTIONS = [
   {
      key: 'type-creator',
      isMultiple: false,
      type: 'question',
      title: 'What Type Of Creator Are You?',
      description: 'Select one from the list. We will use the results to recommend templates and designs that will meet your needs.',
      answers: [
         {
            title: 'Freelancer',
            answer: 'freelancer',
            iconBackground: '#F1F6FF',
            iconName: 'Laptop',
         },
         {
            title: 'Content Creator',
            answer: 'content_creator',
            iconBackground: '#FAEBF8',
            iconName: 'VideoQueue',
         },
         {
            title: 'Coach',
            answer: 'coach',
            iconBackground: '#FFF6D7',
            iconName: 'Cap',
         },
         {
            title: 'Business Owner',
            answer: 'business_owner',
            iconBackground: '#FFF1F1',
            iconName: 'BriefCase',
         },
         {
            title: 'Non for Profit',
            answer: 'non_for_profit',
            iconBackground: '#F6F1FF',
            iconName: 'Heart',
         },
      ],
   },
   {
      key: 'about-site',
      isMultiple: true,
      type: 'question',
      title: 'Where did you hear or learn about Miestro?',
      description: 'You can select a few from the list.',
      answers: [
         {
            title: 'Referred by Friend',
            answer: 'referred_by_friend',
            iconBackground: '#FAEBF8',
            iconName: 'UserCheck',
         },
         {
            title: 'Advertisement',
            answer: 'advertisement',
            iconBackground: '#FFF6D7',
            iconName: 'Megaphone',
         },
         {
            title: 'Google Search',
            answer: 'google_search',
            iconBackground: '#F1F6FF',
            iconName: 'Google',
         },
         {
            title: 'Social Media',
            answer: 'social_media',
            iconBackground: '#F6F1FF',
            iconName: 'Instagram',
         },
         {
            title: 'Other',
            answer: 'other',
            iconBackground: '#FFF1F1',
            iconName: 'Loader',
         },
      ],
   },
   {
      key: 'type-program',
      isMultiple: false,
      type: 'question',
      title: 'What Type Of Program Are You Creating On Miestro?',
      description: 'Select one from the list. ',
      answers: [
         {
            title: 'Digital Download',
            answer: 'digital_download',
            iconBackground: '#FAEBF8',
            iconName: 'CloudDownload',
         },
         {
            title: 'Community',
            answer: 'community',
            iconBackground: '#F1F6FF',
            iconName: 'Community',
         },
         {
            title: 'Video Membership',
            answer: 'video_membership',
            iconBackground: '#FDF2EA',
            iconName: 'VideoLibrary',
         },
         {
            title: 'Online Course',
            answer: 'online_course',
            iconBackground: '#F6F1FF',
            iconName: 'Course',
         },
         {
            title: 'Coaching Program',
            answer: 'coaching_program',
            iconBackground: '#FFF1F1',
            iconName: 'Class',
         },
         {
            title: 'Training Site',
            answer: 'training_site',
            iconBackground: '#FFF6D7',
            iconName: 'Globe',
         },
      ],
   },
   {
      key: 'site_name',
      type: 'input',
      iconName: 'Globe',
      iconBackground: '#FAEBF8',
      iconColor: '#BD30B7',
      title: 'Name Of Your Site',
      description: 'Identify your website by its name',
      inputLabel: 'Site Name',
   },
];

const STEPS = ['type-creator', 'about-site', 'type-program', 'site_name', 'video'];

class OnboardingContainer extends Component {
   static propTypes = {
      isOnboardingLoading: PropTypes.bool,
      uncheckedSteps: PropTypes.array,
      answerOnboardingQuestion: PropTypes.func,
      onCloseModal: PropTypes.func,
      authUser: PropTypes.object,
   }

   state = {
      answers: {},
      activeStep: '',
      vimeoScriptLoaded: false
   }

   componentDidMount() {
      const { uncheckedSteps, authUser } = this.props;
      
      if (authUser && authUser.is_verified_email !== 0) {
         if (!Array.isArray(uncheckedSteps) || uncheckedSteps.length === 0) {
            this.setState({
               activeStep: 'site_name',
            });
            return;
         }
         
         for (let i = 0; i < STEPS.length; i++) {
            const step = STEPS[i];
            let currentStep;
            if (step === 'site_name') {
               currentStep = step;
            } else {
               const stepFromList = uncheckedSteps.find(item => Boolean(item) && item.slug === step);
               if (stepFromList && stepFromList.status === 0) {
                  currentStep = step;
               }
            }

            if (currentStep) {
               this.setState({
                  activeStep: currentStep,
               });
               break;
            }
         }
      }
   }

   componentDidUpdate(prevProps, prevState) {
      const { activeStep, vimeoScriptLoaded } = this.state;
      const { authUser } = this.props;
      
      if (prevProps.authUser && 
          prevProps.authUser.is_verified_email === 0 && 
          authUser && 
          authUser.is_verified_email !== 0) {
         const { uncheckedSteps } = this.props;
         
         if (!Array.isArray(uncheckedSteps) || uncheckedSteps.length === 0) {
            this.setState({
               activeStep: 'site_name',
            });
            return;
         }
         
         for (let i = 0; i < STEPS.length; i++) {
            const step = STEPS[i];
            let currentStep;
            if (step === 'site_name') {
               currentStep = step;
            } else {
               const stepFromList = uncheckedSteps.find(item => Boolean(item) && item.slug === step);
               if (stepFromList && stepFromList.status === 0) {
                  currentStep = step;
               }
            }

            if (currentStep) {
               this.setState({
                  activeStep: currentStep,
               });
               break;
            }
         }
      }

      if (activeStep === 'video' && !vimeoScriptLoaded) {
         // Load Vimeo player script
         const script = document.createElement('script');
         script.src = "https://player.vimeo.com/api/player.js";
         script.async = true;
         document.body.appendChild(script);
         
         this.setState({ vimeoScriptLoaded: true });
      }
   }

   onClickAnswer = (key, value, isMultiple) => {
      const { answers } = this.state;
      if (!isMultiple) {
         this.setState({
            answers: {
               ...answers,
               [key]: [value],
            },
         });
      } else if (Array.isArray(answers[key])) {
         let values = [...answers[key]];
         if (values.includes(value)) {
            values = values.filter(val => val !== value);
         } else {
            values = [...values, value];
         }
         this.setState({
            answers: {
               ...answers,
               [key]: [...values],
            },
         });
      } else {
         this.setState({
            answers: {
               ...answers,
               [key]: [value],
            },
         });
      }
   }

   onInputChange = (key, value) => {
      const { answers } = this.state;
      this.setState({
         answers: {
            ...answers,
            [key]: value,
         },
      });
   }

   onClickCountinue = () => {
      const { answers, activeStep } = this.state;
      const { answerOnboardingQuestion } = this.props;

      const data = {};
      if (activeStep === 'site_name') {
         data.site_name = answers[activeStep];
         data.finished = 1;
      } else {
         data.step = {
            slug: activeStep,
            answers: answers[activeStep],
         };
         data.finished = 0;
      }

      answerOnboardingQuestion(
         data,
         () => {
            const currentIndex = STEPS.findIndex(step => step === activeStep);
            const nextIndex = currentIndex + 1;
            if (STEPS[nextIndex]) {
               this.setState({
                  activeStep: STEPS[nextIndex],
               });
            }

            const questionsWrapper = document.querySelector('.onboarding_content');
            if (questionsWrapper) {
               questionsWrapper.scrollTo(0, 0);
            }
         }
      );
   }

   closeModal = () => {
      const { onCloseModal } = this.props;
      const { activeStep } = this.state;
      if (activeStep !== 'video') return;

      onCloseModal();
   }

   render() {
      const { isOnboardingLoading, authUser } = this.props;
      const { answers, activeStep } = this.state;
      
      if (!authUser) {
        return isOnboardingLoading ? <LoaderSpinner /> : null;
      }
      
      if (authUser && authUser.is_verified_email === 0) {
         return <VerifyEmailModal />;
      }
      
      if (!activeStep) {
         return null;
      }
      
      const question = ONBOARDING_QUESTIONS.find(item => item.key === activeStep);
      if (!question && activeStep !== 'video') {
         return null;
      }

      const activeIndex = STEPS.findIndex(step => step === activeStep);

      const videoContainerStyle = {
         padding: '56.25% 0 0 0',
         position: 'relative',
         width: '100%'
      };
      
      const videoIframeStyle = {
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         border: 0
      };

      return (
         <ModalNew
            onCloseModal={this.closeModal}
            className='onboarding_wrapper'
         >
            {
               activeStep === 'video' ? (
                  <div style={videoContainerStyle}>
                     <iframe 
                        src="https://player.vimeo.com/video/1076185046?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                        style={videoIframeStyle}
                        title="Welcome To Miestro"
                     />
                  </div>
               ) : (
                  <>
                     <div className='modal_title_wrapper'>
                        <div className='onboarding_logo'>
                           <img src={logo} alt='' />
                           {/* <Icon name='Logo' /> */}
                        </div>

                        <div className='slider_wrapper'>
                           <div
                              className='slider'
                              style={ {
                                 width: `${ activeIndex * (100 / STEPS.length) }%`,
                              } }
                           />
                        </div>
                     </div>

                     <div className='onboarding_content scroll'>
                        {
                           isOnboardingLoading && (
                              <LoaderSpinner />
                           )
                        }
                        <QuestionContent
                           isLoading={ isOnboardingLoading }
                           answers={ answers }
                           onInputChange={ this.onInputChange }
                           question={ question }
                           type={ question.type }
                           onClickAnswer={ this.onClickAnswer }
                        />
                     </div>
                     <div className='button_wrapper'>
                        <BaseButton
                           text='Continue'
                           theme={ btnTheme.primary }
                           size={ btnSizes.largeDefault }
                           onClick={ this.onClickCountinue }
                           disabled={ !(Boolean(answers[question.key]) && answers[question.key].length > 0) }
                        />
                     </div>
                  </>
               )
            }
         </ModalNew>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isOnboardingLoading: isOnboardingLoadingSelector(state),
      uncheckedSteps: uncheckedStepsSelector(state),
      authUser: authUserSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      answerOnboardingQuestion: (
         data,
         callback,
         isLast
      ) => dispatch(answerOnboardingQuestionOperation(data, callback, isLast)),
      onCloseModal: () => dispatch(allQuestionsAnswered()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingContainer);