/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import './index.scss';
import Switch from 'components/elements/switchNew';


const QuestionAnswerEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar, visibility, subIndex,
      index,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);

   return (
      <div className='questionsEditable' data-slug={ slug }>
         <div style={ { marginBottom: '12px' } }>
            <Switch
               label='Show Question'
               value={ visibility === true }
               name='visibility'
               size='medium'
               positionText='left'
               onChange={ (value) => changeProp(value, 'visibility', 'subcomponent', index, subIndex) }
            />
         </div>
      </div>
   );
};


QuestionAnswerEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   visibility: PropTypes.bool,
   subIndex: PropTypes.number,
};

export default QuestionAnswerEditable;
