/* eslint-disable no-nested-ternary */
import React from 'react';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import SelectTemplateFirstImg from 'assets/images/checkout/template1.png';
import SelectTemplateSecondImg from 'assets/images/checkout/template2.png';
import SelectTemplateThirdImg from 'assets/images/checkout/template3.png';
import PropTypes from 'prop-types';
import './index.scss';


const CheckoutTemplates = ({
   courseId, activeTemplate, makeActiveLandingTemplate, TabConsumer, templates, setTemplates,
}) => {
   const { switchTab } = TabConsumer;
   const updateCheckoutTemplateHandle = (templateName, templateId, isActive) => {
      if (!isActive) {
         makeActiveLandingTemplate({ courseId, landingId: templateId }, () => {
            switchTab(templateName);
            const choosenTemplate = templates.filter((template) => template.id === templateId)[0];
            const activeTemplateChangable = activeTemplate;
            activeTemplateChangable.is_active = 0;
            choosenTemplate.is_active = 1;
            setTemplates(templates);
         });
      } else {
         switchTab(templateName);
      }
   };
   return (
      <div className='template-container'>
         <div className='select-template-title'>
            <Text
               size={ TextSize.medium }
               type={ TextType.bold }
               inner='Select Template'
               color='#3f4f65'
            />
         </div>
         <div className='image-container'>
            {templates.map(template => {
               return (
                  <div className='first-image' key={ template.id }>
                     {!!template.is_active && <div className='checkout-active-template'>Active</div>}
                     <img
                        src={ template.checkout_theme_name === 'template1' ? SelectTemplateFirstImg
                           : template.checkout_theme_name === 'template2' ? SelectTemplateSecondImg : SelectTemplateThirdImg }
                        alt='checkout'
                     />
                     <div className='under-first-image'>
                        <div className='template-title'>
                           <Text
                              type={ TextType.normal }
                              size={ TextSize.medium }
                              inner={ template.checkout_theme_name === 'template1' ? 'Wired'
                                 : template.checkout_theme_name === 'template2' ? 'Avow' : 'Launch' }
                              color='#1c1d1f'
                           />
                        </div>
                        <div className='template-btns'>
                           <div className='preview-btn'>
                              <BaseButton
                                 theme={ btnTheme.green }
                                 size={ btnSize.extraLarge }
                                 text='Preview'
                                 onClick={ () => {
                                    window.open(`/checkout/${ template.checkout_theme_name }/${ courseId }/${ template.id }`, '_blank');
                                 } }
                              />
                           </div>
                           <BaseButton
                              theme={ btnTheme.lightGreen }
                              size={ btnSize.extraLarge }
                              text='Choose'
                              id={ template.checkout_theme_name }
                              onClick={ () => {
                                 updateCheckoutTemplateHandle(
                                    template.checkout_theme_name,
                                    template.id,
                                    template.is_active);
                              } }
                           />
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

CheckoutTemplates.propTypes = {
   activeTemplate: PropTypes.object,
   courseId: PropTypes.string,
   makeActiveLandingTemplate: PropTypes.func,
   TabConsumer: PropTypes.any,
   templates: PropTypes.array,
   setTemplates: PropTypes.func,
};


export default CheckoutTemplates;
