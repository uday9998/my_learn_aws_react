import React from 'react';
import PropTypes from 'prop-types';
import RightComponent from 'components/modules/checkout/RightComponent';
import LeftComponent from 'components/modules/checkout/LeftComponent';
import Section from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section';
import './index.scss';


const CheckoutViewFifth = ({
   sections, showEditableComponent, editableSectionFunc, course, isPreview, customFieldsData,
   deleteComponent, changeProp, handleDeleteComponent, handleDuplicateComponent,
}) => {
   const cardStyle = {
      // background: 'var(--mainBg005)',
      borderRadius: '32px',
      padding: '36px',
   };
   return (
      <Section
         slug={ sections[0].checkout_section.slug }
         item={ sections[0] }
         i={ 0 }
         onClick={ (e) => { editableSectionFunc(e); } }
         isPreview={ isPreview }
         className='template5_wrapper'
      >
         <div className='checkoutPageFifth template5'>
            <div className='checkoutPageFifth-content'>
               <div className='checkoutPageFifth-left' style={ cardStyle }>
                  <LeftComponent
                     sections={ sections }
                     showEditableComponent={ showEditableComponent }
                     editableSectionFunc={ editableSectionFunc }
                     course={ course }
                     isPreview={ isPreview }
                     customFieldsData={ customFieldsData }
                     changeProp={ changeProp }
                     handleDeleteComponent={ handleDeleteComponent }
                     handleDuplicateComponent={ handleDuplicateComponent }
                  />
               </div>
               <div className='checkoutPageFifth-right'>
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
                     templateName='template5'
                  />
               </div>
            </div>
         </div>
      </Section>
   );
};

CheckoutViewFifth.propTypes = {
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

export default CheckoutViewFifth;
