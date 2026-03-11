import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import PLanMainLeft from './components/MainLeft';
import PlanMainRight from './components/MainRight';

const PlanMainPage = ({
   plan, onChange, uuid, isCoursePage,
   errorMessages, removeErrorMessage
}) => {
   return (
      <div className='plan__main'>
         <PLanMainLeft
            plan={ plan }
            onChange={ onChange }
            uuid={ uuid }
            isCoursePage={ isCoursePage }
            errorMessages={ errorMessages }
            removeErrorMessage={ removeErrorMessage }
         />
         {!isCoursePage && (
            <PlanMainRight
               status={ plan.status }
               plan={ plan }
               onChange={ onChange }
               image={ plan.picture_src || (plan.file && plan.file.src) }
            />
         )}
      </div>
   );
};

PlanMainPage.propTypes = {
   plan: PropTypes.object,
   onChange: PropTypes.func,
   uuid: PropTypes.string,
   isCoursePage: PropTypes.bool,
   errorMessages: PropTypes.object,
   removeErrorMessage: PropTypes.func,
};

export default PlanMainPage;
