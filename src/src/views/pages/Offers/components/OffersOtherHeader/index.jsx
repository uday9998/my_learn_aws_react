/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import { Popover } from '@material-ui/core';
import Line from 'components/elements/Line';
import Router from 'routes/router';
import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import IconButton from 'components/elements/buttons/IconButton';
import IconNew from 'components/elements/iconsSize';
import { isLocalhost } from 'utils/Helpers';
import SidebarMenu from './SidebarMenu';
import MobileMenu from './MobileMenu';
import LiquidRenderer from '../../liquidRenderer';

const OffersHeader = ({
   isPreview, site, user, template, schoolRoomSettings,
   onClickElement, isEditor, selectedOfferCourse,
   goBackToOffers, selectedOffer, logout,
   goBackToCourses, portalMenuData,
}) => {
   const [isOpenTriangle, setIsOpenTriangle] = React.useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const history = useHistory();
   const header = template[1].school_room_section.props;
   const slug = template[1].school_room_section.slug;
   const { isMobile } = useWindowSizeChange();
   const [isOpenMenu, setIsOpenMenu] = React.useState(false);

   useEffect(() => {
      const root = document.getElementById('root');
      if (!root) return;
      if (isOpenMenu && isMobile) {
         root.style.overflow = 'hidden';
      } else {
         root.style.overflow = 'auto';
      }
   }, [isOpenMenu, isMobile]);

   let siteLogo = site.school_logo;
   if (site && site.school_logo) {
      siteLogo = site.school_logo;
   }

   const handleTriangleToggle = React.useCallback(() => {
      setIsOpenTriangle(prev => !prev);
   }, []);

   const getHeaderCustomLinksSort = useCallback(() => {
      const customLinks = site.custom_links?.items || [];
      const headerLinks = (customLinks && customLinks.filter(child => (child.position === 'right' || child.position === 'left')));
      return headerLinks.sort((a, b) => {
         if (a.order < b.order) return -1;
         return a.order > b.order ? 1 : 0;
      });
   }, [site.custom_links]);

   const getHref = (value) => {
      const baseUrl = document.querySelector('meta[name="base_url"]')?.getAttribute('content');
      const apiUrl = (isLocalhost()) ? process.env.REACT_APP_API_LOCAL_ENDPOINT : (baseUrl || window.location.origin);
      let newValue = value;
      if (value === `${apiUrl}/offers`) {
         newValue = '/portal/membership';
      }
      return newValue;
   };

   const handleNavigateToOffers = () => {
      window.location.href = '/portal/membership';
   };

   const onClickHeaderLink = (portalType) => {
      history.push(`/portal/${portalType}`);
   };

   const getUserInitials = () => {
      if (!user?.name) return 'JB';
      const nameParts = user.name.split(' ');
      if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
   };

   if (isMobile) {
      return (
         <Section
            slug={slug}
            item={template[1]}
            i={1}
            sectionStyles={{ backgroundColor: header.bgColor }}
            onClick={(e) => { onClickElement(e); }}
            isPreview={!isEditor}
            className={`${schoolRoomSettings.school_room_theme_name} offersOther__header offers_other_header offers__header__mobile`}
         >
            <div className='offers__header__mobile__content offersOther__header__mobile__content' style={{ backgroundColor: header.bgColor }}>
               <div className='offersOther__header__left offers__header__left'>
                  {siteLogo ? (
                     <img 
                        src={siteLogo} 
                        alt={site.title || 'Site Logo'} 
                        onClick={isEditor ? () => { } : () => history.push('/portal')} 
                        role='presentation' 
                        className="offers__header__mobile__logo" 
                        style={{ height: `${header.logoHeigth || 30}px`, cursor: 'pointer' }} 
                     />
                  ) : (
                     <Text
                        inner={site.title}
                        onClick={isEditor ? () => { } : () => history.push('/portal')}
                        type={types.mediumLarge}
                        size={sizes.small}
                        style={{ cursor: 'pointer', color: 'var(--textColor)' }}
                     />
                  )}
               </div>
               <div className='offersOther__header__mobile__right offers__header__mobile__right'>
                  <IconButton
                     name='MenuMobileXl'
                     color='var(--textColor)'
                     onClick={() => {
                        if (!isEditor) {
                           setIsOpenMenu(!isOpenMenu);
                        }
                     }}
                  />
               </div>
            </div>
            
            <div className={`offers__header__mobile__menu${isOpenMenu ? ' offers__header__mobile__menu__active' : ' closed'}`}>
               <MobileMenu
                  getHeaderCustomLinksSort={getHeaderCustomLinksSort}
                  getHref={getHref}
                  setIsOpenMenu={setIsOpenMenu}
                  portalMenuData={portalMenuData}
                  user={user}
                  site={site}
                  logout={logout}
               />
            </div>
         </Section>
      );
   }

   return (
      <Section
         slug={slug}
         item={template[1]}
         i={1}
         onClick={(e) => { onClickElement(e); }}
         isPreview={!isEditor}
         className={`offers__header ${schoolRoomSettings.school_room_theme_name} offers_other_header`}
      >
         <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='offers__header__left'>
               {siteLogo ? (
                  <img
                     src={siteLogo}
                     alt={site.title || 'Site Logo'}
                     onClick={isEditor ? () => { } : () => handleNavigateToOffers()}
                     style={{ height: `${header.logoHeigth || 30}px`, cursor: 'pointer' }}
                  />
               ) : (
                  <Text
                     inner={site.title}
                     onClick={isEditor ? () => { } : () => handleNavigateToOffers()}
                     type={types.mediumLarge}
                     size={sizes.small}
                     className="offers__header__left__logo"
                  />
               )}
            </div>

            <div className='offers__header__right'>
               {!isMobile &&
                  getHeaderCustomLinksSort().map(link => (
                     <a
                        key={link.id || link.text}
                        href={getHref(link.href)}
                        target={link.target}
                        className='header_link'
                        style={{
                           color: link.color || 'var(--textColor)',
                           fontSize: '16px',
                           marginTop: '1px'
                        }}
                     >
                        {link.text}
                     </a>
                  ))
               }

               {user ? (
                  <div
                     className={`offers__header__right__user ${isOpenTriangle ? 'active' : ''}`}
                     onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleTriangleToggle();
                        setAnchorEl(e.currentTarget);
                     }}
                  >
                     {user.avatar ? (
                        <img src={user.avatar} alt={user.name || "User"} />
                     ) : (
                        <div className="offers__header__right__user__icon">
                           <span className="avatar-initials">{getUserInitials()}</span>
                        </div>
                     )}
                     <span className="offers__header__right__user__name notranslate">{user.name || "User"}</span>
                     <IconNew name="ChevronDownM" color="var(--textColor)" />
                  </div>
               ) : (
                  <div className="offers__header__dontloggined">
                     <button
                        className="login_button"
                        onClick={isPreview ? () => history.push(Router.route('LOGIN').getMask()) : () => { }}
                     >
                        Login
                     </button>
                     <button
                        className="login_button"
                        onClick={isPreview ? () => history.push(Router.route('SIGNUP_STUDENT').getMask()) : () => { }}
                     >
                        Sign Up
                     </button>
                  </div>
               )}
            </div>
         </div>

         <Popover
            open={isOpenTriangle}
            anchorEl={anchorEl}
            onClose={() => setIsOpenTriangle(false)}
            className='user-popover sidebar-style-popover'
            elevation={24}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
         >
            <SidebarMenu
               user={user}
               logout={logout}
               portalMenuData={portalMenuData}
               site={site}
            />
         </Popover>
      </Section>
   );
};

OffersHeader.defaultProps = {
   onClickElement: () => { },
   selectedOfferCourse: {},
   portalMenuData: {},
};

OffersHeader.propTypes = {
   isPreview: PropTypes.bool,
   onClickElement: PropTypes.func,
   site: PropTypes.object,
   user: PropTypes.object,
   template: PropTypes.array,
   schoolRoomSettings: PropTypes.object,
   isEditor: PropTypes.bool,
   selectedOfferCourse: PropTypes.object,
   goBackToOffers: PropTypes.func,
   selectedOffer: PropTypes.object,
   logout: PropTypes.func,
   goBackToCourses: PropTypes.func,
   portalMenuData: PropTypes.object,
};

export default OffersHeader;