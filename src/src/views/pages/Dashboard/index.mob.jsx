import React from 'react';
import './index.mob.scss';
import DashboardWelcome from 'components/modules/dashboard/DashboardWelcome/index.mob';
import CardContainer from 'components/modules/dashboard/CardContainer';
import GetStarted from 'components/modules/dashboard/GetStarted/index.mob';
import CourseReport from 'components/modules/dashboard/CourseReport';
import UpdatesCardsContainer from 'components/modules/dashboard/UpdatesCardsContainer';

function Dashboard() {
   return (
      <div className='mob-dashboard'>
         <DashboardWelcome />
         <CardContainer />
         <GetStarted />
         <CourseReport />
         <UpdatesCardsContainer />
      </div>
   );
}

export default Dashboard;
