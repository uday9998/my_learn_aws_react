import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { checkCustomizeBranding } from 'api';
import Icon from '../Icon';
import CheckListLeftComp from './components/CheckListLeftComp';

import './index.scss';

const CheckListColumn = ({
   rightIcon, leftCompIconName, text, verified, Component, handleInputChange, uploadedImage,
}) => {
   const [openCheckList, setOpenCheckList] = useState(false);
   const history = useHistory();

   const handleChangeCheckList = () => {
      if (!verified) {
         setOpenCheckList(prevState => !prevState);
      }
   };

   const handleNavigateToPortal = async () => {
      if (text.includes('Customize') && !verified) {
         const result = await checkCustomizeBranding({
            value: 1,
         });
         history.push('admin/portal');
      } else if (!openCheckList) {
         handleChangeCheckList();
      }
   };

   const handleCloseCheckList = () => {
      setOpenCheckList(false);
   };

   return (
      <div className='column__checklist__wrapper' onClick={ handleNavigateToPortal } role='presentation'>
         <div className='icons__wrapper'>
            <div>
               <CheckListLeftComp
                  verifiedIconName={ leftCompIconName }
                  inner={ text }
                  verified={ uploadedImage ? !!uploadedImage : verified }
                  notVerifiedIconName={ leftCompIconName }
               />
            </div>
            <div
               style={ {
                  cursor: verified ? 'default' : 'pointer',
               } }
               onClick={ handleCloseCheckList }
               role='presentation'
               className={ openCheckList ? 'icon active' : 'icon' }>
               <Icon name={ rightIcon } />
            </div>
         </div>
         <div className='checklist__inner__element'>
            {
               openCheckList && Component && (
                  <Component
                     handleInputChange={ handleInputChange }
                     uploadedImage={ uploadedImage }
                  />
               )
            }
         </div>
      </div>
   );
};

CheckListColumn.propTypes = {
   leftCompIconName: PropTypes.string,
   rightIcon: PropTypes.string,
   text: PropTypes.string,
   verified: PropTypes.bool,
   Component: PropTypes.any,
   handleInputChange: PropTypes.func,
   uploadedImage: PropTypes.string,
};

export default CheckListColumn;
