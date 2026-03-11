import React, { useState } from 'react';
import LandingCreatePages from 'views/pages/LandingPages/LandingCreatePages';
import LandingCreateModalContent from 'components/modules/landingPages/LandingCreateModalContent';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { createDefaultLanding } from 'api';
import { useHistory } from 'react-router';
import AdminContainer from 'views/layout/AdminContainer';
import ModalNew from 'components/elements/ModalNew';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { useSelector } from 'react-redux';
import { screenWidthSelector } from 'state/modules/common/selectors';

const LandingPagesCreateContainer = () => {
   const [createLanding, { loading: loadingCreate }] = useSubmitForm(createDefaultLanding, {
      successMessage: 'Landing has been created.',
   });
   const [isOpen, setIsOpen] = useState(false);
   const [templateInfo, setTemplateInfo] = useState({});
   const history = useHistory();

   const screenWidth = useSelector(screenWidthSelector);

   const createLandingHandler = async (landingName) => {
      const errResponse = await createLanding(
         { templateId: templateInfo.id, name: landingName },
         ({ id }) => {
            history.push({
               pathname: `/admin/landings/${ id }/edit`,
               state: { landingName },
            });
         },
         () => true
      );

      return errResponse || {};
   };
   const previewLandingHandler = (id) => {
      window.open(`${ window.location.origin }/template/${ id }/preview`, '_blank');
   };

   const createLandingModalOpen = (id, title, img) => {
      setTemplateInfo({ id, title, img });
      setIsOpen(true);
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
               <LandingCreatePages
                  createLanding={ createLandingModalOpen }
                  previewLanding={ previewLandingHandler }
                  isMobile={ screenWidth < 1024 }
               />
               {isOpen && (
                  <ModalNew
                     onCloseModal={ () => setIsOpen(false) }

                  >
                     <LandingCreateModalContent
                        onCancel={ () => setIsOpen(false) }
                        onApprove={ (landingName) => createLandingHandler(landingName) }
                        title={ templateInfo.title }
                        content={ templateInfo.img }
                        loadingCreate={ loadingCreate }
                     />
                  </ModalNew>
               )}

            </AdminContainer.Content>
         </AdminContainer>
      </>
   );
};

export default LandingPagesCreateContainer;
