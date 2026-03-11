import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { uniqueId } from 'lodash';
import DeleteButton from 'components/elements/buttons/RemoveButton';
import DeleteModal from 'components/elements/DeleteModal';
import EmptyView from 'components/elements/EmptyView';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import SortButton from 'components/elements/buttons/SortButton';
import CommentTemplate from '../CommentTemplate';

const CommentsList = ({
   data, onSort, sortingVersion, handleCheck, onCheckAll, checkedCommentIds, activeTab,
   userImage, onFeed, deleteComment, restoreComment, markComment, onReply, courseId,
   userId, openMemberProfile, openAdminProfile,
}) => {
   const [isOpenBulkDelete, setIsOpenBulkDelete] = useState(false);

   const { isMobile } = useWindowSizeChange();

   const sortOptions = {
      Newest: 'Oldest',
      Oldest: 'Newest',
   };

   if (!data.length) {
      return (
         <div className='comments__list comments__list__none'>
            <div className='comments__list__top'>
               <Text
                  inner='Comments'
                  type={ types.regular160 }
                  size={ sizes.xlarge }
               />
               <div className='comments__list__line' />
            </div>
            <div className='comments__list__empty'>
               <EmptyView
                  subTitle='No comments yet'
                  title='Wait until your students leave their comments'
               />
            </div>
         </div>
      );
   }
   return (
      <div className='comments__list'>
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
         <div className='comments__list__top'>
            <Text
               inner='Comments'
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
            {/* <Button
               iconName='ReorderM'
               isIconRight={ true }
               text={ `Sort By: ${ sortingVersion }` }
               onClick={ () => onSort() }
               theme={ themes.secondary }
            /> */}
            <SortButton
               value={ sortingVersion }
               onFilter={ (value) => onSort(value) }
               options={ sortOptions }
            />
         </div>
         <div className='comments__list__line' />
         <div className='comments__list__checks'>
            <div className='comments__list__checks__all'>
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
            <div className='comments__list__checks__actions'>
               {activeTab === 'unread' && checkedCommentIds.length > 0 && (
                  <Button
                     iconName='MarkCommentM'
                     text='Mark as Read'
                     theme={ themes.secondary }
                     isIconRight={ true }
                     onClick={ () => markComment([...checkedCommentIds]) }
                  />
               )}
               {activeTab !== 'deleted' && checkedCommentIds.length > 0 && (
                  <DeleteButton
                     onClick={ () => setIsOpenBulkDelete(!isOpenBulkDelete) }
                     style={ {
                        fontSize: '16px',
                     } }
                  />
               )}
               {activeTab === 'deleted' && checkedCommentIds.length > 0 && (
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
         <div className='comments__list__line' />
         <div className='comments__list__flex'>
            {data.map((item) => {
               return (
                  <CommentTemplate
                     title={ item.user.name }
                     key={ uniqueId() }
                     comment={ item }
                     image={ item.user.picture_src ? item.user.picture_src : item.user.picture_full_src }
                     isHidenActions={ checkedCommentIds.length > 0 }
                     date={ item.created_at }
                     isChecked={ checkedCommentIds.includes(item.id) }
                     onCheck={ handleCheck }
                     repliesCount={ item.childs_count || 0 }
                     courseId={ courseId }
                     id={ item.id }
                     activeTab={ activeTab }
                     openAdminProfile={ openAdminProfile }
                     titleClick={ () => openMemberProfile(item.user.id) }
                     isAdminComment={ userId === item.user.id }
                     onReply={ onReply }
                     adminImage={ userImage }
                     onDelete={ (id) => deleteComment([id]) }
                     onFeed={ (id) => onFeed(id) }
                     onRestore={ (id) => restoreComment([id]) }
                     description={ item.text }
                  />
               );
            })}
         </div>
      </div>
   );
};

CommentsList.propTypes = {
   data: PropTypes.array,
   onSort: PropTypes.func,
   checkedCommentIds: PropTypes.array,
   openMemberProfile: PropTypes.func,
   openAdminProfile: PropTypes.func,
   activeTab: PropTypes.string,
   sortingVersion: PropTypes.string,
   handleCheck: PropTypes.func,
   courseId: PropTypes.string,
   userImage: PropTypes.string,
   onCheckAll: PropTypes.func,
   onFeed: PropTypes.func,
   deleteComment: PropTypes.func,
   restoreComment: PropTypes.func,
   userId: PropTypes.number,
   markComment: PropTypes.func,
   onReply: PropTypes.func,
};

export default CommentsList;
