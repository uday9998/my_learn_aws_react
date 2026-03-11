import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import { uniqueId } from 'lodash';
import DonutChart from 'components/elements/charts/donut';
import LoaderMini from 'components/elements/loaderMini';
import { parseFloatNew } from 'utils/numberParseFloat';

export const NetRevenueChartRefunds = ({ revenue }) => {
   const [refundsData, setRefundsData] = useState([]);
   useEffect(() => {
      let chartData = [];
      if (revenue.refund_and_revenue !== undefined) {
         chartData = [...Object.values(revenue.refund_and_revenue.refunds.first_courses)];
         chartData = chartData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
         setRefundsData(chartData);
      }
      if (revenue.refund_and_revenue !== undefined && !!revenue.refund_and_revenue.refunds.other) {
         setRefundsData([...(chartData || []), { ...revenue.refund_and_revenue.refunds.other, course_name: 'Other' }]);
      }
   }, [revenue]);
   return (
      <div className='net-revenue-chart'>
         <Text inner='Refunds By Offer' type={ txtTypes.regularDefault } size={ txtSizes.medium } />
         <div className='net-revenue-chart-items'>
            {refundsData !== undefined ? (
               <>
                  {!!refundsData?.length && revenue?.refund_and_revenue?.refunds && <DonutChart donutData={ refundsData } title='Refunds' total={ revenue?.refund_and_revenue?.refunds?.total === 0 ? 0 : revenue?.refund_and_revenue?.refunds?.total } isPink={ true } />}
                  {refundsData.map((e, index) => {
                     return (
                        <div className='net-revenue-chart-item' key={ uniqueId() }>
                           <div className='net-revenue-chart-item-left'>
                              <span className={ `net-revenue-status-pink net-revenue-status-pink net-revenue-status-pink-${ index }` } />
                              <Text inner={ `${ e.precentage }%` } className='net-revenue-chart-item-prcent' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                              <Text inner={ e.course_name } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                           </div>
                           <div className='net-revenu-chart-item-rigth'>
                              <Text
                                 inner={ parseFloatNew(e.price) }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small } />
                           </div>
                        </div>

                     );
                  })}
               </>
            ) : (
               <div className='net-revenue-chart-loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}

         </div>
      </div>
   );
};

NetRevenueChartRefunds.propTypes = {
   revenue: PropTypes.object,
};
