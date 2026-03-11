import React, { useState } from 'react';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Container from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
import LandingPagesDetails from 'views/pages/LandingPages/LandingPagesDetails';
import withLoading from 'utils/withLoading';
import PropTypes from 'prop-types';
import {
   updateLandingDetails as updateLandingDetailsAction,
   getLandingDetails,
} from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useHistory } from 'react-router';


const LandingPagesDetailsLoading = withLoading(LandingPagesDetails);

const LandingPagesDetailsContainer = (props) => {
   const history = useHistory();
   const { match } = props;
   const {
      data, loading, setData,
   } = useApiQuery(getLandingDetails, [match.params.url]);
   const [updateLandingDetails] = useSubmitForm(updateLandingDetailsAction, {
      successMessage: 'Landing settings has been updated.',
   });
   const [tabName, setTabName] = useState('');

   const updateLandingDetailsHandler = (landingSettings) => {
      const landingUrl = match.params.url;
      updateLandingDetails({ landingUrl, settings: landingSettings }, () => {
         let newData;
         if (landingSettings.seo) {
            newData = {
               ...data,
               metas: { ...data.metas, ...landingSettings.seo },
            };
         } else {
            newData = {
               ...data,
               ...landingSettings,
            };
            if (landingSettings.url) {
               history.push(`/admin/landings/${ landingSettings.url }/settings#general_settings`);
            }
         }
         setData(newData);
      });
   };

   const onSwitchTab = (tabId) => {
      if (window.innerWidth < 1024) {
         setTabName(tabId);
      }
   };

   let mobileHeaderTitle = tabName;
   if (!tabName) {
      mobileHeaderTitle = 'Settings';
   } else if (tabName === 'general_settings') {
      mobileHeaderTitle = 'General Settings';
   } else if (tabName === 'seo_and_social_sharing') {
      mobileHeaderTitle = 'SEO and Social Sharing';
   }

   return (
      <Container>
         <Container.Header>
            <SiteHeader
               title='Settings'
               titleSize='large'
               hasArrow
            />
            <SiteHeaderMobile
               isLeftAction
               title={ mobileHeaderTitle }
               titleUppercase={ tabName === 'api' }
               goToBack={ () => history.push('/admin/landings') }
            />
         </Container.Header>
         <Container.Content>
            <LandingPagesDetailsLoading
               isLoading={ loading }
               updateLandingDetailsHandler={ updateLandingDetailsHandler }
               onSwitchTab={ onSwitchTab }
               tabName={ tabName }
               settings={ data }
            />
         </Container.Content>
      </Container>
   );
};

LandingPagesDetailsContainer.propTypes = {
   match: PropTypes.object,
};

export default LandingPagesDetailsContainer;
