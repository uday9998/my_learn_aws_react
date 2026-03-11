import React, { useEffect, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../AdminHeader';


const AdminContent = ({ children }) => {
   const [headerheight, setHeaderHeight] = useState('91px');
   const [visibility, setVisibility] = useState('hidden');
   const { hash } = useLocation();

   useEffect(() => {
      const siteHeader = document.querySelector('#adminHeader') ? document.querySelector('#adminHeader').clientHeight : 0;
      const headerHeight = `${ siteHeader }px`;
      setHeaderHeight(headerHeight);
      setVisibility('visible');
   }, [children]);


   return (
      <div className='adminContent' style={ { height: `calc(100% - ${ headerheight })`, visibility } }>
         {children}
      </div>
   );
};

AdminContent.propTypes = {
   children: PropTypes.any,
};

AdminContent.Header = Header;

export default AdminContent;
