import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Router from 'routes/router';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const NotFound = lazy(() => import('views/pages/404'));
const offersPage = lazy(() => import('containers/pages/mixed/offers'));
const coursesPage = lazy(() => import('containers/pages/mixed/RedirectPage'));
const CommunitySchoolRoom = lazy(() => import('containers/pages/mixed/community'));
const CommunityRoomCreate = lazy(() => import('containers/pages/admin/community/createRoom'));
const CommunityInviteMember = lazy(() => import('containers/pages/admin/community/inviteMember'));
const CommunityEventCreate = lazy(() => import('containers/pages/admin/community/eventCreate'));
const CommunityEventSettings = lazy(() => import('containers/pages/admin/community/eventSettings'));
const CommunityPostCreate = lazy(() => import('containers/pages/admin/community/postCreate'));
const CommunitySettings = lazy(() => import('containers/pages/admin/community/settings'));
const CommunityRoomSettings = lazy(() => import('containers/pages/admin/community/roomSettings'));
const CommunityMemberProfile = lazy(() => import('containers/pages/admin/community/memberProfile'));
const CommunityRoomMembers = lazy(() => import('containers/pages/admin/community/roomMembers'));
const CommunityMessengar = lazy(() => import('containers/modules/community/messengar'));
const CommunityMembers = lazy(() => import('containers/pages/admin/community/members'));
const CommunityHome = lazy(() => import('containers/pages/admin/community/home'));
const Community = lazy(() => import('containers/pages/admin/community'));

export default () => {
   return (
      <Suspense fallback={ <LoaderSpinner /> }>
         <Switch>
            <Route exact path='/portal'>
               <Redirect to='/portal/membership' />
            </Route>
            <Route exact={ Router.route('COURSES').isExact() } path={ Router.route('COURSES').getMask() } component={ offersPage } />
            <Route exact={ Router.route('OFFERS').isExact() } path={ Router.route('OFFERS').getMask() } component={ offersPage } />
            <Route exact={ Router.route('MEMBERSHIP_CATEGORY').isExact() } path={ Router.route('MEMBERSHIP_CATEGORY').getMask() } component={ offersPage } />
            <Route exact={ Router.route('ONLINE_COURSE_PORTALS').isExact() } path={ Router.route('ONLINE_COURSE_PORTALS').getMask() } component={ offersPage } />
            <Route exact={ Router.route('MEMBERSHIP_PLAYLIST').isExact() } path={ Router.route('MEMBERSHIP_PLAYLIST').getMask() } component={ offersPage } />
            <Route exact={ Router.route('FRONT_COMMUNITY').isExact() } path={ Router.route('FRONT_COMMUNITY').getMask() } component={ CommunitySchoolRoom } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_ROOM_CREATE').isExact() } path={ Router.route('ADMIN_COMMUNITY_ROOM_CREATE').getMask() } component={ CommunityRoomCreate } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').isExact() } path={ Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').getMask() } component={ CommunityInviteMember } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_ROOM_EVENT').isExact() } path={ Router.route('ADMIN_COMMUNITY_ROOM_EVENT').getMask() } component={ CommunityEventCreate } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_EVENT_SETTINGS').isExact() } path={ Router.route('ADMIN_COMMUNITY_EVENT_SETTINGS').getMask() } component={ CommunityEventSettings } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_ROOM_POST').isExact() } path={ Router.route('ADMIN_COMMUNITY_ROOM_POST').getMask() } component={ CommunityPostCreate } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_SETTINGS').isExact() } path={ Router.route('ADMIN_COMMUNITY_SETTINGS').getMask() } component={ CommunitySettings } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_MESSENGAR').isExact() } path={ Router.route('ADMIN_COMMUNITY_MESSENGAR').getMask() } component={ CommunityMessengar } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_ROOM_SETTINGS').isExact() } path={ Router.route('ADMIN_COMMUNITY_ROOM_SETTINGS').getMask() } component={ CommunityRoomSettings } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_MEMBERS').isExact() } path={ Router.route('ADMIN_COMMUNITY_MEMBERS').getMask() } component={ Community } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').isExact() } path={ Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').getMask() } component={ CommunityMemberProfile } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_ROOM_MEMBERS').isExact() } path={ Router.route('ADMIN_COMMUNITY_ROOM_MEMBERS').getMask() } component={ CommunityRoomMembers } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_PORTAL').isExact() } path={ Router.route('ADMIN_COMMUNITY_PORTAL').getMask() } component={ Community } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_CALENDAR').isExact() } path={ Router.route('ADMIN_COMMUNITY_CALENDAR').getMask() } component={ Community } />
            <Route component={ NotFound } />
         </Switch>
      </Suspense>
   );
};
