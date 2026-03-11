import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import { ReactComponent as AddSectionIcon } from 'assets/images/add-section.svg';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PlanTypeMenu from 'components/modules/designCourse/plan/PlanTypeMenu';
import Tooltip from 'components/elements/members/Tooltip';

const AddFirstPlan = ({
   handleAddingPlan, planTypes, plan, goToIntegration,
}) => {
   const [showMenu, setShowMenu] = useState(false);
   return (
      <>
         <ItemWrapper>
            <div className='addFirstPlan'>
               <div className='flex'>
                  <Text
                     type={ textType.bold }
                     size={ textSize.medium }
                     inner='Add Your First Plan'
                  />
                  <Tooltip hintText='Create a free, one-time payment or a subscription plan for your course.,' hintStyle={ { bottom: '-67px', width: '200px' } } />
               </div>
               <div className='m-t-exs m-b-exl'>
                  <Text
                     type={ textType.regular }
                     size={ textSize.small }
                     bold={ true }
                     inner='Create your own plan'
                     color='#8a94a2'
                  />
               </div>
               <AddSectionIcon
                  onClick={ () => setShowMenu(!showMenu) }
               />
            </div>
         </ItemWrapper>
         <div className='w-full m-t-exl m-r-exl add-plan'>
            <BaseButton
               theme={ btnType.blueBordered }
               size={ btnSize.full }
               text='Add Plan'
               onClick={ () => {
                  setShowMenu(!showMenu);
               } }
            />
            { showMenu ? (
               <PlanTypeMenu
                  planTypes={ planTypes }
                  handleAddingPlan={ (type) => handleAddingPlan(type) }
                  plan={ plan }
                  goToIntegration={ goToIntegration }
               />
            ) : null }
         </div>
      </>
   );
};

AddFirstPlan.propTypes = {
   handleAddingPlan: PropTypes.func,
   planTypes: PropTypes.array,
   plan: PropTypes.object,
   goToIntegration: PropTypes.func,
};

export default AddFirstPlan;
