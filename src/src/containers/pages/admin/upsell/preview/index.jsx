import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUpsell } from 'api/AuthApi';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import ComponentProgress from 'components/modules/ComponentProgress';
import QueryParams from 'utils/QueryParams';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import AdminContainer from 'views/layout/AdminContainer';
import UpsellCheckoutView from 'views/pages/upsellCheckout';
import { useHistory } from 'react-router';

const UpsellPreviewPage = ({ match }) => {
   // const [init, { loading }] = useSubmitForm(getUpsellTemplate, {});
   const [getUpsellInputs, { loading: inputsLoader }] = useSubmitForm(getUpsell);
   const [template, setTemplate] = useState(null);
   const [templateName, setTemplateName] = useState('Template one');
   const [offerName, setOfferName] = useState('');
   const [priceToView, setPriceToView] = useState(0);
   const history = useHistory();
   const names = {
      'template1': 'Template one',
   };
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
            upsell_components: e.upsell_components,
         };
      });
   };

   useEffect(() => {
      // init(match.params.upsellId, (data) => {
      //    ;
      //    setTemplateName(names[data[0].checkout_theme_name]);
      //    setTemplate({
      //       sections: data[0].checkout_sections.map((e) => {
      //          return {
      //             ...e,
      //             upsell_components: e.checkout_components,
      //          };
      //       }),
      //    });
      //    QueryParams.setHash('upsellview');
      // });
      getUpsellInputs(match.params.upsellId, (data) => {
         setOfferName(data.offer.name);
         setPriceToView(data.pricing.free_trial === 1 ? 'FREE' : `$${ data.pricing.price }`);
         setTemplateName(names[data.checkout_landings[0].checkout_theme_name]);
         setTemplate({ sections: generateEditingTemplate(data.checkout_landings[0].upsell_section) });
      });
      QueryParams.setHash('upsellview');
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
                  title='Preview Upsell Page'
                  goBack={ () => {
                     QueryParams.setHash('');
                     history.goBack();
                  } }
               />
               <UpsellCheckoutView
                  inputs={ {
                     offerView: { name: offerName }, priceToView,
                  } }
                  isHidenScroll={ true }
                  initalTemplate={ template }
                  isPreview={ true }
                  templateName={ templateName }
               />
            </div>
         </AdminContainer>
      </ComponentProgress>
   );
};

UpsellPreviewPage.propTypes = {
   match: PropTypes.object,
};

export default UpsellPreviewPage;
