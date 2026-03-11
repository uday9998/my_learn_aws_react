

import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { useHistory } from 'react-router';
import Router from 'routes/router';
import Select from 'components/elements/SelectNew';
import recentActivityImg from 'assets/images/dashboard/recentactivity.png';
import Acitvity from 'components/modules/Activitys';


function ReportDashboardRecentActivity({
   activity, delimeter, changeDelimeter, loadingActivityDelimeter,
}) {
   const history = useHistory();

   return (
      <div className='report-dashboard-activity'>
         <div className='report-dashboard-activity-header'>
            <div>
               <Text
                  inner='Recent Activity'
                  size={ txtSizes.medium }
                  type={ txtTypes.regularDefaultSmall }
               />
            </div>
            <div>
               <Select
                  iconPositionStart={ true }
                  disableIconAnimation={ true }
                  iconName='SelectCalendar'
                  options={ [{ label: 'Last 30 days', value: 0 },
                     { label: '1 Week', value: 1 },
                     { label: '2 Weeks', value: 2 }] }
                  placeholder='Daily'
                  value={ delimeter }
                  name='delimeter'
                  onChange={ (name, value) => changeDelimeter(name, value) }
                  optionsWrapperClassName='activity-header-options'
               />
            </div>
         </div>
         <div className='report-dashboard-activity-users'>
            { !loadingActivityDelimeter && activity && !activity.length && (
               <div className='recent-activity-empty'>
                  <img src={ recentActivityImg } alt='recent-activity' />
                  <Text
                     inner='It seems that there has been no recent activity.'
                     type={ txtTypes.regularDefaultGrey }
                     size={ txtSizes.small14 }
                  />
               </div>
            )}

            {/* {!loadingActivityDelimeter && activity && !!activity.length && activity.map((user, index) => {
               const key = index;
               return (
                  <div className='report-dashboard-activity-user' key={ key }>
                     <div className='left'>
                        <div className='status status-active' />
                        <div className='user-image'>
                           <img src={ user.picture_full_src } alt='' />
                        </div>
                     </div>
                     <div className='right'>
                        <div className='user-info'>
                           <div className='user-name-sign'>
                              <Text
                                 inner={ user.name }
                                 className='user-name'
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                                 style={ { cursor: 'pointer' } }
                                 onClick={ () => history.push(Router.route('ADMIN_MEMBER_VIEW').getCompiledPath({ id: user.id })) }
                              />
                              <Text
                                 inner='joined to course'
                                 className='user-text-transparent'
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                           </div>
                           <Text inner={ `[${ user.course_name }]` } className='success-text' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                        </div>
                        <div className='user-last-date'>
                           <Text inner={ user.date } className='user-text-transparent' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                        </div>
                     </div>
                  </div>
               );
            })} */}
            {!loadingActivityDelimeter && activity && !!activity.length && <Acitvity list={ activity || [] } />}
            {loadingActivityDelimeter && <LoaderSpinner />}
            {/* {!loadingActivityDelimeter && activity && !activity.length && (
               <div className='notFound'>
                  <Text
                     inner='No Recent Activity'
                     className='user-text-transparent'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.medium }
                  />
               </div>
            )} */}
            {/* <div className='report-dashboard-activity-user'>
               <div className='left'>
                  <div className='status status-inActive' />
                  <div className='user-image'>
                     <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png' alt='' />
                  </div>
               </div>
               <div className='right'>
                  <div className='user-info'>
                     <div className='user-price'>
                        <Text inner='$50.00' className='user-price' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                        <Text inner='refunded to' className='user-text-transparent' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                     </div>
                     <div className='user-name-sign'>
                        <Text inner='Jenny Wilson' className='user-name' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                     </div>
                  </div>
                  <div className='user-last-date'>
                     <Text inner='1d ago' className='user-text-transparent' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                  </div>
               </div>
            </div> */}
         </div>
      </div>
   );
}

ReportDashboardRecentActivity.propTypes = {
   activity: PropTypes.array,
   delimeter: PropTypes.number,
   changeDelimeter: PropTypes.func,
   loadingActivityDelimeter: PropTypes.bool,
};


export default ReportDashboardRecentActivity;
