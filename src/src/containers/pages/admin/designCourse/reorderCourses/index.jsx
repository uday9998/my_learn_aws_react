import React, { useEffect, useState } from 'react';

import ReorderCourses from 'views/pages/ReorderCourses';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useApiLazyQuery } from 'utils/hooks/useApiLazyQuery';
import { getCategories, reorderCategoriesCourses } from 'api';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Container from 'views/layout/AdminContainer';


import { arrayMove } from 'react-sortable-hoc';

function ReorderCoursesContainer() {
   const [categories, setCategories] = useState([]);
   const { data, loading, error } = useApiQuery(getCategories, [true]);
   const [reorderCourses] = useApiLazyQuery(reorderCategoriesCourses, { successMessage: 'Reordering Saved Successfully' });
   useEffect(() => {
      setCategories(data);
   }, [data]);


   function onCategorySortEnd({ oldIndex, newIndex }) {
      const newCategories = arrayMove(categories, oldIndex + 1, newIndex + 1);
      setCategories(newCategories.map((category, index) => {
         return { ...category, order: index + 1 };
      }));
   }

   function onSortCoursesEnd({ oldIndex, newIndex, categoryId }) {
      const { courses = [] } = categories.find(({ id }) => id === categoryId);
      const newCourses = arrayMove(courses, oldIndex, newIndex);
      const newCategories = categories.map(category => {
         if (category.id !== categoryId) return category;
         return {
            ...category,
            courses: newCourses,
         };
      });
      setCategories(newCategories);
   }


   function onSave() {
      const inputs = categories.map((category) => (
         {
            id: category.id,
            courses: category.courses.map((course) => (
               course.course_id
            )).map((id) => id).reverse(),
         }
      ));
      const requestInputs = { categories: inputs };
      reorderCourses(requestInputs);
   }

   if (error) return JSON.stringify(error);
   if (loading) return 'Loading ...';
   return (
      <Container>
         <Container.Header>
            <SiteHeaderMobile
               isLeftAction
            />
         </Container.Header>
         <Container.Content>
            <ReorderCourses
               isLoading={ loading }
               categories={ categories }
               onChange={ setCategories }
               onSave={ onSave }
            />
         </Container.Content>
      </Container>
   );
}


export default ReorderCoursesContainer;
