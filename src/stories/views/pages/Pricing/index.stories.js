import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Pricing from 'views/pages/Pricing';


storiesOf('App|Views/pages/Pricing/desktop', module)
   .addDecorator(withKnobs)
   .add('Pricing', () => <Pricing />);
