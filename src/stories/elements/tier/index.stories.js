import React from 'react';
import useState from 'storybook-addon-state';
import { storiesOf } from '@storybook/react';
import { Tier } from 'components/modules/tiersNew';
import {
   withKnobs, text, select,
} from '@storybook/addon-knobs';

storiesOf('App|Elements', module)
   .addDecorator(withKnobs)
   .add('Tiers', () => {
      const [tiers, setTiers] = useState('tiers', [
         { title: 'Test' },
      ]);
      return (
         <div className='storybook-element__wrapper'>
            {tiers[0] && (
               <Tier
                  title={ tiers[0].title }
                  onRename={ (newTitle) => {
                     const newTiers = tiers;
                     newTiers[0].title = newTitle;
                     setTiers(newTiers);
                  } }
                  onDelete={ () => setTiers([]) }
               />
            )}
         </div>
      );
   });
