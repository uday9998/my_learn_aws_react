import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Router from 'routes/router';
// import AvatarBlock from 'components/elements/mainHub/AvatarBlock';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import Icon from 'components/elements/Icon';
import { Popover } from '@material-ui/core';
import { getWindowSize } from 'utils/getWindowSize';
import { useSelector } from 'react-redux';
import { mainAppSelector } from 'state/modules/common/selectors';

const LogOut = ({
   handleLogout, children, goToMyAccount, setShowMenu, goTo, globalStatus,
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const mainApp = useSelector(mainAppSelector);
   const onClick = (e) => {
      setIsOpen(true);
      setAnchorEl(e.currentTarget);
   };
   const onClose = () => {
      setIsOpen(false);
   };
   const accountClick = () => {
      onClose();
      if (globalStatus) {
         goToMyAccount();
         setShowMenu(false);
      } else {
         goTo(Router.route('ADMIN_SUSPENDED').getCompiledPath({ suspended: mainApp?.pause_plan ? 'paused' : 'suspended' }));
      }
   };
   const { innerWidth } = getWindowSize();
   const isMobile = innerWidth < 1024;
   if (isMobile) {
      return (
         <div className='logout'>
            <div
               onClick={ (e) => {
                  e.stopPropagation();
                  accountClick(e);
               } }
               role='presentation'
            >
               {/* <AvatarBlock /> */}
               { children }
            </div>
            <div className='logout__link' role='presentation' onClick={ () => { handleLogout(); onClose(); } }>
               <Icon name='Logout' className='logoutIcon' />
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  inner='Logout'
               />
            </div>
         </div>
      );
   }
   return (
      <div className='logout'>
         <div
            onClick={ (e) => {
               e.stopPropagation();
               onClick(e);
            } }
            role='presentation'
         >
            {/* <AvatarBlock /> */}
            { children }
         </div>
         <Popover
            open={ isOpen }
            anchorEl={ anchorEl }
            onClose={ onClose }
            className='custom-popover'
            elevation={ 24 }
            anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'center',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'center',
            } }
         >
            <div className='logoutPopup'>
               {goToMyAccount && (
                  <div className='logoutPopup__account' role='presentation' onClick={ () => { accountClick(); } }>
                     <Icon name='AdminPopup' className='accountIcon' />
                     <Text
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                        inner='My Billing'
                     />
                  </div>
               )}
               <div role='presentation' onClick={ () => { handleLogout(); onClose(); } }>
                  <Icon name='Logout' className='logoutIcon' />
                  <Text
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                     inner='Logout'
                  />
               </div>
            </div>
         </Popover>
      </div>

   );
};

LogOut.propTypes = {
   handleLogout: PropTypes.func,
   children: PropTypes.any,
   goToMyAccount: PropTypes.func,
   setShowMenu: PropTypes.func,
   goTo: PropTypes.func,
   globalStatus: PropTypes.any,
};

LogOut.defaultProps = {
   handleLogout: () => {},
   setShowMenu: () => {},
};

export default LogOut;
