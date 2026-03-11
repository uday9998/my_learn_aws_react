import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import BuilderCard from 'components/modules/designCourse/pageBuilder/BuilderCard';

storiesOf('App|Modules/designCourse/pageBuilder', module)
   .addDecorator(withKnobs)
   .add('BuilderCard', () => {
      return (
         <div className='storybook-element__wrapper'>
            <BuilderCard
               focused={ boolean('Focused', false) }
            />
         </div>
      );
   });
