import React, { useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';

import Switch from 'components/elements/switchNew';
import CustomLinks from 'components/modules/settings/CustomLinks';
import CustomLinksView from 'components/modules/settings/CustomLinks/CustomLinksView';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import withLoading from 'utils/withLoading';
import {
   deleteCustomLink,
} from 'api';
import IconNew from 'components/elements/iconsSize';
import Line from 'components/elements/Line';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';

const Navigation = withLoading('div');

const SchoolRoomNavigationSettings = ({
   inputs, onChange, setCustomLinks, customLinks, handleCreateCustomLink, loadingCustomLinksCreate,
   handleUpdateCustomLinkFunc, customLinksReorder, authUser, loading,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState(false);
   const [deleteCustomLinkFunc, { loading: loadingDeleted }] = useSubmitForm(deleteCustomLink, {
      successMessage: 'Link has been deleted.',
   });
   const items = customLinks?.custom_links?.items || [];
   items.sort((a, b) => {
      if (a.order < b.order) return -1;
      return a.order > b.order ? 1 : 0;
   });
   const headerLinks = items.filter(child => (child.position === 'left' || child.position === 'right'));
   const footerLinks = items.filter(child => (child.position === 'f_left' || child.position === 'f_right'));

   const handleChangeSwitch = (name, value) => {
      if (!Array.isArray(permissions)) {
         if (permissions.remove_branding) {
            onChange(name, value);
         } else {
            setPopupTitle('Remove Branding');
            setShowPopup(true);
         }
      } else {
         onChange(name, value);
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <>
         {
            showPopup && createPortal(<PricingPopup 
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle }
            />, document.body)
         }
         <Navigation className='general__settings' isLoading={ loadingDeleted || loadingCustomLinksCreate }>
            <div className='navigation__header'>
               <div>
                  <div className='navigation__header__title'>
                     <Text
                        inner='Header'
                        type={ types.medium150 }
                        size={ sizes.medium }
                     />
                  </div>
                  <div>
                     <Text
                        inner="Set up the navigation on your portal's main page, guiding users effortlessly through your content."
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
               </div>
               <CustomLinksView
                  customLinks={ customLinks }
                  links={ headerLinks }
                  setCustomLinks={ setCustomLinks }
                  header={ true }
                  deleteCustomLinkFunc={ deleteCustomLinkFunc }
                  handleUpdateCustomLinkFunc={ handleUpdateCustomLinkFunc }
                  customLinksReorder={ customLinksReorder }
                  loading={ loading }
               />
               <CustomLinks
                  customLinks={ customLinks }
                  links={ headerLinks }
                  setCustomLinks={ setCustomLinks }
                  header={ true }
                  deleteCustomLinkFunc={ deleteCustomLinkFunc }
                  handleCreateCustomLink={ handleCreateCustomLink }
                  loading={ loading }
               />

               <Line />
               <div className='general__settings__footer'>
                  <Text
                     inner='Header Example:'
                     type={ types.regular148 }
                     size={ sizes.xsmall }
                  />
                  <div className='general__settings__footer__example'>
                     <div className='general__settings__footer__example__left'>
                        <Text
                           inner='YOUR LOGO'
                           type={ types.bold }
                           size={ sizes.size_14 }
                        />
                     </div>
                     <div className='general__settings__footer__example__right'>
                        <div className='general__settings__footer__example__right__links'>
                           {headerLinks && !!headerLinks.length && headerLinks.map((headelink) => {
                              return (
                                 <Text
                                    inner={ headelink.text }
                                    key={ headelink.id }
                                    type={ types.regularDefault }
                                    size={ sizes.small14 }
                                    className='general__settings__footer__example__right__link'
                                 />
                              );
                           })}
                        </div>
                        <IconNew name='AvatarM' />
                        <Text
                           inner={ authUser.name }
                           type={ types.regularDefault }
                           size={ sizes.small14 }
                        />
                        <IconNew name='AvatarArrowM' />
                     </div>

                  </div>
               </div>
            </div>
            <Line />
            <div className='navigation__footer'>
               <div>
                  <div className='navigation__footer__title'>
                     <Text
                        inner='Footer'
                        type={ types.medium150 }
                        size={ sizes.medium }
                     />
                  </div>
                  <div>
                     <Text
                        inner="Customize the navigation in your portal's footer section, enhancing user accessibility and providing essential links at a glance."
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
               </div>
               <CustomLinksView
                  customLinks={ customLinks }
                  links={ footerLinks }
                  setCustomLinks={ setCustomLinks }
                  header={ false }
                  deleteCustomLinkFunc={ deleteCustomLinkFunc }
                  handleUpdateCustomLinkFunc={ handleUpdateCustomLinkFunc }
                  customLinksReorder={ customLinksReorder }
                  loading={ loading }
               />
               <CustomLinks
                  customLinks={ customLinks }
                  links={ footerLinks }
                  setCustomLinks={ setCustomLinks }
                  header={ false }
                  deleteCustomLinkFunc={ deleteCustomLinkFunc }
                  handleCreateCustomLink={ handleCreateCustomLink }
                  loading={ loading }
               />
               <div>
                  <div className='general__settings__branding'>
                     <div className='general__settings__branding__top'>
                        <Text
                           inner='Miestro Branding on Footer'
                           type={ types.medium150 }
                           size={ sizes.medium }
                        />
                        <Switch
                           size='medium'
                           value={ !inputs.remove_branding }
                           onChange={ () => handleChangeSwitch('remove_branding', !inputs.remove_branding) }
                        />
                     </div>
                     <Text
                        inner="Choose to display the Miestro badge on your portal's footer for brand recognition or remove it for a more customized, brand-centric appearance."
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
                  <Line />
                  <div className='general__settings__footer'>
                     <Text
                        inner='Footer Example:'
                        type={ types.regular148 }
                        size={ sizes.xsmall }
                     />
                     <div className='general__settings__footer__example'>
                        <div className='general__settings__footer__example__left'>
                           {footerLinks && !!footerLinks.length && footerLinks.map((footerLink) => {
                              return (
                                 <Text
                                    inner={ footerLink.text }
                                    key={ footerLink.id }
                                    type={ types.regularDefault }
                                    size={ sizes.size_14 }
                                    className='general__settings__footer__example__left__link'
                                 />
                              );
                           })}
                        </div>
                        {/* <Text
                           inner='© 2023 by Personal Life Coach.'
                           type={ types.regularDefault }
                           size={ sizes.xsmall }
                           style={ { lineHeight: '15px' } }
                        /> */}
                        {!inputs.remove_branding && (
                           <div className='general__settings__footer__example__right'>
                              {/* <Text
                                 inner='Powered By'
                                 type={ types.regular148 }
                                 size={ sizes.xsmall }
                                 style={ { color: '#727978', whiteSpace: 'nowrap' } }
                              /> */}
                              <IconNew name='SchoolRoomFooterLogo' />
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
            {/* <div className='link_line_small' /> */}
         </Navigation>

      </>
   );
};

SchoolRoomNavigationSettings.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   setCustomLinks: PropTypes.func,
   customLinks: PropTypes.object,
   handleCreateCustomLink: PropTypes.func,
   loadingCustomLinksCreate: PropTypes.bool,
   handleUpdateCustomLinkFunc: PropTypes.func,
   customLinksReorder: PropTypes.func,
   authUser: PropTypes.object,
   loading: PropTypes.bool,

};

export default SchoolRoomNavigationSettings;
