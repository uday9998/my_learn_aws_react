/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import PlanMainPage from './Main';
import './index.scss';
import PlanPricingPage from './Pricing';
import PlanAdvancedSettings from './Settings';
import PlanTrackingPage from './tracking';
import PlanEditCheckout from './Checkout';
import UpsellPlan from './Upsell';

const PlanEditView = props => {
   const page = props.selectedTab;
   const isCoursePage = props.isCoursePage;

   if (page === 'pricing') {
      return (
         <PlanPricingPage
            { ...props }
         />
      );
   }
   if (page === 'settings') {
      return (
         <PlanAdvancedSettings
            { ...props }
         />
      );
   }
   if (page === 'tracking') {
      return (
         <PlanTrackingPage
            { ...props }
         />
      );
   }
   if (page === 'checkout') {
      return (
         <PlanEditCheckout
            { ...props }
         />
      );
   }
   if (page === 'upsell') {
      return (
         <UpsellPlan
            { ...props }
         />
      );
   }
   if (isCoursePage) {
      return (
         <PlanPricingPage
            { ...props }
         />
      );
   }
   return (
      <PlanMainPage
         { ...props }
      />
   );
};

PlanEditView.propTypes = {
   selectedTab: PropTypes.string,
   isMobile: PropTypes.bool,
   isCoursePage: PropTypes.bool,
};

export default PlanEditView;
