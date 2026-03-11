import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import IconButton, { THEMES as iconButtonThems } from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import ReplyComment from 'components/elements/ReplyComment';
import moment from 'moment';
import SearchText from 'components/elements/searchText';

const CommentTemplate = ({
   title, image, date, description, comment,
   repliesCount, onReply, onFeed, onDelete, search, isFromSearch,
   isChecked, onCheck, id, adminImage, activeTab, onRestore, isHidenActions, courseId,
   isAdminComment, titleClick, openAdminProfile,
}) => {
   const [isOpenReply, setIsOpenReply] = useState(false);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   return (
      <div className='comment__template'>
         {isOpenDeleteModal && (
            <DeleteModal
               title={ `Are you sure you want to delete the [${ title }] comment?` }
               deleteText='Delete'
               cancelBtnSize='large120'
               onDelete={ () => {
                  onDelete(id);
                  setIsOpenDeleteModal(false);
               } }
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         <div className='comment__template__left'>
            <CheckBox
               checked={ isChecked }
               onChange={ () => onCheck(isChecked, id) }
            />
         </div>
         <div className='comment__template__right'>
            <div className='comment__template__right__top'>
               <div className='comment__template__right__top__left'>
                  <img src={ image } alt='' />
                  <div className='comment__template__right__top__left__right'>
                     {isAdminComment ? (
                        <Text
                           inner={ title }
                           type={ types.mediumLarge }
                           style={ { cursor: 'pointer' } }
                           onClick={ () => openAdminProfile(id) }
                           size={ sizes.small }
                        />
                     ) : (
                        <Text
                           inner={ title }
                           style={ { cursor: 'pointer' } }
                           onClick={ () => titleClick() }
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     )}
                     <Text
                        inner={ moment(date).format('MMM D / HH:mm a') }
                        type={ types.regular148 }
                        style={ { color: '#727978' } }
                        size={ sizes.xsmall }
                     />
                  </div>
               </div>
               {!isHidenActions && (
                  <div className='comment__template__right__top__right'>
                     {activeTab === 'deleted' ? (
                        <IconButton
                           name='RestoreCommentM'
                           theme={ iconButtonThems.primary }
                           onClick={ () => onRestore(id) }
                        />
                     ) : (
                        <>
                           {repliesCount !== 0 && !comment.parent_id && (
                              <IconButton
                                 name='EyeCommentM'
                                 theme={ iconButtonThems.primary }
                                 onClick={ () => onFeed(id) }
                              />
                           )}
                           {!comment.parent_id && (
                              <IconButton
                                 theme={ iconButtonThems.inherit }
                                 name='DeleteCommentM'
                                 onClick={ () => setIsOpenDeleteModal(true) }
                              />
                           )}
                        </>
                     )}
                  </div>
               )}
            </div>
            <div className='comment__template__right__content'>
               {isFromSearch ? (
                  <SearchText
                     textProps={ {
                        inner: description,
                        type: types.regularDefault,
                        size: sizes.small,
                     } }
                     searchText={ search }
                     activeColor='rgba(0,176,255,0.2)'
                  />
               ) : (
                  <>
                     {(activeTab === 'mentioned' && comment.text_with_mentions) ? (
                        <div dangerouslySetInnerHTML={ { __html: `<span>${ comment.text_with_mentions }</span>` } } />
                     ) : (
                        <Text
                           inner={ description }
                           size={ sizes.small }
                           type={ types.regularDefault }
                        />
                     )}
                  </>
               )}
            </div>
            {!isHidenActions && (
               <div className='comment__template__right__actions'>
                  <div className='comment__template__right__actions__left'>
                     {activeTab !== 'deleted' && !comment.parent_id && (
                        <TextWithIcon
                           iconName='ReplyCommentM'
                           inner='reply'
                           type={ types.select }
                           size={ sizes.small }
                           generalStyles={ {
                              cursor: 'pointer',
                              //  background: isOpenReply ? '#A6C9C5' : 'inherit',
                              borderRadius: '4px',
                              gap: '6px',
                           } }
                           onClick={ () => setIsOpenReply(!isOpenReply) }
                           style={ { color: '#24554E' } }
                        />
                     )}
                     {(repliesCount !== 0 && !comment.parent_id) && (
                        <TextWithIcon
                           iconName='FeedCommentM'
                           inner='Show Feed'
                           type={ types.select }
                           size={ sizes.small }
                           generalStyles={ {
                              cursor: 'pointer',
                              gap: '6px',
                           } }
                           onClick={ () => onFeed(id) }
                           style={ { color: '#24554E' } }
                        />
                     )}
                  </div>
                  <Text
                     inner={ `${ repliesCount } replies` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978', cursor: 'pointer' } }
                     onClick={ (repliesCount !== 0 && !comment.parent_id) ? () => onFeed(id) : () => {} }
                  />
               </div>
            )}
            {isOpenReply && (
               <ReplyComment
                  image={ adminImage }
                  onCancel={ () => setIsOpenReply(false) }
                  onReply={ (text) => onReply(id, text) }
                  courseId={ courseId }
               />
            )}
         </div>
      </div>
   );
};

CommentTemplate.propTypes = {
   title: PropTypes.string,
   image: PropTypes.string,
   date: PropTypes.string,
   description: PropTypes.string,
   repliesCount: PropTypes.any,
   onReply: PropTypes.func,
   onFeed: PropTypes.func,
   onDelete: PropTypes.func,
   openAdminProfile: PropTypes.func,
   isChecked: PropTypes.bool,
   onCheck: PropTypes.func,
   id: PropTypes.number,
   adminImage: PropTypes.string,
   onRestore: PropTypes.func,
   isAdminComment: PropTypes.bool,
   activeTab: PropTypes.string,
   isHidenActions: PropTypes.bool,
   isFromSearch: PropTypes.func,
   search: PropTypes.string,
   courseId: PropTypes.number,
   comment: PropTypes.object,
   titleClick: PropTypes.func,
};

export default CommentTemplate;
