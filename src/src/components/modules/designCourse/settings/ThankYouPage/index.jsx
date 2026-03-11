import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import BaseButton, { THEME as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Select from 'components/elements/form/Select';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';

const ThankYouPage = ({
   handleInternalInputChange, handleSettingsSave, settingsData, thankYouPageUrl, thankYouMessage,
}) => {
   const options = [
      {
         label: 'Portal', value: 2,
      },
      {
         label: 'Custom URL', value: 1,
      },
      // {
      //    label: 'Thank you page', value: 4,
      // },
      {
         label: 'Watch Room', value: 3,
      },
   ];
   return (
      <ItemWrapper>
         <div className='ThankYouPage'>
            <Text
               type={ textType.bold }
               size={ textSize.medium }
               inner='Thank You Page'
            />
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
               {/* <BaseButton
                  theme={ btnType.grey }
                  size={ btnSize.large }
                  text='Preview'
                  margin
               /> */}
               <BaseButton
                  theme={ btnType.darkGreen }
                  size={ btnSize.large }
                  text='Save'
                  onClick={ () => handleSettingsSave('thank-you-page') }
               />

            </div>
         </div>
      </ItemWrapper>
   );
};

ThankYouPage.propTypes = {
   handleInternalInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.any,
   thankYouPageUrl: PropTypes.any,
   thankYouMessage: PropTypes.string,
};

export default ThankYouPage;
