import React from 'react';
import SchoolRoom from 'views/pages/SchoolRoom';
import { getSchoolRoomLandings, makeActiveSchoolRoomLanding } from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import AdminContainer from 'views/layout/AdminContainer';
import ComponentProgress from 'components/modules/ComponentProgress';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { useDispatch, useSelector } from 'react-redux';
import { screenWidthSelector } from 'state/modules/common/selectors';
import { updateSiteInfoActiveSchoolRoom } from 'state/modules/common/actions';

const SchoolRoomContainer = () => {
   const { data: schoolRoomThemes, loading, setData: setschoolRoomThemes } = useApiQuery(getSchoolRoomLandings);

   const [makeActiveSchoolRoom, { loading: loadingActive }] = useSubmitForm(makeActiveSchoolRoomLanding, {
      successMessage: 'Portal has been changed.',
   });
   const screenWidth = useSelector(screenWidthSelector);
   const dispatch = useDispatch();
   
   const makeActiveSchoolRoomHandle = (activeViewTemplate) => {
      const landingType = activeViewTemplate.school_room_theme_name;
      const landingId = activeViewTemplate.id;
      const isActive = activeViewTemplate.is_active;
      if (!isActive) {
         makeActiveSchoolRoom({ landingId }, () => {
            const newSchoolRoomThemes = [];
            schoolRoomThemes.forEach((schoolRoomTheme) => {
               const newSchoolRoomTheme = schoolRoomTheme;
               if (newSchoolRoomTheme.id === landingId) {
                  newSchoolRoomTheme.is_active = 1;
               } else {
                  newSchoolRoomTheme.is_active = 0;
               }
               newSchoolRoomThemes.push(newSchoolRoomTheme);
            });
            setschoolRoomThemes(newSchoolRoomThemes);
            dispatch(updateSiteInfoActiveSchoolRoom(activeViewTemplate));
         });
      } else {
         window.open(`/admin/portal/${ landingType }/${ landingId }`, '_self');
      }
   };

   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <AdminContainer>
            <AdminContainer.Content>
               <ComponentProgress loading={ loading || loadingActive }>
                  <SchoolRoom
                     schoolRoomThemes={ schoolRoomThemes }
                     makeActiveSchoolRoomHandle={ makeActiveSchoolRoomHandle }
                     isMobile={ screenWidth < 1024 }
                  />
               </ComponentProgress>
            </AdminContainer.Content>
         </AdminContainer>
      </>
   );
};


export default SchoolRoomContainer;
