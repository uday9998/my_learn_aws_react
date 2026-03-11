import React from 'react';
import './index.mob.scss';
import NavItem from 'components/elements/designCourse/NavItem';

const NavPanel = () => {
   return (
      <nav className='mob-nav' id='navPanel'>
         <div className='mob-nav__items'>
            <NavItem text='Class Materials' />
            <NavItem text='Settings' />
            <NavItem text='Plan' />
            <NavItem text='Page Builder' />
            <NavItem text='Sign up Page' />
            <NavItem text='Live' />
         </div>
      </nav>
   );
};


export default NavPanel;
