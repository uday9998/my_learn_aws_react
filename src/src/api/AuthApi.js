/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import Auth from 'utils/Auth';
import { isLocalhost } from 'utils/Helpers';
import store from 'state/store';
import { push } from 'connected-react-router';
import { resetCommonDetails } from 'state/modules/common/actions';
import Router from 'routes/router';
import QueryParams from 'utils/QueryParams';
import { removeUnusedKeys } from 'utils/requestHelper';
import { filterQuery } from 'utils/filterQuery';
import { portalId } from 'utils/constants';
import { PinCommunityMIcon } from 'assets/iconsNew';

const CancelToken = axios.CancelToken;
let source = CancelToken.source();
let CurrentMethod = null;
const baseUrl = document
   .querySelector('meta[name="base_url"]')
   ?.getAttribute('content');
// Use window.location.origin as fallback if baseUrl is empty or undefined
// This ensures API calls work for any custom domain
export const apiUrl = (isLocalhost() || window.location.hostname === 'vahe21.miestro.loc')
   ? process.env.REACT_APP_API_LOCAL_ENDPOINT
   : (baseUrl || window.location.origin);
// const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : process.env.REACT_APP_API_LIVE_ENDPOINT;

// instance for auth requests
const client = axios.create();

client.interceptors.request.use(
   (config) => {
      CurrentMethod = config.method;
      const result = Object.assign({}, config);
      result.headers.Authorization = `Bearer ${ Auth.getToken() }`;
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

client.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      const errorObject = JSON.parse(JSON.stringify(error));
      
      if (error.response) {
         // Only report errors that aren't 401s to avoid CORS issues
         if (error.response.status !== 401) {
            axios.post(`${process.env.REACT_APP_MAIN_LOCAL_ENDPOINT}/send/errors`, {
               GLOBAL_ERROR: {
                  url: errorObject.config.url,
                  message: JSON.stringify(error.response.data).slice(0, 1250),
                  method: CurrentMethod,
               },
            });
         }
         
         if (error.response.status === 401) {
            // Handle unauthorized access
            Auth.logout();
            store.dispatch(resetCommonDetails());
            store.dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
         } else if (error.response.status === 403) {
            // Handle forbidden access
            store.dispatch(push(Router.route('ADMIN_SUSPENDED').getCompiledPath({ 
               suspended: error.response.data?.paused ? 'paused' : 'suspended' 
            })));
            const t = document.getElementById('toasts');
            if (window.timeout) clearTimeout(window.timeout);
            t.style.visibility = 'hidden';
            window.timeout = setTimeout(() => {
               t.style.visibility = null;
            }, 3000);
         }
      }
      
      throw error;
   }
);

export function initSiteDetails() {
   return client.get(`${ apiUrl }/api/v1/auth/init`);
}

export function getSettings(tabName, pageNum, count) {
   switch (tabName) {
      case 'emails':
         return client.get(`${ apiUrl }/api/v1/emails/settings`);
      case 'mainhub':
         return client.get(`${ apiUrl }/api/v1/settings/main-hub`);
      case 'account':
         return client.get(`${ apiUrl }/api/v1/settings/account`);
      case 'integrations':
         return client.get(`${ apiUrl }/api/v1/settings/integrations`);
      case 'videoanalytics':
         return client.get(
            `${ apiUrl }/api/v1/videos/analitics?page=${ pageNum }&count=${ count }`
         );
      default:
         return client.get(`${ apiUrl }/api/v1/metas`);
   }
}

export function getFromEmail() {
   return client.get(`${ apiUrl }/api/v1/emails/from-email`);
}

export function updateFromEmail(inputs) {
   return client.post(`${ apiUrl }/api/v1/emails/from-email`, inputs);
}
export function updateFromEmailDesign(inputs) {
   return client.post(`${ apiUrl }/api/v1/emails/email-designe`, inputs);
}

export function deleteAccountDomain() {
   return client.delete(`${ apiUrl }/api/v1/settings/domain`);
}

export function updateAccountDomain(inputs) {
   return client.put(`${ apiUrl }/api/v1/settings/domain`, inputs);
}

export function addIntegration(integration, data) {
   return client.post(
      `${ apiUrl }/api/v1/settings/integrations/${ integration }`,
      data
   );
}

export function addIntegrationPaypal(data) {
   return client.post(
      `${ apiUrl }/api/v1/settings/integrations/paypal/connect`,
      data
   );
}

export function getIntegration(integration) {
   return client.get(`${ apiUrl }/api/v1/settings/integrations/${ integration }`);
}

export function connectAutoResponderToCourse(id, data) {
   return client.post(`${ apiUrl }/api/v1/courses/${ id }/checkout`, data);
}

export function updateCheckoutCourse({ courseId, courseCheckout }) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/checkout`,
      courseCheckout
   );
}

export function createCheckoutOffer({ courseId, inputs }) {
   return client.post(`${ apiUrl }/api/v1/courses/${ courseId }/offers`, inputs);
}

export function updateCheckoutOffer({ courseId, inputs }) {
   return client.put(`${ apiUrl }/api/v1/courses/${ courseId }/offers`, {
      courseId,
      inputs,
   });
}

export function deleteCheckoutOffer({ courseId, bulletId }) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/offers/${ bulletId }`
   );
}

export function updateCheckoutTestimonial({ courseId, inputs }) {
   return client.put(`${ apiUrl }/api/v1/courses/${ courseId }/testimonials`, {
      courseId,
      inputs,
   });
}

export function createCheckoutTestimonial({ courseId, inputs }) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/testimonials`,
      inputs
   );
}

export function deleteCheckoutTestimonial({ courseId, testimonialId }) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/testimonials/${ testimonialId }`
   );
}

export function getCourseAutoResponders(id) {
   return client.get(`${ apiUrl }/api/v1/courses/${ id }/checkout`);
}

export function getAllCoursesOptimized(value, isAll) {
   if (isAll) {
      return client.get(`${ apiUrl }/api/v1/courses/all?${ value }`);
   }
   return client.get(`${ apiUrl }/api/v1/courses/all?is_published=1&${ value }`);
}

export function disconnectIntegration(integration) {
   return client.post(`${ apiUrl }/api/v1/settings/integrations/disconnect`, {
      service_name: integration,
   });
}

export function putSettings(inputs, formName) {
   switch (formName) {
      case 'emails':
         return client.put(`${ apiUrl }/api/v1/emails/settings`, inputs);
      case 'mainhub':
         return client.post(`${ apiUrl }/api/v1/settings/main-hub`, inputs);
      case 'account':
         return client.put(`${ apiUrl }/api/v1/settings/account`, inputs);
      default:
         return null;
   }
}

export function putAccountSettings(inputs) {
   return client.put(`${ apiUrl }/api/v1/settings/account`, inputs);
}

export function updateSettings(formName) {
   return (inputs) => {
      switch (formName) {
         case 'emails':
            return client.put(`${ apiUrl }/api/v1/emails/settings`, inputs);
         case 'mainhub':
            return client.post(`${ apiUrl }/api/v1/settings/main-hub`, inputs);
         case 'account':
            return client.put(`${ apiUrl }/api/v1/settings/account`, inputs);
         default:
            return null;
      }
   };
}

export function updateSettingsByGroup(group) {
   return (inputs) => {
      return client.post(`${ apiUrl }/api/v1/settings`, {
         ...inputs,
         settingsGroup: group,
      });
   };
}

export function getVideosByDate(date, pageNum, count) {
   return client.get(
      `${ apiUrl }/api/v1/videos/analitics?sortBy=date_added:${ date }&page=${ pageNum }&count=${ count }`
   );
}

export function getSingleVideo(id) {
   return client.get(`${ apiUrl }/api/v1/videos/${ id }`);
}

export function createCustomLink({ inputs }) {
   return client.post(
      `${ apiUrl }/api/v1/settings/main-hub/custom-links`,
      inputs
   );
}

export function updateCustomLink({ id, inputs }) {
   return client.put(
      `${ apiUrl }/api/v1/settings/main-hub/custom-links/${ id }`,
      inputs
   );
}

export function deleteCustomLink(id) {
   return client.delete(
      `${ apiUrl }/api/v1/settings/main-hub/custom-links/${ id }`
   );
}

export function getMetas() {
   return client.get(`${ apiUrl }/api/v1/metas`);
}

export function getGamifications() {
   return client.get(`${ apiUrl }/api/v1/promotions/gamification`);
}

export function createGamifications(inputs) {
   return client.post(`${ apiUrl }/api/v1/promotions/gamification`, inputs);
}

export function deleteGamifications(id) {
   return client.delete(`${ apiUrl }/api/v1/promotions/gamification/${ id }`);
}

export function updateGamifications(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/promotions/gamification/${ id }`, inputs);
}

export function getStripeConnectUrl() {
   return client.post(`${ apiUrl }/api/v1/settings/integrations/stripe`);
}

export function getMembers(params = null, sortBy) {
   if (params) {
      params.enrolled_in = JSON.stringify(params.enrolled_in);
      params.course_admin_of = JSON.stringify(params.course_admin_of);
      if (sortBy && (sortBy === '1' || sortBy === '0')) {
         params.name = sortBy;
      }
      const query = QueryParams.generateQuery(params);
      return client.get(
         `${ apiUrl }/api/v1/members?${ !params.name ? `sortBy=${ sortBy }&` : ''
         }${ query.join('&') }`
      );
   }
   return client.get(`${ apiUrl }/api/v1/members?count=1`);
}

export function getAllMembers() {
   return client.get(`${ apiUrl }/api/v1/members?count=all`);
}

export function getAllSortedMembers() {
   return client.get(`${ apiUrl }/api/v1/members/all`);
}

export function getCurrentMember(id) {
   return client.get(`${ apiUrl }/api/v1/members/${ id }`);
}

export function getFilteredClasses(id, sort) {
   return client.get(`${ apiUrl }/api/v1/members/${ id }?sort_by=${ sort }`);
}

export function getFilteredTransactions(id, courseId, from, to) {
   const query = QueryParams.generateQuery({ courseId, from, to });
   return client.get(
      `${ apiUrl }/api/v1/members/${ id }?from=${ from || '' }&to=${ to || ''
      }&course=${ courseId || '' }`
   );
}

export function getCurrentMemberTransactions(id) {
   return client.get(`${ apiUrl }/api/v1/members/${ id }/transactions`);
}

export function getCurrentMemberNotes(id) {
   return client.get(`${ apiUrl }/api/v1/members/${ id }/notes`);
}

export function getCurrentMemberCommunity(id, communityId) {
   return client.get(`${ apiUrl }/api/v1/members/${ id }/${ communityId }/info`);
}

export function putCurrentMember(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/members/${ id }`, inputs);
}

export function changeMemberPassword([id, inputs]) {
   return client.put(`${ apiUrl }/api/v1/members/${ id }`, inputs);
}

export function sendPassword([id]) {
   return client.post(`${ apiUrl }/api/v1/members/${ id }/send-password`);
}

export function createNote(id, inputs) {
   return client.post(`${ apiUrl }/api/v1/members/${ id }/notes`, inputs);
}

export function updateNote(id, userId, inputs) {
   return client.put(`${ apiUrl }/api/v1/members/${ userId }/notes/${ id }`, inputs);
}

export function deleteNote(userId, noteId) {
   return client.delete(`${ apiUrl }/api/v1/members/${ userId }/notes/${ noteId }`);
}

export function createCourse(inputs) {
   return client.post(`${ apiUrl }/api/v1/courses`, inputs);
}

export function updateCourse(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/courses/${ id }`, inputs);
}
export function updateCourses(data) {
   return client.put(`${ apiUrl }/api/v1/courses/${ data.id }`, data.inputs);
}
export function updateTheme(courseId, themeId, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/theme/${ themeId }`,
      inputs
   );
}

