import React, { useContext } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import { OfferContext } from 'containers/pages/mixed/offers';
import Line from 'components/elements/Line';
import Router from 'routes/router';
import { useHistory } from 'react-router-dom';
// import Input from 'components/elements/inputNew';
import Button from 'components/elements/buttons/BaseButtonNew';
// import CheckBox from 'components/elements/form/CheckBoxNew';
import IconNew from 'components/elements/iconsSize';
import PropTypes from 'prop-types';

const MobileMenu = ({
   getHeaderCustomLinksSort, getHref, setIsOpenMenu, portalMenuData,
}) => {
   const {
      user, logout, site,
   } = useContext(OfferContext);
   const history = useHistory();
   // const [loginInputs, setLoginInputs] = useState({
   //    email: '',
   //    password: '',
   // });

   // const loginInputsChange = (name, value) => {
   //    setLoginInputs({
   //       ...loginInputs,
   //       [name]: value,
   //    });
   // };

   const changeHeaderMenu = (link) => {
      history.push(link);
      setIsOpenMenu(false);
   };

   return (
      <div className='offers__menu__mobile'>
         {user && (
            <>
               <div className='offers__menu__mobile__user'>
                  <img src={ user.picture_src || user.picture_full_src } alt='' />
                  <Text
                     inner={ user.name }
                     type={ types.medium150 }
                     size={ sizes.medium }
                     style={ { color: '#131F1E' } }
                  />
               </div>
               <Line />
            </>
         )}

         {user && user.role === 1 && !user.is_affiliate && (
            <div className='offers__header__right__popover__item'>
               <TextWithIcon
                  inner='Admin'
                  iconGap={ 12 }
                  iconName='AdminM'
                  isIconRight={ false }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  onClick={ () => window.location = '/admin' }
                  style={ { color: '#000' } }
               />
            </div>
         )}
         {user && !user.is_affiliate && (
            <div className='offers__header__right__popover__item'>
               <TextWithIcon
                  inner='Portal'
                  iconGap={ 12 }
                  iconName='SchoolRoomCourseM'
                  isIconRight={ false }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  onClick={ () => window.location = '/my-account#my-portal' }
                  style={ { color: '#131F1E' } }
               />
            </div>
         )}
         {/* {(portalMenuData.membership || (!portalMenuData.community
             && !portalMenuData.bundle && !portalMenuData.onlinecourse))
             && (
                <div className='offers__header__right__popover__item'>
                   <TextWithIcon
                      iconGap={ 12 }
                      inner='Membership'
                      iconName='LinkM'
                      isIconRight={ false }
                      type={ types.regularDefault }
                      size={ sizes.small }
                      onClick={ () => changeHeaderMenu('/portal/membership') }
                      style={ { color: '#131F1E' } }
                   />
                </div>
             )} */}
         {/* {portalMenuData.onlinecourse && (
            <div className='offers__header__right__popover__item'>
               <TextWithIcon
                  iconGap={ 12 }
                  inner='Online Course'
                  iconName='LinkM'
                  isIconRight={ false }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  onClick={ () => changeHeaderMenu('/portal/onlinecourse') }
                  style={ { color: '#131F1E' } }
               />
            </div>
         )} */}
         {/* {portalMenuData.community && (
            <div className='offers__header__right__popover__item'>
               <TextWithIcon
                  iconGap={ 12 }
                  inner='Community'
                  iconName='LinkM'
                  isIconRight={ false }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  onClick={ () => changeHeaderMenu('/portal/community') }
                  style={ { color: '#131F1E' } }
               />
            </div>
         )} */}
         {/* {portalMenuData.bundle && (
            <div className='offers__header__right__popover__item'>
               <TextWithIcon
                  iconGap={ 12 }
                  inner='Bundle'
                  iconName='LinkM'
                  isIconRight={ false }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  onClick={ () => changeHeaderMenu('/portal/bundle') }
                  style={ { color: '#131F1E' } }
               />
            </div>
         )} */}
         { ((user && !user.is_affiliate) || !user) && !!getHeaderCustomLinksSort().length
                && getHeaderCustomLinksSort().map(link => {
                   return (
                      <div className='offers__header__right__popover__item' style={ { gap: '12px' } }>
                         <IconNew name='LinkM' color={ link.color || '#000' } />
                         <a
                            href={ getHref(link.href) }
                            target={ link.target }
                            style={ { color: '#000' } }
                            className='header_link'
                         >
                            { link.text }
                         </a>
                      </div>
                   );
                })}
         {site && site.blog_page_status && ((site.blog_page_status === 'on' && site.blogs_count !== 0) || (site.blogs_count !== 0 && site.blog_page_status === 'on_default'))
                    && (
                       <div className='offers__header__right__popover__item'>
                          <TextWithIcon
                             iconGap={ 12 }
                             inner='Blog'
                             iconName='SchoolRoomBlogM'
                             isIconRight={ false }
                             type={ types.regularDefault }
                             size={ sizes.small }
                             onClick={ () => history.push(Router.route('BLOG_LISTING').getMask()) }
                             style={ { color: '#131F1E' } }
                          />
                       </div>
                    )}
         {user && !user.is_affiliate && (
            <div className='offers__header__right__popover__item'>
               <TextWithIcon
                  inner='Settings'
                  iconGap={ 12 }
                  type={ types.regularDefault }
                  size={ sizes.small }
                  iconName='SchoolRoomSettingsM'
                  isIconRight={ false }
                  onClick={ () => window.location = '/my-account#settings' }
                  style={ { color: '#131F1E' } }
               />
            </div>
         )}
         {!user
            && (
               <Button
                  text='Login'
                  onClick={ () => changeHeaderMenu(Router.route('LOGIN').getMask()) }
                  style={ {
                     color: '#fff',
                     backgroundColor: 'var(--buttonBgcolor)',
                  } }
               />
            )
         }
         {!user
               && (
                  <Button
                     text='Join Now'
                     onClick={ () => changeHeaderMenu(Router.route('SIGNUP_STUDENT').getMask()) }
                     style={ {
                        color: '#fff',
                        backgroundColor: 'var(--buttonBgcolor)',
                     } }
                  />
               )
         }
         { user && (
            <><div className='offers__menu__mobile__logout' />
               <Line />

               <div className='offers__header__right__popover__item'>
                  <TextWithIcon
                     iconGap={ 12 }
                     inner='Log Out'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     iconName='SchoolRoomLogOutM'
                     isIconRight={ false }
                     onClick={ () => logout() }
                     style={ { color: '#131F1E' } }
                  />
               </div>
            </>
         )}
      </div>
   );
};

