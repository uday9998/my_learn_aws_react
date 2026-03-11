import React from 'react';
import PropTypes from 'prop-types';
import FormActions from 'components/elements/form/FormActions';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import DragAndDropUploadImage from 'components/modules/dragAndDropUploadImage';
import TextInput from 'components/elements/form/TextInput';
import './style.scss';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateSettingsByGroup } from 'api';

const Seo = ({
   form, onChange, onCancel, onSave,
}) => {
   const [subimt] = useSubmitForm(updateSettingsByGroup('seo'), {
      successMessage: 'Seo Settings Updated Successfully',
   });
   return (
      <div className='seo'>
         <div className='seo__info'>
            <Text
               type={ TextType.medium }
               size={ TextSize.small }
               inner='Information about this page for Seo and sharing with social networks like Facebook and Twitter. It is okay to leave these fields blank, we will fail back to reasonable defaults.'
               className='text-center'
               color='#8a94a2'
            />
         </div>
         <div className='seoInputs'>
            <div className='seoInputs__input'>
               <Text
                  type={ TextType.demiBold }
                  size={ TextSize.small }
                  inner='Page Title'
                  className='text-center'
                  color='#3f4f65'
               />
               <div className='seoInputs__description'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner='A clear title without branding or mentoring the domain itself. Best between 60-70 characters long.'
                     className='text-center'
                     color='#8a94a2'
                  />
               </div>
               <TextInput
                  type='text'
                  placeholder=''
                  name='seo_title'
                  value={ form.data.seo_title }
                  onChange={ onChange }
               />
            </div>
            <div className='seoInputs__input'>
               <Text
                  type={ TextType.demiBold }
                  size={ TextSize.small }
                  inner='Page Description'
                  className='text-center'
                  color='#3f4f65'
               />
               <div className='seoInputs__description'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner='A clear description, at least two sentences long. Best between 150-160 characters long.'
                     className='text-center'
                     color='#8a94a2'
                  />
               </div>
               <TextInput
                  type='text'
                  placeholder=''
                  name='seo_description'
                  value={ form.data.seo_description }
                  onChange={ onChange }
               />
            </div>
         </div>
         <div className='seoImage'>
            <Text
               type={ TextType.demiBold }
               size={ TextSize.small }
               inner='Page Image'
               className='text-center'
               color='#3f4f65'
            />
            <DragAndDropUploadImage
               onChange={ img => onChange('seo_image', img) }
               src={ form.data.seo_image }
               crop='1920x1080'
            />

         </div>
         <FormActions
            onSave={ () => { onSave(form.data, subimt); } }
            onCancel={ onCancel }
         />
      </div>
   );
};

Seo.propTypes = {
   form: PropTypes.object,
   onChange: PropTypes.func,
   onCancel: PropTypes.func,
   onSave: PropTypes.func,
};

export default Seo;
