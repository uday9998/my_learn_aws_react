import React from 'react';
import useState from 'storybook-addon-state';
import { storiesOf } from '@storybook/react';
import { Header } from 'components/modules/NavigationBar';
import {
   withKnobs, text, boolean,
} from '@storybook/addon-knobs';
import { THEMES, SIZES } from './options.sotries';
import 'index.scss';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Header', () => {
      return (
         <div className='storybook-element__wrapper'>
            <Header
               links={ [
                  { text: 'asd', goTo: () => {}, disabled: false },
                  { text: 'asdd', goTo: () => {}, disabled: false },
               ] }
               title={ text('title', 'Your Classes') }
               isBack={ () => {} }
               TooltipText={ text('tooltip', 'Tooltip') }
               buttonProps={ {
                  theme: THEMES.primary,
                  size: THEMES.small,
               } }
               table={ [
                  {
                     isSelect: true, text: 'ss', id: 1, isDisabled: false, icon: 'ArrowRight',
                  },
                  {
                     isSelect: false, text: 'ss', id: 3, isDisabled: false, icon: 'ArrowRight',
                  },
                  {
                     isSelect: false, text: 'aa', id: 2, isDisabled: false, icon: 'ArrowRight',
                  },
               ] }
               isSearch={ boolean('isSearch', false) }
            />
         </div>
      );
   });
