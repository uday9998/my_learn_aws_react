import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
import TextInputRange from 'components/elements/form/TextInputRange';

const BlockSettingsEmpty = ({
   inputs,
   onChange,
}) => {
   return (
      <>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Background Style'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <ColorInput
               label='Space Color'
               isPageBuilder={ true }
               placeholder='#FFFFFF'
               name='bg_color'
               value={ inputs.bg_color }
               onChange={ onChange }
            />
         </div>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Size'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <TextInputRange
               label='Space Height'
               type='range'
               leftText={ inputs.height }
               // id={ `font-${ slug }` }
               min={ 5 }
               max={ 60 }
               name='height'
               value={ inputs.height }
               onChange={ (value, name) => { onChange(name, value); } }
            />
         </div>
      </>
   );
};

BlockSettingsEmpty.defaultProps = {
   inputs: {},
};

BlockSettingsEmpty.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
};

export default BlockSettingsEmpty;
