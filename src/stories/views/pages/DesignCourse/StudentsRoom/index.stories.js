import React from 'react';
import { storiesOf } from '@storybook/react';
import StudentsRoom from 'views/pages/DesignCourse/StudentsRoom';
import {
   sidebarData,
   navCards,
   commentsData,
   author,
} from './propOptions';


storiesOf('App|Views/pages/designCourse/StudentsRoom/desktop', module)
   .add('Course Discussion', () => {
      return (
         <StudentsRoom
            sidebarData={ sidebarData }
            navCards={ navCards }
            commentsData={ commentsData }
         />
      );
   })
   .add('Meet the Professor', () => {
      return (
         <StudentsRoom
            sidebarData={ sidebarData }
            navCards={ navCards }
            author={ author }
            active={ 2 }
         />
      );
   })
   .add('Achievements', () => {
      return (
         <StudentsRoom
            sidebarData={ sidebarData }
            navCards={ navCards }
            active={ 3 }
         />
      );
   })
   .add('Resources', () => {
      return (
         <StudentsRoom
            sidebarData={ sidebarData }
            navCards={ navCards }
            active={ 4 }
         />
      );
   });
