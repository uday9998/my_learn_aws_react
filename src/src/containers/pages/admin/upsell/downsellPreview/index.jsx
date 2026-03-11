import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDownsell } from 'api/AuthApi';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import ComponentProgress from 'components/modules/ComponentProgress';
import QueryParams from 'utils/QueryParams';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import AdminContainer from 'views/layout/AdminContainer';
import UpsellCheckoutView from 'views/pages/upsellCheckout';
import { useHistory } from 'react-router';

const DownsellPreviewPage = ({ match }) => {
   // const [init, { loading }] = useSubmitForm(getUpsellTemplate, {});
   const [getDownsellInputs, { loading: inputsLoader }] = useSubmitForm(getDownsell);
   const [template, setTemplate] = useState(null);
   const [templateName, setTemplateName] = useState('Template one');
   const history = useHistory();
   const [priceToView, setPriceToView] = useState(0);
   const names = {
      'template1': 'Template one',
   };
   const [offerName, setOfferName] = useState('');
   const generateEditingTemplate = (sections) => {
      return sections.map((e) => {
         if (e.upsell_section) {
            return e;
         }
         return {
            upsell_section: {
               created_at: e.created_at,
               id: e.id,
               name: e.name,
               props: e.props,
               slug: e.slug,
               updated_at: e.updated_at,
               upsell_checkout_landing_id: e.upsell_checkout_landing_id,
            },
            upsell_components: e.downsell_components,
         };
      });
   };
   useEffect(() => {
      getDownsellInputs(match.params.downsellId, (data) => {
         setOfferName(data.offer.name);
         setPriceToView(data.pricing.free_trial === 1 ? 'FREE' : `$${ data.pricing.price }`);
         setTemplateName(names[data.checkout_landings[0].checkout_theme_name]);
         setTemplate({
            sections: generateEditingTemplate(data.checkout_landings[0].downsell_section),
         });
         QueryParams.setHash('upsellview');
      });
   }, []);
   return (
      <ComponentProgress loading={ inputsLoader || !template }>
         <AdminContainer>
            <div
               style={ {
                  display: 'flex',
                  flexDirection: 'column',
               } }
            >
               <HeaderTypeFirst
                  title='Preview Downsell Page'
                  goBack={ () => {
                     QueryParams.setHash('');
                     history.goBack();
                  } }
               />
               <UpsellCheckoutView
                  inputs={ {
                     offerView: { name: offerName }, priceToView,
                  } }
                  initalTemplate={ template }
                  isHidenScroll={ true }
                  isPreview={ true }
                  templateName={ templateName }
               />
            </div>
         </AdminContainer>
      </ComponentProgress>
   );
};

DownsellPreviewPage.propTypes = {
   match: PropTypes.object,
};

export default DownsellPreviewPage;
