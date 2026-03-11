import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import moment from 'moment';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import Modal from 'components/elements/Modal';
import Router from 'routes/router';

const BlogItem = ({ post, handleDeleteBlog, goTo }) => {
   const [deleteBlogModalIsOpen, setDeleteBlogModalIsOpen] = useState(false);
   const [blogId, setBLogId] = useState(0);

   const delBlogModalClick = (id) => {
      setBLogId(id);
      setDeleteBlogModalIsOpen(true);
   };

   const delBlogModalApproveClick = () => {
      handleDeleteBlog(blogId);
      setDeleteBlogModalIsOpen(false);
   };
   return (
      <div className='blog__item'>
         <div className='blog_table_content'>
            <div className='blogTitle'>
               <Text
                  type={ textType.bold }
                  size={ textSizes.extraSmall }
                  inner={ post.title }
               />
            </div>
            <div>
               <Text
                  type={ textType.regular }
                  size={ textSizes.extraSmall }
                  inner={ post.publish_date === null ? '-' : moment(post.publish_date).format('MM-DD-YYYY') }
                  // HH:mm:ss
               />
            </div>
            <div>
               <Text
                  type={ textType.regular }
                  size={ textSizes.extraSmall }
                  inner={ moment(post.created_at).format('MM-DD-YYYY') }
               />
            </div>
            <div className='actions'>
               <div className='edit' role='presentation' onClick={ () => { goTo(`${ Router.route('ADMIN_BLOG_EDIT').getCompiledPath({ id: post.id }) }#post_details`); } }>
                  <Icon name='EditItem' />
               </div>
               <div className='delete' onClick={ () => delBlogModalClick(post.id) } role='presentation'>
                  <Icon name='DeleteItem' />
               </div>
               <a href={ `${ Router.route('BLOG_PREVIEW').getCompiledPath({ id: post.slug }) }` } target='_blank' rel='noopener noreferrer'>
                  <BaseButton
                     theme={ btnTheme.lightBlue }
                     size={ btnSizes.medium }
                     text='Preview'
                     onClick={ () => {} }
                  />
               </a>
            </div>
         </div>
         {
            deleteBlogModalIsOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                  onClose={ () => setDeleteBlogModalIsOpen(false) }
               >
                  <div>
                     <DeleteModalContent
                        onCancel={ () => setDeleteBlogModalIsOpen(false) }
                        onApprove={ () => delBlogModalApproveClick() }
                        title='Delete Blog'
                        content='Are you sure you want to delete this blog?'
                     />
                  </div>
               </Modal>
            )
         }
      </div>
   );
};

BlogItem.propTypes = {
   post: PropTypes.object,
   handleDeleteBlog: PropTypes.func,
   goTo: PropTypes.func,
};

export default BlogItem;
