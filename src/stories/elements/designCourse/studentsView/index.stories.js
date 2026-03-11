import React from 'react';
import { storiesOf } from '@storybook/react';
import ListItem from 'components/elements/designCourse/studentsView/ListItem';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements/designCourse/studentsView', module)
   .addDecorator(withKnobs)
   .add('ListItem', () => (
      <div className='storybook-element__wrapper'>
         <ListItem text='Some text' />
      </div>
   ));
