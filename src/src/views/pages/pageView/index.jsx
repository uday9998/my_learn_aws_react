import React from 'react';
import ReportsHeader from 'components/modules/reportsHeader';
import withLoading from 'utils/withLoading';
import ReportsContainer from 'views/newLayout/reports';
import PropTypes from 'prop-types';
import LoaderMini from 'components/elements/loaderMini';
import { PageViewForm } from './PageViewComponents/PageViewForm';
import './index.scss';
import { PageViewStatistic } from './PageViewComponents/PageViewStatistic';
import { PageViewChart } from './PageViewComponents/PageViewChart';
import { PageViewTable } from './PageViewComponents/PageViewTable';


const ReportsContainerLoading = withLoading(ReportsContainer);


const PageViewsView = ({
   landingStatistic, handleLandingStatisticChange, delimeter, landingId,
   searchFrom, searchTo, loadingUpdate,
}) => {
   return (
      <div className='page-view'>
         <div className='page-view'>
            {landingStatistic.landing_page_by_views !== undefined ? (

               <PageViewForm
                  landingStatistic={ landingStatistic }
                  landingId={ landingId }
                  handleLandingStatisticChange={ handleLandingStatisticChange }
                  searchFrom={ searchFrom }
                  searchTo={ searchTo }
               />
            ) : (
               <div className='page-view-loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}
            <ReportsContainerLoading isLoading={ loadingUpdate }>
               <ReportsHeader
                  title='Page Views'
                  printList={ () => {} }
               />
               <PageViewStatistic
                  landingStatistic={ landingStatistic }
                  handleLandingStatisticChange={ handleLandingStatisticChange }
                  delimeter={ delimeter }
               />
               <PageViewChart
                  data={ landingStatistic.landing_page_by_views }
                  usersCountAll={ landingStatistic.users_count_all }
               />
               <PageViewTable
                  data={ landingStatistic.with_dates }
                  uniqueUsersAllCount={ landingStatistic.unique_users_all_count }
                  usersCountAll={ landingStatistic.users_count_all }
               />
            </ReportsContainerLoading>
         </div>
      </div>
   );
};

PageViewsView.propTypes = {
   landingStatistic: PropTypes.object,
   landingId: PropTypes.any,
   handleLandingStatisticChange: PropTypes.func,
   delimeter: PropTypes.string,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
   loadingUpdate: PropTypes.bool,
};

export default PageViewsView;
