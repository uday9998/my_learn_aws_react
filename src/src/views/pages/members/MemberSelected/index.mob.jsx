import React from 'react';
import './index.mob.scss';
import SearchFilter from 'components/elements/SearchFilter';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import MemberStaticCard from 'components/modules/members/MemberStaticCard';
import SelectedMember from 'components/modules/members/SelectedMember';
import SettingUser from 'components/modules/members/SettingUser';
import SettingTags from 'components/modules/members/SettingTags';
import SettingNotes from 'components/modules/members/SettingNotes';
import SettingTransaction from 'components/modules/members/SettingTransaction/index.mob';
import SettingCourses from 'components/modules/members/SettingCourses';

const MemberSelected = () => {
   return (
      <div className='mob-memberSelected'>
         <SearchFilter />
         <div className='m-t-exs'>
            <BaseButton
               theme={ btnTheme.darkGreen }
               size={ btnSizes.large }
               text='Add Member'
            />
         </div>
         <div className='m-t-m memberStaticCards'>
            <div className='m-t-exl staticCard'>
               <MemberStaticCard
                  title='0'
                  description='Purchase'
                  icon='Purchase'
               />
            </div>
            <div className='m-t-m staticCard'>
               <MemberStaticCard
                  title='2'
                  description='Courses'
                  icon='Book'
               />
            </div>
            <div className='m-t-m staticCard'>
               <MemberStaticCard
                  title='$0.00'
                  description='Total Revenue'
                  icon='Sales'
               />
            </div>
            <div className='m-t-m staticCard'>
               <MemberStaticCard
                  title='30/05/2018'
                  description='Member Since'
                  icon='SinceMember'
               />
            </div>
         </div>
         <div className='m-t-exl'>
            <SelectedMember />
            <div className='m-t-l'>
               <SettingUser />
            </div>
            <div className='m-t-l'>
               <SettingCourses />
            </div>
            <div className='m-t-l'>
               <SettingTags />
            </div>
            <div className='m-t-l'>
               <SettingNotes />
            </div>
            <div className='m-t-l'>
               <SettingTransaction />
            </div>
         </div>
      </div>
   );
};

export default MemberSelected;
