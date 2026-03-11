/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import PropTypes from 'prop-types';
import {
   getSchoolRoomLandingSettings, updateSchoolRoomLandingSettings, getSettings, createCustomLink,
   updateCustomLink, customLinksReorder,
} from 'api';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useApiQuery } from 'utils/hooks/useQuery';
import SchoolRoomSettings from 'views/pages/SchoolRoom/SchoolRoomSettings';
import AdminContainer from 'views/layout/AdminContainer';
import ComponentProgress from 'components/modules/ComponentProgress';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { updateSiteInfoActiveSchoolRoom } from 'state/modules/common/actions';
import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
import { template1, template2, template3 } from 'utils/constants';

const myTemplates = {
   template1,
   template2,
   template3,
};

const SchoolRoomSettingsContainer = (props) => {
   const { match: { params: { landingId, landingType } }, authUser } = props;
   const { data: schoolRoomTheme, loading, setData: setschoolRoomTheme } = useApiQuery(getSchoolRoomLandingSettings, [landingId]);
   const [upadteSchoolRoomSettings] = useSubmitForm(updateSchoolRoomLandingSettings, {
      successMessage: 'Portal Settings has been changed.',
   });

   const siteInfo = useSelector(siteInfoSelector);

   const [themeMode, setThemeMode] = useState({
      darkMode: true,
      lightMode: false,
   });

   const [modeTemplate, setModeTemplate] = useState(null);
   const [hasCustomColors, setHasCustomColors] = useState(false);

   useEffect(() => {
      const activeTemplate = siteInfo.all_school_room.find(template => Number(template.id) === Number(landingId));
      if (activeTemplate) {
         setThemeMode(prevState => {
            return {
               ...prevState,
               darkMode: activeTemplate.mode === 1,
               lightMode: activeTemplate.mode === 0,
            };
         });

         setModeTemplate(myTemplates[activeTemplate.school_room_theme_name][activeTemplate.mode === 1 ? 'dark' : 'light']);
         
         // Reset custom colors flag when template changes
         setHasCustomColors(false);
      }
   }, [siteInfo.all_school_room, landingId]);

   const handleChangeThemeMode = (e) => {
      const { match: { params: { landingType } } } = props;
      const [firstMode, secondMode] = e.target.className.split(' ');

      setThemeMode(prevState => {
         return {
            ...prevState,
            [firstMode]: true,
            [secondMode]: false,
         };
      });
      
      // Reset custom colors flag when switching themes
      setHasCustomColors(false);

      // Get the new template immediately instead of waiting for state update
      const newModeTemplate = myTemplates[landingType][firstMode.includes('light') ? 'light' : 'dark'];
      setModeTemplate(newModeTemplate);

      // Use the new template immediately instead of the stale modeTemplate state
      setschoolRoomTheme({ ...schoolRoomTheme, ...newModeTemplate });
   };

   const {
      data: customLinks, loading: loadingCustomLinks, setData: setCustomLinks,
   } = useApiQuery(getSettings, ['mainhub']);

   const [createCustomLinkFunc, { loading: loadingCustomLinksCreate }] = useSubmitForm(createCustomLink, {
      successMessage: 'Link has been created.',
   });

   const dispatch = useDispatch();

   const [updateCustomLinkFunc, { loading: loadingCustomLinksUpdate }] = useSubmitForm(updateCustomLink, {
      successMessage: 'Link has been updated.',
   });

   const [customLinksReorderFunc, { loading: loadingCustomLinksReorder }] = useSubmitForm(customLinksReorder, {
      successMessage: 'Links successfully reordered.',
   });

   const handleCreateCustomLink = (item, closeCustomItem) => {
      const newCustomLink = item;
      const items = [...customLinks.custom_links.items];
      items.push(newCustomLink);
      createCustomLinkFunc({ inputs: items }, (res) => {
         setCustomLinks({
            ...customLinks,
            custom_links: {
               ...customLinks.custom_links,
               items: res.items,
            },
         });
         closeCustomItem();
      });
   };

   const handleUpdateCustomLinkFunc = (inputs, closeCustomItem) => {
      updateCustomLinkFunc({ id: inputs.id, inputs }, () => {
         const newCustomLinks = { ...customLinks };
         for (let i = 0; i < newCustomLinks.custom_links.items.length; i++) {
            if (newCustomLinks.custom_links.items[i].id === inputs.id) {
               newCustomLinks.custom_links.items[i] = { ...newCustomLinks.custom_links.items[i], ...inputs };
               break;
            }
         }
         setCustomLinks({ ...newCustomLinks });
         closeCustomItem();
      });
   };

   const handleCustomLinksReorder = (data) => {
      const obj = {};
      [...data].forEach((item, index) => {
         const id = item.id;
         const order = index + 1;
         obj[id] = order;
      });
      customLinksReorderFunc(obj);
   };

   const saveSchoolRoomSettings = () => {
      const updatedSchoolRoomTheme = themeMode.lightMode 
         ? { ...schoolRoomTheme, ...modeTemplate, mode: 0 } 
         : themeMode.darkMode 
            ? { ...schoolRoomTheme, ...modeTemplate, mode: 1 } 
            : { ...schoolRoomTheme, mode: 2 };
      
      delete updatedSchoolRoomTheme.css;
      delete schoolRoomTheme.css;
      
      upadteSchoolRoomSettings({ landingId, data: updatedSchoolRoomTheme }, () => {
         dispatch(updateSiteInfoActiveSchoolRoom(updatedSchoolRoomTheme));
      });
   };

   const changeSchoolRoom = (name, value) => {
      // Check if this is a color-related property
      const colorProperties = [
         'school_color', 
         'school_color_2', 
         'school_button_color', 
         'school_bg_color', 
         'school_text_color'
      ];
      
      if (colorProperties.includes(name)) {
         setHasCustomColors(true);
      }

      // Update the mode template to reflect the custom change
      setModeTemplate(prevState => ({
         ...prevState,
         [name]: value,
      }));

      // Update the main theme state
      setschoolRoomTheme({
         ...schoolRoomTheme,
         [name]: value,
      });
   };

   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => { } }
            />
         </MobileHeader>
         <AdminContainer>
            <AdminContainer.Content>
               <ComponentProgress loading={ loadingCustomLinks && loading }>
                  <SchoolRoomSettings
                     schoolRoomTheme={ schoolRoomTheme }
                     setschoolRoomTheme={ setschoolRoomTheme }
                     onSave={ saveSchoolRoomSettings }
                     onChange={ changeSchoolRoom }
                     customLinks={ customLinks }
                     setCustomLinks={ setCustomLinks }
                     handleCreateCustomLink={ handleCreateCustomLink }
                     loadingCustomLinksCreate={ loadingCustomLinksReorder || loadingCustomLinksCreate || loadingCustomLinksUpdate }
                     handleUpdateCustomLinkFunc={ handleUpdateCustomLinkFunc }
                     customLinksReorder={ handleCustomLinksReorder }
                     loading={ loadingCustomLinksCreate || loadingCustomLinksUpdate }
                     authUser={ authUser }
                     handleChangeThemeMode={ handleChangeThemeMode }
                     modeTemplate={ modeTemplate }
                     loadingSettings={ loading }
                     themeMode={ themeMode }
                     hasCustomColors={ hasCustomColors }
                  />
               </ComponentProgress>
            </AdminContainer.Content>
         </AdminContainer>
      </>
   );
};

SchoolRoomSettingsContainer.propTypes = {
   match: PropTypes.object,
   authUser: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
   };
};

export default connect(mapStateToProps)(SchoolRoomSettingsContainer);