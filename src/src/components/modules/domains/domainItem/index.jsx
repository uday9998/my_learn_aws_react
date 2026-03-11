/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './index.scss';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import Modal from 'components/elements/Modal';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
// import CheckBox from 'components/elements/form/CheckBox';

const apiUrl = process.env.REACT_APP_MAIN_DOMAIN;

const DomainItem = ({
   site, deleteSite, chooseSite, loginSite,
}) => {
   const [deleteSiteModalIsOpen, setDeleteSiteModalIsOpen] = useState(false);
   const [popupIsOpen, setPopupIsOpen] = useState(false);

   function openPopup(e) {
      e.stopPropagation();
      setPopupIsOpen(!popupIsOpen);
   }

   const delSiteModalClick = (e) => {
      e.stopPropagation();
      setDeleteSiteModalIsOpen(true);
   };

   const delSiteModalApproveClick = (e) => {
      e.stopPropagation();
      deleteSite(site.uuid);
      setDeleteSiteModalIsOpen(false);
   };

   return (
      <div className='domains__item'>
         <div className='domain__main_item'>
            <div className='name'>
               <Text
                  type={ textType.normal }
                  size={ textSizes.extraSmall }
                  // eslint-disable-next-line no-nested-ternary
                  inner={ site.name ? site.name : site.is_domain_pointed ? site.domain : `${ site.subdomain }.${ apiUrl }` }
                  color='#333333'
               />
            </div>
            <div className='item__group'>
               <div className='item__group1'>
                  <div className='cat'>
                     <Text
                        type={ textType.black }
                        size={ textSizes.extraSmall }
                        inner={ site.is_main ? 'Main Site' : 'Sub Site' }
                        color='#333333'
                     />
                  </div>
                  <div className='subname'>
                     <Text
                        type={ textType.regular }
                        size={ textSizes.extraSmall }
                        inner={ site.is_domain_pointed ? site.domain : `${ site.subdomain }.${ apiUrl }` }
                        color='#333333'
                     />
                  </div>
               </div>
               {!site.is_main
               && (
                  <div className='actions'>
                     <div title='Log in' style={ site.is_main ? { visibility: 'hidden' } : {} } onClick={ () => loginSite(site.uuid, `${ site.subdomain }.${ apiUrl }`) } role='presentation'>
                        <Icon name='Login' />
                     </div>
                     <div title='Edit' style={ site.is_main ? { visibility: 'hidden' } : {} } onClick={ () => chooseSite(site.uuid) } role='presentation'>
                        <Icon name='EditItem' />
                     </div>
                     <div title='Delete' style={ site.is_main ? { visibility: 'hidden' } : {} } onClick={ (e) => delSiteModalClick(e) } role='presentation'>
                        <Icon name='DeleteItem' />
                     </div>
                     {/* <CheckBox
                        name=''
                        label=''
                        filled
                        onChange={ () => {} }
                        checked={ false }
                     /> */}
                  </div>
               )
               }
            </div>
         </div>
         {!!site.is_main && <div className='mob-24-width' />}
         {!site.is_main && (
            <div className='mob_actions'>
               <div onClick={ (e) => openPopup(e) } role='presentation' className='dotes__mob'>
                  <Icon name='dotes' />
               </div>
               {popupIsOpen && (
                  <ClickOutside onClick={ (e) => openPopup(e) }>
                     <div className='action__container'>
                        <div title='Log in' onClick={ () => loginSite(site.uuid, `${ site.subdomain }.${ apiUrl }`) } role='presentation'>
                           <Icon name='Login' />
                        </div>
                        <div onClick={ () => chooseSite(site.uuid) } role='presentation'>
                           <Icon name='EditItem' />
                        </div>
                        <div onClick={ (e) => delSiteModalClick(e) } role='presentation'>
                           <Icon name='DeleteItem' />
                        </div>
                        {/* <CheckBox
                        name=''
                        label=''
                        filled
                        onChange={ () => {} }
                        checked={ false }
                     /> */}
                     </div>
                  </ClickOutside>
               )}
            </div>
         )}
         {
            deleteSiteModalIsOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                  onClose={ () => setDeleteSiteModalIsOpen(false) }
               >
                  <div>
                     <DeleteModalContent
                        onCancel={ () => { setDeleteSiteModalIsOpen(false); } }
                        onApprove={ (e) => { delSiteModalApproveClick(e); } }
                        title='Delete Domain'
                        content='Are you sure you want to delete this domain?'
                     />
                  </div>
               </Modal>
            )
         }

      </div>
   );
};

DomainItem.propTypes = {
   site: PropTypes.object,
   deleteSite: PropTypes.func,
   chooseSite: PropTypes.func,
   loginSite: PropTypes.func,
};
DomainItem.defaultProps = {

};

export default DomainItem;
