/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import UpsellSection from '../../components/Section';
import UpsellPreview from '../../components/TemplateOnePreview';

const UpsellCheckoutTemplateFirst = ({
   template, data, isPreview, selectItem, handleChangeProp,
}) => {
   return (
      <div className='upsell__checkout__template'>
         {template.sections.map((e, index) => {
            if (isPreview) {
               return (
                  <UpsellPreview
                     section={ e }
                     data={ data }
                     selectItem={ selectItem }
                     isPreview={ isPreview }
                     key={ index }
                     sectionIndex={ index }
                  />
               );
            }
            return (
               <UpsellSection
                  section={ e }
                  data={ data }
                  selectItem={ selectItem }
                  isPreview={ isPreview }
                  changeProp={ handleChangeProp }
                  key={ index }
                  sectionIndex={ index }
               />
            );
         })}
      </div>
   );
};

UpsellCheckoutTemplateFirst.propTypes = {
   template: PropTypes.object,
   data: PropTypes.object,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.func,
   handleChangeProp: PropTypes.func,
};

export default UpsellCheckoutTemplateFirst;
