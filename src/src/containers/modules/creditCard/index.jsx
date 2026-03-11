/* eslint-disable jsx-quotes */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Lock, CheckCircle, Users } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { priceInitialData } from '../../../constants/pricing/index';
import { authUserSelector } from '../../../state/modules/common/selectors';
import './index.css';

// Load Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY || 'pk_test_your_stripe_key_here');

// Stripe form component that uses Elements
const TrialForm = () => {
   const stripe = useStripe();
   const elements = useElements();
   const authUser = useSelector(authUserSelector);
   const [selectedPlan, setSelectedPlan] = useState('essential');
   const [isProcessing, setIsProcessing] = useState(false);
   const [errors, setErrors] = useState({});

   const handleSubmit = async (event) => {
      event.preventDefault();
      
      if (!stripe || !elements) {
         return;
      }

      setIsProcessing(true);
      setErrors({});

      try {
         // Step 1: Create setup intent
         const setupResponse = await axios.post('/api/main/trial/trial/setup-intent', {
            email: authUser?.email,
            name: authUser?.name,
         });

         const { client_secret } = setupResponse.data;

         // Step 2: Confirm setup intent with card
         const cardElement = elements.getElement(CardElement);
         const { error, setupIntent } = await stripe.confirmCardSetup(client_secret, {
            payment_method: {
               card: cardElement,
               billing_details: {
                  name: authUser?.name,
                  email: authUser?.email,
               },
            },
         });

         if (error) {
            setErrors({ payment: error.message });
            setIsProcessing(false);
            return;
         }

         // Step 3: Create trial subscription
         const trialResponse = await axios.post('/api/main/trial/trial/create-subscription', {
            email: authUser?.email,
            name: authUser?.name,
            setup_intent_id: setupIntent.id,
            plan_type: selectedPlan,
         });

         window.location.reload();
         
      } catch (error) {
         setErrors({
            general: error.response?.data?.error || 'An error occurred while creating your trial.'
         });
      } finally {
         setIsProcessing(false);
      }
   };

   return (
      <div className="trial-form">
         <form onSubmit={handleSubmit}>
               {/* Plan Selection */}
               <div className="plan-selection">
                  <h3>Choose Your Plan</h3>
                  <div className="plans-grid">
                     {priceInitialData.filter(plan => ['Essential', 'Surge', 'Infinite'].includes(plan.title)).map((plan, index) => (
                        <div 
                           key={index}
                           className={`plan-card ${selectedPlan === plan.title.toLowerCase() ? 'selected' : ''}`}
                           onClick={() => setSelectedPlan(plan.title.toLowerCase())}
                        >
                           <div className="plan-header">
                              <h4>{plan.title}</h4>
                              <div className="plan-price">
                                 <span className="price">${plan.pricingType}</span>
                                 <span className="period">/month</span>
                              </div>
                           </div>
                           <p className="plan-subtitle">{plan.topTitle}</p>
                           <div className="trial-badge">14-Day Free Trial</div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* User Information Display */}
               {authUser && (
                  <div className="customer-info">
                     <h3>Your Information</h3>
                     <div className="form-row">
                        <div className="form-group">
                           <label>Full Name</label>
                           <div className="user-info-display">{authUser.name}</div>
                        </div>
                        <div className="form-group">
                           <label>Email Address</label>
                           <div className="user-info-display">{authUser.email}</div>
                        </div>
                     </div>
                  </div>
               )}

               {/* Payment Method */}
               <div className="payment-method">
                  <h3>Payment Method</h3>
                  <p className="payment-note">Your card won't be charged during the trial period</p>
                  <div className="card-element-container">
                     <CardElement
                        options={{
                           style: {
                              base: {
                                 fontSize: '16px',
                                 color: '#424770',
                                 '::placeholder': {
                                    color: '#aab7c4',
                                 },
                              },
                           },
                        }}
                     />
                  </div>
               </div>

               {/* Error Messages */}
               {Object.keys(errors).length > 0 && (
                  <div className="error-messages">
                     {Object.values(errors).map((error, index) => (
                        <p key={index} className="error-message">{error}</p>
                     ))}
                  </div>
               )}

               {/* Submit Button */}
               <button
                  type="submit"
                  disabled={isProcessing || !stripe}
                  className={`submit-button ${isProcessing ? 'processing' : ''}`}
               >
                  {isProcessing ? (
                     <>
                        <div className="spinner"></div>
                        Starting Your Trial...
                     </>
                  ) : (
                     <>
                        <Lock size={16} />
                        Start 14-Day Free Trial
                     </>
                  )}
               </button>
            </form>
      </div>
   );
};

const SaveCreditCardPage = () => {


  return (
    <Elements stripe={stripePromise}>
      <div className="credit-card-page">
        <div className="credit-container">
          {/* Header */}
          <div className="header">
            <h1 className="title">Start Your Free Trial</h1>
            <p className="subtitle">Choose your plan and start your 14-day free trial today</p>
          </div>

          <div className="main-content">
            {/* Trial Form */}
            <div className="form-container">
              <TrialForm />
            </div>

          {/* Right Sidebar - Join Creators Section */}
          <div className="info-sidebar">
            <div className="creators-join-section">
              {/* Header Badge */}
              <div className="creators-badge">
                <div className="badge-icon">
                  <Users size={20} className="users-icon" />
                </div>
                <div className="badge-content">
                  <h3 className="badge-title">Join Thousands Of Creators</h3>
                  <p className="badge-subtitle">Building their dream business</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="creators-content">
                <h2 className="creators-main-title">
                  Join the revolution of creators building <span className="highlight-text">profitable businesses</span>
                </h2>

                {/* Features List */}
                <div className="creators-features">
                  <div className="feature-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>No platform fees: keep what you make</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>A reliable platform for you and your students</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>Advanced Membership tools</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} className="feature-check" />
                    <span>Premium creator support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default SaveCreditCardPage;