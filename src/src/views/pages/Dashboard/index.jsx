import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCheckListData } from 'api';

import DashboardWelcome from 'components/modules/dashboard/DashboardWelcome';
import DashboardCourses from 'components/modules/dashboard/DashboardCourses';
import DashboardTraining from 'components/modules/dashboard/DashboardTraining';
import DashboardTutorials from 'components/modules/dashboard/DashboardTutorials';
import OnboardingCall from 'components/modules/dashboard/OnboardingCall';
import DashboardChecklist from 'components/modules/dashboard/DashboardChecklist';
import MembershipOnboardingCards from 'components/modules/dashboard/MembershipOnboardingCards/MembershipOnboardingCards'
import MiestroUniversityCard from 'components/modules/dashboard/MiestroUniversityCard/MiestroUniversityCard'

import './index.scss';


function Dashboard({
   reportsData, fetchGhostData, creatNewCourse, fetchStepsData, goToPages,
   authUser,
}) {
   const [checkListData, setCheckListData] = useState([]);
   const [setupComplete, setSetupComplete] = useState(false);

   let isLoading = !(!fetchGhostData && !fetchStepsData);
   if ((authUser.role !== 3 && authUser.role !== 4)) {
      isLoading = !(!reportsData.fetchData && !reportsData.fetchFilterData && !fetchGhostData && !fetchStepsData);
   }
   useEffect(() => {
      if (typeof window.Beacon === 'function') {
         window.Beacon('init', process.env.REACT_APP_HELPSCUOT_BEACON_ID);
      }
   }, []);
   useEffect(() => {
      return () => {
         if (typeof window.Beacon === 'function') {
            window.Beacon('destroy');
         }
      };
   }, []);

   useEffect(() => {
      const script = document.createElement('script');
      script.innerHTML = 'fbq(\'track\', \'TRIAL\');';
      document.head.appendChild(script);
      return () => {
         document.head.removeChild(script);
      };
   }, []);

   useEffect(() => {
      const getListData = async () => {
         const checkListDataResult = await getCheckListData();
         setCheckListData(checkListDataResult.data);
      };

      getListData();
   }, []);

   useEffect(() => {
      const checkSavedSetupState = () => {
         const savedCompletedSteps = localStorage.getItem('completedSteps');
         if (savedCompletedSteps) {
            try {
               const parsed = JSON.parse(savedCompletedSteps);
               const totalRequiredSteps = 4; // Total number of steps in the checklist
               const completedStepsCount = Object.values(parsed).filter(Boolean).length;
               
               if (completedStepsCount === totalRequiredSteps) {
                  setSetupComplete(true);
               }
            } catch (e) {
            }
         }
      };
      
      checkSavedSetupState();
   }, []);

   const handleSetupComplete = (isComplete) => {
      setSetupComplete(isComplete);
   };

   return (
      <div className='dashboard'>
         <div className='dashboard__content'>
            <div className='dashboard__content__left'>
               <div className='dashboard__content__left__center'>
                  <DashboardWelcome authUser={ authUser } />
                  <DashboardCourses />
                  <MembershipOnboardingCards />
                  {
                     !setupComplete && (
                        <DashboardChecklist 
                           checkListData={ checkListData }
                           changeCheckListData={ () => {} }
                           onSetupComplete={ handleSetupComplete }
                        />
                     )
                  }
                  <MiestroUniversityCard />
                  
               </div>
            </div>
         </div>
      </div>
   );
}

Dashboard.propTypes = {
   reportsData: PropTypes.object,
   fetchGhostData: PropTypes.bool,
   creatNewCourse: PropTypes.func,
   goToPages: PropTypes.func,
   fetchStepsData: PropTypes.bool,
   authUser: PropTypes.object,
};

export default Dashboard;