export function createThemeParts(inputs) {
   return client.post(`${ apiUrl }/api/v1/courses/theme-parts`, inputs);
}
export function updateThemeParts(courseId, themeId, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/theme/${ themeId }/parts`,
      inputs
   );
}

export function createDefaultCourse() {
   return client.get(`${ apiUrl }/api/v1/courses/create-default`);
}
export function deleteCourse(id) {
   return client.get(`${ apiUrl }/api/v1/courses/${ id }`);
}

export function getCourses(pageNum, params = {}) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   const queryParams = filterQuery({
      sort: params.sort,
      filter: params.filter,
      search: params.searchValue,
   });
   if (queryParams) {
      return client.get(
         `${ apiUrl }/api/v1/courses?page=${ pageNum }&count=${ 23 }&${ queryParams }`,
         { cancelToken: source.token }
      );
   }
   return client.get(`${ apiUrl }/api/v1/courses?page=${ pageNum }&count=${ 23 }`);
}

export function searchSchoolCourses(search, pageNum) {
   const params = { search };
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   const query = QueryParams.generateQuery(params);
   return client.get(
      `${ apiUrl }/api/v1/front/courses?${ query.join(
         '&'
      ) }&page=${ pageNum }&count=${ 23 }`,
      { cancelToken: source.token }
   );
}


export function getAllCoursesForEmails() {
   return client.get(`${ apiUrl }/api/v1/courses/all-emails`);
}

export function getEmailPreviewTemplate(id) {
   return client.get(`${ apiUrl }/api/v1/admin/emails/${ id }`);
}

export function getAllSortingCourses() {
   return client.get(`${ apiUrl }/api/v1/courses/all`);
}

export function getAllFrontCourses() {
   return client.get(`${ apiUrl }/api/v1/front/courses?count=all`);
}

export function getAllFrontLessons() {
   return client.get(`${ apiUrl }/api/v1/online-program/lessons`);
}

export function getAllSortedCourses(is_online) {
   return client.get(`${ apiUrl }/api/v1/courses/all?is_online=${ is_online }`);
}

export function getStudentCourses(pageNum, count, param = null) {
   if (param) {
      const query = QueryParams.generateQuery(param);
      return client.get(
         `${ apiUrl }/api/v1/front/courses?${ query.join(
            '&'
         ) }&page=${ pageNum }&count=${ count }`
      );
   }
   return client.get(
      `${ apiUrl }/api/v1/front/courses?page=${ pageNum }&count=${ count }`
   );
}

export function getStudentCoursesWithCancel(pageNum, count, param = null) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   if (param) {
      const query = QueryParams.generateQuery(param);
      return client.get(
         `${ apiUrl }/api/v1/front/courses?${ query.join(
            '&'
         ) }&page=${ pageNum }&count=${ count }`,
         { cancelToken: source.token }
      );
   }
   return client.get(
      `${ apiUrl }/api/v1/front/courses?page=${ pageNum }&count=${ count }`
   );
}

export function getStudentCategories(page, count) {
   return client.get(
      `${ apiUrl }/api/v1/front/categories?page=${ page }&count=${ count }`
   );
}

export function createSection(courseId, data) {
   return client.post(`${ apiUrl }/api/v1/courses/${ courseId }/sections`, data);
}

export function updateSection(courseId, sectionId, data) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }`,
      data
   );
}

export function deleteSection(courseId, sectionId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }`
   );
}

export function getLesson(courseId, sectionId, lessonId) {
   return client.get(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }`
   );
}
// Stex
export function createLesson(courseId, sectionId, lesson, publishedStatus) {
   let data = {
      name: lesson.lesson_format,
   };
   if (publishedStatus) {
      data = { ...data, ...publishedStatus };
   }
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons`,
      data
   );
}

export function createPlaylistLesson({ id, sectionId, body }) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ id }/sections/${ sectionId }/lessons`,
      {
         name: body.name,
         is_playlist: body.is_playlist,
         is_published: '2',
      }
   );
}

export function saveLesson(courseId, sectionId, lessonId, params) {
   const p = removeUnusedKeys(params, ['mime_type', 'original_name']);
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/files/${ params.type }`,
      p
   );
}

export function updateVideoImage(videoId, imgSrc) {
   return client.put(`${ apiUrl }/api/v1/videos/${ videoId }`, {
      picture_src: imgSrc,
   });
}

export function saveLessonTitle(courseId, sectionId, lessonId, params) {
   const p = removeUnusedKeys(params, ['mime_type', 'original_name']);
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }`,
      p
   );
}

export function saveLessonSettings(courseId, sectionId, lessonId, params) {
   const p = removeUnusedKeys(params, ['mime_type', 'original_name']);
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }`,
      p
   );
}

export function saveLessonSettingsVideo({
   courseId, sectionId, lessonId, params,
}) {
   const p = removeUnusedKeys(params, ['mime_type', 'original_name']);
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }`,
      p
   );
}

export function createQuestion(courseId, sectionId, lessonId, params) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/questions`,
      params
   );
}

export function updateQuestion(
   courseId,
   sectionId,
   lessonId,
   questionId,
   params
) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/questions/${ questionId }`,
      params
   );
}

export function deleteQuestion(courseId, sectionId, lessonId, questionId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/questions/${ questionId }`
   );
}

export function deleteLesson(courseId, sectionId, lessonId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }`
   );
}

export function deleteTrailer(courseId, sectionId, lessonId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/delete-trailer`
   );
}

export function deleteLessonVideo({ courseId, sectionId, lessonId }) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }`
   );
}

export function removeFileFromUploadcare(uuid) {
   return client.post(`${ apiUrl }/api/v1/courses/remove-file`, {
      file_uuid: uuid,
   });
}

export function getCourse(id, searchValue, lessonSearchValue) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   if (lessonSearchValue) {
      return client.get(`${ apiUrl }/api/v1/courses/${ id }?lesson_name=${ lessonSearchValue }`, { cancelToken: source.token });
   }
   return client.get(`${ apiUrl }/api/v1/courses/${ id }${ searchValue ? `?search=${ searchValue }` : '' }`, { cancelToken: source.token });
}
export function createPlan(courseId, inputs) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/course-pricing`,
      inputs
   );
}
export function updatePlan(courseId, pricingId, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/course-pricing/${ pricingId }`,
      inputs
   );
}
export function deletePlan(courseId, pricingId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/course-pricing/${ pricingId }`
   );
}
export function createCoupon(pricingId, inputs) {
   return client.post(
      `${ apiUrl }/api/v1/courses/course-pricings/${ pricingId }/coupons`,
      inputs
   );
}
export function deleteCoupon(pricingId, couponId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/course-pricings/${ pricingId }/coupons/${ couponId }`
   );
}
export function getPlans(courseId) {
   return client.get(`${ apiUrl }/api/v1/courses/${ courseId }/course-pricing`);
}
export function createOffer(courseId, inputs) {
   return client.post(`${ apiUrl }/api/v1/courses/${ courseId }/offers`, inputs);
}
export function updateOffer(courseId, offerId, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/offers/${ offerId }`,
      inputs
   );
}
export function deleteOffer(courseId, offerId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/offers/${ offerId }`
   );
}
export function createTestimonial(courseId, inputs) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/testimonials`,
      inputs
   );
}
export function updateTestimonial(courseId, testimonialId, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/testimonials/${ testimonialId }`,
      inputs
   );
}
export function deleteTestimonial(courseId, testimonialId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/testimonials/${ testimonialId }`
   );
}
export function getCoursesStatistics(param = {}) {
   const query = filterQuery(param);
   if (query) {
      return client.get(`${ apiUrl }/api/v1/reports/courses/get-sales?${ query }`);
   }
   return client.get(
      `${ apiUrl }/api/v1/reports/courses/get-sales?delimeter=week`
   );
}

export function runReportsJob([pageName, param = {}]) {
   const query = filterQuery(param);
   return client.get(`${ apiUrl }/api/v1/reports/jobs/${ pageName }${ query ? `?${ query }` : '?delimeter=day' }`);
}

export function getAllTimeSalesStatistics(courseId) {
   const query = courseId ? `?course_id=${ courseId }` : '';
   // return client.get(`${ apiUrl }/api/v1/reports/courses/all-time-sales-statistics${ query }`);
}

export function getRevenueForPieChartAndTable(param = null) {
   if (param) {
      const query = [];
      Object.keys(param).map(
         (key) => param[key] !== '' && query.push(`${ key }=${ param[key] }`)
      );
      //  return client.get(`${ apiUrl }/api/v1/reports/courses/top-courses-and-revenue-by-day?date_type=custom&${ query.join('&') }`);
   }
   //  return client.get(`${ apiUrl }/api/v1/reports/top-courses-and-revenue-by-day?date_type=custom`);
}

export function createUpdateCheckout(courseId, inputs) {
   return client.post(`${ apiUrl }/api/v1/courses/${ courseId }/checkout`, inputs);
}
export function sendTestEmail(body) {
   return client.post(`${ apiUrl }/api/v1/emails/send-test-email`, body);
}

export function sendEmail(body) {
   return client.post(`${ apiUrl }/api/v1/emails/send-email`, body);
}

export function getEmailTemplates() {
   return client.get(`${ apiUrl }/api/v1/emails/templates`);
}

export function getEmailTemplate(id) {
   return client.get(`${ apiUrl }/api/v1/emails/templates/courses/${ id }`);
}

export function updateEmailTemplate(inputs) {
   return client.post(`${ apiUrl }/api/v1/emails/templates`, inputs);
}

export function updateEmailNotifications(key, value) {
   return client.put(`${ apiUrl }/api/v1/metas/${ key }`, { value });
}

export function updateMeta({ key, value }) {
   return client.put(`${ apiUrl }/api/v1/metas/${ key }`, { value });
}

export function getAllUsersEmails() {
   return client.get(`${ apiUrl }/api/v1/emails/all`);
}

export function getAdminsEmails() {
   return client.get(`${ apiUrl }/api/v1/emails/admins`);
}

export function getTags() {
   return client.get(`${ apiUrl }/api/v1/members/tags`);
}

export function getTagEmails(id) {
   return client.get(`${ apiUrl }/api/v1/tags/${ id }/users`);
}

export function addTag(inputs) {
   return client.post(`${ apiUrl }/api/v1/members/tags`, inputs);
}

export function updateTag(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/members/tags/${ id }`, inputs);
}
export function removeTag(id) {
   return client.delete(`${ apiUrl }/api/v1/members/tags/${ id }`);
}
export function attachTagsToMember(memberId, tags) {
   return client.post(
      `${ apiUrl }/api/v1/members/tags/attach-detach/${ memberId }`,
      tags
   );
}

export function attachTagToMember(memberId, tag_id) {
   return client.post(`${ apiUrl }/api/v1/members/tags/${ tag_id }/${ memberId }`);
}

export function detachMemberTag(memberId, tag_id) {
   return client.delete(`${ apiUrl }/api/v1/members/tags/${ tag_id }/${ memberId }`);
}

export function addMember(inputs) {
   return client.post(`${ apiUrl }/api/v1/members`, inputs);
}

export function getStudentsRoomCourse(courseName, isMembership, isPlaylist) {
   if (isPlaylist) {
      return client.get(`${ apiUrl }/api/v1/front/courses/playlist/${ isPlaylist }`);
   }
   if (isMembership) {
      return client.get(`${ apiUrl }/api/v1/front/categories/membership/${ isMembership }/lessons`);
   }
   return client.get(`${ apiUrl }/api/v1/front/courses/${ courseName }`);
}

export function getPlanByName(planName) {
   return client.get(`${ apiUrl }/api/v1/front/plans/${ planName }`);
}

export function getCourseStatus(url) {
   return client.get(`${ apiUrl }/api/v1/front/courses/${ url }/check-status`);
}

export function joinFreeLessonCourse(url) {
   return client.post(
      `${ apiUrl }/api/v1/front/courses/${ url }/join-free-lesson-course`
   );
}

export function getStudentsRoomLesson(courseName, lessonId) {
   return client.get(
      `${ apiUrl }/api/v1/front/courses/${ courseName }/${ lessonId }`
   );
}

export function setStudentsRoomLessonComplete(courseName, lessonId) {
   return client.get(
      `${ apiUrl }/api/v1/front/courses/${ courseName }/${ lessonId }/complete`
   );
}

export function getPlanCards() {
   return client.get(`${ apiUrl }/api/v1/plans`);
}

export function connectToPlan(plan) {
   return client.post(`${ apiUrl }/api/v1/plans/checkout_url`, plan);
}

// export function cancelPlan() {
//    return client.get(`${ apiUrl }/api/v1/plans/cancel`);
// }
export function changePlan(planId) {
   return client.post(`${ apiUrl }/api/v1/plans/change`, { plan_id: planId });
}
// export function updateCard(data) {
//    return client.post(`${ apiUrl }/api/v1/plans/card`, data);
// }

export function getAccount(tabName) {
   switch (tabName) {
      case 'account':
         return client.get(`${ apiUrl }/api/v1/front/my-account/account`);
      case 'orders':
         return client.get(`${ apiUrl }/api/v1/front/my-account/orders`);
      case 'courses':
         return client.get(`${ apiUrl }/api/v1/front/my-account/courses`);
      default:
         return client.get(`${ apiUrl }/api/v1/front/my-account/account`);
   }
}

export function updateAccount([id, inputs]) {
   return client.put(`${ apiUrl }/api/v1/front/my-account/account/${ id }`, inputs);
}

export function resetAccountCourse(id) {
   return client.put(`${ apiUrl }/api/v1/front/my-account/courses/${ id }`);
}

export function pauseCurrentMemberCourse(memberId, courseId) {
   return client.get(
      `${ apiUrl }/api/v1/members/${ memberId }/courses/${ courseId }/pause`
   );
}

export function addCurrentMemberCourse(memberId, courseId) {
   return client.get(
      `${ apiUrl }/api/v1/members/${ memberId }/courses/${ courseId }/add`
   );
}

export function deleteCurrentMemberCourse(memberId, courseId) {
   return client.get(
      `${ apiUrl }/api/v1/members/${ memberId }/courses/${ courseId }/remove`
   );
}

export function getCourseCheckout(courseId) {
   return client.get(`${ apiUrl }/api/v1/front/courses/${ courseId }/checkout`);
}

export function atachCourseTags(courseId, checkoutId, tagId) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/checkout/${ checkoutId }/${ tagId }`
   );
}

export function detachCourseTags(courseId, checkoutId, tagId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/checkout/${ checkoutId }/${ tagId }`
   );
}

export function getRevenueStatistic(courseId = '') {
   return client.get(`${ apiUrl }/api/v1/reports/revenue/${ courseId }`);
}

