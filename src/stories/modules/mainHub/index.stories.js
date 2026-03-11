import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import CourseCard from 'components/modules/mainHub/CourseCard';
import FormContainer from 'components/modules/mainHub/FormContainer';
import mainHub from 'assets/images/main-hub.png';
import { options } from './propOptions';

import 'index.scss';

storiesOf('App|Modules/mainHub', module)
   .addDecorator(withKnobs)
   .add('CourseCard', () => {
      return (
         <div className='mainHub-card_storybook'>
            <CourseCard
               title={ text('title', 'The course Code Masterclass') }
               text={ text('text', 'You will learn how to compile and run your program, and then how to test and debug') }
               imageSrc={ mainHub }
               buttonText={ text('Button', 'Continue Course') }
               author={ text('author', 'Justin Burns') }
            />
         </div>
      );
   })
   .add('FormContainer', () => {
      return (
         <div className='main-content_storybook'>
            <FormContainer options={ options } />
         </div>
      );
   });
