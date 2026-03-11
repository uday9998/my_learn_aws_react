import React from 'react';
import LandingSettingsMenu from 'components/modules/landingPages/LandingSettingsMenu';
import SeoandSocialSharing from 'components/modules/landingPages/SeoandSocialSharing';
import GeneralSettings from 'components/modules/landingPages/GeneralSettings';
import TabSwitch from 'components/elements/TabSwitch';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const LandingPagesDetails = ({
   updateLandingDetailsHandler, onSwitchTab, tabName, settings,
}) => {
   const isMobile = window.innerWidth < 1024;
   return (
      <div className='create-landing-pages-wrapper'>
         <TabSwitch
            onSwitchTab={ onSwitchTab }
            dataIsFetching={ false }
            initialTab='general_settings'
         >
            <div className='d-landingDetails flex h-full w-full'>
               {
                  (!isMobile || !tabName) && (
                     <div className={ `content_left ${ (isMobile && !!tabName) ? 'hidden-settings-content' : 'show-settings-content' }` }>
                        <div className='m-r-exl mob-settings-content'>
                           <TabSwitch.Tab>
                              <LandingSettingsMenu />
                           </TabSwitch.Tab>
                        </div>
                     </div>
                  )
               }
               {
                  (!isMobile || !!tabName) && (
                     <div className={ `content_right ${ (isMobile && !tabName) ? 'hidden-settings-content' : 'show-settings-content' }` }>
                        <div className={ classnames('m-l-exl rightSide') } style={ tabName === 'visibility' ? { minHeight: '500px' } : {} }>
                           <TabSwitch.Content>
                              <GeneralSettings
                                 tabId='general_settings'
                                 settings={ settings }
                                 updateLandingDetailsHandler={ updateLandingDetailsHandler }
                              />
                              <SeoandSocialSharing
                                 tabId='seo_and_social_sharing'
                                 settings={ settings }
                                 updateLandingDetailsHandler={ updateLandingDetailsHandler }
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

LandingPagesDetails.propTypes = {
   updateLandingDetailsHandler: PropTypes.func,
   onSwitchTab: PropTypes.func,
   tabName: PropTypes.string,
   settings: PropTypes.object,
};

export default LandingPagesDetails;