export function getTransactions(param = {}) {
   const query = filterQuery(param);
   if (query) {
      // eslint-disable-next-line no-unused-expressions
      source && source.cancel();
      source = axios.CancelToken.source();
      return client.get(
         `${ apiUrl }/api/v1/reports/transactions?count=all&${ query }`,
         { cancelToken: source.token }
      );
   }
   return client.get(`${ apiUrl }/api/v1/reports/transactions?count=all`);
}
export function deleteMember(id) {
   return client.delete(`${ apiUrl }/api/v1/members/${ id }`);
}

// COURSE COMMENTS START
export function getCourseComments(courseName, param) {
   return client.get(
      `${ apiUrl }/api/v1/front/courses/${ courseName }/comments?${ param.join('&') }`
   );
}

export function createCourseComment(data) {
   return client.post(
      `${ apiUrl }/api/v1/front/courses/${ data.course_id }/comments`,
      data
   );
}

export function createCourseCommentMyAccount(data) {
   return client.post(
      `${ apiUrl }/api/v1/front/courses/${ data.course_id }/comments`,
      data
   );
}

export function getCourseNewComments(courseName, param) {
   return client.get(
      `${ apiUrl }/api/v1/front/courses/${ courseName }/comments?${ param.join('&') }`
   );
}

export function deleteCourseComment(courseName, id) {
   return client.delete(
      `${ apiUrl }/api/v1/front/courses/${ courseName }/comments/${ id }`
   );
}

export function deleteMultiCourseComment([courseName, ids]) {
   return client.post(
      `${ apiUrl }/api/v1/front/courses/${ courseName }/comments/multi-delete`, { comments_id: ids }
   );
}

export function toggleLikeCourseComment(courseName, id) {
   return client.post(
      `${ apiUrl }/api/v1/front/courses/${ courseName }/comments/${ id }/toggle-like`
   );
}

export function toggleLikeCourseCommentMyAccount([courseName, id]) {
   return client.post(
      `${ apiUrl }/api/v1/front/courses/${ courseName }/comments/${ id }/toggle-like`
   );
}

export function toggleCourseCommentShow(lessonId, commentStatus) {
   return client.post(
      `${ apiUrl }/api/v1/lessons/${ lessonId }/change-comments-status`,
      { comments_status: commentStatus }
   );
}
// COURSE COMMENTS END

export function hideCourse(
   courseId,
   isPublished,
   data
) {
   if (isPublished === 1) {
      return client.get(`${ apiUrl }/api/v1/courses/${ courseId }/hide`);
   }
   if (isPublished === 3) {
      return client.post(
         `${ apiUrl }/api/v1/courses/${ courseId }/drip`, data
      );
   }
   return client.get(`${ apiUrl }/api/v1/courses/${ courseId }/publish`);
}


export function duplicateCourse(courseId) {
   return client.get(`${ apiUrl }/api/v1/courses/${ courseId }/make-duplicate`);
}

export function deleteAdminCourse(id) {
   return client.delete(`${ apiUrl }/api/v1/courses/${ id }`);
}

export function deleteResource(courseId, sectionId, lessonId, resourceId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/files/resource/${ resourceId }`
   );
}

export function deleteAllResources(courseId, sectionId, lessonId) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/files/resource`
   );
}

export function editResourceLesson(courseId, sectionId, lessonId, params) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/files/resource/${ params.id }`,
      { title: params.title }
   );
}
export function getGhost() {
   return client.get(`${ apiUrl }/api/v1/reports/ghost`);
}

export function importMembers(data) {
   return client.post(`${ apiUrl }/api/v1/members/bulk-import/upload-csv`, data);
}
// export function createDefaultLanding(course_id, data) {
//    return client.post(`${ apiUrl }/api/v1/landing?course_id=${ course_id }&landing_id=13`, data);
// }

export function updateVatTaxingSettings(data) {
   return client.post(`${ apiUrl }/api/v1/settings/taxes/`, data);
}

export function getVatTaxingSettings() {
   return client.get(`${ apiUrl }/api/v1/settings/taxes/`);
}

export function exportMembers(params = null) {
   if (params) {
      const query = QueryParams.generateQuery(params);
      return client.get(
         `${ apiUrl }/api/v1/members/export-to-csv?${ query.join('&') }`
      );
   }
   return client.get(`${ apiUrl }/api/v1/members/export-to-csv`);
}

export function lessonsReorder(courseId, sectionId, data) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/reorder`,
      { lesson_ids: data }
   );
}

export function sectionsReorder(courseId, data) {
   return client.post(`${ apiUrl }/api/v1/courses/${ courseId }/sections/reorder`, {
      sections: data,
   });
}

export function customLinksReorder(data) {
   return client.post(
      `${ apiUrl }/api/v1/settings/main-hub/custom-links/reorder`,
      { orders: data }
   );
}

export function getEmailStatuses(params = null) {
   return client.get(`${ apiUrl }/api/v1/emails/logs?count=20${ params || '' }`);
}

export function deleteEmailStatus(id) {
   return client.delete(`${ apiUrl }/api/v1/emails/logs/${ id }`);
}

export function multiDeleteEmailStatus(ids) {
   return client.post(`${ apiUrl }/api/v1/emails/logs/multi/destroy`, { ids });
}

export function duplicateEmail(id) {
   return client.post(`${ apiUrl }/api/v1/emails/logs/${ id }`);
}

export function editEmailStatus(id) {
   return client.get(`${ apiUrl }/api/v1/emails/logs/${ id }`);
}
export function getDefaultCourseNames() {
   return client.get(`${ apiUrl }/api/v1/courses/get-default-names`);
}
export function chooseDefaultCoursecCurse(data) {
   return client.post(`${ apiUrl }/api/v1/courses/choose-default-course`, data);
}
export function chooseDefaultCourseName(data) {
   return client.post(`${ apiUrl }/api/v1/courses/create-default`, data);
}
export function getSteps() {
   return client.get(`${ apiUrl }/api/v1/site-builder/steps`);
}

export function courseWebSession(courseId) {
   return client.post(`${ apiUrl }/api/v1/front/courses/${ courseId }/web-session`);
}
export function getVideosLibraryData(params) {
   if (params) {
      // eslint-disable-next-line no-unused-expressions
      source && source.cancel();
      source = axios.CancelToken.source();
      const query = QueryParams.generateQuery(params);
      return client.get(`${ apiUrl }/api/v1/videos?${ query.join('&') }`, {
         cancelToken: source.token,
      });
   }
   return client.get(`${ apiUrl }/api/v1/videos?count=20`);
}

export function getMediaLibraryData(params) {
   const { count = 20 } = params;
   const query = QueryParams.generateQuery({ count, ...params });
   return client.get(`${ apiUrl }/api/v1/medialibrary?${ query.join('&') }`);
}
export function updateMediaName(params) {
   return client.put(`${ apiUrl }/api/v1/medialibrary`, { ...params });
}

export function createMedia(params) {
   return client.post(`${ apiUrl }/api/v1/medialibrary`, { ...params });
}

export function deleteMedia(params) {
   return client.delete(`${ apiUrl }/api/v1/medialibrary`, {
      data: { ...params },
   });
}

export function getCertificatesData(params) {
   if (params.searchValue) {
      const query = QueryParams.generateQuery({ search: params.searchValue });
      return client.get(
         `${ apiUrl }/api/v1/certificates?sortBy=${ params.sortName }:${ params.sortValue
         }&${ query.join('&') }`
      );
   }
   if (params.sortName === 'recently') {
      return client.get(
         `${ apiUrl }/api/v1/certificates?sortBy=${ params.sortName }`
      );
   }
   if (params.sortName === 'published' || params.sortName === 'draft') {
      return client.get(
         `${ apiUrl }/api/v1/certificates?published=${ params.sortName === 'published' ? 1 : 0
         }`
      );
   }
   return client.get(
      `${ apiUrl }/api/v1/certificates?sortBy=${ params.sortName }:${ params.sortName === 'oldest' ? 'desc' : 'asc'
      }`
   );
}

export function getCertificatesByIdData(id) {
   return client.get(`${ apiUrl }/api/v1/certificates/${ id }`);
}

export function createCertificate(params) {
   return client.post(`${ apiUrl }/api/v1/certificates`, { ...params });
}

export function updateCertificate(id, params) {
   return client.put(`${ apiUrl }/api/v1/certificates/${ id }`, { ...params });
}

export function publishDraftCertificate(id, type) {
   return client.get(`${ apiUrl }/api/v1/certificates/${ id }/publish-draft/${ type }`);
}

export function updateCertificateSettings([id, settings]) {
   return client.put(`${ apiUrl }/api/v1/certificates/${ id }`, { ...settings });
}

export function multiDuplicateCertificate(ids) {
   return client.post(`${ apiUrl }/api/v1/certificates/multi/duplicate`, { certificates_id: ids });
}

export function deleteCertificate(id) {
   return client.delete(`${ apiUrl }/api/v1/certificates/${ id }`);
}

export function duplicateCertificate(id) {
   return client.post(`${ apiUrl }/api/v1/certificates/${ id }/duplicate`);
}

export function getCoursesForNewCertificate() {
   return client.get(
      `${ apiUrl }/api/v1/certificates/get-courses-for-certificates`
   );
}

export function getStudentCertificatesData() {
   return client.get(`${ apiUrl }/api/v1/front/my-account/certificates`);
}

export function deleteVideo(id) {
   return client.delete(`${ apiUrl }/api/v1/videos/${ id }`);
}

export function setCourseComplete(id) {
   return client.post(`${ apiUrl }/api/v1/front/courses/${ id }/finished`);
}

export function getAutoEmails() {
   return client.get(`${ apiUrl }/api/v1/auto-emails`);
}

export function updateAutoEmailTemplate(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/auto-emails/${ id }`, inputs);
}

export function revertAutoEmailTemplate(id) {
   return client.post(`${ apiUrl }/api/v1/auto-emails/${ id }/revert`);
}

export function updateLanding(courseId, data) {
   return client.post(
      `${ apiUrl }/api/v1/landing/update?course_id=${ courseId }&landing_id=13`,
      data
   );
}

export function getLanding(courseId) {
   return client.post(
      `${ apiUrl }/api/v1/landing?course_id=${ courseId }&landing_id=13`
   );
}

export function freeCourse(courseId, pricingId) {
   return client.get(
      `${ apiUrl }/api/v1/front/courses/${ courseId }/pricing/${ pricingId }/enroll`
   );
}

export function freeCourseCommuntiy({ courseId, pricingId }) {
   return client.get(
      `${ apiUrl }/api/v1/front/courses/${ courseId }/pricing/${ pricingId }/enroll`
   );
}

export function addNoCompletedView(videoId) {
   return client.post(`${ apiUrl }/api/v1/videos/${ videoId }/no-completed`);
}

export function addCompletedView(videoId) {
   return client.post(`${ apiUrl }/api/v1/videos/${ videoId }/completed`);
}

export function getUploadsSize() {
   return client.get(`${ apiUrl }/api/v1/videos/get-statuses`);
}

export function getCategories(search) {
   return client.get(
      `${ apiUrl }/api/v1/category?${ search ? `search=${ search }` : '' }`
   );
}

export function addCategory(inputs) {
   return client.post(`${ apiUrl }/api/v1/category`, inputs);
}

export function attachCategories(courseId, inputs) {
   return client.post(`${ apiUrl }/api/v1/category/${ courseId }/attach`, inputs);
}

export function attachCoursesCategory(categoryId, coursesIds) {
   return client.post(`${ apiUrl }/api/v1/category/${ categoryId }/attach-courses`, {
      course_ids: coursesIds,
   });
}

export function detachCoursesCategory(categoryId, coursesIds) {
   return client.post(`${ apiUrl }/api/v1/category/${ categoryId }/detach-courses`, {
      course_id: coursesIds[0],
   });
}

export function updateCategory(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/category/${ id }`, inputs);
}

export function removeCategory(id) {
   return client.delete(`${ apiUrl }/api/v1/category/${ id }`);
}

export function reorderCategories(inputs) {
   return client.post(`${ apiUrl }/api/v1/category/reorder`, inputs);
}

export function getDettachedCategoryCourses(id) {
   return client.get(`${ apiUrl }/api/v1/category/${ id }/courses`);
}

export function reorderCategoriesCourses(inputs) {
   return client.post(`${ apiUrl }/api/v1/category/reorder-courses`, inputs);
}

// lesson category start

export function getLessonCategories(search) {
   return client.get(
      `${ apiUrl }/api/v1/online-program/category?${ search ? `search=${ search }` : '' }`
   );
}

export function addVideoCategory(inputs) {
   return client.post(`${ apiUrl }/api/v1/online-program/category`, { name: inputs.name, lesson_ids: inputs.course_ids });
}

export function reorderVideoCategories(inputs) {
   return client.post(`${ apiUrl }/api/v1/online-program/category/reorder`, inputs);
}

export function attachVideoCategories(courseId, inputs) {
   return client.post(`${ apiUrl }/api/v1/online-program/category/${ courseId }/attach`, inputs);
}

export function attachVideoLessonsCategory(categoryId, coursesIds) {
   return client.post(`${ apiUrl }/api/v1/online-program/category/${ categoryId }/attach-lessons`, {
      lesson_ids: coursesIds,
   });
}

export function detachVideoLessonsCategory(categoryId, coursesIds) {
   return client.post(`${ apiUrl }/api/v1/online-program/category/${ categoryId }/detach-lessons`, {
      lesson_id: coursesIds[0],
   });
}

