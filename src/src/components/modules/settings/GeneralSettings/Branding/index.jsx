import React from 'react';
import PropTypes from 'prop-types';
import FormActions from 'components/elements/form/FormActions';
import UploadImg from 'components/elements/settings/UploadImg';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateSettingsByGroup } from 'api';
import ColorInput from 'components/elements/form/ColorInput';
import Select from 'components/elements/form/Select';
import { getThemeFonts } from 'utils/StaticData';
import CheckBox from 'components/elements/form/CheckBox';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import './index.scss';

const fontSizeOptionForSelect = getThemeFonts().map(option => ({ label: option.label, value: option.value }));

const Branding = ({
   form, onChange, onCancel, onSave,
}
) => {
   const [subimt] = useSubmitForm(updateSettingsByGroup('seo'), {
      successMessage: 'Branding Settings Updated Successfully',
   });
   if (form.loading) {
      return 'Loading...';
   }
   return (
      <div>
         <ColorInput
            label='Primary Color'
            subLabel='Use the color to brand your portal.'
            placeholder='#fffff'
            name='item_button_color'
            labelFont='demiBold'
            value={ form.data.item_button_color }
            onChange={ (key, value) => onChange(key, value) }
         />
         <div className='w-full m-t-m'>
            <Select
               label='Theme Font'
               placeholder='Choose Font'
               options={ fontSizeOptionForSelect }
               iconColor='#3f4f65'
               name='school_font'
               value={ form.data.school_font }
               onChange={ (key, value) => onChange(key, value) }
               fontStyles={ true }
            />
         </div>
         <div className='brandingImages flex m-t-exl'>
            <div className='brandingImages__item'>
               <UploadImg
                  title='School Logo'
                  height='60px'
                  size='125x30'
                  crop='125x30'
                  labelFont='demiBold'
                  img={ form.data.school_logo }
                  isSchoolLogo={ true }
                  onChange={ (value) => onChange('school_logo', value) }
                  style={ { borderRadius: '0px' } }
                  removLogo={ true }
               />
            </div>
            <div className='brandingImages__item favicon'>
               <UploadImg
                  title='Favicon'
                  size='60x60'
                  crop='60x60'
                  labelFont='demiBold'
                  height='60px'
                  img={ form.data.favicon }
                  isSchoolLogo={ true }
                  onChange={ (value) => onChange('favicon', value) }
                  style={ { borderRadius: '0px' } }
               />
            </div>
         </div>
         <div className='m-t-exl'>
            <CheckBox
               label={ [<Text
                  size={ textSize.extraSmall }
                  type={ textType.demiBold }
                  inner='Remove ‘’Miestro’’ branding on footer'
                  color='#3f4f65'
               />] }
               filled
               name='remove_branding'
               onChange={ onChange }
               checked={ Number(form.data.remove_branding) }
            />
         </div>
         <FormActions
            onSave={ () => { onSave(form.data, subimt); } }
            onCancel={ onCancel }
         />
      </div>
   );
};

Branding.propTypes = {
   form: PropTypes.object,
   onChange: PropTypes.func,
   onCancel: PropTypes.func,
   onSave: PropTypes.func,
};

export default Branding;
