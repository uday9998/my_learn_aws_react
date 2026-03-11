import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SocialDataJson from 'utils/socials.json';
import Select from 'components/elements/SelectNew';
import './index.scss';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateSocialLinks } from 'api';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const links = {
   facebook: 'https://www.facebook.com/',
   pinterest: 'https://www.pinterest.com/',
   youtube: 'https://www.youtube.com/',
   linkedin: 'https://www.linkedin.com/in/',
   tumblr: 'https://www.tumblr.com/',
   tiktok: 'https://www.tiktok.com/',
   instagram: 'https://www.instagram.com/',
   other: 'https://www.',
};

const linkIcons = {
   facebook: 'FaceBookM',
   pinterest: 'PinterestM',
   youtube: 'YoutubeM',
   linkedin: 'LinkedingM',
   tumblr: 'TumblrM',
   tiktok: 'TikTokM',
   instagram: 'InstagramM',
   other: 'DefaultSocial',
};

const linkNames = {
   facebook: 'Facebook',
   pinterest: 'Pinterest',
   youtube: 'Youtube',
   linkedin: 'Linkedin',
   tumblr: 'Tumblr',
   tiktok: 'TikTok',
   instagram: 'Instagram',
};

const getNextOtherNumber = (links) => {
   const otherKeys = Object.keys(links).filter(key => key.startsWith('other') && links[key]);
   const otherNumbers = otherKeys.map(key => parseInt(key.replace('other', ''), 10)).filter(Number.isFinite);

   if (otherNumbers.length === 0) return 1;

   otherNumbers.sort((a, b) => a - b);

   for (let i = 1; i <= otherNumbers.length; i++) {
      if (otherNumbers[i - 1] !== i) {
         return i;
      }
   }

   return otherNumbers[otherNumbers.length - 1] + 1;
};

