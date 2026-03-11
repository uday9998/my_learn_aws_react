import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import './index.scss';
import TextInputRange from 'components/elements/form/TextInputRange';
import Input from 'components/elements/inputNew';
import ColorInput from 'components/elements/form/ColorInput';

const BlockSettingsLinks = ({
   inputs, onChange, emailInputs, onGeneralSettingsChange,
}) => {
   return (
      <>
         <div className='email__block__edit__left__background'>
            <ColorInput
               label='Background Color'
               isPageBuilder={ true }
               placeholder='#3F4F65'
               name='bg_color'
               value={ inputs.bg_color }
               onChange={ onChange }
            />
            <Text
               inner='Amount of links'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <TextInputRange
               label='Amount'
               type='range'
               leftText={ inputs.amount || 1 }
               // id={ `font-${ slug }` }
               min={ 1 }
               max={ 8 }
               name='amount'
               value={ inputs.amount || 1 }
               onChange={ (value, name) => { onChange(name, value); } }
            />
         </div>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Link'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            {emailInputs && emailInputs.links && !!emailInputs.links.length && emailInputs.links.map(((link, i) => {
               const newIndex = i + 1;
               return (
                  <Input
                     key={ newIndex }
                     id={ newIndex }
                     value={ link.link }
                     onChange={ (name, value) => onGeneralSettingsChange(name, value, false, true, i) }
                     name='link'
                     label={ link.text }
                     isLabelHtml={ true }

                  />
               );
            }))

            }
         </div>
         <div className='email__block__edit__left__background'>
            <Text
               inner='Spacing'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
               style={ { color: '#727978' } }
            />
            <TextInputRange
               label='Letter spacing'
               type='range'
               leftText={ inputs.letterSpacing || 1 }
               // id={ `font-${ slug }` }
               min={ 1 }
               max={ 5 }
               name='letterSpacing'
               value={ inputs.letterSpacing || 1 }
               onChange={ (value, name) => { onChange(name, value); } }
            />

            <TextInputRange
               label='Between links'
               type='range'
               leftText={ inputs.gap || 8 }
               // id={ `font-${ slug }` }
               min={ 1 }
               max={ 16 }
               name='gap'
               value={ inputs.gap || 8 }
               onChange={ (value, name) => { onChange(name, value); } }
            />

            <TextInputRange
               label='Padding Top'
               type='range'
               leftText={ inputs.paddingTop || 5 }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingTop'
               value={ inputs.paddingTop || 5 }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Bottom'
               type='range'
               leftText={ inputs.paddingBottom || 5 }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingBottom'
               value={ inputs.paddingBottom || 5 }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Right'
               type='range'
               leftText={ inputs.paddingRight || 5 }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingBottom'
               value={ inputs.paddingRight || 5 }
               onChange={ (value, name) => { onChange(name, value); } }
            />
            <TextInputRange
               label='Padding Left'
               type='range'
               leftText={ inputs.paddingLeft || 5 }
               // id={ `font-${ slug }` }
               min={ 0 }
               max={ 60 }
               name='paddingLeft'
               value={ inputs.paddingLeft || 5 }
               onChange={ (value, name) => { onChange(name, value); } }
            />
         </div>
      </>
   );
};

BlockSettingsLinks.defaultProps = {
   inputs: { },
   emailInputs: {},
};

BlockSettingsLinks.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   emailInputs: PropTypes.object,
   onGeneralSettingsChange: PropTypes.func,
};

export default BlockSettingsLinks;
