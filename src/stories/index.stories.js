import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import 'assets/css/base.scss';
import './index.scss';
import { Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={ linkTo('Button') } />);
// storiesOf('App|ExampleComponent', module).add('to Storybook', () => <ExampleComponent showApp={linkTo('Button')} />);
