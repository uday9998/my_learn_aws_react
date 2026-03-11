import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import OrderBumpCreate from 'views/pages/plansNew/edit/OrderBump';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { createUpdateOrderBump, getPlansForOrderBump } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const OrderBump = ({ match }) => {
   const history = useHistory();
   const [inputs, setInputs] = useState({
      type: 1,
      currency: 'USD',
      order: 0,
      percent: 1,
      price: 1,
      headling: '',
      description: '',
   });
   const [offers, setOffers] = useState([]);
   const [errorMessages, setErrorMessages] = useState({});
   const [init, { loading }] = useSubmitForm(getPlansForOrderBump, {});
   const [create, { loading: createLoading }] = useSubmitForm(createUpdateOrderBump, {
      successMessage: 'Order created successfully.',
   });

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: []
      }));
   };

   const addErrorsFromQuery = ({ data: { errors = {} } }) => {
      const convertedErrors = {
         headline: errors.name ?? [],
         price: errors.amount ?? [],
         percent: errors.percentage ?? [],
      };

      setErrorMessages(prev => ({
         ...prev,
         ...convertedErrors,
      }));

      return true;
   };

   const handleInputChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      if (name === 'offer') {
         setInputs({
            ...inputs,
            [name]: value,
            pricing: null,
         });
         return;
      }
      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   useEffect(() => {
      init(match.params.id, (data) => setOffers(data));
   }, []);

   const getCreateInputs = () => {
      const selectedOffer = inputs.offer ? offers.filter((e) => e.id === inputs.offer)[0] : null;
      const selectedPricing = inputs.pricing ? selectedOffer.pricings.filter((e) => e.id === inputs.pricing)[0] : null;
      const pricing = inputs.type === 1 ? {
         amount: inputs.price || 0,
         currency: inputs.currency,
      } : {
         percentage: inputs.percent || 0,
      };
      return {
         plan_id: inputs.offer,
         pricing_id: inputs.pricing,
         name: inputs.headline,
         description: inputs.description,
         status: inputs.order,
         type: selectedPricing?.pricing_type === 0 ? 2 : inputs.type,
         ...pricing,
      };
   };

   const onCreate = () => {
      create(
         { planId: match.params.id, data: getCreateInputs() },
         () => history.goBack(),
         addErrorsFromQuery
      );
   };

   return (
      <AdminContainer>
         <ComponentProgress loading={ loading }>
            <div className='plan__order__bump'>
               <HeaderTypeFirst
                  title='Order Bump'
                  goBack={ () => history.goBack() }
               />
               {createLoading && (
                  <LoaderSpinner />
               )}
               <AdminContainer.Content>
                  <OrderBumpCreate
                     inputs={ inputs }
                     goBack={ () => history.goBack() }
                     offers={ offers }
                     onCreate={ onCreate }
                     onChange={ handleInputChange }
                     errorMessages={ errorMessages }
                  />
               </AdminContainer.Content>
            </div>
         </ComponentProgress>
      </AdminContainer>
   );
};

OrderBump.propTypes = {
   match: PropTypes.object,
};

export default connect()(OrderBump);
