import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaylistItem from 'components/elements/designCourse/studentsRoom/PlaylistItem';
import AuthorInfo from 'components/elements/designCourse/studentsRoom/AuthorInfo';
import CommentField from 'components/elements/designCourse/studentsRoom/CommentField';
import LessonMedal from 'components/elements/designCourse/studentsRoom/LessonMedal';
import MemberComment from 'components/elements/designCourse/studentsRoom/MemberComment';
import NavCard from 'components/elements/designCourse/studentsRoom/NavCard';
import alice from 'assets/images/studentsRoom/avatars/alice.png';
import {
   withKnobs, text, boolean,
} from '@storybook/addon-knobs';
import avatar from 'assets/images/studentsRoom/regular.png';
import 'index.scss';

storiesOf('App|Elements/designCourse/studentsRoom', module)
   .addDecorator(withKnobs)
   .add('PlaylistItem', () => (
      <div className='storybook-element__wrapper'>
         <PlaylistItem
            title={ text('Title', 'Welcome To Cracking The Course Code Masterclass ') }
            duration={ text('Duration', '8:49') }
            active={ boolean('active', false) }
            viewed={ boolean('viewed', false) }
         />
      </div>
   ))
   .add('AuthorInfo', () => (
      <div className='storybook-element__wrapper'>
         <AuthorInfo
            avatar={ avatar }
            name='Justin Burns'
            info='Justin Burns is the CEO of Miestro and has helped companies scale with their online content using courses.'
         />
      </div>
   ))
   .add('CommentField', () => (
      <div className='storybook-element__wrapper'>
         <CommentField
            avatar={ alice }
            name='Alice Miredo'
            comment='This is so informative and inspiring. Hope to make some meaningful life changes through it.'
         />
      </div>
   ))
   .add('LessonMedal', () => (
      <div className='storybook-element__wrapper'>
         <LessonMedal
            level={ text('level', '1') }
            finished={ boolean('finished', false) }
         />
      </div>
   ))
   .add('MemberComment', () => (
      <div className='storybook-element__wrapper'>
         <MemberComment />
      </div>
   ))
   .add('NavCard', () => (
      <div className='storybook-element__wrapper'>
         <NavCard
            active={ boolean('Active', true) }
            title='Discussion'
            icon='Comment'
            content='5 Comment'
         />
      </div>
   ));
