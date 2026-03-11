/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { OfferContext } from 'containers/pages/mixed/offers';
import React, { useCallback, useEffect, useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import { Popover } from '@material-ui/core';
import Router from 'routes/router';
import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import IconButton from 'components/elements/buttons/IconButton';
import IconNew from 'components/elements/iconsSize';
import { isLocalhost } from 'utils/Helpers';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { myAccountCourses } from 'api';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import GoogleTranslate from 'components/elements/GoogleTranslate';
import SidebarMenu from './SidebarMenu';
import MobileMenu from '../MobileMenu';
import LiquidRenderer from '../../liquidRenderer';

const OffersHeader = ({
   isPreview, schoolSliderStatus,
}) => {
   const {
      site, user, template, schoolRoomSettings, onClickElement, isEditor, selectedOfferCourse,
      goBackToOffers, selectedOffer, logout,
      goBackToCourses, globalBranding, onClickHeaderLink, isCategoryFrontPage, portalMenuData,
      viewMode,
   } = React.useContext(OfferContext);

   const [templateName, setTemplateName] = useState('');
   const [isOpenTriangle, setIsOpenTriangle] = React.useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const history = useHistory();
   const location = useLocation();
   const header = template[1].school_room_section.props;
   const slug = template[1].school_room_section.slug;
   const { isMobile } = useWindowSizeChange();
   const [isPageData, setIsPageData] = useState(false);
   const siteInfo = useSelector(siteInfoSelector);
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

   useEffect(() => {
      const templateName = localStorage.getItem('templateName');

      if (templateName && (window.location.pathname.includes('admin') || window.location.pathname.includes('temp-portal'))) {
         setTemplateName(templateName);
      }

      if (user) {
         const getCoursesData = async () => {
            const response = await myAccountCourses();
            if (response.data?.page_data.length) {
               setIsPageData(true);
            }
         };

         getCoursesData();
      }

      return () => {
         localStorage.removeItem('templateName');
      };
   }, [user]);

   let siteLogo = site.school_logo;
   if (globalBranding && globalBranding.school_logo) {
      siteLogo = globalBranding.school_logo;
   }

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

   // Function to get user initials for avatar placeholder
   const getUserInitials = () => {
      if (!user?.name) return 'JB'; // Default initials

      const nameParts = user.name.split(' ');
      if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
   };

   // Force render links function
   const renderCustomLinks = () => {
      const headerLinks = getHeaderCustomLinksSort();
      return (
         <div className="force-rendered-links" style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end',
            zIndex: 1000,
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? 'auto' : '20px',
            right: isMobile ? 'auto' : '550px',
         }}>
            {headerLinks.map(link => (
               <a
                  key={link.id || link.text}
                  href={getHref(link.href)}
                  target={link.target}
                  className='header_link'
                  style={{
                     color: link.color || 'var(--textColor)',
                     textDecoration: 'none',
                     padding: '5px 10px',
                     fontWeight: 'medium',
                     fontSize: '16px',
                     marginTop: '1px'
                  }}
               >
                  {link.text}
               </a>
            ))}
         </div>
      );
   };

   const handleNavigateToOffers = () => {
      window.location.href = window.location.pathname.includes('onlinecourse') ? '/portal/onlinecourse' : '/portal/membership';
   };

   const handleNavigateToMiestro = () => {
      window.open('https://miestro.com', '_blank');
   };

   const handleLoginClick = () => {
      if (isPreview) {
         if (window.location.pathname.includes('onlinecourse')) {
            localStorage.setItem('isOnlineCourse', 'onlinecourse');
         }
         history.push(Router.route('LOGIN').getMask());
      }
   };

   const handleSignupClick = () => {
      if (isPreview) {
         if (window.location.pathname.includes('onlinecourse')) {
            localStorage.setItem('isOnlineCourse', 'onlinecourse');
         }
         history.push(Router.route('SIGNUP_STUDENT').getMask());
      }
   };

   const handleUserClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpenTriangle(true);
      setAnchorEl(e.currentTarget);
   };

   // Mobile view
   if (isMobile || (viewMode === 'phone' || viewMode === 'tablet')) {
      return (
         <Section
            slug={slug}
            item={template[1]}
            i={1}
            sectionStyles={{ backgroundColor: header.bgColor }}
            onClick={(e) => { onClickElement(e); }}
            isPreview={!isEditor}
            className='offers__header__mobile'
         >
            <div className='offers__header__mobile__content' style={schoolSliderStatus ? { backgroundColor: header.bgColor } : { backgroundColor: header.bgColor, position: 'relative' }}>
               <div className='offers__header__left'>
                  {selectedOfferCourse || selectedOffer ? (
                     <TextWithIcon
                        inner='Back'
                        type={types.regular160}
                        iconProps={{ color: 'var(--textColor)' }}
                        size={sizes.xlarge}
                        iconColor='var(--textColor)'
                        style={{ color: 'var(--textColor)' }}
                        generalStyles={{ cursor: 'pointer' }}
                        onClick={selectedOffer && !selectedOfferCourse ? () => goBackToOffers() : () => goBackToCourses()}
                     />
                  ) : (
                     <>
                        {siteLogo ? (
                           <img src={siteLogo} alt={site.title || 'Site Logo'} onClick={isEditor ? () => { } : () => history.push('/portal')} role='presentation' className="offers__header__mobile__logo" style={{ height: `${header.logoHeigth || 30}px`, cursor: 'pointer' }} />
                        ) : (
                           <Text
                              inner={site.title}
                              onClick={isEditor ? () => { } : () => history.push('/portal')}
                              type={types.mediumLarge}
                              size={sizes.small}
                              style={{ cursor: 'pointer', color: 'var(--textColor)' }}
                           />
                        )}
                     </>
                  )}
               </div>
               <div className='offers__header__mobile__right'>
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
               />
            </div>
         </Section>
      );
   }

   // Check if we need to use the LiquidRenderer based on templateName
   const findedPortalTemplate = templateName ? siteInfo.all_school_room.find(template => template.school_room_theme_name === templateName)?.css.header_liquid.content : null;

   if (findedPortalTemplate || (schoolRoomSettings.css?.header_liquid?.content && !isEditor)) {
      return (
         <Section
            slug={slug}
            item={template[1]}
            i={1}
            onClick={(e) => { onClickElement(e); }}
            isPreview={!isEditor}
            className={`offers__header ${selectedOffer && !selectedOfferCourse && (templateName || schoolRoomSettings.school_room_theme_name)} ${(isCategoryFrontPage || !schoolSliderStatus) && 'notAbsHeader'}`}
         >
            <LiquidRenderer
               template={findedPortalTemplate || schoolRoomSettings.css.header_liquid.content}
               data={{
                  selectedOffer,
                  selectedOfferCourse,
                  site,
                  siteLogo,
                  header,
                  user,
                  isMembership: location.pathname.includes('membership'),
                  isPreview,
                  isPageData,
                  isOpenTriangle,
                  customLinks: getHeaderCustomLinksSort(),
               }}
               actions={{
                  goBackToOffers,
                  goBackToCourses,
                  onClickMembership: isEditor ? () => { } : () => onClickHeaderLink('membership'),
                  onClickOnlineCourse: isEditor ? () => { } : () => onClickHeaderLink('onlinecourse'),
                  onClickCommunity: isEditor ? () => { } : () => onClickHeaderLink('community'),
                  onClickBundle: isEditor ? () => { } : () => onClickHeaderLink('bundle'),
                  onClickLogo: isEditor ? () => { } : handleNavigateToOffers,
                  onClickFooterLogo: isEditor ? () => { } : handleNavigateToMiestro,
                  onClickLoginButton: isPreview ? handleLoginClick : () => { },
                  onClickJoinButton: isPreview ? handleSignupClick : () => { },
                  onClickMySavedProducts: isPreview ? () => history.push('/my-account#saved') : () => { },
                  onClickMyPortal: isPreview ? () => history.push('/portal/onlinecourse/my-portals') : () => { },
                  onClickToPortal: isPreview ? () => history.push('/portal/onlinecourse') : () => { },
                  onClickUser: handleUserClick,
               }}
            />
            {renderCustomLinks()}
            {!history.location.pathname.includes('admin') && <GoogleTranslate />}
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
               />
            </Popover>
         </Section>
      );
   }

   // Custom header implementation with the specified design
   return (
      <Section
         slug={slug}
         item={template[1]}
         i={1}
         onClick={(e) => { onClickElement(e); }}
         isPreview={!isEditor}
         className={`offers__header ${selectedOffer && !selectedOfferCourse && (templateName || schoolRoomSettings.school_room_theme_name)} ${(isCategoryFrontPage || !schoolSliderStatus) && 'notAbsHeader'}`}
      >
         <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left side of the header */}
            <div className='offers__header__left'>
               {selectedOfferCourse || selectedOffer ? (
                  <TextWithIcon
                     inner='Back'
                     type={types.regular160}
                     iconProps={{ color: 'var(--textColor)' }}
                     size={sizes.xlarge}
                     iconColor='var(--textColor)'
                     style={{ color: 'var(--textColor)' }}
                     generalStyles={{ cursor: 'pointer' }}
                     onClick={selectedOffer && !selectedOfferCourse ? () => goBackToOffers() : () => goBackToCourses()}
                  />
               ) : (
                  <>
                     {siteLogo ? (
                        <img
                           src={siteLogo}
                           alt={site.title || 'Site Logo'}
                           onClick={isEditor ? () => { } : handleNavigateToOffers}
                           style={{ height: `${header.logoHeigth || 30}px`, cursor: 'pointer' }}
                        />
                     ) : (
                        <Text
                           inner={site.title}
                           onClick={isEditor ? () => { } : handleNavigateToOffers}
                           type={types.mediumLarge}
                           size={sizes.small}
                           className="offers__header__left__logo"
                        />
                     )}
                  </>
               )}

               {/* Portal navigation links */}
               {/* {portalMenuData.membership && (
                  <div onClick={isEditor ? () => {} : () => onClickHeaderLink('membership')} className="offers__header__left__portal">
                     <TextWithIcon
                        inner="Membership"
                        iconGap={11}
                        iconName="SchoolRoomCourseM"
                        isIconRight={false}
                        type={types.regularDefault}
                        size={sizes.small}
                     />
                  </div>
               )}
               
               {portalMenuData.onlinecourse && (
                  <div onClick={isEditor ? () => {} : () => onClickHeaderLink('onlinecourse')} className="offers__header__left__portal">
                     <TextWithIcon
                        inner="Courses"
                        iconGap={11}
                        iconName="SchoolRoomCourseM" 
                        isIconRight={false}
                        type={types.regularDefault}
                        size={sizes.small}
                     />
                  </div>
               )}
               
               {portalMenuData.community && (
                  <div onClick={isEditor ? () => {} : () => onClickHeaderLink('community')} className="offers__header__left__portal">
                     <TextWithIcon
                        inner="Community"
                        iconGap={11}
                        iconName="SchoolRoomCommunityM"
                        isIconRight={false}
                        type={types.regularDefault}
                        size={sizes.small}
                     />
                  </div>
               )}
               
               {portalMenuData.bundle && (
                  <div onClick={isEditor ? () => {} : () => onClickHeaderLink('bundle')} className="offers__header__left__portal">
                     <TextWithIcon
                        inner="Bundles"
                        iconGap={11}
                        iconName="SchoolRoomBundleM"
                        isIconRight={false}
                        type={types.regularDefault}
                        size={sizes.small}
                     />
                  </div>
               )} */}
            </div>

            {/* Right side of the header */}

            <div className='offers__header__right'>

               {/* Custom links */}
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
                  // User is logged in - show user profile
                  <div
                     className={`offers__header__right__user ${isOpenTriangle ? 'active' : ''}`}
                     onClick={handleUserClick}
                  >
                     {user.avatar ? (
                        <img src={user.avatar} alt={user.name || "User"} />
                     ) : (
                        <div className="offers__header__right__user__icon">
                           <span>{getUserInitials()}</span>
                        </div>
                     )}
                     <span className="offers__header__right__user__name">{user.name || "User"}</span>
                     <IconNew name="ChevronDownM" color="var(--textColor)" />
                  </div>
               ) : (
                  // User is not logged in - show login/signup buttons
                  <div className="offers__header__dontloggined">
                     <button
                        className="login_button"
                        onClick={handleLoginClick}
                     >
                        Login
                     </button>
                     <button
                        className="login_button"
                        onClick={handleSignupClick}
                     >
                        Sign Up
                     </button>
                  </div>
               )}
            </div>
         </div>

         {!history.location.pathname.includes('admin') && <GoogleTranslate />}

         {/* User popover menu */}

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
            />
         </Popover>
      </Section>
   );
};

OffersHeader.propTypes = {
   isPreview: PropTypes.bool,
   schoolSliderStatus: PropTypes.bool,
};

export default OffersHeader;