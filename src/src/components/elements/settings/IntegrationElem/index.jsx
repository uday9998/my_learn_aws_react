import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import TextInput from 'components/elements/inputNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import LearnMoreButton from 'components/modules/learnMoreButton';
import Modal from 'components/elements/Modal';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import StripeDisconnectModalContent from './StripeDisconnectModalContent';

const IntegrationElem = ({
   title, image, subtitle, conected, isOpened, data, setIsOpened, id, onChange, onConnect,
   disabled, onDisconnect, isOauth, text, content, helpUri, error, loading, onErrorClear
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const [copyView, setCopyView] = useState(null);
   const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState({
      id: null,
      isOpen: false,
   });

   const toggleItem = () => {
      if (disabled) return;
      if (onErrorClear) onErrorClear();
      setIsOpened(id, !isOpened);
   };

   const handleConnectClick = () => {
      if (onErrorClear) onErrorClear();
      
      if (!Array.isArray(permissions)) {
         if (title === 'Zapier' && permissions['1000_zapier']) {
            toggleItem();
         } else if (title === 'Paypal' && permissions.paypal) {
            onConnect(id);
         } else if (isOauth && title !== 'Paypal' && title !== 'Zapier') {
            onConnect(id);
         } else if (title === 'Zapier' || title === 'Paypal') {
            setShowPopup(true);
            setPopupTitle(title);
         } else {
            toggleItem();
         }
      } else if (isOauth) {
         onConnect(id);
      } else {
         toggleItem();
      }
   };

   const stripeDeleteApproveClick = () => {
      onDisconnect('stripe');
      setIsStripeModalOpen(false);
   };

   const handleCopy = (elemId) => {
      const copyText = document.getElementById(elemId);
      const el = document.createElement('input');
      el.value = copyText.value;
      document.body.appendChild(el);

      el.select();
      el.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(el);
      setTimeout(
         () => setCopyView(elemId),
         0
      );
      setTimeout(
         () => setCopyView(null),
         800
      );
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   const handleInputChange = (inputName, value) => {
      if (onErrorClear) onErrorClear();
      onChange(inputName, value);
   };

   return (
      <React.Fragment>
         <div className='integrationElem integrationElemMob'>
            {
               showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
            }
            {isOpenDeleteModal.isOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                  closeOnClickOutside={ true }
                  onClose={ () => setIsOpenDeleteModal({ isOpen: false }) }
               >
                  <div>
                     <StripeDisconnectModalContent
                        title={ title }
                        cancelBtnText={ id === 'stripe' ? 'Learn More' : 'Cancel' }
                        learnMore={ () => {
                           if (id === 'stripe') { 
                              window.open('https://support.miestro.com/594449-How-to-Disconnect-Stripe', '_blank'); 
                           }
                           setIsOpenDeleteModal({ isOpen: false }); 
                        } }
                        onDisconnect={ () => onDisconnect(isOpenDeleteModal.id) }
                     />
                  </div>
               </Modal>
            )}
            <div className='integrationElem__left'>
               <div className='integrationElem__image'>
                  <img src={ image } alt='icon' />
               </div>
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  bold
                  inner={ title }
               />
            </div>
            <div className='integrationElem__middle'>
               <Text
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
                  bold
                  inner={ subtitle }
               />
            </div>
            <div className='integrationElem__button'>
               <div className='integration-buttons flex'>
                  {!!helpUri && <LearnMoreButton className='integrationButton' uri={ helpUri } />}
                  {
                     !conected ? (
                        <BaseButton
                           theme={ btnTheme.primary }
                           size={ btnSize.medium }
                           className='integrationButton'
                           text={ loading ? 'Connecting...' : 'Connect' }
                           id={ id }
                           style={ { padding: '8px 16px' } }
                           onClick={ handleConnectClick }
                           disabled={ disabled || loading }
                           IToolTipText={ disabled ? 'Only one card provider can be integrated simultaneously.' : '' }
                        />
                     ) : (
                        <div className={ id === 'stripe' ? 'stripe_btn integrationButton' : 'integrationButton' }>
                           <BaseButton
                              color='red'
                              size={ btnSize.medium }
                              style={ {
                                 padding: '8px', color: '#D12D36', border: '1px solid #D12D36', backgroundColor: 'inherit',
                              } }
                              text='Disconnect'
                              onClick={ id === 'stripe'
                                 ? () => setIsStripeModalOpen(true)
                                 : () => setIsOpenDeleteModal({ id, isOpen: true })
                              }
                           />
                        </div>
                     )
                  }
               </div>
            </div>
         </div>

         {error && (
            <div className='integrationElem__error' style={{
               backgroundColor: '#fee2e2',
               border: '1px solid #fecaca',
               borderRadius: '6px',
               padding: '12px',
               margin: '8px 0',
               color: '#dc2626',
               fontSize: '14px',
               display: 'flex',
               alignItems: 'center',
               gap: '8px'
            }}>
               <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9-3a1 1 0 11-2 0 1 1 0 012 0zM8 7.5a.5.5 0 01.5.5v3a.5.5 0 01-1 0V8a.5.5 0 01.5-.5z"/>
               </svg>
               <span>{error}</span>
            </div>
         )}

         {isOpened && data && (
            <div className='integrationElem__content'>
               {text && (
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner={ text }
                  />
               )}

               {data.map(({
                  label, name, field_value: fieldValue, placeholder, copy, field_disabled: fieldDisabled,
               }) => {
                  return (
                     <React.Fragment key={name}>
                        <TextInput
                           label={ label }
                           name={ name }
                           id={ name }
                           disabled={ fieldDisabled }
                           placeholder={ placeholder }
                           value={ fieldValue }
                           style={ { marginTop: '16px' } }
                           onChange={ handleInputChange }
                        />
                        {copy && (
                           <div className='copybtn'>
                              <BaseButton
                                 theme={ btnTheme.lightBlue }
                                 size={ btnSize.medium }
                                 text='Copy'
                                 style={ { margin: '10px 0' } }
                                 onClick={ () => handleCopy(name) }
                              />

                              { copyView === name
                            && <div className='copiedText'>Copied</div>
                              }
                           </div>
                        )
                        }
                     </React.Fragment>
                  );
               })}
               <div style={ { display: 'flex', justifyContent: 'flex-start' } }>
                  {title !== 'Zapier'
                  && (
                     <BaseButton
                        theme={ btnTheme.primary }
                        size={ btnSize.medium }
                        style={ { marginTop: '24px' } }
                        text={ loading ? 'Connecting...' : 'Connect' }
                        onClick={ () => onConnect(id) }
                        disabled={ disabled || loading }
                        IToolTipText={ disabled ? 'Only one card provider can be integrated simultaneously.' : '' }
                     />
                  )
                  }
               </div>
               {content}
            </div>
         )}
         {
            isStripeModalOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                  closeOnClickOutside={ true }
                  onClose={ () => setIsStripeModalOpen(false) }
               >
                  <div>
                     <StripeDisconnectModalContent
                        learnMore={ () => { window.open('https://support.miestro.com/594449-How-to-Disconnect-Stripe', '_blank'); setIsStripeModalOpen(false); } }
                        onDisconnect={ () => stripeDeleteApproveClick() }
                     />
                  </div>
               </Modal>
            )
         }
      </React.Fragment>
   );
};

IntegrationElem.propTypes = {
   title: PropTypes.string,
   subtitle: PropTypes.string,
   helpUri: PropTypes.string,
   image: PropTypes.string,
   conected: PropTypes.bool,
   data: PropTypes.any,
   isOpened: PropTypes.bool,
   setIsOpened: PropTypes.func,
   id: PropTypes.string,
   onChange: PropTypes.func,
   onConnect: PropTypes.func,
   disabled: PropTypes.any,
   onDisconnect: PropTypes.func,
   isOauth: PropTypes.bool,
   text: PropTypes.string,
   content: PropTypes.object,
   error: PropTypes.string,
   loading: PropTypes.bool,
   onErrorClear: PropTypes.func,
};

export default IntegrationElem;