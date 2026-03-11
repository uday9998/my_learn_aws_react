import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/elements/form/CheckBoxNew';
import './index.scss';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
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

const Admin = ({
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
               <div className='member__delete'>
                  <div className={ `member__bottom__block__role member__bottom__block__role__${ member.role }` }>
                     <Text
                        inner={ getRole(member.role) }
                        size={ textSizes.small14_500 }
                        type={ textTypes.regularDefault }
                     />
                  </div>
                  <div className={ `member__top__status member__top__status__${ status }` }>
                     <Text
                        inner={ status === 'Inactive' ? 'Offline' : 'Online' }
                        size={ textSizes.small14_500 }
                        type={ textTypes.regularDefault }
                     />
                  </div>
                  {
                     !isMobile ? (
                        <>
                           <div className='divider' />
                           <BaseButton
                              text='More Info'
                              onClick={ () => onMoreInfo(member) }
                              theme={ btnTheme.more }
                              size={ btnSizes.small }
                           />
                           <div
                              className='member__top__icon'
                              role='presentation'
                              onClick={ (e) => {
                                 setIsOpenTriangle(true);
                                 setAnchorEl(e.currentTarget);
                              } }
                           >
                              <Icon name='Triangle' />
                           </div>
                        </>
                     ) : (
                        <div className='member_options_mobile'>
                           <div
                              className='member__top__icon'
                              role='presentation'
                              onClick={ () => onMoreInfo(member) }
                           >
                              <IconNew name='MainPLanM' />
                           </div>
                           <div
                              className='member__top__icon'
                              role='presentation'
                              onClick={ (e) => {
                                 setIsOpenTriangle(true);
                                 setAnchorEl(e.currentTarget);
                              } }
                              style={ { transform: 'rotate(90deg)' } }
                           >
                              <Icon name='Triangle' />
                           </div>
                        </div>
                     )
                  }
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
         </div>
      </div>
   );
};

Admin.propTypes = {
   member: PropTypes.object,
   onCheck: PropTypes.func,
   handleDeleteMember: PropTypes.func,
   handleSelect: PropTypes.func,
   isChecked: PropTypes.any,
   onMoreInfo: PropTypes.func,
   onGrant: PropTypes.func,
   onNote: PropTypes.func,
   onTag: PropTypes.func,
   onPause: PropTypes.func,
   isMobile: PropTypes.bool,
   status: PropTypes.string,
};

export default Admin;
