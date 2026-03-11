import React from 'react';
import {
   Td, Th, Tr, Theader, Tbody,
} from 'components/elements/Table';
import PropTypes from 'prop-types';
import './style.scss';

const Headers = ['Start Date', 'Payments', 'Revenue', 'Courses'];

const ReportsDayByDayTable = ({ data }) => {
   return (
      <div className='courseReportsDayByDayWrapper'>
         <table id='courseReportsDayByDay' className='courseReportsDayByDay w-full'>
            <Theader>
               <Tr>
                  {Headers.map((key, index) => {
                     return (
                        <Th key={ index.toString() } className='desctop-tab'>
                           {key}
                        </Th>
                     );
                  })}
               </Tr>
            </Theader>
            <Tbody>
               {data.map(({
                  date, revenue, coursesCount, payments,
               }) => {
                  return (
                     <Tr key={ date }>
                        <Td>{date}</Td>
                        <Td>{payments}</Td>
                        <Td>{revenue}</Td>
                        <Td>{coursesCount}</Td>
                     </Tr>
                  );
               })}
            </Tbody>
         </table>
      </div>
   );
};

ReportsDayByDayTable.propTypes = {
   data: PropTypes.array,
};

export default ReportsDayByDayTable;