export function updateVideoCategory(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/online-program/category/${ id }`, inputs);
}

export function removeVideoCategory(id) {
   return client.delete(`${ apiUrl }/api/v1/online-program/category/${ id }`);
}

export function getDettachedCategoryLessons(id) {
   return client.get(`${ apiUrl }/api/v1/online-program/category/${ id }/lessons`);
}

export function reorderCategoriesLessons(inputs) {
   return client.post(`${ apiUrl }/api/v1/online-program/category/reorder-lessons`, inputs);
}

// end


export function getPaykickCustomer(email) {
   return client.post(`${ apiUrl }/api/v1/auth/get-paykick-customer`, {
      email,
   });
}


// COURSE AUTHORS
export function getAuthors(params = null) {
   if (params) {
      const query = QueryParams.generateQuery(params);
      return client.get(`${ apiUrl }/api/v1/authors?${ query.join('&') }`);
   }
   return client.get(`${ apiUrl }/api/v1/authors?count=30`);
}

export function createAuthor(data) {
   return client.post(`${ apiUrl }/api/v1/authors`, data);
}

export function attachAuthor(courseId, authorId) {
   return client.post(
      `${ apiUrl }/api/v1/authors/${ authorId }/course/${ courseId }`
   );
}

export function updateAuthor(authorId, data) {
   return client.put(`${ apiUrl }/api/v1/authors/${ authorId }`, data);
}

export function updatePlaylistAuthor({ id, params }) {
   return client.put(`${ apiUrl }/api/v1/authors/${ id }`, params);
}

export function deleteAuthor(id) {
   return client.delete(`${ apiUrl }/api/v1/authors/${ id }`);
}

export function reactivateSub(id) {
   return client.post(`${ apiUrl }/api/v1/plans/${ id }`);
}

export function getSites() {
   return client.get(`${ apiUrl }/api/v1/sites?count=all`);
}

export function addSite(inputs) {
   return client.post(`${ apiUrl }/api/v1/sites`, inputs);
}

export function updateSite(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/sites/${ id }`, inputs);
}

export function deleteSite(id) {
   return client.delete(`${ apiUrl }/api/v1/sites/${ id }`);
}

export function loginSite(id) {
   return client.post(`${ apiUrl }/api/v1/sites/${ id }/login`);
}

export function getBlog(params) {
   if (params) {
      const query = QueryParams.generateQuery({ search: params.searchValue });
      if (query.join('&')) {
         return client.get(
            `${ apiUrl }/api/v1/blog?count=all&type=${ params.sortName
            }&${ query.join('&') }`
         );
      }
      return client.get(
         `${ apiUrl }/api/v1/blog?count=all&type=${ params.sortName }`
      );
   }
   return client.get(`${ apiUrl }/api/v1/blog?count=all`);
}

export function deleteBlog(id) {
   return client.delete(`${ apiUrl }/api/v1/blog/${ id }`);
}

export function deleteMultipleBlog(ids) {
   return client.post(`${ apiUrl }/api/v1/blog/destroyMultiple`, {
      blog_ids: ids.join(),
   });
}

export function saveBlogSettings(params) {
   return client.post(`${ apiUrl }/api/v1/metas/bulk-update`, params);
}

export function updateBulkMetas(params) {
   const formatedParams = Object.keys(params).map((param) => ({
      key: param,
      value: params[param] || '',
   }));
   return client.post(`${ apiUrl }/api/v1/metas/bulk-update`, formatedParams);
}

export function getSettingsByGroup(group) {
   return client.get(`${ apiUrl }/api/v1/settings?group=${ group }`);
}

export function getBlogSettings() {
   return client.get(`${ apiUrl }/api/v1/blog/get-metas`);
}

export function createDefaultBlog() {
   return client.post(`${ apiUrl }/api/v1/blog`);
}

export function getBlogPost(id) {
   return client.get(`${ apiUrl }/api/v1/blog/${ id }`);
}

export function saveBlogPost(id, post) {
   return client.put(`${ apiUrl }/api/v1/blog/${ id }`, post);
}

export function getBlogCategories() {
   return client.get(`${ apiUrl }/api/v1/blog/category?count=all`);
}

export function addBlogCategory(inputs) {
   return client.post(`${ apiUrl }/api/v1/blog/category`, inputs);
}

export function updateBlogCategory(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/blog/category/${ id }`, inputs);
}

export function deleteBlogCategory(id) {
   return client.delete(`${ apiUrl }/api/v1/blog/category/${ id }`);
}

export function attachBlogCategories(blogId, inputs) {
   return client.post(
      `${ apiUrl }/api/v1/blog/category/${ blogId }/attach`,
      inputs
   );
}

export function getFrontBlogPost(id) {
   return client.get(`${ apiUrl }/api/v1/front/blogs/${ id }`);
}

export function getFrontBlog(params = [], search = {}) {
   if (params && !!params.length) {
      const query = QueryParams.generateQuery(params[0]);
      if (search.searchValue) {
         return client.get(
            `${ apiUrl }/api/v1/front/blogs?count=all&${ query.join('&') }&search=${ search.searchValue }`
         );
      }
      return client.get(
         `${ apiUrl }/api/v1/front/blogs?count=all&${ query.join('&') }`
      );
   }
   if (search.searchValue) {
      return client.get(
         `${ apiUrl }/api/v1/front/blogs?count=all&search=${ search.searchValue }`
      );
   }
   return client.get(`${ apiUrl }/api/v1/front/blogs?count=all`);
}

export function getFrontBlogCount() {
   return client.get(`${ apiUrl }/api/v1/front/blogs?count=1`);
}

export function getFrontBlogSettings() {
   return client.get(`${ apiUrl }/api/v1/front/blogs/settings`);
}

export function getFrontBlogCategories() {
   return client.get(`${ apiUrl }/api/v1/front/blogs/categories?count=all`);
}

export function getAutomations(params = null) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   if (params) {
      const query = QueryParams.generateQuery(params);
      return client.get(`${ apiUrl }/api/v1/automations?${ query.join('&') }`, {
         cancelToken: source.token,
      });
   }
   return client.get(`${ apiUrl }/api/v1/automations`, {
      cancelToken: source.token,
   });
}

export function createDefaultAutomation(name) {
   return client.post(`${ apiUrl }/api/v1/automations`, { name, status: 0 });
}

export function getAutomation(id) {
   return client.get(`${ apiUrl }/api/v1/automations/${ id }`);
}

export function updateAutomation(id, inputs) {
   return client.put(`${ apiUrl }/api/v1/automations/${ id }`, inputs);
}

export function deleteAutomation(id) {
   return client.delete(`${ apiUrl }/api/v1/automations/${ id }`);
}

export function addTrigger(id, inputs) {
   return client.post(`${ apiUrl }/api/v1/automations/${ id }/triggers`, inputs);
}

export function saveTrigger(id, inputs) {
   return client.post(`${ apiUrl }/api/v1/automations/${ id }/triggers`, inputs);
}

export function addAction(id, inputs) {
   return client.post(`${ apiUrl }/api/v1/automations/${ id }/actions`, inputs);
}

export function reorderAction(id, ids) {
   return client.post(`${ apiUrl }/api/v1/automations/${ id }/actions/reorder`, {
      ids,
   });
}

export function saveAction(id, inputs) {
   return client.post(`${ apiUrl }/api/v1/automations/${ id }/actions`, inputs);
}

// eslint-disable-next-line camelcase
export function deleteAction(id, action_id) {
   // eslint-disable-next-line camelcase
   return client.delete(
      `${ apiUrl }/api/v1/automations/${ id }/actions/${ action_id }`
   );
}

// eslint-disable-next-line camelcase
export function deleteTrigger(id, trigger_id) {
   // eslint-disable-next-line camelcase
   return client.delete(
      `${ apiUrl }/api/v1/automations/${ id }/triggers/${ trigger_id }`
   );
}

export function getWebHooksData() {
   return client.get(`${ apiUrl }/api/v1/webhooks`);
}

export function getWebHookById(id) {
   return client.get(`${ apiUrl }/api/v1/webhooks/${ id }`);
}

export function createWebHook(params) {
   return client.post(`${ apiUrl }/api/v1/webhooks`, { ...params });
}

export function deleteWebHook(id) {
   return client.delete(`${ apiUrl }/api/v1/webhooks/${ id }`);
}

export function updateWebHook(id, params) {
   return client.put(`${ apiUrl }/api/v1/webhooks/${ id }`, { ...params });
}

export function getWebHookLogs(id) {
   return client.get(`${ apiUrl }/api/v1/webhooks/${ id }/logs`);
}

export function getApiKey() {
   return client.get(`${ apiUrl }/api/v1/settings/external-api`);
}

export function createApiKey() {
   return client.post(`${ apiUrl }/api/v1/settings/external-api`);
}

export function cancelSubscription(subId) {
   return client.post(
      `${ apiUrl }/api/v1/front/my-account/orders/cancel/${ subId }`
   );
}

export function getAllCoupons() {
   return client.get(`${ apiUrl }/api/v1/courses/coupons`);
}

export function getCoursesByIds(courseIds) {
   return client.get(
      `${ apiUrl }/api/v1/front/courses/get-by-ids?course_ids=${ courseIds }`
   );
}

export function getScripts() {
   return client.get(`${ apiUrl }/api/v1/settings/scripts`);
}

export function createScript(script) {
   return client.post(`${ apiUrl }/api/v1/settings/scripts`, script);
}

export function deleteScript(id) {
   return client.delete(`${ apiUrl }/api/v1/settings/scripts/${ id }`);
}

export function updateScript(script) {
   return client.put(`${ apiUrl }/api/v1/settings/scripts/${ script.id }`, script);
}

export function getFrontScripts() {
   return client.get(`${ apiUrl }/api/v1/front/site-builder/scripts`);
}

export function getLandings() {
   return client.get(`${ apiUrl }/api/v1/landings?page=${ 1 }&count=${ 23 }&sort=publish`);
}

export function getLandingsByPage({ currentPage = 1, searchValue = null, sortingValue = 'publish' }) {
   if (searchValue) {
      return client.get(
         `${ apiUrl }/api/v1/landings?&page=${ currentPage }&count=${ 23 }&search=${ searchValue }&sort=${ sortingValue }`
      );
   }
   return client.get(
      `${ apiUrl }/api/v1/landings?page=${ currentPage }&count=${ 23 }&sort=${ sortingValue }`
   );
}

export function createDefaultLanding({ name, templateId }) {
   return client.post(`${ apiUrl }/api/v1/landings`, {
      landing_page_id: templateId,
      name,
   });
}

export function duplicateLanding(landingUrl) {
   return client.post(`${ apiUrl }/api/v1/landings/${ landingUrl }/duplicate`);
}

export function multipleDuplicateLandings(data) {
   return client.post(`${ apiUrl }/api/v1/landings/multi/duplicate`, { landingsUrl: data });
}

export function multipleDeleteLandings(data) {
   return client.post(`${ apiUrl }/api/v1/landings/multi/destroy`, { landingsUrl: data });
}

export function deleteLanding({ landingUrl, isAtacched }) {
   return client.delete(
      `${ apiUrl }/api/v1/landings/${ landingUrl }/${ isAtacched }`
   );
}

export function getPreviewTemplateLanding(templateId) {
   return client.get(`${ apiUrl }/api/v1/landings/templates/${ templateId }`);
}

export function updateLandingsDetails({ landingUrl, isPublished }) {
   return client.put(`${ apiUrl }/api/v1/landings/${ landingUrl }/details`, {
      is_published: isPublished,
   });
}

export function getLandingDetails(landingUrl) {
   return client.get(`${ apiUrl }/api/v1/landings/${ landingUrl }/details`);
}

export function updateLandingDetails({ landingUrl, settings }) {
   return client.put(
      `${ apiUrl }/api/v1/landings/${ landingUrl }/details`,
      settings
   );
}

export function updateMediaResourceName(params) {
   return client.post(`${ apiUrl }/api/v1/files/${ params.id }`, {
      title: params.title,
   });
}

export function deleteMediaResourceName(params) {
   return client.delete(`${ apiUrl }/api/v1/files/${ params.id }`);
}

export function createCheckoutScript({ courseId, data }) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/store-script`,
      data
   );
}

export function getCheckoutCourse({ id }) {
   return client.get(`${ apiUrl }/api/v1/courses/${ id }`);
}

export function createCustomField({ courseId, name }) {
   return client.post(`${ apiUrl }/api/v1/courses/${ courseId }/custom-fields`, {
      name,
      course_id: courseId,
      is_required: 0,
   });
}

export function getCustomFields({ courseId }) {
   return client.get(`${ apiUrl }/api/v1/courses/${ courseId }/custom-fields`);
}

export function deleteCustomField({ courseId, customFieldId }) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/custom-fields/${ customFieldId }/${ courseId }/delete`
   );
}

export function updateCustomField({ courseId, name, id }) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/custom-fields/update`,
      {
         name,
         course_id: courseId,
         is_required: 0,
         id,
      }
   );
}

export function getCheckoutLandings({ courseId }) {
   return client.get(
      `${ apiUrl }/api/v1/checkout-landings/get-landings/${ courseId }`
   );
}

