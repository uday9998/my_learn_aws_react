import React from 'react';
import PropTypes from 'prop-types';
import SecondCheckoutHeader from 'components/modules/checkout/SecondCheckoutHeader';
import RightComponent from 'components/modules/checkout/RightComponentSecond';
import LeftComponent from 'components/modules/checkout/LeftComponentSecond';
import Section from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section';
import './index.scss';


const CheckoutViewSecond = ({
   sections, showEditableComponent, editableSectionFunc, course, isPreview, customFieldsData,
   deleteComponent, closeEditor, changeProp, handleDeleteComponent, handleDuplicateComponent,
}) => {
   return (
      <Section
         slug={ sections[0].checkout_section.slug }
         item={ sections[0] }
         i={ 0 }
         onClick={ (e) => { editableSectionFunc(e); } }
         isPreview={ isPreview }
      >
         <div className={ closeEditor ? 'checkoutPageSecond close' : 'checkoutPageSecond open' }>
            <SecondCheckoutHeader
               sections={ sections }
               showEditableComponent={ showEditableComponent }
               isPreview={ isPreview }
               course={ course }
               deleteComponent={ deleteComponent }
               changeProp={ changeProp }
               handleDeleteComponent={ handleDeleteComponent }
               handleDuplicateComponent={ handleDuplicateComponent }
            />
            <div className='checkoutPageSecond-content'>
               <div className='checkoutPageSecond-left'>
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
               <div className='checkoutPageSecond-right'>
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

CheckoutViewSecond.propTypes = {
   sections: PropTypes.array,
   editableSectionFunc: PropTypes.func,
   showEditableComponent: PropTypes.func,
   course: PropTypes.object,
   isPreview: PropTypes.bool,
   customFieldsData: PropTypes.object,
   deleteComponent: PropTypes.func,
   closeEditor: PropTypes.bool,
   changeProp: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
};

export default CheckoutViewSecond;
