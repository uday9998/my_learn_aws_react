import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import ComponentProgress from 'components/modules/ComponentProgress';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   CommunityMemberDelete, MembersFollowUnfollowListing, getCommunityMembersAll, 
   banMember, suspendMember, exportCommunityMembersCSV, importCommunityMembersCSV,
} from 'api';
import Members from 'views/pages/community/Members';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { onlineUsersSelector } from 'state/modules/common/selectors';
// import CommunityMenu from 'containers/pages/admin/community/menu';
import { BulkImportModal } from 'views/layout/membersNew/membersComponents/membersModals';
import Popup from 'components/modules/PopupMember';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const CommunityMembers = ({
   match, onInviteMember, user, goToMemberProfile,
   handleReport, community, onlineUsers, goToMessenger,
}) => {
   // const role = useSelector((state) => selectors.selectLoginedUserRole(state));
   // const siteInfo = useSelector(siteInfoSelector);
   // const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');

   // const history = useHistory();
   const [filter] = useSubmitForm(getCommunityMembersAll);
   const [exportCommunityMembersCSVfunc] = useSubmitForm(exportCommunityMembersCSV);
   const [importCommunityMembersCSVfunc] = useSubmitForm(importCommunityMembersCSV, {
      successMessage: 'Members imported successfully.',
   });
   const { data: items, loading, setData } = useApiQuery(getCommunityMembersAll, [[match.params.id, 0, 'newest', '']]);
   const [followUnfollow] = useSubmitForm(MembersFollowUnfollowListing);
   const [deleteMember] = useSubmitForm(CommunityMemberDelete);
   const [banMemberFunc, { loading: loadingBanMember }] = useSubmitForm(banMember);
   const [suspendMemberFunc, { loading: loadingSuspendMember }] = useSubmitForm(suspendMember);
   const data = items ? items.data : [];
   const [searchInput, setSearchInput] = useState('');
   const [initialLength, setInitialLength] = React.useState(0);
   const [importMemberModalOpen, setImportMembersModalOpen] = useState(false);
   const [file, setFile] = useState({});

   useEffect(() => {
      if (!setInitialLength) {
         setInitialLength(items.data.length);
      }
   }, [loading]);
   // useEffect(() => {
   //    getCommunity(match.params.id, user ? user.id : null);
   // }, []);
   const [filterOptions, setFilterOptions] = useState({
      filter: 0,
      sorting: 'newest',
   });

   const handleMemberFilter = (filterData, search) => {
      filter([match.params.id, filterData.filter, filterData.sorting, search],
         (newData) => {
            setData(newData);
         });
   };

   const updateMemberData = (memberId, userType) => {
      setData(prevState => {
         return {
            ...prevState,
            data: prevState.data.map(item => {
               if (item.id === memberId) {
                  return {
                     ...item,
                     pivot: {
                        ...item.pivot,
                        user_type: userType,
                     },
                  };
               }

               return item;
            }),
         };
      });
   };

   const communityBanMember = (memberId) => {
      banMemberFunc({ communityId: match.params.id, memberId },
         () => {
            const member = data.find(member => member.id === memberId);
            member.pivot.is_banned = !member.pivot.is_banned;
         });
   };

   const communitySuspendMember = (memberId) => {
      suspendMemberFunc({ communityId: match.params.id, memberId },
         () => {
            const member = data.find(member => member.id === memberId);
            member.pivot.is_suspended = !member.pivot.is_suspended;
         });
   };

   useEffect(() => {
      handleMemberFilter(filterOptions, searchInput);
   }, [filterOptions, searchInput]);

   const handleChangePage = (number) => {
      filter([match.params.id, filterOptions.filter, filterOptions.sorting, searchInput, number],
         (newData) => {
            setData(newData);
         });
   };


   const handleFollowUnfollow = (id) => {
      followUnfollow([community.id, id, 0, community.room_groups[0].id], (e) => {
         setData({
            ...data,
            data: items.data.map((item) => {
               if (item.id === e.id) {
                  return { ...e, pivot: item.pivot };
               }
               return item;
            }),
         });
      });
   };

   const handleDeleteMember = (id) => {
      deleteMember([community.id, id, 0, community.room_groups[0].id], () => {
         setData({
            ...data,
            data: items.data.filter((item) => item.id !== id),
         });
         if (isPrint('Member removed successfuly.')) {
            toast.success('Member removed successfuly.');
         }
      });
   };

   const exportMembersCSV = () => {
      exportCommunityMembersCSVfunc(community.id, (response) => {
         const url = window.URL.createObjectURL(new Blob([response]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', `community_${ community.id }_members.csv`);
         document.body.appendChild(link);
         link.click();
         link.parentNode.removeChild(link);
      });
   };

   const importMembersCSV = (data) => {
      const newData = new FormData();
      newData.append('csv', data);
      importCommunityMembersCSVfunc({ id: community.id, file: newData }, () => {
         window.location.reload();
      });
   };

   return (
      <ComponentProgress loading={ loading }>
         {(loadingBanMember || loadingSuspendMember) && <LoaderSpinner />}
         <div className='community__bottom'>
            <div className='community__view'>
               <Members
                  onInviteMember={ () => onInviteMember(match.params.id, match.params.roomId) }
                  searchInput={ searchInput }
                  setSearchInput={ setSearchInput }
                  handleReport={ (...params) => handleReport(...params, match.params.roomId, match.params.groupId) }
                  user={ user }
                  handleMemberFilter={ handleMemberFilter }
                  filterOptions={ filterOptions }
                  setFilterOptions={ setFilterOptions }
                  followUnfollow={ (...props) => {
                     handleFollowUnfollow(...props);
                  } }
                  onlineUsers={ onlineUsers }
                  goToMemberProfile={ (memberId) => goToMemberProfile(match.params.id, memberId) }
                  handleChangePage={ handleChangePage }
                  data={ items }
                  deleteMember={ (id) => handleDeleteMember(id) }
                  members={ data }
                  community={ community }
                  initialCount={ initialLength }
                  banMember={ communityBanMember }
                  suspendMember={ communitySuspendMember }
                  goToMessenger={ goToMessenger }
                  setPopupTitle={ setPopupTitle }
                  setShowPopup={ setShowPopup }
                  showPopup={ showPopup }
                  popupTitle={ popupTitle }
                  exportMembersCSV={ exportMembersCSV }
                  setImportMembersModalOpen={ setImportMembersModalOpen }
                  updateMemberData={ updateMemberData }
               />
            </div>
         </div>
         {importMemberModalOpen && (
            <Popup
               isOpen={ importMemberModalOpen }
               onAcceptText='Upload'
               cancelText='Cancel'
               isAcceptDisabled={ !(file && file.text) }
               onAccept={ () => { importMembersCSV(file); setImportMembersModalOpen(false); setFile({}); } }
               onClose={ () => setImportMembersModalOpen(false) }
            >
               <BulkImportModal
                  file={ file } 
                  isCommunityMember={ true }
                  onChange={ (element) => setFile(element) }
               />
            </Popup>
         )}
      </ComponentProgress>
   );
};

CommunityMembers.propTypes = {
   match: PropTypes.object,
   goToMemberProfile: PropTypes.func,
   handleReport: PropTypes.func,
   user: PropTypes.object,
   onInviteMember: PropTypes.func,
   community: PropTypes.object,
   onlineUsers: PropTypes.array,
   goToMessenger: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      user: state.common.authUser,
      data: selectors.membersPageSelector(state),
      community: selectors.communitySelector(state),
      onlineUsers: onlineUsersSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      onInviteMember: (id, roomId) => {
         dispatch(
            push(
               `${ Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').getCompiledPath({
                  id,
               }) }${ roomId ? `#${ roomId }` : '' }`
            )
         );
      },
      goToMemberProfile: (id, memberId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').getCompiledPath({
                  id,
                  memberId,
               })
            )
         );
      },
      handleReport: (...params) => {
         dispatch(operations.ReportMembersOperation(...params));
      },
      getCommunity: (id, userId) => {
         dispatch(operations.getCommunityOperation(id, userId));
      },
      goToMessenger: (communityId) => {
         dispatch(
            push(
               Router.route('ADMIN_COMMUNITY_MESSENGAR').getCompiledPath({
                  id: communityId,
               })
            )
         );
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityMembers);
