import React from 'react';
import PropTypes from 'prop-types';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getAffiliateTemplate } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import AffiliateTemplate from 'views/pages/Affiliate/TemplateEditor';
import { useHistory } from 'react-router';
import { AffiliateFrontContext } from 'containers/pages/affiliate/login';


const AffiliateTemplatePreview = ({ match }) => {
   const { data: landing, loading } = useApiQuery(
      getAffiliateTemplate,
      [{ affiliateId: match.params.id, templateId: match.params.templateId }]
   );
   const history = useHistory();
   const [data, setData] = React.useState({
      email: '',
      password: '',
      remember: false,
   });
   const handleInputChange = (name, value) => {
      setData({
         ...data,
         [name]: value,
      });
   };
   const onSubmit = () => {
   };
   return (
      <ComponentProgress loading={ loading }>
         <AffiliateFrontContext.Provider value={ { data, handleInputChange, onSubmit } }>
            <AffiliateTemplate
               initalTemplate={ landing }
               isPreview={ true }
               goBack={ () => history.goBack() }
            />
         </AffiliateFrontContext.Provider>
      </ComponentProgress>
   );
};

AffiliateTemplatePreview.propTypes = {
   match: PropTypes.object,
};

export default AffiliateTemplatePreview;
