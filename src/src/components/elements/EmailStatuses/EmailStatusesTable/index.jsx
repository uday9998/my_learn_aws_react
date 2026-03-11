/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Status from 'components/elements/statusNew';
// import {
//    Td, Th, Tr, Theader, Tbody,
// } from 'components/elements/Transactions/Table';
import moment from 'moment';
import Modal from 'components/elements/Modal';
import DeleteModalContent from 'components/elements/members/DeleteModalContent';
import DropTriggle from 'components/elements/newDropTriggle';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import LoaderMini from 'components/elements/loaderMini';
import momentTimezone from 'moment-timezone';
// import TimerDesign from 'components/elements/Timer';
import CheckBox from 'components/elements/form/CheckBoxNew';
import { useSelector } from 'react-redux';

const EmailStatusesTable = ({
   content, deleteEmailStatus, handleEditEmailStatus, checkedIds, isMultiselect, handleCheckItem, handleDuplicate,
}) => {
   const screenWidth = useSelector(state => state).common.screenWidth;

   const [deleteEmailModalIsOpen, setDeleteEmailModalIsOpen] = useState(false);
   const [emailId, setEmailId] = useState(0);

   const delEmailModalClick = (id) => {
      setEmailId(id);
      setDeleteEmailModalIsOpen(true);
   };

   const delEmailModalApproveClick = () => {
      deleteEmailStatus(emailId);
      setDeleteEmailModalIsOpen(false);
   };

   const publishStatusType = (status) => {
      let statusText = '';
      let type = '';
      let icon = '';
      switch (status) {
         case 'draft': statusText = 'Unpublished'; type = 'draft'; icon = 'draftS';
            break;
         case 'delivered': statusText = 'Sent'; type = 'publish'; icon = 'publishS';
            break;
         case 'scheduled': statusText = 'Scheduled'; type = 'scheduled'; icon = 'DateTypeCommunityS';
            break;
         default:
      }
      return { statusText, type, icon };
   };

   const actionsFunc = (status, id) => {
      let actions = [
         {
            trash: false, iconName: 'DuplicateMediaM', name: 'Duplicate', onClick: () => { handleDuplicate(id); },
         },
      ];

      if (status !== 'delivered' && status !== 'scheduled') {
         actions = [
            {
               trash: false, iconName: 'DuplicateMediaM', name: 'Duplicate', onClick: () => { handleDuplicate(id); },
            },
            {
               trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => { handleEditEmailStatus(id); },
            },
            {
               trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => { delEmailModalClick(id); },
            },
         ];
      }

      return actions;
   };

   const dripTime = (data) => {
      const userTimeZone = momentTimezone.tz.guess();
      const dateUserTimeZone = momentTimezone.utc(data.scheduled_date).tz(userTimeZone);
      const dateUserTimeZoneFormat = dateUserTimeZone.format('MMMM DD, YYYY h:mm A');
      return dateUserTimeZoneFormat;
   };


   const renderTableData = () => {
      return content.map((data) => {
         const {
            id, status,
            subject, updated_at,
         } = data;
         const updatedAt = moment(updated_at).format('MMMM DD, YYYY hh:mm a');
         return (
            <div key={ id }>
               {
                  isMultiselect && (
                     status === 'delivered' ? (
                        <div
                           className='disabled_checkbox'
                        />
                     ) : (
                        <CheckBox
                           checked={ checkedIds.includes(id) }
                           onChange={ () => handleCheckItem(id) }
                        />
                     )
                  )
               }
               <div
                  className='email_wrapper'
               >

                  <div className='emailStatusesTable_left'>
                     <div><IconNew name='EmailM' /></div>
                     <div>
                        <div className='emailStatusesTable_left_name'>
                           <Text
                              inner={ subject.length > 15 ? `${ subject.slice(0, 16) }...` : subject }
                              type={ txtTypes.medium }
                              size={ txtSizes.medium }
                           />
                        </div>
                        <div className='emailStatusesTable_left_date'>
                           <Text
                              inner={ `${ screenWidth > 560 ? 'Modified ' : '' }${ updatedAt || '-' }` }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                     </div>
                  </div>
                  {status !== 'draft' && status !== 'scheduled' && (
                     <div className='emailStatusTable__actions'>
                        <div>
                           <Text
                              inner='Sends'
                              type={ txtTypes.regularDefaultSmall }
                              size={ txtSizes.xsmall }
                              style={ { color: 'rgba(114, 121, 120, 1)' } }
                           />
                           {(!data.tag || (data.actions && data.actions.sent !== undefined)) ? (
                              <Text
                                 inner={ data.tag ? data.actions.sent : 0 }
                                 // type={ txtTypes.medium }
                                 size={ txtSizes.small }
                              />
                           )
                              : <LoaderMini color='#131f1e' />}
                        </div>
                        <div>
                           <Text
                              inner='Opened'
                              type={ txtTypes.regularDefaultSmall }
                              size={ txtSizes.xsmall }
                              style={ { color: 'rgba(114, 121, 120, 1)' } }
                           />
                           {(!data.tag || (data.actions && data.actions.open !== undefined)) ? (
                              <Text
                                 inner={ data.tag ? data.actions.open : 0 }
                                 type={ txtTypes.medium }
                                 size={ txtSizes.small }
                              />
                           )
                              : <LoaderMini color='#131f1e' />}
                        </div>
                        <div>
                           <Text
                              inner='Clicked'
                              type={ txtTypes.regularDefaultSmall }
                              size={ txtSizes.xsmall }
                              style={ { color: 'rgba(114, 121, 120, 1)' } }
                           />
                           {(!data.tag || (data.actions && data.actions.click !== undefined)) ? (
                              <Text
                                 inner={ data.tag ? data.actions.click : 0 }
                                 type={ txtTypes.medium }
                                 size={ txtSizes.small }
                              />
                           )
                              : <LoaderMini color='#131f1e' />}
                        </div>
                        <div>
                           <Text
                              inner='Unsubscribed'
                              type={ txtTypes.regularDefaultSmall }
                              size={ txtSizes.xsmall }
                              style={ { color: 'rgba(114, 121, 120, 1)' } }
                           />
                           {(!data.tag || (data.actions && data.actions.unsubscribe !== undefined)) ? (
                              <Text
                                 inner={ data.tag ? data.actions.unsubscribe : 0 }
                                 type={ txtTypes.medium }
                                 size={ txtSizes.small }
                              />
                           )
                              : <LoaderMini color='#131f1e' />}

                        </div>

                     </div>
                  )}
                  <div className={ `emailStatusTable__status emailStatusTable__status_${ status }` }>
                     <div
                        onClick={ () => {
                           window.open(`${ window.location.origin }/api/v1/emails/preview/${ id }`, '_blank');
                        } }
                        role='presentation'
                        className='emailStatusTable__status__preview__button'
                     >
                        <IconNew
                           name='eyeM'
                        />
                     </div>

                     {status === 'scheduled' && (
                     // <TimerDesign
                     //    time={ new Date(data.scheduled_date) }
                     //    // theme='second'
                     //    isConstant={ true }
                     //    onExpire={ () => {
                     //    // hideCourseHandle(courseId, 2);
                     //    } }
                     // />
                        <div className='drip_hover'>
                           <Text
                              size={ txtSizes.small }
                              type={ txtTypes.regularDefault }
                              inner={ `${ dripTime(data) }` }
                           />

                        </div>
                     )}
                     <Status
                        text={ publishStatusType(status).statusText }
                        type={ publishStatusType(status).type }
                        icon={ publishStatusType(status).icon }
                     />
                     <DropTriggle removeDropLesson={ true } options={ actionsFunc(status, id) } />
                  </div>
               </div>
            </div>
         );
      });
   };

   return (
      <div className='emailStatusesTable'>
         <div id='emailStatusesTable' className='transactions__table w-full'>
            {renderTableData()}
         </div>
         {
            deleteEmailModalIsOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  contentWidth={ window.innerWidth >= 1024 ? '389px' : '300px' }
                  onClose={ () => setDeleteEmailModalIsOpen(false) }
               >
                  <div>
                     <DeleteModalContent
                        onCancel={ () => setDeleteEmailModalIsOpen(false) }
                        onApprove={ () => delEmailModalApproveClick() }
                        // title='Delete Email'
                        content='Are you sure you want to delete this email?'
                     />
                  </div>
               </Modal>
            )
         }
      </div>
   );
};

EmailStatusesTable.propTypes = {
   content: PropTypes.array,
   deleteEmailStatus: PropTypes.func,
   handleEditEmailStatus: PropTypes.func,
   checkedIds: PropTypes.array,
   isMultiselect: PropTypes.bool,
   handleCheckItem: PropTypes.func,
   handleDuplicate: PropTypes.func,
};

export default EmailStatusesTable;
