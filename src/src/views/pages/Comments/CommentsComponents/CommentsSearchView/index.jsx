import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { uniqueId } from 'lodash';
import './index.scss';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import DeleteButton from 'components/elements/buttons/RemoveButton';
import DeleteModal from 'components/elements/DeleteModal';
import EmptyView from 'components/elements/EmptyView';
import IconNew from 'components/elements/iconsSize';
import CommentTemplate from '../CommentTemplate';

const CommentsSearchView = ({
   data, onFeed, handleCheck, onCheckAll, checkedCommentIds, userImage,
   deleteComment, restoreComment, markComment, activeTab, search, onReply, courseId,
   userId, openMemberProfile, openAdminProfile,
}) => {
   const [isOpenBulkDelete, setIsOpenBulkDelete] = useState(false);
   if (!data.length) {
      return (
         <div className='comments__search__view'>
            <Text
               inner='Found in results'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
            <div className='comments__list__empty comments__list__search__empty'>
               <IconNew name='CommentsEmptyM' />
               <div>
                  <Text
                     inner="Hmm, it looks like we didn't"
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner='find anything.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
            </div>
         </div>
      );
   }
   return (
      <div className='comments__search__view'>
         <Text
            inner='Found in results'
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { color: '#727978' } }
         />
         {isOpenBulkDelete && (
            <DeleteModal
               title='Are you sure you want to delete the selected comment?'
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  deleteComment([...checkedCommentIds]);
                  setIsOpenBulkDelete(false);
               } }
               onCancel={ () => setIsOpenBulkDelete(false) }
            />
         )}
         <div className='comments__search__view__check'>
            <div className='comments__search__view__check__all'>
               <CheckBox
                  checked={ data.length === checkedCommentIds.length }
                  onChange={ () => onCheckAll(data.length === checkedCommentIds.length, data) }
               />
               <span>
                  <Text
                     inner='Select all'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner={ ` (${ data.length })` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </span>
            </div>
            <div className='comments__search__view__check__actions'>
               {activeTab === 'unread' && checkedCommentIds.length > 0 && (
                  <Button
                     iconName='MarkCommentM'
                     text='Make As Read'
                     theme={ themes.secondary }
                     isIconRight={ true }
                     onClick={ () => markComment([...checkedCommentIds]) }
                  />
               )}
               {activeTab !== 'deleted' && data.length === checkedCommentIds.length && (
                  <DeleteButton
                     onClick={ () => setIsOpenBulkDelete(!isOpenBulkDelete) }
                  />
               )}
               {activeTab === 'deleted' && data.length === checkedCommentIds.length && (
                  <Button
                     iconName='RestoreCommentM'
                     text='Restore'
                     theme={ themes.secondary }
                     isIconRight={ true }
                     onClick={ () => restoreComment([...checkedCommentIds]) }
                  />
               )}
            </div>
         </div>
         <div className='comments__search__view__line' />
         <div className='comments__search__view__flex'>
            {data.map((item) => {
               return (
                  <CommentTemplate
                     title={ item.user.name }
                     comment={ item }
                     key={ uniqueId() }
                     image={ item.user.picture_src ? item.user.picture_src : item.user.picture_full_src }
                     isHidenActions={ checkedCommentIds.length > 0 }
                     date={ item.created_at }
                     isChecked={ checkedCommentIds.includes(item.id) }
                     onCheck={ handleCheck }
                     repliesCount={ item.childs_count || 0 }
                     id={ item.id }
                     activeTab={ activeTab }
                     adminImage={ userImage }
                     courseId={ courseId }
                     onDelete={ (id) => deleteComment([id]) }
                     onFeed={ (id) => onFeed(id) }
                     onRestore={ (id) => restoreComment([id]) }
                     description={ item.text }
                     onReply={ onReply }
                     openAdminProfile={ openAdminProfile }
                     isFromSearch={ true }
                     search={ search }
                     titleClick={ () => openMemberProfile(item.user.id) }
                     isAdminComment={ userId === item.user.id }
                  />
               );
            })}
         </div>
      </div>
   );
};

CommentsSearchView.propTypes = {
   data: PropTypes.array,
   onCheckAll: PropTypes.func,
   userImage: PropTypes.string,
   onFeed: PropTypes.func,
   handleCheck: PropTypes.func,
   activeTab: PropTypes.string,
   checkedCommentIds: PropTypes.array,
   deleteComment: PropTypes.func,
   restoreComment: PropTypes.func,
   markComment: PropTypes.func,
   onReply: PropTypes.func,
   courseId: PropTypes.number,
   search: PropTypes.string,
   userId: PropTypes.number,
   openMemberProfile: PropTypes.func,
   openAdminProfile: PropTypes.func,
};

export default CommentsSearchView;
