import React from 'react';
import PropTypes from 'prop-types';
import { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
import AffiliateSelect from '../AffiliateSelect';
import AffiliateEditText from '../../Edit/Text';
import AffiliateEditImage from '../../Edit/Image';
import AffiliateEditButton from '../../Edit/Button';
import AffiliateEditContact from '../../Edit/Contact';
import AffiliateEditWarning from '../../Edit/Warning';
import AffiliateEditForm from '../../Edit/Form';

const AffiliateSectionEdit = ({
   currentSection, changeProp, goBack, componentIndex, subComponentIndex, sectionIndex, clearIds,
   handleDeleteComponent,
}) => {
   const { bgColor } = currentSection.affiliate_section.props;
   const getEditComponent = (type) => {
      switch (type) {
         case 'image':
            return AffiliateEditImage;
         case 'button':
            return AffiliateEditButton;
         case 'text':
            return AffiliateEditText;
         case 'contactBottom':
            return AffiliateEditContact;
         case 'warning':
            return AffiliateEditWarning;
         case 'form':
            return AffiliateEditForm;
         default:
            return () => (<div>incoming</div>);
      }
   };
   return (
      <div className='upsell__section__edit'>
         <TextWithIcon
            inner={ currentSection.affiliate_section.name }
            isIconRight={ false }
            type={ types.regular148 }
            size={ sizes.medium }
            onClick={ () => goBack() }
            iconName='arrowLeftL'
         />
         <div className='upsell__section__edit__params'>
            {currentSection.affiliate_components.map((e, index) => {
               const Component = getEditComponent(e.type);
               return (
                  <AffiliateSelect
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
                  </AffiliateSelect>
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

AffiliateSectionEdit.propTypes = {
   componentIndex: PropTypes.any,
   currentSection: PropTypes.object,
   goBack: PropTypes.func,
   sectionIndex: PropTypes.number,
   changeProp: PropTypes.func,
   subComponentIndex: PropTypes.number,
   handleDeleteComponent: PropTypes.func,
   clearIds: PropTypes.func,
};

export default AffiliateSectionEdit;
