import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'views/layout/AdminContainer';
import { connect } from 'react-redux';
import ReportsHeader from 'views/layout/ReportsHeader';
import * as selectors from 'state/modules/revenueReports/selectors';
import * as operations from 'state/modules/revenueReports/operations';
import RevenueReports from 'views/pages/RevenueReports';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { push } from 'connected-react-router';
import Router from 'routes/router';

class RevenueReportsContainer extends Component {
   static propTypes = {
      getRevenueStatistic: PropTypes.func,
      getRevenueFilterStatistic: PropTypes.func,
      reports: PropTypes.object,
      fetchData: PropTypes.bool,
      fetchFilterData: PropTypes.bool,
      goToBack: PropTypes.func,
   };

   state={
      courseId: '',
   }

   componentDidMount() {
      const { getRevenueStatistic } = this.props;
      getRevenueStatistic();
   }

   handleFilterChange = (name, value) => {
      this.setState({ courseId: value }, () => {
         const { getRevenueFilterStatistic } = this.props;
         getRevenueFilterStatistic(value);
      });
   }

   render() {
      const {
         reports, fetchData, fetchFilterData, goToBack,
      } = this.props;
      const { courseId } = this.state;
      return (
         !fetchData && (
            <Container>
               <Container.Header>
                  <ReportsHeader
                     reports={ reports }
                     handleFilterChange={ this.handleFilterChange }
                     value={ courseId }
                     title='Revenue Report'
                     tooltip='View your total sales and total number of members.'
                  />
                  <SiteHeaderMobile
                     isLeftAction
                     goToBack={ goToBack }
                     title='Revenue Report'
                     tooltip='View your total sales and total number of members.'
                  />
               </Container.Header>
               <Container.Content>
                  {!fetchFilterData && (
                     <RevenueReports
                        sales={ reports.sales }
                        membersCount={ reports.members_count }
                        reports={ reports }
                        handleFilterChange={ this.handleFilterChange }
                        courseValue={ courseId }
                     />
                  )}
               </Container.Content>
            </Container>
         )
      );
   }
}

const mapStateToProps = (state) => {
   return {
      fetchData: selectors.fetchDataSelector(state),
      ftechFilterData: selectors.fetchFilterDataSelector(state),
      reports: selectors.reportsSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getRevenueStatistic: (param) => {
         dispatch(operations.getRevenueStatisticOperation(param));
      },
      getRevenueFilterStatistic: (param) => {
         dispatch(operations.getRevenueFilterStatisticOperation(param));
      },
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(RevenueReportsContainer);
