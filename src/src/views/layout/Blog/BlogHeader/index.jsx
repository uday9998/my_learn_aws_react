import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, {
} from 'components/elements/buttons/BaseButtonNew';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMob from 'containers/modules/siteheader/index.mob';
import SiteHeader from 'views/layout/SiteHeader';
import DropTriggle from 'components/elements/newDropTriggle';
import Router from 'routes/router';
import withLoading from 'utils/withLoading';

const BlogHeaderLoading = withLoading('div');

const BlogHeader = ({
   goTo, tooltip, title, startBlog, setDeleteModalIsOpen, createBlog, getBlogSettingsInProgress, setEditBlogHeader,
   editBlogHeader,
}) => {
   const openPreview = () => {
      window.open('/blog', '_blank');
   };


   return (
      <BlogHeaderLoading className='blogHeader' isLoading={ getBlogSettingsInProgress }>
         <MobileHeader>
            <SiteHeaderMob
               isLeftAction
               goToBack={ () => goTo(Router.route('ADMIN_DASHBOARD').getMask()) }
               title={ title }
            />
         </MobileHeader>
         <SiteHeader
            title={ title }
            tooltip={ tooltip }
            goBackTo={ editBlogHeader ? () => setEditBlogHeader(false) : false }
            right={ startBlog ? (
               <div className='blogHeader_btns'>
                  <div>
                     <BaseButton
                        text='Add New Article'
                        iconName='Plus'
                        isIconRight={ true }
                        onClick={ () => createBlog() }
                     //   disabled={ courses === null }
                     />
                  </div>
                  <div>
                     <DropTriggle
                        options={ [
                           {
                              trash: false, iconName: 'eyeM', name: 'Preview', onClick: () => { openPreview(); },
                           },
                           {
                              trash: false, iconName: 'toggleOffM', name: 'Turn Off the Blog', onClick: () => setDeleteModalIsOpen(true),
                           },
                        ] }
                        type='one'
                     />
                  </div>
               </div>
            ) : '' }
         />
      </BlogHeaderLoading>
   );
};

BlogHeader.propTypes = {
   goTo: PropTypes.func,
   tooltip: PropTypes.string,
   title: PropTypes.string,
   startBlog: PropTypes.bool,
   setDeleteModalIsOpen: PropTypes.func,
   createBlog: PropTypes.func,
   getBlogSettingsInProgress: PropTypes.bool,
   setEditBlogHeader: PropTypes.bool,
   editBlogHeader: PropTypes.bool,
};

export default BlogHeader;
