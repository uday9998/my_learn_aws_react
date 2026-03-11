/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import PropTypes from 'prop-types';
import './index.scss';


const BulletsEditable = (props) => {
   const {
      slug, scroll, menuVisible, toggleSidebar, changeProp, index, paddingTop, paddingRight, paddingLeft, paddingBottom,
   } = props;
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);
   return (
      <div className='bulletsEditable' data-slug={ slug }>
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

BulletsEditable.defaultProps = {
   paddingTop: '0',
   paddingBottom: '0',
   paddingLeft: '0',
   paddingRight: '0',
};

BulletsEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   slug: PropTypes.string,
   changeProp: PropTypes.func,
   index: PropTypes.number,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
};

export default BulletsEditable;
