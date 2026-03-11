/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Select from 'components/elements/form/Select';
import TextInput from 'components/elements/form/TextInput';
// import TextArea from 'components/elements/form/TextArea';
import BaseButton, { SIZES as btnSize, THEME as btnTheme } from 'components/elements/buttons/BaseButton';
import MultiSelect from 'components/elements/form/MultiSelect';
import EditorConvertToHTML from 'components/modules/editor';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Tooltip from 'components/elements/members/Tooltip';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const MemberUpdate = ({
   onChange, fields, formData, filterOptions, selectedFilters, onSendEmail, showFilters, nextStepClick,
   currentTab, onAddValue, onRemoveValue, settingsEmail, getEmailInProgress, backStepClick, getFilterOptionsInProgress,
   emails, getUsersEmailsInProgress,
   getAdminEmailsInProgress, mainApp, goToPlans,
}) => {
   const { from, reply } = settingsEmail || {};
   // emails, selectedEmails, onRemoveEmail, onAddEmail
   const toValues = () => {
      if (formData.category === 'Courses' || formData.category === 'Tags') {
         return selectedFilters;
      }
      return [formData.category];
   };


   const reviews = [
      {
         name: 'To:',
         value: `${ toValues() }`,
      },
      {
         name: 'From:',
         value: `${ from }`,
      },
      {
         name: 'Reply To:',
         value: `${ reply }`,
      },
      {
         name: 'Subject:',
         value: `${ formData.subject }`,
      },
   ];

   return (
      <SelectedWrapper>

         { currentTab === 1 && (
            <div className='memberUpdate'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Edit Recipient'
               />
               <div className='m-t-exl m-b-exl memberUpdat__select'>

                  <Select
                     label={ fields.option.label }
                     placeholder={ fields.option.placeholder }
                     name='category'
                     value={ formData.category }
                     options={ fields.option.options }
                     iconColor={ fields.option.iconColor }
                     onChange={ onChange }
                     disabled={ getFilterOptionsInProgress }
                  />
                  { showFilters && (
                     <>
                        { !getFilterOptionsInProgress
                           ? (
                              <>
                                 <div className='m-l-exl' />
                                 <MultiSelect
                                    placeholder={ Object.keys(filterOptions).length === 0 ? `No ${ formData.category === 'Courses' ? 'Classes' : 'Tags' } to Choose` : fields.type.placeholder }
                                    iconColor={ fields.type.iconColor }
                                    onAddValue={ onAddValue }
                                    onRemoveValue={ onRemoveValue }
                                    selectedValues={ selectedFilters }
                                    options={ Object.keys(filterOptions) }
                                 />
                              </>
                           )
                           : (
                              <div className='m-l-exl loader-spinner'>
                                 <LoaderSpinner width={ 150 } heigth={ 150 } />
                              </div>
                           )
                        }
                     </>
                  ) }
               </div>
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

               <div className='memberUpdate__btn memberUpdate__btn_step1'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Next'
                     onClick={ () => nextStepClick(0) }
                  />
               </div>


            </div>
         )}

         { currentTab === 2 && (
            <div className='memberUpdate'>
               <div className='m-b-exl flex'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.medium }
                     inner='Edit Content'
                  />
                  <Tooltip
                     hintText='Customize your emails to fit your audience.'
                     style={ { top: '-3px' } }
                     hintStyle={ { bottom: 'auto', top: '18px' } }
                  />
               </div>
               {!getEmailInProgress && (
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.extraSmall }
                     inner={ ['From:', <span className='m-l-l'>{from}</span>] }
                  />
               )}

               <div className='m-t-exl' />
               <TextInput
                  label={ fields.subject.label }
                  placeholder={ fields.subject.placeholder }
                  name='subject'
                  value={ formData.subject }
                  rightLabel={ `${ formData.subject ? formData.subject.length : 0 }/250` }
                  onChange={ (name, value) => {
                     if (value.length <= 250) {
                        onChange(name, value);
                     } else if (isPrint('You are reached character limit')) {
                        toast.error('You are reached character limit');
                     }
                  } }
               />
               <div className='m-t-exl' />
               <Text
                  size={ TextSize.extraSmall }
                  type={ TextType.normal }
                  inner='Text Content'
               />
               <div className='email_textcontent'>
                  <EditorConvertToHTML
                     description={ formData.content || '' }
                     onChange={ (data) => {
                        onChange('content', data);
                     } }
                  />

                  <Text
                     size={ TextSize.extraSmall }
                     type={ TextType.normal }
                     inner='Unsubscribe from our emails'
                  />
               </div>
               <div className='memberUpdate__btns'>
                  <div className='memberUpdate__btn'>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Back'
                        onClick={ backStepClick }
                     />
                  </div>
                  <div className='memberUpdate__btn memberUpdate__btn__draft'>
                     <BaseButton
                        theme={ btnTheme.lightGreen }
                        size={ btnSize.large }
                        text='Save as a draft'
                        onClick={ () => onSendEmail('draft') }
                     />
                  </div>
                  <div className='memberUpdate__btn'>
                     <BaseButton
                        size={ btnSize.large }
                        text='Next'
                        onClick={ () => nextStepClick(0) }
                     />
                  </div>
               </div>
            </div>
         )}

         { currentTab === 3 && (
            <>

               <div className='email-review'>

                  <div className='email-review__title'>
                     <Text
                        type={ TextType.bold }
                        size={ TextSize.medium }
                        inner='Review Email'
                     />
                  </div>
                  {reviews.map((review) => {
                     return (
                        <div className='email-review__field' key={ review.name }>
                           <div className='field__1'>
                              <Text
                                 type={ TextType.normal }
                                 size={ TextSize.extraSmall }
                                 inner={ review.name }
                              />
                           </div>
                           <div className='field__2'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.extraSmall }
                                 inner={ review.value }
                              />
                           </div>
                        </div>
                     );
                  })}
                  <div className='email-review__content'>
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.extraSmall }
                        // eslint-disable-next-line react/no-danger
                        inner={ [<div dangerouslySetInnerHTML={ { __html: formData.content } } />] }
                     />
                  </div>
                  <div className='memberUpdate__btns'>
                     <div className='memberUpdate__btn'>
                        <BaseButton
                           theme={ btnTheme.grey }
                           size={ btnSize.large }
                           text='Back'
                           onClick={ backStepClick }
                        />
                     </div>
                     <div className='memberUpdate__btn memberUpdate__btn__draft'>
                        <BaseButton
                           theme={ btnTheme.lightGreen }
                           size={ btnSize.large }
                           text='Save as a draft'
                           onClick={ () => onSendEmail('draft') }
                        />
                     </div>
                     <div className='memberUpdate__btn'>
                        <BaseButton
                           size={ btnSize.large }
                           text='Next'
                           onClick={ () => nextStepClick(0) }
                        />
                     </div>
                  </div>


               </div>


            </>
         )}
         { currentTab === 4 && (
            <div className='memberUpdate'>
               <div className='m-b-exl'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.medium }
                     inner='Send Email'
                  />
               </div>
               <div className='field__2'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner='You can save your email as a draft or send to your users.'
                  />
               </div>
               <div className='memberUpdate__btns'>
                  <div className='memberUpdate__btn'>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Back'
                        onClick={ backStepClick }
                     />
                  </div>
                  <div className='memberUpdate__btn memberUpdate__btn__draft'>
                     <BaseButton
                        theme={ btnTheme.lightGreen }
                        size={ btnSize.large }
                        text='Save as a draft'
                        onClick={ () => onSendEmail('draft') }
                     />
                  </div>
                  <div className='memberUpdate__btn memberUpdate__btn__send'>
                     <BaseButton
                        size={ btnSize.large }
                        text={ mainApp.unlimited ? 'Send Email' : !mainApp.chargebee_customer_id && mainApp.trial === 14 ? 'Upgrade to send' : 'Send Email' }
                        onClick={ mainApp.unlimited ? () => onSendEmail('sent') : !mainApp.chargebee_customer_id && mainApp.trial === 14 ? () => goToPlans() : () => onSendEmail('sent') }

                     />
                  </div>
               </div>
            </div>
         )}


      </SelectedWrapper>
   );
};

