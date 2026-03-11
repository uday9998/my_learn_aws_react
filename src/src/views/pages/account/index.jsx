import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import TabSwitch from 'components/elements/TabSwitch';
import classnames from 'classnames';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { useSelector } from 'react-redux';
import { isOneTimeUser as checkIsOneTimeUser } from 'utils/storage';
import { mainAppSelector } from 'state/modules/common/selectors';
import AccountSidebar from './accountComponents/accountSidebar';
// import AccountPersonal from './accountComponents/AccountPersonal';
import AccountPlan from './accountComponents/AccountPlan';
import AccountBilling from './accountComponents/AccountBilling';


const MyAccountView = (props) => {
   const { onSwitchTab, isFetching } = props;
   const mainApp = useSelector(mainAppSelector);
   const isOneTimeUser = checkIsOneTimeUser(mainApp.plan_name);

   const [isOpenLeft, setIsOpenLeft] = useState(false);

   return (
      <div className='account__wrapper'>
         <TabSwitch
            onSwitchTab={ onSwitchTab }
            dataIsFetching={ false }
            initialTab='billing'
         >
            {isFetching && (
               <LoaderSpinner />
            )}
            <div className='d-account flex h-full w-full accountPage'>
               <div
                  className={ `content_left ${ isOpenLeft ? 'opened' : 'closed' }` }
               >
                  <TabSwitch.Tab>
                     <AccountSidebar
                        { ...props }
                        isOpenOnMob={ isOpenLeft }
                        setisOpenOnMob={ setIsOpenLeft }
                     />
                  </TabSwitch.Tab>
               </div>
               {
                  (!isFetching && isFetching !== undefined) && (
                     <div
                        // className={ `content_right ${ (isMobile) ? 'hidden-accopunt-content' : 'show-settings-content' }` }
                        className='content_right'
                     >
                        <div className={ classnames(' rightSide') }>
                           <TabSwitch.Content>
                              {/* <AccountPersonal
                                 tabId='personal'
                                 { ...props }
                              /> */}
                              <AccountPlan
                                 tabId='plans'
                                 mainApp={ mainApp }
                                 isOneTimeUser={ isOneTimeUser }
                                 { ...props }
                              />
                              <AccountBilling
                                 tabId='billing'
                                 mainApp={ mainApp }
                                 { ...props }
                              />
                           </TabSwitch.Content>
                        </div>
                     </div>
                  )
               }
            </div>
         </TabSwitch>
      </div>
   );
};

MyAccountView.propTypes = {
   onSwitchTab: PropTypes.func,
   isFetching: PropTypes.bool,
   isMobile: PropTypes.bool,
};

export default MyAccountView;
