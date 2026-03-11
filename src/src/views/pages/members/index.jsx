import React, { useRef, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import NoUsersFound from 'components/modules/members/NoUsersFound';
import MemberStaticCard from 'components/modules/members/MemberStaticCard';
import SelectedMember from 'components/modules/members/SelectedMember';
import SettingUser from 'components/modules/members/SettingUser';
import SettingTags from 'components/modules/members/SettingTags';
import SettingNotes from 'components/modules/members/SettingNotes';
import SettingTransaction from 'components/modules/members/SettingTransaction';
import SettingCourses from 'components/modules/members/SettingCourses';
import SettingPermission from 'components/modules/members/SettingPermission';
import LessonMember from 'components/modules/members/LessonMember';
import MemberInfoCard from 'components/modules/members/MemberInfoCard';
import Loader from 'components/elements/Loader';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Pagination from 'components/elements/Pagination';
import moment from 'moment';


const Members = (props) => {
   const {
      currentMember, onChooseMember, innerActionInProgress, handleNewMemberInputChange,
      handleSave, transactionsInProgress, NotesInProgress, addingMember, newMember, handleAddMember,
      handleDeleteMember, isMobileChangeTab, chooseCourses, onAddValue, onRemoveValue, selectedFilters,
      data, onChangeMembersPage, switchToAddingMember, handleSendPassword, removeFile,
      // handleChooseNote
   } = props;
   const isMobile = window.innerWidth < 1024;
   const newMemberDiv = useRef(null);
   const scrollingDiv = useRef(null);
   const scrollingDivRight = useRef(null);
   const members = data.data;
   useEffect(() => {
      if (!isMobile) {
         if (addingMember === true) {
            const topPos = newMemberDiv.current.offsetTop;
            scrollingDiv.current.scrollTop = topPos;
            scrollingDivRight.current.scrollTop = 0;
         } else if (scrollingDiv && scrollingDiv.current && !innerActionInProgress) {
            scrollingDiv.current.scrollTop = 0;
         }
      }
   }, [addingMember]);
   return (
      <div className='d-members h-full'>
         { !data.data[0] && !addingMember ? (
            <div className='w-full flex align-center justify-center'>
               <div style={ { width: '360px' } }>
                  <NoUsersFound switchToAddingMember={ switchToAddingMember } />
               </div>
            </div>
         ) : (
            <>
               {
                  ((!isMobileChangeTab && !addingMember) || !isMobile) && (
                     <div className='content_left d-members__left' ref={ scrollingDiv }>
                        <div className='lessonMembersList m-r-exl'>
                           <div style={ { padding: '16px 0px 16px 0px' } }>
                              <Text
                                 type={ textType.regular }
                                 size={ textSize.small }
                                 inner={ ['Displaying people ', <strong>{data.from}</strong>, ' - ', <strong>{data.to}</strong>, ' of ', <strong>{data.total}</strong>, ' in total'] }
                                 bold={ true }
                              />
                           </div>
                           { Object.entries(data).length !== 0
                           // .sort((a, b) => ((a.id < b.id) ? 1 : -1))
                              ? members.map(member => (
                                 <div className='m-b-s' key={ member.id }>
                                    <LessonMember
                                       member={ member }
                                       active={ !addingMember && currentMember.id === member.id }
                                       onChooseMember={ onChooseMember }
                                       handleDeleteMember={ (e) => handleDeleteMember(e, member.id) }
                                    />
                                 </div>
                              )) : ''
                           }
                           {

                              addingMember && (

                                 <div className='m-b-exl' ref={ newMemberDiv }>

                                    <ItemWrapper border>
                                       <div style={ { padding: '16px 32px 16px 24px' } }>
                                          <Text
                                             type={ textType.regular }
                                             size={ textSize.small }
                                             inner='Enter info about new member'
                                             bold={ true }
                                             color='#8a94a2'
                                          />
                                       </div>
                                    </ItemWrapper>
                                 </div>
                              )
                           }
                        </div>
                        <div className='flex justify-center m-t-exl m-b-exl p-t-exs'>
                           <Pagination
                              totalRecords={ data.total ? data.total : 0 }
                              pageLimit={ 30 }
                              pageNeighbours={ 1 }
                              onPageChanged={ (page) => onChangeMembersPage(page) }
                           />
                        </div>
                     </div>
                  )
               }
               <div className='content_right d-members__right' ref={ scrollingDivRight }>
                  {
                     addingMember ? (
                        <div className='m-l-exl d-addMembers__right'>
                           <MemberInfoCard
                              newMember={ newMember }
                              handleNewMemberInputChange={ handleNewMemberInputChange }
                              handleAddMember={ handleAddMember }
                              chooseCourses={ chooseCourses }
                              onAddValue={ onAddValue }
                              onRemoveValue={ onRemoveValue }
                              selectedFilters={ selectedFilters }
                              removeFile={ removeFile }
                           />
                        </div>
                     ) : (
                        !innerActionInProgress && (!!isMobileChangeTab || !isMobile) && (
                           <div className='m-l-exl membersInfo'>
                              <div className='memberStaticCards m-b-l'>
                                 <div className='m-r-exl'>
                                    <MemberStaticCard
                                       title={ currentMember.purchase_count }
                                       description='Purchase'
                                       icon='Purchase'
                                    />
                                 </div>
                                 <div className='m-r-exl'>
                                    <MemberStaticCard
                                       title={ currentMember.courses_count }
                                       description='Classes'
                                       icon='Book'
                                    />
                                 </div>
                                 <div className='m-r-exl'>
                                    <MemberStaticCard
                                       title={ `$ ${ currentMember.total_revenue && currentMember.total_revenue.toFixed(2) }` }
                                       description='Total Revenue'
                                       icon='Sales'
                                    />
                                 </div>
                                 <div>
                                    <MemberStaticCard
                                       title={ moment(currentMember.created_at).format('MM/DD/YYYY') }
                                       description='Member Since'
                                       icon='SinceMember'
                                    />
                                 </div>
                              </div>
                              <div className='m-b-l'>
                                 <SelectedMember
                                    currentMember={ currentMember }
                                    handleSave={ handleSave }
                                    handleSendPassword={ handleSendPassword }
                                 />
                                 <div className='m-t-l'>
                                    <SettingUser
                                       { ...props }
                                    />
                                 </div>
                                 <div className='m-t-l'>
                                    <SettingPermission
                                       { ...props }
                                    />
                                 </div>
                                 <div className='m-t-l'>
                                    <SettingCourses
                                       { ...props }
                                    />
                                 </div>
                                 <div className='m-t-l'>
                                    <SettingTags
                                       { ...props }
                                    />
                                 </div>
                                 <div className='m-t-l'>
                                    {
                                       NotesInProgress ? (
                                          <div className='loader_state'>
                                             <Loader />
                                          </div>
                                       ) : (
                                          <SettingNotes
                                             { ...props }
                                          />
                                       )
                                    }
                                 </div>
                                 <div className='m-t-l'>
                                    {
                                       transactionsInProgress ? (
                                          <div className='loader_state'>
                                             <Loader />
                                          </div>
                                       ) : (
                                          <SettingTransaction
                                             { ...props }
                                          />
                                       )
                                    }
                                 </div>
                              </div>
                           </div>
                        )
                     )
                  }
               </div>
            </>
         )
         }
      </div>
   );
};

Members.propTypes = {
   data: PropTypes.object,
   currentMember: PropTypes.object,
   onChooseMember: PropTypes.func,
   handleSave: PropTypes.func,
   innerActionInProgress: PropTypes.bool,
   transactionsInProgress: PropTypes.bool,
   NotesInProgress: PropTypes.bool,
   addingMember: PropTypes.bool,
   newMember: PropTypes.object,
   handleNewMemberInputChange: PropTypes.func,
   handleAddMember: PropTypes.func,
   handleDeleteMember: PropTypes.func,
   isMobileChangeTab: PropTypes.bool,
   chooseCourses: PropTypes.array,
   onAddValue: PropTypes.func,
   onRemoveValue: PropTypes.func,
   selectedFilters: PropTypes.array,
   onChangeMembersPage: PropTypes.func,
   switchToAddingMember: PropTypes.func,
   handleChooseNote: PropTypes.func,
   handleSendPassword: PropTypes.func,
   removeFile: PropTypes.func,
};

export default Members;
