import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Blog from 'views/pages/Blog';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import * as selectors from 'state/modules/blog/selectors';
import * as operations from 'state/modules/blog/operations';
import {
   setInput as setInputAction,
} from 'state/modules/blog/actions';
import getFormFields from 'utils/getFormfields';
import getDeff from 'utils/getDeff';
import * as blogselectors from 'state/modules/blogFront/selectors';
import * as blogoperations from 'state/modules/blogFront/operations';
import Container from 'views/layout/AdminContainer';
import BlogHeader from 'views/layout/Blog/BlogHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import withLoading from 'utils/withLoading';
import DeleteModal from 'components/elements/DeleteModal';
import moment from 'moment';
import MobileHeader from 'views/layout/MobileHeader';

const BlogLoading = withLoading(Blog);

class BlogContainer extends Component {
   static propTypes = {
      blog: PropTypes.array,
      getBlog: PropTypes.func,
      getBlogInProgress: PropTypes.bool,
      deleteBlog: PropTypes.func,
      saveBlogSettings: PropTypes.func,
      createBlog: PropTypes.func,
      goTo: PropTypes.func,
      blogSettings: PropTypes.object,
      getBlogSettingsInProgress: PropTypes.bool,
      setInput: PropTypes.func,
      getBlogCount: PropTypes.func,
      blogTotal: PropTypes.number,
      getFrontBlogCountInProgress: PropTypes.bool,
      goToBack: PropTypes.func,
      deleteBlogByIds: PropTypes.any,
      saveBlogPost: PropTypes.func,
   };

   constructor(props) {
      super(props);
      this.state = {
         searchValue: '',
         startBlog: true,
         deleteModalIsOpen: false,
         turnOnBlog: true,
         editBlogHeader: false,
         blogSortingValue: 'recently',
         isMultiSelected: false,
         selectedBlogIds: [],
         deleteMultipleModalIsOpen: false,
      };
      this.formKeys = {
         blogSettings: ['blog_page_title', 'blog_page_description', 'blog_page_image', 'blog_page_status', 'blog_page_color'],
      };
   }

   async componentDidMount() {
      const { getBlog, getBlogCount } = this.props;
      await getBlog();
      await getBlogCount();
      const { blogSettings } = this.props;
      this.formKeys.blogSettings.data = blogSettings;
   }

   handleInputChange = (name, value, target) => {
      const { setInput } = this.props;
      setInput(name, value, target);
   }

   handleDeleteBlog = async (id) => {
      const { deleteBlog, getBlogCount } = this.props;
      await deleteBlog(id);
      await getBlogCount();
   }

   saveBlogSettings = () => {
      const { saveBlogSettings, blogSettings } = this.props;
      const keysArray = this.formKeys.blogSettings;
      const data = this.formKeys.blogSettings.data;
      const changedFields = getDeff(data, blogSettings);
      const formData = getFormFields(keysArray, changedFields);
      let blogPageTitle = null;
      let blogPageDesc = null;
      let blogPageImg = null;
      let blogPageActive = null;
      let blogColor = null;
      const params = [];
      if (formData.blog_page_title != null) {
         blogPageTitle = {
            key: 'blog_page_title',
            value: formData.blog_page_title,
         };
         params.push(blogPageTitle);
      }
      if (formData.blog_page_description != null) {
         blogPageDesc = {
            key: 'blog_page_description',
            value: formData.blog_page_description,
         };
         params.push(blogPageDesc);
      }
      if (formData.blog_page_image !== undefined) {
         blogPageImg = {
            key: 'blog_page_image',
            value: formData.blog_page_image,
         };
         params.push(blogPageImg);
      }
      if (formData.blog_page_color != null) {
         blogColor = {
            key: 'blog_page_color',
            value: formData.blog_page_color,
         };
         params.push(blogColor);
      }
      if (formData.blog_page_status != null) {
         blogPageActive = {
            key: 'blog_page_status',
            value: formData.blog_page_status,
         };
         params.push(blogPageActive);
      }
      if (params.length !== 0) {
         saveBlogSettings(params);
         this.formKeys.blogSettings.data = blogSettings;
      }
      this.setState({ startBlog: true, editBlogHeader: false });
   }

