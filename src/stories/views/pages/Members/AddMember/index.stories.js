import React from 'react';
import 'index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import SiteHeader from 'views/layout/SiteHeader';
import LessonMember from 'components/modules/members/LessonMember';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import MemberInfoCard from 'components/modules/members/MemberInfoCard';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';

storiesOf('App|Views/pages/Members/desktop', module)
   .addDecorator(withKnobs)
   .add('Add member', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Add Member' style={ { paddingLeft: '63px' } } />
               <div className='design-course__content' style={ { height: 'calc(100% - 80px)' } }>
                  <div className='design-course__left membersPage__left'>
                     <LessonMember />
                     <div className='m-t-l' />
                     <ItemWrapper border>
                        <div style={ { padding: '16px 32px 16px 24px' } }>
                           <Text
                              type={ textType.regular }
                              size={ textSize.small }
                              inner='Enter info about new member'
                              bold={ true }
                              color='#8a94a2'
                           />
                        </div>
                     </ItemWrapper>
                  </div>
                  <div className='design-course__right'>
                     <div className='m-l-exl' style={ { maxWidth: '640px', marginBottom: '50px' } }>
                        <MemberInfoCard />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   });
