import React from 'react';
import './index.scss';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import PropTypes from 'prop-types';

const TotalXReport = ({ data }) => {
   return (
      <div className='totalSalesReport'>
         {/* <div className='totalSalesReport__top m-b-exl'>
            <Icon name={ icon } />
            <Text
               size={ textSize.large }
               type={ textType.normal }
               inner={ title }
            />
         </div> */}
         <div className='totalSalesReport__results'>
            { data.map((item, i) => {
               const key = i + 1;
               return (
                  <React.Fragment key={ key }>
                     <div className='totalSalesReport__result'>
                        <Text
                           size={ textSize.xlarge }
                           type={ textType.medium160 }
                           inner={ item.first }
                        />
                        <Text
                           size={ textSize.small }
                           type={ textType.regularDefault }
                           inner='Total Sales'
                        />
                        <Text
                           size={ textSize.small14 }
                           type={ textType.regularDefaultGrey }
                           inner={ item.second }
                        />
                     </div>
                     { i < 2 && <div className='vertical_line' />}
                  </React.Fragment>
               );
            }) }
         </div>
      </div>
   );
};

TotalXReport.propTypes = {
   // title: PropTypes.string,
   // icon: PropTypes.string,
   data: PropTypes.array,
};

TotalXReport.defaultProps = {
   // title: 'Title',
   // icon: 'Sales',
   data: [],
};

export default TotalXReport;
