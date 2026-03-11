import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import IconButton from 'components/elements/buttons/IconButton';
import IconNew from 'components/elements/iconsSize';
import Input from 'components/elements/inputNew';
import Modal from 'components/elements/Modal';
import UploadModal from 'components/modules/UploadModal';
import { updateMyAccount } from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const UserModal = ({
   className, userData, setUserPopup, changeAuth,
}) => {
   const [user, setUser] = useState(
      {
         picture_src: userData.picture_src,
         about_me: userData.about_me,
      }
   );

   const [update] = useSubmitForm(updateMyAccount, {
      successMessage: 'Changes saved successfuly.',
   });

   const [isOpenUploadModal, setIsOpenUploadModal] = React.useState(false);

   const handleInputChange = (name, value) => {
      setUser({
         ...user,
         [name]: value,
      });
   };


   const onApprove = () => {
      if (user.picture_src && !user.picture_src?.includes('account/user.png')) {
         update(user, () => {
            setUserPopup(true);
            changeAuth(user);
         });
      } else if (isPrint('Profile picture is required.')) {
         return toast.error('Profile picture is required.');
      }
   };

   return (
      <Modal>
         <div className='user__modal'>
            <div className='user__modal__background' />
            <div className={ `user__modal__content ${ className }` }>
               <Text
                  inner='Complete Your Profile'
                  type={ txtTypes.medium }
                  size={ txtSizes.xxlarge }
               />
               <Text
                  inner='Communities feel weird without faces and names. Profiles build trust and spark connection with others.'
                  type={ txtTypes.medium }
                  size={ txtSizes.medium }
               />
               <div className='user__modal__content__img'>
                  <img src={ user.picture_src || 'http://miestro.com/images/account/user.png' } alt='' /> 
                  <div className='user__modal__content__img__edit' role='presentation' onClick={ () => setIsOpenUploadModal(true) }>
                     <IconNew name='AccountImageEditX' />
                  </div>
                  {user.picture_src && !user.picture_src?.includes('account/user.png') && (
                     <div className='user__modal__content__img__cancel'>
                        <IconButton
                           text=''
                           name='AccountRemoveImageM'
                           onClick={ () => handleInputChange('picture_src', 'http://miestro.com/images/account/user.png') }
                        />
                     </div>
                  )}
               </div>
               <Input
                  type='textarea'
                  value={ user.about_me }
                  onChange={ handleInputChange }
                  label='About Me'
                  name='about_me'
                  placeholder='Tell us about yourself'
               />
               <div className='user__modal__content__footer'>
                  <BaseButton
                     text='Complete'
                     theme={ btnTheme.primary }
                     size={ btnSize.full }
                     onClick={ () => onApprove() }
                  />
               </div>
            </div>
         </div>
         {isOpenUploadModal && (
            <UploadModal
               cropRatio={ true }
               onChange={ (value) => { handleInputChange('picture_src', value); setIsOpenUploadModal(false); } }
               fileLessonFormat='image'
               isAmazonFile={ true }
               onCloseModal={ () => setIsOpenUploadModal(false) }
            />
         )}
      </Modal>
   );
};


UserModal.propTypes = {
   className: PropTypes.string,
   userData: PropTypes.object,
   setUserPopup: PropTypes.func,
   changeAuth: PropTypes.func,
};

export default UserModal;
