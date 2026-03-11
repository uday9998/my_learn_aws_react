const filterMessengerMembers = (members, userId) => {
   const newMembers = members.filter((e) => {
      if (!e.member) return false;
      return e.member.id !== userId;
   });
   return newMembers;
};

export default filterMessengerMembers;
