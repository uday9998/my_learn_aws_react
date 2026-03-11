import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import MembersTable from 'components/elements/members/MembersTable';
import CourseItemV1 from 'components/elements/members/CourseItem/V1';
import CourseItemV2 from 'components/elements/members/CourseItem/V2';
import 'index.scss';
import { data } from './propOptions';

storiesOf('App|Elements/members', module)
   .addDecorator(withKnobs)
   .add('TransactionsTable', () => {
      return (
         <div className='storybook-element__wrapper'>
            <MembersTable data={ data } />
         </div>
      );
   })
   .add('CourseItem - V1', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '662px' } }>
            <CourseItemV1 course={ {
               name: 'Course Code Masterclass',
               progress: 70,
               activity: 'Last Active 2 days ago',
               initialDate: '11/05/18',
               signCount: 1,
            } }
            />
         </div>
      );
   })
   .add('CourseItem - V2', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '662px' } }>
            <CourseItemV2 course={ {
               name: 'Course Code Masterclass',
               progress: 64,
               activity: 'Last Active 2 days ago',
               initialDate: '11/05/18',
               signCount: 1,
            } }
            />
         </div>
      );
   });
