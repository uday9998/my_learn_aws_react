import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSizes } from 'components/elements/TextNew';
import Status from 'components/elements/statusNew';
import moment from 'moment';
import DeleteModal from 'components/elements/DeleteModal';
import Modal from 'components/elements/Modal';
import Router from 'routes/router';
import DropTriggle from 'components/elements/newDropTriggle';
import blog from 'assets/images/blog.png';
import CheckBox from 'components/elements/form/CheckBoxNew';
import ApproveModal from 'components/elements/ApproveModal';

const BlogCard = ({
   post, handleDeleteBlog, goTo, isChecked, onCheck, isMultiSelected, handleSaveBlogCardStatus,
}) => {
   const [deleteBlogModalIsOpen, setDeleteBlogModalIsOpen] = useState(false);
   const [openDateModal, setOpenDateModal] = useState(false);

   const [blogId, setBLogId] = useState(0);
   const delBlogModalClick = (id) => {
      setBLogId(id);
      setDeleteBlogModalIsOpen(true);
   };

   const openPreview = () => {
      const win = window.open(`/blog/${ post.slug }`, '_blank');
      win.blog = post;
      return win;
   };

   const forCopyRef = useRef([
      {
         trash: false, iconName: 'eyeM', name: 'Preview', onClick: () => { openPreview(); },
      },
      {
         trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => { goTo(`${ Router.route('ADMIN_BLOG_EDIT').getCompiledPath({ id: post.id }) }#post_details`); },
      },


   ]);
   const toggleItems = useRef([]);


   const delBlogModalApproveClick = () => {
      handleDeleteBlog(blogId);
      setDeleteBlogModalIsOpen(false);
   };

   const statusType = () => {
      let statusText = '';
      let type = '';
      let icon = '';
      switch (post.is_published) {
         case 0: statusText = 'Draft'; type = 'draft'; icon = 'draftS';
            break;
         case 1: statusText = 'Published'; type = 'publish'; icon = 'publishS';
            break;
         case 2: if (post.publish_date) { statusText = `To be published ${ moment(post.publish_date).format('MMMM DD, YYYY') } ${ moment(post.publish_time || '0:0:0', ['HH:mm:ss']).format('hh:mm:ss A') }`; type = 'calendar'; icon = 'calendarS'; } else { statusText = 'Draft'; type = 'draft'; icon = 'draftS'; }
            break;
         default:
      }
      return { statusText, type, icon };
   };
   if (post.is_published) {
      toggleItems.current = [
         {
            trash: false, iconName: 'archiveM', name: 'Move to Draft', onClick: () => { handleSaveBlogCardStatus(post.id, { is_published: 0 }); },
         },
      ];
   } else {
      toggleItems.current = [
         {
            trash: false, iconName: 'publishM', name: 'Publish', onClick: () => { handleSaveBlogCardStatus(post.id, { is_published: 1 }); },
         },
         {
            trash: false, iconName: 'calendarM', name: 'Set Publishing Date', onClick: () => { setOpenDateModal(true); },
         },
      ];
   }


   return (
      <div className='blogCard'>
         <div className={ isChecked ? 'blogCard_img blogCard_img_isChecked' : 'blogCard_img' }>
            <img src={ post.image_url || blog } alt='post' />
            {isMultiSelected && (
               <CheckBox
                  checked={ isChecked }
                  onChange={ () => onCheck(!isChecked) }
               />
            )}
         </div>
         <div className='blogCard_content'>
            <div className='blogCard_status'>
               <div>
                  <Status text={ statusType().statusText } type={ statusType().type } icon={ statusType().icon } />
               </div>
               <div>
                  <DropTriggle options={ [
                     ...forCopyRef.current,
                     ...toggleItems.current,
                     {
                        trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => { delBlogModalClick(post.id); },
                     },
                  ] }
                  />
               </div>
            </div>
            <div className='blogCard_line' />
            <div className='blogCard_title'>
               <Text
                  type={ textType.medium153 }
                  size={ textSizes.large }
                  inner={ post.title }
               />
            </div>
            {post.subtitle && (
               <div className='blogCard_subtitle'>
                  <Text
                     type={ textType.regularDefault145 }
                     size={ textSizes.small }
                     inner={ post.subtitle }
                  />
               </div>
            )}
            <div className='blogCard_date'>
               <div>
                  <Text
                     type={ textType.regularDefaultGrey }
                     size={ textSizes.small }
                     inner='Creation Date:'
                  />
               </div>
               <div>
                  <Text
                     type={ textType.regularDefault }
                     size={ textSizes.small }
                     inner={ moment(post.created_at).format('DD MMM, YYYY') }
                  />
               </div>
            </div>
            <div>
               {post.author
            && (
               <div className='blogCard__author__content'>
                  <img src={ post.author.picture_src || blog } alt='auhtor' className='blogCard__author__img' />
                  <div>
                     <Text
                        type={ textType.regularDefault }
                        size={ textSizes.small }
                        inner={ post.author.name }
                     />
                  </div>
               </div>

            )
               }
            </div>

            {/* <div className='actions'>
               <div className='edit' role='presentation' onClick={ () => { goTo(`${ Router.route('ADMIN_BLOG_EDIT').getCompiledPath({ id: post.id }) }#post_details`); } }>
                  <Icon name='EditItem' />
               </div>
               <div className='delete' onClick={ () => delBlogModalClick(post.id) } role='presentation'>
                  <Icon name='DeleteItem' />
               </div> */}
            {/* <a href={ `${ Router.route('BLOG_PREVIEW').getCompiledPath({ id: post.slug }) }` } target='_blank' rel='noopener noreferrer'>
                  <BaseButton
                     theme={ btnTheme.lightBlue }
                     size={ btnSizes.medium }
                     text='Preview'
                     onClick={ () => {} }
                  />
               </a> */}
            {/* </div> */}
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
                     <DeleteModal
                        title='Are you sure you want to delete this blog?'
                        deleteText='Delete'
                        cancelBtnSize='large120'
                        maxWidth={ 465 }
                        onDelete={ () => { delBlogModalApproveClick(false); } }
                        onCancel={ () => setDeleteBlogModalIsOpen(false) }
                     />
                  </div>
               </Modal>
            )
         }
         {openDateModal && (
            <ApproveModal
               title='Date of publication'
               btnText='Save Publication Date'
               onApprove={ (data) => { handleSaveBlogCardStatus(post.id, data); setOpenDateModal(false); } }
               onCancel={ () => setOpenDateModal(false) }
               isBlogDate={ true }
            />
         )}
      </div>
   );
};

BlogCard.propTypes = {
   post: PropTypes.object,
   handleDeleteBlog: PropTypes.func,
   goTo: PropTypes.func,
   isChecked: PropTypes.bool,
   onCheck: PropTypes.func,
   isMultiSelected: PropTypes.bool,
   handleSaveBlogCardStatus: PropTypes.func,
};

export default BlogCard;