   // handleBlogSearch = (e) => {
   //    const { getBlog } = this.props;
   //    const { blogSortingValue, searchValue } = this.state;
   //    if (e.key === 'Enter') {
   //       getBlog({ sortName: blogSortingValue, searchValue });
   //    }
   // }

   setSearchValue = (value) => {
      const { getBlog } = this.props;
      const { blogSortingValue } = this.state;
      this.setState({ searchValue: value });
      getBlog({ sortName: blogSortingValue, searchValue: value });
   }

   onClearSearch = () => {
      const { getBlog } = this.props;
      const { blogSortingValue } = this.state;

      getBlog({ sortName: blogSortingValue, searchValue: '' });
   }


   setTurnOnBlog = (e, value) => {
      const { saveBlogSettings } = this.props;
      saveBlogSettings([{ key: 'blog_page_status', value: value ? 'on' : 'off' }]);
      this.setState({ turnOnBlog: value, deleteModalIsOpen: false, startBlog: value });
   }

   setDeleteModalIsOpen = (value) => {
      this.setState({ deleteModalIsOpen: value });
   }

   setEditBlogHeader = (value) => {
      this.setState({ editBlogHeader: value });
   }

   sortbyHandle=(value) => {
      const { getBlog } = this.props;
      const { searchValue } = this.state;
      this.setState({
         blogSortingValue: value,
      });
      getBlog({ sortName: value, sortValue: 'asc', searchValue });
   }

   handleChangeMultiSelect = (isMultiSelected) => {
      this.setState({
         isMultiSelected,
         selectedBlogIds: [],
      });
   }

   handleOnCheckAll = () => {
      const { selectedBlogIds } = this.state;
      const { blog } = this.props;
      if (blog.length === selectedBlogIds.length) {
         this.setState({
            selectedBlogIds: [],
         });
      } else {
         const ids = blog.map((post) => post.id);
         this.setState({
            selectedBlogIds: ids,
         });
      }
   }

   handleOnCheckItem = (id) => {
      const { selectedBlogIds } = this.state;
      if (!selectedBlogIds.includes(id)) {
         this.setState({
            selectedBlogIds: [...selectedBlogIds, id],
         });
      } else {
         this.setState({
            selectedBlogIds: (selectedBlogIds.filter((i) => i !== id)),
         });
      }
   }

   onRemoveSelected = (value) => {
      this.setState({
         deleteMultipleModalIsOpen: value,
      });
   }

   onAcceptRemove = () => {
      const { selectedBlogIds } = this.state;
      if (selectedBlogIds.length > 0) {
         const { deleteBlogByIds } = this.props;
         this.handleChangeMultiSelect(false);
         this.setState({
            deleteMultipleModalIsOpen: false, blogSortingValue: 'recently',
         });
         deleteBlogByIds(selectedBlogIds);
      }
   }

   handleSaveBlogCardStatus= (id, formData) => {
      const { saveBlogPost } = this.props;
      const blogId = id;
      const formDataStatus = formData;
      if (Object.getOwnPropertyNames(formDataStatus).length !== 0) {
         if (formDataStatus.publish_date) {
            formDataStatus.is_published = 2;
            formDataStatus.publish_date = moment(formDataStatus.publish_date).format('YYYY-MM-DD');
         }
         if (formDataStatus.is_published !== undefined) {
            saveBlogPost(blogId, formDataStatus);
         }
      }
   }


