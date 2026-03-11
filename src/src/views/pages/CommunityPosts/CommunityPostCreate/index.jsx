import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Select from 'components/elements/SelectNew';
import PostEditor from 'components/modules/PostEditor';
import useAutosizeTextArea from 'utils/useAutosizeTextArea';
import UploadCover from 'components/elements/uploadCover';
import Button from 'components/elements/buttons/BaseButtonNew';
import CommunityPoll from 'views/pages/community/communityCommponents/CommunityPoll';
import { uniqueId } from 'lodash';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const CommunityPostCreateView = ({
   inputs, onChange, coursesOptions, communityId, handleRemoveMention,
   onSumbit, user, errorMessages,
}) => {
   const textAreaRef = useRef(null);
   useAutosizeTextArea(textAreaRef.current, inputs.title);
   const handleMention = (name, id) => {
      onChange('mentions', [
         ...inputs.mentions,
         { name, id },
      ]);
   };

   const handleAddPoll = (item) => {
      onChange('polls', [
         ...inputs.polls,
         item,
      ]);
   };

   const handleAddFile = (item) => {
      onChange('files', [
         ...inputs.files,
         item,
      ]);
   };
   const onChangePoll = (newPoll, index) => {
      const newPolls = inputs.polls;
      newPolls[index] = newPoll;
      onChange('polls', newPolls);
   };

   const onRemovePoll = (index) => {
      const newPolls = inputs.polls.filter((e, i) => {
         return index !== i;
      });
      onChange('polls', newPolls);
   };

   return (
      <div className='community__post__create'>
         <Text
            inner='Post Details'
            type={ types.medium160 }
            size={ sizes.xlarge }
         />
         {/* <Select
            options={ roomOptions }
            value={ inputs.roomId }
            label='Choose which room you want to place your post'
            placeholder='Select room'
            name='roomId'
            type='select-medium'
            onChange={ onChange }
         /> */}
         {/* <Select
            onChange={ onChange }
            options={ coursesOptions }
            value={ inputs.courseId }
            label='Link the post to a lesson or product (Optional)'
            type='select-medium'
            name='courseId'
            placeholder='Choose a product or lesson'
         />
         <div className='community__post__create__line' /> */}
         <UploadCover 
            cover={ inputs.cover }
            onChange={ onChange }
            hideMediaLibrary={ user.role !== 1 }
         />
         <ErrorMessageWrapper
            errorMessages={ [...errorMessages.title, ...errorMessages.value] }
         >
            <div className='community__post__create__editor'>
               <textarea
                  ref={ textAreaRef }
                  value={ inputs.title || '' }
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
                  value={ inputs.content }
                  addFileToState={ handleAddFile }
                  handleAddPoll={ handleAddPoll }
                  onChange={ onChange }
               />
            </div>
         </ErrorMessageWrapper>
         {inputs.polls.map((e, index) => {
            return (
               <CommunityPoll
                  key={ uniqueId() }
                  onChange={ (data) => onChangePoll(data, index) }
                  poll={ e }
                  onRemove={ () => onRemovePoll(index) }
               />
            );
         })}
         <div className='community__post__create__button'>
            <Button
               text='Post Now'
               onClick={ onSumbit }
            />
         </div>
      </div>
   );
};

CommunityPostCreateView.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   coursesOptions: PropTypes.array,
   communityId: PropTypes.number,
   handleRemoveMention: PropTypes.func,
   onSumbit: PropTypes.func,
   user: PropTypes.object,
   errorMessages: PropTypes.object,
};

export default CommunityPostCreateView;
