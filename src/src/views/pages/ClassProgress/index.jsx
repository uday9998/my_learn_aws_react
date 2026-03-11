import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ReportsContainer from 'views/newLayout/reports';
import ReportsHeader from 'components/modules/reportsHeader';
import withLoading from 'utils/withLoading';
import LoaderMini from 'components/elements/loaderMini';
import { isLocalhost } from 'utils/Helpers';
import ClassProgressFilter from './ClassProgressComponents/ClassProgressFilter';
import ClassProgressInfo from './ClassProgressComponents/ClassProgressInfo';
import ClassProgressChart from './ClassProgressComponents/ClassProgressChart';
import ClassProgressTopUsers from './ClassProgressComponents/ClassProgressTopUsers';
import ClassProgressTable from './ClassProgressComponents/ClassProgressTable';

const ReportsContainerLoading = withLoading(ReportsContainer);


const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

const ClassProgressView = ({
   inputs, handleInputChange, completionData, loading,
   goTo, courses,
}) => {
   const coursesForSelectOption = courses.courses.map(course => ({ label: course.name, value: course.id, type: course.type }));
   const exportCSV = () => {
      const url = `${ apiUrl }/api/v1/reports/class-progress/csv-export-new?course_id=${ inputs.course }&email=${ inputs.email }&name=${ inputs.name }`;
      const hiddenElement = document.createElement('a');
      hiddenElement.href = url;
      hiddenElement.click();
   };

   return (
      <div className='class__progress'>
         <ClassProgressFilter
            options={ coursesForSelectOption }
            inputs={ inputs }
            handleChangeInput={ handleInputChange }
         />
         <ReportsContainerLoading isLoading={ loading }>
            <ReportsHeader
               title='Product Progress'
               printList={ () => {} }
               exportCSV={ () => exportCSV() }
            />
            <ClassProgressInfo data={ completionData } />
            <div className='class__progress__section'>
               {!!completionData
               && !!Object.keys(completionData).length && <ClassProgressChart data={ completionData } />}
               <ClassProgressTopUsers data={ completionData } />
            </div>
            {completionData.members !== undefined ? (
               <>
                  {
                     (!!completionData.members && completionData.members.length) ? (
                        <ClassProgressTable
                           goTo={ goTo }
                           data={ completionData.members }
                        />
                     ) : null
                  }
               </>
            ) : (
               <div className='class__progress__section__loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}
         </ReportsContainerLoading>
      </div>
   );
};

ClassProgressView.propTypes = {
   inputs: PropTypes.object,
   completionData: PropTypes.object,
   handleInputChange: PropTypes.func,
   loading: PropTypes.bool,
   goTo: PropTypes.func,
   courses: PropTypes.object,
};

export default ClassProgressView;
