import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import AffiliateSettingsPage from 'views/pages/Affiliate/Settings';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { connect } from 'react-redux';
import QueryParams from 'utils/QueryParams';
import * as operations from 'state/modules/affiliate/operations';
import * as selectors from 'state/modules/affiliate/selectors';
import ComponentProgress from 'components/modules/ComponentProgress';

function mapStateToProps(state) {
   return {
      settings: selectors.affiliateSettingsSelector(state),
      loading: selectors.affiliateSettingsLoadingSelector(state),
   };
}


function mapDispatchToProps(dispatch) {
   return {
      goToAffiliate: () => {
         dispatch(push(Router.route('ADMIN_AFFILIATE').getCompiledPath()));
      },
      init: (affiliateId) => {
         dispatch(operations.initAffiliateProgramSettings(affiliateId));
      },
      goToEditPage: (affiliateId, id) => {
         dispatch(push(Router.route('ADMIN_AFFILIATE_TEMPLATE_EDIT').getCompiledPath({ id: affiliateId, templateId: id })));
      },
      updateSettings: (affiliateId, data) => {
         dispatch(operations.updateAffiliateProgramSettings(affiliateId, data));
      },
   };
}

export const AffiliateSettingsContext = createContext(null);


const AffiliateSettings = ({
   goToAffiliate, init, settings, loading, match, goToEditPage, updateSettings,
}) => {
   const [tab, setTab] = useState(QueryParams.getHash());
   const [switchedTemplate, setSwitchedTemplate] = useState('signin');
   React.useEffect(() => {
      init(match.params.id);
   }, []);
   const [data, setData] = useState({
      joinAccess: 'anyone',
      period: 30,
      couponCodes: false,
      percentCodes: 25,
      contactInfo: false,
      emailAddress: '',
      emailSumbject: '',
      subject: '',
      text: '',
      selectedSignInTemplate: 'Template one',
      selectedSignUpTemplate: 'Template one',
      general: {},
      emailSettings: {},
      templateSettings: {},
   });
   React.useEffect(() => {
      if (!loading) {
         setData({
            ...data,
            ...settings,
         });
      }
   }, [settings]);


   const handleInputChange = (name, value) => {
      switch (tab) {
         case 'general':
            setData({
               ...data,
               general: {
                  ...data.general,
                  [name]: value,
               },
            });
            break;
         case 'email':
            setData({
               ...data,
               emailSettings: {
                  ...data.emailSettings,
                  [name]: value,
               },
            });
            break;
         default:
            setData({
               ...data,
               templateSettings: {
                  ...data.templateSettings,
                  [name]: value,
               },
            });
      }
   };

   const editTemplate = (id) => {
      goToEditPage(match.params.id, id);
   };

   return (
      <AdminContainer>
         <AdminContainer.Content>
            <AffiliateSettingsContext.Provider
               value={ {
                  data,
                  handleInputChange,
                  switchedTemplate,
                  setSwitchedTemplate,
                  goToEditPage: editTemplate,
                  affiliateId: match.params.id,
               } }
            >
               <ComponentProgress loading={ loading || !data.general.id }>
                  <AffiliateSettingsPage
                     tab={ tab }
                     setTab={ (value) => {
                        setTab(value);
                        QueryParams.setHash(value);
                     } }
                     handleSave={ () => updateSettings(match.params.id, data) }
                     goToAffiliate={ goToAffiliate }
                  />
               </ComponentProgress>
            </AffiliateSettingsContext.Provider>
         </AdminContainer.Content>
      </AdminContainer>
   );
};

AffiliateSettings.propTypes = {
   init: PropTypes.func,
   settings: PropTypes.object,
   loading: PropTypes.bool,
   goToAffiliate: PropTypes.func,
   goToEditPage: PropTypes.func,
   match: PropTypes.object,
   updateSettings: PropTypes.func,
};

export default connect(
   mapStateToProps, mapDispatchToProps
)(AffiliateSettings);
