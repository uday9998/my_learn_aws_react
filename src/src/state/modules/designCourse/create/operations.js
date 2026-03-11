/* eslint-disable no-lonely-if */
import * as AuthApi from 'api/AuthApi';
import * as action from 'state/modules/designCourse/create/actions';
import * as editAction from 'state/modules/designCourse/edit/actions';
import { toast } from 'react-toastify';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import { getFileSizeInfoOperation } from 'state/modules/settings/operations';
import { ErrorPrinter } from 'utils/error';
import isPrint from '../edit/Error';

export const createSectionOperation = (title) => {
   return async (dispatch) => {
      dispatch(action.createSectionStart());
      try {
         const { data: { id } } = await AuthApi.createDefaultCourse();
         try {
            await AuthApi.createSection(id, { name: title });
         } catch (e) {
            e.id = id;
            throw e;
         }
         if (isPrint('The section has been saved successfully.')) {
            toast.success('The section has been saved successfully.');
         }
         dispatch(push(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id })));
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
         if (error.id) {
            await AuthApi.deleteCourse(error.id);
         }
      }
   };
};

export const getAutoResponderListsOperation = (integrationCode) => {
   return async (dispatch) => {
      const integerations = {
         MailChimp: 'mailchimp',
         ConvertKit: 'convertkit',
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

export const createCourseOperation = (params, currentTab) => {
   return async (dispatch) => {
      dispatch(action.createCourseStart());
      try {
         // eslint-disable-next-line camelcase
         const { data: { id, theme_id } } = await AuthApi.createDefaultCourse();
         try {
            if (currentTab !== 'site-changes') {
               await AuthApi.updateCourse(id, params);
            } else if (params.theme_name) {
               await AuthApi.updateTheme(id, theme_id, {
                  name: params.theme_name,
               });
               const newParams = params;
               delete newParams.theme_name;
               if (Object.keys(newParams).length > 0) {
                  const data = {
                     theme_id,
                     ...newParams,
                  };
                  await AuthApi.createThemeParts(data);
               }
            } else {
               const data = {
                  theme_id,
                  ...params,
               };
               await AuthApi.createThemeParts(data);
            }
         } catch (e) {
            e.id = id;
            throw e;
         }
         dispatch(action.createCourseComplete());
         dispatch(push(`${ Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id }) }#settings/${ currentTab }`));
         dispatch(getFileSizeInfoOperation());
         if (isPrint('Class has been created.')) {
            toast.success('Class has been created.');
         }
      } catch (error) {
         dispatch(action.createCourseFailed(error.response && error.response.data));
         let errorMessage;
         if (error.response && error.response.data && error.response.data.errors) {
            errorMessage = error.response.data.errors;
            if (error.response.status !== 401) {
               if (currentTab === 'course-details') {
                  if (errorMessage.name) {
                     if (isPrint(errorMessage.name[0])) {
                        toast.error(errorMessage.name[0]);
                     }
                  }
                  if (errorMessage.subtitle) {
                     if (isPrint(errorMessage.subtitle[0])) {
                        toast.error(errorMessage.subtitle[0]);
                     }
                  }

                  if (errorMessage.description) {
                     if (isPrint(errorMessage.description[0])) {
                        toast.error(errorMessage.description[0]);
                     }
                  }
                  if (errorMessage.url) {
                     if (isPrint(errorMessage.url[0])) {
                        toast.error(errorMessage.url[0]);
                     }
                  }
                  if (errorMessage.landing_url) {
                     if (isPrint(errorMessage.landing_url[0])) {
                        toast.error(errorMessage.landing_url[0]);
                     }
                  }
               }
               if (currentTab === 'instructor-details') {
                  if (errorMessage.author) {
                     if (isPrint(errorMessage.author[0])) {
                        toast.error(errorMessage.author[0]);
                     }
                  }
               }
               if (currentTab === 'site-changes') {
                  if (errorMessage.name) {
                     if (isPrint(errorMessage.name[0])) {
                        toast.error(errorMessage.name[0]);
                     }
                  }
               }
               if (currentTab === 'thank-you-page') {
                  if (errorMessage.thank_you_page_url) {
                     if (isPrint(errorMessage.thank_you_page_url[0])) {
                        toast.error(errorMessage.thank_you_page_url[0]);
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
         if (error.id) {
            await AuthApi.deleteCourse(error.id);
         }
      }
   };
};


export const createPlanOperation = (type) => {
   return async (dispatch) => {
      dispatch(action.createPlanStart());
      try {
         const { data: { id } } = await AuthApi.createDefaultCourse();
         await dispatch(editAction.addPlanInCreate(type));
         dispatch(push(`${ Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id }) }#plan`));
      } catch (error) {
         dispatch(action.createPlanFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
         if (error.id) {
            await AuthApi.deleteCourse(error.id);
         }
      }
   };
};


export const createSignUpOperation = (params, currentTab) => {
   return async (dispatch) => {
      dispatch(action.createSignUpStart());
      try {
         const { data: { id, offer_id: offerId, testimonial_id: testimonialId } } = await AuthApi.createDefaultCourse();
         if (currentTab === 'order-summary') {
            await AuthApi.createUpdateCheckout(id, params);
         } else if (currentTab === 'testimonials') {
            await AuthApi.updateTestimonial(id, testimonialId, params);
         } else if (currentTab === 'bullet-points') {
            await AuthApi.updateOffer(id, offerId, params);
         } else if (currentTab === 'buy-bottom') {
            await AuthApi.createUpdateCheckout(id, params);
         } else if (currentTab === 'advanced') {
            await AuthApi.connectAutoResponderToCourse(id, params);
         }
         dispatch(action.createSignUpComplete());
         dispatch(push(`${ Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id }) }#sign-up/${ currentTab }`));
         if (isPrint('Class has been created.')) {
            toast.success('Class has been created.');
         }
      } catch (error) {
         dispatch(action.createSignUpFailed(error.response && error.response.data));
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
               if (isPrint(error.response.data.error)) {
                  toast.error(error.response.data.error);
               }
            }
         } else {
            if (error.response.status !== 401) {
               if (isPrint('Something went wrong.')) {
                  toast.error('Something went wrong.');
               }
            }
         }
         if (error.id) {
            await AuthApi.deleteCourse(error.id);
         }
      }
   };
};
export const addTagOperation = (params) => {
   return async (dispatch) => {
      try {
         let tagId;
         if (params.operation === 'create') {
            const newTag = await AuthApi.addTag({ name: params.name });
            tagId = newTag.data.id;
         } else {
            tagId = params.id;
         }
         const { data: { id, checkout } } = await AuthApi.createDefaultCourse();
         await AuthApi.atachCourseTags(id, checkout.id, tagId);
         dispatch(action.createSignUpComplete());
         dispatch(push(`${ Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id }) }#sign-up/advanced`));
         if (isPrint('Class has been created.')) {
            toast.success('Class has been created.');
         }
      } catch (error) {
         dispatch(action.createSignUpFailed(error.response && error.response.data));
         if (error.response.status !== 401) {
            if (isPrint('failed to attach tag')) {
               toast.error('failed to attach tag');
            }
         }
         if (error.id) {
            await AuthApi.deleteCourse(error.id);
         }
      }
   };
};

export const getTagsOperation = () => {
   return async (dispatch) => {
      try {
         const { data } = await AuthApi.getTags();
         dispatch(action.setSignUpInput('tags', data, 'advanced'));
      } catch (error) {
         if (error.response.status !== 401) {
            if (isPrint('failed to get tags')) {
               toast.error('failed to get tags');
            }
         }
      }
   };
};

export const createProgramOperation = (data, callBack, onError = ErrorPrinter) => {
   return async (dispatch) => {
      dispatch(action.createProgramStart());
      try {
         if (data.type === '2') {
            const { data: res } = await AuthApi.createCommunity(data);
            if (isPrint('Program created successfully!')) {
               toast.success('Program created successfully!');
            }
            callBack(res.id, false, 1, res);
            dispatch(action.createProgramEnd());
            return;
         }

         const { data: res } = await AuthApi.createProgram(data, data.type === '1');
         if (isPrint('Program created successfully!')) {
            toast.success('Program created successfully!');
         }
         if (data.type === '1') {
            callBack(res.section.course_id, false, 1, res);
         } else {
            callBack(res.id, false, 1, res);
         }

         dispatch(action.createProgramEnd());
      } catch (error) {
         dispatch(action.createProgramEnd());
         const { data: res } = error.response;
         if (res.errors && res.errors.name && res.errors.name.length) {
            if (isPrint(res.errors.name[0])) {
               callBack(null, true, 1);
               toast.error(res.errors.name[0]);
            }
         } else if (error && error.response && error.response.data) {
            onError(error.response);
         } else {
            if (isPrint('Something went wrong.')) {
               callBack(null, true);
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const generateTitleDescOperation = (name, value) => {
   return async (dispatch) => {
      dispatch(action.generateTitleDescStart());
      try {
         const { data } = await AuthApi.generateTitleDesc(name, value);
         dispatch(action.generateTitleDescCompleted(data));
      } catch (error) {
         dispatch(action.generateTitleDescFailed());
         const { data: res } = error.response;
         if (res.errors && res.errors.name && res.errors.name.length) {
            if (isPrint(res.errors.name[0])) {
               toast.error(res.errors.name[0]);
            }
         } else {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};
