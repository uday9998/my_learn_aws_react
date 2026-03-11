import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import Upload from 'components/modules/uploadWithoutS3';
import moment from 'moment';
// import Tabs from 'components/elements/tabs';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import ImageView from 'components/elements/ImageView';
import downloadSample from 'assets/images/downloadSample.png';
import Icon from 'components/elements/Icon';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';
import { getProperlyPlanNameMember } from 'utils/Plans';
import { copyToClipBoard } from 'utils/copy';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import SliceAndConnectText from 'utils/getSplitedText';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { changeMemberPassword } from 'api';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { getRole } from '../membersTypeSecond/Member';
import MemberChangePasswordModal from '../memberChangePasswordModal';


export const BulkImportModal = ({ onChange, file, isCommunityMember }) => {
   const downloadSampleClick = () => {
      let csv = 'Name,E-Mail,Role,Class name1,Class name2,Class name3,Class name4,Class name5\n';
      if (isCommunityMember) {
         csv = 'Name,Email\n';
      }
      const hiddenElement = document.createElement('a');
      hiddenElement.href = `data:text/csv;charset=utf-8,${ encodeURI(csv) }`;
      hiddenElement.target = '_blank';
      hiddenElement.download = 'sample.csv';
      hiddenElement.click();
   };
   return (
      <div className='bulk__import'>
         <div className='bulk__import__title'>
            <Text
               inner='Bulk Import'
               size={ textSizes.xxlarge }
               style={ { color: '#131F1E' } }
               type={ textTypes.medium }
            />
         </div>
         <div className='bulk__import__subtitle'>
            <Text
               inner='Download csv sample, and upload'
               size={ textSizes.small }
               style={ { color: '#727978' } }
               type={ textTypes.regularDefault }
            />
         </div>
         <div className='bulk__import__download'>
            <div className='download__title'>
               <Text
                  inner='Sample CSV File'
                  size={ textSizes.small }
                  style={ { color: '#131F1E' } }
                  type={ textTypes.regularDefault }
               />
            </div>
            <div className='download__back'>
               <img src={ downloadSample } alt='' />
               <BaseButton
                  theme={ btnTheme.primary }
                  text='Download Sample.csv'
                  iconName='Bulk'
                  isIconRight={ true }
                  className='download__back__absolute'
                  onClick={ downloadSampleClick }
               />
            </div>
         </div>
         <div className='bulk__import__upload'>
            <Text
               inner='CSV file'
               size={ textSizes.small }
               style={ { color: '#24554E' } }
               type={ textTypes.regularMin }
            />
            {file && file.name && (
               <Text
                  inner={ file.name }
                  size={ textSizes.small }
                  style={ { color: '#131F1E' } }
                  type={ textTypes.regularDefault }
               />
            )}
            <Upload text='CSV' fileTypes='csv' onChange={ onChange } />
         </div>
      </div>
   );
};

