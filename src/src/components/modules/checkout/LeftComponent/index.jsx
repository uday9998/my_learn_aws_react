import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const LeftComponent = (props) => {
   const {
      course, isPreview, templateName,
   } = props;

   // Get the first pricing option (assuming it's the membership)
   const membership = course?.pricings?.[0] || {};
   const courseName = course?.name || 'MEMBERSHIP NAME_1';
   const price = membership?.price || 6.00;
   const currency = membership?.currency || 'CAD';
   const billingFrequency = membership?.billing_frequency || 'weekly';
   
   // Get first letter of course name for icon
   const iconLetter = courseName.charAt(0).toUpperCase();

   // Format price display
   const formatPrice = (amount) => {
      return `${currency} ${parseFloat(amount).toFixed(2)}`;
   };

   const formattedPrice = formatPrice(price);

   return (
      <div className={`checkoutPage-leftContent ${templateName || ''}`}>
         <div className="checkout-summary">
            {/* Membership Item */}
            <div className="membership-item">
               <div className="membership-icon">
                  {iconLetter}
               </div>
               <div className="membership-details">
                  <h3 className="membership-title">{courseName}</h3>
                  <div className="membership-price">{formattedPrice}</div>
               </div>
            </div>

            {/* Membership Summary */}
            <div className="membership-summary">
               <div className="summary-item">
                  <span className="summary-label">{courseName}</span>
                  <span className="summary-value">{formattedPrice}</span>
               </div>
            </div>

            {/* Billing Details */}
            <div className="billing-details">
               <div className="billing-row">
                  <span className="billing-label">Subtotal</span>
                  <span className="billing-value">{formattedPrice}</span>
               </div>
               
               <div className="billing-row">
                  <span className="billing-label">Recurring Subtotal</span>
                  <span className="billing-value">{formattedPrice}</span>
               </div>
               <div className="billing-frequency">
                  {billingFrequency} billing
               </div>
               <div className="billing-frequency-suffix">
                  / {billingFrequency === 'weekly' ? 'week' : billingFrequency === 'monthly' ? 'month' : 'year'}
               </div>
            </div>

            {/* Divider */}
            <div className="billing-divider"></div>

            {/* Due Today */}
            <div className="due-today">
               <span className="due-label">Due Today</span>
               <span className="due-amount">{formattedPrice}</span>
            </div>
         </div>
      </div>
   );
};

LeftComponent.propTypes = {
   course: PropTypes.object,
   isPreview: PropTypes.bool,
   templateName: PropTypes.string,
};

export default LeftComponent;