import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';
import LeftBar from './LeftBar';

const Layout = ({ children }) => {
   const childrenArray = React.Children.map(children, (child) => {
      return React.cloneElement(child, {});
   });

   return (
      <div className='layout'>
         {childrenArray}
      </div>
   );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.LeftBar = LeftBar;

Layout.propTypes = {
   children: PropTypes.any,
};

export default Layout;
