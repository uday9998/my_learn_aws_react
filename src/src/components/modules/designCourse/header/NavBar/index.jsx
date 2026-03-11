import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import NavItem from 'components/elements/designCourse/NavItem';

const NavBar = ({ TabConsumer }) => {
   const { activeTab, switchTab } = TabConsumer;

   return (
      <nav className='nav'>
         <div className='nav__items'>
            <NavItem
               text='Class Materials'
               active={ activeTab === 'course-material' }
               tabId='course-material'
               switchTab={ switchTab }
            />
            <NavItem
               text='Settings'
               active={ activeTab === 'settings' }
               tabId='settings'
               switchTab={ switchTab }
            />
            <NavItem
               text='Plan'
               active={ activeTab === 'plan' }
               tabId='plan'
               switchTab={ switchTab }
            />
            {/* <NavItem
               text='Page Builder'
               active={ activeTab === 'page-builder' }
               tabId='page-builder'
               switchTab={ switchTab }
               // switchTab={ () => window.location.href = `/landing?mode=admin&courseId=${ courseId }&token=${ localStorage.authToken }` }
            /> */}
            {/* <NavItem
               text='Sign up Page'
               active={ activeTab === 'sign-up' }
               tabId='sign-up'
               switchTab={ switchTab }
            /> */}
            <NavItem
               text='Checkout'
               active={ activeTab === 'checkout' || activeTab === '#checkout/template' || activeTab === '#checkout/template1' || activeTab === '#checkout/template2' || activeTab === '#checkout/template3' }
               tabId={ 'checkout' || '#checkout/template' || '#checkout/template1' || '#checkout/template2' || '#checkout/template3' }
               switchTab={ switchTab }
            />
            <NavItem
               text='Live'
               active={ activeTab === 'live' }
               tabId='live'
               switchTab={ switchTab }
            />
         </div>
      </nav>
   );
};

NavBar.propTypes = {
   TabConsumer: PropTypes.any,
};

export default NavBar;
