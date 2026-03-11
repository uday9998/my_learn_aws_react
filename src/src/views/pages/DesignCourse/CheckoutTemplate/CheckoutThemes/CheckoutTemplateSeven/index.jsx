import React from 'react';
import PropTypes from 'prop-types';

import Section from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section';
import LeftComponent from 'components/modules/checkout/LeftComponent';
import RightComponent from 'components/modules/checkout/RightComponent';

const CheckoutTemplateSeven = ({
   showEditableComponent,
   sections,
   editableSectionFunc,
   course,
   isPreview,
   customFieldsData,
   deleteComponent,
   changeProp,
   handleDeleteComponent,
   handleDuplicateComponent,
   templateName,
}) => {
   return (
      <Section
         slug={ sections[0].checkout_section.slug }
         item={ sections[0] }
         i={ 0 }
         onClick={ (e) => { editableSectionFunc(e); } }
         isPreview={ isPreview }
         templateName={ templateName }
         sections={ sections }
      >
         <div className={ `checkoutPage checkoutPage_without_header ${ templateName }` }>
            <div className='checkoutPage-content'>
               <div className='checkoutPage-left'>
                  <LeftComponent
                     sections={ sections }
                     showEditableComponent={ showEditableComponent }
                     editableSectionFunc={ editableSectionFunc }
                     course={ course }
                     isPreview={ isPreview }
                     deleteComponent={ deleteComponent }
                     changeProp={ changeProp }
                     handleDeleteComponent={ handleDeleteComponent }
                     handleDuplicateComponent={ handleDuplicateComponent }
                     templateName={ templateName }
                  />
               </div>
               <div className='checkoutPage-right'>
                  <RightComponent
                     sections={ sections }
                     showEditableComponent={ showEditableComponent }
                     editableSectionFunc={ editableSectionFunc }
                     course={ course }
                     isPreview={ isPreview }
                     customFieldsData={ customFieldsData }
                     changeProp={ changeProp }
                     templateName={ templateName }
                  />
               </div>
            </div>
         </div>
      </Section>
   );
};

CheckoutTemplateSeven.propTypes = {
   sections: PropTypes.array,
   editableSectionFunc: PropTypes.func,
   showEditableComponent: PropTypes.func,
   course: PropTypes.object,
   isPreview: PropTypes.bool,
   customFieldsData: PropTypes.object,
   deleteComponent: PropTypes.func,
   changeProp: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   templateName: PropTypes.string,
};

export default CheckoutTemplateSeven;