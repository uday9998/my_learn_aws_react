import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import './index.scss';

import TextInputRange from 'components/elements/form/TextInputRange';
import ColorInput from 'components/elements/form/ColorInput';


const BlockSettingsAddress = ({
   inputs, onChange,
}) => {
   return (
      <>
         <div className='email__block__edit__left__background'>
            <ColorInput
               label='Background Color'
               isPageBuilder={ true }
               placeholder='#FFFFFF'
               name='bg_color'
               value={ inputs.bg_color }
               onChange={ onChange }
            />
            <Text
               inner='Spacing'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <TextInputRange
               label='Letter spacing'
               type='range'
               leftText={ inputs.letterSpacing }
               // id={ `font-${ slug }` }
               min={ 1 }
               max={ 5 }
               name='letterSpacing'
               value={ inputs.letterSpacing }
               onChange={ (value, name) => { onChange(name, value); } }
            />

            <TextInputRange
               label='Padding Top'
               type='range'
               leftText={ inputs.paddingTop }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingTop'
               value={ inputs.paddingTop }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Bottom'
               type='range'
               leftText={ inputs.paddingBottom }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingBottom'
               value={ inputs.paddingBottom }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Left'
               type='range'
               leftText={ inputs.paddingLeft }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingLeft'
               value={ inputs.paddingLeft }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Right'
               type='range'
               leftText={ inputs.paddingRight }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingRight'
               value={ inputs.paddingRight }
               onChange={ (value, name) => { onChange(name, value); } }
            />
         </div>
      </>
   );
};

BlockSettingsAddress.defaultProps = {
   inputs: {},
};

BlockSettingsAddress.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
};

export default BlockSettingsAddress;
