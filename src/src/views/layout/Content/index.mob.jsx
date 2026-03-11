import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.mob.scss';

const Content = ({ children }) => {
   const [headerheight, setHeaderHeight] = useState('91px');
   const [visibility, setVisibility] = useState('hidden');


   useEffect(() => {
      const siteHeader = document.querySelector('#siteHeader') ? document.querySelector('#siteHeader').clientHeight : 0;
      const navPanel = document.querySelector('#navPanel') ? document.querySelector('#navPanel').clientHeight : 0;
      const headerHeight = `${ siteHeader + navPanel + 24 }px`;

      setHeaderHeight(headerHeight);
      setVisibility('visible');
   }, []);


   return (
      <div className='mob-content' style={ { paddingTop: headerheight, visibility } }>
         {children}
      </div>
   );
};

Content.propTypes = {
   children: PropTypes.any,
};

export default Content;
