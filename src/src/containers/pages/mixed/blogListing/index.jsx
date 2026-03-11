import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import BlogListing from 'views/pages/Blog/BlogFront/blogListing';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import * as selectors from 'state/modules/blogFront/selectors';
import * as operations from 'state/modules/blogFront/operations';
import { siteInfoSelector } from 'state/modules/common/selectors';
import MultiLang from 'utils/MultiLang/MultiLang';


class BlogListingContainer extends Component {
   static propTypes = {
      getFrontBlog: PropTypes.func,
      blogFront: PropTypes.array,
      getFrontBlogInProgress: PropTypes.bool,
      siteInfo: PropTypes.object,
      blogSettingsFront: PropTypes.object,
      getFrontBlogSettings: PropTypes.func,
      getFrontBlogSettingsInProgress: PropTypes.bool,
      categoriesFront: PropTypes.array,
      history: PropTypes.object,
   };

   constructor(props) {
      super(props);
      this.state = {
         searchValue: '',
         isSearch: false,
         params: [],
      };
   }


   async componentDidMount() {
      const {
         getFrontBlog, getFrontBlogSettings, history, siteInfo,
      } = this.props;
      if (siteInfo.favicon) {
         document.querySelector("link[rel*='icon']").href = siteInfo.favicon;
      }
      const path = history.location.search;
      let catId = path && path.split('?category=')[1];
      catId = parseInt(catId, 10);
      if (catId) {
         await getFrontBlog([{ category_id: catId }]);
      } else {
         await getFrontBlog();
      }
      await getFrontBlogSettings();
   }

   setSearchValue = (value) => {
      const { getFrontBlog } = this.props;
      const { params } = this.state;
      this.setState({ searchValue: value, isSearch: true });
      getFrontBlog(params, { searchValue: value });
   }

   onClearSearch = () => {
      this.setState({ isSearch: false, searchValue: '' });
      const { params } = this.state;
      const { getFrontBlog } = this.props;
      getFrontBlog(params, { searchValue: '' });
   }


   handleBlogByCategory = (params) => {
      this.setState({ params });
      const { getFrontBlog } = this.props;
      const { history } = this.props;
      getFrontBlog(params);
      if (params) {
         history.push(`/blog?category=${ params[0].category_id }`);
      } else {
         history.push('/blog');
      }
   }


   render() {
      const {
         blogFront, getFrontBlogInProgress, siteInfo, blogSettingsFront,
         getFrontBlogSettingsInProgress, categoriesFront,
      } = this.props;
      const { searchValue, isSearch } = this.state;
      return (
         <MultiLang>
            <BlogListing
               isLoading={ getFrontBlogInProgress }
               blogFront={ blogFront }
               siteInfo={ siteInfo }
               blogSettingsFront={ blogSettingsFront }
               getFrontBlogSettingsInProgress={ getFrontBlogSettingsInProgress }
               categoriesFront={ categoriesFront }
               handleBlogByCategory={ this.handleBlogByCategory }
               searchValue={ searchValue }
               isSearch={ isSearch }
               setSearchValue={ this.setSearchValue }
               onClearSearch={ this.onClearSearch }
            />
         </MultiLang>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      getFrontBlogInProgress: selectors.getFrontBlogInProgressSelector(state),
      blogFront: selectors.blogFrontSelector(state),
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
      getFrontBlog: async (params, search) => {
         await dispatch(operations.getFrontBlogOperation(params, search));
      },
      getFrontBlogSettings: async () => {
         await dispatch(operations.getFrontBlogSettingsOperation());
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(BlogListingContainer);
