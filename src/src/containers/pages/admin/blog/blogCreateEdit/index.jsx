import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Container from 'views/layout/AdminContainer';
import BlogCreate from 'views/pages/Blog/BlogCreate';
// import BlogCreateHeader from 'views/layout/Blog/BlogCreateHeader';
// import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import './index.scss';
import * as selectors from 'state/modules/blog/selectors';
import * as operations from 'state/modules/blog/operations';
import withLoading from 'utils/withLoading';
import {
   setInput as setInputAction,
} from 'state/modules/blog/actions';
import getFormFields from 'utils/getFormfields';
import getDeff from 'utils/getDeff';
import moment from 'moment';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const BlogCreateLoading = withLoading(BlogCreate);

class BlogCreateEditContainer extends Component {
   static propTypes = {
      match: PropTypes.object,
      getBlogPost: PropTypes.func,
      goToBack: PropTypes.func,
      post: PropTypes.object,
      getBlogPostInProgress: PropTypes.bool,
      setInput: PropTypes.func,
      saveBlogPost: PropTypes.func,
      getBlogCategories: PropTypes.func,
      categories: PropTypes.array,
      getBlogCategoriesInProgress: PropTypes.bool,
      attachBlogCategories: PropTypes.func,
      addBlogCategory: PropTypes.func,
      authors: PropTypes.array,
      showFullScreenLoader: PropTypes.bool,
   };

   constructor(props) {
      super(props);
      this.currentTab = '';
      this.state = {
         tabName: '',
      };
      this.formKeys = {
         post: ['image_url', 'title', 'content', 'is_future_published', 'is_published', 'publish_date', 'seo_image', 'seo_description', 'seo_title', 'slug', 'subtitle', 'publish_time', 'author_id'],
      };
   }


   componentDidMount() {
      this.loadData();
   }

   loadData = async () => {
      const { getBlogPost, match } = this.props;
      const blogId = match.params.id;
      await getBlogPost(blogId, (post) => {
         this.formKeys.post.data = post;
      });
   };

   onSwitchTab = async (tabId) => {
      if (window.innerWidth < 1024) {
         this.setState({ tabName: tabId });
      }
   };

   handleInputChange = (name, value, target) => {
      const { setInput } = this.props;
      setInput(name, value, target);
   }

   handleSaveBlogPost = (activeTab) => {
      const { saveBlogPost, match, post } = this.props;
      const blogId = match.params.id;
      const keysArray = this.formKeys.post;
      const data = this.formKeys.post.data;
      const changedFields = getDeff(data, post);
      let formData = getFormFields(keysArray, changedFields);
      if (Object.getOwnPropertyNames(formData).length !== 0 || activeTab === 'visibility') {
         this.formKeys.post.data = post;

         if (formData.publish_date) {
            formData.publish_date = moment(formData.publish_date).format('YYYY-MM-DD');
         }
         if (!this.formKeys.post.data.slug) {
            formData = {};
         } else {
            return saveBlogPost(blogId, formData, activeTab);
         }
      }
   }

   handleGetBlogCategories = () => {
      const { getBlogCategories } = this.props;
      // getBlogCategories();
   }


   handleAttachCategories = (id, isAttach) => {
      const {
         categories,
         attachBlogCategories,
         post,
      } = this.props;
      const categoriesData = post.categories;
      let newData = {};
      if (isAttach) {
         const attachCategoryData = categories.filter(category => category.id === id);
         newData = [
            ...categoriesData,
            ...attachCategoryData,
         ];
      } else {
         const attachCategoryData = categoriesData.filter(category => category.id !== id);
         newData = [
            ...attachCategoryData,
         ];
      }
      const ids = newData.map(category => category.id);
      const newIdsData = {
         category_ids: [...ids],
      };
      attachBlogCategories(post.id, newData, newIdsData, isAttach, false);
   }

   handleAddCategory = (value) => {
      const {
         addBlogCategory,
         post,
      } = this.props;
      const newCategory = { name: value };
      const categoriesData = post.categories;
      const ids = categoriesData.map(category => category.id);
      addBlogCategory(post.id, newCategory, ids, true);
   }

   goToBack = () => {
      const { tabName } = this.state;
      const { goToBack } = this.props;
      if (tabName) {
         this.setState({ tabName: '' });
      } else {
         goToBack();
      }
   }

   tabNameSwitch = (tabName) => {
      let tabname = tabName;
      switch (tabname) {
         case 'post_details':
            tabname = 'Post Details';
            break;
         case 'seo_and_sharing':
            tabname = 'SEO and Sharing';
            break;
         default:
            tabname = tabName;
      }
      return tabname;
   }


   render() {
      const {
         post, getBlogPostInProgress, categories, getBlogCategoriesInProgress, authors, showFullScreenLoader
      } = this.props;
      const { tabName } = this.state;

      return (
         <>
            {
               showFullScreenLoader && (
                  <LoaderSpinner />
               )
            }
            <BlogCreateLoading
               isLoading={ getBlogPostInProgress }
               onSwitchTab={ this.onSwitchTab }
               post={ post }
               handleInputChange={ this.handleInputChange }
               handleSaveBlogPost={ this.handleSaveBlogPost }
               handleGetBlogCategories={ this.handleGetBlogCategories }
               getBlogCategoriesInProgress={ getBlogCategoriesInProgress }
               categories={ categories }
               attachCategories={ this.handleAttachCategories }
               detachCategories={ this.handleAttachCategories }
               attachedCategories={ post.categories }
               addCategory={ this.handleAddCategory }
               getBlogPostInProgress={ this.getBlogPostInProgress }
               tabName={ tabName }
               authors={ authors }
            />
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      showFullScreenLoader: selectors.showFullScreenLoaderSelector(state),
      getBlogPostInProgress: selectors.getBlogPostInProgressSelector(state),
      post: selectors.postSelector(state),
      authors: selectors.authorsSelector(state),
      updatedPost: selectors.updatedPostSelector(state),
      categories: selectors.categoriesSelector(state),
      getBlogCategoriesInProgress: selectors.getBlogCategoriesInProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_BLOG').getMask()));
      },
      getBlogPost: async (id, getPost) => {
         await dispatch(operations.getBlogPostOperation(id, getPost));
      },
      saveBlogPost: (id, data) => dispatch(operations.saveBlogPostOperation(id, data)),

      getBlogCategories: () => {
         dispatch(operations.getBlogCategoriesOperation());
      },
      attachBlogCategories: (blodId, data, newIdsData, isAttach) => {
         dispatch(operations.attachBlogCategoriesOperation(blodId, data, newIdsData, isAttach));
      },
      addBlogCategory: (blodId, data, idsData, isAdd) => {
         dispatch(operations.addBlogCategoryOperation(blodId, data, idsData, isAdd));
      },
      setInput: (key, value, target) => {
         dispatch(setInputAction(key, value, target));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(BlogCreateEditContainer);
