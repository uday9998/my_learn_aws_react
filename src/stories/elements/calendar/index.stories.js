import React from 'react';
import useState from 'storybook-addon-state';
import { storiesOf } from '@storybook/react';
import { Calendar } from 'components/elements/CalendarNew';
import {
   withKnobs,
} from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Calendar', () => {
      const [value, setValue] = useState('value', new Date());
      return (
         <div className='storybook-element__wrapper'>
            <Calendar
               value={ value }
               onChange={ (date) => {
                  setValue(date);
               } }
               min={ 2000 }
            />
         </div>
      );
   });
