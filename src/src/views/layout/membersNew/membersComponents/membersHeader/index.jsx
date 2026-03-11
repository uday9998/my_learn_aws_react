import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';
import { useSearch } from 'utils/hooks/useSearch';
import MembersHeaderTop from '../membersHeadarTop';

const MembersHeader = ({
   exportCSV, openBulkModal, openAddMemberModal, searchValue, handleInternalInputChange, initialLength, isOpenBulk,
   handleSearch, showSearch,
}) => {
   const [lastSearchValue, setLastSearchValue] = React.useState(searchValue);
   useSearch(searchValue, () => {
      if (searchValue !== lastSearchValue) {
         handleSearch(searchValue);
         setLastSearchValue(searchValue);
      }
   });
   return (
      <div className='members__header'>
         <MembersHeaderTop
            exportCSV={ exportCSV }
            initialLength={ initialLength }
            openBulkModal={ openBulkModal }
            openAddUserModal={ openAddMemberModal }
            isOpenBulk={ isOpenBulk }
         />
         {
            showSearch && (
               <Input classI='transactions-filter-input' value={ searchValue } name='searchValue' onChange={ handleInternalInputChange } type='search' placeholder='Search' />
            )
         }
      </div>
   );
};

MembersHeader.propTypes = {
   exportCSV: PropTypes.func,
   openBulkModal: PropTypes.func,
   openAddMemberModal: PropTypes.func,
   searchValue: PropTypes.string,
   handleInternalInputChange: PropTypes.func,
   initialLength: PropTypes.number,
   isOpenBulk: PropTypes.bool,
   handleSearch: PropTypes.func,
   showSearch: PropTypes.bool,
};

export default MembersHeader;
