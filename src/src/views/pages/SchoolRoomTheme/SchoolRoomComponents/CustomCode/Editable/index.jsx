/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import DragAndDropUploadImage from 'components/modules/dragAndDropUploadImage';
import Select from 'components/elements/form/Select';
import TextInputRange from 'components/elements/form/TextInputRange';
import Switch from 'components/elements/form/Switch';
import './index.scss';


const QuestionanswerEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, visibility,
      index, picture_src, width, spacing, borderRadius, justifyContent, isClassPic, course,
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
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   picture_src: PropTypes.string,
   width: PropTypes.string,
   spacing: PropTypes.string,
   borderRadius: PropTypes.string,
   justifyContent: PropTypes.string,
   visibility: PropTypes.bool,
   isClassPic: PropTypes.bool,
   course: PropTypes.object,
};

export default QuestionanswerEditable;