export const AddMemberModal = ({
   errorMessages, removeErrorMessage, inputs, setInputs,
   selectedVariant, setSelectedVariant, setIsOpenChangeModal, coursesOption,
}) => {
   const coursesOptions = [];
   coursesOption.map(item => coursesOptions.push({ label: item.name, value: item.id }));
   const inputVariants = [
      { key: 'Add Via Email', value: 0 },
      { key: 'Invite By Link', value: 1 },
   ];
   const link = 'miestro.net/invite/nm2938q2lkcasd9280123';
   const roles = [
      { label: 'Member', value: 0 },
      { label: 'Administrator', value: 2 },
      { label: 'Assistant', value: 3 },
      { label: 'Support Specialist', value: 4 },
   ];
   const handleInputChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setInputs({
         ...inputs,
         [name]: value,
      });
   };
   return (
      <div className='add__member__content'>
         <div className='add__member__content__top'>
            <Text
               inner='Add Member'
               size={ textSizes.xxlarge }
               style={ { color: '#131F1E' } }
               type={ textTypes.medium }
            />
            <Text
               inner='Enter info about new member'
               size={ textSizes.small }
               style={ { color: '#727978' } }
               type={ textTypes.regularDefault }
            />
         </div>
         {/* <Tabs
            variants={ inputVariants }
            selectedVariant={ selectedVariant }
            onSelect={ (value) => setSelectedVariant(value) }
         /> */}
         {!selectedVariant && inputs.picture_src && (
            <ImageView
               src={ inputs.picture_src }
               setIsOpenChangeModal={ setIsOpenChangeModal }
               clear={ () => setInputs({ ...inputs, picture_src: null }) }
               onChange={ (url) => setInputs({ ...inputs, picture_src: url }) }
            />
         )}
         {!selectedVariant && !inputs.picture_src && (
            <Upload
               isOptional={ true }
               label='Profile Picture'
               fileLessonFormat='image'
               isAmazonFile={ true }
               text='Image'
               onChange={ (url) => setInputs({ ...inputs, picture_src: url }) }
               isImageUpload={ true }
            />
         )}
         {selectedVariant ? (
            <div className='add__member__inputs'>
               <Select label='Member Role' type='select-large' options={ roles } value={ inputs.role } onChange={ handleInputChange } name='role' />
               <Select label='Add To Class Below' type='select-large' options={ coursesOptions } value={ inputs.course } onChange={ handleInputChange } name='course' />
               <div className='add__member__link'>
                  <div className='add__member__link__top'>
                     <Text
                        inner='Invite Link'
                        type={ textTypes.regularDefault }
                        size={ textSizes.small }
                     />
                     <Text
                        inner='Share This Link'
                        type={ textTypes.regularLarge }
                        style={ { color: '#727978' } }
                        size={ textSizes.xsmall }
                     />
                  </div>
                  <div className='add__member__link__content'>
                     <Text
                        inner={ link }
                        type={ textTypes.regularDefault }
                        style={ { color: '#727978' } }
                        size={ textSizes.small }
                     />
                     <Icon name='copyNew' onClick={ () => { copyToClipBoard(link); } } />
                  </div>
               </div>
            </div>
         ) : (
            <div className='add__member__inputs'>
               <Input
                  errorMessages={ errorMessages.name }
                  type='text'
                  isAnimatedLabel={ false }
                  helpText={ `${ (inputs.name || '').length }/30` }
                  maxlength={ 30 }
                  value={ inputs.name }
                  label='Full Name'
                  name='name'
                  onChange={ handleInputChange }
                  placeholder='Enter Your Full Name'
               />
               <Input
                  errorMessages={ errorMessages.email }
                  type='email'
                  isAnimatedLabel={ false }
                  value={ inputs.email }
                  label='Email Address'
                  name='email'
                  onChange={ handleInputChange }
                  placeholder='Enter Your Email Address'
               />
               <Input
                  errorMessages={ errorMessages.password }
                  type='text'
                  isAnimatedLabel={ false }
                  value={ inputs.password }
                  label='Password'
                  name='password'
                  onChange={ handleInputChange }
                  placeholder='Create Your Password'
               />
               <Input
                  errorMessages={ errorMessages.password_confirmation }
                  type='text'
                  isAnimatedLabel={ false }
                  value={ inputs.password_confirmation }
                  label='Confirm Password'
                  name='password_confirmation'
                  onChange={ handleInputChange }
                  placeholder='Confirm Your Password'
               />
               <ErrorMessageWrapper errorMessages={ errorMessages.role }>
                  <Select
                     label='Member Role'
                     type='select-large'
                     options={ roles }
                     value={ inputs.role }
                     onChange={ handleInputChange }
                     name='role'
                  />
               </ErrorMessageWrapper>
            </div>
         )}
      </div>
   );
};

