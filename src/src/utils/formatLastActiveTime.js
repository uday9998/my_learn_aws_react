export const formatLastActiveTime = (currentTimeStr, lastActiveStr, onlyTime) => {
   const currentTime = new Date(currentTimeStr);
   const lastActiveTime = new Date(lastActiveStr);
   const timeDiff = currentTime - lastActiveTime;
   if (!lastActiveStr) {
      return 'N/A';
   }
   if (timeDiff === 0) {
      if (onlyTime) {
         return 'Now';
      }
      return 'Online';
   }
   const absTimeDiff = Math.abs(timeDiff);
   const totalSeconds = absTimeDiff / 1000;
   const days = Math.floor(totalSeconds / (24 * 60 * 60));
   const remainingAfterDays = totalSeconds % (24 * 60 * 60);
   const hours = Math.floor(remainingAfterDays / (60 * 60));
   const remainingAfterHours = remainingAfterDays % (60 * 60);
   const minutes = Math.floor(remainingAfterHours / 60);
   if (days > 1) {
      if (onlyTime) {
         return `${ days } days ago`;
      }
      return `Active ${ days } days ago`;
   } if (days === 1) {
      if (onlyTime) {
         return '1 day ago';
      }
      return 'Active 1 day ago';
   } if (hours >= 1) {
      if (onlyTime) {
         return `${ hours }h ago`;
      }
      return `Active ${ hours }h ago`;
   } 

   if (onlyTime) {
      return `${ minutes }m ago`;
   }
   return `Active ${ minutes }m ago`;
};