export const findVideoMembershipCheckedOrNo = (selectedCoursesIds, courses) => {
   for (let i = 0; i < selectedCoursesIds.length; i++) {
      const course = courses.find(course => course.id === selectedCoursesIds[i]);

      if (course.type === '1') {
         return true;
      } if (!selectedCoursesIds[i + 1]) {
         return false;
      }
   }
};