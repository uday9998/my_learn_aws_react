import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';

const SidebarMenu = ({ user, logout, setIsOpenMenu, portalMenuData = {} }) => {
  const handleLogout = () => {
    if (window.location.pathname.includes('onlinecourse')) {
      localStorage.setItem('isOnlineCourse', 'onlinecourse');
    }
    logout();
    if (setIsOpenMenu) setIsOpenMenu(false);
  };

  const handleProfileSettings = () => {
    if (window.location.pathname.includes('onlinecourse')) {
      localStorage.setItem('isOnlineCourse', 'onlinecourse');
    }
    window.location = '/my-account#settings';
  };

  const handleAdminDashboard = () => {
    window.location = '/admin';
    if (setIsOpenMenu) setIsOpenMenu(false);
  };

  const handlePortal = () => {
    window.location = '/my-account#my-portal';
    if (setIsOpenMenu) setIsOpenMenu(false);
  };

  const handleMainPortal = () => {
    window.location = '/portal/membership';
    if (setIsOpenMenu) setIsOpenMenu(false);
  };

  const handleCommunity = () => {
    window.location = '/my-account#communities';
    if (setIsOpenMenu) setIsOpenMenu(false);
  };

  // Function to get user initials for avatar placeholder
  const getUserInitials = () => {
    if (!user?.name) return 'JB'; // Default as in the design
    
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
  };


  return (
    <div className="sidebar-style-menu">
      {/* User Profile Header */}
      <div className="user-profile-header">
        <div className="avatar-container">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name || "User"} className="user-avatar" />
          ) : (
            <div className="avatar-placeholder">
              <span className="avatar-initials">{getUserInitials()}</span>
            </div>
          )}
        </div>
        <div className="user-info">
          <h2 className="notranslate">{user?.name || "Justin Burns"}</h2>
          <p className="notranslate">{user?.email || "justin@example.com"}</p>
          <span className="user-badge">Pro Member</span>
        </div>
      </div>
      
      {/* Navigation: MAIN section */}
      <div className="nav-section">
        <h3>MAIN</h3>
        <div 
          className="offers__header__right__popover__item"
          onClick={handleMainPortal}
        >
          <IconNew name="HomeM" color="#3470FF" />
          <span className="menu-item-link">Portal</span>
        </div>
        <div className="offers__header__right__popover__item"
        onClick={handlePortal}
        >
          <IconNew name="BookM" color="#3470FF" />
          <span className="menu-item-link">My Library</span>
        </div>
        <div 
          className="offers__header__right__popover__item"
          onClick={handleCommunity}
        >
          <IconNew name="MessageSquareM" color="#3470FF" />
          <span className="menu-item-link">Community</span>
        </div>
      </div>
      
      {/* ADMINISTRATION section - Only for admins */}
      {user && user.role === 1 && !user.is_affiliate && (
        <div className="nav-section">
          <h3>ADMINISTRATION</h3>
          <div 
            className="offers__header__right__popover__item"
            onClick={handleAdminDashboard}
          >
            <IconNew name="SettingsM" color="#7A5AF8" />
            <span className="menu-item-link">Admin Dashboard</span>
            <IconNew name="ChevronRightM" color="#CBD5E0" className="item-chevron" />
          </div>
        </div>
      )}
      
      {/* ACCOUNT section */}
      <div className="nav-section">
        <h3>ACCOUNT</h3>
        <div 
          className="offers__header__right__popover__item"
          onClick={handleProfileSettings}
        >
          <IconNew name="UserM" color="#FF6B00" />
          <span className="menu-item-link">Profile Settings</span>
        </div>
        {/* <div className="offers__header__right__popover__item">
          <IconNew name="CreditCardM" color="#FF6B00" />
          <span className="menu-item-link">Billing & Subscriptions</span>
        </div> */}
      </div>
      
      {/* Help Center item */}
      {/* <div className="offers__header__right__popover__item help-center-item">
        <IconNew name="HelpCircleM" color="#718096" />
        <span className="menu-item-link">Help Center</span>
        <IconNew name="ExternalLinkM" color="#CBD5E0" className="item-external" />
      </div> */}
      
      {/* Sign Out item */}
      <div 
        className="offers__header__right__popover__item sign-out-item"
        onClick={handleLogout}
      >
        <IconNew name="LogOutM" color="#E53E3E" />
        <span className="menu-item-link logout-link">Sign Out</span>
      </div>
      
      {/* Footer */}
      <div className="sidebar-style-footer">
        <div className="footer-links">
          {/* <a href="/terms">Terms</a>
          <span className="dot">•</span>
          <a href="/privacy">Privacy</a> */}
          
            <span className="dot">•</span>
            <a href={`mailto:${user?.email || ''}`} className="notranslate">
              Support
            </a>
          
        </div>
        <div className="copyright">
          © 2025 Miestro. All rights reserved.
        </div>
      </div>
    </div>
  );
};

SidebarMenu.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  setIsOpenMenu: PropTypes.func,
  portalMenuData: PropTypes.object,
};

export default SidebarMenu;