import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Line from 'components/elements/Line';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { MyAccountContext } from 'containers/pages/member/account';
import { useMutliSelect } from 'utils/useMultiSelect';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import CommentTemplate from '../../../Communities/Components/CommentTemplate';

const CommentsView = ({
   course, onDelete, like, reply, filterComments,
}) => {
   const [search, setSearch] = React.useState('');
   const comments = course.lessons.reduce((prev, next) => {
      return [...prev, ...next.lesson_comments];
   }, []);
   const [ids, onCheck, onCheckAll, setIds] = useMutliSelect(comments);
   const [isOpenMultiDeleteModal, setIsOpenMultiDeleteModal] = useState(false);
   const { user } = React.useContext(MyAccountContext);
   const handleDelete = (id, isReply) => {
      onDelete([id], () => {
         if (!isReply && ids.includes(id)) {
            setIds(ids.filter((e) => e !== id));
         }
      }, isReply);
   };

   const handleMultiDelete = () => {
      onDelete(ids, () => {
         setIds([]);
      }, false);
   };
   return (
      <div className='comments__view'>
         {isOpenMultiDeleteModal && (
            <DeleteModal
               title='Are you sure you want to delete the selected comments?'
               deleteText='Delete'
               maxWidth={ 414 }
               cancelBtnSize='large120'
               onDelete={ () => {
                  handleMultiDelete();
                  setIsOpenMultiDeleteModal(false);
               } }
               onCancel={ () => setIsOpenMultiDeleteModal(false) }
            />
         )}
         <Input
            type='search'
            value={ search }
            onChange={ (name, value) => {
               setSearch(value);
               filterComments(value);
            } }
            placeholder='Search'
         />
         <Line />
         <div className='comments__view__top'>
            <div className='comments__view__checkbox'>
               <CheckBox
                  checked={ ids.length > 0 }
                  onChange={ () => onCheckAll() }
               />
               <div>
                  <Text
                     inner='Select all'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner={ `(${ comments.length })` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
            </div>
            {ids.length > 0 && (
               <IconButton
                  name='DeleteCommentM'
                  onClick={ () => setIsOpenMultiDeleteModal(ids.length > 0) }
               />
            )}
         </div>
         <Line />
         <div className='comments__view__data'>
            {comments.length !== 0 ? comments.map((e) => {
               return (
                  <CommentTemplate
                     title={ user.name }
                     date={ e.created_at }
                     comment={ e }
                     id={ e.id }
                     onDelete={ handleDelete }
                     onReply={ (id, text) => {
                        reply(course.lessons.find((lesson) => lesson.id === e.lesson_id), text.text, id);
                     } }
                     onLike={ (id) => like(id) }
                     repliesCount={ e.childs.length }
                     isReplyHaveLike={ true }
                     isChecked={ ids.includes(e.id) }
                     onCheck={ () => onCheck(e.id) }
                     adminImage={ user.picture_src || user.picture_full_src }
                     image={ user.picture_src || user.picture_full_src }
                     description={ e.text }
                  />
               );
            }) : (
               <div className='comments__view__data__empty'>
                  <Text
                     inner='No comments yet.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
            )}
         </div>
      </div>
   );
};

CommentsView.propTypes = {
   course: PropTypes.object,
   onDelete: PropTypes.func,
   like: PropTypes.func,
   filterComments: PropTypes.func,
   reply: PropTypes.func,
};

export default CommentsView;
