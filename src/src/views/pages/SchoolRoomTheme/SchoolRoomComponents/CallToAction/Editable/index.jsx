/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import Spacing from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Spacing';
import ColorInput from 'components/elements/form/ColorInput';
import './index.scss';


const QuestionanswerEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar,
      index, paddingTop, paddingRight, paddingLeft, paddingBottom, bgColor,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);
   return (
      <div className='calToActionEditable' data-slug={ slug }>
         <div>
            <ColorInput
               label='Background Color'
               name='bgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'component', index) }
               isPageBuilder={ true }
            />
         </div>
         <Spacing
            top={ paddingTop }
            bottom={ paddingBottom }
            left={ paddingLeft }
            right={ paddingRight }
            changeProp={ changeProp }
            index={ index }
            slug={ slug }
         />
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
   bgColor: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,

};

export default QuestionanswerEditable;
