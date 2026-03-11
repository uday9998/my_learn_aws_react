export const findTemplate = (schoolRoomThemes, isMembership) => {
   const newTemplatesData = [];

   for (let i = 0; i < schoolRoomThemes.length; i++) {
      if (isMembership && schoolRoomThemes[i].school_room_theme_name === 'template1') {
         return [schoolRoomThemes[i]];
      } if (!isMembership && schoolRoomThemes[i].school_room_theme_name !== 'template1') {
         newTemplatesData.push(schoolRoomThemes[i]);
      }
   }

   return newTemplatesData;
};