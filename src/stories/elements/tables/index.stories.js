import React from 'react';
import useState from 'storybook-addon-state';
import { storiesOf } from '@storybook/react';
import Table from 'components/elements/tableNew';
import {
   withKnobs, text, boolean,
} from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Table', () => {
      const [tables, setTables] = useState('table', [
         {
            isSelect: true, text: 'ss', id: 1, isDisabled: false, icon: 'error',
         },
         {
            isSelect: false, text: 'ss', id: 3, isDisabled: false, icon: 'error',
         },
         {
            isSelect: false, text: 'aa', id: 2, isDisabled: false, icon: 'error',
         },
      ]);
      return (
         <div className='storybook-element__wrapper'>
            <Table
               isButton={ boolean('isButton', true) }
               tables={ text('tables', tables) }
               size={ text('size', 'large') }
               setTables={ (newTable) => setTables([...newTable]) }
            />
         </div>
      );
   });
