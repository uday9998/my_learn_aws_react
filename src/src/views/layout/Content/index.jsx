import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Content = ({ children }) => {
   const [headerheight, setHeaderHeight] = useState('34px');
   const [visibility, setVisibility] = useState('hidden');


   useEffect(() => {
      const siteHeader = document.querySelector('#header') ? document.querySelector('#header').clientHeight : 0;
      const headerHeight = `${ siteHeader + 24 }px`;

      setHeaderHeight(headerHeight);
      setVisibility('visible');
   }, []);


   return (
      <div className='content' style={ { paddingTop: headerheight, visibility } }>
         {children}
      </div>
   );
};

Content.propTypes = {
   children: PropTypes.any,
};

export default Content;
