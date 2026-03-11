import {
   getPortalTemplateFiles, getSchoolRoomLandingSettings, updatePortalTemplateFile, updateSchoolRoomLandingSettings, 
} from 'api';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { generateCSSStringVariables, parseCSSString } from 'utils/cssStringOperations';
import {
   getPortalTemplateFilesCompleted, 
   getPortalTemplateFilesFailed, 
   getPortalTemplateFilesStart, 
   updatePortalCssVariablesFileCompleted, 
   updatePortalTemplateFileFailed, 
   updatePortalTemplateFileStart, 
} from './actions';
import isPrint from '../designCourse/edit/Error';

const getSchoolRoomSettingsAndGenerateCssVariablesFile = async (templateId) => {
   const { data } = await getPortalTemplateFiles(templateId);

   const { data: schoolRoomSettings } = await getSchoolRoomLandingSettings(templateId);
       
   const cssVariablesString = generateCSSStringVariables({
      buttonBgcolor: schoolRoomSettings.school_color,
      textColor: schoolRoomSettings.school_text_color || '#FFFFFF',
      offersSliderColor: schoolRoomSettings.school_color_2 || '#FFFFFF',
   });

   const files = { ...data };
   files.variables_css = {
      content: cssVariablesString,
      file_name: 'variables.css',
   };

   return files;
};

export const getPortalTemplateFilesOperation = (templateId, callback) => {
   return async dispatch => {
      try {
         dispatch(getPortalTemplateFilesStart());

         const files = await getSchoolRoomSettingsAndGenerateCssVariablesFile(templateId);
         
         dispatch(getPortalTemplateFilesCompleted(files));

         if (callback) {
            callback(files);
         }
      } catch (error) {
         dispatch(getPortalTemplateFilesFailed());
         dispatch(push(Router.route('ADMIN_SCHOOL_ROOM').getMask()));
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const updatePortalTemplateFileOperation = (templateId, body, callback) => {
   return async dispatch => {
      try {
         dispatch(updatePortalTemplateFileStart());

         await updatePortalTemplateFile(templateId, body);

         const files = await getSchoolRoomSettingsAndGenerateCssVariablesFile(templateId);

         dispatch(getPortalTemplateFilesCompleted(files));

         if (callback) {
            callback(files);
         }
      } catch (error) {
         dispatch(updatePortalTemplateFileFailed());
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const updatePortalCssVariablesFileOperation = (templateId, body) => {
   return async dispatch => {
      try {
         dispatch(updatePortalTemplateFileStart());

         const parsedColors = parseCSSString(body);

         const data = {
            school_color: parsedColors.buttonBgcolor,
            school_text_color: parsedColors.textColor,
            school_color_2: parsedColors.offersSliderColor,
         };
         await updateSchoolRoomLandingSettings({
            landingId: templateId,
            data,
         });

         dispatch(updatePortalCssVariablesFileCompleted(body));
      } catch (error) {
         dispatch(updatePortalTemplateFileFailed());
         if (isPrint('Something went wrong.')) {
            toast.error('Something went wrong.');
         }
      }
   };
};