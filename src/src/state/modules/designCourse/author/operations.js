import {
   getAuthors,
   createAuthor,
   updateAuthor,
   attachAuthor,
   deleteAuthor,
} from 'api/AuthApi';
import {
   getAuthorsDataStart,
   getAuthorsDataComplete,
   getAuthorsDataFailed,
   createAuthorStart,
   createAuthorComplete,
   createAuthorFailed,
   saveAuthorStart,
   saveAuthorComplete,
   saveAuthorFailed,
   deleteAuthorStart,
   deleteAuthorComplete,
   deleteAuthorFailed,
} from 'state/modules/designCourse/author/actions';
import {
   setAuthorSettingsAction,
} from 'state/modules/designCourse/edit/actions';
import { toast } from 'react-toastify';
import isPrint from '../edit/Error';


export const getAuthorsDataOperation = (param) => {
   return async (dispatch) => {
      dispatch(getAuthorsDataStart());
      try {
         const {
            data,
         } = await getAuthors(param);
         dispatch(getAuthorsDataComplete(data));
      } catch (error) {
         dispatch(getAuthorsDataFailed());
         if (error.response && error.response.status !== 401) {
            if (isPrint('Failed to get authors.')) {
               toast.error('Failed to get authors.');
            }
         }
      }
   };
};

export const createAuthorOperation = (data, onError) => {
   return async (dispatch) => {
      dispatch(createAuthorStart());
      try {
         const newAuthor = await createAuthor(data);
         dispatch(setAuthorSettingsAction(newAuthor.data));
         dispatch(createAuthorComplete(newAuthor.data));
         if (isPrint('Author has been created.')) {
            toast.success('Author has been created.');
         }
      } catch (error) {
         if (error.response && error.response.status !== 401) {
            dispatch(createAuthorFailed());
            if (error.response.data && error.response.data.errors && error.response.data.errors.name) {
               if (onError) {
                  onError(error.response);
               } else {
                  if (isPrint(error.response.data.errors.name[0])) {
                     toast.error(error.response.data.errors.name[0]);
                  }
                  if (isPrint(error.response.data.errors.name[1])) {
                     toast.error(error.response.data.errors.name[1]);
                  }
               }
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};


export const authorSaveOperation = (courseId, authorId, data) => {
   return async (dispatch) => {
      dispatch(saveAuthorStart());
      document.querySelector('.save-instructor').setAttribute('disabled', 'disabled');
      try {
         await updateAuthor(authorId, data);
         await attachAuthor(courseId, authorId);
         document.querySelector('.save-instructor').removeAttribute('disabled');
         dispatch(saveAuthorComplete(courseId, authorId, data));
         if (isPrint('Instructor has been saved.')) {
            toast.success('Instructor has been saved.');
         }
      } catch (error) {
         document.querySelector('.save-instructor').removeAttribute('disabled');
         if (error.response && error.response.status !== 401) {
            if (error.response.status === 422 && error.response.data.errors && error.response.data.errors.description) {
               toast.error(error.response.data.errors.description[0]);
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
            dispatch(saveAuthorFailed());
         }
      }
      document.querySelector('.save-instructor').removeAttribute('disabled');
   };
};

export const deleteAuthorOperation = (id) => {
   return async (dispatch) => {
      dispatch(deleteAuthorStart());
      try {
         await deleteAuthor(id);
         dispatch(deleteAuthorComplete(id));
         if (isPrint('Author has been deleted.')) {
            toast.success('Author has been deleted.');
         }
      } catch (error) {
         if (error.response && error.response.status !== 401) {
            if (error.response.status === 422 && error.response.data && error.response.data.author) {
               toast.error(error.response.data.author[0]);
            } else if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
            dispatch(deleteAuthorFailed());
         }
      }
   };
};
