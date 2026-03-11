import React, { useState, useEffect } from 'react';
import AdminContainer from 'views/layout/AdminContainer';
import { useHistory } from 'react-router';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import UpsellCreateView from 'views/pages/UpsellCreate';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   getPricingsForUpsell, getUpsell, updateUpsell,
} from 'api';
import PropTypes from 'prop-types';
import ComponentProgress from 'components/modules/ComponentProgress';
import UpsellCreateCheckout from 'views/pages/UpsellCreate/UpsellCreateCheckout';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import UpsellCheckoutView from 'views/pages/upsellCheckout';
import QueryParams from 'utils/QueryParams';
import generateTemplate from 'utils/generateUpsselTemplate';

const UpsellCreate = ({ match }) => {
   const history = useHistory();
   const [offers, setOffers] = useState(null);
   const [pricings, setPricings] = useState([]);
   const [initOffers, { loading }] = useSubmitForm(getPricingsForUpsell);
   const [update] = useSubmitForm(updateUpsell);
   const [isCustomSize, setIsCustomSize] = useState(false);
   const [inputs, onChange] = useState({
      cancel_button: 'Cancel',
      purchase_button: 'Purchase',
      selectedTemplateId: 1,
      headline: '',
   });
   const [preview, setPreview] = useState(null);
   const [getUpsellInputs, { loading: upsellLoading }] = useSubmitForm(getUpsell);
   const [editingTemplateName, setEditingTemplateName] = useState('');
   const [errorMessages, setErrorMessages] = useState({});

   const names = {
      'template1': 'Template one',
   };
   useEffect(() => {
      initOffers([match.params.offerId], (data) => {
         setOffers({
            data: Object.values(data),
            offers: Object.values(data).map((e) => ({ label: e.name, value: e.id })),
         });
         getUpsellInputs(match.params.upsellId, (response) => {
            onChange({
               ...response,
               planId: response.plan_id,
               selectedTemplateId: 1,
               offerView: response.offer,
            });
            const findedOffer = Object.values(Object.values(data).find((e) => e.id === response.offer_id).pricings);
            const pricingsArray = findedOffer.map((e) => ({ label: `$${ e.price ? e.price : '0' }`, value: e.id }));
            setPricings(pricingsArray);
            setEditingTemplateName(names[response.checkout_template_name]);
         });
      });
      if (QueryParams.getHash() === 'upsellview' && !preview && !editingTemplateName) {
         QueryParams.setHash('');
      }
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
      if (name === 'headline' || name === 'description') {
         const newSections = inputs.checkout_landings[0].upsell_section;
         newSections[0].upsell_components = newSections[0].upsell_components.map((e) => {
            if (e.name === 'Headline' || e.name === 'Description') {
               return {
                  ...e,
                  props: {
                     ...e.props,
                     text: value,
                  },
               };
            }
            return e;
         });
         onChange({
            ...inputs,
            [name]: value,
            checkout_landings: [{
               ...inputs.checkout_landings[0],
               upsell_section: newSections,
            }],
         });
         return;
      }
      onChange({
         ...inputs,
         [name]: value,
      });
   };
   const generateEditingTemplate = (sections) => {
      return sections.map((e) => {
         if (e.upsell_section) {
            return {
               ...e,
               upsell_components: e.upsell_components.sort((s, a) => s.props.order - a.props.order),
            };
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
            upsell_components: e.upsell_components.sort((s, a) => s.props.order - a.props.order),
         };
      });
   };

   const saveUpsell = () => {
      const price = inputs.pricing_id ? pricings.find((e) => e.value === inputs.pricing_id).label : '$ -';
      update({
         planId: match.params.offerId,
         upsellId: match.params.upsellId,
         data: {
            cancel_button: inputs.cancel_button,
            purchase_button: `${ inputs.purchase_button }${ inputs.autoText ? ` for ${ price }` : '' }`,
            offer_id: inputs.offer_id,
            pricing_id: inputs.pricing_id,
            headline: inputs.headline,
            description: inputs.description,
            sections: generateEditingTemplate(inputs.checkout_landings[0].upsell_section),
            landing_id: inputs.checkout_landings[0].id,
         },
      }, () => {
         if (isPrint('Upsell updated successfully.')) {
            toast.success('Upsell updated successfully.');
         }
         history.goBack();
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
      // create({
      //    planId: match.params.offerId,
      //    data: {
      //       cancel_button: inputs.cancel_button,
      //       purchase_button: `${ inputs.purchase_button }${ inputs.autoText ? ` for ${ price }` : '' }`,
      //       offer_id: inputs.offer_id,
      //       pricing_id: inputs.pricing_id,
      //       headline: inputs.headline,
      //       description: inputs.description,
      //    },
      // }, (data) => {
      //    setOffer(data);
      //    setIsCustomSize(true);
      // });
   };

   const priceToView = (inputs.pricing_id && pricings.length) 
      ? (pricings.find((e) => e.value === inputs.pricing_id)?.label || '$ -') 
      : '$ -';
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
         checkout_landings: [{
            ...inputs.checkout_landings[0],
            upsell_section: template.sections,
         }],
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
               initalTemplate={ { sections: generateEditingTemplate(inputs.checkout_landings[0].upsell_section) } }
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
               title='Preview Upsell Page'
               goBack={ () => {
                  setPreview(null);
                  QueryParams.setHash('');
               } }
            />
            <UpsellCheckoutView
               isPreview={ true }
               templateName={ preview }
               inputs={ { ...inputs, priceToView, offerView: { name: offerName } } }
            />
         </AdminContainer>
      );
   }
   return (
      <AdminContainer>
         <ComponentProgress loading={ loading || offers === null || upsellLoading }>
            <div className='upsel__create'>
               <HeaderTypeFirst
                  title='Edit Upsell'
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
                        onCreate={ () => saveUpsell() }
                        onPrevious={ () => {
                           setIsCustomSize(false);
                        } }
                        onEdit={ (templateName) => {
                           setEditingTemplateName(templateName);
                           QueryParams.setHash('upsellview');
                        } }
                        onPreview={ (templateName) => {
                           QueryParams.setHash('upsellview');
                           setPreview(templateName);
                        } }
                        isEdit={ true }
                        changeTemplate={ (value) => handleInputChange('selectedTemplateId', value) }
                        upsell={ { ...inputs, priceToView, offerView: { name: offerName } } }
                     />
                  ) : (
                     <UpsellCreateView
                        onChange={ handleInputChange }
                        onCancel={ () => history.goBack() }
                        isCreate={ true }
                        isEdit={ true }
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

UpsellCreate.propTypes = {
   match: PropTypes.object,
};

export default UpsellCreate;
