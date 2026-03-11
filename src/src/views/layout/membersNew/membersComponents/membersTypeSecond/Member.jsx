import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/elements/form/CheckBoxNew';
import './index.scss';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import { getProperlyPlanNameMember } from 'utils/Plans';
import Popover from '@material-ui/core/Popover';
import IconNew from 'components/elements/iconsSize';

export const getRole = (role) => {
   if (role === 0) {
      return 'Member';
   } if (role === 2) {
      return 'Administrator';
   } if (role === 3) {
      return 'Assistant';
   } if (role === 4) {
      return 'Support Specialist';
   }
   return 'Support Specialist';
};

const Member = ({
   member, isChecked, onCheck, onMoreInfo, handleDeleteMember, handleSelect, onGrant, onNote, onPause,
   onTag, isMobile, status,
}) => {
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);

   return (
      <div className='column__member'>
         {
            isMobile && (
               <CheckBox
                  onChange={ () => onCheck(member) }
                  checked={ isChecked }
               />
            )
         }
         <div className='column__member__info'>
            <div className='member__top'>
               <div className='member__top__left'>
                  <div className='member__top__left__user'>
                     {
                        !isMobile && (
                           <CheckBox
                              onChange={ () => onCheck(member) }
                              checked={ isChecked }
                           />
                        )
                     }
                     <img src={ member.picture_full_src } alt='use' />
                  </div>
                  <div className='flex-row'>
                     <div className='flex-row-top'>
                        <Text
                           inner={ member.name }
                           size={ textSizes.medium }
                           style={ { textDecoration: 'underline', cursor: 'pointer' } }
                           type={ textTypes.mediumLarge }
                           onClick={ () => handleSelect(member.id) }
                        />
                        <div className={ `member__top__status member__top__status__${ status }` }>
                           <Text
                              inner={ status === 'Inactive' ? 'Offline' : 'Online' }
                              size={ textSizes.small14_500 }
                              type={ textTypes.regularDefault }
                           />
                        </div>
                     </div>
                     <div>
                        <Text
                           inner={ member.email }
                           style={ { color: '#727978' } }
                           size={ textSizes.medium }
                           type={ textTypes.regular148 }
                        />
                     </div>
                  </div>
               </div>
               <div className='member__delete role__member'>

                  {
                     isMobile && (
                        <div className={ `member__bottom__block__role member__bottom__block__role__${ member.role }` }>
                           <Text
                              inner={ getRole(member.role) }
                              size={ textSizes.small14 }
                              type={ textTypes.regularDefault }
                           />
                        </div>
                     )
                  }

                  <div className='member_options_mobile'>
                     {
                        isMobile && (
                           <div
                              className='member__top__icon'
                              role='presentation'
                              onClick={ () => onMoreInfo(member) }
                           >
                              <IconNew name='MainPLanM' />
                           </div>
                        )
                     }
                     <div
                        className='member__top__icon'
                        role='presentation'
                        onClick={ (e) => {
                           setIsOpenTriangle(true);
                           setAnchorEl(e.currentTarget);
                        } }
                        style={ { transform: isMobile ? 'rotate(90deg)' : '' } }
                     >
                        <Icon name='Triangle' />
                     </div>
                  </div>
                  <Popover
                     open={ isOpenTriangle }
                     anchorEl={ anchorEl }
                     onClose={ () => setIsOpenTriangle(false) }
                     className='custom-popover'
                     elevation={ 24 }
                     anchorOrigin={ {
                        vertical: 'bottom',
                        horizontal: 'right',
                     } }
                     transformOrigin={ {
                        vertical: 'top',
                        horizontal: 'right',
                     } }
                  >
                     <div className='showPopup__content__popover'>
                        <div className='showPopup__content__flex'>
                           <div
                              className='popup__item'
                              role='presentation'
                              onClick={ () => {
                                 setIsOpenTriangle(false);
                                 handleSelect(member.id);
                              } }
                           >
                              <Icon name='PopupEdit' />
                              <Text inner='Edit' size={ textSizes.small } type={ textTypes.regularDefault } />
                           </div>
                           <div
                              className='popup__item'
                              role='presentation'
                              onClick={ () => {
                                 setIsOpenTriangle(false);
                                 onGrant();
                              } }
                           >
                              <Icon name='PopupGrant' />
                              <Text inner='Grant Access' size={ textSizes.small } type={ textTypes.regularDefault } />
                           </div>
                           <div
                              className='popup__item'
                              role='presentation'
                              onClick={ () => {
                                 setIsOpenTriangle(false);
                                 onNote();
                              } }
                           >
                              <Icon name='PopupNoteMini' />
                              <Text inner='Add Note' size={ textSizes.small } type={ textTypes.regularDefault } />
                           </div>
                           <div
                              className='popup__item'
                              role='presentation'
                              onClick={ () => {
                                 setIsOpenTriangle(false);
                                 onTag();
                              } }
                           >
                              <Icon name='PopupTag' />
                              <Text inner='Add Tags' size={ textSizes.small } type={ textTypes.regularDefault } />
                           </div>
                           <div
                              className='popup__item'
                              role='presentation'
                              onClick={ () => {
                                 setIsOpenTriangle(false);
                                 onPause();
                              } }
                           >
                              <Icon name='PopupPause' />
                              <Text inner='Pause' size={ textSizes.small } type={ textTypes.regularDefault } />
                           </div>
                           <div
                              className='popup__delete'
                              role='presentation'
                              onClick={ () => {
                                 setIsOpenTriangle(false);
                                 handleDeleteMember(member.id, member.name);
                              } }
                           >
                              <Icon name='TrashMember' />
                              <Text inner='Delete' size={ textSizes.small } type={ textTypes.regularDefault } />
                           </div>
                        </div>
                     </div>
                  </Popover>
               </div>
            </div>
            <div className='member__bottom__flex'>
               <div className='member__bottom'>
                  {/* <div className='member__bottom__block'>
                     <Text
                        inner='Subscription Level'
                        style={ { color: '#727978' } }
                        size={ textSizes.xsmall }
                        type={ textTypes.regular148 }
                     />
                     <div className='member__bottom__block__level'>
                        <Text
                           inner={ getProperlyPlanNameMember(member.plan_name) }
                           style={ { color: '#A61C23' } }
                           size={ textSizes.small }
                           type={ textTypes.regular148 }
                        />
                     </div>
                  </div> */}
                  {
                     !isMobile && (
                        <div className='member__bottom__block'>
                           <Text
                              inner='Roles'
                              style={ { color: '#727978' } }
                              size={ textSizes.small14 }
                              type={ textTypes.regular148 }
                           />
                           <div className={ `member__bottom__block__role member__bottom__block__role__${ member.role }` }>
                              <Text
                                 inner={ getRole(member.role) }
                                 size={ textSizes.small14_500 }
                                 type={ textTypes.regularDefault }
                              />
                           </div>
                        </div>
                     )
                  }
                  <div className='member__bottom__block'>
                     <Text
                        inner='Purchases'
                        style={ { color: '#727978' } }
                        size={ textSizes.small14 }
                        type={ textTypes.regular148 }
                     />
                     <div className='member__bottom__block__text'>
                        <Text
                           inner={ member.payments_count }
                           size={ textSizes.medium }
                           type={ textTypes.mediumSmall }
                        />
                     </div>
                  </div>
                  <div className='member__bottom__block'>
                     <Text
                        inner='Revenue'
                        style={ { color: '#727978' } }
                        size={ textSizes.small14 }
                        type={ textTypes.regular148 }
                     />
                     <div className='member__bottom__block__text'>
                        <Text
                           inner={ member.payments_sum_amount ? `$${ member.payments_sum_amount }` : '-' }
                           size={ textSizes.medium }
                           type={ textTypes.mediumSmall }
                        />
                     </div>
                  </div>
                  <div className='member__bottom__block'>
                     <Text
                        inner='Last Transaction'
                        style={ { color: '#727978' } }
                        size={ textSizes.small14 }
                        type={ textTypes.regular148 }
                     />
                     <div className='member__bottom__block__text'>
                        <Text
                           inner={ member.latest_payments ? `$${ member.latest_payments.amount }` : '-' }
                           size={ textSizes.medium }
                           type={ textTypes.mediumSmall }
                        />
                     </div>
                  </div>
               </div>
               {
                  !isMobile && (
                     <BaseButton
                        text='More Info'
                        onClick={ () => onMoreInfo(member) }
                        theme={ btnTheme.more }
                        size={ btnSizes.small }
                     />
                  )
               }
            </div>
         </div>
      </div>
   );
};

Member.propTypes = {
   member: PropTypes.object,
   onCheck: PropTypes.func,
   handleDeleteMember: PropTypes.func,
   handleSelect: PropTypes.func,
   isChecked: PropTypes.any,
   onGrant: PropTypes.func,
   onNote: PropTypes.func,
   onTag: PropTypes.func,
   onPause: PropTypes.func,
   onMoreInfo: PropTypes.func,
   isMobile: PropTypes.bool,
   status: PropTypes.string,
};

export default Member;
