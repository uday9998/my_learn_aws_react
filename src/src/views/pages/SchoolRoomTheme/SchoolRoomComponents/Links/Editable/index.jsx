/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import './index.scss';


const LinksEditable = (props) => {
   const {
      slug, scroll, menuVisible, toggleSidebar,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);


   return (
      <div className='LinksEditable' data-slug={ slug } />
   );
};


LinksEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   slug: PropTypes.string,
};

export default LinksEditable;
