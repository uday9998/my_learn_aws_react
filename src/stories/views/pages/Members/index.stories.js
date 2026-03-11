import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import MemberHeader from 'views/layout/members/MemberHeader';
import NoUsersFound from 'components/modules/members/NoUsersFound';
import LessonMember from 'components/modules/members/LessonMember';
import MemberStaticCard from 'components/modules/members/MemberStaticCard';
import SelectedMember from 'components/modules/members/SelectedMember';
import SettingUser from 'components/modules/members/SettingUser';
import SettingTags from 'components/modules/members/SettingTags';
import SettingNotes from 'components/modules/members/SettingNotes';
import SettingTransaction from 'components/modules/members/SettingTransaction';
import SettingCourses from 'components/modules/members/SettingCourses';

storiesOf('App|Views/pages/Members/desktop', module)
   .addDecorator(withKnobs)
   .add('Empty', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content align-center justify-center' style={ { height: 'calc(100% - 152px' } }>
                  <div style={ { width: '360px' } }>
                     <NoUsersFound />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Members', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px' } }>
                  <div className='design-course__left membersPage__left'>
                     <div className='lessonMembersList'>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember active />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right membersPage__right'>
                     <div className='m-l-exl'>
                        <div className='memberStaticCards m-b-l'>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='0'
                                 description='Purchase'
                                 icon='Purchase'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='2'
                                 description='Courses'
                                 icon='Book'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='$0.00'
                                 description='Total Revenue'
                                 icon='Sales'
                              />
                           </div>
                           <div>
                              <MemberStaticCard
                                 title='30/05/2018'
                                 description='Member Since'
                                 icon='SinceMember'
                              />
                           </div>
                        </div>
                        <div className='m-b-l'>
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
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('User', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px' } }>
                  <div className='design-course__left membersPage__left'>
                     <div className='lessonMembersList'>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember active />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right membersPage__right'>
                     <div className='m-l-exl'>
                        <div className='memberStaticCards m-b-l'>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='0'
                                 description='Purchase'
                                 icon='Purchase'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='2'
                                 description='Courses'
                                 icon='Book'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='$0.00'
                                 description='Total Revenue'
                                 icon='Sales'
                              />
                           </div>
                           <div>
                              <MemberStaticCard
                                 title='30/05/2018'
                                 description='Member Since'
                                 icon='SinceMember'
                              />
                           </div>
                        </div>
                        <div className='m-b-l'>
                           <SelectedMember />
                           <div className='m-t-l'>
                              <SettingUser isOpen />
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
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Tags', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px' } }>
                  <div className='design-course__left membersPage__left'>
                     <div className='lessonMembersList'>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember active />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right membersPage__right'>
                     <div className='m-l-exl'>
                        <div className='memberStaticCards m-b-l'>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='0'
                                 description='Purchase'
                                 icon='Purchase'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='2'
                                 description='Courses'
                                 icon='Book'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='$0.00'
                                 description='Total Revenue'
                                 icon='Sales'
                              />
                           </div>
                           <div>
                              <MemberStaticCard
                                 title='30/05/2018'
                                 description='Member Since'
                                 icon='SinceMember'
                              />
                           </div>
                        </div>
                        <div className='m-b-l'>
                           <SelectedMember />
                           <div className='m-t-l'>
                              <SettingUser />
                           </div>
                           <div className='m-t-l'>
                              <SettingCourses />
                           </div>
                           <div className='m-t-l'>
                              <SettingTags isOpen />
                           </div>
                           <div className='m-t-l'>
                              <SettingNotes />
                           </div>
                           <div className='m-t-l'>
                              <SettingTransaction />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Notes', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px' } }>
                  <div className='design-course__left membersPage__left'>
                     <div className='lessonMembersList'>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember active />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right membersPage__right'>
                     <div className='m-l-exl'>
                        <div className='memberStaticCards m-b-l'>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='0'
                                 description='Purchase'
                                 icon='Purchase'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='2'
                                 description='Courses'
                                 icon='Book'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='$0.00'
                                 description='Total Revenue'
                                 icon='Sales'
                              />
                           </div>
                           <div>
                              <MemberStaticCard
                                 title='30/05/2018'
                                 description='Member Since'
                                 icon='SinceMember'
                              />
                           </div>
                        </div>
                        <div className='m-b-l'>
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
                              <SettingNotes isOpen />
                           </div>
                           <div className='m-t-l'>
                              <SettingTransaction />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Transactions - Empty State', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px' } }>
                  <div className='design-course__left membersPage__left'>
                     <div className='lessonMembersList'>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember active />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right membersPage__right'>
                     <div className='m-l-exl'>
                        <div className='memberStaticCards m-b-l'>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='0'
                                 description='Purchase'
                                 icon='Purchase'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='2'
                                 description='Courses'
                                 icon='Book'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='$0.00'
                                 description='Total Revenue'
                                 icon='Sales'
                              />
                           </div>
                           <div>
                              <MemberStaticCard
                                 title='30/05/2018'
                                 description='Member Since'
                                 icon='SinceMember'
                              />
                           </div>
                        </div>
                        <div className='m-b-l'>
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
                              <SettingTransaction isOpen empty />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Transactions', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px' } }>
                  <div className='design-course__left membersPage__left'>
                     <div className='lessonMembersList'>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember active />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right membersPage__right'>
                     <div className='m-l-exl'>
                        <div className='memberStaticCards m-b-l'>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='0'
                                 description='Purchase'
                                 icon='Purchase'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='2'
                                 description='Courses'
                                 icon='Book'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='$0.00'
                                 description='Total Revenue'
                                 icon='Sales'
                              />
                           </div>
                           <div>
                              <MemberStaticCard
                                 title='30/05/2018'
                                 description='Member Since'
                                 icon='SinceMember'
                              />
                           </div>
                        </div>
                        <div className='m-b-l'>
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
                              <SettingTransaction isOpen />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Course - V1', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px' } }>
                  <div className='design-course__left membersPage__left'>
                     <div className='lessonMembersList'>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember active />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right membersPage__right'>
                     <div className='m-l-exl'>
                        <div className='memberStaticCards m-b-l'>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='0'
                                 description='Purchase'
                                 icon='Purchase'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='2'
                                 description='Courses'
                                 icon='Book'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='$0.00'
                                 description='Total Revenue'
                                 icon='Sales'
                              />
                           </div>
                           <div>
                              <MemberStaticCard
                                 title='30/05/2018'
                                 description='Member Since'
                                 icon='SinceMember'
                              />
                           </div>
                        </div>
                        <div className='m-b-l'>
                           <SelectedMember />
                           <div className='m-t-l'>
                              <SettingUser />
                           </div>
                           <div className='m-t-l'>
                              <SettingCourses isOpen />
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
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Course - V2', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <MemberHeader />
               <div className='design-course__content' style={ { height: 'calc(100% - 152px' } }>
                  <div className='design-course__left membersPage__left'>
                     <div className='lessonMembersList'>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember active />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                        <div className='lessonMember-margin'>
                           <LessonMember />
                        </div>
                     </div>
                  </div>
                  <div className='design-course__right membersPage__right'>
                     <div className='m-l-exl'>
                        <div className='memberStaticCards m-b-l'>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='0'
                                 description='Purchase'
                                 icon='Purchase'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='2'
                                 description='Courses'
                                 icon='Book'
                              />
                           </div>
                           <div className='m-r-exl'>
                              <MemberStaticCard
                                 title='$0.00'
                                 description='Total Revenue'
                                 icon='Sales'
                              />
                           </div>
                           <div>
                              <MemberStaticCard
                                 title='30/05/2018'
                                 description='Member Since'
                                 icon='SinceMember'
                              />
                           </div>
                        </div>
                        <div className='m-b-l'>
                           <SelectedMember />
                           <div className='m-t-l'>
                              <SettingUser />
                           </div>
                           <div className='m-t-l'>
                              <SettingCourses isOpen v2 />
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
                  </div>
               </div>
            </div>
         </div>
      );
   });
