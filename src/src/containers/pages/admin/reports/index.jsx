import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'views/layout/AdminContainer';
import { connect } from 'react-redux';
import { setInput as setInputAction } from 'state/modules/designCourse/create/actions';
import * as selectors from 'state/modules/reports/selectors';
import { setFilterInput as setFilterInputAction } from 'state/modules/reports/actions';
import * as operations from 'state/modules/reports/operations';
import ReportsHeader from 'views/layout/ReportsHeader';
import CourseReports from 'views/pages/CourseReports';
import { authUserSelector } from 'state/modules/common/selectors';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import withLoading from 'utils/withLoading';

const ContainerLoading = withLoading(Container);

class ReportsContainer extends Component {
   static propTypes = {
      getCoursesStatistics: PropTypes.func,
      setFilterInput: PropTypes.func,
      reports: PropTypes.object,
      reportItems: PropTypes.object,
      auth: PropTypes.object,
      initDataInProgress: PropTypes.bool,
      goToBack: PropTypes.func,
   };


   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {
      const { getCoursesStatistics, reports } = this.props;
      getCoursesStatistics({
         date_type: 'custom',
         from: reports.filter.from,
         to: reports.filter.to,
      }, { firstGet: true });
   }

   handleFilterChange = (key, value) => {
      const { reports: { filter }, getCoursesStatistics, setFilterInput } = this.props;
      setFilterInput(key, value);
      if (key === 'course_id') {
         filter.course_id = value;
         getCoursesStatistics(filter, { courseChanged: true });
      }
   }

   handleFilterSave = () => {
      const { reports: { filter }, getCoursesStatistics } = this.props;
      getCoursesStatistics(filter, { courseChanged: false });
   }

   render() {
      const {
         reports, auth: { created_at: createdAt }, initDataInProgress, goToBack,
         reportItems,
      } = this.props;
      return (
         (
            <ContainerLoading isLoading={ initDataInProgress }>
               <Container.Header>
                  <ReportsHeader
                     reports={ reports }
                     handleFilterChange={ this.handleFilterChange }
                     value={ reports.filter.course_id }
                     title='Class Report'
                     tooltip='On this page you can view your class analytics. View number of customers, gross income, class completed and successful payment. You can also filter your search based on dates.'
                     tooltipStyle={ { width: '550px', whiteSpace: 'normal' } }
                  />
                  <SiteHeaderMobile
                     isLeftAction
                     goToBack={ goToBack }
                     title='Class Report'
                     tooltip='On this page you can view your class analytics. View number of customers, gross income, class completed and successful payment. You can also filter your search based on dates.'
                  />
               </Container.Header>
               <Container.Content>
                  <CourseReports
                     reports={ reports }
                     reportItems={ reportItems }
                     authCreatedAt={ createdAt }
                     handleFilterChange={ this.handleFilterChange }
                     handleFilterSave={ this.handleFilterSave }
                     courseValue={ reports.filter.course_id }
                  />
               </Container.Content>
            </ContainerLoading>
         )
      );
   }
}

const mapStateToProps = (state) => {
   return {
      initDataInProgress: selectors.initDataInProgress(state),
      reports: selectors.reportsSelector(state),
      reportItems: selectors.reportItemsSelector(state),
      auth: authUserSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setInput: (key, value, target) => {
         dispatch(setInputAction(key, value, target));
      },
      getCoursesStatistics: (param, options) => {
         dispatch(operations.getCoursesStatisticsOperation(param, options));
      },
      setFilterInput: (key, value) => {
         dispatch(setFilterInputAction(key, value));
      },
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer);
