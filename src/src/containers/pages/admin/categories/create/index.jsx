import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/categories/selectors';
import * as operations from 'state/modules/categories/operations';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import CategoryCreate from 'views/pages/CategoryCreate';
import { getAllFrontCourses } from 'api';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';

const CategoriesCreate = ({
   isLoading, init, data, createCategory,
   detachedCourses, isProgressDetachedCourses, getDettachedCourses, isProcesingCourseOperation,
   attach,
}) => {
   const history = useHistory();
   const [courses, setCourses] = useState(detachedCourses);
   const [categories, setCategories] = useState([]);
   const [getAllFrontCoursesFunc, { loading }] = useSubmitForm(getAllFrontCourses);

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
      setCourses(detachedCourses);
   }, [detachedCourses]);

   const handleGetAllFrontCourses = () => {
      getAllFrontCoursesFunc({}, (res) => {
         setCourses(res.courses);
      });
   };

   return (
      <AdminContainer>
         {(isProgressDetachedCourses || isProcesingCourseOperation || loading) && (
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
                     />
                  </AdminContainer.Header>
                  <HeaderTypeFirst title='Back' goBack={ goBack } onSave={ null } />
                  <AdminContainer.Content>
                     <CategoryCreate
                        categories={ categories }
                        isProgressDetachedCourses={ isProgressDetachedCourses }
                        setCourses={ setCourses }
                        getDettachedCourses={ getDettachedCourses || loading }
                        handleGetAllFrontCourses={ handleGetAllFrontCourses }
                        detachedCourses={ courses }
                        attach={ attach }
                        onCreate={ (inputs) => {
                           return createCategory(inputs, true);
                        } }
                     />
                  </AdminContainer.Content>
               </div>
            </>
         )}
      </AdminContainer>
   );
};

CategoriesCreate.propTypes = {
   init: PropTypes.func,
   isLoading: PropTypes.bool,
   data: PropTypes.array,
   createCategory: PropTypes.func,
   detachedCourses: PropTypes.array,
   getDettachedCourses: PropTypes.func,
   isProgressDetachedCourses: PropTypes.bool,
   isProcesingCourseOperation: PropTypes.bool,
   attach: PropTypes.func,
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
      init: () => dispatch(operations.getCategoriesOperation()),
      createCategory: (data, isReturnError) => dispatch(operations.createCategoryOperation(data, isReturnError)),
      filter: (search) => dispatch(operations.FilterCategoriesOperation(search)),
      update: (data, id) => dispatch(operations.updateCategoryOperation(data, id)),
      remove: id => dispatch(operations.removeCategoryOperation(id)),
      getDettachedCourses: id => dispatch(operations.getDetachedCoursesOperation(id)),
      attach: (categoryId, ids) => dispatch(operations.attachCourseCategoryOperation(categoryId, ids, true)),
      detach: (categoryId, ids) => dispatch(operations.detachCoursesCategoryOperation(categoryId, ids)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesCreate);
