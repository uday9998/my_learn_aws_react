import React from 'react';
import PropTypes from 'prop-types';
import RightComponent from 'components/modules/checkout/RightComponentThird';
import LeftComponent from 'components/modules/checkout/LeftComponentThird';
import Section from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section';
import ThirdCheckoutHeader from 'components/modules/checkout/ThirdCheckoutHeader';
import './index.scss';


const CheckoutViewThird = ({
   sections, showEditableComponent, editableSectionFunc, course, isPreview, customFieldsData,
   deleteComponent, changeProp, handleDeleteComponent, handleDuplicateComponent,
}) => {
   return (
      <Section
         slug={ sections[0].checkout_section.slug }
         item={ sections[0] }
         i={ 0 }
         onClick={ (e) => { editableSectionFunc(e); } }
         isPreview={ isPreview }
      >
         <div className='checkoutPageThird'>
            <ThirdCheckoutHeader
               sections={ sections }
               showEditableComponent={ showEditableComponent }
               isPreview={ isPreview }
               course={ course }
               deleteComponent={ deleteComponent }
               changeProp={ changeProp }
               handleDeleteComponent={ handleDeleteComponent }
               handleDuplicateComponent={ handleDuplicateComponent }
            />
            <div className='checkoutPageThird-content'>
               <div className='checkoutPageThird-left'>
                  <LeftComponent
                     sections={ sections }
                     showEditableComponent={ showEditableComponent }
                     editableSectionFunc={ editableSectionFunc }
                     course={ course }
                     isPreview={ isPreview }
                     customFieldsData={ customFieldsData }
                     changeProp={ changeProp }
                  />
               </div>
               <div className='checkoutPageThird-right'>
                  <RightComponent
                     sections={ sections }
                     showEditableComponent={ showEditableComponent }
                     editableSectionFunc={ editableSectionFunc }
                     course={ course }
                     isPreview={ isPreview }
                     deleteComponent={ deleteComponent }
                     changeProp={ changeProp }
                     handleDeleteComponent={ handleDeleteComponent }
                     handleDuplicateComponent={ handleDuplicateComponent }
                  />
               </div>
            </div>
         </div>
      </Section>
   );
};

CheckoutViewThird.propTypes = {
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
};

export default CheckoutViewThird;
