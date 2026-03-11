import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import MemberProfileView from 'views/pages/community/MemberProfile';
import { connect } from 'react-redux';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import ComponentProgress from 'components/modules/ComponentProgress';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import { useHistory } from 'react-router';

const MemberProfile = ({
   match, getCommunity, progress, community, getMember, memberProgress, member, user,
   userSubscribe, removeMember, filterMember, goToCommunity, role,
}) => {
   useEffect(() => {
      getCommunity(match.params.id, user.id);
      getMember(match.params.memberId);
   }, []);
   const onSelectCommunity = () => {
      goToCommunity(community.id);
   };
   const history = useHistory();

   return (
      <div className='community communityWithoutSidebar'>
         <ComponentProgress loading={ progress || memberProgress }>
            <HeaderTypeFirst
               title={ member.name }
               goBack={ () => history.goBack() }
            />
            <div className='community__bottom community__bottom__withoutmenu'>
               <CommunitySideBar user={ user } />
               <div className='community__view'>
                  <MemberProfileView
                     user={ user }
                     role={ role }
                     onSelectCommunity={ onSelectCommunity }
                     community={ community }
                     userSubscribe={ userSubscribe }
                     onDelete={ () => {
                        removeMember(match.params.memberId, community.id, goToCommunity(match.params.id));
                     } }
                     communityName={ community.name }
                     member={ member }
                     filterMember={ filterMember }
                     communityOwnerId={ !progress ? community.owner?.id : null }
                  />
               </div>
            </div>
         </ComponentProgress>
      </div>
   );
};

MemberProfile.propTypes = {
   match: PropTypes.object,
   getCommunity: PropTypes.func,
   community: PropTypes.object,
   userSubscribe: PropTypes.func,
   getMember: PropTypes.func,
   member: PropTypes.object,
   memberProgress: PropTypes.bool,
   progress: PropTypes.bool,
   goToCommunity: PropTypes.func,
   user: PropTypes.object,
   filterMember: PropTypes.func,
   removeMember: PropTypes.func,
   role: PropTypes.string,
};

const mapStateToProps = (state) => {
   return {
      progress: selectors.communityProgressSelector(state),
      user: state.common.authUser,
      community: selectors.communitySelector(state),
      memberProgress: selectors.memberProgressSelector(state),
      member: selectors.memberSelector(state),
      role: selectors.selectLoginedUserRole(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCommunity: (id, userId) => {
         dispatch(operations.getCommunityOperation(id, userId));
      },
      goToCommunity: id => {
         dispatch(push(Router.route('ADMIN_COMMUNITY').getCompiledPath({ id })));
      },
      userSubscribe: id => dispatch(operations.userSubscribeOperation(id)),
      getMember: id => dispatch(operations.userGetOperation(id)),
      removeMember: (id, communityId, callBack) => {
         dispatch(operations.communityMemberRemoveOperation(id, communityId, callBack));
      },
      filterMember: (...params) => dispatch(operations.filterMemberOperation(...params)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberProfile);
