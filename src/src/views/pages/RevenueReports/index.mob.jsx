import React from 'react';
import Select from 'components/elements/form/Select';
import TotalXReport from 'components/elements/dashboard/TotalXReport';
import TotalReport from 'components/elements/dashboard/TotalReport';

const RevenoueReports = () => {
   return (
      <div className='mob-revenueReports'>
         <Select
            typeOval
            icon='TriangleDown'
            hasBorder
            placeholder='All classes'
         />
         <div className='m-t-exl m-b-exl'>
            <TotalXReport
               title='$588.87 Total Sales'
               icon='Sales'
               data={ [
                  { first: '$1230', second: 'Monthly' },
                  { first: '$480', second: 'Weekly' },
                  { first: '$110', second: 'Daily' },
               ] }
            />
         </div>
         <TotalReport />
      </div>
   );
};

export default RevenoueReports;
