import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, {
   THEMES as btnTheme,
   SIZES as btnSizes,
} from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import moment from 'moment';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Text, {
   SIZES as textSizes,
   TYPES as textTypes,
} from 'components/elements/TextNew';
import Popover from '@material-ui/core/Popover';
import SliceAndConnectText from 'utils/getSplitedText';

export const getRole = role => {
   if (role === 0) {
      return 'Member';
   }
   if (role === 2) {
      return 'Administrator';
   }
   if (role === 3) {
      return 'Assistant';
   }
   return 'Support Specialist';
};

export const Admin = ({
   member,
   isChecked,
   onCheck,
   onMoreInfo,
   handleDeleteMember,
   handleSelect,
   onGrant,
   onNote,
   onPause,
   onTag,
   status,
}) => {
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);

   return (
      <div className='members__table__tr'>
         <div className='members__table__check'>
            <CheckBox onChange={ () => onCheck(member) } checked={ isChecked } />
         </div>
         <div className='members__table__th col-1'>
            <img src={ member.picture_full_src } alt='use' />
            <Text
               inner={ SliceAndConnectText(member.name, 15) }
               size={ textSizes.small }
               className='members__table__title'
               type={ textTypes.regularDefault }
               style={ { cursor: 'pointer' } }
               onClick={ () => handleSelect(member.id) }
            />
         </div>
         <div
            className={ `members__table__th members__table__status__${ status } col-2xm` }
            style={ { marginRight: '10px' } }
         >
            <div
               className={ `member__bottom__block__role member__bottom__block__role__${
                  member.role
               }` }
            >
               <Text
                  inner={ getRole(member.role).split(' ')[0] }
                  size={ textSizes.small14_500 }
                  type={ textTypes.regularDefault }
               />
            </div>
         </div>
         <div
            className={ `members__table__th members__table__status__${ status } col-2m` }
         >
            <Text
               inner={ status === 'Inactive' ? 'Offline' : 'Online' }
               size={ textSizes.small14_500 }
               type={ textTypes.regularDefault }
            />
         </div>
         <div className='members__table__th col-3'>
            <Text
               inner={ member.email }
               size={ textSizes.small }
               type={ textTypes.regularDefault }
            />
         </div>
         <div className='members__table__th col-2xm'>
            <Text
               inner={ moment(member.created_at).format('MMMM DD, YYYY') }
               size={ textSizes.small }
               type={ textTypes.regularDefault }
            />
         </div>
         <div className='members__table__th col-2xm'>
            <Text
               inner={
                  member.last_login_at
                     ? moment(member.last_login_at).format('MMMM DD, YYYY')
                     : '-'
               }
               size={ textSizes.small }
               type={ textTypes.regularDefault }
            />
         </div>
         <div className='members__table__end'>
            <BaseButton
               text='More Info'
               theme={ btnTheme.more }
               onClick={ () => onMoreInfo(member) }
               size={ btnSizes.small }
            />
            <div className='members__popup'>
               <div
                  role='presentation'
                  onClick={ e => {
                     setIsOpenTriangle(!isOpenTriangle);
                     setAnchorEl(e.currentTarget);
                  } }
                  className='members__table__triangle'
               >
                  <Icon name='Triangle' />
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
                           <Text
                              inner='Edit'
                              size={ textSizes.small }
                              type={ textTypes.regularDefault }
                           />
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
                           <Text
                              inner='Grant Access'
                              size={ textSizes.small }
                              type={ textTypes.regularDefault }
                           />
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
                           <Text
                              inner='Add Note'
                              size={ textSizes.small }
                              type={ textTypes.regularDefault }
                           />
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
                           <Text
                              inner='Add Tags'
                              size={ textSizes.small }
                              type={ textTypes.regularDefault }
                           />
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
                           <Text
                              inner='Pause'
                              size={ textSizes.small }
                              type={ textTypes.regularDefault }
                           />
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
                           <Text
                              inner='Delete'
                              size={ textSizes.small }
                              type={ textTypes.regularDefault }
                           />
                        </div>
                     </div>
                  </div>
               </Popover>
            </div>
         </div>
      </div>
   );
};

Admin.propTypes = {
   member: PropTypes.object,
   handleDeleteMember: PropTypes.func,
   onCheck: PropTypes.func,
   handleSelect: PropTypes.func,
   isChecked: PropTypes.any,
   onMoreInfo: PropTypes.func,
   onGrant: PropTypes.func,
   onNote: PropTypes.func,
   onTag: PropTypes.func,
   onPause: PropTypes.func,
   status: PropTypes.string,
};
