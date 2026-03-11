import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BlogPreview from 'views/pages/Blog/BlogFront/blogPreview';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import * as selectors from 'state/modules/blogFront/selectors';
import * as operations from 'state/modules/blogFront/operations';
import withLoading from 'utils/withLoading';
import { siteInfoSelector } from 'state/modules/common/selectors';
import MultiLang from 'utils/MultiLang/MultiLang';

const BlogPreviewLoading = withLoading(BlogPreview);

class BlogPreviewContainer extends Component {
   static propTypes = {
      getFrontBlogPost: PropTypes.func,
      match: PropTypes.object,
      postFront: PropTypes.object,
      getFrontBlogPostInProgress: PropTypes.bool,
      getFrontBlogSettingsInProgress: PropTypes.bool,
      blogSettingsFront: PropTypes.object,
      getFrontBlogSettings: PropTypes.func,
      categoriesFront: PropTypes.array,
      history: PropTypes.object,
      siteInfo: PropTypes.object,
   };

   async componentDidMount() {
      const {
         getFrontBlogPost, getFrontBlogSettings, match, siteInfo,
      } = this.props;
      if (siteInfo.favicon) {
         document.querySelector("link[rel*='icon']").href = siteInfo.favicon;
      }
      const blogSlug = match.params.id;
      await getFrontBlogPost(blogSlug);
      await getFrontBlogSettings();
   }


   componentWillUnmount() {
      document.querySelector("link[rel*='icon']").href = '/favicon.ico';
   }

   handleBlogByCategory = (params) => {
      const { history } = this.props;
      if (params) {
         history.push(`/blog?category=${ params[0].category_id }`);
      } else {
         history.push('/blog');
      }
   }


   render() {
      const {
         postFront, getFrontBlogPostInProgress, getFrontBlogSettingsInProgress, blogSettingsFront, categoriesFront,
         siteInfo,
      } = this.props;
      return (
         <MultiLang>
            <BlogPreviewLoading
               isLoading={ getFrontBlogPostInProgress }
               postFront={ postFront }
               getFrontBlogSettingsInProgress={ getFrontBlogSettingsInProgress }
               blogSettingsFront={ blogSettingsFront }
               categoriesFront={ categoriesFront }
               handleBlogByCategory={ this.handleBlogByCategory }
               siteInfo={ siteInfo }
            />
         </MultiLang>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      getFrontBlogPostInProgress: selectors.getFrontBlogPostInProgressSelector(state),
      postFront: selectors.postFrontSelector(state),
      blogSettingsFront: selectors.blogSettingsFrontSelector(state),
      getFrontBlogSettingsInProgress: selectors.getFrontBlogSettingsInProgressSelector(state),
      categoriesFront: selectors.categoriesFrontSelector(state),
      siteInfo: siteInfoSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      getFrontBlogPost: async (id) => {
         await dispatch(operations.getFrontBlogPostOperation(id));
      },
      getFrontBlogSettings: async () => {
         await dispatch(operations.getFrontBlogSettingsOperation());
      },
      getFrontBlog: (params) => {
         dispatch(operations.getFrontBlogOperation(params));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(BlogPreviewContainer);
