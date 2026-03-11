import React from 'react';
import PropTypes from 'prop-types';
import withLoading from 'utils/withLoading';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import ReportsContainer from 'views/newLayout/reports';
import ReportsHeader from 'components/modules/reportsHeader';
import LoaderMini from 'components/elements/loaderMini';
// import LoaderSpinner from 'components/elements/LoaderSpiner';
import { isLocalhost } from 'utils/Helpers';
import { parseFloat } from 'utils/numberParseFloat';
import SubscriptionMetricsForm from './SubscriptionMetricsComponent/SubscriptionMetricsForm';
import './index.scss';
import SubscriptionMetricsTabs from './SubscriptionMetricsComponent/SubscriptionMetricsTabs';
import SubscriptionChartMrr from './SubscriptionMetricsComponent/SubscriptionChartMrr';
import SubscriptionChartRate from './SubscriptionMetricsComponent/SubscriptionChartRate';
import SubscriptionMetricsTable from './SubscriptionMetricsComponent/SubscriptionMetricsTable';

const ReportsContainerLoading = withLoading(ReportsContainer);

const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

const SubscriptionMetricsView = ({
   inputs,
   isMrr,
   onChangeChart,
   courses,
   dataAnalytics,
   handleSubscriptionMetrics,
   loadingUpdate,
}) => {
   const exportCSV = () => {
      const url = `${ apiUrl }/api/v1/reports/metrics/csv-export-new?plan_id=${ inputs.offer_id }&from=${ inputs.from }&to=${ inputs.to }&delimeter=&${ inputs.delimeter }`;
      const hiddenElement = document.createElement('a');
      hiddenElement.href = url;
      hiddenElement.click();
   };

   return (
      <div className='subscription__metrics'>
         <SubscriptionMetricsForm
            offer={ inputs.offer_id }
            searchFrom={ inputs.searchFrom }
            searchTo={ inputs.searchTo }
            handleInputChange={ handleSubscriptionMetrics }
            courses={ courses }
         />
         <ReportsContainerLoading isLoading={ loadingUpdate }>
            <ReportsHeader title='Subscription Metrics' exportCSV={ () => exportCSV() } printList={ () => {} } />
            <div className='subscription__metrics__lastresults'>
               <div className='subscription__metrics__lastresults__left'>
                  {dataAnalytics.last_30_days !== undefined ? (
                     <Text
                        // inner={ `$${ Math.round(Number(dataAnalytics.last_30_days) * 100) / 100 }` }
                        inner={ parseFloat(dataAnalytics.last_30_days) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge }
                     />
                  ) : (
                     <LoaderMini color='#131f1e' />
                  )}
                  <Text
                     inner='Last 30 Days'
                     type={ txtTypes.regularLarge }
                     size={ txtSizes.xsmall }
                  />
               </div>
               <div className='subscription__metrics__lastresults__right'>
                  {dataAnalytics.all !== undefined ? (
                     <Text
                        // inner={ `$${ Math.round(Number(dataAnalytics.all) * 100) / 100 }` }
                        inner={ parseFloat(dataAnalytics.all) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge }
                     />
                  ) : (
                     <LoaderMini color='#131f1e' />
                  )}
                  <Text
                     inner='All Time'
                     type={ txtTypes.regularLarge }
                     size={ txtSizes.xsmall }
                  />
               </div>
            </div>
            {(inputs.delimeter && dataAnalytics.churn_rate) && (
               <SubscriptionMetricsTabs isMrr={ isMrr } onChange={ onChangeChart } />
            )}
            {isMrr ? (
               <SubscriptionChartMrr
                  delimeter={ inputs.delimeter }
                  handleSubscriptionMetrics={ handleSubscriptionMetrics }
                  mrr={ dataAnalytics }
               />
            ) : (
               <SubscriptionChartRate
                  churnRate={ dataAnalytics.churn_rate }
                  delimeter={ inputs.delimeter }
                  handleSubscriptionMetrics={ handleSubscriptionMetrics }
               />
            )}
            <SubscriptionMetricsTable
               data={ dataAnalytics.analytics_data }
            />
         </ReportsContainerLoading>
      </div>
   );
};

SubscriptionMetricsView.propTypes = {
   inputs: PropTypes.object,
   isMrr: PropTypes.bool,
   onChangeChart: PropTypes.func,
   courses: PropTypes.object,
   dataAnalytics: PropTypes.object,
   handleSubscriptionMetrics: PropTypes.func,
   loadingUpdate: PropTypes.bool,
};

export default SubscriptionMetricsView;