export const MemberInfo = ({
   member, setPopupType, onEdit, onDelete, status,
}) => {
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);

   const [changePassword] = useSubmitForm(changeMemberPassword);
   const [passwordInputs, setPasswordInputs] = useState({
      password: '',
      password_confirmation: '',
   });
   const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] = React.useState(false);

   const handlePasswordInputChange = (name, value) => {
      setPasswordInputs({
         ...passwordInputs,
         [name]: value,
      });
   };

   const handleChangePassword = () => {
      return changePassword(
         [member.id, passwordInputs],
         () => {
            if (isPrint('The member has been updated.')) {
               toast.success('The member has been updated.');
            }
            setPasswordInputs({});
            setIsOpenChangePasswordModal(false);
         },
         () => true
      );
   };

   return (
      <>
         <div className='member__modal__content'>
            <div className='member__modal__content__background' />
            <div className='member__modal__top'>
               <img src={ member.picture_src || member.picture_full_src } alt='' className='member__image' />
               <div className='member__modal__top__right'>
                  <div className='modal-flex'>
                     <Text
                        inner={ SliceAndConnectText(member.name, 20) }
                        type={ textTypes.medium }
                        size={ textSizes.xxlrage }
                     />
                     <div className={ `modal__status modal__status__${ status }` }>
                        <Text
                           inner={ status === 'Active' ? 'Online' : 'Offline' }
                           type={ textTypes.regularDefault }
                           size={ textSizes.small }
                           style={ { color: status === 'Active' ? '#24554E' : '#444C4B' } }
                        />
                     </div>
                  </div>
                  {/* <div className='modal-flex'>
                  <Text
                     inner={ member.email }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     style={ { color: '#727978' } }
                  />
                  <Icon name='copyNew' onClick={ () => copyToClipBoard(member.email) } />
               </div> */}
               </div>
            </div>
            {/* <div className='view__full__profile' role='presentation' onClick={ () => handleSelect(member.id) }>
            <Text
               inner='View Full Profile'
               type={ textTypes.regularMin }
               size={ textSizes.xsmall }
               style={ { color: '#3060BD' } }
            />
         </div> */}
            {/* <div className='modal__line' /> */}
            <div className='modal-flex'>
               {/* <ButtonDropdown
               inner='Password'
               theme={ dropThemes.secondary }
            >
               <ButtonDropdown.Item text='Send' onClick={ () =>  } />
               <ButtonDropdown.Item text='Reset' onClick={ () =>  } />
            </ButtonDropdown> */}
               <BaseButton
                  text='Grant Offer'
                  onClick={ () => setPopupType('grant') }
               />
               <BaseButton
                  text='Assign Role'
                  theme={ btnTheme.secondary }
                  onClick={ () => setPopupType('role') }
               />
            </div>
            <div className='modal__line' />
            <div className='member__edit__buttons'>
               <div className='member__edit__button' role='presentation' onClick={ () => setPopupType('note') }>
                  <Icon name='NoteNew' />
               </div>
               <div className='member__edit__button' role='presentation' onClick={ () => setPopupType('tag') }>
                  <Icon name='TagEdit' />
               </div>
               <div className='member__edit__button' role='presentation' onClick={ () => onEdit() }>
                  <Icon name='PopupEdit' />
               </div>
               <div className='member__edit__button member__edit__triangle' role='presentation' onClick={ () => setIsOpenTriangle(!isOpenTriangle) }>
                  <div className='member__edit__triangle__button'>
                     <Icon name='PopupDots' />
                  </div>
                  {isOpenTriangle && (
                     <ClickOutside onClick={ () => setIsOpenTriangle(false) }>
                        <div className='member__edit__triangle__content'>
                           <div
                              className='member__edit__triangle__item'
                              role='presentation'
                              onClick={ () => {
                                 setIsOpenTriangle(false);
                                 setIsOpenChangePasswordModal(true);
                              } }
                           >
                              <Icon name='LockNew' />
                              <Text
                                 inner='Change Password'
                                 type={ textTypes.regularDefault }
                                 size={ textSizes.small }
                              />
                           </div>
                           {/* <div className='member__edit__triangle__item'>
                           <Icon name='PopupChangePassword' />
                           <Text
                              inner='Mute'
                              type={ textTypes.regularDefault }
                              size={ textSizes.small }
                           />
                        </div>
                        <div className='member__edit__triangle__item'>
                           <Icon name='PopupPause' />
                           <Text
                              inner='Pause'
                              type={ textTypes.regularDefault }
                              size={ textSizes.small }
                           />
                        </div> */}
                           <div className='member__edit__triangle__item member__edit__triangle__item__delete' role='presentation' onClick={ () => onDelete() }>
                              <Icon name='TrashMember' />
                              <Text
                                 inner='Delete'
                                 type={ textTypes.regularDefault }
                                 style={ { color: '#D12D36' } }
                                 size={ textSizes.small }
                              />
                           </div>
                        </div>
                     </ClickOutside>
                  )}
               </div>
            </div>
            <div className='member__info'>
               <div className='member__info__start member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Member Email'
                  />
                  <div className='member__info__flex'>
                     <div className='member__info__flex__title'>
                        <Text
                           type={ textTypes.regular148 }
                           size={ textSizes.medium }
                           inner={ member.email }
                        />
                     </div>
                     <Icon name='copyNew' onClick={ () => { copyToClipBoard(member.email); } } />
                  </div>
               </div>
               <div className='member__info__start member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Member Since'
                  />
                  <Text
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner={ moment(member.created_at).format('MMM D, YYYY, HH:mm') }
                  />
               </div>
            </div>
            <div className='modal__line' />
            <div className='member__info'>
               <div className='member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Subscripton Level'
                  />
                  <div className='member__info__level'>
                     <Text
                        inner={ getProperlyPlanNameMember(member.plan_name) }
                        style={ { color: '#A61C23' } }
                        size={ textSizes.medium }
                        type={ textTypes.regular148 }
                     />
                  </div>
               </div>
               <div className='member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Roles'
                  />
                  <div className='member__info__role'>
                     <Text
                        inner={ getRole(member.role) }
                        style={ { color: '#3060BD' } }
                        size={ textSizes.medium }
                        type={ textTypes.regular148 }
                     />
                  </div>
               </div>
               <div className='member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Last Sign In'
                  />
                  <Text
                     inner={ member.last_login_at ? moment(member.last_login_at).format('MMM D, YYYY, HH:mm') : '-' }
                     size={ textSizes.medium }
                     type={ textTypes.regular148 }
                  />
               </div>
               <div className='member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Total Sign-Ins'
                  />
                  <Text
                     inner={ member.logins_count }
                     size={ textSizes.medium }
                     type={ textTypes.regular148 }
                  />
               </div>
               <div className='member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Purchases'
                  />
                  <Text
                     inner={ member.payments_count }
                     size={ textSizes.medium }
                     type={ textTypes.regular148 }
                  />
               </div>
               <div className='member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Revenue'
                  />
                  <Text
                     inner={ member.payments_sum_amount ? `$${ member.payments_sum_amount }` : '-' }
                     size={ textSizes.medium }
                     type={ textTypes.regular148 }
                  />
               </div>
               <div className='member__info__column'>
                  <Text
                     style={ { color: '#727978' } }
                     type={ textTypes.regular148 }
                     size={ textSizes.medium }
                     inner='Last Transaction'
                  />
                  <Text
                     inner={ member.latest_payments ? `$${ member.latest_payments.amount }` : '-' }
                     size={ textSizes.medium }
                     type={ textTypes.regular148 }
                  />
               </div>
            </div>
            {/* <div className='member__tags'>
            <div className='modal__line' />
            <div className='member__tags__content'>
               <div className='member__tags__content__title'>
                  <Text
                     inner='Tags'
                     type={ textTypes.regularDefault }
                     size={ textSizes.small }
                  />
               </div>
               <div className='member__tags__flex'>
                  {member.tags && member.tags.map((tag) => [
                     <div className='member__tag' key={ uniqueId() }>
                        <Text
                           inner={ tag.name }
                           type={ textTypes.regularDefault }
                           size={ textSizes.small }
                           style={ { color: '#444C4B' } }
                        />
                        <Icon
                           name='RemoveTagNew'
                           onClick={ () => {
                              detachTag(member.id, tag.id);
                              closeModal();
                           } }
                        />
                     </div>,
                  ])}
                  <div className='member__tags__add'>
                     <div>
                        <Icon name='AddTagNew' />
                        <Text
                           inner='Add Tag'
                           type={ textTypes.regularDefault }
                           size={ textSizes.small }
                           style={ { color: '#444C4B' } }
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className='modal__line' />
         </div> */}
            {/* <div className='member__analytics'>
            <Text
               inner='Analytics'
               type={ textTypes.mediumSmall }
               size={ textSizes.large }
            />
            <div className='modal-flex'>
               <div className='member__bottom__block'>
                  <Text
                     inner='Subscription Level'
                     style={ { color: '#727978' } }
                     size={ textSizes.xsmall }
                     type={ textTypes.regular148 }
                  />
                  <div className='member__bottom__block__level'>
                     <Text
                        inner={ getProperlyPlanNameMember(member.plan_name) }
                        style={ { color: '#A61C23' } }
                        size={ textSizes.xsmall }
                        type={ textTypes.regular148 }
                     />
                  </div>
               </div>
               <div className='member__bottom__block'>
                  <Text
                     inner='Roles'
                     style={ { color: '#727978' } }
                     size={ textSizes.xsmall }
                     type={ textTypes.regular148 }
                  />
                  <div className='member__bottom__block__role'>
                     <Text
                        inner={ getRole(member.role) }
                        style={ { color: '#8830BD' } }
                        size={ textSizes.xsmall }
                        type={ textTypes.regular148 }
                     />
                  </div>
               </div>
               <div className='member__bottom__block'>
                  <Text
                     inner='Roles'
                     style={ { color: '#727978' } }
                     size={ textSizes.xsmall }
                     type={ textTypes.regular148 }
                  />
                  <div className='member__bottom__block__role'>
                     <Text
                        inner={ getRole(member.role) }
                        style={ { color: '#8830BD' } }
                        size={ textSizes.xsmall }
                        type={ textTypes.regular148 }
                     />
                  </div>
               </div>
            </div>
         </div> */}
         </div>
         {
            isOpenChangePasswordModal && (
               <MemberChangePasswordModal
                  handleInputChange={ handlePasswordInputChange }
                  inputs={ passwordInputs }
                  onConfirm={ () => handleChangePassword() }
                  onCloseModal={ () => {
                     setIsOpenChangePasswordModal(false);
                     setPasswordInputs({});
                  } }
               />
            )
         }
      </>
   );
};

BulkImportModal.propTypes = {
   onChange: PropTypes.func,
   file: PropTypes.object,
   isCommunityMember: PropTypes.bool,
};
AddMemberModal.propTypes = {
   errorMessages: PropTypes.object,
   removeErrorMessage: PropTypes.func,
   coursesOption: PropTypes.array,
   inputs: PropTypes.object,
   setIsOpenChangeModal: PropTypes.func,
   setInputs: PropTypes.func,
   setSelectedVariant: PropTypes.func,
   selectedVariant: PropTypes.any,
};
MemberInfo.propTypes = {
   onEdit: PropTypes.func,
   member: PropTypes.object,
   setPopupType: PropTypes.func,
   onDelete: PropTypes.func,
   status: PropTypes.string,
};
