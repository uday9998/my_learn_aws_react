import React from 'react';
import PropTypes from 'prop-types';
import UpsellSelect from '../../components/UpsellSelect';
import './index.scss';

const UpsellEditContact = ({
   component, getEditComponent, subComponentIndex, componentIndex, changeSubComponent, sectionIndex, clearIds,
}) => {
   return (
      <div className='upsell__edit__contact'>
         <div className='upsell__edit__contact__props'>
            {(component.subcomponents || component.subcomponent).map((e, index) => {
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

UpsellEditContact.propTypes = {
   getEditComponent: PropTypes.func,
   component: PropTypes.object,
   changeSubComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   subComponentIndex: PropTypes.number,
   clearIds: PropTypes.func,
   componentIndex: PropTypes.number,
};

export default UpsellEditContact;
