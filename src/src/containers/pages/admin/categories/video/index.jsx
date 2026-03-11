import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/videoCategories/selectors';
import * as actions from 'state/modules/videoCategories/actions';
import * as operations from 'state/modules/videoCategories/operations';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import VideoCategoryCreate from 'views/pages/VideoCategoryCreate';
import CategoriesVideoView from 'views/pages/CategoriesVideoView';
import { useApiLazyQuery } from 'utils/hooks/useApiLazyQuery';
import { reorderCategoriesLessons } from 'api';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import VideoCategoryEdit from 'views/pages/VideoCategoryEdit';
import { push } from 'connected-react-router';
import Modal from 'components/elements/Modal';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';

const CategoriesVideo = ({
   isLoading, init, data, createCategory, isProgressFiltering, filter, initialCount, update, remove,
   detachedCourses, isProgressDetachedCourses, getDettachedCourses, isProcesingCourseOperation, attach, detach,
   goTo, match, createCategoryInit, removeCategory, duplicatePlaylist,
}) => {
   const contentRef = useRef(null);
   const history = useHistory();
   const [search, setSearch] = useState('');
   const [isOpenCreate, setIsOpenCreate] = useState(false);
   const [categories, setCategories] = useState([]);
   const [reorderCourses] = useApiLazyQuery(reorderCategoriesLessons, { });
   const [seo, setSeo] = useState({});
   const { isMobile } = useWindowSizeChange();

   useEffect(() => {
      const categoriesObjectToArray = Array.isArray(data) ? data : Object.values(data);

      setCategories(categoriesObjectToArray);
   }, [data]);

   const goBack = () => {
      history.goBack();
   };

   useEffect(() => {
      init();
   }, []);

   useEffect(() => {
      filter(search);
   }, [search]);

   const handleCreate = () => {
      setIsOpenCreate(true);
      //  goTo(Router.route('ADMIN_VIDEO_CATEGORIES_CREATE').getMask());
   };

   function onSave(datas) {
      const inputs = datas.map((category) => (
         {
            id: category.id,
            lessons: category.lessons.map((lesson) => (
               lesson.id
            )).map((id) => id).reverse(),
         }
      ));
      const requestInputs = { categories: inputs };
      reorderCourses(requestInputs);
   }

   return (
      <AdminContainer>
         {(isProgressDetachedCourses || isProcesingCourseOperation) && (
            <LoaderSpinner />
         )}
         {isLoading ? (
            <LoaderSpinner />
         ) : (
            <>
               <div className='categorys__wrapper'>
                  <AdminContainer.Header>
                     <SiteHeader
                        goBack
                        isLeftAction
                        // setIsOpenMobSearch={ this.setIsOpenMobSearch }
                        // isMobSearchOpen={ isMobSearchOpen }
                     />
                  </AdminContainer.Header>
                  <HeaderTypeFirst
                     title={ isMobile ? 'Back' : 'Categories' }
                     goBack={ goBack }
                     onSave={ !match.params.id ? null : () => {
                        update({ seo_data: seo }, match.params.id, goBack);
                     } } />
                  <AdminContainer.Content>
                     {!match.params.id
                     && (
                        <>
                           {(initialCount > 0) && (
                              <CategoriesVideoView
                                 isProgressFiltering={ isProgressFiltering }
                                 search={ search }
                                 onAdd={ handleCreate }
                                 onChange={ (datas) => {
                                    setCategories(datas);
                                    onSave(datas);
                                 } }
                                 setSearch={ setSearch }
                                 categories={ categories }
                                 deleteCategory={ (id) => remove(id) }
                                 data={ categories }
                                 rename={ (newData, id) => {
                                    if (!id) {
                                       return createCategory(newData, true);
                                    }

                                    return update(newData, id, undefined, true);
                                 } }
                                 getDettachedCourses={ getDettachedCourses }
                                 detachedCourses={ detachedCourses }
                                 attach={ attach }
                                 detach={ detach }
                                 isVideo={ true }
                                 contentRef={ contentRef }
                                 removeCategory={ removeCategory }
                                 duplicatePlaylist={ duplicatePlaylist }
                              />
                           ) }

                           {isOpenCreate && (
                              <Modal
                                 blurColor='rgba(63, 79, 101, 0.6)'
                                 contentBgColor='#fff'
                                 contentPosition='center'
                                 closeOnClickOutside={ true }
                                 contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                                 onClose={ () => setIsOpenCreate(false) }
                              >
                                 <VideoCategoryCreate
                                    initialStep={ categories.length > 0 ? 1 : 0 }
                                    isVideo={ true }
                                    onClose={ () => setIsOpenCreate(false) }
                                    onCreate={ (inputs) => {
                                       // createCategory(inputs);
                                       setIsOpenCreate(false);
                                       createCategoryInit(inputs);
                                       if (contentRef.current) {
                                          contentRef.current.scrollTop = contentRef.current.scrollHeight
                                           - contentRef.current.clientHeight + 200;
                                       }
                                    } }
                                 />
                              </Modal>
                           )}
                        </>
                     )
                     }
                     {!!match.params.id && (
                        <VideoCategoryEdit
                           isProgressFiltering={ isProgressFiltering }
                           search={ search }
                           onAdd={ handleCreate }
                           onChange={ (datas) => {
                              setCategories(datas);
                              onSave(datas);
                           } }
                           setSearch={ setSearch }
                           data={ categories.filter((cat) => cat.id === parseInt(match.params.id, 10)) }
                           deleteCategory={ (id) => remove(id) }
                           rename={ (newData, id) => {
                              return update(newData, id, undefined, true);
                           } }
                           getDettachedCourses={ getDettachedCourses }
                           detachedCourses={ detachedCourses }
                           attach={ attach }
                           detach={ detach }
                           isVideo={ true }
                           seo={ seo }
                           setSeo={ setSeo }
                           isProgressDetachedCourses={ isProgressDetachedCourses }
                           duplicatePlaylist={ duplicatePlaylist }
                        />
                     )}
                  </AdminContainer.Content>
               </div>
            </>
         )}
      </AdminContainer>
   );
};

