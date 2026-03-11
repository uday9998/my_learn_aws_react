/* eslint-disable max-len */
/* eslint-disable no-lonely-if */
import * as AuthApi from 'api/AuthApi';
import * as action from 'state/modules/designCourse/edit/actions';
import { toast } from 'react-toastify';
import { getFileSizeInfoOperation } from 'state/modules/settings/operations';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { ErrorPrinter } from 'utils/error';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import isPrint from './Error';

// import { totalSelector } from 'state/modules/transactions/selectors';

export const createSectionOperation = (courseId, title) => {
   return async (dispatch) => {
      dispatch(action.createSectionStart());
      try {
         const { data } = await AuthApi.createSection(courseId, { name: title });
         dispatch(action.createSectionComplete(data));
         if (isPrint('The section has been saved successfully.')) {
            toast.success('The section has been saved successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.createSectionFailed(error.response.data));
            if (error.response.data && error.response.data.errors) {
               const errorName = error.response.data.errors;
               if (errorName.name) {
                  if (error.response.status !== 401) {
                     if (isPrint(errorName.name[0])) {
                        toast.error(errorName.name[0]);
                     }
                  }
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const editSectionOperation = (courseId, sectionId, params) => {
   return async (dispatch) => {
      dispatch(action.editSectionStart());
      try {
         await AuthApi.updateSection(courseId, sectionId, params);
         dispatch(action.editSectionComplete(sectionId, params));
         if (isPrint('The section has been saved successfully.')) {
            if (isPrint('The section has been saved successfully.')) {
               toast.success('The section has been saved successfully.');
            }
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.editSectionFailed(error.response.data));
            if (error.response.data && error.response.data.errors) {
               const errorName = error.response.data.errors;
               if (errorName.name) {
                  if (error.response.status !== 401) {
                     if (isPrint(errorName.name[0])) {
                        toast.error(errorName.name[0]);
                     }
                  }
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const getCourseOperation = (id, searchValue) => {
   return async (dispatch) => {
      dispatch(action.getCourseStart());
      try {
         const { data } = await AuthApi.getCourse(id, searchValue);
         // const { data: plansData } = await AuthApi.getPlans(id);
         dispatch(action.getCourseComplete(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getCourseFailed(error.response.data));
         }
         if (error.response && error.response.status !== 401) {
            if (error.response && error.response.data && error.response.data) {
               if (isPrint(error.response.data)) {
                  toast.error(error.response.data);
               }
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const deleteSectionOperation = (courseId, sectionId) => {
   return async (dispatch) => {
      dispatch(action.deleteSectionStart());
      try {
         await AuthApi.deleteSection(courseId, sectionId);
         dispatch(action.deleteSectionComplete(sectionId));
         dispatch(getFileSizeInfoOperation());
         getCourseOperation(courseId)(dispatch);
         if (isPrint('The section has been deleted successfully')) {
            toast.success('The section has been deleted successfully');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteSectionFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getAutoResponderListsOperation = (integrationCode) => {
   return async (dispatch) => {
      const integerations = {
         MailChimp: 'mailchimp',
         ConvertKit: 'convertkit',
         AWeber: 'aweber',
         Drip: 'drip',
         ActiveCampaign: 'activecampaign',
      };
      try {
         const {
            data,
         } = await AuthApi.getIntegration(integerations[integrationCode]);
         dispatch(action.getAutoresponderListsCompleted(data[`${ integerations[integrationCode] }_lists`]));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const addTagOperation = (courseId, checkoutId, tagName) => {
   return async (dispatch) => {
      try {
         const { data } = await AuthApi.addTag({ name: tagName });
         await AuthApi.atachCourseTags(courseId, checkoutId, data.id);
         dispatch(action.addTag(data));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const atachTagOperation = (courseId, checkoutId, tagId) => {
   return async (dispatch) => {
      try {
         await AuthApi.atachCourseTags(courseId, checkoutId, tagId);
         dispatch(action.atachTag(tagId));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const detachTagOperation = (courseId, checkoutId, tagId) => {
   return async (dispatch) => {
      try {
         await AuthApi.detachCourseTags(courseId, checkoutId, tagId);
         dispatch(action.detachTag(tagId));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getCourseCheckoutOperation = (id) => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await AuthApi.getCourseAutoResponders(id);
         dispatch(action.setSignUpInput('autoresponders', data.autoresponders, 'advanced'));
         dispatch(action.setSignUpInput('checkoutId', data.course.checkout.id, 'advanced'));
         dispatch(action.setSignUpInput('autoResponder_type', data.course_autoresponder.autoresponder_type, 'advanced'));
         dispatch(action.setSignUpInput('autoResponder_list', data.course_autoresponder.list_id, 'advanced'));
         if (data.course_autoresponder.autoresponder_type) {
            dispatch(getAutoResponderListsOperation(data.course_autoresponder.autoresponder_type));
         }

         dispatch(action.setSignUpInput('tags', data.tags, 'advanced'));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
// export const updateCourseOperation = (id, params, currentTab, themeId) => {
//    if (document.querySelectorAll('.save-detalis')) {
//       for (let i = 0; i < document.querySelectorAll('.save-detalis').length; i++) {
//          document.querySelectorAll('.save-detalis')[i].setAttribute('disabled', 'disabled');
//       }
//    }
//    return async (dispatch) => {
//       dispatch(action.updateCourseStart());
//       try {
//          if (currentTab !== 'site-changes') {
//             if (params.is_custom_url === 0 || params.is_custom_url === false) {
//                // eslint-disable-next-line no-param-reassign
//                delete params.landing_custom_url;
//             }
//             await AuthApi.updateCourse(id, params);
//             if (document.querySelectorAll('.save-detalis')) {
//                for (let i = 0; i < document.querySelectorAll('.save-detalis').length; i++) {
//                   document.querySelectorAll('.save-detalis')[i].removeAttribute('disabled');
//                }
//             }
//             if (currentTab === 'course-details') {
//                dispatch(action.updateCourseComplete(params));
//             }
//          } else {
//             const theme = await AuthApi.updateTheme(id, themeId, {
//                name: params.theme_name,
//             });
//             if (document.querySelectorAll('.save-detalis')) {
//                for (let i = 0; i < document.querySelectorAll('.save-detalis').length; i++) {
//                   document.querySelectorAll('.save-detalis')[i].removeAttribute('disabled');
//                }
//             }
//             dispatch(action.updateCourseTheme(theme.data));
//             const newParams = { ...params };
//             if (newParams.rated_ids || newParams.is_rated_on) {
//                const courseUpdateParams = {};
//                courseUpdateParams.rated_ids = newParams.rated_ids || undefined;
//                courseUpdateParams.is_rated_on = typeof newParams.is_rated_on === 'boolean' ? newParams.is_rated_on : undefined;
//                await AuthApi.updateCourse(id, courseUpdateParams);
//                delete newParams.rated_ids;
//                delete newParams.is_rated_on;
//             }
//             delete newParams.theme_name;
//             if (Object.keys(newParams).length > 0) {
//                const data = {
//                   ...newParams,
//                };
//                await AuthApi.updateThemeParts(id, theme.data.id, data);
//             }
//          }
//          if (isPrint('The page has been successfully saved.')) {
//             toast.success('The page has been successfully saved.');
//          }
//       } catch (error) {
//          if (document.querySelectorAll('.save-detalis')) {
//             for (let i = 0; i < document.querySelectorAll('.save-detalis').length; i++) {
//                document.querySelectorAll('.save-detalis')[i].removeAttribute('disabled');
//             }
//          }
//          dispatch(action.updateCourseFailed(error.response && error.response.data));
//          let errorMessage;
//          if (error.response && error.response.data && error.response.data.errors) {
//             errorMessage = error.response.data.errors;
//             if (error.response.status !== 401) {
//                if (currentTab === 'course-details') {
//                   if (errorMessage.name) {
//                      if (isPrint(errorMessage.name[0])) {
//                         toast.error(errorMessage.name[0]);
//                      }
//                   }
//                   if (errorMessage.subtitle) {
//                      if (isPrint(errorMessage.subtitle[0])) {
//                         toast.error(errorMessage.subtitle[0]);
//                      }
//                   }
//                   if (errorMessage.description) {
//                      if (isPrint(errorMessage.description[0])) {
//                         toast.error(errorMessage.description[0]);
//                      }
//                   }
//                   if (errorMessage.url) {
//                      if (isPrint(errorMessage.url[0])) {
//                         toast.error(errorMessage.url[0]);
//                      }
//                   }
//                   if (errorMessage.landing_url) {
//                      if (isPrint(errorMessage.landing_url[0])) {
//                         toast.error(errorMessage.landing_url[0]);
//                      }
//                   }
//                   if (errorMessage.landing_custom_url) {
//                      if (isPrint(errorMessage.landing_custom_url[0])) {
//                         toast.error(errorMessage.landing_custom_url[0]);
//                      }
//                   }
//                }
//                if (currentTab === 'instructor-details') {
//                   if (errorMessage.author) {
//                      if (isPrint(errorMessage.author[0])) {
//                         toast.error(errorMessage.author[0]);
//                      }
//                   }
//                }

//                if (currentTab === 'site-changes') {
//                   if (errorMessage.name) {
//                      if (isPrint(errorMessage.name[0])) {
//                         toast.error(errorMessage.name[0]);
//                      }
//                   }
//                }
//                if (currentTab === 'thank-you-page') {
//                   if (errorMessage.thank_you_page_url) {
//                      if (isPrint(errorMessage.thank_you_page_url[0])) {
//                         toast.error(errorMessage.thank_you_page_url[0]);
//                      }
//                   }
//                }
//             }
//          } else {
//             if (error.response.status !== 401) {
//                if (isPrint('Something went wrong.')) {
//                   toast.error('Something went wrong.');
//                }
//             }
//          }
//       }
//    };
// };


export const getLessonOperation = (courseId, sectionId, lessonId) => {
   return async (dispatch) => {
      dispatch(action.getLessonStart());
      try {
         const { data } = await AuthApi.getLesson(courseId, sectionId, lessonId);
         dispatch(action.getLessonComplete(data));
      } catch (error) {
         if (error.response) {
            dispatch(action.getLessonFailed(error.response.data));
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const createLessonOperation = (courseId, sectionId, lessonFormat = 'text', publishedStatus, pathName) => {
   return async (dispatch) => {
      if (!sectionId) {
         toast.error('Please create a sections first.');
         return;
      }

      dispatch(action.createLessonStart());
      try {
         const { data } = await AuthApi.createLesson(courseId, sectionId, { lesson_format: lessonFormat }, publishedStatus);
         dispatch(action.createLessonComplete(data));
         dispatch(push(Router.route('ADMIN_LESSON_CREATE').getCompiledPath({
            id: courseId, sectionId, lessons: pathName || 'lessons', lessonId: data.id, 
         })));
      } catch (error) {
         dispatch(action.createLessonFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const saveLessonOperation = (courseId, sectionId, lessonId, params) => {
   return async (dispatch) => {
      dispatch(action.saveLessonStart());
      try {
         if (document.querySelector('.save-lesson')) {
            document.querySelector('.save-lesson').setAttribute('disabled', 'disabled');
         }
         const { data } = await AuthApi.saveLesson(courseId, sectionId, lessonId, params);
         dispatch(action.saveLessonComplete(data));
         dispatch(getFileSizeInfoOperation());
         if (document.querySelector('.save-lesson')) {
            document.querySelector('.save-lesson').removeAttribute('disabled');
         }
         if (isPrint('The lesson has been saved successfully.')) {
            toast.success('The lesson has been saved successfully.');
         }
      } catch (error) {
         if (document.querySelector('.save-lesson')) {
            document.querySelector('.save-lesson').removeAttribute('disabled');
         }
         if (error.response) {
            dispatch(action.saveLessonFailed(error.response.data));
            if (error.response.data && error.response.data.errors) {
               if (error.response.status !== 401) {
                  const errorName = error.response.data.errors;
                  if (errorName.text_title) {
                     if (isPrint(errorName.text_title[0])) {
                        toast.error(errorName.text_title[0]);
                     }
                  }
                  if (errorName.text_description) {
                     if (isPrint(errorName.text_description[0])) {
                        toast.error(errorName.text_description[0]);
                     }
                  }
                  if (errorName.audio_name) {
                     if (isPrint(errorName.audio_name[0])) {
                        toast.error(errorName.audio_name[0]);
                     }
                  }
                  if (errorName.audio_src) {
                     if (isPrint(errorName.audio_src[0])) {
                        toast.error(errorName.audio_src[0]);
                     }
                  }
                  if (errorName.image_name) {
                     if (isPrint(errorName.image_name[0])) {
                        toast.error(errorName.image_name[0]);
                     }
                  }
                  if (errorName.image_src) {
                     if (isPrint(errorName.image_src[0])) {
                        toast.error(errorName.image_src[0]);
                     }
                  }
                  if (errorName.pdf_name) {
                     if (isPrint(errorName.pdf_name[0])) {
                        toast.error(errorName.pdf_name[0]);
                     }
                  }
                  if (errorName.pdf_src) {
                     if (isPrint(errorName.pdf_src[0])) {
                        toast.error(errorName.pdf_src[0]);
                     }
                  }
                  if (errorName.ppt_name) {
                     if (isPrint(errorName.ppt_name[0])) {
                        toast.error(errorName.ppt_name[0]);
                     }
                  }
                  if (errorName.ppt_src) {
                     if (isPrint(errorName.ppt_src[0])) {
                        toast.error(errorName.ppt_src[0]);
                     }
                  }
                  if (errorName.video_name) {
                     if (isPrint(errorName.video_name[0])) {
                        toast.error(errorName.video_name[0]);
                     }
                  }
                  if (errorName.video_src) {
                     if (isPrint(errorName.video_src[0])) {
                        toast.error(errorName.video_src[0]);
                     }
                  }
                  if (errorName.video_embed) {
                     if (isPrint(errorName.video_embed[0])) {
                        toast.error(errorName.video_embed[0]);
                     }
                  }
                  if (errorName.video_src_type) {
                     if (isPrint(errorName.video_src_type[0])) {
                        toast.error(errorName.video_src_type[0]);
                     }
                  }
                  if (errorName.name) {
                     if (isPrint(errorName.name[0])) {
                        toast.error(errorName.name[0]);
                     }
                  }
                  if (errorName.src) {
                     if (isPrint(errorName.src[0])) {
                        toast.error(errorName.src[0]);
                     }
                  }
               }
            }
         } else {
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const saveLessonTitleOperation = (courseId, sectionId, lessonId, params, isExit, courseType) => {
   return async (dispatch) => {
      dispatch(action.saveLessonTitleStart());
      //  document.querySelector('.save-lesson').setAttribute('disabled', 'disabled');
      try {
         const { data } = await AuthApi.saveBlock(courseId, sectionId, lessonId, params);
         dispatch(action.saveLessonTitleComplete(data));
         // document.querySelector('.save-lesson').removeAttribute('disabled');
         if (isPrint(`The ${ courseType === '1' ? 'video' : 'lesson' } has been saved successfully.`)) {
            toast.success(`The ${ courseType === '1' ? 'video' : 'lesson' } has been saved successfully.`);
         }
         if (isExit) {
            dispatch(push(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: courseId })));
         }
      } catch (error) {
         // document.querySelector('.save-lesson').removeAttribute('disabled');
         if (error.response) {
            dispatch(action.saveLessonTitleFailed(error.response.data));
            if (error.response.data && error.response.data.error) {
               if (isPrint(error.response.data.error)) {
                  toast.error(error.response.data.error);
               }
            }
            if (error.response.data && error.response.data.errors) {
               if (error.response.status !== 401) {
                  const errorName = error.response.data.errors;
                  if (errorName.text_title) {
                     if (isPrint(errorName.text_title[0])) {
                        toast.error(errorName.text_title[0]);
                     }
                  }
                  if (errorName.audio_name) {
                     if (isPrint(errorName.audio_name[0])) {
                        toast.error(errorName.audio_name[0]);
                     }
                  }
                  if (errorName.image_name) {
                     if (isPrint(errorName.image_name[0])) {
                        toast.error(errorName.image_name[0]);
                     }
                  }
                  if (errorName.pdf_name) {
                     if (isPrint(errorName.pdf_name[0])) {
                        toast.error(errorName.pdf_name[0]);
                     }
                  }
                  if (errorName.ppt_name) {
                     if (isPrint(errorName.ppt_name[0])) {
                        toast.error(errorName.ppt_name[0]);
                     }
                  }
                  if (errorName.video_name) {
                     if (isPrint(errorName.video_name[0])) {
                        toast.error(errorName.video_name[0]);
                     }
                  }
                  if (errorName.name) {
                     if (isPrint(errorName.name[0])) {
                        toast.error(errorName.name[0]);
                     }
                  }
               }
            }
         } else {
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const updateVideoImageOperation = (videoId, imgSrc) => {
   return async () => {
      try {
         await AuthApi.updateVideoImage(videoId, imgSrc);
         if (imgSrc) {
            if (isPrint('Image has been saved successfully.')) {
               toast.success('Image has been saved successfully.');
            }
         } else {
            if (isPrint('Image has been deleted successfully.')) {
               toast.success('Image has been deleted successfully.');
            }
         }
      } catch (error) {
         if (error.response) {
            //    dispatch(action.updateVideoImageFailed(error.response.data));
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const saveLessonSettingsOperation = (courseId, sectionId, lessonId, params) => {
   if (document.querySelector('.save-settings')) {
      document.querySelector('.save-settings').setAttribute('disabled', 'disabled');
   }
   return async (dispatch) => {
      dispatch(action.saveLessonSettingsStart());
      try {
         const data = await AuthApi.saveLessonSettings(courseId, sectionId, lessonId, params);

         if (document.querySelector('.save-settings')) {
            document.querySelector('.save-settings').removeAttribute('disabled');
         }
         if (data.status === 200) {
            dispatch(action.saveLessonSettingsComplete(data.data && data.data.data && data.data.data[0]));
            if (isPrint('Settings has been saved successfully')) {
               toast.success('Settings has been saved successfully');
            }
         }
      } catch (error) {
         if (document.querySelector('.save-settings')) {
            document.querySelector('.save-settings').removeAttribute('disabled');
         }
         if (error.response) {
            dispatch(action.saveLessonSettingsFailed(error.response.data));
         }
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.data.errors.drip_days) {
               if (isPrint(error.response.data.errors.drip_days[0])) {
                  toast.error(error.response.data.errors.drip_days[0]);
               }
            }
         } else {
            if (error.response && error.response.status !== 401) {
               if (error.response && error.response.data && error.response.data.message) {
                  if (isPrint(error.response.data.message)) {
                     toast.error(error.response.data.message);
                  }
               } else if (error.response && error.response.data && error.response.data.error) {
                  if (isPrint(error.response.data.error)) {
                     toast.error(error.response.data.error);
                  }
               } else if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const saveLessonResourceOperation = (courseId, sectionId, lessonId, params) => {
   return async (dispatch) => {
      dispatch(action.saveLessonResourceStart());
      try {
         const { data } = await AuthApi.saveLesson(courseId, sectionId, lessonId, params);
         dispatch(action.saveLessonResourceComplete(data));
         if (isPrint('The file has been uploaded.')) {
            toast.success('The file has been uploaded.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.saveLessonResourceFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const deleteLessonResourceOperation = (courseId, sectionId, lessonId, resourceId) => {
   return async (dispatch) => {
      dispatch(action.deleteLessonResourceStart());
      try {
         const data = await AuthApi.deleteResource(courseId, sectionId, lessonId, resourceId);

         if (data.status === 202) {
            dispatch(action.deleteLessonResourceComplete(resourceId));
            if (isPrint('The file has been deleted.')) {
               toast.success('The file has been deleted.');
            }
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteLessonResourceFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const deleteLessonAllResourcesOperation = (courseId, sectionId, lessonId) => {
   return async (dispatch) => {
      dispatch(action.deleteLessonAllResourcesStart());
      try {
         const data = await AuthApi.deleteAllResources(courseId, sectionId, lessonId);
         if (data.status === 202) {
            dispatch(action.deleteLessonAllResourcesComplete());
            if (isPrint('The files has been deleted.')) {
               toast.success('The files has been deleted.');
            }
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteLessonAllResourcesFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const editResourceLessonOperation = (courseId, sectionId, lessonId, params) => {
   return async (dispatch) => {
      dispatch(action.editResourceLessonStart());
      try {
         const data = await AuthApi.editResourceLesson(courseId, sectionId, lessonId, params);
         if (data.status === 204) {
            dispatch(action.editResourceLessonComplete(params));
            if (isPrint('The resources has been saved successfully.')) {
               toast.success('The resources has been saved successfully.');
            }
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.editResourceLessonFailed(error.response.data));
            if (error.response.status !== 401) {
               if (isPrint('The name field is required.')) {
                  toast.error('The name field is required.');
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const createQuestionOperation = (courseId, sectionId, lessonId, params) => {
   document.querySelector('.save-quize').setAttribute('disabled', 'disabled');
   return async (dispatch) => {
      dispatch(action.createQuestionStart());
      try {
         const { data } = await AuthApi.createQuestion(courseId, sectionId, lessonId, params);
         document.querySelector('.save-quize').removeAttribute('disabled', 'disabled');
         dispatch(action.createQuestionComplete(data));
         if (isPrint('Question has been added successfully.')) {
            toast.success('Question has been added successfully.');
         }
      } catch (error) {
         document.querySelector('.save-quize').removeAttribute('disabled', 'disabled');
         if (error.response && error.response.data && error.response.data.errors) {
            dispatch(action.createQuestionFailed(error.response.data));
            if (error.response.data.errors.question) {
               if (error.response.status !== 401) {
                  if (isPrint(error.response.data.errors.question[0])) {
                     toast.error(error.response.data.errors.question[0]);
                  }
               }
            }
            if (error.response.data.errors['answer.0'] || error.response.data.errors['answer.1']) {
               if (error.response.status !== 401) {
                  if (isPrint('Question should have at least two answers.')) {
                     toast.error('Question should have at least two answers.');
                  }
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const updateQuestionOperation = (courseId, sectionId, lessonId, questionId, params) => {
   return async (dispatch) => {
      dispatch(action.updateQuestionStart());
      try {
         const { data } = await AuthApi.updateQuestion(courseId, sectionId, lessonId, questionId, params);
         dispatch(action.updateQuestionComplete(data));
         if (isPrint('Question has been saved successfully.')) {
            toast.success('Question has been saved successfully.');
         }
      } catch (error) {
         if (error.response && error.response.data && error.response.data.errors) {
            dispatch(action.updateQuestionFailed(error.response.data));
            if (error.response.data.errors.question) {
               if (error.response.status !== 401) {
                  if (isPrint(error.response.data.errors.question[0])) {
                     toast.error(error.response.data.errors.question[0]);
                  }
               }
            }
            if (error.response.data.errors['answer.0'] || error.response.data.errors['answer.1']) {
               if (error.response.status !== 401) {
                  if (isPrint('Question should have at least two answers.')) {
                     toast.error('Question should have at least two answers.');
                  }
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const deleteQuestionOperation = (courseId, sectionId, lessonId, questionId) => {
   return async (dispatch) => {
      dispatch(action.deleteQuestionStart());
      try {
         await AuthApi.deleteQuestion(courseId, sectionId, lessonId, questionId);
         dispatch(action.deleteQuestionComplete(questionId));
         if (isPrint('Question has been deleted successfully.')) {
            toast.success('Question has been deleted successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteQuestionFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const deleteLessonOperation = (courseId, sectionId, lessonId) => {
   return async (dispatch) => {
      dispatch(action.deleteLessonStart());
      try {
         await AuthApi.deleteLesson(courseId, sectionId, lessonId);
         dispatch(action.deleteLessonComplete(sectionId, lessonId));
         dispatch(getFileSizeInfoOperation());
         if (isPrint('The lesson has been successfully deleted.')) {
            toast.success('The lesson has been successfully deleted.');
         }

         dispatch(push(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: courseId })));
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteLessonFailed(error.response.data));
         }
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const createPlanOperation = (courseId, pricingType, data, selectedPricingAttachedCourses) => {
   document.querySelector('.save-plan').setAttribute('disabled', 'disabled');
   return async (dispatch) => {
      dispatch(action.createPlanStart());
      try {
         const newData = { ...data, pricing_type: pricingType };
         const { data: response } = await AuthApi.createPlan(courseId, newData);
         document.querySelector('.save-plan').removeAttribute('disabled');
         dispatch(action.createPlanComplete(response, selectedPricingAttachedCourses));
         dispatch(action.setPlanDrawerState(false));
         if (isPrint('Plan has been saved.')) {
            toast.success('Plan has been saved.');
         }
      } catch (error) {
         document.querySelector('.save-plan').removeAttribute('disabled');
         dispatch(action.createPlanFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors && error.response.data.errors) {
            if (error.response.status !== 401) {
               const errorName = error.response.data.errors;
               if (errorName.name) {
                  if (isPrint('Please add a plan name.')) {
                     toast.error('Please add a plan name.');
                  }
               }
               if (errorName.payment_method) {
                  if (isPrint(errorName.payment_method[0])) {
                     toast.error(errorName.payment_method[0]);
                  }
               }
               if (errorName.price) {
                  if (isPrint(errorName.price[0])) {
                     toast.error(errorName.price[0]);
                  }
               }
               if (errorName.payment_frequence) {
                  if (isPrint(errorName.payment_frequence[0])) {
                     toast.error(errorName.payment_frequence[0]);
                  }
               }
               if (errorName.number_of_payments) {
                  if (isPrint(errorName.number_of_payments[0])) {
                     toast.error(errorName.number_of_payments[0]);
                  }
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const updatePlanOperation = (courseId, pricingId, data, selectedPricingAttachedCourses) => {
   return async (dispatch) => {
      dispatch(action.updatePlanStart());
      try {
         await AuthApi.updatePlan(courseId, pricingId, data);
         dispatch(action.updatePlanComplete(pricingId, data, selectedPricingAttachedCourses));
         if (isPrint('Plan has been saved.')) {
            toast.success('Plan has been saved.');
         }
         dispatch(action.setPlanDrawerState(false));
      } catch (error) {
         dispatch(action.updatePlanFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors && error.response.data.errors) {
            if (error.response.status !== 401) {
               const errorName = error.response.data.errors;
               if (errorName.name) {
                  if (isPrint('Please add a plan name.')) {
                     toast.error('Please add a plan name.');
                  }
               }
               if (errorName.payment_method) {
                  if (isPrint(errorName.payment_method[0])) {
                     toast.error(errorName.payment_method[0]);
                  }
               }
               if (errorName.price) {
                  if (isPrint(errorName.price[0])) {
                     toast.error(errorName.price[0]);
                  }
               }
               if (errorName.payment_frequence) {
                  if (isPrint(errorName.payment_frequence[0])) {
                     toast.error(errorName.payment_frequence[0]);
                  }
               }
               if (errorName.number_of_payments) {
                  if (isPrint(errorName.number_of_payments[0])) {
                     toast.error(errorName.number_of_payments[0]);
                  }
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const deletePlanBundleCourseOperation = (courseId, pricingId, data, optionId) => {
   return async (dispatch) => {
      try {
         await AuthApi.updatePlan(courseId, pricingId, data);
         dispatch(action.removeFilterOption(pricingId, optionId));
         if (isPrint('Class has been deleted.')) {
            toast.success('Class has been deleted.');
         }
      } catch (error) {
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};

export const deletePlanOperation = (courseId, pricingId) => {
   return async (dispatch) => {
      dispatch(action.deletePlanStart());
      try {
         await AuthApi.deletePlan(courseId, pricingId);
         dispatch(action.deletePlanComplete(pricingId));
         if (isPrint('Plan has been deleted.')) {
            toast.success('Plan has been deleted.');
         }
      } catch (error) {
         dispatch(action.deletePlanFailed(error.response && error.response.data));
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};

export const createCouponOperation = (pricingId, data) => {
   return async (dispatch) => {
      dispatch(action.createCouponStart());
      try {
         const { data: couponData } = await AuthApi.createCoupon(pricingId, data);
         dispatch(action.createCouponComplete(pricingId, couponData));
         if (isPrint('Coupon has been created successfully.')) {
            toast.success('Coupon has been created successfully.');
         }
      } catch (error) {
         if (error && error.response && error.response.data) {
            dispatch(action.createCouponFailed(error.response.data));
            if (error.response.data.errors) {
               const errors = Object.values(error.response.data.errors);
               // eslint-disable-next-line no-restricted-syntax
               for (const e of errors) {
                  if (isPrint(e[0])) {
                     toast.error(e[0]);
                  }
               }
            } else {
               const key = Object.keys(error.response.data)[0];
               if (isPrint(error.response.data[key][0])) {
                  toast.error(error.response.data[key][0]);
               }
            }
         } else {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const deleteCouponOperation = (pricingId, couponId) => {
   return async (dispatch) => {
      dispatch(action.deleteCouponStart());
      try {
         await AuthApi.deleteCoupon(pricingId, couponId);
         dispatch(action.deleteCouponComplete(pricingId, couponId));
         if (isPrint('Done')) {
            toast.success('Done');
         }
      } catch (error) {
         dispatch(action.deleteCouponFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const updateSignUpOperation = (id = null, courseId, params, currentTab) => {
   return async (dispatch) => {
      dispatch(action.updateSignUpStart());
      try {
         let newData = params;
         if (currentTab === 'order-summary') {
            const { data } = await AuthApi.createUpdateCheckout(courseId, params);
            newData = data;
         } else if (currentTab === 'testimonials') {
            if (id === null) {
               const { data } = await AuthApi.createTestimonial(courseId, params);
               newData = data;
            } else {
               await AuthApi.updateTestimonial(courseId, id, params);
            }
         } else if (currentTab === 'bullet-points') {
            if (id === null) {
               const { data } = await AuthApi.createOffer(courseId, params);
               newData = data;
            } else {
               await AuthApi.updateOffer(courseId, id, params);
            }
         } else if (currentTab === 'buy-bottom') {
            const { data } = await AuthApi.createUpdateCheckout(courseId, params);
            newData = data;
         } else if (currentTab === 'advanced') {
            await AuthApi.connectAutoResponderToCourse(courseId, params);
         }

         dispatch(action.updateSignUpComplete(id, newData, currentTab));
         if (isPrint('Changes has been saved.')) {
            toast.success('Changes has been saved.');
         }
      } catch (error) {
         dispatch(action.updateSignUpFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors) {
            if (error.response.status !== 401) {
               const errorName = error.response.data.errors;
               if (currentTab === 'testimonials') {
                  if (errorName.author_name) {
                     if (isPrint(errorName.author_name[0])) {
                        toast.error(errorName.author_name[0]);
                     }
                  }
                  if (errorName.text) {
                     if (isPrint(errorName.text[0])) {
                        toast.error(errorName.text[0]);
                     }
                  }
               }
               if (currentTab === 'bullet-points') {
                  if (errorName.text) {
                     if (isPrint(errorName.text[0])) {
                        toast.error(errorName.text[0]);
                     }
                  }
               }
            }
         } else if (error.response.data.error) {
            if (error.response.status !== 401) {
               if (isPrint(error.response.data.error[0])) {
                  toast.error(error.response.data.error[0]);
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const deleteSignUpOperation = (id, courseId, currentTab) => {
   return async (dispatch) => {
      try {
         if (currentTab === 'testimonials') {
            await AuthApi.deleteTestimonial(courseId, id);
            if (isPrint('Testimonial has been deleted.')) {
               toast.success('Testimonial has been deleted.');
            }
         } else if (currentTab === 'bullet-points') {
            await AuthApi.deleteOffer(courseId, id);
            if (isPrint('Bullet point has been deleted.')) {
               toast.success('Bullet point has been deleted.');
            }
         }
         dispatch(action.deleteSignUpComplete(id, currentTab));
      } catch (error) {
         dispatch(action.deleteSignUpFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const LiveCourseOperation = (courseId, isPublished) => {
   return async (dispatch) => {
      dispatch(action.hideCourseStart());
      try {
         const {
            status,
         } = await AuthApi.hideCourse(courseId, isPublished);
         if (status === 204) {
            if (isPublished === 1) {
               if (isPrint('Class is not available for new users.')) {
                  toast.success('Class is not available for new users.');
               }
            } else {
               if (isPrint('Class is  available for new users.')) {
                  toast.success('Class is  available for new users.');
               }
            }

            dispatch(action.hideCourseCompleted(courseId));
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.hideCourseFailed(error.response.data));
            if (error.response.data.errorType !== 'integration') {
               if (error.response.status !== 401 && isPrint(error.response.data.error)) {
                  toast.error(error.response.data.error);
               }
            }
         }
      }
   };
};

export const toggleCommentShowOperation = (lessonId, commentStatus) => {
   return (dispatch) => {
      dispatch(action.toggleCommentShowStart());
      AuthApi.toggleCourseCommentShow(lessonId, commentStatus).then(() => {
         if (commentStatus === 0) {
            if (isPrint('Lesson comment is hidden.')) {
               toast.success('Lesson comment is hidden.');
            }
         } else if (commentStatus === 1) {
            if (isPrint('Lesson comment is visible.')) {
               toast.success('Lesson comment is visible.');
            }
         } else if (commentStatus === 2) {
            if (isPrint('Lesson comment is locked.')) {
               toast.success('Lesson comment is locked.');
            }
         }
         dispatch(action.toggleCommentShowCompleted(commentStatus));
      }).catch(error => {
         dispatch(action.toggleCommentShowFailed(error));
      });
   };
};


export const updateCourseLinkOperation = (courseId, inputs) => {
   return async (dispatch) => {
      dispatch(action.updateCourseLinkStart());
      try {
         const data = await AuthApi.updateCourse(courseId, inputs);
         if (data.status === 204) {
            if (isPrint('The class has been successfully saved.')) {
               toast.success('The class has been successfully saved.');
            }
            dispatch(action.updateCourseLinkCompleted(courseId, inputs));
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.updateCourseLinkFailed(error.response.data));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const lessonsReorderOperation = (courseId, sectionId, data, newLessons) => {
   return async (dispatch) => {
      // dispatch(action.lessonOrderChangeStart());
      try {
         await AuthApi.lessonsReorder(courseId, sectionId, data);
         dispatch(action.lessonOrderChangeCompleted(sectionId, newLessons));
         //  toast.success('Course has been reorder');
      } catch (error) {
         if (error.response) {
            dispatch(action.lessonOrderChangeFailed(error.response));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const sectionsReorderOperation = (courseId, data) => {
   return async (dispatch) => {
      try {
         await AuthApi.sectionsReorder(courseId, data);
      } catch (error) {
         if (error.response) {
            dispatch(action.sectionOrderChangeFailed(error.response));
         }
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const lessonsSettingsInput = (key, value, target) => {
   return async (dispatch) => {
      dispatch(action.setSettingsInputStart());
      try {
         setTimeout(() => {
            dispatch(action.setSettingsInput(key, value, target));
         }, 0);
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const addPlanOperation = (type) => {
   return async (dispatch) => {
      //  dispatch(action.setSettingsInputStart());
      try {
         const { data } = await AuthApi.getSettings('account');
         dispatch(action.addPlan(type, data));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const getPlanCoursesOperation = () => {
   return async (dispatch) => {
      try {
         const {
            data,
         } = await AuthApi.getAllSortingCourses();
         dispatch(action.setFilterOptions(data));
      } catch (error) {
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};


export const getLandingOperation = (courseId) => {
   return async (dispatch) => {
      try {
         const { data } = await AuthApi.getLanding(courseId);
         dispatch(action.getLandingComplate(data));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const updateLandingOperation = (courseId, data) => {
   return async () => {
      try {
         await AuthApi.updateLanding(courseId, data);
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
export const saveZoom = (courseId, sectionId, lessonId, params) => {
   return async (dispatch) => {
      dispatch(action.updateZoomStart());
      try {
         const { data } = await AuthApi.zoomSettingsSave(courseId, sectionId, lessonId, params);
         // await saveLessonTitleOperation(courseId, sectionId, lessonId, {
         //    ...lessonSaveParams,
         //    draft: false,
         // })(dispatch);
         if (data.message) {
            if (data.meeting.settings.recurrence && !data.meeting.settings.occurrences.length) {
               if (isPrint('No occurrence in your selected time.')) {
                  toast.error('No occurrence in your selected time.');
               }
            } else if (isPrint(data.message)) {
               toast.success(data.message);
            }
         }
         dispatch(action.updateZoomAfterSave(data.meeting));
      } catch (error) {
         if (error && error.response) {
            if (error.response.data && error.response.data.errors) {
               const errorText = error.response.data.errors[Object.keys(error.response.data.errors)[0]][0];
               if (isPrint(errorText)) {
                  toast.error(errorText);
               }
            } else if (error.response.data && error.response.data.message) {
               if (isPrint(error.response.data.message)) {
                  toast.error(error.response.data.message);
               }
            } else {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         } else if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
         dispatch(action.updateZoomFinish());
      }
   };
};


export const selectStatusSactionOperation = (courseId, sectionId, status, data) => {
   return async (dispatch) => {
      try {
         // dispatch(action.changesSectionStart());
         let params = {};
         if (status === 2 || status === '2') {
            if (data.time) {
               params.drip_type = 'custom';
               const time = moment(`${ data.time } ${ data.timeType }`, ['h:mm A']).format('HH:mm:ss');
               // params.drip_days = `${ moment(data.date).format('YYYY-MM-DD ') }${ time }`;
               const userTimeZone = momentTimezone.tz.guess();
               const dateUserTimeZone = momentTimezone.tz(`${ moment(data.date).format('YYYY-MM-DD ') }${ time }`, userTimeZone);
               const dateUTC = dateUserTimeZone.utc().format('YYYY-MM-DD HH:mm:ss'); // 2013-11-18T03:55Z
               params.drip_days = dateUTC;
            } else {
               params = {
                  drip_type: data.type,
                  drip_days: `${ data.count }`,
               };
            }
         }
         await AuthApi.changeSectionStatus(courseId, sectionId, {
            status: `${ status }`, ...params,
         });
         getCourseOperation(courseId)(dispatch);
         if (isPrint('Changes has been saved.')) {
            toast.success('Changes has been saved.');
         }
         //  dispatch(action.changesSectionCompleted());
      } catch (error) {
         // dispatch(action.changesSectionEnd());
         if (error.response && error.response.status !== 401) {
            if (error.response && error.response.data) {
               if (isPrint(error.response.data)) {
                  toast.error(error.response.data);
               }
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const getAllCoursesOperation = (value, isAll) => {
   return async (dispatch) => {
      try {
         const { data } = await AuthApi.getAllCoursesOptimized(value, isAll);
         dispatch(action.getAllCoursesCompleted(data));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const transferSectionOperation = (data, setSelectedSection) => {
   return async dispatch => {
      dispatch(action.transferSectionStart());
      try {
         await AuthApi.transferSection(data.currentCourseId, data.sectionId, data.courseId, data.isChecked);
         if (isPrint('Section has been transfered.')) {
            toast.success('Section has been transfered.');
         }
         dispatch(action.transferSectionFinished(data.isChecked, data.sectionId, setSelectedSection));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const copySectionOperation = (courseId, sectionId) => {
   return async dispatch => {
      dispatch(action.copySectionStart());
      try {
         await AuthApi.duplicationSection(courseId, sectionId);
         if (isPrint('Section has been duplicated.')) {
            toast.success('Section has been duplicated.');
         }
         getCourseOperation(courseId)(dispatch);
         dispatch(action.copySectionFinished());
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const filterSearchOperation = (id, search, lessonSearch) => {
   return async dispatch => {
      dispatch(action.searchFilterStart());
      try {
         const { data } = await AuthApi.getCourse(id, search, lessonSearch);
         dispatch(action.searchFilterEnd(data.sections));
      } catch (error) {
         if (error.response) {
            dispatch(action.getCourseFailed(error.response.data));
         }
         dispatch(action.searchFilterEnd([]));
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const updateCourseOperation = (id, params, data, authorId, changeTab, onError = ErrorPrinter) => {
   return async dispatch => {
      dispatch(action.updateCourseStart());
      try {
         await AuthApi.updateCourse(id, params);
         await AuthApi.updateAuthor(authorId, data);
         await AuthApi.attachAuthor(id, authorId);
         dispatch(action.updateCourseComplete(params, authorId, data));
         if (isPrint('The page has been successfully saved.')) {
            toast.success('The page has been successfully saved.');
         }
         changeTab();
      } catch (error) {
         dispatch(action.updateCourseFailed(error.response && error.response.data));
         if (error.response && error.response.data && error.response.data.errors) {
            onError(error.response);
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const deleteBlockOperation = (blockId, slug) => {
   return async (dispatch) => {
      dispatch(action.deleteBlockStart());
      try {
         if (blockId) {
            await AuthApi.deleteBlock(blockId);
         }

         dispatch(action.deleteBlockComplete(blockId, slug));
         if (isPrint('The block has been deleted successfully.')) {
            toast.success('The block has been deleted successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteBlockFailed(error.response.data));
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const duplicateBlockOperation = (courseId, sectionId, lessonId, blockId) => {
   return async (dispatch) => {
      dispatch(action.duplicateBlockStart());
      try {
         const { data } = await AuthApi.duplicateBlock(courseId, sectionId, lessonId, blockId);
         dispatch(action.duplicateBlockComplete(data));

         if (isPrint('The block has been duplicated successfully.')) {
            toast.success('The block has been duplicated successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.duplicateBlockFailed(error.response.data));
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const productSettingSave = (data, courseId, changeRoute) => {
   return async (dispatch) => {
      dispatch(action.productSettingsStart());
      try {
         await AuthApi.lessonsSettingsSave(courseId, data);
         if (isPrint('Changes saved successfully.')) {
            toast.success('Changes saved successfully');
         }
         dispatch(action.productSettingsCompleted());
         changeRoute();
      } catch ({ response }) {
         dispatch(action.productSettingsFailed());
         ErrorPrinter(response);
      }
   };
};

export const deleteQuizQuestionOperation = (quizId, questionId, blockId) => {
   return async (dispatch) => {
      dispatch(action.deleteQuizQuestionStart());
      try {
         await AuthApi.deleteQuizQuestion(quizId, questionId);
         dispatch(action.deleteQuizQuestionComplete(questionId, blockId));
         if (isPrint('The question has been deleted successfully.')) {
            toast.success('The question has been deleted successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteQuizQuestionFailed(error.response.data));
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const deleteQuizAnswerOperation = (blockId, quizId, questionId, answerId) => {
   return async (dispatch) => {
      dispatch(action.deleteQuizAnswerStart());
      try {
         await AuthApi.deleteQuizAnswer(quizId, answerId);
         dispatch(action.deleteQuizAnswerComplete(blockId, questionId, answerId));
         if (isPrint('The answer has been deleted successfully.')) {
            toast.success('The answer has been deleted successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.deleteQuizAnswerFailed(error.response.data));
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const chooseSavedTemplateOperation = (courseId, sectionId, lessonId, quizId, blockSlug, blockId, blockIndex) => {
   return async (dispatch) => {
      dispatch(action.chooseSavedTemplateStart());
      try {
         const { data } = await AuthApi.chooseSavedTemplate(courseId, sectionId, lessonId, quizId, blockSlug, blockId);
         dispatch(action.chooseSavedTemplateComplete(data, blockIndex));
         if (isPrint('The quiz has been added successfully.')) {
            toast.success('The quiz has been added successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.chooseSavedTemplateFailed(error.response.data));
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const addNewQuestionOperation = (courseId, sectionId, lessonId, blockId, quizId, question, blockIndex, questionIndex, blockSlug) => {
   return async (dispatch) => {
      dispatch(action.addNewQuestionStart());
      try {
         const { data } = await AuthApi.addNewQuestion(courseId, sectionId, lessonId, blockId, quizId, question, blockSlug);
         dispatch(action.addNewQuestionComplete(data, blockIndex, questionIndex, blockId));
         if (isPrint('The question has been added successfully.')) {
            toast.success('The question has been added successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.addNewQuestionFailed(error.response.data));
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};


export const addNewAnswerOperation = (courseId, sectionId, lessonId, questionId, answer, blockIndex, questionIndex) => {
   return async (dispatch) => {
      dispatch(action.addNewAnswerStart());
      try {
         const { data } = await AuthApi.addNewAnswer(courseId, sectionId, lessonId, questionId, answer);
         dispatch(action.addNewAnswerComplete(data, blockIndex, questionIndex));
         if (isPrint('The answer has been added successfully.')) {
            toast.success('The answer has been added successfully.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.addNewAnswerFailed(error.response.data));
            if (error.response && error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
      }
   };
};

export const LessonSelectAuthor = (author, lessonId) => {
   return async (dispatch) => {
      try {
         await AuthApi.attachAuthorToLesson({ authorId: author.id, lessonId });
         dispatch(action.lessonAuthorCompleted(author));
         if (isPrint('Author attached successfuly.')) {
            toast.success('Author attached successfuly.');
         }
      } catch (error) {
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const createBridgeOperation = (data) => {
   return async (dispatch) => {
      dispatch(action.createBridgeStart());
      try {
         await AuthApi.createBridge(data);
         dispatch(action.createBridgeComplete(data.inputs));
         if (isPrint('Bridge page saved successfuly.')) {
            toast.success('Bridge page saved successfuly.');
         }
      } catch (error) {
         if (error.response) {
            dispatch(action.createBridgeFailed(error.response.data));
         }
         if (error.response && error.response.status !== 401) {
            if (error.response && error.response.data && error.response.data) {
               if (isPrint(error.response.data)) {
                  toast.error(error.response.data);
               }
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};