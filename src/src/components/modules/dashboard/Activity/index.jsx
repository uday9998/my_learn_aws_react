import React, { useState } from 'react';
import './index.scss';
// import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Select from 'components/elements/SelectNew';
import {
   recentActivity,
} from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Router from 'routes/router';
import { useHistory } from 'react-router';
import recentActivityImg from 'assets/images/dashboard/recentactivity.png';

const Activity = () => {
   const {
      data: activity, loading: loadingRecentActivity, setData: setActivity,
   } = useApiQuery(recentActivity);

   const history = useHistory();
   const [recentActivityFunc, { loading: loadingActivityDelimeter }] = useSubmitForm(recentActivity, {
      successMessage: '',
   });

   const [delimeter, setDelimeter] = useState(0);

   const changeDelimeter = (name, value) => {
      setDelimeter(value);
      recentActivityFunc({ delimeter: value }, (res) => {
         setActivity(res);
      });
   };

   return (
      <div className='miestro_activity'>
         <div className='recent-activity'>
            <div className='recent-activity-header'>
               <Text
                  type={ txtTypes.medium153 }
                  size={ txtSizes.large }
                  inner='Recent Activity'
               />

               <div>
                  <Select
                     iconPositionStart={ true }
                     disableIconAnimation={ true }
                     iconName='SelectCalendar'
                     options={ [{ label: 'Last 30 days', value: 0 },
                        { label: 'Last Week', value: 1 },
                        { label: 'Last 2 Weeks', value: 2 }] }
                     placeholder='Daily'
                     value={ delimeter }
                     name='delimeter'
                     onChange={ (name, value) => changeDelimeter(name, value) }
                  />
               </div>

            </div>
            <div className='grey_scale' />


            <div className='recent-activity-users'>
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

               {!loadingActivityDelimeter && activity && !!activity.length && activity.map((user, index) => {
                  const key = index;
                  return (
                     <div className='recent-activity-user' key={ key }>
                        <div className='left'>
                           {/* <div className='status status-active' /> */}
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
                                    onClick={ () => history.push(Router.route('ADMIN_MEMBER_VIEW').getCompiledPath({ id: user.id })) }
                                    style={ { cursor: 'pointer' } }
                                 />
                                 <Text inner='joined to course' className='user-text-transparent' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                              </div>
                              <Text inner={ `[${ user.course_name }]` } className='success-text' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                           </div>
                           <div className='user-last-date'>
                              <Text inner={ user.date } className='user-text-transparent' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                           </div>
                        </div>
                     </div>
                  );
               })}
               {(loadingActivityDelimeter || loadingRecentActivity) && <LoaderSpinner width={ 150 } heigth={ 150 } />}
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
            </div>
         </div>
      </div>
   );
};

Activity.propTypes = {

};

export default Activity;
