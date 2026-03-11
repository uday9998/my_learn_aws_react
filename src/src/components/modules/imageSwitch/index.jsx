import React from 'react';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import Radio from 'components/elements/form/Radio';
import './index.scss';

function ImageSwitch({
   options, name, value, onChange, className,
}) {
   return (
      <div className={ `flex justify-between image-switch ${ className }` }>
         {
            options.map(option => {
               return (
                  <div key={ option.value }>
                     <Radio
                        checked={ option.value === value }
                        name='miestro_theme_light'
                        className='theme_radio'
                        labelNode={
                           (
                              <Text
                                 size={ txtSizes.extraSmall }
                                 type={ txtType.demiBold }
                                 inner={ option.label }
                                 color='#3f4f65'
                              />
                           )
                        }
                        color={ option.value === value ? '#7cb740' : '#3f4f65' }
                        onChange={ () => onChange(name, option.value) }
                     />
                     <div className='m-t-m'>
                        <img src={ option.img } alt='miestro-light' className='miestro_theme_preview_img' />
                     </div>
                  </div>
               );
            })
         }
      </div>
   );
}

ImageSwitch.propTypes = {
   onChange: PropTypes.func,
   options: PropTypes.array,
   name: PropTypes.string,
   value: PropTypes.string,
   className: PropTypes.string,
};

export default ImageSwitch;
