import PropTypes from 'prop-types';

export const getFilteredMembers = (members) => {
   const admins = members.filter((member) => member.role === 2);
   const assistant = members.filter((member) => member.role === 3);
   const support = members.filter((member) => member.role === 4);
   return [
      ...admins,
      ...assistant,
      ...support,
   ];
};

getFilteredMembers.propTypes = {
   member: PropTypes.array,
};
