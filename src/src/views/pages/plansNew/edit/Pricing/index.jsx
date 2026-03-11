import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import PlanPricingLeft from './components/PricingLeft';
import PlanCreateRight from '../../create/components/PlanCreateRight';

const PlanPricingPage = ({
   plan, onChange, handleConnectIntegration, goToIntegrations, goToOrderBump, deleteOrderBump,
   goToOrderBumpEdit, isCoursePage, match, uuid, errorMessages, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage
}) => {
   return (
      <div className='plan__pricing__page'>
         <PlanPricingLeft
            goToIntegrations={ goToIntegrations }
            goToOrderBump={ goToOrderBump }
            goToOrderBumpEdit={ goToOrderBumpEdit }
            data={ plan }
            onChange={ onChange }
            handleConnectIntegration={ handleConnectIntegration }
            deleteOrderBump={ deleteOrderBump }
            isCoursePage={ isCoursePage }
            match={ match }
            errorMessages={ errorMessages }
            clearErrorMessages={ clearErrorMessages }
            removeErrorMessage={ removeErrorMessage }
            addTemporaryErrorMessage={ addTemporaryErrorMessage }
         />
         <PlanCreateRight
            data={ plan }
            selectedProduct={ plan.courses[0] }
            isCoursePage={ isCoursePage }
            match={ match }
            uuid={ uuid }
         />
      </div>
   );
};

PlanPricingPage.propTypes = {
   plan: PropTypes.object,
   onChange: PropTypes.func,
   goToOrderBump: PropTypes.func,
   handleConnectIntegration: PropTypes.func,
   goToIntegrations: PropTypes.func,
   deleteOrderBump: PropTypes.func,
   goToOrderBumpEdit: PropTypes.func,
   isCoursePage: PropTypes.bool,
   match: PropTypes.object,
   uuid: PropTypes.string,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default PlanPricingPage;