   render() {
      const {
         blog, getBlogInProgress, createBlog, goTo, blogSettings,
         getBlogSettingsInProgress, blogTotal, getFrontBlogCountInProgress, goToBack,
      } = this.props;
      const {
         searchValue, startBlog, deleteModalIsOpen, turnOnBlog, editBlogHeader, blogSortingValue,
         isMultiSelected, selectedBlogIds, deleteMultipleModalIsOpen,
      } = this.state;

      return (
         <>
            <MobileHeader>
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <Container>
               <Container.Content>
                  {blogSettings && (
                     <BlogHeader
                        title='Blog'
                        tooltip='Create, edit and publish your blog posts.'
                        hasArrow
                        startBlog={ blogSettings.blog_page_status !== 'off' && !editBlogHeader }
                        setDeleteModalIsOpen={ this.setDeleteModalIsOpen }
                        createBlog={ createBlog }
                        getBlogSettingsInProgress={ getBlogSettingsInProgress }
                        goTo={ goTo }
                        setEditBlogHeader={ this.setEditBlogHeader }
                        editBlogHeader={ editBlogHeader }
                     />
                  )}
                  <BlogLoading
                     isLoading={ !blogSettings }
                     blog={ blog }
                     getBlogInProgress={ getBlogInProgress }
                     handleDeleteBlog={ this.handleDeleteBlog }
                     saveBlogSettings={ this.saveBlogSettings }
                     createBlog={ createBlog }
                     goTo={ goTo }
                     blogSettings={ blogSettings }
                     getBlogSettingsInProgress={ getBlogSettingsInProgress }
                     handleInputChange={ this.handleInputChange }
                     searchValue={ searchValue }
                     blogTotal={ blogTotal }
                     getFrontBlogCountInProgress={ getFrontBlogCountInProgress }
                     startBlog={ startBlog }
                     turnOnBlog={ turnOnBlog }
                     setTurnOnBlog={ this.setTurnOnBlog }
                     setDeleteModalIsOpen={ this.setDeleteModalIsOpen }
                     editBlogHeader={ editBlogHeader }
                     setEditBlogHeader={ this.setEditBlogHeader }
                     blogSortingValue={ blogSortingValue }
                     onFilter={ this.sortbyHandle }
                     setSearchValue={ this.setSearchValue }
                     searchOnEnter={ this.handleBlogSearch }
                     onClearSearch={ this.onClearSearch }
                     selectedBlogIds={ selectedBlogIds }
                     isMultiSelected={ isMultiSelected }
                     setIsMultiSelected={ this.handleChangeMultiSelect }
                     checkedItemsLength={ selectedBlogIds.length }
                     onCheckAll={ this.handleOnCheckAll }
                     onCheck={ this.handleOnCheckItem }
                     onRemoveSelected={ () => this.onRemoveSelected(true) }
                     handleSaveBlogCardStatus={ this.handleSaveBlogCardStatus }
                     setOpenDateModal={ this.setOpenDateModal }

                  />
                  {
                     deleteModalIsOpen && (
                        <DeleteModal
                           title='Are you sure you want to turn off the blog?'
                           deleteText='Turn Off'
                           maxWidth={ 414 }
                           cancelBtnSize='large120'
                           onDelete={ (e) => { this.setTurnOnBlog(e, false); } }
                           onCancel={ () => this.setDeleteModalIsOpen(false) }
                        />
                     )
                  }
                  {
                     deleteMultipleModalIsOpen && (
                        <DeleteModal
                           title={ `Are you sure you want to delete the ${ selectedBlogIds.length }  selected  ${ selectedBlogIds.length > 1 ? 'articles' : 'article' }  from the blog?` }
                           deleteText='Delete'
                           maxWidth={ 465 }
                           onDelete={ (e) => { this.onAcceptRemove(e, false); } }
                           onCancel={ () => this.onRemoveSelected(false) }
                        />
                     )
                  }
               </Container.Content>
            </Container>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      getBlogInProgress: selectors.getBlogInProgressSelector(state),
      blog: selectors.blogSelector(state),
      blogSettings: selectors.blogSettingsSelector(state),
      getBlogSettingsInProgress: selectors.getBlogSettingsInProgressSelector(state),
      blogTotal: blogselectors.totalSelector(state),
      getFrontBlogCountInProgress: blogselectors.getFrontBlogCountInProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      getBlog: async (params) => {
         await dispatch(operations.getBlogOperation(params));
      },
      deleteBlog: async (id) => {
         await dispatch(operations.deleteBlogOperation(id));
      },
      saveBlogSettings: (params) => {
         dispatch(operations.saveBlogSettingsOperation(params));
      },
      getBlogSettings: async () => {
         await dispatch(operations.getBlogSettingsOperation());
      },
      createBlog: () => {
         dispatch(operations.createBlogOperation());
      },
      getBlogCount: async () => {
         await dispatch(blogoperations.getBlogCountOperation());
      },
      setInput: (key, value, target) => {
         dispatch(setInputAction(key, value, target));
      },
      deleteBlogByIds: (ids) => {
         dispatch(operations.deleteBlogByIdsOperation(ids));
      },
      saveBlogPost: (id, data) => {
         dispatch(operations.saveBlogPostOperation(id, data, true));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
