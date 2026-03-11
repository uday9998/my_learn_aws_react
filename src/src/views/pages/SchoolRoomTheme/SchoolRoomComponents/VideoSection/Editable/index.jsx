import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import './index.scss';


const VideoEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar,
      index, bgColor,
   } = props;


   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);


   return (
      <div className='videoEditable' data-slug={ slug }>
         <div>
            <ColorInput
               label='Background Color'
               name='bgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'component', index) }
               isPageBuilder={ true }
            />
         </div>
      </div>
   );
};

VideoEditable.defaultProps = {

};

VideoEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   bgColor: PropTypes.string,
};

export default VideoEditable;
