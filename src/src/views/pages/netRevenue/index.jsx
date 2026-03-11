import React from 'react';
import './index.scss';
import ReportsContainer from 'views/newLayout/reports';
import ReportsHeader from 'components/modules/reportsHeader';
import ReportsTimeData from 'components/modules/reports/ReportsTimeData';
import PropTypes from 'prop-types';
import withLoading from 'utils/withLoading';
import { isLocalhost } from 'utils/Helpers';
import NetRevenueForm from './NetRevenueComponents/NetRevenueForm';
import NetRevenueStatus from './NetRevenueComponents/NetRevenueStatus';
import { NetRevenueChartRevenue } from './NetRevenueComponents/NetRevenueChartRevenue';
import { NetRevenueChartRefunds } from './NetRevenueComponents/NetRevenueChartRefunds';
import { NetRevenueTable } from './NetRevenueComponents/NetRevenueTable';

const ReportsContainerLoading = withLoading(ReportsContainer);


const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

const NetRevenueView = ({
   revenue, offers, loadingRevenue, inputs, handleInputChange,
}) => {
   const exportCSV = () => {
      const url = `${ apiUrl }/api/v1/reports/net-revenue/csv-export-new?plan_id=${ inputs.offer_id }&from=${ inputs.from }&to=${ inputs.to }&delimeter=${ inputs.delimeter }`;
      const hiddenElement = document.createElement('a');
      hiddenElement.href = url;
      hiddenElement.click();
   };

   return (
      <div className='net-revenue'>
         <NetRevenueForm offers={ offers } inputs={ inputs } handleInputChange={ handleInputChange } />
         <ReportsContainerLoading isLoading={ loadingRevenue }>
            <div className='net-revenue-body'>
               <ReportsHeader
                  title='Net Revenue'
                  printList={ () => {} }
                  exportCSV={ () => exportCSV() }
               />
               <ReportsTimeData data={ revenue } />
               <NetRevenueStatus
                  data={ revenue }
                  delimeter={ inputs.delimeter }
                  handleInputChange={ handleInputChange }
               />
               <div className='net-revenue-charts'>
                  <NetRevenueChartRevenue revenue={ revenue } />
                  <NetRevenueChartRefunds revenue={ revenue } />
               </div>
               <NetRevenueTable data={ revenue } />
            </div>
         </ReportsContainerLoading>
      </div>
   );
};

NetRevenueView.propTypes = {
   revenue: PropTypes.object,
   offers: PropTypes.object,
   loadingRevenue: PropTypes.bool,
   inputs: PropTypes.object,
   handleInputChange: PropTypes.func,
};

export default NetRevenueView;
