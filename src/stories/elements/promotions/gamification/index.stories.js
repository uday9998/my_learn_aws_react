import React from 'react';
import { storiesOf } from '@storybook/react';
import LevelIconsRow from 'components/elements/promotions/gamification/LevelIconsRow';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements/promotions/gamification', module)
   .addDecorator(withKnobs)
   .add('LevelIconsRow', () => {
      return (
         <div className='storybook-element__wrapper'>
            <LevelIconsRow />
         </div>
      );
   });
