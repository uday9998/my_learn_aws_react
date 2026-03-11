import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import ColorInput from 'components/elements/form/ColorInput';
import Switch from 'components/elements/switchNew';
import UpsellEditText from '../Text';
import UpsellSelect from '../../components/UpsellSelect';

const UpsellEditGuarantee = ({
   props, changeProp, component, subComponentIndex, componentIndex, changeSubComponent,
   clearIds,
}) => {
   const {
      visibility, paddingTop, paddingBottom, paddingLeft, paddingRight, background,

   } = props;
   return (
      <div className='upsell__edit__guarantee'>
         <Switch
            label={ visibility ? 'Hide Guarantee' : 'Show Guarantee' }
            name='visibility'
            value={ visibility === true }
            size='medium'
            positionText='right'
            onChange={ () => changeProp(!(visibility === true), 'visibility') }
            isCommentPage={ true }
            switchOnOff={ true }
         />
         <Spacing
            top={ paddingTop }
            bottom={ paddingBottom }
            left={ paddingLeft }
            right={ paddingRight }
            changeProp={ changeProp }
         />
         <ColorInput
            label='Background Color'
            name='background'
            value={ background }
            onChange={ (key, value) => changeProp(value, 'background') }
            isPageBuilder={ true }
         />
         {(component.subcomponents || component.subcomponent).map((e, index) => {
            return (
               <UpsellSelect
                  isInitialOpen={ index === subComponentIndex }
                  label={ e.name }
                  clearIds={ () => clearIds(true) }
               >
                  <UpsellEditText
                     props={ e.props }
                     component={ e }
                     changeProp={ (value, name) => changeSubComponent(value, name, 'subComponent', 0, componentIndex, index) }
                     buttonProps={ e.props }
                  />
               </UpsellSelect>
            );
         })}
      </div>
   );
};

UpsellEditGuarantee.propTypes = {
   visibility: PropTypes.bool,
   changeProp: PropTypes.func,
   paddingTop: PropTypes.number,
   component: PropTypes.object,
   paddingLeft: PropTypes.number,
   subComponentIndex: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   background: PropTypes.string,
   subcomponents: PropTypes.array,
   props: PropTypes.object,
   componentIndex: PropTypes.number,
   changeSubComponent: PropTypes.func,
   clearIds: PropTypes.func,
};

export default UpsellEditGuarantee;
