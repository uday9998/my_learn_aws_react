import React from 'react';
import Radio from 'components/elements/form/RadioNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';


const RadioModul = ({
   title, subtitle, labelFirst, labelSecond, checked, onChange, name,
}) => {
   return (
      <div className='radiomodul'>
         {title && (
            <div className='radiomodul-title'>
               <Text
                  type={ TextType.mediumSmall }
                  size={ TextSize.medium }
                  inner={ title }
               />
            </div>
         )}
         {subtitle && (
            <div className='radiomodul-subtitle'>
               <Text
                  type={ TextType.regularDefaultGrey }
                  size={ TextSize.small }
                  inner={ subtitle }
               />
            </div>
         )}
         <div className='radiomodul-content'>
            <div>
               <Radio
                  checked={ checked === 1 }
                  label={ labelFirst }
                  labelPosition='right'
                  theme='light'
                  name={ name }
                  onChange={ () => onChange(name, 1) }
               />
            </div>
            <div>
               <Radio
                  checked={ checked === 0 }
                  label={ labelSecond }
                  labelPosition='right'
                  name='send_email'
                  theme='light'
                  onChange={ () => onChange(name, 0) }
               />
            </div>
         </div>
      </div>
   );
};

RadioModul.propTypes = {
   title: PropTypes.string,
   subtitle: PropTypes.string,
   labelFirst: PropTypes.string,
   labelSecond: PropTypes.string,
   checked: PropTypes.any,
   onChange: PropTypes.func,
   name: PropTypes.string,
};

RadioModul.defaultProps = {
   title: 'Receipt Sending Options',
   subtitle: 'Select your preferred timing for emailing receipts to customers post-purchase.',
   labelFirst: 'Send receipt always',
   labelSecond: 'Never send a receipt',
};

export default RadioModul;
