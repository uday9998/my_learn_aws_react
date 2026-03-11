import React, { useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as txtType, SIZES as txtSizes } from 'components/elements/Text';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import PlansTable from 'components/elements/designCourse/plan/PlansTable';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import PlanTypeMenu from 'components/modules/designCourse/plan/PlanTypeMenu';
import ClickOutside from './OutsideClick/index.js';

const PricingPlans = ({
   plans, checkedId, onClick, planTypes, handleAddingPlan, handlePricingHideShow, deletePlan, plan, goToIntegration,
}) => {
   const [showMenu, setShowMenu] = useState(false);
   const isMobile = window.innerWidth < 1024;
   const ref = React.createRef();

   const getHeight = () => window.innerHeight
   || document.documentElement.clientHeight
   || document.body.clientHeight;

   const [height, setheight] = useState(getHeight());
   const [planUp, setPlanUp] = useState(false);
   useEffect(() => {
      const resizeListener = () => {
         setheight(getHeight());
      };

      window.addEventListener('resize', resizeListener);

      const planBtn = document.getElementsByClassName('add-plan')[0].getBoundingClientRect().top;
      if (!isMobile) {
         if (height - planBtn <= 182) {
            setPlanUp(true);
         } else {
            setPlanUp(false);
         }
      }

      return () => {
         window.removeEventListener('resize', resizeListener);
      };
   });

   return (
      <ItemWrapper>
         <div className='pricingPlans'>
            <div className='w-full flex justify-start'>
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.normal }
                  inner='PRICING PLANS'
               />
            </div>
            <div className='w-full m-t-m'>
               <PlansTable
                  plans={ plans }
                  checkedId={ checkedId }
                  onClick={ (obj) => onClick(obj) }
                  handlePricingHideShow={ (pricingId, data) => handlePricingHideShow(pricingId, data) }
                  deletePlan={ pricingId => deletePlan(pricingId) }
               />
            </div>


            <div className='w-full align-center mob-hidden-button justify-end m-t-exl'>
               <div className='add-plan'>
                  <BaseButton
                     theme={ buttonTheme.blueBordered }
                     size={ buttonSizes.full }
                     text='Add Plan'
                     style={ { width: '224px' } }
                     onClick={ () => setShowMenu(!showMenu) }
                  />
                  { showMenu ? (
                     <ClickOutside onClick={ () => setShowMenu(!showMenu) }>
                        <PlanTypeMenu
                           ref={ ref }
                           planTypes={ planTypes }
                           planUp={ planUp }
                           handleAddingPlan={ (type) => { handleAddingPlan(type); setShowMenu(!showMenu); } }
                           plan={ plan }
                           goToIntegration={ goToIntegration }
                        />
                     </ClickOutside>
                  ) : null }
               </div>
            </div>
         </div>
      </ItemWrapper>
   );
};

PricingPlans.propTypes = {
   plans: PropTypes.array,
   checkedId: PropTypes.number,
   onClick: PropTypes.func,
   handleAddingPlan: PropTypes.func,
   planTypes: PropTypes.array,
   handlePricingHideShow: PropTypes.func,
   deletePlan: PropTypes.func,
   plan: PropTypes.object,
   goToIntegration: PropTypes.func,
};

export default PricingPlans;
