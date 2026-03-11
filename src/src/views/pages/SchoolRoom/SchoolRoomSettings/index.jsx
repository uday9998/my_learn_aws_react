import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getThemeFonts } from 'utils/StaticData';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { revertToDefaultPortalTemplate } from 'api';
import { useDispatch } from 'react-redux';
import { updatePortalSettingsAndSections } from 'state/modules/common/actions';
// import IndividualLayout from 'assets/images/schoolRoom/individual_layout.png';
// import ClassLayout from 'assets/images/schoolRoom/class_layout.png';
import './index.scss';
import { useHistory } from 'react-router';
// new imports
import Button from 'components/elements/buttons/BaseButtonNew';
import DeleteModal from 'components/elements/DeleteModal';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import IconButton from 'components/elements/buttons/IconButton';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { LINKS } from 'constants/portal';
import SchoolRoomSettingsSection from './components/SettingsSection';
import SchoolRoomGeneralSettings from './components/GeneralSetting';
import SchoolRoomNavigationSettings from './components/Navigation';
// import SchoolRoomWatchingSettings from './components/WatchingSettings';
import SchoolRoomSEOSettings from './components/SeoSettings';
import CoursesLinks from './components/CoursesLinks';

const fontSizeOptionForSelect = getThemeFonts().map(option => ({ label: option.label, value: option.value }));

const SchoolRoomSettings = ({
   onChange,
   onSave, schoolRoomTheme,
   setschoolRoomTheme,
   customLinks, setCustomLinks,
   handleCreateCustomLink,
   loadingCustomLinksCreate,
   handleUpdateCustomLinkFunc,
   customLinksReorder,
   authUser,
   loading,
   handleChangeThemeMode,
   modeTemplate,
   themeMode,
}) => {
   const [isModal, setIsModal] = useState();
   const history = useHistory('');
   const [revertPortalTemplate] = useSubmitForm(revertToDefaultPortalTemplate, {
      successMessage: 'Revert to default',
   });
   const dispatch = useDispatch();
   const { landingId } = useParams();

   const handleToggleModal = () => {
      setIsModal(prevState => !prevState);
   };


   const handleRevertToDefault = () => {
      revertPortalTemplate(Number(landingId), res => {
         setschoolRoomTheme({
            ...res.school_room_landing,
         });
         dispatch(updatePortalSettingsAndSections(res));
      });

      handleToggleModal();
   };

   return (
      <div className='schoolRoomSettings'>
         {
            isModal && (
               <DeleteModal
                  title='This action will reset all settings to their original state. Confirm?'
                  onDelete={ handleRevertToDefault }
                  deleteText='Confirm'
                  isDeleteButton={ false }
                  maxWidth={ 450 }
                  onCancel={ handleToggleModal }
               />
            )
         }
         <BreadCrumb
            links={ [
               {
                  text: 'Your Portal',
                  goTo: () => history.push('/admin/portal'),
               },
               {
                  text: 'Settings',
               },
            ] }
         />
         <div className='schoolRoomSettings__header'>
            <div className='schoolRoomSettings__header__title'>
               <IconButton
                  name='arrowLeftL'
                  onClick={ () => history.goBack() }
               />
               <Text
                  inner='Settings'
                  type={ types.regularDefaultSmall }
                  size={ sizes.size_28 }
               />
            </div>
            <div className='buttons__wrapper'>
               <Button
                  text='Revert to default'
                  onClick={ handleToggleModal }
               />
               <Button
                  text='Save Changes'
                  onClick={ () => onSave() }
               />
            </div>
         </div>
         <div className='schoolRoomSettings__sections'>
            <SchoolRoomSettingsSection
               sectionDescription="Customize your portal. Adjust colors, fonts, and add a unique favicon to match your brand's style."
               sectionTitle='General'
            >
               <SchoolRoomGeneralSettings
                  inputs={ schoolRoomTheme }
                  onChange={ onChange }
                  fontSizeOptionForSelect={ fontSizeOptionForSelect }
                  handleChangeThemeMode={ handleChangeThemeMode }
                  modeTemplate={ modeTemplate }
                  themeMode={ themeMode }
               />
            </SchoolRoomSettingsSection>
            <SchoolRoomSettingsSection
               // sectionDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
               sectionTitle='Links'
            >
               <Text 
                  inner='Portal Links'
               />
               {
                  LINKS.map(link => {
                     return (
                        <CoursesLinks
                           link={ link }
                        />
                     );
                  })
               }
               
            </SchoolRoomSettingsSection>
            <SchoolRoomSettingsSection
               sectionDescription="Customize your portal's menu layout, enabling easy access and seamless navigation for your users."
               sectionTitle='Navigation'
            >
               <SchoolRoomNavigationSettings
                  inputs={ schoolRoomTheme }
                  onChange={ onChange }
                  fontSizeOptionForSelect={ fontSizeOptionForSelect }
                  customLinks={ customLinks }
                  setCustomLinks={ setCustomLinks }
                  handleCreateCustomLink={ handleCreateCustomLink }
                  handleUpdateCustomLinkFunc={ handleUpdateCustomLinkFunc }
                  loadingCustomLinksCreate={ loadingCustomLinksCreate }
                  customLinksReorder={ customLinksReorder }
                  authUser={ authUser }
                  loading={ loading }
               />
            </SchoolRoomSettingsSection>
            {/* <SchoolRoomSettingsSection
               sectionDescription='Show a section at the top of the catalog page that allows users to continue browsing from where they left off.'
               sectionTitle='Continue Watching'
            >
               <SchoolRoomWatchingSettings
                  inputs={ schoolRoomTheme }
                  onChange={ onChange }
               />
            </SchoolRoomSettingsSection> */}
            <SchoolRoomSettingsSection
               sectionDescription="Enhance your page's visibility on search engines and social networks like Facebook and Twitter with customizable SEO settings. If left blank, we automatically apply default settings for optimal performance."
               sectionTitle='SEO Options'
            >
               <SchoolRoomSEOSettings
                  inputs={ schoolRoomTheme }
                  onChange={ onChange }
               />
            </SchoolRoomSettingsSection>
         </div>
      </div>
   );
};

SchoolRoomSettings.defaultProps = {
   schoolRoomTheme: {},
};

SchoolRoomSettings.propTypes = {
   schoolRoomTheme: PropTypes.object,
   onSave: PropTypes.func,
   onChange: PropTypes.func,
   setCustomLinks: PropTypes.func,
   customLinks: PropTypes.object,
   handleCreateCustomLink: PropTypes.func,
   loadingCustomLinksCreate: PropTypes.bool,
   handleUpdateCustomLinkFunc: PropTypes.func,
   customLinksReorder: PropTypes.func,
   authUser: PropTypes.object,
   loading: PropTypes.bool,
   setschoolRoomTheme: PropTypes.func,
   handleChangeThemeMode: PropTypes.func,
   modeTemplate: PropTypes.object,
   themeMode: PropTypes.object,
};

export default SchoolRoomSettings;
