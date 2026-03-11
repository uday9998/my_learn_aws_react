import React, { useState } from 'react';
import MainHubHeader from 'containers/modules/mainHubheader';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import AvatarBlock from 'components/elements/mainHub/AvatarBlock';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import './index.scss';

const MemberUnsubscribeEmail = ({
   loggedIn,
   handleLogout,
   siteInfo,
   isUnsubscribeEmail,
   goToMainHub,
   authUser,
}) => {
   const [logoutPopupIsOpen, setLogoutPopupIsOpen] = useState(false);

   function openPopup(e) {
      e.stopPropagation();
      setLogoutPopupIsOpen(!logoutPopupIsOpen);
   }

   return (
      <div className='unsubscribe_member' style={ { backgroundColor: siteInfo.body_bg_color || '#f0f4f7' } }>
         <div className='unsubscribe_member__header'>

            <MainHubHeader
               goToBack={ goToMainHub }
               rightSide={
                  loggedIn ? (
                     <div>
                        <div
                           onClick={ (e) => openPopup(e) }
                           role='presentation'
                        >
                           <AvatarBlock
                              avatar={ authUser.picture_src ? authUser.picture_src : authUser.picture_full_src }
                           />
                        </div>
                        {
                           logoutPopupIsOpen && (
                           <>
                              <div className='unsubscribe_member__logoutPopup'>
                                 <div>
                                    <Link to={ Router.route('MEMBER_ACCOUNT').getMask() }>

                                       <Text
                                          style={ { fontSize: '12px' } }
                                          type={ TextType.normal }
                                          inner='My account'
                                       />

                                    </Link>
                                 </div>
                                 <div role='presentation' onClick={ () => handleLogout() }>
                                    <Text
                                       style={ { fontSize: '12px' } }
                                       type={ TextType.normal }
                                       inner='Logout'
                                    />
                                 </div>
                              </div>

                           </>
                           )
                        }
                     </div>

                  ) : (
                     <div className='unsubscribe_member__loginBtn'>
                        <Link to={ Router.route('LOGIN').getMask() }>
                           <BaseButton
                              theme={ btnTheme.darkGreen }
                              size={ btnSize.medium }
                              text='Log in'
                           />
                        </Link>
                     </div>
                  ) }
            />
            <div
               style={ {
                  backgroundImage: `url(${ siteInfo.logo })`,
               } }
               className='unsubscribe_member__headerBottom'
            >
               <Text
                  type={ TextType.bold }
                  inner={ siteInfo.banner_title }
               />
               <Text
                  type={ TextType.bold }
                  inner={ siteInfo.banner_subtitle }
                  size={ TextSize.large }
               />
            </div>
         </div>
         {
            isUnsubscribeEmail && (
               <div className='unsubscribe_member_body'>
                  <Text
                     type={ TextType.bold }
                     inner='You have successfully unsubscribed'
                     size={ TextSize.base }
                  />
               </div>
            )
         }
      </div>
   );
};

MemberUnsubscribeEmail.propTypes = {
   loggedIn: PropTypes.bool,
   handleLogout: PropTypes.func,
   goToMainHub: PropTypes.func,
   siteInfo: PropTypes.object,
   isUnsubscribeEmail: PropTypes.bool,
   authUser: PropTypes.object,
};

MemberUnsubscribeEmail.defaultProps = {
   loggedIn: false,
   authUser: {},
};

export default MemberUnsubscribeEmail;
