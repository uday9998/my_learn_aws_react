/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Radio from 'components/elements/form/Radio';
import PropTypes from 'prop-types';
import './index.scss';
import CheckboxCircle from 'components/elements/CheckboxCircle';


const SliderEditable = (props) => {
   const {
      slug, scroll, menuVisible, toggleSidebar, changeProp, school_class_type, index,
   } = props;

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   return (
      <div className='sliderEditable' data-slug={ slug }>
         {/* <div className='m-t-m' style={ { display: 'flex', marginBottom: '20px' } }>
            <div style={ { marginRight: '48px' } }>
               <CheckboxCircle
                  isChecked={ school_class_type === 'image' }
                  label='1 offer'
                  onCheck={ () => changeProp('image', 'school_class_type', 'component', index) }
               />
            </div>
            <CheckboxCircle
               isChecked={ school_class_type === 'slider' }
               label='4 offer'
               onCheck={ () => changeProp('slider', 'school_class_type', 'component', index) }
            />
         </div> */}
      </div>
   );
};


SliderEditable.propTypes = {
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   slug: PropTypes.string,
   changeProp: PropTypes.func,
   school_class_type: PropTypes.string,
   index: PropTypes.number,
};

export default SliderEditable;