export function makeActiveLanding({ offerId, landingId }) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/${ offerId }/checkout-landings/make-active/${ landingId }`
   );
}

export function getCheckoutLanding({ offerId, landingId }) {
   return client.get(
      `${ apiUrl }/api/v1/checkout-landings/for-plan/get-landing/${ offerId }/${ landingId }`
   );
}

export function updateCheckoutLanding({ offerId, landingId, sections }) {
   return client.post(
      `${ apiUrl }/api/v1/checkout-landings/for-plan/update/${ offerId }/${ landingId }`,
      sections
   );
}

export function putCurrentMemberCustomField(fieldValues) {
   return client.post(
      `${ apiUrl }/api/v1/courses/custom-fields/update-values`,
      fieldValues
   );
}

export function getSchoolRoomLandings() {
   return client.get(`${ apiUrl }/api/v1/school-room-landings/get-landings`);
}

export function makeActiveSchoolRoomLanding({ landingId }) {
   return client.get(
      `${ apiUrl }/api/v1/school-room-landings/make-active/${ landingId }`
   );
}

export function getSchoolRoomLanding({ landingId }) {
   return client.get(
      `${ apiUrl }/api/v1/school-room-landings/get-landing/${ landingId }`
   );
}

export function updateSchoolRoomLanding({ landingId, sections }) {
   return client.post(
      `${ apiUrl }/api/v1/school-room-landings/update/${ landingId }`,
      sections
   );
}

export function updateSchoolRoomLandingSettings({ landingId, data }) {
   if (data && data.css) {
      delete data.css;
   }
   return client.post(
      `${ apiUrl }/api/v1/school-room-landings/settings/${ landingId }`,
      data
   );
}

export function getSchoolRoomLandingSettings(landingId) {
   return client.get(
      `${ apiUrl }/api/v1/school-room-landings/settings/${ landingId }`
   );
}

export function getPublishedLandings() {
   return client.get(`${ apiUrl }/api/v1/landings/get-landings/published`);
}

export function updatActiveLandingUrl({ data }) {
   return client.post(
      `${ apiUrl }/api/v1/landings/update-plan-active-landing-url`,
      data
   );
}

export function updateIsActiveCustomUrl({ data }) {
   return client.post(`${ apiUrl }/api/v1/landings/update-course-landing-custom-url`, data);
}

export function checkLandingAttached(landingUrl) {
   return client.get(`${ apiUrl }/api/v1/landings/${ landingUrl }/attached`);
}

export function getLandingStatistics() {
   return client.get(
      `${ apiUrl }/api/v1/reports/landings/landing-page-views?delimeter=day`
   );
}

export function getNewLandingStatistics(param = {}) {
   const query = filterQuery(param);
   if (query) {
      return client.get(
         `${ apiUrl }/api/v1/reports/landings/landing-page-views?${ query }`
      );
   }
   return client.get(`${ apiUrl }/api/v1/reports/landings/landing-page-views?delimeter=day`);
}

export function zoomSettingsSave(courseId, sectionId, lessonId, params) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/meeting-zoom`,
      params
   );
}

export function setZoomSpot(lessonId, meetingId) {
   return client.post(
      `${ apiUrl }/api/v1/front/courses/zoom2/${ lessonId }/meeting/${ meetingId }`,
      {
         is_booked: true,
      }
   );
}

export function getSubscriptionMetrics(param = {}) {
   const query = filterQuery(param);
   if (query) {
      return client.get(
         `${ apiUrl }/api/v1/reports/courses/subscription-metrics?${ query }`
      );
   }
   return client.get(
      `${ apiUrl }/api/v1/reports/courses/subscription-metrics?delimeter=daily`
   );
}

export function getClassCompletion({ course, name, email }) {
   const query = filterQuery({ name, email });
   if (query) {
      // eslint-disable-next-line no-unused-expressions
      source && source.cancel();
      source = axios.CancelToken.source();
      return client.get(
         `${ apiUrl }/api/v1/reports/courses/class-completion/${ course }?${ query }`,
         { cancelToken: source.token }
      );
   }
   return client.get(
      `${ apiUrl }/api/v1/reports/courses/class-completion/${ course }`
   );
}

export function getCourseCompletionMember(id) {
   return client.get(`${ apiUrl }/api/v1/reports/courses/member/${ id }`);
}

export function getRefunds(param = {}) {
   const query = filterQuery(param);
   if (query) {
      return client.get(`${ apiUrl }/api/v1/reports/courses/refunds?${ query }`);
   }
   return client.get(`${ apiUrl }/api/v1/reports/courses/refunds`);
}

export function getRevenue(param = {}) {
   const query = filterQuery(param);
   if (query) {
      return client.get(
         `${ apiUrl }/api/v1/reports/revenue/net-revenue?${ query }`
      );
   }
   return client.get(`${ apiUrl }/api/v1/reports/revenue/net-revenue`);
}

export function getCourseCompletion(courseId) {
   return client.get(
      `${ apiUrl }/api/v1/reports/courses/class-completion/${ courseId }`
   );
}

export function recentTransactions() {
   return client.get(
      `${ apiUrl }/api/v1/reports/transactions/recent-transactions`
   );
}

export function recentActivity(param = {}) {
   const query = filterQuery(param);
   if (query) {
      return client.get(`${ apiUrl }/api/v1/reports/recent-activity?${ query }`);
   }
   return client.get(`${ apiUrl }/api/v1/reports/recent-activity`);
}

export function getCheckoutSettings() {
   return client.get(`${ apiUrl }/api/v1/settings/checkout-settings`);
}

export function updateCheckoutSettings(data) {
   return client.post(`${ apiUrl }/api/v1/settings/checkout-settings`, {
      key: 'checkout_settings',
      data,
   });
}

export function getCheckoutCodes() {
   return client.get(`${ apiUrl }/api/v1/settings/checkout-settings?codes=1`);
}

export function updateCheckoutCodes(data) {
   return client.post(`${ apiUrl }/api/v1/settings/checkout-settings`, {
      key: 'checkout_settings_codes',
      data,
   });
}

export function updateBillingCard(token) {
   return client.post(`${ apiUrl }/api/v1/settings/account/update-card`, {
      token,
   });
}

export function getEmailNotifications() {
   return client.get(`${ apiUrl }/api/v1/emails/notifications`);
}

export function getEmailNotificationsFromMeta() {
   return client.get(`${ apiUrl }/api/v1/emails/meta-notifications`);
}
export function saveEmailNotification(data) {
   return client.post(`${ apiUrl }/api/v1/emails/notifications`, data);
}

export function deleteCertificates(data) {
   return client.post(`${ apiUrl }/api/v1/certificates/bulk-delete`, {
      ids: data,
   });
}

export function getEmailTrackingData() {
   return client.get(`${ apiUrl }/api/v1/reports/emails`);
}
export function getEmailCSV() {
   return client.get(`${ apiUrl }/api/v1/reports/email/csv-export-new`);
}

export function filterEmailTrackingData(data) {
   return client.post(`${ apiUrl }/api/v1/reports/emails/filter`, data);
}

export function getSchoolRoomCodes() {
   return client.get(`${ apiUrl }/api/v1/settings/scripts`);
}

export function setSchoolRoomCodes(data) {
   return client.post(`${ apiUrl }/api/v1/settings/scripts/update`, data);
}

export function getFolders() {
   return client.get(`${ apiUrl }/api/v1/medialibrary/folders/for-media-library?fileType=file`);
}

export function getFoldersByType(type) {
   return client.get(
      `${ apiUrl }/api/v1/medialibrary/folders?fileType=${ type }`
   );
}


export function addFolder(data) {
   return client.post(`${ apiUrl }/api/v1/medialibrary/folders`, data);
}

export function MediaBulkDelete(data) {
   return client.post(
      `${ apiUrl }/api/v1/medialibrary/folders/bulk-delete`,
      data
   );
}
export function getGlobalBranding() {
   return client.get(`${ apiUrl }/api/v1/settings/global-branding`);
}

export function updateGlobalBranding(data) {
   return client.post(`${ apiUrl }/api/v1/settings/global-branding`, data);
}

export function duplicateFolderMedia(id) {
   return client.get(`${ apiUrl }/api/v1/medialibrary/folders/duplicate/${ id }`);
}

export function filterMedia(query) {
   if (query) {
      // eslint-disable-next-line no-unused-expressions
      source && source.cancel();
      source = axios.CancelToken.source();
      return client.get(
         `${ apiUrl }/api/v1/medialibrary/folders/for-media-library${ query }`, { cancelToken: source.token }
      );
   }
   return client.get(`${ apiUrl }/api/v1/medialibrary/folders/for-media-library`);
}

export function getLabels() {
   return client.get(`${ apiUrl }/api/v1/members/labels`);
}

export function createLabel(data) {
   return client.post(`${ apiUrl }/api/v1/members/labels`, data);
}
export function deleteLabel(id) {
   return client.put(`${ apiUrl }/api/v1/members/labels/${ id }`);
}

export function deleteMultipleCourses(ids) {
   return client.post(`${ apiUrl }/api/v1/courses/multi-destroy`, {
      course_ids: ids.join(),
   });
}

export function duplicateMultipleCourses(ids) {
   // return client.post(`${ apiUrl }/api/v1/courses/make-multi-duplicate-with-socket`, {
   //    course_ids: ids.join(),
   // });
   return client.post(`${ apiUrl }/api/v1/courses/make-multi-duplicate`, {
      course_ids: ids.join(),
   });
}

export function statusMultipleCourses(ids, statusType) {
   return client.post(`${ apiUrl }/api/v1/courses/mutli-status-change`, {
      course_ids: ids.join(),
      action: statusType,
   });
}

export function createProgram(data, isVideo) {
   if (isVideo) {
      return client.post(`${ apiUrl }/api/v1/online-program/create`, data);
   }
   return client.post(`${ apiUrl }/api/v1/courses/create-course`, data);
}

export function saveBlock(courseId, sectionId, lessonId, params) {
   // const p = removeUnusedKeys(params, ['mime_type', 'original_name']);
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }`,
      params
   );
}

export function savePlaylist({
   courseId, sectionId, lessonId, params,
}) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }`,
      params
   );
}

export function deleteBlock(blockId, lessonId) {
   if (lessonId) {
      return client.get(
         `${ apiUrl }/api/v1/blocks/${ blockId }/detach-lesson/${ lessonId }`
      );
   }
   return client.delete(
      `${ apiUrl }/api/v1/blocks/${ blockId }`
   );
}

export function duplicateBlock(courseId, sectionId, lessonId, blockId) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/${ blockId }/duplicate`
   );
}

export function getLessonComments(courseId, type, sortingVersion) {
   return client.get(
      `${ apiUrl }/api/v1/courses/${ courseId }/comments?sort_by=${ sortingVersion }&type=${ type }`
   );
}

export function searchLessonComments(courseId, searchText, type) {
   return client.get(
      `${ apiUrl }/api/v1/courses/${ courseId }/search-comments?text=${ searchText }&type=${ type }`
   );
}

export function deleteComments(courseId, commentsId) {
   return client.post(`
   ${ apiUrl }/api/v1/courses/${ courseId }/delete-comments`, {
      comment_ids: commentsId,
   }
   );
}

export function restoreComments(courseId, commentsId) {
   return client.post(`
   ${ apiUrl }/api/v1/courses/${ courseId }/restore-comments`, {
      comment_ids: commentsId,
   }
   );
}

export function markComments(courseId, commentsId) {
   return client.post(`
   ${ apiUrl }/api/v1/courses/${ courseId }/comments/read`, {
      comment_ids: commentsId,
   }
   );
}

export function getCommentReplies(courseId, commentId) {
   return client.get(
      `${ apiUrl }/api/v1/courses/${ courseId }/comments/${ commentId }`
   );
}

export function replyComment(courseId, commentId, text) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/replay-comments/${ commentId }`, { name: text.convert, text_with_mentions: text.text, mentioned_users_ids: text.ids }
   );
}

export function changeSectionStatus(courseId, sectionId, params) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/change-status/${ sectionId }`, { ...params }
   );
}

export function duplicationSection(courseId, sectionId) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/duplicate/${ sectionId }`, {
         course_id: courseId,
         is_copy: true,
      }
   );
}

export function getMemberForMention(courseId) {
   return client.get(`
      ${ apiUrl }/api/v1/courses/${ courseId }/users-for-mention
   `);
}

export function lessonsSettingsSave(courseId, data) {
   return client.post(`
   ${ apiUrl }/api/v1/courses/${ courseId }/lessons-settings`, data);
}

export function createCommunity(data) {
   return client.post(
      `${ apiUrl }/api/v1/community`, data
   );
}

export function getCommunity(id) {
   if (window.location.pathname.includes('portal')) {
      return client.get(
         `${ apiUrl }/api/v1/front/courses/community/${ id }`
      );
   }
   return client.get(
      `${ apiUrl }/api/v1/community/${ id }`
   );
}

export function createRoom(communityId, groupId, data) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room`, data
   );
}

export function deleteRoom(communityId, groupId, roomId) {
   return client.delete(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }`
   );
}

export function createEvent(communityId, roomId, groupId, data) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/event`, data
   );
}

export function PinOrUnPinEvent(communityId, roomId, groupId, eventId, num) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/event/${ eventId }/pin`, { pinned: num }
   );
}