const MyAccountSettingsSocial = ({ socialData, handleSocialChange, t }) => {
   const [isEdit, setIsEdit] = useState(false);
   const [editInputText, setEditInputText] = useState('');
   const [newSocial, setNewSocial] = useState({
      account: '',
      link: '',
      isEdit: false,
   });
   const [update] = useSubmitForm(updateSocialLinks);
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState({
      isOpen: false,
      id: null,
   });

   const currentOtherNumber = getNextOtherNumber(socialData);

   const getSelectOptions = () => {
      const options = SocialDataJson.filter((item) => !socialData[item.value]);

      options.push({ label: 'Other', value: 'other' });

      return options;
   };

   const handleDeleteSocialLink = (name) => {
      update({
         [name]: null,
      }, () => {
         handleSocialChange(name, null);
         setIsOpenDeleteModal({ id: null, isOpen: false });
         const deleteMessage = 'Link has been deleted.';
         if (isPrint(deleteMessage)) {
            toast.success(deleteMessage);
         }
      });
   };

   const allLinks = Object.keys(socialData);

   const editInput = (defaultVal = newSocial.link, editStatus = true) => {
      setEditInputText(defaultVal);
      setIsEdit(editStatus);
   };

   const handleAccept = () => {
      setNewSocial(prevState => {
         return {
            ...prevState,
            link: editInputText,
         };
      });
      editInput(editInputText, false);
   };

   const handleCloseEdit = () => {
      editInput(newSocial.link, false);
   };

   const handleChangeLink = (e) => {
      setEditInputText(e.target.value);
   };

   const chooseSocialPlatform = (_, socialPlatValue) => {
      const accountName = socialPlatValue === 'other' ? `other${ currentOtherNumber }` : socialPlatValue;

      setNewSocial({
         ...newSocial,
         account: accountName,
         link: links[socialPlatValue],
      });
      editInput(links[socialPlatValue], true);
   };

   const handleAddSocialMedia = () => {
      handleAccept();

      const messageWord = newSocial.isEdit ? 'updated' : 'added';
      const messageText = `Link has been ${ messageWord }.`;

      update({
         [newSocial.account]: editInputText,
      }, () => {
         handleSocialChange(newSocial.account, editInputText);
         if (isPrint(messageText)) {
            toast.success(messageText);
         }
      });

      setNewSocial({
         account: '',
         link: '',
         isEdit: false,
      });
   };

   const openLink = (linkName, addedLink) => {
      const linkDataKey = linkName.includes('other') ? 'other' : linkName;
      const mainLink = links[linkDataKey];

      const finalUrl = addedLink.startsWith(mainLink) ? addedLink : `${ links[linkDataKey] }${ addedLink }`;

      window.open(finalUrl, '_blank');
   };

   return (
      <div className='settings__social'>
         {isOpenDeleteModal.isOpen && (
            <DeleteModal
               title='Are you sure you want to delete the link ?'
               onDelete={ () => handleDeleteSocialLink(isOpenDeleteModal.id) }
               deleteText='Delete'
               onCancel={ () => setIsOpenDeleteModal({ id: null, isOpen: false }) }
            />
         )}
         <div className='settings__social__top'>
            {!newSocial.isEdit && (
               <Select
                  options={ getSelectOptions() }
                  value={ newSocial.account }
                  onChange={ chooseSocialPlatform }
                  label='Social Accounts'
                  placeholder='Enter Social Account'
                  type='select-medium'
               />
            )}
            {newSocial.account && (
               <div className='flex flex-col' style={ { gap: '8px', width: '100%' } }>
                  <Text
                     inner='Link'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <div className='settings__social__top__input'>
                     {
                        !isEdit ? (
                           <div className='preview__wrapper'>
                              <Text
                                 inner={ newSocial.link }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                              />
                              {/*                                                      don't send any arguments */}
                              <div className='icon__wrapper' role='presentation' onClick={ () => editInput() }>
                                 <IconNew name='RenameCategoryM' />
                              </div>
                           </div>
                        ) : (
                           <div className='editable__wrapper'>
                              <input type='text' value={ editInputText } onChange={ handleChangeLink } />
                              <div className='icons__wrapper'>
                                 <div role='presentation' onClick={ handleCloseEdit }>
                                    <IconNew name='CategoryDecline' />
                                 </div>
                                 <div role='presentation' onClick={ handleAccept }>
                                    <IconNew name='CategoryAccept' />
                                 </div>
                              </div>
                           </div>
                        )
                     }
                     
                     {/* <input type='text' placeholder='...' maxLength={ 50 } value={ newSocial.link } onChange={ (e) => setNewSocial({ ...newSocial, link: e.target.value }) } /> */}
                  </div>
               </div>
            )}
            <BaseButton
               text={ newSocial.isEdit ? 'Save' : 'Add' }
               onClick={ handleAddSocialMedia }
               disabled={ !newSocial.account }
            />
         </div>
         {allLinks.map((linkName) => {
            const isOther = linkName.includes('other');
            const iconName = isOther ? linkIcons.other : linkIcons[linkName];
            const linkText = isOther ? 'Other' : linkNames[linkName];
            const addedLink = socialData[linkName];

            if (addedLink === null) return null;
            return (
               <div className='settings__social__item' key={ linkName }>
                  <div className='settings__social__item__left'>
                     <IconNew name={ iconName } />
                     <Text
                        inner={ linkText }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                     <Text
                        inner={ addedLink }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        onClick={ () => openLink(linkName, addedLink) }
                        style={ { color: '#727978', cursor: 'pointer' } }
                     />
                  </div>
                  <DropTriggle
                     activeStyles={ {
                        background: '#E8F2F1',
                        boxShadow: '0px 0px 4px #54938B',
                        border: '1px solid #36796F',
                        borderRadius: '8px',
                     } }
                     options={ [
                        {
                           trash: false,
                           iconName: 'EditMediaM',
                           name: 'Edit',
                           onClick: () => {
                              setNewSocial({
                                 isEdit: true,
                                 link: addedLink,
                                 account: linkName,
                              });
                              editInput(addedLink, true);
                           },
                        },
                        {
                           iconName: 'AffiliateDeleteM',
                           name: 'Delete',
                           trash: true,
                           onClick: () => setIsOpenDeleteModal({ isOpen: true, id: linkName }),
                        },
                     ] }
                  />
               </div>
            );
         })}
      </div>
   );
};

MyAccountSettingsSocial.propTypes = {
   handleSocialChange: PropTypes.func,
   socialData: PropTypes.func,
};

export default MyAccountSettingsSocial;
