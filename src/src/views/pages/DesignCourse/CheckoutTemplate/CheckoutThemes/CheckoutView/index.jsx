import React from 'react';
import PropTypes from 'prop-types';
import CheckoutHeader from 'components/modules/checkout/CheckoutHeader';
import LeftComponent from 'components/modules/checkout/LeftComponent';
import RightComponent from 'components/modules/checkout/RightComponent';
import Section from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Section';
import './index.scss';
import classNames from 'classnames';

const CheckoutView = ({
   sections, showEditableComponent, editableSectionFunc, course, isPreview, customFieldsData,
   deleteComponent, changeProp, handleDeleteComponent, handleDuplicateComponent, templateName,
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
         <div className={classNames(
               `checkoutPage ${ templateName }`,
               { 'checkoutPage_without_header': templateName === 'template4' }
            )}
         >
            {templateName === 'template1' && (
               <CheckoutHeader
                  sections={ sections }
                  showEditableComponent={ showEditableComponent }
                  isPreview={ isPreview }
                  course={ course }
                  deleteComponent={ deleteComponent }
                  changeProp={ changeProp }
                  handleDeleteComponent={ handleDeleteComponent }
                  handleDuplicateComponent={ handleDuplicateComponent }
               />
            )}
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

CheckoutView.propTypes = {
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

export default CheckoutView;
