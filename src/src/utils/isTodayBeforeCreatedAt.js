export const isTodayBeforeCreatedAt = (user) => {
   const today = new Date('2024-10-28'); 
   const createdAt = new Date(user.created_at);
   return today < createdAt;
};