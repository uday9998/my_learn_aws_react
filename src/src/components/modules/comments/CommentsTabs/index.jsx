import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Tab from 'components/elements/tabs';

const CommentsTabs = ({ TabConsumer, commentsCount }) => {
   const { activeTab, switchTab } = TabConsumer;
   const tabs = [
      {
         key: 'Unread', value: 'unread', iconName: 'UnreadCommentsM', commentsCount: commentsCount.unread,
      },
      {
         key: 'Read', value: 'read', iconName: 'ReadCommentsM', commentsCount: commentsCount.read,
      },
      // {
      //    key: 'Mentioned', value: 'mentioned', iconName: 'MentionedCommentsM', commentsCount: commentsCount.mentioned,
      // },
      // {
      //    key: 'Reported', value: 'reported', iconName: 'ReportedCommentsM', commentsCount: commentsCount.reported,
      // },
      {
         key: 'Deleted', value: 'deleted', iconName: 'DeletedCommentsM', commentsCount: commentsCount.deleted,
      },
   ];

   return (
      <div className='comments___tabs'>
         <Tab
            variants={ tabs }
            selectedVariant={ activeTab }
            isButton={ false }
            hasIcon={ true }
            onSelect={ (value) => switchTab(value) }
         />
      </div>
   );
};

CommentsTabs.propTypes = {
   TabConsumer: PropTypes.object,
   commentsCount: PropTypes.object,
};

export default CommentsTabs;
