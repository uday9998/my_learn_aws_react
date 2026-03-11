/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Sidebar from 'components/modules/Sidebar/index.mob';
import classNames from 'classnames';
import Icon from 'components/elements/Icon';
import IconNew from 'components/elements/iconsSize';
import Router from 'routes/router';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import logo from '../../../assets/images/miestrologo.svg';

const SiteHeader = ({
   title, goBack, hasShadow, hasMenu,
   goToBack, goTo, locationPath, bottomContent, handleLogout, memberAccountPath, authUser,
   primaryTheme, isStudentRoom, tooltip, goToMyAccount, userChangedData, globalStatus, fileSizeInfo,
   curseButtons, courseLogo, siteInfoTitle, mainApp, app, subTitle, style, setIsOpenMobSearch, isMobSearchOpen, isPlaylist, previewPlaylist,
   handleSaveAndContinue,
}) => {
   const [showMenu, setShowMenu] = useState(false);
   const [logoutPopupIsOpen, setLogoutPopupIsOpen] = useState(false);
   function openPopup(e) {
      e.stopPropagation();
      setLogoutPopupIsOpen(!logoutPopupIsOpen);
   }

   return (
      <>
         <div
            className={
               classNames(
                  'mob-siteHeader',
                  {
                     'mob-siteHeader_shadow_false': !hasShadow && !showMenu,
                  }
               )
            }
            id='siteHeader'
         >
            <div className='mob-siteHeader_content'>
               {
                  isPlaylist ? (
                     <div
                        style={ {
                           display: 'flex',
                           alignItems: 'center',
                           gap: '10px',
                        } }
                        onClick={ goToBack }
                        role='presentation'
                     >
                        <Icon name='ArrowBackNew' onClick={ goToBack } />
                        <Text
                           inner={ title }
                           type={ types.regular160 }
                           size={ sizes.xlarge }
                        /> 
                     </div>
                  ) : (
                     <Link to={ Router.route('ADMIN_DASHBOARD').getCompiledPath() }>
                        <div
                           className='mob-siteHeader__logo'
                           role='presentation'
                        >
                            <img src={logo} alt='logo' />
                        </div>
                     </Link>
                  )
               }
               
               <div className='product-search-mob'>
                  {isMobSearchOpen !== undefined && (<div role='presentation' onClick={ () => setIsOpenMobSearch(true) }><IconNew name='searchL' /></div>)}
                  {hasMenu && (
                     <div
                        className={ `mob-siteHeader__dragDrop  showMenu_${ showMenu }` }
                        onClick={ () => {
                           window.scrollTo({ top: 0, behavior: 'smooth' });
                           setShowMenu(!showMenu);
                        } }
                        role='presentation'
                     >
                        <span className='openMenuIcon' />
                     </div>
                  )}
               </div>
               {/* {
                  !hasMenu && (
                     <div>
                        <div
                           onClick={ (e) => openPopup(e) }
                           role='presentation'
                        >
                           <AvatarBlock
                              avatar={ authUser.picture_full_src }
                           />
                        </div>
                        {
                           logoutPopupIsOpen && (
                           <>
                              <div className='mainhub__logoutPopup' style={ authUser && authUser.uuid ? { height: '72px' } : {} }>
                                 <div>
                                    <Link to={ memberAccountPath }>

                                       <Text
                                          style={ (isStudentRoom ? { fontFamily: primaryTheme, fontSize: '12px' } : { fontSize: '12px' }) }
                                          type={ textSizes.normal }
                                          inner='My account'
                                       />

                                    </Link>
                                 </div>
                                 {authUser && authUser.uuid && (
                                    <div>
                                       <Link to={ Router.route('ADMIN_DASHBOARD').getMask() }>

                                          <Text
                                             style={ { fontSize: '12px' } }
                                             type={ textType.normal }
                                             inner='My dashboard'
                                          />

                                       </Link>
                                    </div>
                                 )}
                                 <div role='presentation' onClick={ () => handleLogout() }>
                                    <Text
                                       style={ (isStudentRoom ? { fontFamily: primaryTheme, fontSize: '12px' } : { fontSize: '12px' }) }
                                       type={ textSizes.normal }
                                       inner='Logout'
                                    />
                                 </div>
                              </div>

                           </>
                           )
                        }
                     </div>
                  )
               } */}
            </div>
            {/* {
               !!curseButtons && (
                  <> { curseButtons }</>
               )
            }
            {
               !!bottomContent && (
                  <> { bottomContent }</>
               )
            } */}
         </div>

         {
            showMenu && (
               <div className='siteMenu'>
                  <Sidebar
                     goTo={ goTo }
                     locationPath={ locationPath }
                     authUser={ authUser }
                     goToMyAccount={ goToMyAccount }
                     userChangedData={ userChangedData }
                     handleLogout={ handleLogout }
                     setShowMenu={ setShowMenu }
                     fileSizeInfo={ fileSizeInfo }
                     mainApp={ mainApp }
                     app={ app }
                     previewPlaylist={ previewPlaylist }
                     handleSaveAndContinue={ handleSaveAndContinue }
                     goToBack={ goToBack }
                     isPlaylist={ isPlaylist }
                  />
               </div>
            )
         }
      </>
   );
};

SiteHeader.propTypes = {
   title: PropTypes.string,
   goBack: PropTypes.bool,
   hasShadow: PropTypes.bool,
   hasMenu: PropTypes.bool,
   goToBack: PropTypes.func,
   goTo: PropTypes.func,
   locationPath: PropTypes.string,
   bottomContent: PropTypes.any,
   authUser: PropTypes.object,
   handleLogout: PropTypes.any,
   memberAccountPath: PropTypes.any,
   primaryTheme: PropTypes.string,
   isStudentRoom: PropTypes.bool,
   tooltip: PropTypes.string,
   goToMyAccount: PropTypes.func,
   userChangedData: PropTypes.object,
   globalStatus: PropTypes.any,
   fileSizeInfo: PropTypes.object,
   curseButtons: PropTypes.any,
   courseLogo: PropTypes.string,
   siteInfoTitle: PropTypes.string,
   app: PropTypes.object,
   mainApp: PropTypes.object,
   subTitle: PropTypes.string,
   style: PropTypes.object,
   setIsOpenMobSearch: PropTypes.func,
   previewPlaylist: PropTypes.func,
   handleSaveAndContinue: PropTypes.func,
   isMobSearchOpen: PropTypes.bool,
   isPlaylist: PropTypes.bool,
};

SiteHeader.defaultProps = {
   title: '',
   goBack: false,
   hasShadow: true,
   hasMenu: true,
   goTo: () => {},
   isStudentRoom: false,
   tooltip: '',
   globalStatus: true,
   curseButtons: false,
   courseLogo: '',
   siteInfoTitle: '',
   subTitle: '',
};

export default SiteHeader;
