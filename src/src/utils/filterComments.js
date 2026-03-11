export const filterCourseComments = (course) => {
   let newData = { ...course };
   newData = {
      ...newData,
      sections: newData.sections.filter(((sec) => sec.comments_count > 0)),
   };
   newData = {
      ...newData,
      sections: newData.sections.map((sec) => {
         let newLessons = [...sec.lessons];
         newLessons = newLessons.filter((lesson) => {
            return lesson.lessonComments.length > 0;
         });
         return {
            ...sec,
            lessons: newLessons,
         };
      }),
   };
   return newData;
};
