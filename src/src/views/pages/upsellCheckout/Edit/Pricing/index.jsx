import React from 'react';
import PropTypes from 'prop-types';
import UpsellSelect from '../../components/UpsellSelect';
import './index.scss';

const UpsellEditPricing = ({
   component, getEditComponent, subComponentIndex, componentIndex, changeSubComponent, sectionIndex,
   clearIds,
}) => {
   return (
      <div className='upsell__edit__pricing'>
         <div className='upsell__edit__pricing__props'>
            {(component.subcomponents || component.subcomponent).map((e, index) => {
               if (e.type === 'due' || e.type === 'product-price') {
                  return null;
               }
               const Component = getEditComponent(e.type);
               return (
                  <UpsellSelect
                     isInitialOpen={ index === subComponentIndex }
                     label={ e.name }
                     clearIds={ () => clearIds(true) }
                  >
                     <Component
                        props={ e.props }
                        getEditComponent={ getEditComponent }
                        component={ e }
                        changeProp={ (value, name) => changeSubComponent(value, name, 'subComponent', sectionIndex, componentIndex, index) }
                        buttonProps={ e.props }
                     />
                  </UpsellSelect>
               );
            })}
         </div>
      </div>
   );
};

UpsellEditPricing.propTypes = {
   getEditComponent: PropTypes.func,
   component: PropTypes.object,
   changeSubComponent: PropTypes.func,
   subComponentIndex: PropTypes.number,
   componentIndex: PropTypes.number,
   sectionIndex: PropTypes.number,
   clearIds: PropTypes.func,
};

export default UpsellEditPricing;
