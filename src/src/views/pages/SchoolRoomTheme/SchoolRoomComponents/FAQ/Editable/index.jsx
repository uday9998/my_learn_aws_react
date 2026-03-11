/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import './index.scss';


const QuestionanswerEditable = (props) => {
   const {
      slug, scroll, menuVisible, toggleSidebar,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);
   return (
      <div className='faqEditable' data-slug={ slug }>
         <div />
      </div>
   );
};


QuestionanswerEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   slug: PropTypes.string,
};

export default QuestionanswerEditable;
