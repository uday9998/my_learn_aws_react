import React from 'react';
import { storiesOf } from '@storybook/react';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('App|Elements/wrappers', module)
   .addDecorator(withKnobs)
   .add('Selected Wrapper', () => (
      <SelectedWrapper />
   ));
