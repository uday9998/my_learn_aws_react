import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Line from 'components/elements/Line';
import { MyAccountContext } from 'containers/pages/member/account';
import SortButton from 'components/elements/buttons/SortButton';
import CommentTemplate from '../CommentTemplate';

const CommunityComments = ({
   comments, sortingType, onSort, handleCommentReply, onDeleteComment, handlePostCommentLike,
}) => {
   const { user } = React.useContext(MyAccountContext);
   const sortingOptions = {
      'recently': 'Recently Updated',
      'newest': 'Newest',
      'oldest': 'Oldest',
      'a_z': 'Name A-Z',
   };
   const filteredComments = comments.filter((e) => !e.parent_id);
   return (
      <div className='accout__community__comments'>
         <div className='accout__community__comments__top'>
            <Text
               inner={ `Comments (${ filteredComments.length })` }
               type={ types.regular160 }
               size={ sizes.large }
            />
            <SortButton
               type='first'
               onFilter={ (value) => onSort(value) }
               value={ sortingType }
               options={ sortingOptions }
            />
         </div>
         <Line />
         {filteredComments.map((e) => {
            return (
               <CommentTemplate
                  title={ e.text }
                  image={ e.user.picture_src || e.user.picture_full_src }
                  date={ e.created_at }
                  onReply={ (id, { text }) => handleCommentReply(e, text) }
                  description={ e.text }
                  onDelete={ onDeleteComment }
                  comment={ { ...e, description: e.text } }
                  onLike={ () => handlePostCommentLike(e.post_id, e.id) }
                  repliesCount={ e.childs.length }
                  adminImage={ user.picture_src || user.picture_full_src }
                  userId={ user && user.id }
               />
            );
         })}

      </div>
   );
};

CommunityComments.propTypes = {
   comments: PropTypes.array,
   sortingType: PropTypes.string,
   onSort: PropTypes.func,
   handleCommentReply: PropTypes.func,
   onDeleteComment: PropTypes.func,
   handlePostCommentLike: PropTypes.func,
};

export default CommunityComments;
