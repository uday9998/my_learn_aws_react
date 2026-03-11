/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import StudentsRoom from 'views/pages/StudentsRoom';
import VideoProgamsRoom from 'views/pages/VideoProgamsRoom';
import CompletionModal from 'views/pages/StudentsRoom/CompletionModal';
import * as operations from 'state/modules/studentsRoom/operations';
import { freeCourseOperation, courseWebSessionOperation } from 'state/modules/mainhub/operations';
import { setIsComplateCompleted } from 'state/modules/studentsRoom/actions';
import * as selectors from 'state/modules/studentsRoom/selectors';
import CongratulationsCard from 'components/modules/promotions/gamification/CongratulationsCard';
import Modal from 'components/elements/Modal';
// import CourseHeaderNav from 'components/modules/mainHub/CourseHeaderNav';
import {
   getCourseStatus, addNoCompletedView, addCompletedView, generateCheckoutToken,
} from 'api/AuthApi';
import { appSelector, authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
import { commentsCountSelector } from 'state/modules/courseComments/selectors';
import MultiLang from 'utils/MultiLang/MultiLang';
import Congratulations from 'views/pages/certificates/congratulations';
import withLoading from 'utils/withLoading';
// import { getLandingUrl } from 'utils/url';
import axios from 'axios';
import DripModalContent from 'components/modules/studentsRoom/dripModalContent';
import PopUp from 'components/modules/studentsRoom/PopUp';
// import QueryParams from 'utils/QueryParams';
import { portalId } from 'utils/constants';
import LessonCommonDataContext from './LessonCommonDataContext';

const StudentRoomIsLoading = withLoading('div');

class StudentsRoomContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      match: PropTypes.object,
      getCourse: PropTypes.func,
      getCourseInProgress: PropTypes.bool,
      course: PropTypes.object,
      getLesson: PropTypes.func,
      courseWebSession: PropTypes.func,
      lessons: PropTypes.array,
      sections: PropTypes.array,
      author: PropTypes.object,
      history: PropTypes.object,
      defaultLessonId: PropTypes.number,
      lesson: PropTypes.object,
      setLessonComplete: PropTypes.func,
      goToBack: PropTypes.func,
      courseComplatePercent: PropTypes.number,
      getLessonInProgress: PropTypes.bool,
      defaultQuestionId: PropTypes.number,
      questions: PropTypes.array,
      isComplate: PropTypes.bool,
      setIsComplate: PropTypes.func,
      setCourseComplete: PropTypes.func,
      authUser: PropTypes.object,
      commentsCount: PropTypes.any,
      siteInfo: PropTypes.object,
      hasCertificate: PropTypes.bool,
      prerequisiteLessonIndex: PropTypes.number,
   };

   constructor(props) {
      super(props);
      this.state = {
         playlistData: {},
         active: null,
         activeLesson: -1,
         activeQuestion: -1,
         lessonFormat: '',
         badgeModalOpen: false,
         prevButtonShow: false,
         quizCompletedModalOpen: false,
         isChecked: [],
         isLoading: true,
         disableNext: false,
         questionNextText: 'Next Question',
         mobileActiveCoursesTab: false,
         isPreview: false,
         isCloseFirstModal: false,
         getCourseStatusInProgress: true,
         slidesToShow: 4,
         rates: {},
         isDripOpen: false,
         item: {},
         isUnreadComments: false,
         courseStatus: {},
         planId: null,
      };
   }


   async componentDidMount() {
      const {
         match, getCourse, getLesson, history, siteInfo,
      } = this.props;
      this.calculateVideoLessonWidth();
      if (siteInfo.favicon) {
         document.querySelector("link[rel*='icon']").href = siteInfo.favicon;
      }

      // Restore language preference on page load
      const savedLanguage = localStorage.getItem('currentLanguage');
      if (savedLanguage && savedLanguage !== 'en') {
         // Wait for Google Translate to be available then apply the saved language
         const applyTranslation = () => {
            const translateElement = document.querySelector('.goog-te-combo');
            if (translateElement) {
               translateElement.value = savedLanguage;
               translateElement.dispatchEvent(new Event('change'));
            } else {
               // If Google Translate is not ready yet, try again
               setTimeout(applyTranslation, 100);
            }
         };
         applyTranslation();
      }

      const courseName = match.params.id.replace(/\./g, '');
      let path = history.location.search;
      if (path && path.includes('unreadComments')) {
         this.setState({
            isUnreadComments: true,
         });
      }
      const preview = path.split('&preview=')[1];

      if (path) {
         this.setState({
            mobileActiveCoursesTab: true,
         });
      }

      let courseStatus;

      try {
         courseStatus = await getCourseStatus(courseName);
         // if (courseStatus.data && courseStatus.data.joined_status === 3 && !window.offer) {
         //    return history.replace('/offers');
         // }
      } catch (error) {
         return history.replace('/portal/membership');
      }
      this.setState({ getCourseStatusInProgress: false });
      const locationHash = window.location.hash;
      if (locationHash && locationHash.split('#plan=') && locationHash.split('#plan=')[1]) {
         const currentFreePlanId = parseInt(locationHash.split('#plan=')[1], 10);
         this.handleCourseStatus(courseStatus.data, currentFreePlanId);
      } else {
         this.handleCourseStatus(courseStatus.data);
      }
      this.setState({ courseStatus });

      const isMembership = match.params.link;
      const isPlaylist = match.params.playlistLink;
      const planIdForFree = this.checkIfFree(courseStatus.data);
      const playlistData = await getCourse(courseName, preview, isMembership, isPlaylist, planIdForFree);
      this.setState({ playlistData });
      if (preview === 'success') {
         this.setState({ isPreview: true });
      }
      const {
         defaultLessonId, prerequisiteLessonIndex, lessons, course, 
      } = this.props;
      let currentLessonId = defaultLessonId;
      let isShow = false;
      if (path) {
         path = path.split('=');
         if (isMembership || isPlaylist) {
            if (path[0] === '?video') {
               const pathId = parseInt(path[1], 10);
               currentLessonId = pathId;
               if (pathId !== defaultLessonId) {
                  isShow = true;
                  this.setState({ prevButtonShow: isShow });
               }
            }
         } else if (path[0] === '?lesson') {
            const pathId = parseInt(path[1], 10);
            currentLessonId = pathId;
            if (pathId !== defaultLessonId) {
               isShow = true;
               this.setState({ prevButtonShow: isShow });
            }
         }
      }
      if (courseName && lessons && !!lessons.length) {
         const currentLesson = lessons.find(({ id }) => id === currentLessonId);
         const prerequisiteLesson = lessons.find(({ lessonIndex }) => lessonIndex === prerequisiteLessonIndex);
         if (currentLesson && currentLesson.lessonIndex > prerequisiteLessonIndex && prerequisiteLesson) {
            currentLessonId = prerequisiteLesson.id;
         }

         if (currentLesson && !currentLesson.is_free_lesson && currentLesson.is_driplesson
             && !!course.joined) {
            this.setIsDripOpen(true, currentLesson);
         }

         if (currentLesson) {
            this.showLesson(courseName, currentLessonId, currentLesson);
            await getLesson(courseName, currentLessonId, isPlaylist);
            this.setState({ activeLesson: currentLessonId });
         } else {
            this.showLesson(courseName, defaultLessonId, lessons[0]);
            await getLesson(courseName, defaultLessonId, isPlaylist);
            this.setState({ activeLesson: defaultLessonId });
         }
      }


      const { defaultQuestionId, questions } = this.props;
      if (defaultQuestionId) {
         this.setState({ isChecked: [], activeQuestion: defaultQuestionId });
         let questionBtnText = 'Next Question';
         if (questions.length === 1) {
            questionBtnText = 'Submit';
         }
         this.setState({ questionNextText: questionBtnText });
      }
      if (this.props.lesson.comment_status) {
         this.setState({ active: 1 });
      } else {
         this.setState({ active: 3 });
      }
   }

   componentDidUpdate(prevProps) {
      if (prevProps.isComplate !== this.props.isComplate && this.props.isComplate) {
         this.props.setCourseComplete(this.props.course.id);
      }
   }

   componentWillUnmount() {
      document.querySelector("link[rel*='icon']").href = '/favicon.ico';
      const body = document.querySelector('body');
      body.style.overflow = 'auto';
      body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Avenir Next", sans-serif';
   }

   showLesson = (courseName, lessonId, lessonNew) => {
      const {
         history, match,
      } = this.props;
      const isMembership = match.params.link;
      const isPlaylist = match.params.playlistLink;
      if (isMembership && !lessonNew?.is_playlist) {
         history.replace(`/programs/${ courseName }/${ isMembership }?video=${ lessonId }`);
      } else if (isPlaylist && !lessonNew?.is_playlist) {
         history.replace(`/programs/${ courseName }/playlists/${ isPlaylist }?video=${ lessonId }`);
      } else if (lessonNew && lessonNew.is_playlist) {
         window.open(`/programs/${ courseName }/playlists/${ lessonNew.link }`, '_self');
      } else {
         history.replace(`/programs/${ courseName }?lesson=${ lessonId }`);
      }
   }

    LinkHref = (customUrl) => {
       let newUrl = customUrl;
       if (!customUrl.match(/^https?:\/\//i)) {
          newUrl = `http://${ customUrl }`;
       }
       return newUrl;
    };

    checkIfFree = ({
       joined, joined_status: joinedStatus, pricings, plan_id,
    }) => {
       const { authUser } = this.props;
       this.joinedStatus = joinedStatus;
       const loggedIn = !!authUser;
       if (!(loggedIn && joined)) {
          if (loggedIn && window.plan && window.plan.pricings && window.plan.pricings.length === 1 && window.plan.pricings[0].pricing_type === 0) {
             return window.plan.id;
          } if (loggedIn && !window.plan && plan_id && pricings.length === 1 && pricings[0].pricing_type === 0) {
             return plan_id;
          }
       }
    }

    handleCourseStatus = ({
       course_id: courseId, joined, joined_status: joinedStatus, plan_id,
    }) => {
       //  const { siteInfo } = this.props;
       this.joinedStatus = joinedStatus;
       //  const isLanding = QueryParams.get('isLanding');
       //  const planId = QueryParams.get('planId');
       const { courseWebSession, authUser } = this.props;
       const loggedIn = !!authUser;
       //  if (loggedIn && joined && joinedStatus === 3) {
       //     this.setState({ isLoading: false });
       //     return;
       //  }
       if (loggedIn && joined) {
          courseWebSession(courseId);
       } 
       this.setState({ isLoading: false, planId: plan_id });

       //  if (window.freeCourse === 'free' && loggedIn && window.offerId && !joined) {
       //     const planPricings = plans.filter((plan => plan.id === window.offerId))[0].pricings;
       //     const freePricing = planPricings.filter(pr => pr.pricing_type === 0)[0];
       //     freeCourse(courseId, freePricing.id);
       //  } else if (window.offerId && !!plans && !!plans.length && plans.filter((plan => plan.id === window.offerId))
       //   && !!plans.filter((plan => plan.id === window.offerId)).length && joinedStatus !== 3) {
       //     const planPricings = plans.filter((plan => plan.id === window.offerId))[0].pricings;
       //     const freePricing = planPricings.filter(pr => pr.pricing_type === 0)[0];
       //     if (loggedIn) {
       //        freeCourse(courseId, freePricing.id);
       //     } else {
       //        const redirectUrl = `/register?course=${ pricings[0].course_id }&plan=${ pricings[0].id }`;
       //        window.location.href = redirectUrl;
       //     }
       //  } else if (pricings && pricings.filter(pricing => pricing.id === currentFreePlanId) && pricings.filter(pricing => pricing.id === currentFreePlanId)[0]
       //   && pricings.filter(pricing => pricing.id === currentFreePlanId)[0].pricing_type === 0 && joinedStatus !== 3) {
       //     if (loggedIn) {
       //        freeCourse(pricings.filter(pricing => pricing.id === currentFreePlanId)[0].course_id, pricings.filter(pricing => pricing.id === currentFreePlanId)[0].id);
       //     } else {
       //        const redirectUrl = `/register?course=${ pricings.filter(pricing => pricing.id === currentFreePlanId)[0].course_id }&plan=${ pricings.filter(pricing => pricing.id === currentFreePlanId)[0].id }`;
       //        window.location.href = redirectUrl;
       //     }
       //  } else if (joinedStatus !== 3) {
       //     //  const checkoutUrl = process.env.REACT_APP_CHECKOUT_URL;
       //     //  if (loggedIn) {
       //     //     let redirectUrl = `${ checkoutUrl }${ siteInfo.site_uuid }/${ authUser.id }/${ courseId }`;
       //     //     if (window.joinButton && activeLandingUrl) {
       //     //        redirectUrl = getLandingUrl(activeLandingUrl);
       //     //     } else if (isLanding && planId) {
       //     //        redirectUrl = `${ checkoutUrl }${ siteInfo.site_uuid }/${ authUser.id }/${ courseId }/${ planId }`;
       //     //     }
       //     //     window.location.href = redirectUrl;
       //     //  } else if (window.joinButton || isLanding) {
       //     //     let redirectUrl = `${ checkoutUrl }${ siteInfo.site_uuid }/${ 0 }/${ courseId }`;
       //     //     if (window.joinButton && activeLandingUrl) {
       //     //        redirectUrl = getLandingUrl(activeLandingUrl);
       //     //     } else if (isLanding && planId) {
       //     //        redirectUrl = `${ checkoutUrl }${ siteInfo.site_uuid }/${ 0 }/${ courseId }/${ planId }`;
       //     //     }
       //     //     window.location.href = redirectUrl;
       //     //  } else {
       //     //     window.location.href = '/offers';
       //     //  }
       //  }
    };

   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }

   onJoin = async () => {
      const {
         authUser, siteInfo, course,
      } = this.props;
      const { planId, courseStatus: { data: courseStatusData } } = this.state;

      const loggedIn = !!authUser;
      const checkoutUrl = process.env.REACT_APP_CHECKOUT_URL;
      let planNewId = planId || course.plan_id;
      let checkoutURL = course.checkout_url?.url || siteInfo.site_uuid;
      if ((!window.plan?.id && course.is_free)
       || (window.plan && window.plan.pricings
         && window.plan.pricings.length === 0
         && window.plan.pricings[0].pricing_type === 0)) {
         return false;
      }
      if (window.plan && !window.plan.publish_without_integrations) {
         planNewId = window.plan.id;
         checkoutURL = window.plan.checkout_url?.url || siteInfo.site_uuid;
      }

      if (loggedIn && planNewId) {
         const { data: checkoutToken } = await generateCheckoutToken({ planId, pricingId: courseStatusData.pricings[0].id });

         const redirectUrl = `${ checkoutUrl }${ checkoutURL }/${ authUser.id }/${ planNewId }?jwt=${ checkoutToken }`;
         window.open(redirectUrl, '_blank');

         return true;
      } if (planNewId) {
         const redirectUrl = `${ checkoutUrl }${ checkoutURL }/${ 0 }/${ planNewId }`;
         window.open(redirectUrl, '_blank');
         return true;
      }

      // if (landing_custom_url && is_custom_url) {
      //    window.open(LinkHref(landing_custom_url));
      // }
      // if (window.offer) {
      //    if (window.offer.active_landing_url) {
      //       window.open(getLandingUrl(window.offer.active_landing_url));
      //    } else if (loggedIn) {
      //       const redirectUrl = `${ checkoutUrl }${ siteInfo.site_uuid }/${ authUser.id }/${ window.offer.id }`;
      //       window.location.href = redirectUrl;
      //    } else {
      //       const redirectUrl = `${ checkoutUrl }${ siteInfo.site_uuid }/${ 0 }/${ window.offer.id }`;
      //       window.location.href = redirectUrl;
      //    }
      // }
   }


   isFreeCourse = () => {
      const {
         authUser, course,
      } = this.props;
      const { planId } = this.state;
      const loggedIn = !!authUser;
      const planNewId = planId || course.plan_id;
      if ((!window.plan?.id && course.is_free)
       || (window.plan && window.plan.pricings
         && window.plan.pricings.length === 0
         && window.plan.pricings[0].pricing_type === 0)) {
         return true;
      }
      if ((loggedIn && planNewId) || planNewId) {
         return false;
      }
   }

   changeTab = (tabId) => {
      this.setState({ active: tabId });
   }

   changeLesson = async (lessonId, lessonFormat, isDripLesson, item) => {
      const {
         match, getLesson, history, defaultLessonId, course,
      } = this.props;
      this.setState({ badgeModalOpen: false, mobileActiveCoursesTab: true });
      const courseName = match.params.id;
      if (!course.joined) {
         await getLesson(courseName, lessonId, match.params.playlistLink);
         this.setState({
            activeLesson: lessonId,
         });
         if (lessonId === defaultLessonId) {
            this.setState({ prevButtonShow: false });
         } else {
            this.setState({ prevButtonShow: true });
         }
         this.showLesson(courseName, lessonId);

         return;
      }
      if (!item.is_free_lesson && item.is_driplesson) {
         this.setIsDripOpen(true, item);
      } else {
         await getLesson(courseName, lessonId, match.params.playlistLink);
         const active = this.props.lesson.comment_status ? 1 : 3;
         this.setState({ activeLesson: lessonId, active, lessonFormat });
         if (lessonId === defaultLessonId) {
            this.setState({ prevButtonShow: false });
         } else {
            this.setState({ prevButtonShow: true });
         }
         this.showLesson(courseName, lessonId);

         const { defaultQuestionId, questions } = this.props;
         if (defaultQuestionId) {
            this.setState({ isChecked: [], activeQuestion: defaultQuestionId, disableNext: false });
            if (questions.length > 1) {
               this.setState({ questionNextText: 'Next Question' });
            } else {
               this.setState({ questionNextText: 'Submit' });
            }
         }
      }
   }

   activeLessonPrev = async () => {
      const {
         match, lessons, getLesson, history, defaultLessonId, course,
      } = this.props;

      const { activeLesson } = this.state;
      const courseName = match.params.id;
      let currentNumber;
      lessons.forEach((lesson, i) => {
         if (lesson.id === activeLesson) {
            currentNumber = i;
         }
      });
      this.setState({
         active: lessons[currentNumber - 1].comment_status ? 1 : 3,
         badgeModalOpen: false,
      });
      if (!course.joined) {
         await getLesson(courseName, lessons[currentNumber - 1].id, match.params.playlistLink);
         this.setState({
            activeLesson: lessons[currentNumber - 1].id,
         });
         if (lessons[currentNumber - 1].id === defaultLessonId) {
            this.setState({ prevButtonShow: false });
         }
         this.showLesson(courseName, lessons[currentNumber - 1].id);

         return;
      }
      if (!lessons[currentNumber - 1].is_free_lesson
         && lessons[currentNumber - 1].is_driplesson && lessons[currentNumber - 1].is_driplesson === 1) {
         this.setIsDripOpen(true, lessons[currentNumber - 1]);
      } else if (currentNumber !== 0 && !lessons[currentNumber - 1].is_driplesson) {
         await getLesson(courseName, lessons[currentNumber - 1].id, match.params.playlistLink);
         this.setState({ activeLesson: lessons[currentNumber - 1].id });
         if (lessons[currentNumber - 1].id === defaultLessonId) {
            this.setState({ prevButtonShow: false });
         }
         this.showLesson(courseName, lessons[currentNumber - 1].id);
      }
      const { defaultQuestionId, questions } = this.props;
      if (defaultQuestionId) {
         this.setState({ isChecked: [], activeQuestion: defaultQuestionId, disableNext: false });
         if (questions.length > 1) {
            this.setState({ questionNextText: 'Next Question' });
         } else {
            this.setState({ questionNextText: 'Submit' });
         }
      }
   }

   activeLessonNext = async (lessonId, lessonNew) => {
      const {
         match, lessons, getLesson, history, setLessonComplete, defaultLessonId, lesson,
         prerequisiteLessonIndex, course,
      } = this.props;
      if (lessonNew && lessonNew.is_playlist) {
         window.open(`/programs/${ course.course_url }/playlists/${ lessonNew.link }`, '_self');
         return;
      }
      const { activeLesson } = this.state;
      const courseName = match.params.id;
      let currentNumber;
      let nextLessonId;
      lessons.forEach((lessonn, i) => {
         if (lessonn.id === activeLesson) {
            currentNumber = i;
         }
      });
      if (lessonId) {
         nextLessonId = lessonId;
      } else if (currentNumber !== lessons.length - 1) {
         nextLessonId = lessons[currentNumber + 1].id;
         this.setState({ prevButtonShow: true });
      } else {
         nextLessonId = defaultLessonId;
         this.setState({ prevButtonShow: false });
      }
      const nextLesson = lessons.find(element => element.id === nextLessonId);
      this.setState({
         active: nextLesson.comment_status ? 1 : 3,
         badgeModalOpen: false,
         activeLesson: nextLessonId,
      });
      if (!course.joined) {
         getLesson(courseName, nextLessonId, match.params.playlistLink);
         this.setState({
            activeLesson: nextLessonId,
         });
         this.showLesson(courseName, nextLessonId);
         return;
      }
      if (!lessons[currentNumber].viewed && lessons[currentNumber].is_driplesson === 1 && !lessons[currentNumber].is_free_lesson && prerequisiteLessonIndex === currentNumber) {
         this.setState({
            activeLesson: lessons[currentNumber].id,
         });
         return;
      }
      if ((!lessons[currentNumber].viewed) && lesson.lesson_badge && lessons[currentNumber].lesson_format !== 'quiz' && (lessons[currentNumber].is_driplesson !== 1 || lessons[currentNumber].is_free_lesson)) {
         if (lesson.lesson_format === 'zoom' && lesson.zoom_meeting && lesson.zoom_meeting.status !== 'waiting' && lesson.zoom_meeting.is_booked) {
            this.setState({ badgeModalOpen: true });
            if (!lesson.is_complete && course.type !== '1') {
               setLessonComplete(courseName, lesson.id);
            }
         } else if (lesson.lesson_format !== 'zoom') {
            this.setState({ badgeModalOpen: true });
            if (!lesson.is_complete && course.type !== '1') {
               setLessonComplete(courseName, lesson.id);
            }
         }
      } else {
         if (!lesson.viewed && lesson.lesson_format !== 'quiz' && (lesson.is_driplesson !== 1 || lesson.is_free_lesson)) {
            if (lesson.lesson_format === 'zoom' && lesson.zoom_meeting && lesson.zoom_meeting.status !== 'waiting' && lesson.zoom_meeting.is_booked) {
               if (!lesson.is_complete && course.type !== '1') {
                  setLessonComplete(courseName, lesson.id);
               }
            } else if (lessons[currentNumber].lesson_format !== 'zoom' && course.type !== '1') {
               if (!lesson.is_complete) {
                  setLessonComplete(courseName, lesson.id);
               }
            }
         }
         if (lessons.filter(filteredLesson => filteredLesson.id === nextLessonId) && !lessons.filter(filteredLesson => filteredLesson.id === nextLessonId)[0].is_free_lesson
         && lessons.filter(filteredLesson => filteredLesson.id === nextLessonId)[0].is_driplesson) {
            this.setIsDripOpen(true, lessons.filter(filteredLesson => filteredLesson.id === nextLessonId)[0]);
            this.setState({
               activeLesson: lessons[currentNumber].id,
            });
         } else {
            this.setState({
               activeLesson: nextLessonId,
            });
            this.showLesson(courseName, nextLessonId);
            await getLesson(courseName, nextLessonId, match.params.playlistLink);
         }
      }

      const { defaultQuestionId, questions } = this.props;
      if (defaultQuestionId) {
         this.setState({ isChecked: [], activeQuestion: defaultQuestionId, disableNext: false });
         if (questions.length > 1) {
            this.setState({ questionNextText: 'Next Question' });
         } else {
            this.setState({ questionNextText: 'Submit' });
         }
      }
   }

   onbadgeModalClick = () => {
      this.setState({ badgeModalOpen: false });
      const {
         match, lessons, history, defaultLessonId, getLesson,
      } = this.props;
      const { activeLesson } = this.state;
      const courseName = match.params.id;
      let currentNumber;
      let nextLessonId;
      lessons.forEach((lesson, i) => {
         if (lesson.id === activeLesson) {
            currentNumber = i;
         }
      });
      if (currentNumber !== lessons.length - 1) {
         nextLessonId = lessons[currentNumber].id;
      } else {
         nextLessonId = defaultLessonId;
      }
      getLesson(courseName, nextLessonId, match.params.playlistLink);
      history.push(`/programs/${ courseName }?lesson=${ nextLessonId }`);
   };

   handleGotit = () => {
      this.setState({ badgeModalOpen: false, isDripOpen: false });
      const {
         match, lessons, history, defaultLessonId, getLesson,
      } = this.props;
      const { activeLesson } = this.state;
      const courseName = match.params.id;
      let currentNumber;
      let nextLessonId;
      lessons.forEach((lesson, i) => {
         if (lesson.id === activeLesson) {
            currentNumber = i;
         }
      });
      if (currentNumber !== lessons.length) {
         nextLessonId = lessons[currentNumber].id;
      } else {
         nextLessonId = defaultLessonId;
      }
      getLesson(courseName, nextLessonId, match.params.playlistLink);
      history.push(`/programs/${ courseName }?lesson=${ nextLessonId }`);
   }

   onChangeChecked = (name, checked) => {
      const { isChecked } = this.state;
      const index = isChecked.indexOf(name);
      if (checked) {
         this.setState({
            isChecked: [...isChecked, name],
         });
      } else {
         const newValue = [...isChecked];
         newValue.splice(index, 1);
         this.setState({
            isChecked: newValue,
         });
      }
   }

   goToHasMobile = () => {
      const { mobileActiveCoursesTab } = this.state;
      const { goToBack } = this.props;
      if (mobileActiveCoursesTab) {
         this.setState({
            mobileActiveCoursesTab: false,
         });
         window.history.pushState('', '', window.location.pathname);
      } else {
         goToBack();
      }
   }

   onAddNoCompletedVideoView = (id) => {
      addNoCompletedView(id);
   }

   onAddCompletedVideoView = (id) => {
      addCompletedView(id);
   }

   closeFirstModalHandlerForSecond = (param) => {
      setTimeout(() => {
         this.setState({ isCloseFirstModal: param });
      }, 100);
   }

   closeComplateModal = (isNextButton) => {
      this.setState({ quizCompletedModalOpen: false });
      if (isNextButton) {
         this.activeLessonNext();
      }
   }

   setIsDripOpen = (param, dripLesson) => {
      this.setState({ isDripOpen: param, item: dripLesson });
   }

   callAPI(base) {
      const api = `https://api.exchangeratesapi.io/latest?base=${ base }`;

      axios(api)
         .then(results => {
            return results;
         }).then(data => this.setState({
            rates: data.data.rates,
         })
         );
   }

   calculateVideoLessonWidth() {
      const headerHeight = 150;
      const ration = 0.56;
      const height = window.innerHeight - headerHeight;
      const width = Number(height / ration).toFixed(2);
      document.body.style.setProperty('--video-width', `${ width }px`);
   }

   render() {
      const {
         active, activeLesson, lessonFormat, badgeModalOpen, prevButtonShow, activeQuestion, isChecked, disableNext,
         questionNextText, isPreview, isCloseFirstModal, isLoading, getCourseStatusInProgress,
         slidesToShow, rates, isDripOpen, item, quizCompletedModalOpen, isUnreadComments, courseStatus,
         playlistData,
      } = this.state;
      const {
         getCourseInProgress, course, lessons, sections, author, lesson, courseComplatePercent,
         questions, defaultQuestionId, getLessonInProgress, isComplate, setIsComplate, authUser, goToBack,
         commentsCount, siteInfo, hasCertificate, prerequisiteLessonIndex,
      } = this.props;
      const lessonCommonData = { prerequisiteLessonIndex };
      const darkMode = false;
      let siteColor = {};
      let siteTheme = {};
      if (course.theme && course.theme.themesparts) {
         siteColor = course.theme.themesparts.find(el => el.key === 'item_button_color');
         siteTheme = course.theme.themesparts.find(el => el.key === 'theme_font');
      }

      return (
         <MultiLang>
            <LessonCommonDataContext.Provider value={ lessonCommonData }>
               <StudentRoomIsLoading isLoading={ getCourseInProgress || isLoading || getCourseStatusInProgress } id='studentsRoom'>
                  {(course.type !== '0' || course.is_playlist === 1)
                  && (
                     <VideoProgamsRoom
                        playlistData={ playlistData }
                        commentsCount={ commentsCount }
                        isFreeCourse={ this.isFreeCourse }
                        logout={ this.handleLogout }
                        siteInfo={ siteInfo }
                        course={ course }
                        isPreview={ isPreview }
                        onJoin={ this.onJoin }
                        changeLesson={ this.activeLessonNext }
                        activeLesson={ activeLesson }
                        courseComplatePercent={ courseComplatePercent }
                        active={ active }
                        lessonFormat={ lessonFormat }
                        changeTab={ this.changeTab }
                        sections={ sections }
                        lessons={ lessons }
                        lesson={ lesson }
                        author={ author }
                        prevButtonShow={ prevButtonShow }
                        activeLessonPrev={ this.activeLessonPrev }
                        activeLessonNext={ this.activeLessonNext }
                        activeQuestionPrev={ this.activeQuestionPrev }
                        activeQuestionNext={ this.activeQuestionNext }
                        questions={ questions }
                        defaultQuestionId={ defaultQuestionId }
                        activeQuestion={ activeQuestion }
                        getLessonInProgress={ getLessonInProgress }
                        isChecked={ isChecked }
                        disableNext={ disableNext }
                        onChangeChecked={ this.onChangeChecked }
                        questionNextText={ questionNextText }
                        commentsData={ {
                           courseId: course.id,
                           courseName: course.url,
                           sectionId: lesson.section_id,
                           lessonId: lesson.id,
                        } }
                        authUser={ authUser }
                        textColor={ siteColor && siteColor.value ? siteColor.value : '#7cb740' }
                        primaryTheme={ siteTheme && siteTheme.value }
                        slidesToShow={ slidesToShow }
                        gotToDashboard={ goToBack }
                        onAddNoCompletedVideoView={ this.onAddNoCompletedVideoView }
                        onAddCompletedVideoView={ this.onAddCompletedVideoView }
                        rates={ rates }
                        item={ item }
                        joinedStatus={ this.joinedStatus }
                        isUnreadComments={ isUnreadComments }
                        courseStatus={ courseStatus }
                     />
                  )}
                  {course.type === '0' && course.is_playlist !== 1
                  && (
                     <StudentsRoom
                        commentsCount={ commentsCount }
                        siteInfo={ siteInfo }
                        isFreeCourse={ this.isFreeCourse }
                        course={ course }
                        isPreview={ isPreview }
                        onJoin={ this.onJoin }
                        changeLesson={ this.activeLessonNext }
                        activeLesson={ activeLesson }
                        courseComplatePercent={ courseComplatePercent }
                        active={ active }
                        lessonFormat={ lessonFormat }
                        changeTab={ this.changeTab }
                        sections={ sections }
                        lessons={ lessons }
                        lesson={ lesson }
                        author={ author }
                        prevButtonShow={ prevButtonShow }
                        activeLessonPrev={ this.activeLessonPrev }
                        activeLessonNext={ this.activeLessonNext }
                        activeQuestionPrev={ this.activeQuestionPrev }
                        activeQuestionNext={ this.activeQuestionNext }
                        questions={ questions }
                        defaultQuestionId={ defaultQuestionId }
                        activeQuestion={ activeQuestion }
                        getLessonInProgress={ getLessonInProgress }
                        isChecked={ isChecked }
                        disableNext={ disableNext }
                        onChangeChecked={ this.onChangeChecked }
                        questionNextText={ questionNextText }
                        commentsData={ {
                           courseId: course.id,
                           courseName: course.url,
                           sectionId: lesson.section_id,
                           lessonId: lesson.id,
                        } }
                        authUser={ authUser }
                        textColor={ siteColor && siteColor.value ? siteColor.value : '#7cb740' }
                        primaryTheme={ siteTheme && siteTheme.value }
                        slidesToShow={ slidesToShow }
                        gotToDashboard={ goToBack }
                        onAddNoCompletedVideoView={ this.onAddNoCompletedVideoView }
                        onAddCompletedVideoView={ this.onAddCompletedVideoView }
                        rates={ rates }
                        item={ item }
                        joinedStatus={ this.joinedStatus }
                        isUnreadComments={ isUnreadComments }
                     />
                  )}
                  { badgeModalOpen && lesson.lesson_badge && (
                     <Modal
                        blurColor='rgba(63, 79, 101, 0.6)'
                        // borderColor='var(--mainBgColorTransparent)'
                        contentBgColor='var(--mainBgColor)'
                        contentPosition='center'
                        closeOnClickOutside={ true }
                        contentWidth='389px'
                        onClose={ this.onbadgeModalClick }
                     >
                        <div>
                           <CongratulationsCard
                              badgeTitle={ lesson.lesson_badge.title }
                              successMessage={ lesson.lesson_badge.success_message }
                              image={ lesson.lesson_badge.badge_src }
                              bgColor={ lesson.lesson_badge.badge_bg_color }
                              btnColor={ lesson.lesson_badge.badge_btn_color }
                              btnText={ lesson.lesson_badge.badge_btn_text }
                              btnTextColor={ lesson.lesson_badge.badge_btn_text_color }
                              handleGotit={ this.handleGotit }
                              primaryTheme={ siteTheme && siteTheme.value ? siteTheme.value : 'Inter' }
                           />
                        </div>
                     </Modal>
                  )}
                  {
                     (isComplate && (hasCertificate !== undefined || hasCertificate === false)) && lesson.lesson_badge && badgeModalOpen && course.type !== '1' && (
                        <Modal
                           blurColor='rgba(63, 79, 101, 0.6)'
                           // borderColor='var(--mainBg005)'
                           contentBgColor='var(--mainBgColor)'
                           contentPosition='center'
                           closeOnClickOutside={ true }
                           contentWidth='389px'
                           onClose={ this.onbadgeModalClick }
                        >
                           <div>
                              <CongratulationsCard
                                 badgeTitle={ lesson.lesson_badge.title }
                                 successMessage={ lesson.lesson_badge.success_message }
                                 image={ lesson.lesson_badge.badge_src }
                                 bgColor={ lesson.lesson_badge.badge_bg_color }
                                 btnColor={ lesson.lesson_badge.badge_btn_color }
                                 btnText={ lesson.lesson_badge.badge_btn_text }
                                 btnTextColor={ lesson.lesson_badge.badge_btn_text_color }
                                 handleGotit={ this.handleGotit }
                                 primaryTheme={ siteTheme && siteTheme.value ? siteTheme.value : 'Inter' }
                              />
                           </div>
                        </Modal>
                     )}
                  {
                     (isComplate && (hasCertificate !== undefined || hasCertificate === false)) && course.type !== '1' && (
                        <Modal
                           blurColor='rgba(63, 79, 101, 0.6)'
                           // borderColor='var(--mainBgColorTransparent)'
                           contentBgColor='var(--mainBgColor)'
                           contentPosition='center'
                           closeOnClickOutside={ true }
                           contentWidth='500px'
                           className='Completion_student'
                           onClose={ () => {
                              setIsComplate(false);
                              this.closeFirstModalHandlerForSecond(true);
                           } }
                        >
                           <CompletionModal
                              description={ course.finish_message }
                              courseName={ course.name }
                              closeModal={ () => {
                                 setIsComplate(false);
                                 this.closeFirstModalHandlerForSecond(true);
                              } }
                              primaryTheme={ siteTheme && siteTheme.value ? siteTheme.value : 'Inter' }
                           />
                        </Modal>
                     )
                  }

                  {
                     quizCompletedModalOpen && (
                        <PopUp
                           closeModal={ () => this.closeComplateModal() }
                           text='Quiz Completed Successfully!'
                           darkMode={ darkMode }
                           buttonMessage='Next Lesson'
                           onButtonClick={ () => { this.closeComplateModal(true); } }
                        />
                     )
                  }

                  {
                     isCloseFirstModal && hasCertificate && course.type !== '1' && (
                        <Modal
                           contentBgColor='var(--mainBgColor)'
                           contentPosition='center'
                           roundedModal='8px'
                           contentWidth='552px'
                           closeOnClickOutside={ true }
                           onClose={ () => this.closeFirstModalHandlerForSecond(false) }
                        >
                           <Congratulations
                              closeModal={ () => this.closeFirstModalHandlerForSecond(false) }
                              courseName={ course.name }
                           />
                        </Modal>
                     )
                  }
                  {
                     isDripOpen && (
                        <Modal
                           contentBgColor='var(--mainBgColor)'
                           contentPosition='center'
                           roundedModal='8px'
                           // borderColor='var(--mainBgColorTransparent)'
                           contentWidth='552px'
                           closeOnClickOutside={ true }
                           onClose={ () => this.setIsDripOpen(false) }
                        >
                           <DripModalContent
                              closeModal={ () => this.setIsDripOpen(false) }
                              lesson={ item }
                              darkMode={ darkMode }
                           />
                        </Modal>
                     )
                  }
                  {/*  */}

               </StudentRoomIsLoading>
            </LessonCommonDataContext.Provider>
         </MultiLang>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      course: selectors.courseSelector(state),
      getCourseInProgress: selectors.getCourseInProgressSelector(state),
      lesson: selectors.lessonSelector(state),
      defaultLessonId: selectors.defaultLessonIdSelector(state),
      lessons: selectors.lessonsSelector(state),
      sections: selectors.sectionsSelector(state),
      author: selectors.authorSelector(state),
      getLessonInProgress: selectors.getLessonInProgressSelector(state),
      courseComplatePercent: selectors.courseComplatePercentSelector(state),
      questions: selectors.questionsSelector(state),
      defaultQuestionId: selectors.defaultQuestionIdSelector(state),
      isComplate: selectors.isComplateSelector(state),
      hasCertificate: selectors.hasCertificateSelector(state),
      prerequisiteLessonIndex: selectors.prerequisiteLessonIndexSelector(state),
      authUser: authUserSelector(state),
      commentsCount: commentsCountSelector(state),
      siteInfo: siteInfoSelector(state),
      app: appSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      goToBack: () => {
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      freeCourse: (courseId, pricingId) => {
         dispatch(freeCourseOperation(courseId, pricingId));
      },
      courseWebSession: courseId => {
         dispatch(courseWebSessionOperation(courseId));
      },
      getCourse: (courseName, preview, isMembership, isPlaylist, planId) => {
         return dispatch(operations.getCourseOperation(courseName, preview, isMembership, isPlaylist, planId));
      },
      getLesson: (courseName, lessonId, isPlaylist) => {
         return dispatch(operations.getLessonOperation(courseName, lessonId, isPlaylist));
      },
      setLessonComplete: (courseName, lessonId) => {
         dispatch(operations.setLessonCompleteOperation(courseName, lessonId));
      },
      setCourseComplete: (courseId) => {
         dispatch(operations.setCourseCompleteOperation(courseId));
      },
      setIsComplate: (bool) => {
         dispatch(setIsComplateCompleted(bool));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(StudentsRoomContainer);
