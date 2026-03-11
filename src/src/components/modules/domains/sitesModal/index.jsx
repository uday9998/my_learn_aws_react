import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Modal from 'components/elements/Modal';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const apiUrl = process.env.REACT_APP_MAIN_DOMAIN;

const SitesModal = ({
   setIsModalOpen, addSite, handleSiteInputChange, currentSite,
}) => {
   const [copyView, setCopyView] = useState(null);

   // const languages = [
   //    { value: 'English', label: 'English' },
   //    { value: 'Italian', label: 'Italian' },
   // ];

   function copyCodeToClipboard(text, id) {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setTimeout(
         () => setCopyView(id),
         0
      );
      setTimeout(
         () => setCopyView(null),
         800
      );
   }

   return (
      <Modal
         blurColor='rgba(63, 79, 101, 0.6)'
         contentBgColor='white'
         contentPosition='center'
         contentWidth={ window.innerWidth >= 1024 ? '648px' : '80%' }
         closeOnClickOutside={ true }
         onClose={ () => setIsModalOpen(false) }
      >
         <div className='sitesModal'>
            <div className='sitesModal__header'>
               <Text
                  type={ TextType.demiBold }
                  size={ TextSize.large }
                  inner='Sites'
               />
               <div
                  className='sitesModal__close'
                  role='presentation'
                  onClick={ () => setIsModalOpen(false) }
               >
                  <Icon name='CloseXNew' />
               </div>
            </div>
            <div className='sitesModal__content'>
               <div className='m-t-m'>
                  <TextInput
                     placeholder='Type here your portal name'
                     label='Portal Name'
                     type='text'
                     name='name'
                     value={ currentSite.name }
                     onChange={ (name, value) => handleSiteInputChange(name, value) }
                     maxlength='200'
                  />
               </div>
               {
                  currentSite && currentSite.domain && currentSite.is_domain_pointed
                     ? (
                        <div className='m-t-exl p-t-exl subdomain'>
                           <div className='language__input'>
                              <TextInput
                                 id='subdomain'
                                 label=''
                                 name='subdomain'
                                 value={ currentSite.domain }
                                 disabled={ true }
                              />
                              <div
                                 className='copy-button'
                                 title='copy'
                                 role='presentation'
                                 onClick={ () => copyCodeToClipboard(`https://${ currentSite.domain }`, 'subdomain') }
                              >
                                 <Icon name='Copy' />
                              </div>
                              { copyView === 'subdomain'
                                 && <div className='copiedText'>Copied</div>
                              }
                           </div>
                        </div>
                     ) : (
                        <div className='m-t-exl p-t-exl subdomain'>
                           <div className='language__input'>
                              <TextInput
                                 id='subdomain'
                                 label=''
                                 placeholder='Site Name'
                                 name='subdomain'
                                 value={ currentSite.subdomain }
                                 onChange={ (name, value) => handleSiteInputChange(name, value) }
                                 maxlength='80'
                              />
                              <div
                                 className='copy-button'
                                 title='copy'
                                 role='presentation'
                                 onClick={ () => copyCodeToClipboard(`${ currentSite.subdomain }.miestro.com`, 'subdomain') }
                              >
                                 <Icon name='Copy' />
                              </div>
                              { copyView === 'subdomain'
                                 && <div className='copiedText'>Copied</div>
                              }
                           </div>
                           <div className='site__url'>
                              <Text
                                 type={ TextType.demiBold }
                                 size={ TextSize.medium }
                                 inner={ `.${ apiUrl }` }
                              />
                           </div>
                        </div>
                     )
               }

               {/* <div className='m-t-exl sitesModal__select'>
                  <Select
                     label='Language'
                     placeholder='Select language'
                     iconColor='#3f4f65'
                     name='language'
                     // value={ inputs.target }
                     options={ languages }
                     //   onChange={ onChange }
                     icon='TriangleDown'
                  />
               </div> */}
               <div className='p-t-exl sitesModal__footer'>
                  <div>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Cancel'
                        onClick={ () => setIsModalOpen(false) }
                     />
                  </div>
                  <div>
                     <BaseButton
                        size={ btnSize.large }
                        text='Save'
                        onClick={ () => addSite() }
                        // disabled={ isButtonDisabled }
                     />
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

SitesModal.propTypes = {
   setIsModalOpen: PropTypes.func,
   addSite: PropTypes.func,
   handleSiteInputChange: PropTypes.func,
   currentSite: PropTypes.object,
};

SitesModal.defaultProps = {
};

export default SitesModal;
