export const findLandingTemplateData = (siteInfo, landingId, isEditor, landingType, previewMode, isMembership) => {
   const isOutPreview = localStorage.getItem('outPreview');
   if (isOutPreview) {
      localStorage.removeItem('outPreview');
      return siteInfo.all_school_room.find(el => {
         return el.school_room_theme_name === landingId;
      });
   } 
   if (isEditor) {
      return siteInfo.all_school_room.find(el => {
         return el.id === Number(landingId);
      });
   } 
   
   if (previewMode) {
      return siteInfo.all_school_room.find(el => {
         return el.school_room_theme_name === landingType;
      });
   }
   return isMembership ? siteInfo.membership.active_school_room : siteInfo.active_school_room;
};