export function bulkDeleteEvent(communityId, ids) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/event/multi/destroy`, { event_ids: ids }
   );
}

export function bulkArchvieEvent(communityId, roomId, groupId, ids) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/event/multi/archive`, { event_ids: ids }
   );
}

export function multiDuplicateEvents(communityId, roomId, groupId, ids) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/event/multi/duplicate`, { event_ids: ids }
   );
}


// export function archiveEvent(communityId, roomId, groupId, eventId, num) {
//    return client.post(
//       `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/event/${ eventId }/pin`, { pinned: num }
//    );
// }


export function getRoom(communityId, roomId, groupId, urlParams) {
   return client.get(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }${ urlParams }`
   );
}

export function getEventSettings(communityId, groupId, roomId, eventId) {
   return client.get(
      `${ apiUrl }/api/v1/community/${ communityId }/event/${ eventId }`
   );
}

export function updateEventSettings(communityId, eventId, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/community/${ communityId }/event/${ eventId }`, inputs
   );
}

export function logout(token) {
   return axios.get(
      `${ apiUrl }/api/v1/auth/logout`, {
         headers: {
            Authorization: `Bearer ${ token }`,
         },
      }
   );
}

export function getCommunityMention(communityId, name) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/mention/username`, { name }
   );
}


export function postCreate(communityId, groupId, roomId, inputs, postId) {
   if (postId) {
      return client.put(
         `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }`, inputs
      );
   }
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post`, inputs
   );
}

export function inviteMember(communityId, groupId, inviteParams) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/invite`, inviteParams
   );
}

export function postComment(communityId, groupId, roomId, postId, data) {
   const sendedData = { ...data, text: data?.content ? data.content : data.text };
   delete sendedData.content;
   
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }/comments`, { ...sendedData }
   );
}

export function postDelete(communityId, groupId, roomId, postId) {
   return client.post(`${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }`);
}

export function postCommentFront([communityId, groupId, roomId, postId, text]) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }/comments`, { text }
   );
}

export function postReplyComment(communityId, groupId, roomId, postId, commentId, text) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }/comments`, { parent_id: commentId, text }
   );
}

export function postReplyCommentFront([communityId, groupId, roomId, postId, commentId, text]) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }/comments`, { parent_id: commentId, text }
   );
}

export function postLike(communityId, groupId, roomId, postId) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/toggle-like`, { post_id: postId }
   );
}

export function postLikeFront([communityId, groupId, roomId, postId]) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/toggle-like`, { post_id: postId }
   );
}

export function postCommentLike(communityId, groupId, roomId, postId, commentId) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }/comments/toggle-like`, { comment_id: commentId }
   );
}

export function postCommentDelete([communityId, groupId, roomId, postId, commentId]) {
   return client.delete(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }/comments/${ commentId }`
   );
}

export function eventCommentDelete([communityId, groupId, roomId, postId, commentId]) {
   return client.delete(
      `${ apiUrl }/api/v1/community/${ communityId }/event/${ postId }/comments/${ commentId }`
   );
}

export function postCommentLikeFront([communityId, groupId, roomId, postId, commentId]) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/post/${ postId }/comments/toggle-like`, { comment_id: commentId }
   );
}

export function eventComment(communityId, groupId, roomId, eventId, data) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/event/${ eventId }/comments`, { data }
   );
}

export function eventCommentLike(communityId, groupId, roomId, eventId, commentId) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/event/${ eventId }/comments/toggle-like`, { comment_id: commentId }
   );
}

export function eventReplyComment(communityId, groupId, roomId, eventId, commentId, text) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/event/${ eventId }/comments`, { parent_id: commentId, text }
   );
}

export function addExternalLink(communityId, groupId, inputs) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/external-source/`, inputs
   );
}

export function deleteExternalLink(communityId, groupId, id) {
   return client.delete(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/external-source/${ id }`
   );
}

export function pollCraete(communityId, groupId, roomId, inputs) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/poll/create-poll`, inputs
   );
}

export function pollDelete(communityId, groupId, roomId, id) {
   return client.delete(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/poll/${ id }/delete-poll`
   );
}

export function updateRoom(communityId, groupId, roomId, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }`, inputs
   );
}

export function saveCommunitySettings(communityId, slug, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/community/${ communityId }/settings/${ slug }`, inputs
   );
}

export function userVote(communityId, groupId, roomId, pollId, optionId) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/poll/${ pollId }/vote`, { poll_options_id: optionId }
   );
}

export function deleteQuizQuestion(quizId, questionId) {
   return client.delete(
      `${ apiUrl }/api/v1/quiz/${ quizId }/question/${ questionId }`
   );
}

export function deleteQuizAnswer(quizId, answerId) {
   return client.delete(
      `${ apiUrl }/api/v1/quiz/${ quizId }/answer/${ answerId }`
   );
}

export function getCommunityMember(userId) {
   return client.get(
      `${ apiUrl }/api/v1/community/user-info/${ userId }`
   );
}

export function communityMemberSubscribe(userId) {
   return client.post(
      `${ apiUrl }/api/v1/community/user-follow`, { user_id: userId }
   );
}

export function communityMemberRemove(id, communityId) {
   return client.delete(
      `${ apiUrl }/api/v1/community/${ communityId }/user-info/${ id }`
   );
}

export function filterCommunityMember(userId, type, tab) {
   return client.get(
      `${ apiUrl }/api/v1/community/user-info/${ userId }?type=${ type }&tab=${ tab }`
   );
}

export function chooseSavedTemplate(courseId, sectionId, lessonId, quizId, blockSlug, blockId) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/quiz-template`, {
         'quiz_template_id': quizId,
         'slug': blockSlug,
         'block_id': blockId,
      }
   );
}

export function addNewQuestion(courseId, sectionId, lessonId, blockId, quizId, question, blockSlug) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/question-create`, {
         'quiz_id': quizId,
         'block_id': blockId,
         'slug': blockSlug,
         'questions': [
            question,
         ],
      }
   );
}

export function addNewAnswer(courseId, sectionId, lessonId, questionId, answer) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/answer-create`, {
         'question_id': questionId,
         ...answer,
      }
   );
}

export function getCommunityMembers(communityId, page, params, roomId, groupId) {
   return client.get(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/member?page=${ page || 1 }${ params }`
   );
}

export function MembersFollowUnfollow(communityId, memberId, roomId, groupId) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/member/user-follow`, { user_id: memberId }
   );
}

export function MemberDeleteList(communityId, memberId, roomId, groupId) {
   return client.delete(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/member/${ memberId }`
   );
}

export function MemberListReport(communityId, memberId, text, roomId, groupId) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/member/${ memberId }/report`, { reason: text }
   );
}

export function getPlansPricings(query, isPagination) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();

   return client.get(
      `${ apiUrl }/api/v1/plan-pricings?${ isPagination ? 'pagination=1&' : '' }${ query ? `${ query }` : '' }`,
      { cancelToken: source.token }
   );
}

export function deletePlans(ids) {
   return client.post(
      `${ apiUrl }/api/v1/plan-pricings/deletes`, {
         'plan_ids': ids,
      }
   );
}

export function duplicatePlans(ids) {
   return client.post(
      `${ apiUrl }/api/v1/plan-pricings/duplicate`, {
         'plan_ids': ids,
      }
   );
}

export function quizCreate(quiz) {
   return client.post(
      `${ apiUrl }/api/v1/quiz`, quiz
   );
}

export function createPlanNew(data) {
   return client.post(
      `${ apiUrl }/api/v1/plan-pricings`, data
   );
}

export function getQuizzes(params) {
   let query = {};
   if (params) {
      // eslint-disable-next-line no-unused-expressions
      source && source.cancel();
      source = axios.CancelToken.source();
      query = filterQuery({ page: params.page, order_by: params.order_by, search: params.search });
      return client.get(
         `${ apiUrl }/api/v1/quiz?${ query }`, { cancelToken: source.token }
      );
   }
   return client.get(
      `${ apiUrl }/api/v1/quiz?order_by=recently`
   );
}

export function deleteQuiz({ id }) {
   return client.delete(
      `${ apiUrl }/api/v1/quiz/${ id }`
   );
}

export function getPlan(id) {
   return client.get(`
   ${ apiUrl }/api/v1/plan-pricings/${ id }`);
}

export function duplicateQuiz({ id }) {
   return client.post(
      `${ apiUrl }/api/v1/quiz/${ id }/duplicate`
   );
}


export function deleteQuizzes({ ids }) {
   return client.post(
      `${ apiUrl }/api/v1/quiz/multi-delete`, { quiz_id: ids }
   );
}


export function duplicateQuizzes({ ids }) {
   return client.post(
      `${ apiUrl }/api/v1/quiz/multi-duplicate`, { quiz_id: ids }
   );
}

export function getQuiz({ id }) {
   return client.get(`
   ${ apiUrl }/api/v1/quiz/${ id }`);
}

export function saveQuiz({ id, quiz }) {
   return client.put(`
   ${ apiUrl }/api/v1/quiz/${ id }`, quiz);
}

export function updatePlanMainInfo(planId, data) {
   return client.put(`
   ${ apiUrl }/api/v1/plan-pricings/${ planId }/update-plan`, data);
}

export function updatePlanPricing(planId, data) {
   return client.put(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }`, data
   );
}

export function updateCoursePlanPricing({ planId, data }) {
   return client.put(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }`, data
   );
}

export function deletePlanNew(planId) {
   return client.post(
      `${ apiUrl }/api/v1/plan-pricings/deletes`, { plan_ids: [planId] }
   );
}

export function getWithoutPlan(planId) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/without`
   );
}
export function getPlansForOrderBump(planId) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/for-order-bump`
   );
}

export function createUpdateOrderBump({ planId, data }) {
   return client.post(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/order-bump`, data
   );
}

export function deleteOrderBum(planId, id) {
   return client.delete(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/order-bump/${ id }`
   );
}

export function getOrderBump({ planId, id }) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/order-bump/${ id }`
   );
}

export function getCustomPlanFields() {
   return client.get(
      `${ apiUrl }/api/v1/custom-fields`
   );
}

export function addCustomFields(name) {
   return client.post(
      `${ apiUrl }/api/v1/custom-fields`, { name }
   );
}

export function deleteCustomFields(ids) {
   return client.post(
      `${ apiUrl }/api/v1/custom-fields/deletes`, { delete_ids: ids }
   );
}

export function udpatePlanSettings(planId, inputs) {
   return client.put(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/update-settings`, inputs
   );
}

export function deleteSingleQuestion({ quizId, questionId }) {
   return client.delete(
      `${ apiUrl }/api/v1/quiz/${ quizId }/question/${ questionId }`
   );
}

export function createCouponNew(inputs) {
   return client.post(
      `${ apiUrl }/api/v1/coupons`, inputs
   );
}

export function getPlansForCoupons(id) {
   return client.get(
      `${ apiUrl }/api/v1/coupons/${ id }/plans`
   );
}

export function getCoupons(query) {
   return client.get(
      `${ apiUrl }/api/v1/coupons${ query }`
   );
}

export function deleteSingleAnswer({ quizId, answerId }) {
   return client.delete(
      `${ apiUrl }/api/v1/quiz/${ quizId }/answer/${ answerId }`
   );
}

export function deleteCoupons(ids) {
   return client.post(
      `${ apiUrl }/api/v1/coupons/deletes`, { coupon_ids: ids }
   );
}

export function getCoupon(id) {
   return client.get(
      `${ apiUrl }/api/v1/coupons/${ id }`
   );
}

export function attachPlanToCoupon([id, planIds]) {
   return client.post(
      `${ apiUrl }/api/v1/coupons/${ id }/attach-plans`, { plan_ids: planIds }
   );
}

export function detachPlanFromCommunity([id, planId]) {
   return client.delete(
      `${ apiUrl }/api/v1/coupons/${ id }/detach/${ planId }`);
}

export function deleteUpsell(planId, id) {
   return client.delete(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/upsell/${ id }`
   );
}

export function getCheckoutLandingsNew(planId) {
   return client.get(
      `${ apiUrl }/api/v1/checkout-landings/for-plan/get-landings/${ planId }`
   );
}

export function getBundleProduct([planId, search]) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/courses?name=${ search }`
   );
}

export function createBundleProduct([planId, ids]) {
   return client.post(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/attach-courses`, { bundle_courses: ids }
   );
}

export function deleteBundleProduct([planId, id]) {
   return client.delete(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/detach-courses/${ id }`
   );
}

export function getResults({ id, param }) {
   if (param) {
      return client.get(
         `${ apiUrl }/api/v1/quiz/${ id }/user-answers?order_by=${ param }`);
   }
   return client.get(
      `${ apiUrl }/api/v1/quiz/${ id }/user-answers?order_by=name`);
}

export function getPlansForSelect(search) {
   return client.get(
      `${ apiUrl }/api/v1/coupons/0/plans?name=${ search }`
   );
}

export function markAsRead(ids) {
   return client.post(
      `${ apiUrl }/api/v1/notification/read`, { notification_ids: ids }
   );
}

export function saveQuizSettings({ id, quiz }) {
   return client.put(
      `${ apiUrl }/api/v1/quiz/${ id }/update-settings`, quiz);
}


export function resetUserResult({ user_id, quiz_id }) {
   return client.post(
      `${ apiUrl }/api/v1/quiz/${ quiz_id }`, { user_id });
}

