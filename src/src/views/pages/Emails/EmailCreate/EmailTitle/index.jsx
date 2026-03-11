import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import MultiSelect from 'components/elements/form/MultiSelect';
import GeneratorModal from 'components/elements/GeneratorModal';
import { useHistory } from 'react-router';

import './index.scss';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const EmailTitle = ({
   fields,
   formData = {},
   getAdminEmailsInProgress = false,
   emails = [],
   getUsersEmailsInProgress,
   onEmailChange,
   filterOptions,
   onAddValue,
   onRemoveValue,
   selectedFilters,
   getFilterOptionsInProgress,
   showFilters,
   subject,
   setSubject,
   errorMessages
}) => {
   const history = useHistory();
   const statuses = [
      { color: 'grey', text: 'Unpublished', iconName: 'UnpublishedPlanS' },
      { color: 'green', text: 'Published', iconName: 'PublishedPlanS' },
   ];

   const [openModal, setOpenModal] = useState({
      name: '',
      value: '',
      isOpen: false,
   });

   return (
      <div className='email__title'>
         <div className='email__title__content'>
            <div className='email__flex'>
               <div>
                  <div>
                     <Text
                        inner='New Email'
                        size={ TextSize.xlarge }
                        type={ TextType.regularDefaultSmallX }
                     />
                  </div>
                  <div>
                     <Text
                        inner="If you'd like to send from a different email address, manage senders "
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small_14 }
                     />
                     <Text
                        inner='here'
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small_14 }
                        style={ { cursor: 'pointer', textDecoration: 'underline', color: '#24554E' } }
                        onClick={ () => history.push(
                           {
                              pathname: '/admin/settings',
                              hash: '#emails',
                           }) }
                     />
                     <Text
                        inner='.'
                        type={ TextType.regularDefaultGrey }
                        size={ TextSize.small_14 }
                     />
                  </div>
               </div>
               <SimpleStatus
                  { ...statuses[0] }
               />
            </div>
            <div className='grey_line' />
            <div
               className='email__flex'
            >
               <Select
                  type='select-medium'
                  // placeholder='Select Recipients'
                  label={ fields.option.label }
                  placeholder={ fields.option.placeholder }
                  name='category'
                  value={ formData.category ? formData.category : 'Courses' }
                  options={ fields.option.options }
                  iconColor={ fields.option.iconColor }
                  onChange={ (name, value) => onEmailChange(name, value) }
                  disabled={ getFilterOptionsInProgress }
               />
               { showFilters && (
                  <>
                     { !getFilterOptionsInProgress
                        ? (
                           <ErrorMessageWrapper hideMessages errorMessages={ errorMessages.options }>
                              <MultiSelect
                                 values={ selectedFilters || [] }
                                 onAddValue={ onAddValue }
                                 onRemoveValue={ onRemoveValue }
                                 placeholder={ Object.keys(filterOptions).length === 0 ? `No ${ formData.category === 'Courses' ? 'Classes' : 'Tags' } to Choose` : fields.type.placeholder }
                                 iconColor={ fields.type.iconColor }
                                 selectedValues={ selectedFilters }
                                 options={ Object.keys(filterOptions) }
                                 style={ { height: '47px' } }
                              />
                           </ErrorMessageWrapper>
                        )
                        : (
                           <div className='m-l-exl loader-spinner'>
                              <LoaderSpinner width={ 100 } heigth={ 100 } />
                           </div>
                        )
                     }
                  </>
               ) }
            </div>
            <div>
               <Input
                  errorMessages={ errorMessages.subject }
                  value={ subject }
                  name='subject'
                  placeholder='Enter your email subject here'
                  label='Subject Line'
                  withIcon={ true }
                  iconName='Generator'
                  setOpenModal={ (name, value) => setOpenModal({ name, value, isOpen: true }) }
                  IToolTipTextNew='AI Generator'
                  onChange={ (name, value) => setSubject(value) }
               />
            </div>
            <div className='grey_line' />

            {formData.category === 'All Users' && !getUsersEmailsInProgress && emails.length === 0 && (
               <div> <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner='No Users'
                  color='rgb(130 132 133)'
               />
               </div>
            )}
            {formData.category === 'All Users' && getUsersEmailsInProgress && (
               <div className='m-l-exl loader-spinner'>
                  <LoaderSpinner width={ 150 } heigth={ 150 } />
               </div>
            )}
            {formData.category === 'Admins' && !getAdminEmailsInProgress && emails.length === 0 && (
               <div> <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner='No Admins'
                  color='rgb(130 132 133)'
               />
               </div>
            )}
            {formData.category === 'Admins' && getAdminEmailsInProgress && (
               <div className='m-l-exl loader-spinner'>
                  <LoaderSpinner width={ 150 } heigth={ 150 } />
               </div>
            )}
         </div>
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               title='Subject Line'
               setData={ setSubject }
            />
         )}

      </div>
   );
};

EmailTitle.propTypes = {
   fields: PropTypes.object,
   title: PropTypes.string,
   subtitle: PropTypes.string,
   onChange: PropTypes.func,
   formData: PropTypes.object,
   setInputAction: PropTypes.func,
   filterByCourses: PropTypes.func,
   filterOptions: PropTypes.object,
   setFilterEmails: PropTypes.array,
   selectedFilters: PropTypes.array,
   emails: PropTypes.array,
   filterEmails: PropTypes.array,
   setFilterEmailsAction: PropTypes.func,
   removeFilterOptionAction: PropTypes.func,
   addFilterOptionAction: PropTypes.func,
   sendEmail: PropTypes.func,
   filterByTags: PropTypes.func,
   filterByTagsEmails: PropTypes.func,
   getAdminsEmails: PropTypes.func,
   getAllUsersEmails: PropTypes.func,
   resetInputAction: PropTypes.func,
   goToBack: PropTypes.func,
   isEmailSent: PropTypes.bool,
   getSettingsEmail: PropTypes.func,
   settingsEmail: PropTypes.string,
   getEmailInProgress: PropTypes.bool,
   editEmailStatus: PropTypes.func,
   emailId: PropTypes.number,
   getEmailStatusesInProgress: PropTypes.bool,
   getEmailStatuses: PropTypes.func,
   emailStatuses: PropTypes.array,
   deleteEmailStatus: PropTypes.func,
   changeEmailStatusPage: PropTypes.func,
   emailStatusesTotal: PropTypes.number,
   getFilterOptionsInProgress: PropTypes.bool,
   getUsersEmailsInProgress: PropTypes.bool,
   getAdminEmailsInProgress: PropTypes.bool,
   onEmailChange: PropTypes.func,
   onAddValue: PropTypes.func,
   onRemoveValue: PropTypes.func,
   showFilters: PropTypes.bool,
   subject: PropTypes.string,
   setSubject: PropTypes.func,
   emptyField: PropTypes.bool,
   errorMessages: PropTypes.object,
};

export default EmailTitle;
