/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import FirstBadgeCard from 'components/modules/promotions/gamification/FirstBadgeCard';
import AddBadgeCard from 'components/modules/promotions/gamification/AddBadgeCard';
import CongratsCard from 'components/modules/promotions/gamification/CongratsCard';
import CongratulationsCard from 'components/modules/promotions/gamification/CongratulationsCard';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import badge from 'assets/images/promotions/badge.png';
import group from 'assets/images/promotions/group.png';
import groupSm from 'assets/images/promotions/group-sm.png';

import BackdropFilter from 'components/elements/BackdropFilter';
import SiteHeader from 'views/layout/SiteHeader';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';

const GamificationHeader = () => {
   return (
      <SiteHeader
         style={ { padding: '20px 32px' } }
         title='Gamification'
         right={ (
            <div className='gamificationHeader__btnWrapper'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSize.large }
                  text='Add Badge'
               />
            </div>
         ) }
      />
   );
};

storiesOf('App|Views/pages/promotions/Gamification/desktop', module)
   .addDecorator(withKnobs)
   .add('Empty state', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <GamificationHeader />
               <div className='design-course__content gamification__content'>
                  <div className='firstBadgeCardWrapper'>
                     <FirstBadgeCard />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('From default', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <GamificationHeader />
               <div className='design-course__content gamification__content'>
                  <div className='design-course__left gamification__left'>
                     <div className='m-r-exl'>
                        <ItemWrapper border>
                           <div style={ { padding: '16px 32px' } }>
                              <Text
                                 type={ textType.regular }
                                 size={ textSize.small }
                                 inner='Enter the name of badge on the right'
                                 bold={ true }
                                 color='#8a94a2'
                              />
                           </div>
                        </ItemWrapper>
                     </div>
                  </div>
                  <div className='gamification__right'>
                     <AddBadgeCard />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('From file', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <GamificationHeader />
               <div className='design-course__content gamification__content'>
                  <div className='design-course__left gamification__left'>
                     <div className='m-r-exl'>
                        <ItemWrapper border>
                           <div style={ { padding: '16px 32px' } }>
                              <Text
                                 type={ textType.regular }
                                 size={ textSize.small }
                                 inner='Enter the name of badge on the right'
                                 bold={ true }
                                 color='#8a94a2'
                              />
                           </div>
                        </ItemWrapper>
                     </div>
                  </div>
                  <div className='gamification__right'>
                     <AddBadgeCard checked={ 2 } />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Added a few badges', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <GamificationHeader />
               <div className='design-course__content gamification__content'>
                  <div className='design-course__left gamification__left'>
                     <div className='m-r-exl'>
                        <CongratsCard
                           title='Congrats completing'
                           content='Course Code Masterclass/Welcome to Cracking'
                           img={ badge }
                        />
                        <CongratsCard
                           title='Congrats completing'
                           content='Course Code Masterclass/Welcome to Cracking'
                           img={ groupSm }
                           active
                        />
                        <CongratsCard
                           title='Congrats completing'
                           content='Course Code Masterclass/Welcome to Cracking'
                           img={ badge }
                        />
                        <CongratsCard
                           title='Congrats completing'
                           content='Course Code Masterclass/Welcome to Cracking'
                           img={ badge }
                        />
                     </div>
                  </div>
                  <div className='gamification__right'>
                     <AddBadgeCard checked={ 2 } completed />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Pop Up - Preview', () => {
      return (
         <BackdropFilter active>
            <div className='container'>
               <SideBar />
               <div className='design-course'>
                  <GamificationHeader />
                  <div className='design-course__content gamification__content'>
                     <div className='design-course__left gamification__left'>
                        <div className='m-r-exl'>
                           <CongratsCard
                              title='Congrats completing'
                              content='Course Code Masterclass/Welcome to Cracking'
                              img={ badge }
                           />
                           <CongratsCard
                              title='Congrats completing'
                              content='Course Code Masterclass/Welcome to Cracking'
                              img={ groupSm }
                              active
                           />
                           <CongratsCard
                              title='Congrats completing'
                              content='Course Code Masterclass/Welcome to Cracking'
                              img={ badge }
                           />
                           <CongratsCard
                              title='Congrats completing'
                              content='Course Code Masterclass/Welcome to Cracking'
                              img={ badge }
                           />
                        </div>
                     </div>
                     <div className='gamification__right'>
                        <AddBadgeCard checked={ 2 } img={ group } completed />
                     </div>
                  </div>
               </div>
            </div>
            <div className='congratulationPopup'>
               <CongratulationsCard />
            </div>
         </BackdropFilter>
      );
   });