export function createUpsell({ planId, data }) {
   return client.post(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/upsell`, data
   );
}
export function updateUpsell({ planId, upsellId, data }) {
   return client.put(`${ apiUrl }/api/v1/plan-pricings/${ planId }/upsell/${ upsellId }`, data);
}

export function getPricingsForUpsell([id, secondId]) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/${ id }/upsell${ secondId ? `/${ secondId }` : '' }`
   );
}

export function downsellCreate([upsellId, data]) {
   return client.post(
      `${ apiUrl }/api/v1/plan-pricings/${ upsellId }/downsell`, data
   );
}

export function downsellDelete(offerId, downsellId) {
   return client.delete(
      `${ apiUrl }/api/v1/plan-pricings/${ offerId }/downsell/${ downsellId }`
   );
}

export function downsellStatusChange(offerId, downsellId) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/${ offerId }/downsell-active/${ downsellId }`
   );
}

export function getUpsellTemplate(upsellId) {
   return client.get(
      `${ apiUrl }/api/v1/checkout-landings/for-upsell/get-landings/${ upsellId }`
   );
}

export function getUpsell(upsellId) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/upsell/${ upsellId }`
   );
}


// Affiliates

export function getAffiliates() {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/all`
   );
}

export function getAffiliatesOffers() {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/get-offers`
   );
}

export function createAffiliate(data) {
   return client.post(
      `${ apiUrl }/api/v1/affiliate/create`, data
   );
}

export function updateAffiliate(affiliateId, data) {
   return client.put(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/update`, data
   );
}

export function getOverview(id, filterType) {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/${ id }/overview?time_period=${ filterType || 30 }`, {
         time_period: filterType,
      }
   );
}

export function deleteAffiliateProgram(id) {
   return client.delete(
      `${ apiUrl }/api/v1/affiliate/${ id }`
   );
}

export function getAffiliateTransactions(id) {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/${ id }/transactions`
   );
}

export function getAffiliatesUsers() {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/users`
   );
}

export function markAsPaidTransaction(id, transactionId) {
   return client.post(
      `${ apiUrl }/api/v1/affiliate/${ id }/transactions/${ transactionId }`
   );
}

export function getAffiliateInfo(id, affiliateId, filterType) {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/users/${ id }?time_period=${ filterType }`
   );
}

export function getAffiliateGeneralSettings(affiliateId) {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/general-settings/all`
   );
}

export function updateAffiliateGeneralSettings(affiliateId, generalSettingsId, settings) {
   return client.put(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/general-settings/${ generalSettingsId }/update`, settings
   );
}

export function getAffiliateSignInSettings(affiliateId) {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/sign-settings/all`
   );
}

export function updateAffiliateSignInSettings(affiliateId, signSettingsId, settings) {
   return client.put(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/sign-settings/${ signSettingsId }/update`, settings
   );
}

export function getAffiliateEmailSettings(affiliateId) {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/email-settings/all`
   );
}

export function updateAffiliateEmailSettings(affiliateId, emailSettingsId, settings) {
   return client.put(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/email-settings/${ emailSettingsId }/update`, settings
   );
}

export function getAffiliateInputs(affiliateId) {
   return client.get(`
   ${ apiUrl }/api/v1/affiliate/${ affiliateId }`);
}

export function getAffiliateTemplate({ affiliateId, templateId }) {
   return client.get(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/sign-settings/get-landing/${ templateId }`
   );
}

export function updateAffiliateTemplate({ affiliateId, templateId, payload }) {
   return client.post(
      `${ apiUrl }/api/v1/affiliate/${ affiliateId }/sign-settings/update/${ templateId }`, payload
   );
}

// End Affiliate
export function getDownsell(id) {
   return client.get(
      `${ apiUrl }/api/v1/plan-pricings/downsell/${ id }`
   );
}

export function downsellUpdate({
   downsellId, data, planId, upsellId,
}) {
   return client.put(
      `${ apiUrl }/api/v1/plan-pricings/${ planId }/upsell/${ upsellId }/downsell/${ downsellId }`, data
   );
}


export function emailBlockDelete({ emailId, blockId }) {
   return client.post(
      `${ apiUrl }/api/v1/emails/${ emailId }/delete-block/${ blockId }`
   );
}

export function emailLinkDelete({ linkId }) {
   return client.post(
      `${ apiUrl }/api/v1/emails/delete-links`, { links_id: [linkId] }
   );
}

export function memberBulkDelete(ids) {
   return client.post(
      `${ apiUrl }/api/v1/members/bulk-delete`, {
         members_id: ids,
      }
   );
}

export function generateTitleDesc(name, value) {
   return client.post(
      `${ apiUrl }/api/v1/courses/text-generate`, { [name]: value }
   );
}

export function getOffers({ query, isMembership }) {
   if (isMembership) {
      return client.get(`${ apiUrl }/api/v1/front/plans/membership?${ query }`);
   }
   return client.get(`${ apiUrl }/api/v1/front/plans?${ query }`);
}

export function getPortalTemplateFiles(templateId) {
   return client.get(`${ apiUrl }/api/v1/school-room-landings/get-template/${ templateId }`);
}

export function updatePortalTemplateFile(templateId, data) {
   return client.post(`${ apiUrl }/api/v1/school-room-landings/update-content-css/${ templateId }`, data);
}

export function memberToggleLikeCourse(id) {
   return client.get(`${ apiUrl }/api/v1/front/courses/toggle-like/${ id }`);
}

export function enrollMemberToFreeOffer(id) {
   return client.get(`${ apiUrl }/api/v1/front/plans/${ id }/enroll`);
}

export function getOnlyOffers() {
   return client.get(`${ apiUrl }/api/v1/front/plans/get-published`);
}

export function createLessonNote({ course_id, notes }) {
   return client.post(`${ apiUrl }/api/v1/front/courses/${ course_id }/notes`, notes);
}

export function getLessonNotes({ courseId, lessonId }) {
   return client.get(`${ apiUrl }/api/v1/front/courses/${ courseId }/notes/lesson/${ lessonId }`);
}

export function getAllNotes({ courseId, sort_by, search_by }) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   const queryParams = filterQuery({
      sort_by,
      search_by,
   });
   if (queryParams) {
      return client.get(
         `${ apiUrl }/api/v1/front/courses/${ courseId }/notes/all?${ queryParams }`,
         { cancelToken: source.token }
      );
   }
   return client.get(`${ apiUrl }/api/v1/front/courses/${ courseId }/notes/all?sort_by=newest`);
}

export function addBookmark({ courseId, id }) {
   return client.post(`${ apiUrl }/api/v1/front/courses/${ courseId }/lessons/${ id }/bookmark`);
}

export function getBookmarks({ courseId }) {
   return client.get(`${ apiUrl }/api/v1/front/courses/${ courseId }/lessons/bookmarks`);
}

export function favoriteOffer(offerId) {
   return client.post(
      `${ apiUrl }/api/v1/front/plans/${ offerId }/favorite`
   );
}

export function getOfferCourses(offerId) {
   return client.get(
      `${ apiUrl }/api/v1/front/plans/${ offerId }/courses`
   );
}

export function getOfferCourseLessons(courseId) {
   return client.get(
      `${ apiUrl }/api/v1/front/courses/${ courseId }/lessons`
   );
}

export function deleteLessonNote({ courseId, noteId }) {
   return client.delete(`${ apiUrl }/api/v1/front/courses/${ courseId }/notes/${ noteId }`);
}

export function usersAnswersQuiz({ courseId, lessonId, answers }) {
   return client.post(`${ apiUrl }/api/v1/front/courses/${ courseId }/${ lessonId }/user-answers`, answers);
}

export function myAccountCommunities(...args) {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/account?tab=communities&${ args[0] }`
   );
}

export function myAccountCertificates(...args) {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/account?tab=certificates&${ args[0] }`
   );
}

export async function myAccountCourses(...args) {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/account?tab=courses&${ args[0] }`
   );
}

export function myAccountTags() {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/account?tab=tags`
   );
}


export function usersAnswersResults({ id }) {
   return client.get(`${ apiUrl }/api/v1/quiz/${ id }/answers`);
}

export function myAccountInformation() {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/account?tab=settings`
   );
}

export function updateMyAccount(payload) {
   return client.put(
      `${ apiUrl }/api/v1/front/my-account/information`, payload
   );
}

export function myAccountNotes(...args) {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/account?tab=notes&${ args[0] }`
   );
}

export function getMyAccountSavedCourses(...args) {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/account?tab=saved_offers&${ args[0] }`
   );
}

export function deleteNoteFront(ids) {
   return client.post(
      `${ apiUrl }/api/v1/front/my-account/notes`, { note_ids: ids }
   );
}

export function updateNoteFront([noteId, inputs]) {
   return client.put(
      `${ apiUrl }/api/v1/front/my-account/notes/${ noteId }`, inputs
   );
}

export function getMyAccountCommunity([id, sortingType]) {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/information/community/${ id }?comments_order_type=${ sortingType || 'newest' }`
   );
}

export function updateAddressSettings(inputs) {
   return client.put(
      `${ apiUrl }/api/v1/front/my-account/billing-data`, inputs
   );
}

export function updateSocialLinks(inputs) {
   return client.put(
      `${ apiUrl }/api/v1/front/my-account/social-links`, inputs
   );
}

export function myAccountComments(search) {
   return client.get(
      `${ apiUrl }/api/v1/front/my-account/account?comment_type=courses&tab=comments${ search ? `&search=${ search }` : '' }`
   );
}

export function myAccountReadNotification(ids) {
   return client.post(
      `${ apiUrl }/api/v1/notification/read`, { notification_ids: ids }
   );
}


export function sendAwsFile({
   file, src, name, subtitle, slug, id, folder_id, original_name,
}) {
   let fileData = {
      name,
      original_name,
      size: file.size,
      type: file.type,
      src,
      subtitle,
      slug,
      id,
   };
   if (folder_id) {
      fileData = { ...fileData, folder_id };
   }
   return client.post(`${ apiUrl }/api/v1/videos`, fileData);
}

export function getCourseAuthors() {
   return client.get(`${ apiUrl }/api/v1/authors/courses`);
}

export function getOtherPages(type) {
   return client.get(`${ apiUrl }/api/v1/other-page-landings/get-landings/${ type || '' }`);
}

export function getOtherPage(id) {
   return client.get(`${ apiUrl }/api/v1/other-page-landings/get-landing/${ id }`);
}

export function updateOtherPage([id, data]) {
   return client.post(`${ apiUrl }/api/v1/other-page-landings/update/${ id }`, data);
}

export function makeActiveOtherPage(id) {
   return client.get(`${ apiUrl }/api/v1/other-page-landings/make-active/${ id }`);
}

export function getAllLandingDomains() {
   return client.get(`${ apiUrl }/api/admin/custom-domains`);
}

export function createLandingDomain(domain) {
   return client.post(
      `${ apiUrl }/api/admin/custom-domains`, { domain }
   );
}

export function deleteCustomDomains(id) {
   return client.delete(
      `${ apiUrl }/api/admin/custom-domains/${ id }`
   );
}

export function transferSection(courseId, sectionId, copyCourseId, isCopy) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/transfer?is_copy=${ isCopy ? 1 : 0 }`, {
         course_id: copyCourseId,
      }
   );
}

export function updateGoogleVerifyId(id) {
   return client.post(
      `${ apiUrl }/api/v1/settings`, {
         google_site_verify_id: id,
      }
   );
}

export function getAllMessages(communityId, search) {
   return client.get(
      `${ apiUrl }/community/${ communityId }/messages/all?search_by=${ search }`
   );
}

export function getMembersForChat(communityId, searchText) {
   return client.get(
      `${ apiUrl }/api/v1/community/${ communityId }/members?search=${ searchText || '' }`
   );
}

export function getConversationMessages(communityId, uuid) {
   return client.get(
      `${ apiUrl }/api/v1/community/${ communityId }/chat/${ uuid }`
   );
}

export function getCommunityMembersAll([communityId, filter, sort, search, page]) {
   return client.get(
      `${ apiUrl }/api/v1/community/${ communityId }/get-members?users=${ filter }&sort=${ sort }&search=${ search }&page=${ page || 1 }`
   );
}

export function MembersFollowUnfollowListing([communityId, memberId, roomId, groupId]) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/member/user-follow`, { user_id: memberId }
   );
}
export function CommunityMemberDelete([communityId, memberId, roomId, groupId]) {
   return client.delete(
      `${ apiUrl }/api/v1/community/${ communityId }/group/${ groupId }/room/${ roomId }/member/${ memberId }`
   );
}

export function lessonBulkUpload(courseId, sectionId, lessonId, inputs) {
   return client.post(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ lessonId }/bulk-upload`, inputs
   );
}

export function getVideoMetrix() {
   return client.get(
      `${ apiUrl }/api/v1/videos/analitics?count=30&page=1`
   );
}

export function getVideoMetrixbyPage({ currentPage = 1 }) {
   return client.get(
      `${ apiUrl }/api/v1/videos/analitics?count=30&page=${ currentPage }`
   );
}

export function deleteConversationMessages(communityId, conversationId) {
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/chat/conversations/all/messages/delete`, {
         conversationId,
      }
   );
}

export function generateCouponCode() {
   return client.get(
      `${ apiUrl }/api/v1/coupons/fill-code`
   );
}

