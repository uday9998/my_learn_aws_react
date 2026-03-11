import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/categories/selectors';
import * as operations from 'state/modules/categories/operations';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CategoryEmpty from 'views/pages/CategoryCreate';
import Categories from 'views/pages/Categories';
import { useApiLazyQuery } from 'utils/hooks/useApiLazyQuery';
import { reorderCategoriesCourses } from 'api';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';


const Categorys = ({
   isLoading, init, data, createCategory, isProgressFiltering, filter, initialCount, update, remove,
   detachedCourses, isProgressDetachedCourses, getDettachedCourses, isProcesingCourseOperation, attach, detach,
   goTo,
}) => {
   const history = useHistory();
   const [search, setSearch] = useState('');
   const [isOpenCreate, setIsOpenCreate] = useState(false);
   const [categories, setCategories] = useState([]);
   const [reorderCourses] = useApiLazyQuery(reorderCategoriesCourses, { });
   const { isMobile } = useWindowSizeChange();

   useEffect(() => {
      setCategories(data);
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
      // setIsOpenCreate(true);
      goTo(Router.route('ADMIN_CATEGORIES_CREATE').getMask());
   };
   function onSave(datas) {
      const inputs = datas.map((category) => (
         {
            id: category.id,
            courses: category.courses.map((course) => (
               course.id
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
                  <HeaderTypeFirst title={ isMobile ? 'Back' : 'Categories' } goBack={ goBack } onSave={ null } />
                  <AdminContainer.Content>
                     {(!isOpenCreate && initialCount > 0) ? (
                        <Categories
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
                              update(newData, id);
                           } }
                           getDettachedCourses={ getDettachedCourses }
                           detachedCourses={ detachedCourses }
                           attach={ attach }
                           detach={ detach }
                        />
                     ) : (
                        <CategoryEmpty
                           initialStep={ categories.length > 0 ? 1 : 0 }
                           onCreate={ (inputs) => {
                              createCategory(inputs);
                              setIsOpenCreate(false);
                           } }
                        />
                     )}
                  </AdminContainer.Content>
               </div>
            </>
         )}
      </AdminContainer>
   );
};

Categorys.propTypes = {
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
      init: () => dispatch(operations.getCategoriesOperation()),
      createCategory: (data) => dispatch(operations.createCategoryOperation(data)),
      filter: (search) => dispatch(operations.FilterCategoriesOperation(search)),
      update: (data, id) => dispatch(operations.updateCategoryOperation(data, id)),
      remove: id => dispatch(operations.removeCategoryOperation(id)),
      getDettachedCourses: id => dispatch(operations.getDetachedCoursesOperation(id)),
      attach: (categoryId, ids) => dispatch(operations.attachCourseCategoryOperation(categoryId, ids)),
      detach: (categoryId, ids) => dispatch(operations.detachCoursesCategoryOperation(categoryId, ids)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categorys);
