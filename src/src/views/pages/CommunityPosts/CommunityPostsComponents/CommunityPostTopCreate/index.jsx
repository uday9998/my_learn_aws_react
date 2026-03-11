import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import PostEditor from 'components/modules/PostEditor';
import UploadCover from 'components/elements/uploadCover';
import useAutosizeTextArea from 'utils/useAutosizeTextArea';
import CommunityPoll from 'views/pages/community/communityCommponents/CommunityPoll';
import { communityButtonColors, communitySecondaryButtonColors } from 'utils/communityButtonColors';
import { uniqueId } from 'lodash';

const CommunityPostTopCreate = ({
   user, communityId, community, roomId, createPost, openEditor, onCancel, editaBlePost,
}) => {
   const [data, setData] = useState(editaBlePost || {
      title: '',
      value: '',
      mentions: [],
      polls: [],
      files: [],
   });
   const a = useRef(editaBlePost || {
      title: '',
      value: '',
      mentions: [],
      polls: [],
      files: [],
   });
   const clear = () => {
      setData({
         title: '',
         value: '',
         mentions: [],
         polls: [],
         files: [],
      });
      a.current = {
         title: '',
         value: '',
         mentions: [],
         polls: [],
         files: [],
      };
   };
   const [height, setHeight] = useState(editaBlePost ? 'auto' : '221px');
   const [isOpenEditor, setIsOpenEditor] = useState(openEditor);

   useEffect(() => {
      setIsOpenEditor(openEditor);
   }, [openEditor]);

   const itemRef = useRef(null);
   const onChange = (name, value) => {
      setHeight('auto');
      a.current = {
         ...a.current,
         [name]: value,
      };
      setData(a.current);
   };
   const handleMention = (name, id) => {
      onChange('mentions', [
         ...data.mentions,
         { name, id },
      ]);
   };
   const textAreaRef = useRef(null);
   useAutosizeTextArea(textAreaRef.current, data.title);
   const handleAddPoll = (item) => {
      onChange('polls', [
         ...data.polls,
         item,
      ]);
   };

   const handleAddFile = (item) => {
      onChange('files', [
         ...data?.files || [],
         item,
      ]);
   };
   const handleRemoveMention = (id) => {
      let toFilter = id;
      const filter = a.current.mentions.filter((mention) => {
         if (mention.id === toFilter) {
            toFilter = null;
            return false;
         }
         return true;
      });
      onChange('mentions', filter);
   };
   const handleSumbit = () => {
      const mentionedUsersIds = data.mentions?.map((mention) => mention.id);
      const inputs = {
         picture_src: data.cover,
         title: data.title,
         content: data.value,
         mentions: mentionedUsersIds,
         polls: data.polls,
         files: data.files,
      };
      if (data.courseId) {
         inputs.course_id = data.courseId;
      }
      const communityGroupId = community.room_groups[0].id;
      createPost(communityId, communityGroupId, roomId, inputs, editaBlePost?.id);
   };
   const onChangePoll = (newPoll, index) => {
      const newPolls = data.polls;
      newPolls[index] = newPoll;
      onChange('polls', newPolls);
   };

   const onRemovePoll = (index) => {
      const newPolls = data.polls.filter((e, i) => {
         return index !== i;
      });
      onChange('polls', newPolls);
   };
   
   return (
      <div
         className={ `community__view__bottom__posts__news${ isOpenEditor ? ' community__view__bottom__posts__news__active' : '' }` }
      >
         <div
            className='community__view__bottom__posts__news__left'
            style={ {
               height: isOpenEditor ? height : '32px',
            } }
         >
            <img className='community__view__bottom__posts__news__left__image' src={ user.picture_src || user.picture_full_src } alt='' />
            {isOpenEditor ? (
               <>
                  <div
                     ref={ itemRef }
                     className='community__view__bottom__posts__news__left__editor'
                  >
                     <UploadCover 
                        cover={ data.cover }
                        onChange={ onChange }
                        hideMediaLibrary={ user.role !== 1 }
                     />
                     <div className='community__post__create__editor'>
                        <textarea
                           ref={ textAreaRef }
                           value={ data.title || '' }
                           name='title'
                           className='community__post__create__editor__title'
                           placeholder='Title'
                           onChange={ (e) => {
                              onChange('title', e.target.value);
                           } }
                        />
                        <PostEditor
                           communityId={ communityId }
                           handleMention={ handleMention }
                           handdleRemoveMention={ handleRemoveMention }
                           value={ data.content }
                           addFileToState={ handleAddFile }
                           handleAddPoll={ handleAddPoll }
                           onChange={ onChange }
                        />
                     </div>
                     {data.polls?.map((e, index) => {
                        return (
                           <CommunityPoll
                              key={ uniqueId() }
                              onChange={ (inputs) => onChangePoll(inputs, index) }
                              poll={ e }
                              onRemove={ () => onRemovePoll(index) }
                           />
                        );
                     })}
                  </div>
               </>
            ) : (
               <Text
                  inner={ `What’s up ${ user.name }?` }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  onClick={ () => setIsOpenEditor(true) }
                  style={ { color: '#727978', width: '100%' } }
               />
            )}
         </div>

         <div className='community__view__bottom__posts__news__right'>
            {isOpenEditor && (
               <Button
                  text='Close'
                  theme={ btnThemes.secondary }
                  onClick={ () => {
                     clear();
                     setIsOpenEditor(false);
                     if (onCancel) {
                        onCancel();
                     }
                  } }
                  style={ {
                     width: '77px', maxHeight: '36px', minHeight: '36px', fontSize: '12px', borderRadius: '12px', padding: '18px 38px', ...communitySecondaryButtonColors(community),
                  } }
               />
            )}
            <Button
               text={ editaBlePost?.id ? 'Save Post' : 'New Post' }
               disabled={ data.value?.length === 0 || data.title?.length === 0 }
               onClick={ () => handleSumbit() }
               style={ {
                  width: '77px', maxHeight: '36px', minHeight: '36px', fontSize: '12px', borderRadius: '12px', padding: '18px 38px', ...communityButtonColors(community),
               } }
            />
         </div>
      </div>
   );
};

CommunityPostTopCreate.propTypes = {
   user: PropTypes.object,
   community: PropTypes.object,
   roomId: PropTypes.number,
   communityId: PropTypes.any,
   createPost: PropTypes.func,
   openEditor: PropTypes.bool,
   onCancel: PropTypes.func,
   editaBlePost: PropTypes.object,
};

export default CommunityPostTopCreate;
