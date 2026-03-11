/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import ColorInput from 'components/elements/form/ColorInput';
import './index.scss';


const PricingsEditable = (props) => {
   const {
      slug, changeProp, scroll, menuVisible, toggleSidebar,
      index, bgColor, notChosenBgColor,
   } = props;
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   return (
      <div className='textEditable' data-slug={ slug }>
         <div>
            <ColorInput
               label='Chosen Price'
               name='bgColor'
               value={ bgColor }
               onChange={ (key, value) => changeProp(value, 'bgColor', 'component', index) }
               isPageBuilder={ true }
            />
         </div>
         <div>
            <ColorInput
               label='Not Chosen Price'
               name='notChosenBgColor'
               value={ notChosenBgColor }
               onChange={ (key, value) => changeProp(value, 'notChosenBgColor', 'component', index) }
               isPageBuilder={ true }
            />
         </div>
      </div>
   );
};


PricingsEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   slug: PropTypes.string,
   index: PropTypes.number,
   bgColor: PropTypes.string,
   notChosenBgColor: PropTypes.string,
};

export default PricingsEditable;
