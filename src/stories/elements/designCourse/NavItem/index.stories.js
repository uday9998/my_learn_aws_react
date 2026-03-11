import React from 'react';

import { storiesOf } from '@storybook/react';
import NavItem from 'components/elements/designCourse/NavItem';
import { withKnobs, text } from '@storybook/addon-knobs';

storiesOf('App|Elements/designCourse', module)
   .addDecorator(withKnobs)
   .add('NavItem', () => (
      <NavItem
         label={ text('label', 'Name:') }
         placeholder={ text('placeholder', 'Type Sumething') }
      />
   ));
