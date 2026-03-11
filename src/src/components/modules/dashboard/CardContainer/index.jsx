import React, { useState, useEffect } from 'react';
import './index.scss';
import Card from 'components/elements/dashboard/Card';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
// import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
// import TextInput from 'components/elements/form/TextInput';
import PropTypes from 'prop-types';
import Router from 'routes/router';
// import DashboardSearchPopup from './SearchPopup';

const CardContainer = ({
   creatNewCourse,
}) => {
   const [showPopup, setShowPopup] = useState(false);
   const [scrollTop] = useState(0);
   // const adminContent = document.querySelector('.adminContent');
   const body = document.querySelector('body');
   function closePopup(e) {
      const element = document.querySelector('.dashboard_search_content');
      if (!element || (element && !element.contains(e.target))) {
         setShowPopup(false);
         //  adminContent.style.overflow = 'auto';
         body.style.overflow = 'auto';
      }
   }
   useEffect(() => {
      document.addEventListener('click', closePopup);
      return () => {
         document.removeEventListener('click', closePopup);
      };
   });
   return (
      <>
         {
            showPopup && <div className='grey-bg' style={ { top: (310 - scrollTop) } } />
         }
         {/* <div className='dashboard_search_content'>
             <div className='dashboard_search_input'>
               <div className='dashboard_search'>
                  <TextInput
                     icon='Search'
                     placeholder='Need Help? Click Here'
                     onChange={ () => {} }
                     readOnlyInput
                     autocomplate={ false }
                     onFocus={ () => {
                        setShowPopup(true);
                        if (adminContent.scrollTop) {
                           setScrollTop(adminContent.scrollTop);
                        } else {
                           setScrollTop(body.scrollTop);
                        }

                        body.style.overflow = 'hidden';
                        adminContent.style.overflow = 'hidden';
                     } }
                     onBlur={ (e) => closePopup(e) }
                  />
                  {
                     showPopup && (
                        <DashboardSearchPopup
                           goToPages={ goToPages }
                           onClose={ () => {
                              setShowPopup(false);
                              adminContent.style.overflow = 'auto';
                              body.style.overflow = 'auto';
                           } }
                        />
                     )
                  }
               </div>
            </div>
            <div className='dashboard_search_button'>
               <BaseButton
                  theme={ btnTheme.lightBlue }
                  size={ btnSizes.large }
                  text='Search'
                  onClick={ () => {
                     adminContent.style.overflow = !showPopup ? 'hidden' : 'auto';
                     body.style.overflow = !showPopup ? 'hidden' : 'auto';
                     if (!showPopup) {
                        if (adminContent.scrollTop) {
                           setScrollTop(adminContent.scrollTop);
                        } else {
                           setScrollTop(body.scrollTop);
                        }
                     }
                     setShowPopup(!showPopup);
                  } }
               />
            </div>
         </div> */}
         <div className='cardContainerStarted'>
            <div>
               <Text
                  type={ textType.regular160 }
                  size={ textSize.xlarge }
                  inner='Getting Started'
               />
            </div>
            <div className='cardContainer'>
               <Card
                  icon='addPhotoM'
                  title='Add Photo'
                  text='Enhance your content by adding vibrant, eye-catching images that bring energy and visual appeal to your pages.'
                  buttonText='Add Photo'
                  style={ { marginLeft: '0' } }
                  buttonLink='/admin/settings#general'
                  iconName='PlusM'
               />
               <Card
                  icon='ProjectsM'
                  title='New Product'
                  text='Launch your project smoothly with ease in just five steps. Kick off by adding essential project information to get started.'
                  buttonText='Start New Product'
                  style={ { marginLeft: '0' } }
                  buttonLink={ Router.route('ADMIN_COURSES_CREATE').getCompiledPath() }
                  iconName='ArrowRightM'
               />
               <Card
                  icon='EditProjectM'
                  title='Edit Existing Product'
                  text='Quickly access and update your ongoing projects by heading to the project section.'
                  buttonText='Edit Existing Product'
                  buttonLink={ Router.route('ADMIN_COURSES').getCompiledPath() }
                  iconName='ArrowRightM'
               />
               <Card
                  icon='SchoolRoomM'
                  title='Portal'
                  text='This central space houses all your content materials, making them readily available and easy to access for your members.'
                  buttonText='View Portal'
                  buttonLink={ Router.route('ADMIN_SCHOOL_ROOM').getCompiledPath() }
                  iconName='ArrowRightM'
               />
               {/* <Card
                  icon='Tutorial'
                  title='Tutorials'
                  text='Learn and get answers to your questions directly from the Miestro Team in the Tutorials section.'
                  buttonText='View Tutorials'
                  buttonLink='https://support.miestro.com'
                  style={ { marginRight: '0' } }
               /> */}
            </div>
         </div>
      </>
   );
};

CardContainer.propTypes = {
   creatNewCourse: PropTypes.func,
};
export default CardContainer;
