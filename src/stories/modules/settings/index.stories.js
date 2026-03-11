import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import SettingsMenu from 'components/modules/settings/SettingsMenu';
import ThumbnailCard from 'components/modules/settings/ThumbnailCard';
import CustomLinks from 'components/modules/settings/CustomLinks';
import LoginWith from 'components/modules/settings/LoginWith';
import 'index.scss';
import SiteChanges from 'components/modules/settings/SiteChanges';
import AccountInfo from 'components/modules/settings/AccountInfo';

storiesOf('App|Modules/settings', module)
   .addDecorator(withKnobs)
   .add('SettingsMenu', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '264px' } }>
            <SettingsMenu active={ select('active', {
               1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
            }, 1) }
            />
         </div>
      );
   })
   .add('ThumbnailCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '624px' } }>
            <ThumbnailCard />
         </div>
      );
   })
   .add('CustomLinks', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '624px' } }>
            <CustomLinks />
         </div>
      );
   })
   .add('LoginWith', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '624px' } }>
            <LoginWith />
         </div>
      );
   })
   .add('SiteChanges', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '624px' } }>
            <SiteChanges />
         </div>
      );
   })
   .add('AccountInfo', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '624px' } }>
            <AccountInfo />
         </div>
      );
   });
