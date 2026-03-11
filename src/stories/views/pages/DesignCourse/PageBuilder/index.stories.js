import React from 'react';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import CourseHeader from 'views/layout/designCourse/CourseHeader';
import BuilderCard from 'components/modules/designCourse/pageBuilder/BuilderCard';
import { images } from './propOptions';
import 'index.scss';

storiesOf('App|Views/pages/designCourse/PageBuilder/desktop', module)
   .addDecorator(withKnobs)
   .add('Page Builder', () => {
      return (
         <div className='mainContainer'>
            <SideBar />
            <div className='rightSide'>
               <CourseHeader />
               <div className='builderCards-container'>
                  { images.map((image, index) => {
                     return (
                        <div
                           className='builderCardWrapper' // eslint-disable-next-line react/no-array-index-key
                           key={ index }
                        >
                           <BuilderCard
                              imgSrc={ image }
                              focused={ index === 0 }
                           />
                        </div>
                     );
                  }) }
               </div>
            </div>
         </div>
      );
   });
