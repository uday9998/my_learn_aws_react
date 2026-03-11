import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import defaulTImage from 'assets/images/community/defaultEvent.png';
import IconButton from 'components/elements/buttons/IconButton';
import DeleteModal from 'components/elements/DeleteModal';
import ModalNew from 'components/elements/ModalNew';
import Select from 'components/elements/SelectNew';


const CouponPlans = ({
   plans, onConnectPlan, couponName, onDisconnectPlan, offers,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenAttachModal, setIsOpenAttachModal] = useState(false);
   const [planInfo, setPlanInfo] = useState([]);

   const [selectedOffer, setSelectedOffer] = useState(null);

   return (
      <div className='coupon__edit__bottom__general__left'>
         <Text
            inner='Connected Plans'
            type={ types.mediumLarge }
            size={ sizes.small }
         />
         {isOpenDeleteModal && (
            <DeleteModal
               title={ `Are you sure you want to disconnect the [${ planInfo[0] }] plan from [${ couponName }] coupon?` }
               onDelete={ () => {
                  onDisconnectPlan(planInfo[1]);
                  setIsOpenDeleteModal(false);
               } }
               maxWidth={ 414 }
               deleteText='Disconect'
               onCancel={ () => setIsOpenDeleteModal(false) }
            />
         )}
         {isOpenAttachModal && (
            <ModalNew onCloseModal={ () => {
               setIsOpenAttachModal(false);
               setSelectedOffer(null);
            } }
            >
               <div className='coupon__edit__bottom__general__left__modal'>
                  <Text
                     inner='Connect Plan'
                     type={ types.mediumSmall }
                     size={ sizes.xxlarge }
                  />
                  <Select
                     options={ offers }
                     value={ selectedOffer }
                     onChange={ (name, value) => setSelectedOffer(value) }
                     label='Select a product'
                     placeholder='Select a product'
                     type='select-medium'
                  />
                  <div className='buttons'>
                     <Button
                        theme={ themes.secondary }
                        text='Cancel'
                        onClick={ () => {
                           setIsOpenAttachModal(false);
                           setSelectedOffer(null);
                        } }
                     />
                     <Button
                        text='Connect'
                        disabled={ !selectedOffer }
                        onClick={ () => {
                           onConnectPlan(selectedOffer, () => {
                              setIsOpenAttachModal(false);
                              setSelectedOffer(null);
                           });
                        } }
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         {plans.length === 0 ? (
            <div className='coupon__edit__bottom__general__left__empty'>
               <Text
                  inner='So far there are no plans in this coupon'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#444C4B' } }
               />
               <Button
                  text='Add Plan'
                  iconName='PlusPlanL'
                  isIconRight={ true }
                  theme={ themes.secondary }
                  onClick={ () => setIsOpenAttachModal(true) }
               />
            </div>
         ) : (
            <>
               {plans.map((e, index) => {
                  return (
                     <div
                     // eslint-disable-next-line react/no-array-index-key
                        key={ index }
                        className='coupon__edit__bottom__general__left__plan'
                     >
                        <div className='coupon__edit__bottom__general__left__plan__left'>
                           <img src={ e.file ? e.file.src : defaulTImage } alt='' />
                           <Text
                              inner={ e.name }
                              type={ types.mediumLarge }
                              size={ sizes.small }
                           />
                        </div>
                        <IconButton
                           name='DeleteMediaM'
                           onClick={ () => {
                              setIsOpenDeleteModal(true);
                              setPlanInfo([e.name, e.id]);
                           } }
                        />
                     </div>
                  );
               })}
               <Button
                  text='Add Plan'
                  iconName='PlusPlanL'
                  isIconRight={ true }
                  style={ { marginTop: '20px' } }
                  theme={ themes.secondary }
                  onClick={ () => setIsOpenAttachModal(true) }
               />
            </>
         )}
      </div>
   );
};

CouponPlans.propTypes = {
   onConnectPlan: PropTypes.func,
   plans: PropTypes.array,
   couponName: PropTypes.string,
   onDisconnectPlan: PropTypes.func,
   offers: PropTypes.array,
};

export default CouponPlans;
