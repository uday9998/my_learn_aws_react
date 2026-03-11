import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import AllTimeReportListItem from './AllTimeReportListItem';


const AllTimeSaleReport = ({ data = {} }) => {
   return (
      <>
         <div className='text-center m-b-m p-t-m'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='All Time'
            />
         </div>
         <div className='flex justify-center w-full' style={ { flexWrap: 'wrap' } }>
            {Object.keys(data).length > 0 && Object.keys(data).reduce((acc, key) => {
               acc.push(
                  <AllTimeReportListItem key={ key } currency={ key } value={ data[key] } />
               );
               return acc;
            }, [])}
         </div>
      </>
   );
};

AllTimeSaleReport.propTypes = {
   data: PropTypes.object,
};

export default AllTimeSaleReport;
