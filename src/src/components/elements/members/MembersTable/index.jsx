/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import {
   Td, Th, Tr, Theader, Tbody,
} from 'components/elements/Table';
import moment from 'moment';

const MembersTable = ({ headings, content }) => {
   const renderTableHeader = () => {
      return headings.map((key, index) => {
         return (
            <Th key={ index }>
               {key}
            </Th>
         );
      });
   };

   const renderTableData = () => {
      return content.map((data) => {
         const {
            id, course, status, amount, created_at,
         } = data;
         const date = moment(created_at).format('MM/DD/YYYY');
         return (
            <Tr key={ id }>
               <Td>{course.name}</Td>
               <Td>{status}</Td>
               { headings.includes('Amount') && amount && <Td>{Math.round(amount) || '-'}</Td> }
               { headings.includes('Date') && date && <Td>{date || '-' }</Td> }
            </Tr>
         );
      });
   };

   return (
      <div className='membersTable'>
         <table id='membersTable' className='membersTable__table w-full'>
            <Theader className='membersTable__header'>
               <Tr>
                  {renderTableHeader()}
               </Tr>
            </Theader>
            <Tbody>
               {renderTableData()}
            </Tbody>
         </table>
      </div>
   );
};

MembersTable.propTypes = {
   headings: PropTypes.array,
   content: PropTypes.array,
};

export default MembersTable;
