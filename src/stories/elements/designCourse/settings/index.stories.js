import React from 'react';
import { storiesOf } from '@storybook/react';
import SettingItem from 'components/elements/designCourse/settings/SettingItem';
import { withKnobs, text } from '@storybook/addon-knobs';

storiesOf('App|Elements/designCourse/settings', module)
   .addDecorator(withKnobs)
   .add('SettingItem', () => {
      return (
         <SettingItem
            text={ text('text', 'Intro') }
         />
      );
   });
