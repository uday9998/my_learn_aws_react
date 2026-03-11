import React, { useState } from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextArea from 'components/elements/form/TextArea';
import BaseButton, { THEME as btnTheme } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { createCheckoutScript } from 'api/AuthApi';

const Tracking = ({
   course, setCourse,
}) => {
   const [createCheckoutScriptFunc] = useSubmitForm(createCheckoutScript, {
      successMessage: 'Tracking code has been changed.',
   });
   const [headerScript, setHeaderScript] = useState((course && course.course_script && course.course_script.header_script) || '');
   const [footerScript, setFooterScript] = useState((course && course.course_script && course.course_script.footer_script) || '');
   const [metaCode, setMetaCode] = useState((course && course.course_script && course.course_script.meta_code) || '');
   const handleSave = () => {
      const scripts = {
         course_id: course.id,
         header_script: headerScript,
         footer_script: footerScript,
         meta_code: metaCode,
      };
      createCheckoutScriptFunc({ courseId: course.id, data: scripts }, (data) => {
         setCourse({
            ...course,
            course_script: {
               ...course.course_script,
               header_script: data.header_script,
               footer_script: data.footer_script,
               meta_code: data.meta_code,
            },
         });
      });
   };
   return (
      <div className='tracking-container'>
         <div className='order-tracking'>
            <Text
               size={ TextSize.medium }
               type={ TextType.bold }
               inner='Order Tracking'
               color='#3f4f65'
            />
         </div>
         {/* <div className='under-order-tracking'>
            <Text
               size={ TextSize.extraSmall }
               type={ TextType.medium }
               inner="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
               color='#8a94a2'
            />
         </div> */}
         <div className='header-code'>
            <Text
               size={ TextSize.medium }
               type={ TextType.bold }
               inner='Header Code'
               color='#3f4f65'
            />
         </div>
         <div className='under-header-code'>
            <Text
               size={ TextSize.extraSmall }
               type={ TextType.medium }
               inner='This code will be placed in the <head> section of every checkout page.'
               color='#8a94a2'
            />
         </div>
         <div className='textarea-container'>
            <TextArea
               label=''
               // maxLength='350'
               placeholder=''
               value={ headerScript }
               onChange={ (name, value) => { setHeaderScript(value); } }
            />
         </div>
         <div className='footer-code'>
            <Text
               size={ TextSize.medium }
               type={ TextType.bold }
               inner='Footer Code'
               color='#3f4f65'
            />
         </div>
         <div className='under-footer-code'>
            <Text
               size={ TextSize.extraSmall }
               type={ TextType.medium }
               inner='This code will be placed at the end of the <body> of each checkout page.'
               color='#8a94a2'
            />
         </div>
         <div className='textarea-container'>
            <TextArea
               label=''
               // maxLength='350'
               placeholder=''
               value={ footerScript }
               onChange={ (name, value) => { setFooterScript(value); } }
            />
         </div>
         <div className='pixel-code'>
            <Text
               size={ TextSize.medium }
               type={ TextType.bold }
               inner='Meta Pixel'
               color='#3f4f65'
            />
         </div>
         <div className='under-pixel-code'>
            <Text
               size={ TextSize.extraSmall }
               type={ TextType.medium }
               inner='Automatically track your users, and other data with the Facebook pixel'
               color='#8a94a2'
            />
         </div>
         <div className='textarea-container'>
            <TextArea
               label=''
               // maxLength='350'
               placeholder=''
               value={ metaCode }
               onChange={ (name, value) => { setMetaCode(value); } }
            />
         </div>
         <div className='footer-btns'>
            <div className='first-btn'>
               <BaseButton
                  theme={ btnTheme.lightBlue }
                  text='Cancel'
               />
            </div>
            <div className='second-btn'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  text='Save'
                  onClick={ () => handleSave() }
               />
            </div>
         </div>
      </div>
   );
};

Tracking.propTypes = {
   course: PropTypes.object,
   setCourse: PropTypes.func,
};


export default Tracking;
