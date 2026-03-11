import React from 'react';
import { storiesOf } from '@storybook/react';
import CommentsBlock from 'components/modules/designCourse/studentsRoom/CommentsBlock';
import DropdownCard from 'components/modules/designCourse/studentsRoom/DropdownCard';
import LessonsMedals from 'components/modules/designCourse/studentsRoom/LessonsMedals';
import StudentsRoomSidebar from 'components/modules/designCourse/studentsRoom/StudentsRoomSidebar';
import { withKnobs } from '@storybook/addon-knobs';
import {
   comments, user, headerData, playlist,
} from './propOptions';
import 'index.scss';

storiesOf('App|Modules/designCourse/studentsRoom', module)
   .addDecorator(withKnobs)
   .add('CommentsBlock', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CommentsBlock
               comments={ comments }
               user={ user }
            />
         </div>
      );
   })
   .add('DropdownCard', () => (
      <div className='storybook-element__wrapper' style={ { width: '360px' } }>
         <DropdownCard
            headerData={ headerData[0] }
            playlist={ playlist[0] }
         />
      </div>
   ))
   .add('LessonsMedals', () => (
      <div className='storybook-element__wrapper'>
         <LessonsMedals />
      </div>
   ))
   .add('StudentsRoomSideBar', () => {
      return (
         <div className='storybook-element__wrapper'>
            <StudentsRoomSidebar
               playlist={ playlist }
               headerData={ headerData }
            />
         </div>
      );
   });
