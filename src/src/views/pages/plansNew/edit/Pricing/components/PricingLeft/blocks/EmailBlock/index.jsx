import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/elements/switchNew';
import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import CodeInput from 'components/elements/CodeInput';
import QuillEditor from 'components/modules/Editors/QuillEditor';


const EmailBlock = ({ data, onChange }) => {
   return (
      <div className='plan__pricing__left__plans__email'>
         <div className='block__flex'>
            <Switch
               value={ data.send_email }
               label='Fulfillment Email'
               onChange={ () => onChange('send_email', data.send_email === 1 ? 0 : 1) }
               size='medium'
               positionText='left'
            />
            <Text
               inner='Choose a communication preference for members who make an Offer purchase.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         {data.send_email === 1 && (
            <div className='block__inputs'>
               <Input
                  label='Email Subject'
                  placeholder='Enter email subject'
                  value={ data.email_subject }
                  name='email_subject'
                  onChange={ onChange }
               />
               {/* <CodeInput
                  value={ data.email_text }
                  onChange={ onChange }
                  name='email_text'
               /> */}
               <QuillEditor
                  text={ data.email_text || '' }
                  onChange={ (value) => onChange('email_text', value) }
                  title=''
                  withoutBorder={ true }
               />
               <Text
                  inner='The following liquid objects are available: {{member}}, {{offer}}, {{site}}, and {{site_login_url}}. Only html <a> tags are allowed. Please no images, divs, etc. | liquid markup reference.'
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#727978', marginTop: '4px' } }
               />
            </div>
         )}
      </div>
   );
};

EmailBlock.propTypes = {
   data: PropTypes.object,
   onChange: PropTypes.func,
};

export default EmailBlock;
