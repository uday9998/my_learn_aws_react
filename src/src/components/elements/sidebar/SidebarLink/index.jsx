import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import classNames from 'classnames';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import Router from 'routes/router';
import { getWindowSize } from 'utils/getWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { changePortalThemesState } from 'state/modules/schoolRoom/actions';
import ReactTooltip from 'react-tooltip';
import { mainAppSelector } from 'state/modules/common/selectors';

const SidebarLink = ({
   style, icon, title, user, userImage, active, to, onClick,
   subMenu, blank, isPageBuilder, className, id, goTo, globalStatus, isBeta,
   isPortal,
}) => {
   const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
   const [isMembership, setIsMembership] = useState('');
   const dispatch = useDispatch();
   const mainApp = useSelector(mainAppSelector);
   const sidebarClick = (title) => {
      if (title?.includes('Updates')) {
         const iframe = document.getElementById('loopedin-sidebar-iframe');
         const pranetX = iframe?.contentDocument?.body.querySelector('.parent-x');
         const parentElement = document.getElementById('loopedin-sidebar');

         pranetX.onclick = () => {
            parentElement.className = '';
         };  
      }
      
      if (globalStatus) {
         onClick();
      } else {
         goTo(Router.route('ADMIN_SUSPENDED').getCompiledPath({ suspended: mainApp?.pause_plan ? 'paused' : 'suspended' }));
      }
   };
   const { innerWidth } = getWindowSize();

   const toggleActiveMenu = () => {
      setIsOpenSubMenu(prevState => !prevState);
   };

   const handleOpenPortalMenu = (e, type) => {
      e.stopPropagation();
      dispatch(changePortalThemesState(type === 'membership'));
      setIsMembership(type === 'membership');
      sidebarClick();
   };

   return (
      <li
         className={ `sidebarLink ${ className }` }
         style={ style }
         id={ id }
      >
         {
            isPortal ? (
               <div
                  className={ classNames(
                     'sidebarLink__content sidebar__link__wrapper', {
                        'sidebarLink__subMenu': subMenu,
                        'not__hover': isOpenSubMenu,
                     }) }
                  onClick={ toggleActiveMenu }
                  role='presentation'
                  style={ {
                     padding: title === 'Portal Themes' && isOpenSubMenu ? 0 : '8px 16px 8px 48px',
                  } }
               >
                  <Text
                     size={ innerWidth < 1024 ? txtSizes.small : txtSizes.medium }
                     type={ innerWidth < 1024 ? txtType.regularDefault : txtType.mediumTitle }
                     inner={ title }
                     className={ `${ isPageBuilder ? 'small_sidebarLink_text' : '' } ` }
                     style={ {
                        color: isOpenSubMenu ? '#36796F' : '#444C4B',
                        marginLeft: title === 'Portal Themes' && isOpenSubMenu ? '48px' : 0,
                        paddingTop: title === 'Portal Themes' && isOpenSubMenu ? '8px' : 0,
                     } }
                  />
                  <div className={ classNames('sub__menu__wrapper', {
                     'active__menu': isOpenSubMenu,
                  }) }>
                     <div
                        // data-tip='Video Membership'
                        // data-for='VideoMembership'
                        role='presentation'
                        onClick={ (e) => handleOpenPortalMenu(e, 'membership') }
                        className='icon__text__wrapper__portal__menu'>
                        <Text
                           size={ txtSizes.small14_500 }
                           inner='Membership'
                           className={ `${ isPageBuilder ? 'small_sidebarLink_text' : 'asd' } ` }
                           id={ isMembership && typeof isMembership === 'boolean' ? 'membership__text' : '' }
                        />
                        {/* <ReactTooltip
                           backgroundColor='#fff'
                           textColor='#000'
                           id='VideoMembership'
                           place='bottom'
                           effect='solid'
                           borderColor='#e7e9e9'
                           border
                           padding='8px 9px'
                        /> */}
                     </div>
                     <div role='presentation' onClick={ (e) => handleOpenPortalMenu(e, 'course') } className='icon__text__wrapper__portal__menu'>
                        <Text
                           size={ txtSizes.small14_500 }
                           inner='Course'
                           className={ `${ isPageBuilder ? 'small_sidebarLink_text' : '' } ` }
                           id={ !isMembership && typeof isMembership === 'boolean' ? 'course__text' : '' }
                        />
                     </div>
                  </div>
               </div>
            ) : (
               <a
                  className={
                     classNames(
                        'sidebarLink__content',
                        {
                           'sidebarLink__active': active,
                           'sidebarLink__subMenu': subMenu,
                           'small_sidebarLink__content': isPageBuilder,
                           'sidebarLink_w_icon': !icon && active,
                        }
                     ) }
                  href={ to }
                  onClick={ onClick ? (e) => { e.preventDefault(); sidebarClick(title); } : null }
                  target={ blank ? '_blank' : '_self' }
                  rel='noreferrer'
               >
                  {
                     user ? <img src={ userImage } alt='' className='sidebarLink__user-image' />
                        : (icon && <Icon name={ icon } className='sidebarLink__svg' />)
                  }
                  <Text
                     size={ innerWidth < 1024 ? txtSizes.small : txtSizes.medium }
                     type={ innerWidth < 1024 ? txtType.regularDefault : txtType.mediumTitle }
                     inner={ title }
                     className={ `${ isPageBuilder ? 'small_sidebarLink_text' : '' } ` }
                     style={ {
                        color: '#444C4B',
                     } }
                  />
                  {isBeta && (
                     <Text
                        size={ txtSizes.small }
                        type={ txtType.regular }
                        inner='Beta'
                        className={ `${ isPageBuilder ? 'small_sidebarLink_text beta' : 'beta' }` }
                     />
                  )}
               </a>
            )
         }
      </li>
   );
};

SidebarLink.propTypes = {
   title: PropTypes.string,
   icon: PropTypes.string,
   to: PropTypes.string,
   active: PropTypes.any,
   onClick: PropTypes.func,
   userImage: PropTypes.string,
   user: PropTypes.bool,
   style: PropTypes.object,
   subMenu: PropTypes.bool,
   blank: PropTypes.bool,
   isPageBuilder: PropTypes.bool,
   className: PropTypes.string,
   goTo: PropTypes.func,
   globalStatus: PropTypes.any,
   id: PropTypes.string,
   isBeta: PropTypes.bool,
   isPortal: PropTypes.bool,
};

SidebarLink.defaultProps = {
   isPageBuilder: false,
   className: '',
   isBeta: false,
};

export default SidebarLink;
