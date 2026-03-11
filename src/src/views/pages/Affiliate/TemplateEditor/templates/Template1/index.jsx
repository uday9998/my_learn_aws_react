/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import AffiliateSection from '../../components/Section';
import AffiliatePreview from '../../components/TemplateOnePreview';

const AffiliateTemplateTypeFirst = ({
   template, isPreview, selectItem, handleChangeProp,
}) => {
   return (
      <div className='upsell__checkout__template'>
         {template.sections.map((e, index) => {
            if (index !== 1) {
               if (isPreview) {
                  return (
                     <AffiliatePreview
                        section={ e }
                        selectItem={ selectItem }
                        isPreview={ isPreview }
                        key={ index }
                        sectionIndex={ index }
                     />
                  );
               }
               return (
                  <AffiliateSection
                     section={ e }
                     selectItem={ selectItem }
                     isPreview={ isPreview }
                     changeProp={ handleChangeProp }
                     key={ index }
                     sectionIndex={ index }
                  />
               );
            }
            return null;
         })}
      </div>
   );
};

AffiliateTemplateTypeFirst.propTypes = {
   template: PropTypes.object,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.func,
   handleChangeProp: PropTypes.func,
};

export default AffiliateTemplateTypeFirst;
