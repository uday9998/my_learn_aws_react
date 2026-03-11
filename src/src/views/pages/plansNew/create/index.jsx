import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import PlanCreateLeft from './components/PlanCreateLeft';
import MembershipCreateLeft from './components/MembershipCreateLeft';
import PlanCreateRight from './components/PlanCreateRight';

const PlanCreateView = ({
   inputs, onChange, courses, selectedProduct, handleCreatePlan, isMobile, isPreview, isMembership,
   goToIntegrations, integrations, errorMessages, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage
}) => {
   return (
      <div className='plan__create'>
         {
            !isPreview && !isMembership && (
               <PlanCreateLeft
                  courses={ courses }
                  inputs={ inputs }
                  handleCreatePlan={ handleCreatePlan }
                  onChange={ onChange }
                  errorMessages={ errorMessages }
                  clearErrorMessages={ clearErrorMessages }
                  removeErrorMessage={ removeErrorMessage }
                  addTemporaryErrorMessage={ addTemporaryErrorMessage }
               />
            )
         }
         {
            !isPreview && isMembership && (
               <MembershipCreateLeft
                  courses={ courses }
                  inputs={ inputs }
                  handleCreatePlan={ handleCreatePlan }
                  onChange={ onChange }
                  integrations={ integrations }
                  goToIntegrations={ goToIntegrations }
                  errorMessages={ errorMessages }
                  clearErrorMessages={ clearErrorMessages }
                  removeErrorMessage={ removeErrorMessage }
                  addTemporaryErrorMessage={ addTemporaryErrorMessage }
               />
            )
         }
         {
            (!isMobile || isPreview) && (
               <PlanCreateRight
                  data={ inputs }
                  selectedProduct={ selectedProduct }
                  isMobile={ isMobile }
                  isMembership={ true }
               />
            )
         }
      </div>
   );
};

PlanCreateView.propTypes = {
   courses: PropTypes.array,
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   handleCreatePlan: PropTypes.func,
   selectedProduct: PropTypes.object,
   isMobile: PropTypes.bool,
   isPreview: PropTypes.bool,
   isMembership: PropTypes.bool,
   integrations: PropTypes.array,
   goToIntegrations: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default PlanCreateView;
