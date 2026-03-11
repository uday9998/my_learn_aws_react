import React from 'react';
import './index.mob.scss';
import SearchFilter from 'components/elements/SearchFilter';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import LessonMember from 'components/modules/members/LessonMember';

const MemberEmpty = () => {
   return (
      <div className='mob-memberEmpty'>
         <SearchFilter />
         <div className='m-t-exs'>
            <BaseButton
               theme={ btnTheme.darkGreen }
               size={ btnSizes.large }
               text='Add Member'
            />
         </div>
         <div className='lessonMembersList m-t-exl'>
            <div className='m-t-s'>
               <LessonMember />
            </div>
            <div className='m-t-s'>
               <LessonMember active />
            </div>
            <div className='m-t-s'>
               <LessonMember />
            </div>
            <div className='m-t-s'>
               <LessonMember />
            </div>
            <div className='m-t-s'>
               <LessonMember />
            </div>
         </div>
      </div>
   );
};

export default MemberEmpty;
