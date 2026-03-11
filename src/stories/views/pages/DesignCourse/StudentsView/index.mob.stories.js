import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import StudentsView from 'views/pages/DesignCourse/StudentsView/index.mob';
import Layout from 'views/layout/index.mob';
import Header from 'views/layout/BlueHeader/index.mob';
import BackdropFilter from 'components/elements/BackdropFilter';
import CouponCard from 'components/modules/designCourse/studentsView/CouponCard';


storiesOf('App|Views/pages/designCourse/StudentsView/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Students View', () => {
      return (
         <Layout>
            <Layout.Header>
               <Header rightText='Complete Purchase' />
            </Layout.Header>
            <Layout.Content>
               <StudentsView />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Course Path model', () => {
      return (
         <BackdropFilter active fixed>
            <Layout>
               <Layout.Header>
                  <Header rightText='Complete Purchase' />
               </Layout.Header>
               <Layout.Content>
                  <StudentsView />
               </Layout.Content>
            </Layout>
            <div style={ { width: '350px', marginTop: '64px' } }>
               <CouponCard />
            </div>
         </BackdropFilter>
      );
   })
   .add('Added Coupon', () => {
      return (
         <Layout>
            <Layout.Header>
               <Header rightText='Complete Purchase' />
            </Layout.Header>
            <Layout.Content>
               <StudentsView coupon='MMDC2019' />
            </Layout.Content>
         </Layout>
      );
   });
