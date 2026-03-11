import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanTypeMenuItem from 'components/elements/designCourse/plan/PlanTypeMenuItem';
import Modal from 'components/elements/Modal';
import IntegartionModalContent from 'components/elements/IntegrationModalContent';
import './index.scss';

const PlanTypeMenu = React.forwardRef(({
   planTypes, handleAddingPlan, planUp, plan, goToIntegration,
}, ref) => {
   const [isOpenIntegrationModal, setIsOpenIntegrationModal] = useState(false);
   useEffect(() => {
      if (document.querySelector('.left-side-first')) {
         document.querySelector('.left-side-first').scrollTop = document.querySelector('.left-side-first').scrollHeight;
      }
   }, []);
   const planTypeArray = planTypes.map((type) => {
      return (
         <PlanTypeMenuItem
            icon={ type.icon }
            text={ type.name }
            onClick={ (((plan.stripe_connection === false && plan.paypal_connection_v2 === false) && type.type === 2) && plan.braintree_connection === false)
               ? () => setIsOpenIntegrationModal(true) : () => handleAddingPlan(type.type) }
            key={ type.type }
         />
      );
   });
   return (
      <div className={ planUp ? 'plan-type-menu-up' : 'plan-type-menu' } ref={ ref }>
         {planTypeArray}
         {isOpenIntegrationModal && (
            <Modal
               blurColor='rgba(63, 79, 101, 0.6)'
               contentBgColor='#fff'
               contentPosition={ window.innerWidth < 1024 ? 'full-screen' : 'center' }
               closeOnClickOutside={ true }
               onClose={ () => setIsOpenIntegrationModal(false) }
            >
               <IntegartionModalContent
                  onCancel={ () => setIsOpenIntegrationModal(false) }
                  onApprove={ () => goToIntegration() }
               />
            </Modal>
         )
         }
      </div>
   );
});

PlanTypeMenu.propTypes = {
   handleAddingPlan: PropTypes.func,
   planTypes: PropTypes.array,
   planUp: PropTypes.bool,
   plan: PropTypes.object,
   goToIntegration: PropTypes.func,
};

export default PlanTypeMenu;