//    return (
//       <div className='login__inputs'>
//          <div className='login__inputs__top'>
//             <Text
//                inner='Login with Your Email'
//                type={ types.mediumSmall }
//                size={ sizes.xxlarge }
//             />
//             <div>
//                <Text
//                   inner="Don't have an account? "
//                   type={ types.regular148 }
//                   size={ sizes.medium }
//                   style={ { color: '#444C4B' } }
//                />
//                <Text
//                   inner='Sign Up'
//                   type={ types.regular148 }
//                   size={ sizes.medium }
//                   style={ { cursor: 'pointer' } }
//                />
//             </div>
//          </div>
//          <div className='login__inputs__content'>
//             <Input
//                value={ loginInputs.email }
//                onChange={ loginInputsChange }
//                name='email'
//                label='Email'
//                placeholder='Your email address'
//             />
//             <Input
//                name='password'
//                value={ loginInputs.password }
//                onChange={ loginInputsChange }
//                isPassword={ true }
//                type='password'
//                placeholder='Enter your password'
//                label='Password'
//             />
//             <div className='login__inputs__content__bottom'>
//                <CheckBox
//                   label='Remember me'
//                   labelPosition='right'
//                   checked={ loginInputs.remember }
//                   onChange={ () => loginInputsChange('remember', !loginInputs.remember) }
//                />
//                <Link to={ Router.route('FORGOT_PASSWORD').getMask() }>
//                   <Text
//                      inner='Forgot Password'
//                      style={ { cursor: 'pointer', color: '#24554E' } }
//                      type={ types.regular148 }
//                      size={ sizes.medium }
//                   />
//                </Link>
//             </div>
//             <Button
//                text='Login'
//                disabled={ !loginInputs.email || !loginInputs.password }
//                onClick={ () => login(loginInputs) }
//             />
//          </div>
//       </div>
//    );
// };

MobileMenu.propTypes = {
   getHeaderCustomLinksSort: PropTypes.func,
   getHref: PropTypes.func,
   setIsOpenMenu: PropTypes.func,
   portalMenuData: PropTypes.object,
};


export default MobileMenu;
