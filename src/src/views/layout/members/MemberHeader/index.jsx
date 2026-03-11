import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import MemberHeaderTop from 'components/modules/members/MemberHeaderTop';
import SearchFilter from 'components/elements/SearchFilter';
import AdvancedFilter from 'components/elements/members/AdvancedFilter';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import MemberContainer from 'views/newLayout/members';

const MemberHeader = (props) => {
   const {
      switchToAddingMember, goToBack, exportMembersCSV, handleUploadCSVClick, courses, tooltip, isOpenBulk,
   } = props;
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   const coursesOption = [];
   courses.map(item => coursesOption.push({ label: item.name, value: item.id }));


   return (
      <MemberContainer />
   );
};

MemberHeader.propTypes = {
   addingMember: PropTypes.bool,
   isOpenBulk: PropTypes.number,
   switchToAddingMember: PropTypes.func,
   goToBack: PropTypes.func,
   exportMembersCSV: PropTypes.func,
   handleUploadCSVClick: PropTypes.func,
   courses: PropTypes.array,
   tooltip: PropTypes.string,
   advancedFilterOption: PropTypes.string,
};

export default MemberHeader;
