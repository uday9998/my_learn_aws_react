import React from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import ComponentProgress from 'components/modules/ComponentProgress';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getOtherPages, makeActiveOtherPage } from 'api';
import OtherExplorePageView from 'views/pages/OtherPages/ExplorePage';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { useSelector } from 'react-redux';
import { screenWidthSelector } from 'state/modules/common/selectors';

const OtherPageExplore = ({ match }) => {
   const { type } = match.params;
   const { data, loading, setData } = useApiQuery(getOtherPages, [type]);

   const screenWidth = useSelector(screenWidthSelector);

   const templateTypeNames = {
      '404': '404 Page',
      sign_in: 'Login Page',
      sign_up: 'Sign Up Page',
      thank_you: 'Thank You Page',
      unsubscribe: 'Unsubscribe',
      unsubscribe_success: 'Unsubscribe Success',
   };

   const onApplyTemplate = (id) => {
      makeActiveOtherPage(id).then(() => {
         const newData = { ...data };
         newData[type] = newData[type].map(el => {
            if (el.id === id) {
               return { ...el, is_active: 1 };
            }
            return { ...el, is_active: 0 };
         });
         setData(newData);
      });
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
            <ComponentProgress loading={ loading }>
               <AdminContainer.Content>
                  <OtherExplorePageView
                     templateTypeName={ templateTypeNames[type] }
                     templates={ data ? data[type] : [] }
                     templateData={ data ? data[type].find((e) => e.is_active) : {} }
                     isMobile={ screenWidth < 1024 }
                     onApplyTemplate={ onApplyTemplate }
                  />
               </AdminContainer.Content>
            </ComponentProgress>
         </AdminContainer>
      </>
   );
};

OtherPageExplore.propTypes = {
   match: PropTypes.object,
};

export default OtherPageExplore;
