import React from 'react';
import PropTypes from 'prop-types';
import Community from 'containers/pages/admin/community';

const CommunitySchoolRoom = ({ match }) => {
   return (
      <Community
         match={ match }
      />
   );
};

CommunitySchoolRoom.propTypes = {
   match: PropTypes.object,
};

export default CommunitySchoolRoom;
