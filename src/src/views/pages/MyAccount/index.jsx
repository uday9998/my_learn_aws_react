import { MyAccountContext } from 'containers/pages/member/account';
import React from 'react';
import './index.scss';
import MyAccountNavigation from './MyAccountNavigation';
import MyAccountCertificates from './Pages/Certificates';
import MyCommuntities from './Pages/Communities';
import MyCourses from './Pages/MyCourses';
import MyAccountSettings from './Pages/Settings';
import MyAccountComments from './Pages/Comments';
import MyAccountNotesPage from './Pages/Notes';
import MyAccountSavedCourses from './Pages/SavedCourses';
import Tags from './Pages/Tags';

const MyAccountPage = () => {
   const { tab } = React.useContext(MyAccountContext);
   const pageByTab = () => {
      switch (tab) {
         case 'my-portal':
            return <MyCourses />;
         case 'communities':
            return <MyCommuntities />;
         case 'tags':
            return <Tags />;
         case 'certificates':
            return <MyAccountCertificates />;
         case 'settings':
            return <MyAccountSettings />;
         case 'comments':
            return <MyAccountComments />;
         case 'notes':
            return <MyAccountNotesPage />;
         case 'saved':
            return <MyAccountSavedCourses />;
         default:
            return <MyAccountCertificates />;
      }
   };
   return (
      <div className='my__account__content'>
         <MyAccountNavigation />
         <div className='my__account__content__bottom'>
            {pageByTab()}
         </div>
      </div>
   );
};

MyAccountPage.propTypes = {

};

export default MyAccountPage;
