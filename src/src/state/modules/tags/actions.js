import * as types from './types';

const tagsInitStart = () => ({
   type: types.TAGS_INIT_START,
});

const tagsInitCompleted = (data) => ({
   type: types.TAGS_INIT_COMPLETED,
   payload: {
      data,
   },
});

const tagsInitFailed = () => ({
   type: types.TAGS_INIT_FAILED,
});

const tagsCreateCompleted = (tag) => ({
   type: types.TAGS_CREATE_COMPLETED,
   payload: {
      tag,
   },
});


const updateTagCompleted = (id, data) => ({
   type: types.UPDATE_TAGS_COMLETED,
   payload: { id, data },
});

const removeTagCompleted = (id) => ({
   type: types.REMOVE_TAGS_COMLETED,
   payload: { id },
});


export {
   tagsInitStart,
   tagsInitCompleted,
   tagsInitFailed,
   tagsCreateCompleted,
   updateTagCompleted,
   removeTagCompleted,
};
