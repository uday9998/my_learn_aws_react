import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CourseCommissions from 'components/modules/courseReports/CourseCommissions';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Chart from 'components/elements/chart';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import moment from 'moment';
import ReportItem from 'components/modules/courseReports/ReportItem';
import AllTimeSaleReport from 'components/modules/courseReports/AllTimeSaleReport';
import TopCourseReport from 'components/modules/courseReports/TopCoursesReport';
import ReportsDayByDayTable from 'components/modules/courseReports/ReportDayByDayTable';


const CourseReports = ({
   reports, handleFilterChange, authCreatedAt, handleFilterSave, courseValue,
   reportItems,
}) => {
   const [unit, setUnit] = useState('day');
   const [days, setDays] = useState(0);
   const { allTimeReports, revenueByCourse } = reportItems;

   useEffect(() => {
      const start = moment(reports.filter.from);
      const end = moment(reports.filter.to);
      const diffInMonths = end.diff(start, 'months', true);
      if (diffInMonths >= 2) {
         if (diffInMonths >= 12) {
            setUnit('month');
            setDays(5);
         } else {
            setUnit('week');
            setDays(1);
         }
      } else {
         setUnit('day');
         setDays(0);
      }
   }, [reports.filter]);

   const setYAxes = () => {
      const max = Math.max(...reports.sales_statistic.values);
      const ticks = {
         beginAtZero: true,
         stepSize: 1,
      };
      if (max) {
         ticks.max = max;
         ticks.stepSize = Math.ceil(max / 10);
      }
      return [{
         gridLines: {
            drawBorder: false,
         },
         ticks,
      }];
   };

   const setXAxes = () => {
      const max = moment(reports.sales_statistic.labels[reports.sales_statistic.labels.length - 1], 'YYYY-MM-DD').add('days', days);
      return [{
         gridLines: {
            display: false,
         },
         type: 'time',
         time: {
            format: 'YYYY-MM-DD',
            unit,
            displayFormats: {
               day: 'MMM DD',
               week: 'MMM DD',
               month: 'MMM',
            },
            max,
         },
         ticks: {
            autoSkip: false,
         },
         scaleLabel: {
            display: true,
            labelString: 'Date',
         },
      }];
   };
   const coursesOption = [
      { label: 'All Classes', value: '' },
   ];
   reports.courses.map(item => coursesOption.push({ label: item.name, value: item.id }));
   return (
      <div className='courseReports-page'>
         <CourseCommissions
            reports={ reports }
            handleFilterChange={ handleFilterChange }
            authCreatedAt={ authCreatedAt }
            handleFilterSave={ handleFilterSave }
            coursesOption={ coursesOption }
            courseValue={ courseValue }
         />
         {reports.sales_statistic && (
            <div className='m-t-exl sales-content' style={ { maxWidth: '1129px' } }>
               <ItemWrapper style={ { padding: '32px 50px 32px 42px' } }>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.base }
                     inner='Sales'
                     className='m-b-exl p-b-m'
                  />
                  <Chart
                     type='line'
                     labels={ reports.sales_statistic.labels }
                     data={ reports.sales_statistic.values }
                     datasets={ {
                        backgroundColor: 'transparent',
                        borderColor: '#006EFA',
                        borderWidth: 2,
                        lineTension: 0,
                        pointRadius: 5,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#006EFA',
                     } }
                     options={ {
                        scales: {
                           yAxes: setYAxes(),
                           xAxes: setXAxes(),
                        },
                        legend: {
                           display: false,
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                     } }
                  />
               </ItemWrapper>
            </div>
         )}
         <div className='m-t-m' style={ { maxWidth: '1129px' } }>
            <ReportItem loading={ allTimeReports.loading }>
               <AllTimeSaleReport data={ allTimeReports.data } />
            </ReportItem>
            <div className='m-t-m'>
               <ReportItem loading={ revenueByCourse.loading } half>
                  <TopCourseReport data={ revenueByCourse.data } total={ revenueByCourse.total } />
               </ReportItem>
            </div>
            <div className='m-t-m m-b-m'>
               <ReportItem loading={ revenueByCourse.loading }>
                  <ReportsDayByDayTable data={ revenueByCourse.reportsDayByDay } />
               </ReportItem>
            </div>
         </div>
      </div>
   );
};
CourseReports.propTypes = {
   handleFilterChange: PropTypes.func,
   handleFilterSave: PropTypes.func,
   reports: PropTypes.object,
   reportItems: PropTypes.object,
   authCreatedAt: PropTypes.string,
   courseValue: PropTypes.any,
};

export default CourseReports;
