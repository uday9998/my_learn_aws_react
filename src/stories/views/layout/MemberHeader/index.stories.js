import React from 'react';
import { storiesOf } from '@storybook/react';
import MemberHeader from 'views/layout/members/MemberHeader';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Views/layout', module)
   .addDecorator(withKnobs)
   .add('Member Header', () => {
      return (
         <MemberHeader />
      );
   });
