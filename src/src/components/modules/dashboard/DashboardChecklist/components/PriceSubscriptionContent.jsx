import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Icon from 'components/elements/Icon';
import './PriceSubscriptionContent.scss';

const PriceSubscriptionContent = ({ history, onMoveToNextStep }) => {
  const handleAddPricing = () => {
    history.push('/admin/membership/create');
  };

  const handleContinue = () => {
  
    if (onMoveToNextStep) {
      onMoveToNextStep('add-content');
    }
  };

  const handleSkip = () => {
    // Skip this step and move to next
    if (onMoveToNextStep) {
      onMoveToNextStep('add-content');
    }
  };

  return (
    <div className="price-subscription-content">
      <div className="pricing-container">
        <p className="pricing-message">Add a pricing plan to your membership site.</p>
        
        <button className="add-pricing-button" onClick={handleAddPricing}>
          <Icon name="Plus" className="plus-icon" />
          Add Pricing
        </button>
      </div>

      {/* <div className="navigation-buttons">
        <button className="continue-button" onClick={handleContinue}>
          Continue
          <Icon name="ChevronRight" className="button-icon" />
        </button>
        
        <button className="skip-button" onClick={handleSkip}>
          Skip
        </button>
      </div> */}
    </div>
  );
};

PriceSubscriptionContent.propTypes = {
  history: PropTypes.object.isRequired,
  onMoveToNextStep: PropTypes.func
};

export default withRouter(PriceSubscriptionContent);