import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CourseDetails from 'components/modules/designCourse/settings/CourseDetails';
import InstructorDetails from 'components/modules/designCourse/settings/InstructorDetails';
// import Seo from 'components/modules/designCourse/settings/Seo';
import SettingsMenu from 'components/modules/designCourse/settings/SettingsMenu';
import SiteChanges from 'components/modules/designCourse/settings/SiteChanges';
// import ThankYouPage from 'components/modules/designCourse/settings/ThankYouPage';
import CompletionMessage from 'components/modules/designCourse/settings/CompletionMessage';
import TabSwitch from 'components/elements/TabSwitch';
import './index.scss';

const Settings = ({
   settingsData, handleSettingsSave, handleInputChange, isMobile, onSwitchTab, activeTabIsMobile, courseUrl, lessonId,
   getCourse, instructorDataInProgress, authorsData, setOpenAuthorPopup, isOpenAuthorPopup, onCreateAuthor,
   onDeleteAuthor, setOpenDeleteAuthorPopup, isOpenDeleteAuthorPopup, handleInstructorInputChange, handleAuthorSave,
   getAuthors, addCategory, attachCategories, detachCategories, categories, attachedCategories, courses,
}) => {
   return (
      <div className='d-settings h-full w-full course-settings flex'>
         <TabSwitch
            initialTab='course-details'
            hasParent={ !isMobile }
            onSwitchTab={ isMobile ? (tab) => onSwitchTab(tab) : null }
         >
            {
               (!isMobile || !activeTabIsMobile) && (
                  <div className='content_left course-settings-tabs'>
                     <div className='m-r-exl course-settings-tabs-content'>
                        <TabSwitch.Tab>
                           <SettingsMenu />
                        </TabSwitch.Tab>
                     </div>
                  </div>
               )
            }
            {
               (!isMobile || !!activeTabIsMobile) && (
                  <div className='content_right'>
                     <div className='settings__right'>
                        <TabSwitch.Content>
                           <CourseDetails
                              tabId='course-details'
                              settingsData={ settingsData }
                              categories={ categories }
                              attachedCategories={ attachedCategories }
                              addCategory={ addCategory }
                              attachCategories={ attachCategories }
                              detachCategories={ detachCategories }
                              handleInternalInputChange={ (key, value) => handleInputChange(key, value, 'settings') }
                              handleSettingsSave={ handleSettingsSave }
                           />
                           <InstructorDetails
                              tabId='instructor-details'
                              settingsData={ settingsData }
                              handleInternalInputChange={ (key, value) => handleInstructorInputChange(key, value) }
                              getCourse={ getCourse }
                              getAuthors={ getAuthors }
                              instructorDataInProgress={ instructorDataInProgress }
                              authorOptions={ authorsData }
                              setOpenAuthorPopup={ setOpenAuthorPopup }
                              isOpenAuthorPopup={ isOpenAuthorPopup }
                              onCreateAuthor={ onCreateAuthor }
                              handleAuthorSave={ handleAuthorSave }
                              onDeleteAuthor={ onDeleteAuthor }
                              setOpenDeleteAuthorPopup={ setOpenDeleteAuthorPopup }
                              isOpenDeleteAuthorPopup={ isOpenDeleteAuthorPopup }
                           />
                           {/* <Seo
                              tabId='seo'
                              settingsData={ settingsData }
                              handleInternalInputChange={ (key, value) => handleInputChange(key, value, 'settings') }
                              handleSettingsSave={ handleSettingsSave }
                           /> */}
                           <SiteChanges
                              tabId='site-changes'
                              settingsData={ settingsData }
                              handleInternalInputChange={ (key, value) => handleInputChange(key, value, 'settings') }
                              handleSettingsSave={ handleSettingsSave }
                              courseUrl={ courseUrl }
                              lessonId={ lessonId }
                              courses={ courses }
                           />
                           {/* <ThankYouPage
                              tabId='thank-you-page'
                              settingsData={ settingsData.thank_you_page }
                              thankYouPageUrl={ settingsData.thank_you_page_url }
                              thankYouMessage={ settingsData.thank_you_message }
                              handleInternalInputChange={ (key, value) => handleInputChange(key, value, 'thank-you-page') }
                              handleSettingsSave={ handleSettingsSave }
                           /> */}
                           <CompletionMessage
                              tabId='completion-message'
                              settingsData={ settingsData }
                              handleInternalInputChange={ (key, value) => handleInputChange(key, value, 'completion-message') }
                              handleSettingsSave={ handleSettingsSave }
                           />
                        </TabSwitch.Content>
                     </div>
                  </div>
               )
            }
         </TabSwitch>
      </div>
   );
};

Settings.propTypes = {
   settingsData: PropTypes.object,
   handleSettingsSave: PropTypes.func,
   handleInputChange: PropTypes.func,
   handleInstructorInputChange: PropTypes.func,
   isMobile: PropTypes.bool,
   onSwitchTab: PropTypes.func,
   activeTabIsMobile: PropTypes.string,
   courseUrl: PropTypes.string,
   lessonId: PropTypes.number,
   getCourse: PropTypes.func,
   instructorDataInProgress: PropTypes.bool,
   authorsData: PropTypes.array,
   setOpenAuthorPopup: PropTypes.func,
   isOpenAuthorPopup: PropTypes.bool,
   setOpenDeleteAuthorPopup: PropTypes.func,
   isOpenDeleteAuthorPopup: PropTypes.bool,
   onCreateAuthor: PropTypes.func,
   handleAuthorSave: PropTypes.func,
   onDeleteAuthor: PropTypes.func,
   getAuthors: PropTypes.func,
   addCategory: PropTypes.func,
   attachCategories: PropTypes.func,
   detachCategories: PropTypes.func,
   categories: PropTypes.array,
   attachedCategories: PropTypes.array,
   courses: PropTypes.array,
};

export default Settings;