CategoriesVideo.propTypes = {
   init: PropTypes.func,
   isLoading: PropTypes.bool,
   data: PropTypes.array,
   createCategory: PropTypes.func,
   isProgressFiltering: PropTypes.bool,
   filter: PropTypes.bool,
   initialCount: PropTypes.number,
   update: PropTypes.func,
   remove: PropTypes.func,
   detachedCourses: PropTypes.array,
   getDettachedCourses: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   isProcesingCourseOperation: PropTypes.bool,
   attach: PropTypes.func,
   detach: PropTypes.func,
   goTo: PropTypes.func,
   match: PropTypes.object,
   createCategoryInit: PropTypes.func,
   removeCategory: PropTypes.func,
   duplicatePlaylist: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      isLoading: selectors.progressSelector(state),
      data: selectors.getCategoriesSelector(state),
      isProgressFiltering: selectors.filterProgressSelector(state),
      initialCount: selectors.initialCountSelector(state),
      updateProgress: selectors.updateProgressSelector(state),
      isProgressDetachedCourses: selectors.isProgressDetachCourses(state),
      detachedCourses: selectors.detachedCourses(state),
      isProcesingCourseOperation: selectors.isProgressCoursesOperationSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => dispatch(push(location)),
      init: (search) => dispatch(operations.getCategoriesOperation(search, true)),
      createCategory: (data, isReturnError) => dispatch(operations.createCategoryOperation(data, isReturnError)),
      filter: (search) => dispatch(operations.FilterCategoriesOperation(search)),
      update: (data, id, goBack, isReturnError) => dispatch(operations.updateCategoryOperation(data, id, goBack, isReturnError)),
      remove: id => dispatch(operations.removeCategoryOperation(id)),
      getDettachedCourses: id => dispatch(operations.getDetachedCoursesOperation(id)),
      attach: (categoryId, ids) => dispatch(operations.attachCourseCategoryOperation(categoryId, ids)),
      detach: (categoryId, ids) => dispatch(operations.detachCoursesCategoryOperation(categoryId, ids)),
      createCategoryInit: (data) => dispatch(actions.createCategoryCompleted(data)),
      removeCategory: () => dispatch(actions.removeCategoryCompleted('remove')),
      duplicatePlaylist: (sectionId, playlistId, catIds) => dispatch(
         operations.duplicatePlaylistOperation(sectionId, playlistId, catIds)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesVideo);
