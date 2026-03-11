import React from 'react';

import { storiesOf } from '@storybook/react';
import Popup from 'components/modules/Popup';
import {
   withKnobs, text, boolean,
} from '@storybook/addon-knobs';
import useState from 'storybook-addon-state';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Popup', () => {
      const [isOpen, setIsOpen] = useState('isOpen', false);
      return (
         <div className='storybook-element__wrapper'>
            <Popup
               isOpen={ isOpen }
               onClose={ () => setIsOpen(false) }
               title={ text('title', 'Test') }
               onAccept={ () => {
                  setIsOpen(false);
               } }
               onAcceptText={ text('text', 'onAccept') }
            >
               <div>asd</div>
            </Popup>
            <button type='button' onClick={ () => setIsOpen(true) }>open</button>
         </div>
      );
   });
