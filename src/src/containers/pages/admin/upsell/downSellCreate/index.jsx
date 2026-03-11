import React, { useState, useEffect } from 'react';
import AdminContainer from 'views/layout/AdminContainer';
import { useHistory } from 'react-router';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import UpsellCreateView from 'views/pages/UpsellCreate';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { downsellCreate, getPricingsForUpsell } from 'api';
import PropTypes from 'prop-types';
import ComponentProgress from 'components/modules/ComponentProgress';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import generateTemplate from 'utils/generateUpsselTemplate';
import UpsellCheckoutView from 'views/pages/upsellCheckout';
import QueryParams from 'utils/QueryParams';
import UpsellCreateCheckout from 'views/pages/UpsellCreate/UpsellCreateCheckout';

const DownSellCreate = ({ match }) => {
   const history = useHistory();
   const [offers, setOffers] = useState(null);
   const [pricings, setPricings] = useState([]);
   const [initOffers, { loading }] = useSubmitForm(getPricingsForUpsell);
   const [create] = useSubmitForm(downsellCreate, {
      successMessage: 'Downsell created successfully.',
   });
   const [isCustomSize, setIsCustomSize] = useState(false);
   const [inputs, onChange] = useState({
      cancel_button: 'Cancel',
      purchase_button: 'Purchase',
      selectedTemplateId: 1,
      headline: '',
   });
   const [preview, setPreview] = useState(null);
   const [editingTemplateName, setEditingTemplateName] = useState('');
   const [errorMessages, setErrorMessages] = useState({});

   useEffect(() => {
      initOffers([match.params.offerId, match.params.upsellOfferId], (data) => {
         setOffers({
            data: Object.values(data),
            offers: Object.values(data).map((e) => ({ label: e.name, value: e.id })),
         });
      });
   }, []);

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: []
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const handleInputChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      if (name === 'offer_id') {
         const findedOffer = Object.values(offers.data.find((e) => e.id === value).pricings);
         const pricingsArray = findedOffer.map((e) => ({ label: `$${ e.price ? e.price : '0' }`, value: e.id }));

         setPricings(pricingsArray);
         if (value) {
            onChange({
               ...inputs,
               [name]: value,
               pricing_id: pricingsArray.length === 1 ? pricingsArray[0].value : null,
               offerView: offers.data.find((e) => e.id === value),
            });
         } else {
            onChange({
               ...inputs,
               [name]: value,
               offerView: null,
            });
         }
         return;
      }
      onChange({
         ...inputs,
         [name]: value,
      });
   };
   const handleCreateUpsell = () => {
      const newErrorMessages = {};

      if (!inputs.offer_id) {
         newErrorMessages.offer_id = ['Please select bundle'];
      }
      if (!inputs.pricing_id) {
         newErrorMessages.pricing_id = ['Pricing field is required'];
      }
      if (!inputs.headline.trim().length) {
         newErrorMessages.headline = ['Headline field is required'];
      }

      if (Object.keys(newErrorMessages).length) {
         addErrorMessages(newErrorMessages);
         return;
      }

      onChange({
         ...inputs,
         template: generateTemplate(inputs),
      });
      setIsCustomSize(true);
   };

   const priceToView = inputs.pricing_id ? pricings.find((e) => e.value === inputs.pricing_id).label : '$ -';
   const handleSaveTemplate = (template) => {
      const headline = template.sections[0].upsell_components.find((e) => e.name === 'Headline').props.text;
      const description = template.sections[0].upsell_components.find((e) => e.name === 'Description').props.text;
      const purchase = template.sections[0].upsell_components.find((e) => e.name === 'Button Purcahse').props.inner;
      const cancel = template.sections[0].upsell_components.find((e) => e.name === 'Button Cancel').props.inner;
      if (isPrint('Template saved successfuly.')) {
         toast.success('Template saved successfuly.');
      }
      onChange({
         ...inputs,
         headline,
         purchase_button: purchase,
         cancel_button: cancel,
         description,
         template,
      });
   };
   const handleFinishDownsell = () => {
      const price = inputs.pricing_id ? pricings.find((e) => e.value === inputs.pricing_id).label : '$ -';
      create([
         match.params.id,
         {
            cancel_button: inputs.cancel_button,
            purchase_button: `${ inputs.purchase_button }${ inputs.autoText ? ` for ${ price }` : '' }`,
            offer_id: inputs.offer_id,
            pricing_id: inputs.pricing_id,
            headline: inputs.headline,
            description: inputs.description,
            sections: inputs.template.sections,
         },
      ], () => {
         history.goBack();
      });
   };
   const offerName = inputs.offer_id ? offers.offers.find((e) => e.value === inputs.offer_id).label : '';
   if (editingTemplateName) {
      return (
         <AdminContainer className='upsell__edit__showed'>
            <UpsellCheckoutView
               templateName={ editingTemplateName }
               handleSaveTemplate={ handleSaveTemplate }
               // inputs={ {
               //    offerView: { name: 'asd' },
               //    headline: 'Test',
               //    description: 'Test',
               //    purchase_button: 'Aprove',
               //    priceToView,
               //    cancel_button: 'Decline',
               // } }
               initalTemplate={ inputs.template }
               isDownSell={ true }
               goBack={ () => {
                  setEditingTemplateName(null);
                  QueryParams.setHash('');
               } }
               inputs={ { ...inputs, priceToView, offerView: { name: offerName } } }
            />
         </AdminContainer>
      );
   }
   if (preview) {
      return (
         <AdminContainer className='upsell__edit__showed'>
            <HeaderTypeFirst
               title='Preview Downsell Page'
               goBack={ () => {
                  setPreview(null);
                  QueryParams.setHash('');
               } }
            />
            <UpsellCheckoutView
               initalTemplate={ inputs.template }
               isPreview={ true }
               templateName={ preview }
               inputs={ { ...inputs, priceToView, offerView: { name: offerName } } }
            />
         </AdminContainer>
      );
   }
   return (
      <AdminContainer>
         <ComponentProgress loading={ loading || offers === null }>
            <div className='upsel__create'>
               <HeaderTypeFirst
                  title='Add Downsell'
                  goBack={ () => {
                     if (isCustomSize) {
                        setIsCustomSize(false);
                     } else {
                        history.goBack();
                     }
                  } }
               />
               <AdminContainer.Content>
                  {isCustomSize ? (
                     <UpsellCreateCheckout
                        selectedTemplate={ inputs.selectedTemplateId }
                        onCreate={ () => handleFinishDownsell() }
                        onPrevious={ () => {
                           setIsCustomSize(false);
                        } }
                        onEdit={ (templateName) => {
                           setEditingTemplateName(templateName);
                           QueryParams.setHash('upsellview');
                        } }
                        isDownSell={ true }
                        onPreview={ (templateName) => {
                           QueryParams.setHash('upsellview');
                           setPreview(templateName);
                        } }
                        changeTemplate={ (value) => handleInputChange('selectedTemplateId', value) }
                        upsell={ { ...inputs, priceToView, offerView: { name: offerName } } }
                     />
                  ) : (
                     <UpsellCreateView
                        onChange={ handleInputChange }
                        isDownSell={ true }
                        onCancel={ () => history.goBack() }
                        pricings={ pricings }
                        onCreate={ () => handleCreateUpsell() }
                        inputs={ inputs }
                        offers={ offers ? offers.offers : [] }
                        errorMessages={ errorMessages }
                     />
                  )}

               </AdminContainer.Content>
            </div>
         </ComponentProgress>
      </AdminContainer>
   );
};

DownSellCreate.propTypes = {
   match: PropTypes.object,
};

export default DownSellCreate;