MemberUpdate.propTypes = {
   onChange: PropTypes.func.isRequired,
   onAddValue: PropTypes.func.isRequired,
   onRemoveValue: PropTypes.func.isRequired,
   fields: PropTypes.object.isRequired,
   formData: PropTypes.object,
   selectedFilters: PropTypes.array,
   // emails: PropTypes.array,
   filterOptions: PropTypes.object,
   // onAddEmail: PropTypes.func,
   // onRemoveEmail: PropTypes.func,
   onSendEmail: PropTypes.func,
   nextStepClick: PropTypes.func,
   currentTab: PropTypes.number,
   showFilters: PropTypes.bool,
   //  selectedEmails: PropTypes.array,
   settingsEmail: PropTypes.object,
   getEmailInProgress: PropTypes.bool,
   backStepClick: PropTypes.func,
   getFilterOptionsInProgress: PropTypes.bool,
   emails: PropTypes.bool,
   getUsersEmailsInProgress: PropTypes.bool,
   getAdminEmailsInProgress: PropTypes.bool,
   mainApp: PropTypes.object,
   goToPlans: PropTypes.func,
};

MemberUpdate.defaultProps = {
   formData: {},
   filterOptions: {},
   getEmailInProgress: true,
   settingsEmail: {},
   getFilterOptionsInProgress: false,
};

export default MemberUpdate;