export function getMessengerGroupChat(id) {
   return client.get(
      `${ apiUrl }/api/v1/community/${ id }/chat/get-messages/group
      `
   );
}

export function userMuteUnmuteMessenger(data) {
   const {
      communityId, conversationId, memberuuId, isMuted,
   } = data;
   return client.post(
      `${ apiUrl }/api/v1/community/${ communityId }/chat/${ conversationId }/member/${ memberuuId }/${ isMuted ? 'unmute' : 'mute' }`
   );
}

// AFFILIATE FRONT
export function getAffiliateDashboard(data = {}) {
   const { period } = data;
   return client.get(
      `${ apiUrl }/api/v1/front/affiliates/dashboard?period=${ period || 'all' }`
   );
}

export function getProductOffersAffiliate(data = {}) {
   const { sort, search } = data;
   return client.get(
      `${ apiUrl }/api/v1/front/affiliates/offers?sort_by=${ sort || 'all' }&search=${ search || '' }`
   );
}


export function getPublishedQuizzes() {
   return client.get(
      `${ apiUrl }/api/v1/quiz/attached-courses`
   );
}


export function getAllAuthors() {
   return client.get(
      `${ apiUrl }/api/v1/authors?count=all`
   );
}

export function attachAuthorToLesson({ authorId, lessonId }) {
   return client.post(
      `${ apiUrl }/api/v1/authors/${ authorId }/lesson/${ lessonId }`
   );
}

export function updatePlaylistAuthorName({ playlistId, authorId }) {
   return client.post(
      `${ apiUrl }/api/v1/authors/${ authorId }/lesson/${ playlistId }`
   );
}

export function getLessonAuthor() {
   return client.get(
      `${ apiUrl }/api/v1/authors/lessons`
   );
}

export function answerOnboardingQuestion(data) {
   return client.post(`${ apiUrl }/api/v1/settings/set-steps`, data);
}

export function updateFolderName(id, data) {
   return client.post(`${ apiUrl }/api/v1/medialibrary/folders/rename/${ id }`, data);
}

export function getAllCategories() {
   return client.get(`${ apiUrl }/api/v1/front/categories/all`);
}

export function revertToDefault(templateId) {
   return client.get(`${ apiUrl }/api/v1/other-page-landings/revert-on-default/${ templateId }`);
}

export function revertToDefaultPortalTemplate(templateId) {
   return client.get(`${ apiUrl }/api/v1/school-room-landings/revert-on-default/${ templateId }`);
}

export function revertToDefaultCheckoutTemplate({ planId, selectedCheckoutId }) {
   return client.post(`${ apiUrl }/api/v1/plan-pricings/${ planId }/checkout-revert-to-default/${ selectedCheckoutId }`);
}

export function relatedVideos(id) {
   return client.get(`${ apiUrl }/api/v1/front/categories/${ id }/related-lessons`);
}

export function changeMediaName(inputs) {
   return client.put(`${ apiUrl }/api/v1/medialibrary`, inputs);
}

export function changeFromEmail(inputs) {
   return client.post(`${ apiUrl }/api/v1/emails/from-email/verify`, inputs);
}
export function emailPreview(email) {
   return client.post(`${ apiUrl }/api/v1/emails/preview-save`, email);
}

export function getOffersByCategory(categoryId) {
   return client.get(`${ apiUrl }/api/v1/front/categories/${ categoryId }`);
}

export function getNextPageOffersByCategory(nextUrl) {
   return client.get(nextUrl);
}

export function getAllOffers() {
   return client.get(`${ apiUrl }/api/v1/front/plans/get-all`);
}

export function checkName(data) {
   return client.post(`${ apiUrl }/api/v1/courses/check-name`, data);
}

export function getOnlyPublishedCourses() {
   return client.get(`${ apiUrl }/api/v1/front/courses/all-for-slider`);
}

export function isMembershipExist() {
   return client.get(`${ apiUrl }/api/v1/online-program/check`);
}

export function getMembership() {
   return client.get(`${ apiUrl }/api/v1/plan-pricings/membership`);
}
export function getCheckListData() {
   return client.get(`${ apiUrl }/api/v1/progress/steps`);
}

export function checkCustomizeBranding(value) {
   return client.put(`${ apiUrl }/api/v1/metas/customize_branding`, value);
}

export function changeCheckoutURL({ id, url }) {
   return client.post(`${ apiUrl }/api/v1/plan-pricings/${ id }/change-checkout-url`, { url });
}


export function getFrontCategory({ link, playlistLink }) {
   if (playlistLink) {
      return client.get(`${ apiUrl }/api/v1/front/courses/playlist/${ playlistLink }`);
   }
   return client.get(`${ apiUrl }/api/v1/front/categories/membership/${ link }/lessons`);
}


export function getFrontCategorySearch({ link, search, playlistLink }) {
   if (playlistLink) {
      if (search) {
         return client.get(`${ apiUrl }/api/v1/front/courses/playlist/${ playlistLink }?search=${ search }`);
      }
      return client.get(`${ apiUrl }/api/v1/front/courses/playlist/${ playlistLink }`);
   }
   if (search) {
      return client.get(`${ apiUrl }/api/v1/front/categories/membership/${ link }/lessons?search=${ search }`);
   }
   return client.get(`${ apiUrl }/api/v1/front/categories/membership/${ link }/lessons`);
}

export function getPlayLists({ pageNum, params = {} }) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   const queryParams = filterQuery({
      sort: params.sort,
      filter: params.filter,
      search: params.searchValue,
   });
   if (queryParams) {
      return client.get(
         `${ apiUrl }/api/v1/online-program/playlist?page=${ pageNum || 1 }&count=${ 23 }&${ queryParams }`,
         { cancelToken: source.token }
      );
   }
   return client.get(`${ apiUrl }/api/v1/online-program/playlist?page=${ pageNum || 1 }&count=${ 23 }`);
}

export function changePlaylistVideoData({ playlistId, params }) {
   return client.post(`${ apiUrl }/api/v1/online-program/playlist/${ playlistId }/update-permission`, params);
}

export function getPlaylistVideos(id) {
   return client.get(`${ apiUrl }/api/v1/online-program/playlist/lessons?playlist_id=${ id }`);
}

export async function getContentPlaylistData(playlistId) {
   return client.get(`${ apiUrl }/api/v1/online-program/playlist/${ playlistId }/blocks`);
}


export function deletePlaylist({ courseId, sectionId, playlistId }) {
   return client.delete(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ playlistId }`
   );
}


export function changePlaylistStatus({
   courseId, sectionId, playlistId, params,
}) {
   return client.put(
      `${ apiUrl }/api/v1/courses/${ courseId }/sections/${ sectionId }/lessons/${ playlistId }`, params
   );
}


export function portalMenu() {
   return client.get(`${ apiUrl }/api/v1/front/plans/for-menu`);
}

export function duplicatePlaylist(sectionId, playlistId, catIds) {
   return client.post(`${ apiUrl }/api/v1/courses/127/sections/${ sectionId }/lessons/${ playlistId }/duplicate`, { category_ids: catIds });
}

export function addTrailer({ id, customTrailer }) {
   return client.post(`${ apiUrl }/api/v1/videos/${ id }/custom-trailer`, customTrailer);
}

export function editCustomField(changedData) {
   return client.put(`${ apiUrl }/api/v1/custom-fields/update`, changedData);
}

export function generateCheckoutToken({ planId, pricingId }) {
   return client.get(
      `${ apiUrl }/api/v1/front/plans/generate-checkout-token/${ planId }/${ pricingId }`
   );
}

export function updatePricingPlan(planData) {
   return client.post(`${ apiUrl }/api/v1/plans/update-plan`, planData);
}

export function sendSession(session) {
   return client.post(`${ apiUrl }/api/v1/plans/invoice`, session);
}

export function sendSubscriptionUpdate() {
   return client.get(`${ apiUrl }/api/v1/plans/after-update`);
}

export function updateCard() {
   return client.get(`${ apiUrl }/api/v1/plans/update-card`);
}

export function cancelPlan() {
   return client.get(`${ apiUrl }/api/v1/plans/cancel-plan`);
}

export function banMember({ communityId, memberId }) {
   return client.post(`${ apiUrl }/api/v1/community/${ communityId }/ban-member/${ memberId }`);
}

export function suspendMember({ communityId, memberId }) {
   return client.post(`${ apiUrl }/api/v1/community/${ communityId }/suspend-member/${ memberId }`);
}

export function createBridge({ id, inputs }) {
   return client.post(`${ apiUrl }/api/v1/courses/${ id }/bridge-page`, inputs);
}

export function removeAutoresponder(planId) {
   return client.post(`${ apiUrl }/api/v1/plan-pricings/${ planId }/remove-autoresponder`);
}

export function communityBannerImage(communityId, bannerImage) {
   return client.post(`${ apiUrl }/api/v1/community/${ communityId }/banner-image`, { banner_image: bannerImage });
}

export function getCommunityProducts(cummunityId) {
   return client.get(`${ apiUrl }/api/v1/community/${ cummunityId }/products`);
}

export function getCommunityProductsMemberSearch({ cummunityId, search, page }) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   return client.get(`${ apiUrl }/api/v1/front/courses/community/${ cummunityId }/products?search=${ search }&page=${ page }`, 
      { cancelToken: source.token });
}

export function getCommunityProductsSearch({ cummunityId, search, page = 1 }) {
   // eslint-disable-next-line no-unused-expressions
   source && source.cancel();
   source = axios.CancelToken.source();
   return client.get(`${ apiUrl }/api/v1/community/${ cummunityId }/products?search=${ search }&page=${ page }`, 
      { cancelToken: source.token });
}

export function getCommunityProductsMember(cummunityId) {
   return client.get(`${ apiUrl }/api/v1/front/courses/community/${ cummunityId }/products`);
}

export function getCommunityUnAttachedProducts(cummunityId) {
   return client.get(`${ apiUrl }/api/v1/community/${ cummunityId }/products/get-unattached-products`);
}

export function attachProduct({ communityId, ids }) {
   return client.post(`${ apiUrl }/api/v1/community/${ communityId }/products/attach`, { ids });
}

export function dettachProduct({ communityId, ids }) {
   return client.post(`${ apiUrl }/api/v1/community/${ communityId }/products/detach`, { ids });
}

export function changeLanguage(lang) {
   return client.post(`${ apiUrl }/api/v1/front/my-account/language`, {
      language: lang,
   });
}

export function exportCommunityMembersCSV(id) {
   return client.get(`${ apiUrl }/api/v1/community/${ id }/export-to-csv`, { responseType: 'blob' });
}


export function pinCommunityPost(id, groupId, roomId, postId, pinned) {
   return client.post(`${ apiUrl }/api/v1/community/${ id }/group/${ groupId }/room/${ roomId }/post/${ postId }/pin`, { pinned: !!pinned });
}


export function importCommunityMembersCSV({ id, file }) {
   return client.post(`${ apiUrl }/api/v1/community/${ id }/upload-member-csv`, file);
}


export function getCommunityCategories() {
   return client.get(`${ apiUrl }/api/v1/community/room_category`);
}

export function createCommunityCategories(data) {
   return client.post(`${ apiUrl }/api/v1/community/room_category`, data);
}

export function editCommunityCategories({ id, data }) {
   return client.put(`${ apiUrl }/api/v1/community/room_category/${ id }`, data);
}

export function deleteCommunityCategory({ id }) {
   return client.delete(`${ apiUrl }/api/v1/community/room_category/${ id }`);
}

export function getCommunityAnalytics({ id, from, to }) {
   if (from && to) {
      return client.get(`${ apiUrl }/api/v1/community/${ id }/analytics?from=${ from }&to=${ to }`);
   }
   return client.get(`${ apiUrl }/api/v1/community/${ id }/analytics`);
}

export function sendVideoData({
   duration, courseUrl, videoId, category_id, lessonId,
}) {
   return client.post(`${ apiUrl }/api/v1/front/courses/${ courseUrl }/${ lessonId }/user-watching`, {
      duration,
      video_id: videoId,
      category_id,
   });
}

export const pausePlan = (planType) => {
   return client.post(`${ apiUrl }/api/v1/plans/pause_checkout_url`, {
      price_id: planType,
   });
};

export const pauseSession = (sessionId) => {
   return client.post(`${ apiUrl }/api/v1/plans/invoice-pause`, {
      session: sessionId,
   });
};


export const getContinueWatchingData = () => {
   return client.get(`${ apiUrl }/api/v1/front/courses/user-watching`);
};

export const getVideoDuration = async ({
   categoryId, courseId, lessonId, videoId,
}) => {
   return client.get(`${ apiUrl }/api/v1/front/courses/${ categoryId }/${ courseId }/${ lessonId }/${ videoId }/user-watching`);
};

export const deleteContinueWatchingVideo = ({ id }) => {
   return client.delete(`${ apiUrl }/api/v1/front/courses/${ id }/user-watching`);
};

export const changeUserRole = ({
   communityId, memberId, pivotId, userRole, 
}) => {
   return client.post(`${ apiUrl }/api/v1/community/${ communityId }/change-role/${ memberId }/${ pivotId }`, {
      role: userRole,
   });
};

export const unreadGroupChatCount = (communityId) => {
   return client.get(`${ apiUrl }/api/v1/community/${ communityId }/chat/get-messages/group/unread-count`);
};