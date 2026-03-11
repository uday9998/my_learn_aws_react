import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'components/elements/chart';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

import './index.scss';
import TopCoursesReportItem from './TopCoursesReportItem';

const colors = [
   '#2c72ef', '#328af2', '#55a1f4', '#7fb8f7', '#aad0fa', '#d5e8fc',
];

const TopCourseReport = ({ data: topCoursesData, total }) => {
   const { data, courses } = topCoursesData;
   const labels = courses.map(({ name }) => name);
   return (
      <div className='topItemsWrapper'>
         <Text
            type={ TextType.normal }
            size={ TextSize.base }
            inner='Revenue By Course'
         />
         <div className='flex justify-between'>
            <div>
               {courses.map(({
                  revenue, revenuePercentage, name, id,
               }, index) => (
                  <TopCoursesReportItem
                     title={ name }
                     key={ id }
                     subtitle={ `$${revenue} (${revenuePercentage}%)` }
                     className='m-t-m'
                     color={ colors[index] }
                  />
               ))}
               {courses.length === 0 && (
                  Array.from({ length: 6 }).map((_, index) => <TopCoursesReportItem key={ index } className='m-t-m' isEmpty />)
               )}
            </div>

            <div className='relative flex align-center'>
               <div>
                  <div className='pieChartLabel'>
                     <div className='pieChartLabel__inner'>
                        {data.length > 0 && (
                           <>
                              <div className='text-center'>

                                 <Text
                                    type={ TextType.bold }
                                    size={ TextSize.small }
                                    inner={ `$${total}` }
                                 />
                              </div>
                              <div>
                                 <Text
                                    type={ TextType.demibold }
                                    size={ TextSize.extraSmall }
                                    inner='Total Revenue'
                                 />
                              </div>
                           </>
                        )}
                        {data.length === 0 && (
                           <div className='text-center'>

                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner='No Data'
                              />
                           </div>
                        )}
                     </div>
                  </div>
                  <div className='pieChart__Chart'>
                     {data.length === 0 && (
                        <div className='pieNoData'>
                           <div className='innerCircle' />
                        </div>
                     )}
                     {data.length > 0 && (
                        <Chart
                           data={ data }
                           datasets={ {
                              backgroundColor: colors,
                           } }
                           labels={ labels }
                           options={ {
                              responsive: true,
                              maintainAspectRatio: true,
                              cutoutPercentage: 80,
                              legend: {
                                 display: false,
                              },
                              tooltips: {
                                 callbacks: {
                                    label(tooltipItem, data) {
                                       return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index]}%`;
                                    },
                                 },
                              },
                           } }
                           type='pie'
                        />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

TopCourseReport.propTypes = {
   data: PropTypes.object,
   total: PropTypes.number,
};

export default TopCourseReport;
