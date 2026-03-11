import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as txtType, SIZES as txtSizes } from 'components/elements/Text';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import TextInput from 'components/elements/form/TextInput';
import Icon from 'components/elements/Icon';

const FreePlan = ({
   handleInputPlanChange, handlePlanSave, deletePlan,
   plan: { selectedPricing, currentPricingUnsaved, is_published: isPublished },
}) => {
   return (
      <div className='freePlan drawer-wrapper'>
         <div className='flex justify-between align-center'>
            <Text
               size={ txtSizes.medium }
               type={ txtType.normal }
               inner='FREE PLAN'
            />
         </div>
         <div className='w-full m-t-m'>
            <TextInput
               placeholder='Welcome'
               label='Plan Name'
               id='name'
               name='name'
               value={ selectedPricing.name }
               onChange={ handleInputPlanChange }
               hasTooltip={ true }
            />
         </div>
         <div className='characters-small-text'>
            <Text
               color='#9c9c9c'
               size={ txtSizes.medium }
               inner={ `${ selectedPricing.name ? selectedPricing.name.length : '0' } of 15 characters` }
            />
         </div>
         <div className='w-full flex justify-end m-t-exl'>
            <BaseButton
               theme={ buttonTheme.darkGreen }
               size={ buttonSizes.large }
               text='Save'
               className='save-plan'
               onClick={ handlePlanSave }
            />
         </div>
      </div>
   );
};
FreePlan.propTypes = {
   selectedPricing: PropTypes.object,
   handleInputPlanChange: PropTypes.func,
   handlePlanSave: PropTypes.func,
   deletePlan: PropTypes.func,
   plan: PropTypes.object,
};

export default FreePlan;
