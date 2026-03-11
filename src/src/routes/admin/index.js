import React, { Suspense, lazy, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Router from 'routes/router';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { useSelector } from 'react-redux';
import { mainAppSelector } from 'state/modules/common/selectors';

const AIAssistantContainer = lazy(() => import('containers/pages/admin/aiAssistant'));
const ContentAIContainer = lazy(() => import('containers/pages/admin/contentAI'));
const CommunityAIContainer = lazy(() => import('containers/pages/admin/communityAI'));
const CommunityAIPostContainer = lazy(() => import('containers/pages/admin/communityAICreatePost'));
const AIChatbotDemo = lazy(() => import('views/pages/AIChatbotDemo/AIChatbotDemo'));
const CourseOutlineGenerator = lazy(() => import('containers/pages/admin/ai/CourseOutlineGenerator'));
const QuizGenerator = lazy(() => import('containers/pages/admin/ai/QuizGenerator'));
const EmailGenerator = lazy(() => import('containers/pages/admin/ai/EmailGenerator'));
const ChatbotSettings = lazy(() => import('containers/pages/admin/ai/ChatbotSettings'));
const AILearningContainer = lazy(() => import('containers/pages/admin/aiLearning'));
const AIEmailGeneratorContainer = lazy(() => import('containers/pages/admin/aiEmailGenerator'));

const AffilateProgramContainer = lazy(() => import('containers/pages/admin/promotions/affilateProgram'));
const AffilatesContainer = lazy(() => import('containers/pages/admin/promotions/affilates'));
const CoursesContainer = lazy(() => import('containers/pages/admin/designCourse/courses'));
const ReorderCoursesContainer = lazy(() => import('containers/pages/admin/designCourse/reorderCourses'));
const LandingPagesContainer = lazy(() => import('containers/pages/admin/landingPages'));
const LandingPagesEditContainer = lazy(() => import('containers/pages/admin/landingPages/edit'));
const CourseEditContainer = lazy(() => import('containers/pages/admin/designCourse/courses/edit'));
const CreateCourseContainer = lazy(() => import('containers/pages/admin/designCourse/courses/create'));
const CreateLessonContainer = lazy(() => import('containers/pages/admin/designCourse/courses/createLesson'));
const DashboardContainer = lazy(() => import('containers/pages/admin/dashboard'));
const EmailsContainer = lazy(() => import('containers/pages/admin/promotions/emails'));
// const GamificationContainer = lazy(() => import('containers/pages/admin/promotions/gamification'));
const SettingsContainer = lazy(() => import('containers/pages/admin/settings'));
// const TemplatesContainer = lazy(() => import('containers/pages/admin/designCourse/templates'));
const HelpContainer = lazy(() => import('containers/pages/admin/help'));
const MembersContainer = lazy(() => import('containers/pages/admin/members'));
const ReportsContainer = lazy(() => import('containers/pages/admin/reports'));
const PlansContainer = lazy(() => import('containers/pages/admin/plans'));
const SiteContainer = lazy(() => import('containers/pages/admin/site'));
const SettingsVideoContainer = lazy(() => import('containers/pages/admin/settings/video'));
const RevenueReportsContainer = lazy(() => import('containers/pages/admin/revenueReports'));
const TransactionsContainer = lazy(() => import('containers/pages/admin/transactions'));
const SuspendedContainer = lazy(() => import('containers/pages/admin/Suspended'));
const MediaLibraryContainer = lazy(() => import('containers/pages/admin/medialibrary'));
const AutomationsContainer = lazy(() => import('containers/pages/admin/automations'));
const AutomationCreateContainer = lazy(() => import('containers/pages/admin/automations/automationcreate'));
const AppBuilderContainer = lazy(() => import('containers/pages/admin/appBuilder'));
const BlogContainer = lazy(() => import('containers/pages/admin/blog'));
const BlogCreateEditContainer = lazy(() => import('containers/pages/admin/blog/blogCreateEdit'));
const CertificatesContainer = lazy(() => import('containers/pages/admin/certificates'));
// const CreateCertificateContainer = lazy(() => import('views/pages/certificates/certificatesContent'));
const CreateCertificateContainer = lazy(() => import('containers/pages/admin/createCertificates'));
const EditCertificateContainer = lazy(() => import('containers/pages/admin/certificates/edit'));
const SettingsCertificateContainer = lazy(() => import('containers/pages/admin/certificates/settings'));
const LandingPagesCreateContainer = lazy(() => import('containers/pages/admin/landingPages/create'));
const LandingPagesDetailsContainer = lazy(() => import('containers/pages/admin/landingPages/details'));
const LiveStreamContainer = lazy(() => import('containers/pages/admin/liveStream'));
const SchoolRoomContainer = lazy(() => import('containers/pages/admin/schoolRoom'));
const SchoolRoomCustomizeCodeContainer = lazy(() => import('containers/pages/admin/schoolRoomCustomizeCode'));
const SchoolRoomEditContainer = lazy(() => import('containers/pages/admin/schoolRoom/edit'));
const SchoolRoomSettingsContainer = lazy(() => import('containers/pages/admin/schoolRoom/settings'));
const DashboardReport = lazy(() => import('containers/pages/admin/dashboardReports'));
const NetRevenue = lazy(() => import('containers/pages/admin/netRevenue'));
const PageView = lazy(() => import('containers/pages/admin/pageViews'));
const SubscriptionMetrics = lazy(() => import('containers/pages/admin/subscriptionMetrics'));
const Refounds = lazy(() => import('containers/pages/admin/refounds'));
const VideoMetrics = lazy(() => import('containers/pages/admin/videoMetrics'));
const ClassProgress = lazy(() => import('containers/pages/admin/classProgress'));
const ClassProgressMemberView = lazy(() => import('containers/pages/admin/classProgress/classProgressUserView'));
const Member = lazy(() => import('containers/pages/admin/member'));
const NotFound = lazy(() => import('views/pages/404'));
const AdminAccount = lazy(() => import('containers/pages/admin/account'));
const NotificationEdit = lazy(() => import('containers/pages/admin/notificationEdit'));
const EmailTracking = lazy(() => import('containers/pages/admin/EmailTracking'));
const Categorys = lazy(() => import('containers/pages/admin/categories'));
const CategoriesCreate = lazy(() => import('containers/pages/admin/categories/create'));
const VideoCategories = lazy(() => import('containers/pages/admin/categories/video'));
const PlayLists = lazy(() => import('containers/pages/admin/playLists'));
const VideoCategoriesCreate = lazy(() => import('containers/pages/admin/categories/video/create'));
const Comments = lazy(() => import('containers/pages/admin/comments'));
const CommentFeed = lazy(() => import('containers/pages/admin/comments/CommentFeed'));
const Community = lazy(() => import('containers/pages/admin/community'));
const Quizzes = lazy(() => import('containers/pages/admin/quizzes'));
const CreateQuiz = lazy(() => import('containers/pages/admin/quizzes/createQuiz'));
const EditQuiz = lazy(() => import('containers/pages/admin/quizzes/editQuiz'));
const UserQuizResult = lazy(() => import('containers/pages/admin/quizzes/userQuizResult'));
const CreatePlan = lazy(() => import('containers/pages/admin/plans/create'));
const CreateMembership = lazy(() => import('containers/pages/admin/plans/createMembership'));
const EditPlan = lazy(() => import('containers/pages/admin/plans/edit'));
const EditCoursePlan = lazy(() => import('containers/pages/admin/designCourse/plans/edit'));
const PlanOrderBump = lazy(() => import('containers/pages/admin/plans/orderBump'));
const OrderBumpEdit = lazy(() => import('containers/pages/admin/plans/orderBumpEdit'));
const CouponsPage = lazy(() => import('containers/pages/admin/coupons'));
const CouponsCreatePage = lazy(() => import('containers/pages/admin/coupons/create'));
const CouponEditPage = lazy(() => import('containers/pages/admin/coupons/edit'));
const UpsellCreate = lazy(() => import('containers/pages/admin/upsell/create'));
const Quiz = lazy(() => import('containers/pages/admin/quizzes/quiz'));
const OfferCheckoutEdit = lazy(() => import('containers/pages/admin/plans/checkout'));
const EmailsCreateContainer = lazy(() => import('containers/pages/admin/promotions/emails/emailsCreate'));
const DownSellCreate = lazy(() => import('containers/pages/admin/upsell/downSellCreate'));
const UpsellEditPage = lazy(() => import('containers/pages/admin/upsell/edit'));
const UpsellPreview = lazy(() => import('containers/pages/admin/upsell/preview'));
const Affiliate = lazy(() => import('containers/pages/admin/affiliate'));
const AffiliateCreate = lazy(() => import('containers/pages/admin/affiliate/Create'));
const EmailsEditContainer = lazy(() => import('containers/pages/admin/promotions/emails/emailsEdit'));
const DownsellEdit = lazy(() => import('containers/pages/admin/upsell/downSellEdit'));
const DownsellPreview = lazy(() => import('containers/pages/admin/upsell/downsellPreview'));
const AffiliateUser = lazy(() => import('containers/pages/admin/affiliate/User'));
const AffiliateInviteUsers = lazy(() => import('containers/pages/admin/affiliate/Invite'));
const AffiliateSettings = lazy(() => import('containers/pages/admin/affiliate/Settings'));
const AffiliateProgramEdit = lazy(() => import('containers/pages/admin/affiliate/Edit'));
const AffiliateTemplateEditor = lazy(() => import('containers/pages/admin/affiliate/TemplateEditor'));
const AffiliateTemplatePreview = lazy(() => import('containers/pages/admin/affiliate/TemplatePreview'));
const AutomationCreatePage = lazy(() => import('containers/pages/admin/automations/AutomationCreatePage'));
const CommunityRoomCreate = lazy(() => import('containers/pages/admin/community/createRoom'));
const CommunityInviteMember = lazy(() => import('containers/pages/admin/community/inviteMember'));
const CommunityEventCreate = lazy(() => import('containers/pages/admin/community/eventCreate'));
const CommunityEventSettings = lazy(() => import('containers/pages/admin/community/eventSettings'));
const CommunityPostCreate = lazy(() => import('containers/pages/admin/community/postCreate'));
const CommunitySettings = lazy(() => import('containers/pages/admin/community/settings'));
const CommunityPricing = lazy(() => import('containers/pages/admin/community/pricing'));
const CommunityRoomSettings = lazy(() => import('containers/pages/admin/community/roomSettings'));
const CommunityMemberProfile = lazy(() => import('containers/pages/admin/community/memberProfile'));
const CommunityRoomMembers = lazy(() => import('containers/pages/admin/community/roomMembers'));
const OtherPages = lazy(() => import('containers/pages/admin/otherpages'));
const OtherPage = lazy(() => import('containers/pages/admin/otherpages/Explore'));
const OtherPageEdit = lazy(() => import('containers/pages/admin/otherpages/Edit'));
const ThankYouPreviewPage = lazy(() => import('containers/pages/admin/thankYouPreview'));
const OtherPagePreview = lazy(() => import('containers/pages/admin/otherpages/Preview'));
const CommunityMessengar = lazy(() => import('containers/modules/community/messengar'));
const CommunityMembers = lazy(() => import('containers/pages/admin/community/members'));
// const CommunityHome = lazy(() => import('containers/pages/admin/community/home'));
const CreatePlaylist = lazy(() => import('containers/pages/admin/createPlaylist'));


export default () => {
   const mainApp = useSelector(mainAppSelector);

   useEffect(() => {
      document.querySelector('html').style.backgroundColor = '';
   }, []);
   return (
      <Suspense fallback={<LoaderSpinner />}>
         <Switch>
            <Route exact={Router.route('ADMIN_DASHBOARD').isExact()} path={Router.route('ADMIN_DASHBOARD').getMask()} component={DashboardContainer} />
            <Route exact={true} path='/admin/thank-you' component={() => (<Redirect to='/' />)} />
            <Route exact={Router.route('ADMIN_COURSES').isExact()} path={Router.route('ADMIN_COURSES').getMask()} component={CoursesContainer} />
            <Route exact={Router.route('ADMIN_COURSES_CREATE').isExact()} path={Router.route('ADMIN_COURSES_CREATE').getMask()} component={CreateCourseContainer} />
            <Route exact={Router.route('ADMIN_COURSES_EDIT').isExact()} path={Router.route('ADMIN_COURSES_EDIT').getMask()} component={CourseEditContainer} />
            <Route exact={Router.route('ADMIN_EMAILS').isExact()} path={Router.route('ADMIN_EMAILS').getMask()} component={EmailsContainer} />
            <Route exact={Router.route('ADMIN_HELP').isExact()} path={Router.route('ADMIN_HELP').getMask()} component={HelpContainer} />
            <Route exact={Router.route('ADMIN_MEMBERS').isExact()} path={Router.route('ADMIN_MEMBERS').getMask()} component={MembersContainer} />
            <Route exact={Router.route('ADMIN_REPORTS').isExact()} path={Router.route('ADMIN_REPORTS').getMask()} component={ReportsContainer} />
            <Route exact={Router.route('ADMIN_PLANS').isExact()} path={Router.route('ADMIN_PLANS').getMask()} component={PlansContainer} />
            <Route exact={Router.route('ADMIN_AFFILATE_PROGRAM').isExact()} path={Router.route('ADMIN_AFFILATE_PROGRAM').getMask()} component={AffilateProgramContainer} />
            <Route exact={Router.route('ADMIN_AFFILATES').isExact()} path={Router.route('ADMIN_AFFILATES').getMask()} component={AffilatesContainer} />
            <Route exact={Router.route('ADMIN_SITE').isExact()} path={Router.route('ADMIN_SITE').getMask()} component={SiteContainer} />
            <Route exact={Router.route('ADMIN_SETTINGS').isExact()} path={Router.route('ADMIN_SETTINGS').getMask()} component={SettingsContainer} />
            <Route exact={Router.route('ADMIN_SETTINGS_VIDEO').isExact()} path={Router.route('ADMIN_SETTINGS_VIDEO').getMask()} component={SettingsVideoContainer} />
            <Route exact={Router.route('ADMIN_REVENUE_REPORTS').isExact()} path={Router.route('ADMIN_REVENUE_REPORTS').getMask()} component={RevenueReportsContainer} />
            <Route exact={Router.route('ADMIN_TRANSACTIONS').isExact()} path={Router.route('ADMIN_TRANSACTIONS').getMask()} component={TransactionsContainer} />
            <Route exact={ Router.route('ADMIN_SUSPENDED').isExact() } path={ Router.route('ADMIN_SUSPENDED').getCompiledPath({ suspended: mainApp?.pause_plan ? 'paused' : 'suspended' }) } component={ SuspendedContainer } />
            <Route exact={Router.route('ADMIN_VIDEOLIBRARY').isExact()} path={Router.route('MEDIA_LIBRARY').getMask()} component={MediaLibraryContainer} />
            <Route exact={Router.route('ADMIN_AUTOMATIONS').isExact()} path={Router.route('ADMIN_AUTOMATIONS').getMask()} component={AutomationsContainer} />
            <Route exact={Router.route('ADMIN_AUTOMATION_EDIT').isExact()} path={Router.route('ADMIN_AUTOMATION_EDIT').getMask()} component={AutomationCreateContainer} />
            <Route exact={true} path='/admin/ai-chatbot-demo' component={AIChatbotDemo} />
            <Route exact={Router.route('ADMIN_APP_BUILDER').isExact()} path={Router.route('ADMIN_APP_BUILDER').getMask()} component={AppBuilderContainer} />
            <Route exact={Router.route('ADMIN_BLOG').isExact()} path={Router.route('ADMIN_BLOG').getMask()} component={BlogContainer} />
            <Route exact={Router.route('ADMIN_BLOG_EDIT').isExact()} path={Router.route('ADMIN_BLOG_EDIT').getMask()} component={BlogCreateEditContainer} />
            <Route exact={Router.route('ADMIN_CERTIFICATES').isExact()} path={Router.route('ADMIN_CERTIFICATES').getMask()} component={CertificatesContainer} />
            <Route exact={false} path={Router.route('ADMIN_CREATE_CERTIFICATE').getMask()} component={CreateCertificateContainer} />
            <Route exact={false} path={Router.route('ADMIN_EDIT_CERTIFICATE').getMask()} component={EditCertificateContainer} />
            <Route exact={false} path={Router.route('ADMIN_SETTINGS_CERTIFICATE').getMask()} component={SettingsCertificateContainer} />
            <Route exact={false} path={Router.route('ADMIN_REORDER_COURSES').getMask()} component={ReorderCoursesContainer} />
            <Route exact={Router.route('ADMIN_LANDING_PAGES').isExact()} path={Router.route('ADMIN_LANDING_PAGES').getMask()} component={LandingPagesContainer} />
            <Route exact={Router.route('ADMIN_LANDING_PAGES_EDIT').isExact()} path={Router.route('ADMIN_LANDING_PAGES_EDIT').getMask()} component={LandingPagesEditContainer} />
            <Route exact={Router.route('ADMIN_LANDING_PAGES_CREATE').isExact()} path={Router.route('ADMIN_LANDING_PAGES_CREATE').getMask()} component={LandingPagesCreateContainer} />
            <Route exact={Router.route('ADMIN_LANDING_PAGES_DETAILS').isExact()} path={Router.route('ADMIN_LANDING_PAGES_DETAILS').getMask()} component={LandingPagesDetailsContainer} />
            <Route exact={Router.route('ADMIN_LIVE_STREAM').isExact()} path={Router.route('ADMIN_LIVE_STREAM').getMask()} component={LiveStreamContainer} />
            <Route exact={Router.route('ADMIN_SCHOOL_ROOM').isExact()} path={Router.route('ADMIN_SCHOOL_ROOM').getMask()} component={SchoolRoomContainer} />
            <Route exact={Router.route('ADMIN_SCHOOL_ROOM_CUSTOMIZE').isExact()} path={Router.route('ADMIN_SCHOOL_ROOM_CUSTOMIZE').getMask()} component={SchoolRoomCustomizeCodeContainer} />
            <Route exact={Router.route('ADMIN_SCHOOL_ROOM_EDIT').isExact()} path={Router.route('ADMIN_SCHOOL_ROOM_EDIT').getMask()} component={SchoolRoomEditContainer} />
            <Route exact={Router.route('ADMIN_SCHOOL_ROOM_SETTINGS').isExact()} path={Router.route('ADMIN_SCHOOL_ROOM_SETTINGS').getMask()} component={SchoolRoomSettingsContainer} />
            <Route exact={Router.route('ADMIN_REPORTS_DASHBOARD').isExact()} path={Router.route('ADMIN_REPORTS_DASHBOARD').getMask()} component={DashboardReport} />
            <Route exact={Router.route('ADMIN_NET_REVENUE').isExact()} path={Router.route('ADMIN_NET_REVENUE').getMask()} component={NetRevenue} />
            <Route exact={Router.route('ADMIN_SUBSCRIPTION_METRICS').isExact()} path={Router.route('ADMIN_SUBSCRIPTION_METRICS').getMask()} component={SubscriptionMetrics} />
            <Route exact={Router.route('ADMIN_REFOUNDS').isExact()} path={Router.route('ADMIN_REFOUNDS').getMask()} component={Refounds} />
            <Route exact={Router.route('ADMIN_PAGE_VIEWS').isExact()} path={Router.route('ADMIN_PAGE_VIEWS').getMask()} component={PageView} />
            <Route exact={Router.route('ADMIN_VIDEO_METRICS').isExact()} path={Router.route('ADMIN_VIDEO_METRICS').getMask()} component={VideoMetrics} />
            <Route exact={Router.route('ADMIN_CLASS_PROGRESS').isExact()} path={Router.route('ADMIN_CLASS_PROGRESS').getMask()} component={ClassProgress} />
            <Route exact={Router.route('ADMIN_CLASS_PROGRESS_VIEW').isExact()} path={Router.route('ADMIN_CLASS_PROGRESS_VIEW').getMask()} component={ClassProgressMemberView} />
            <Route exact={Router.route('ADMIN_MEMBER_VIEW').isExact()} path={Router.route('ADMIN_MEMBER_VIEW').getMask()} component={Member} />
            <Route exact={Router.route('ADMIN_ACCOUNT').isExact()} path={Router.route('ADMIN_ACCOUNT').getMask()} component={AdminAccount} />
            <Route exact={Router.route('ADMIN_EMAIL_TRACKING').isExact()} path={Router.route('ADMIN_EMAIL_TRACKING').getMask()} component={EmailTracking} />
            <Route exact={false} path={Router.route('EDIT_NOTIFICATIONS').getMask()} component={NotificationEdit} />
            <Route exact={Router.route('ADMIN_LESSON_CREATE').isExact()} path={Router.route('ADMIN_LESSON_CREATE').getMask()} component={CreateLessonContainer} />
            <Route exact={Router.route('ADMIN_VIDEO_LESSON_CREATE').isExact()} path={Router.route('ADMIN_VIDEO_LESSON_CREATE').getMask()} component={CreateLessonContainer} />
            <Route exact={Router.route('ADMIN_CATEGORIES').isExact()} path={Router.route('ADMIN_CATEGORIES').getMask()} component={Categorys} />
            <Route exact={Router.route('ADMIN_CATEGORIES_CREATE').isExact()} path={Router.route('ADMIN_CATEGORIES_CREATE').getMask()} component={CategoriesCreate} />
            <Route exact={Router.route('ADMIN_COURSE_COMMENTS').isExact()} path={Router.route('ADMIN_COURSE_COMMENTS').getMask()} component={Comments} />
            <Route exact={Router.route('ADMIN_COMMENT_FEED').isExact()} path={Router.route('ADMIN_COMMENT_FEED').getMask()} component={CommentFeed} />
            <Route exact={Router.route('ADMIN_COMMUNITY').isExact()} path={Router.route('ADMIN_COMMUNITY').getMask()} component={Community} />
            <Route exact={Router.route('ADMIN_QUIZZES').isExact()} path={Router.route('ADMIN_QUIZZES').getMask()} component={Quizzes} />
            <Route exact={Router.route('ADMIN_CREATE_QUIZ').isExact()} path={Router.route('ADMIN_CREATE_QUIZ').getMask()} component={CreateQuiz} />
            <Route exact={Router.route('ADMIN_EDIT_QUIZ').isExact()} path={Router.route('ADMIN_EDIT_QUIZ').getMask()} component={EditQuiz} />
            <Route exact={Router.route('ADMIN_QUIZ').isExact()} path={Router.route('ADMIN_QUIZ').getMask()} component={Quiz} />
            <Route exact={Router.route('ADMIN_QUIZ_RESULT').isExact()} path={Router.route('ADMIN_QUIZ_RESULT').getMask()} component={UserQuizResult} />
            <Route exact={Router.route('ADMIN_CREATE_PLAN').isExact()} path={Router.route('ADMIN_CREATE_PLAN').getMask()} component={CreatePlan} />
            <Route exact={Router.route('ADMIN_PLAN_EDIT').isExact()} path={Router.route('ADMIN_PLAN_EDIT').getMask()} component={EditPlan} />
            <Route exact={Router.route('ADMIN_ORDER_BUMP_CREATE').isExact()} path={Router.route('ADMIN_ORDER_BUMP_CREATE').getMask()} component={PlanOrderBump} />
            <Route exact={Router.route('ADMIN_ORDER_BUMP').isExact()} path={Router.route('ADMIN_ORDER_BUMP').getMask()} component={OrderBumpEdit} />
            <Route exact={Router.route('ADMIN_COUPONS').isExact()} path={Router.route('ADMIN_COUPONS').getMask()} component={CouponsPage} />
            <Route exact={Router.route('ADMIN_COUPONS_CREATE').isExact()} path={Router.route('ADMIN_COUPONS_CREATE').getMask()} component={CouponsCreatePage} />
            <Route exact={Router.route('ADMIN_COUPON_VIEW').isExact()} path={Router.route('ADMIN_COUPON_VIEW').getMask()} component={CouponEditPage} />
            <Route exact={Router.route('ADMIN_UPSELL_CREATE').isExact()} path={Router.route('ADMIN_UPSELL_CREATE').getMask()} component={UpsellCreate} />
            <Route exact={Router.route('ADMIN_OFFER_CHECKOUT').isExact()} path={Router.route('ADMIN_OFFER_CHECKOUT').getMask()} component={OfferCheckoutEdit} />
            <Route exact={Router.route('ADMIN_EMAILS_CREATE').isExact()} path={Router.route('ADMIN_EMAILS_CREATE').getMask()} component={EmailsCreateContainer} />
            <Route exact={Router.route('ADMIN_DOWNSELL_CREATE').isExact()} path={Router.route('ADMIN_DOWNSELL_CREATE').getMask()} component={DownSellCreate} />
            <Route exact={Router.route('ADMIN_UPSELL_EDIT').isExact()} path={Router.route('ADMIN_UPSELL_EDIT').getMask()} component={UpsellEditPage} />
            <Route exact={Router.route('ADMIN_UPSELL_PREVIEW').isExact()} path={Router.route('ADMIN_UPSELL_PREVIEW').getMask()} component={UpsellPreview} />
            <Route exact={Router.route('ADMIN_AFFILIATE').isExact()} path={Router.route('ADMIN_AFFILIATE').getMask()} component={Affiliate} />
            <Route exact={Router.route('ADMIN_AFFILIATE_CREATE').isExact()} path={Router.route('ADMIN_AFFILIATE_CREATE').getMask()} component={AffiliateCreate} />
            <Route exact={Router.route('ADMIN_DOWNSELL_PREVIEW').isExact()} path={Router.route('ADMIN_DOWNSELL_PREVIEW').getMask()} component={DownsellPreview} />
            <Route exact={Router.route('ADMIN_EMAILS_EDIT').isExact()} path={Router.route('ADMIN_EMAILS_EDIT').getMask()} component={EmailsEditContainer} />
            <Route exact={Router.route('ADMIN_DOWNSELL_EDIT').isExact()} path={Router.route('ADMIN_DOWNSELL_EDIT').getMask()} component={DownsellEdit} />
            <Route exact={Router.route('ADMIN_AFFILIATE_USER').isExact()} path={Router.route('ADMIN_AFFILIATE_USER').getMask()} component={AffiliateUser} />
            <Route exact={Router.route('ADMIN_AFFILIATE_INVITE_USERS').isExact()} path={Router.route('ADMIN_AFFILIATE_INVITE_USERS').getMask()} component={AffiliateInviteUsers} />
            <Route exact={Router.route('ADMIN_AFFILIATE_SETTINGS').isExact()} path={Router.route('ADMIN_AFFILIATE_SETTINGS').getMask()} component={AffiliateSettings} />
            <Route exact={Router.route('ADMIN_AFFILIATE_EDIT').isExact()} path={Router.route('ADMIN_AFFILIATE_EDIT').getMask()} component={AffiliateProgramEdit} />
            <Route exact={Router.route('ADMIN_AFFILIATE_TEMPLATE_EDIT').isExact()} path={Router.route('ADMIN_AFFILIATE_TEMPLATE_EDIT').getMask()} component={AffiliateTemplateEditor} />
            <Route exact={Router.route('ADMIN_AFFILIATE_TEMPLATE_PREVIEW').isExact()} path={Router.route('ADMIN_AFFILIATE_TEMPLATE_PREVIEW').getMask()} component={AffiliateTemplatePreview} />
            <Route exact={Router.route('ADMIN_AUTOMATION_CREATE_PAGE').isExact()} path={Router.route('ADMIN_AUTOMATION_CREATE_PAGE').getMask()} component={AutomationCreatePage} />
            <Route exact={Router.route('ADMIN_COMMUNITY_ROOM_CREATE').isExact()} path={Router.route('ADMIN_COMMUNITY_ROOM_CREATE').getMask()} component={CommunityRoomCreate} />
            <Route exact={Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').isExact()} path={Router.route('ADMIN_COMMUNITY_INVITE_MEMBER').getMask()} component={CommunityInviteMember} />
            <Route exact={Router.route('ADMIN_COMMUNITY_ROOM_EVENT').isExact()} path={Router.route('ADMIN_COMMUNITY_ROOM_EVENT').getMask()} component={CommunityEventCreate} />
            <Route exact={Router.route('ADMIN_COMMUNITY_EVENT_SETTINGS').isExact()} path={Router.route('ADMIN_COMMUNITY_EVENT_SETTINGS').getMask()} component={CommunityEventSettings} />
            <Route exact={Router.route('ADMIN_COMMUNITY_ROOM_POST').isExact()} path={Router.route('ADMIN_COMMUNITY_ROOM_POST').getMask()} component={CommunityPostCreate} />
            <Route exact={Router.route('ADMIN_COMMUNITY_SETTINGS').isExact()} path={Router.route('ADMIN_COMMUNITY_SETTINGS').getMask()} component={CommunitySettings} />
            <Route exact={Router.route('ADMIN_COMMUNITY_ROOM_SETTINGS').isExact()} path={Router.route('ADMIN_COMMUNITY_ROOM_SETTINGS').getMask()} component={CommunityRoomSettings} />
            <Route exact={Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').isExact()} path={Router.route('ADMIN_COMMUNITY_MEMBER_PROFILE').getMask()} component={CommunityMemberProfile} />
            <Route exact={Router.route('ADMIN_COMMUNITY_MESSENGAR').isExact()} path={Router.route('ADMIN_COMMUNITY_MESSENGAR').getMask()} component={CommunityMessengar} />
            <Route exact={Router.route('ADMIN_COMMUNITY_ROOM_MEMBERS').isExact()} path={Router.route('ADMIN_COMMUNITY_ROOM_MEMBERS').getMask()} component={CommunityRoomMembers} />
            <Route exact={Router.route('ADMIN_COMMUNITY_MEMBERS').isExact()} path={Router.route('ADMIN_COMMUNITY_MEMBERS').getMask()} component={Community} />
            <Route exact={Router.route('ADMIN_OTHER_PAGES').isExact()} path={Router.route('ADMIN_OTHER_PAGES').getMask()} component={OtherPages} />
            <Route exact={Router.route('ADMIN_OTHER_PAGE').isExact()} path={Router.route('ADMIN_OTHER_PAGE').getMask()} component={OtherPage} />
            <Route exact={Router.route('ADMIN_OTHER_PAGE_EDIT').isExact()} path={Router.route('ADMIN_OTHER_PAGE_EDIT').getMask()} component={OtherPageEdit} />
            <Route exact={Router.route('THANK_YOU_PREVIEW').isExact()} path={Router.route('THANK_YOU_PREVIEW').getMask()} component={ThankYouPreviewPage} />
            <Route exact={Router.route('ADMIN_OTHER_PAGE_PREVIEW').isExact()} path={Router.route('ADMIN_OTHER_PAGE_PREVIEW').getMask()} component={OtherPagePreview} />
            <Route exact={Router.route('ADMIN_COURSES_PLAN_EDIT').isExact()} path={Router.route('ADMIN_COURSES_PLAN_EDIT').getMask()} component={EditCoursePlan} />
            <Route exact={Router.route('ADMIN_COMMUNITY_PRICING').isExact()} path={Router.route('ADMIN_COMMUNITY_PRICING').getMask()} component={CommunityPricing} />
            <Route exact={Router.route('ADMIN_COURSES_PLAN_CREATE').isExact()} path={Router.route('ADMIN_COURSES_PLAN_CREATE').getMask()} component={EditCoursePlan} />
            <Route exact={Router.route('ADMIN_COMMUNITY_PRICING_CREATE').isExact()} path={Router.route('ADMIN_COMMUNITY_PRICING_CREATE').getMask()} component={CommunityPricing} />
            <Route exact={Router.route('ADMIN_MEMBERSHIP_CREATE').isExact()} path={Router.route('ADMIN_MEMBERSHIP_CREATE').getMask()} component={CreateMembership} />
            <Route exact={Router.route('ADMIN_MEMBERSHIP_EDIT').isExact()} path={Router.route('ADMIN_MEMBERSHIP_EDIT').getMask()} component={EditCoursePlan} />
            <Route exact={Router.route('ADMIN_VIDEO_CATEGORIES').isExact()} path={Router.route('ADMIN_VIDEO_CATEGORIES').getMask()} component={VideoCategories} />
            <Route exact={Router.route('ADMIN_PLAYLISTS').isExact()} path={Router.route('ADMIN_PLAYLISTS').getMask()} component={PlayLists} />
            <Route exact={Router.route('ADMIN_PLAYLIST').isExact()} path={Router.route('ADMIN_PLAYLIST').getMask()} component={CreatePlaylist} />
            <Route exact={Router.route('ADMIN_VIDEO_CATEGORIES_CREATE').isExact()} path={Router.route('ADMIN_VIDEO_CATEGORIES_CREATE').getMask()} component={VideoCategoriesCreate} />
            <Route exact={Router.route('ADMIN_VIDEO_CATEGORIES_EDIT').isExact()} path={Router.route('ADMIN_VIDEO_CATEGORIES_EDIT').getMask()} component={VideoCategories} />
            <Route exact={ Router.route('ADMIN_COMMUNITY_BRIDGE').isExact() } path={ Router.route('ADMIN_COMMUNITY_BRIDGE').getMask() } component={ Community } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_PORTAL').isExact() } path={ Router.route('ADMIN_COMMUNITY_PORTAL').getMask() } component={ Community } />
            <Route exact={ Router.route('ADMIN_COMMUNITY_CALENDAR').isExact() } path={ Router.route('ADMIN_COMMUNITY_CALENDAR').getMask() } component={ Community } />
            <Route exact={Router.route('ADMIN_AI_ASSISTANT').isExact()} path={Router.route('ADMIN_AI_ASSISTANT').getMask()} component={AIAssistantContainer} />
            <Route exact={Router.route('ADMIN_CONTENT_AI').isExact()} path={Router.route('ADMIN_CONTENT_AI').getMask()} component={ContentAIContainer} />
            <Route exact={Router.route('ADMIN_COMMUNITY_AI').isExact()} path={Router.route('ADMIN_COMMUNITY_AI').getMask()} component={CommunityAIContainer} />
            <Route exact={Router.route('ADMIN_COMMUNITY_CREATE_POST').isExact()} path={Router.route('ADMIN_COMMUNITY_CREATE_POST').getMask()} component={CommunityAIPostContainer} />
            <Route exact={Router.route('ADMIN_AI_EMAIL_GENERATOR').isExact()} path={Router.route('ADMIN_AI_EMAIL_GENERATOR').getMask()} component={EmailGenerator} />
            <Route exact path="/admin/ai/chatbot-settings" component={ChatbotSettings} />
            <Route exact path="/admin/ai-chatbot-demo" component={AIChatbotDemo} />
            <Route exact path="/admin/ai/course-outline-generator" component={CourseOutlineGenerator} />
            <Route exact path="/admin/ai/quiz-generator" component={QuizGenerator} />
           
            <Route component={() => <NotFound isAdmin />} />
         </Switch>
      </Suspense>
   );
};
