import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Select from 'components/elements/form/Select';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import RadioBox from 'components/elements/form/Radio';

const ThankYouPage = ({
   handleInternalInputChange, handleSettingsSave, settingsData, thankYouPageUrl, thankYouMessage,
   thankYouPageActive,
}) => {
   const options = [
      {
         label: 'Custom URL', value: 1,
      },
      {
         label: 'Portal', value: 2,
      },
      {
         label: 'Watch Room', value: 3,
      },
   ];

   return (
      <div className='advancedsetting__thankYouPage'>
         <div className='thankYouPage'>
            <Text
               size={ TextSize.medium }
               type={ TextType.bold }
               inner='Thank You Page'
               color='#3f4f65'
            />
         </div>
         <div className='thankYouPage_radioboxes'>
            <div className='dont-active'>
               <RadioBox
                  name='thank_you_page_active_off'
                  label='Off'
                  className="don't-active"
                  textType='normal'
                  onChange={ () => handleInternalInputChange('thank_you_page_active', 0) }
                  checked={ !thankYouPageActive }
                  color={ !thankYouPageActive ? '#7cb740' : '#c2cedb' }
               />
            </div>
            <div>
               <RadioBox
                  name='thank_you_page_active_on'
                  label='On'
                  className='require'
                  textType='normal'
                  onChange={ () => handleInternalInputChange('thank_you_page_active', 1) }
                  checked={ thankYouPageActive }
                  color={ thankYouPageActive ? '#7cb740' : '#c2cedb' }
               />
            </div>
         </div>
         <div className='w-full m-t-m thankYouPage_select'>
            <Select
               label='Specify the next screen customers see after purchasing your class.'
               placeholder='Current Class/Page'
               options={ options }
               iconColor='#3f4f65'
               name='thank_you_page'
               value={ settingsData === 0 ? 4 : settingsData }
               onChange={ (key, value) => handleInternalInputChange(key, value) }
            />
            {
               settingsData === 1 && (
                  <div className='m-t-m'>
                     <TextInput
                        placeholder='Set URL here...'
                        id='url'
                        name='thank_you_page_url'
                        value={ thankYouPageUrl }
                        onChange={ (name, value) => handleInternalInputChange(name, value) }
                     />
                  </div>

               )
            }
            {
               settingsData === 4 && (
                  <div className='m-t-m'>
                     <TextArea
                        label=''
                        placeholder='Enter thank you message'
                        value={ thankYouMessage }
                        name='thank_you_message'
                        maxLength='350'
                        onChange={ (name, value) => handleInternalInputChange(name, value) }
                     />
                  </div>

               )
            }
         </div>
         <div className='ThankYouPage_btn flex w-full m-t-exl'>
            <BaseButton
               theme={ btnType.darkGreen }
               size={ btnSize.extraLargeNarrow }
               className='save-detalis'
               text='Save'
               onClick={ () => handleSettingsSave('thank-you-page') }
            />

         </div>
      </div>
   );
};

ThankYouPage.propTypes = {
   handleInternalInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.any,
   thankYouPageUrl: PropTypes.any,
   thankYouMessage: PropTypes.string,
   thankYouPageActive: PropTypes.any,
};

export default ThankYouPage;
