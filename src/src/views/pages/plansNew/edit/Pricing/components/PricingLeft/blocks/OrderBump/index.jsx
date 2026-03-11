import React, { useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import PricingPopup from 'components/elements/PricingPopup';
import { createPortal } from 'react-dom';
import OrderBumpItem from './OrderBumpItem';

const PricingOrderBumps = ({
   data, goToOrderBump, deleteOrderBump, goToOrderBumpEdit,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState(false);

   const handleAddOrderBump = () => {
      if (!Array.isArray(permissions)) {
         if (permissions.order_bump) {
            goToOrderBump();
         } else {
            setPopupTitle('Order Bump');
            setShowPopup(true);
         }
      } else {
         goToOrderBump();
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='plan__pricing__left__bump'>
         {
            showPopup && createPortal(<PricingPopup
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle }
            />, document.body)
         }
         <div className='plan__pricing__left__bump__top'>
            <Text
               inner='Order Bump'
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner='Add more offers to your plan for additional purchases.'
               type={ types.regularDefault }
               style={ { color: '#444C4B' } }
               size={ sizes.small }
            />
         </div>
         <div className='plan__pricing__left__bump__bottom'>
            {data.length === 0 ? (
               <div className='plan__pricing__left__bump__bottom__empty'>
                  <Text
                     inner='So far, there are no additional purchases'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#444C4B' } }
                  />
                  <Button
                     text='Add Order Bump'
                     iconName='plusNew'
                     isIconRight={ true }
                     onClick={ () => handleAddOrderBump() }
                     theme={ themes.secondary }
                     iconColor='#24554E'
                  />
               </div>
            ) : (
               <div className='plan__pricing__left__bump__bottom__items'>
                  {data.map((e, index) => {
                     return (
                        <OrderBumpItem
                           item={ e }
                           onEdit={ goToOrderBumpEdit }
                           // eslint-disable-next-line react/no-array-index-key
                           key={ index }
                           onDelete={ deleteOrderBump }
                        />
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
};

PricingOrderBumps.propTypes = {
   data: PropTypes.array,
   goToOrderBump: PropTypes.func,
   goToOrderBumpEdit: PropTypes.func,
   deleteOrderBump: PropTypes.func,
};

export default PricingOrderBumps;
