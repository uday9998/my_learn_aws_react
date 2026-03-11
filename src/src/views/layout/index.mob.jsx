import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import Header from './Header/index.mob';
import Content from './Content/index.mob';

const Layout = ({ children }) => {
   const childrenArray = React.Children.map(children, (child) => {
      return React.cloneElement(child, {});
   });

   return (
      <div className='mob-layout'>
         {childrenArray}
      </div>
   );
};

Layout.Header = Header;
Layout.Content = Content;

Layout.propTypes = {
   children: PropTypes.any,
};

export default Layout;
