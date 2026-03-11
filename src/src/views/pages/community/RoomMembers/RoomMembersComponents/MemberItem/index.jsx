import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import Button, { THEMES as themes, SIZES as buttonSizes } from 'components/elements/buttons/BaseButtonNew';
import DropTriggle from 'components/elements/newDropTriggle';
import DeleteModal from 'components/elements/DeleteModal';
import ModalNew from 'components/elements/ModalNew';
import Info from 'components/elements/messages/info';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import { useHistory } from 'react-router-dom';
import { communityButtonColors } from 'utils/communityButtonColors';


const reportOptions = [
   { title: 'Harassment', value: 'harassment', description: 'Disparaging or adversarial towards a person or group' },
   { title: 'Content is Spam', value: 'spam', description: 'Undisclosed promotion for a link or product' },
   { title: 'Plagiarism', value: 'plagiarism', description: 'Reusing content without attribution' },
   { title: 'Question Policy', value: 'policy', description: 'Repeatedly asking insincere or otherwise policy-violating questions' },
   { title: 'Another Reason', value: 'another', description: null },
];

const MemberItem = ({
   member, isAdminView, isHiddenActions, onDelete, onReport, userSubscribe, roomName, checkUserFollowing,
   goToMemberProfile, isOnline, community,
}) => {
   const options = useRef({});
   const history = useHistory();
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenReportModal, setIsOpenReportModal] = useState(false);
   const [selectedOption, setSelectedOption] = useState('harassment');
   const anotherInputRef = useRef(null);
   const isFollower = checkUserFollowing(member?.user_followers || []);
   options.current = [
      // {
      //    trash: false, iconName: 'CommunitySettingsMemberMuteM', name: 'Mute', onClick: () => {},
      // },
      {
         trash: true, iconName: 'TrashSettingsM', name: 'Remove User', onClick: () => setIsOpenDeleteModal(true),
      },
   ];
   if (!isAdminView) {
      options.current = [
         // {
         //    trash: false, iconName: 'CommunitySettingsMemberMuteM', name: 'Mute', onClick: () => {},
         // },
         {
            trash: true, iconName: 'CommunityReportM', name: 'Report User', onClick: () => setIsOpenReportModal(true),
         },
      ];
   }

   const handleReport = () => {
      const data = {
         type: selectedOption,
         text: selectedOption,
      };
      if (selectedOption === 'another') {
         data.text = anotherInputRef.current.value;
      }
      onReport(member.id, data.text);
      setIsOpenReportModal(false);
      setSelectedOption('harassment');
      anotherInputRef.current.value = '';
   };

   const goToMessenger = () => history.push({ pathname: window.location.pathname.includes('admin') ? `/admin/community/${ community.id }/messenger` : `/portal/community/${ community.id }/messenger`, state: { id: member.id } });

   return (
      <>
         {isOpenReportModal && (
            <ModalNew onCloseModal={ () => {
               setSelectedOption('harassment');
               setIsOpenReportModal(false);
            } }
            >
               <div className='member__item__report'>
                  <div className='member__item__report__top'>
                     <Text
                        inner='Report User'
                        type={ types.medium }
                        size={ sizes.xxlarge }
                     />
                     <div className='member__item__report__user'>
                        <div className='member__item__report__user__image'>
                           <img src={ member.picture_src || member.picture_full_src } alt='' />
                           {isOnline && (
                              <div className='member__item__report__user__status' />
                           )}
                        </div>
                        <Text
                           inner={ member.name }
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </div>
                     <Info title='Select the reason you are reporting this user' isHaveCancel={ false } />
                  </div>
                  <div className='member__item__report__options'>
                     {reportOptions.map((e) => {
                        if (e.description) {
                           return (
                              <CheckboxCircle
                                 isChecked={ selectedOption === e.value }
                                 description={ e.description }
                                 onCheck={ () => setSelectedOption(e.value) }
                                 label={ e.title }
                              />
                           );
                        }
                        return (
                           <CheckboxCircle
                              isChecked={ selectedOption === e.value }
                              onCheck={ () => setSelectedOption(e.value) }
                              label={ e.title }
                              inputOptions={ {
                                 placeholder: 'Add your reason',
                                 inputRef: anotherInputRef,
                                 onChange: () => {},
                              } }
                           />
                        );
                     })}
                  </div>
                  <div className='member__item__report__buttons'>
                     <Button
                        text='Cancel'
                        theme={ themes.secondary }
                        onClick={ () => {
                           setSelectedOption('harassment');
                           setIsOpenReportModal(false);
                        } }
                     />
                     <Button
                        text='Repoort User'
                        theme={ themes.red }
                        onClick={ () => handleReport() }
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         {isOpenDeleteModal && (
            <DeleteModal
               title='Are you sure you want to remove this user?'
               onCancel={ () => {
                  setIsOpenDeleteModal(false);
               } }
               onDelete={ () => {
                  onDelete(member.id);
                  setIsOpenDeleteModal(false);
               } }
               deleteText='Remove Member'
            />
         )}
         <div className='member__item'>
            <div className='member__item__left' role='presentation' onClick={ () => goToMemberProfile(member.id) }>
               <div className='member__item__left__image'>
                  <img src={ member.picture_src || member.picture_full_src } alt='' />
                  {isOnline && (
                     <div className='member__item__left__image__status' />
                  )}
               </div>
               <Text
                  inner={ member.name }
                  type={ types.mediumLarge }
                  size={ sizes.small }
               />
            </div>
            {isHiddenActions(member.id) && (
               <div className='member__item__right'>
                  {isFollower ? (
                     <Button
                        text='Unfollow'
                        onClick={ () => userSubscribe(member.id) }
                        theme={ themes.error }
                        size={ buttonSizes.small }
                        style={ { minWidth: '88px', width: '88px', fontSize: '14px' } }
                     />
                  ) : (
                     <Button
                        text={ `Follow | ${ member.follow_count }` }
                        theme={ themes.secondary }
                        size={ buttonSizes.small }
                        style={ {
                           minWidth: '88px', width: '88px', height: '32px', fontSize: '14px',
                        } }
                        onClick={ () => userSubscribe(member.id) }
                     />
                  )}
                  {(isAdminView || (member.role !== 0)) && (
                     <Button
                        text='Message'
                        onClick={ () => goToMessenger(member.id) }
                        theme={ types.primary }
                        size={ buttonSizes.small }
                        style={ {
                           minWidth: '88px', width: '88px', fontSize: '14px', ...communityButtonColors(community), 
                        } }
                     />
                  )}
                  <DropTriggle
                     activeStyles={ { boxShadow: '0px 0px 4px #54938B', background: '#E8F2F1', border: '1px solid #36796F' } }
                     options={ options.current }
                  />
               </div>
            )}
         </div>
      </>
   );
};

MemberItem.propTypes = {
   member: PropTypes.object,
   userSubscribe: PropTypes.func,
   isAdminView: PropTypes.bool,
   goToMemberProfile: PropTypes.func,
   roomName: PropTypes.string,
   onDelete: PropTypes.func,
   onReport: PropTypes.func,
   checkUserFollowing: PropTypes.func,
   isHiddenActions: PropTypes.func,
   isOnline: PropTypes.func,
   community: PropTypes.object,
};

export default MemberItem;
