import React from 'react';
import PropTypes from 'prop-types';
import { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
import UpsellSelect from '../UpsellSelect';
import UpsellEditText from '../../Edit/Text';
import UpsellEditImage from '../../Edit/Image';
import UpsellEditButton from '../../Edit/Button';
import UpsellEditPricing from '../../Edit/Pricing';
import UpsellEditGuarantee from '../../Edit/Guarantee';
import UpsellEditProduct from '../../Edit/Product';
import UpsellEditContact from '../../Edit/Contact';

const UpsellSectionEdit = ({
   currentSection, changeProp, goBack, componentIndex, subComponentIndex, sectionIndex, clearIds,
   handleDeleteComponent,
}) => {
   const { bgColor } = currentSection.upsell_section.props;
   const getEditComponent = (type) => {
      switch (type) {
         case 'image':
            return UpsellEditImage;
         case 'button':
            return UpsellEditButton;
         case 'text':
            return UpsellEditText;
         case 'pricing':
            return UpsellEditPricing;
         case 'guarantee':
            return UpsellEditGuarantee;
         case 'product':
            return UpsellEditProduct;
         case 'contactBottom':
            return UpsellEditContact;
         default:
            return () => (<div>incoming</div>);
      }
   };
   return (
      <div className='upsell__section__edit'>
         <TextWithIcon
            inner={ currentSection.upsell_section.name }
            isIconRight={ false }
            type={ types.regular148 }
            size={ sizes.medium }
            onClick={ () => goBack() }
            iconName='arrowLeftL'
         />
         <div className='upsell__section__edit__params'>
            {currentSection.upsell_components.map((e, index) => {
               const Component = getEditComponent(e.type);
               return (
                  <UpsellSelect
                     isInitialOpen={ index === componentIndex }
                     label={ e.name }
                     clearIds={ clearIds }
                  >
                     <Component
                        props={ e.props }
                        clearIds={ clearIds }
                        handleDeleteComponent={ handleDeleteComponent }
                        getEditComponent={ getEditComponent }
                        component={ e }
                        changeSubComponent={ changeProp }
                        subComponentIndex={ subComponentIndex }
                        changeProp={ (value, name) => changeProp(value, name, 'component', sectionIndex, index) }
                        buttonProps={ e.props }
                        componentIndex={ index }
                        sectionIndex={ sectionIndex }
                     />
                  </UpsellSelect>
               );
            })}
            <ColorInput
               label='Background Color'
               name='bgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'section', sectionIndex) }
               isPageBuilder={ true }
            />
         </div>
      </div>
   );
};

UpsellSectionEdit.propTypes = {
   componentIndex: PropTypes.any,
   currentSection: PropTypes.object,
   goBack: PropTypes.func,
   sectionIndex: PropTypes.number,
   changeProp: PropTypes.func,
   subComponentIndex: PropTypes.number,
   handleDeleteComponent: PropTypes.func,
   clearIds: PropTypes.func,
};

export default UpsellSectionEdit;
