import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import useForms from 'utils/hooks/useForms/index';
import { getSettings } from 'api';

import Icon from 'components/elements/Icon';
import './PrepareLaunchContent.scss';

const PrepareLaunchContent = ({ history, onMoveToNextStep, onCompleteStep, hasConnectedPaymentMethod }) => {
  // Set up form retrieval for account settings
  const forms = useMemo(() => {
    return [
      { key: 'account', fetchAction: getSettings.bind(null, 'account') }
    ];
  }, []);

  // Use the useForms hook to get the form state
  const { state } = useForms(forms, 'account');
 
  
  // Get apiUrl from environment variables
  const apiUrl = process.env.REACT_APP_MAIN_DOMAIN;
  
  // Extract subdomain from the account data
  const subdomain = state.account?.data?.subdomain || '';
  const fullDomain = `${subdomain}.${apiUrl}`;

  // Use the passed in hasConnectedPaymentMethod prop
  const [hasPaymentIntegration, setHasPaymentIntegration] = useState(hasConnectedPaymentMethod || false);
  
  // Update local state when prop changes
  useEffect(() => {
    setHasPaymentIntegration(hasConnectedPaymentMethod || false);
  }, [hasConnectedPaymentMethod]);

  const handleConnectPayment = () => {
    history.push('/admin/settings#integrations');
  };

  const handlePreviewSite = () => {
    window.open(`https://${fullDomain}`, '_blank');
  };
  
  const handleFinish = () => {
    // Mark this step as completed
    if (onCompleteStep) {
      onCompleteStep('prepare-launch');
    }
    
    // If we have a next step function, call it
    if (onMoveToNextStep) {
      onMoveToNextStep('prepare-launch');
    }
  };

  // Automatically complete the step if payment is connected
  useEffect(() => {
    if (hasPaymentIntegration && onCompleteStep) {
      onCompleteStep('prepare-launch');
    }
  }, [hasPaymentIntegration, onCompleteStep]);

  return (
    <div className="prepare-launch-content">
      <div className="launch-section">
        <div className="section-header">
          <Icon name="CreditCard" className="section-icon" />
          <h3 className="section-title">Connect Payment</h3>
        </div>
        
        <p className="section-description">Connect a payment provider to accept payments from your members.</p>
        
        {hasPaymentIntegration ? (
          <div className="payment-status connected">
            <Icon name="CheckCircle" className="status-icon" />
            <p>Payment integration connected successfully!</p>
          </div>
        ) : (
          <button className="connect-payment-button" onClick={handleConnectPayment}>
            <Icon name="CreditCard" className="button-icon" />
            Connect Payment Provider
          </button>
        )}
      </div>
      
      <div className="launch-section">
        <div className="section-header">
          <Icon name="ExternalLink" className="section-icon" />
          <h3 className="section-title">Preview Your Site</h3>
        </div>
        
        <p className="section-description">See how your membership site will appear to your members before you launch.</p>
        
        <div className="domain-preview">
          <Icon name="Globe" className="globe-icon" />
          <span className="domain-text">{fullDomain}</span>
        </div>
        
        <button className="preview-site-button" onClick={handlePreviewSite}>
          Preview Site
          <Icon name="ExternalLink" className="button-icon" />
        </button>
      </div>
      
      {/* <div className="navigation-buttons">
        <button 
          className={`finish-button ${!hasPaymentIntegration ? 'disabled' : ''}`} 
          onClick={handleFinish}
          disabled={!hasPaymentIntegration}
        >
          {hasPaymentIntegration ? 'Finish' : 'Connect a payment provider to finish'}
          {hasPaymentIntegration && <Icon name="ChevronRight" className="button-icon" />}
        </button>
        {!hasPaymentIntegration && (
          <p className="warning-text">You need to connect a payment provider before finishing.</p>
        )}
      </div> */}
    </div>
  );
};

PrepareLaunchContent.propTypes = {
  history: PropTypes.object.isRequired,
  onMoveToNextStep: PropTypes.func,
  onCompleteStep: PropTypes.func,
  hasConnectedPaymentMethod: PropTypes.bool
};

export default withRouter(PrepareLaunchContent);