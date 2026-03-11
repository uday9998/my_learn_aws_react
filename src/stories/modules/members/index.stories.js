import React from 'react';
import { storiesOf } from '@storybook/react';
import MemberHeaderTop from 'components/modules/members/MemberHeaderTop';
import SearchFilter from 'components/elements/SearchFilter';
import NoUsersFound from 'components/modules/members/NoUsersFound';
import LessonMember from 'components/modules/members/LessonMember';
import MemberStaticCard from 'components/modules/members/MemberStaticCard';
import SelectedMember from 'components/modules/members/SelectedMember';
import SettingUser from 'components/modules/members/SettingUser';
import SettingTags from 'components/modules/members/SettingTags';
import SettingNotes from 'components/modules/members/SettingNotes';
import SettingTransaction from 'components/modules/members/SettingTransaction';
import SettingCourses from 'components/modules/members/SettingCourses';
import MemberInfoCard from 'components/modules/members/MemberInfoCard';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/members', module)
   .addDecorator(withKnobs)
   .add('Member Header Top', () => {
      return (
         <MemberHeaderTop />
      );
   })
   .add('Member Filter', () => {
      return (
         <SearchFilter />
      );
   })
   .add('No Users Found', () => {
      return (
         <div style={ { width: '360px' } }>
            <NoUsersFound />
         </div>
      );
   })
   .add('Lesson Member', () => {
      return (
         <div style={ { width: '360px' } }>
            <LessonMember />
         </div>
      );
   })
   .add('Selected Member', () => {
      return (
         <div style={ { width: '860px' } }>
            <SelectedMember />
         </div>
      );
   })
   .add('Member Static Card', () => {
      return (
         <div style={ { width: '168px' } }>
            <MemberStaticCard
               title='0'
               description='Purchase'
               icon='Purchase'
            />
         </div>
      );
   })
   .add('Setting User', () => {
      return (
         <div style={ { width: '840px' } }>
            <SettingUser isOpen={ boolean('isOpen', false) } />
         </div>
      );
   })
   .add('Setting Course', () => {
      return (
         <div style={ { width: '840px' } }>
            <SettingCourses isOpen={ boolean('isOpen', false) } />
         </div>
      );
   })
   .add('Setting Tags', () => {
      return (
         <div style={ { width: '840px', marginTop: '120px' } }>
            <SettingTags isOpen={ boolean('isOpen', false) } />
         </div>
      );
   })
   .add('Setting Notes', () => {
      return (
         <div style={ { width: '840px' } }>
            <SettingNotes isOpen={ boolean('isOpen', false) } />
         </div>
      );
   })
   .add('Setting Transaction empty', () => {
      return (
         <div style={ { width: '840px' } }>
            <SettingTransaction
               isOpen={ boolean('isOpen', false) }
               empty={ boolean('empty', false) }
            />
         </div>
      );
   })
   .add('Member Info', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '640px' } }>
            <MemberInfoCard />
         </div>
      );
   });
