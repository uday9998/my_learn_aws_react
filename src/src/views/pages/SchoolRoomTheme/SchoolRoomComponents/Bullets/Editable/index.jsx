/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import PropTypes from 'prop-types';
import './index.scss';
import Select from 'components/elements/SelectNew';


const BulletsEditable = (props) => {
   const {
      slug, scroll, menuVisible, toggleSidebar, changeProp, index, paddingTop, paddingRight, paddingLeft, paddingBottom,
      justifyContent,
   } = props;
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);

   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];

   return (
      <div className='bulletsEditable' data-slug={ slug }>
         <div className='m-b-m'>
            <Select
               label='Align Content'
               className=''
               heading=''
               type='select-medium'
               placeholder='Align Content'
               value={ justifyContent || 'center' }
               onChange={ (name, value) => changeProp(value, 'justifyContent', 'component', index) }
               options={ textAlignFlexOptions }
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

BulletsEditable.defaultProps = {
   paddingTop: '0',
   paddingBottom: '0',
   paddingLeft: '0',
   paddingRight: '0',
   justifyContent: 'center',
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
   justifyContent: PropTypes.string,
};

export default BulletsEditable;
