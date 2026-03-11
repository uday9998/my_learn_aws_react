import React, { useState, useEffect } from 'react';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import PlanCreateView from 'views/pages/plansNew/create';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   createPlanNew,
   // getAllCoursesOptimized,
   getMembership,
} from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import { useApiQuery } from 'utils/hooks/useQuery';
import { settingsGetOperation } from 'state/modules/settings/operations';
import { integrationSettingsSelector } from 'state/modules/settings/selectors';

const MembershipCreate = ({
   goToEdit, getIntegrations, integrations, goTo,
}) => {
   const history = useHistory();
   const {
      data: membership, loading: loadingMembership,
   } = useApiQuery(getMembership);
   // ;
   // const [courses, setCourses] = useState([]);
   const [data, setData] = useState({
      name: 'Membership',
      is_membership: true,
      picture_src: 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png',
      original_name: 'default',
      pricings: [
         {
            currency: 'USD',
            name: '',
            price: '',
            number_of_payments: 1,
            'pricing_type': 2,
         },
      ],
   });
   // const [get, { loading }] = useSubmitForm(getAllCoursesOptimized);
   const [create] = useSubmitForm(createPlanNew);
   // const [selectedProduct, setSelectedProduct] = useState({
   //    name: 'Name of Your Product',
   //    description: 'Here you will see a description of the product...',
   // });
   const { isMobile } = useWindowSizeChange();
   const [isPreview, setIsPreview] = useState(false);
   const [errorMessages, setErrorMessages] = useState({});

   const clearErrorMessages = () => {
      setErrorMessages({});
   };

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

   const addTemporaryErrorMessage = (fieldName, errMessage) => {
      const currentMessages = errorMessages[fieldName] || [];

      if (currentMessages.includes(errMessage)) return;

      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [errMessage, ...currentMessages]
      }));

      setTimeout(() => {
         setErrorMessages(prev => ({
            ...prev,
            [fieldName]: prev[fieldName].filter(message => message !== errMessage)
         }));
      }, 1000);
   };

   const addErrorsFromQuery = ({ data: { errors = {} } }) => {
      addErrorMessages(errors);

      return true;
   };

   useEffect(() => {
      getIntegrations();
   }, []);


   useEffect(() => {
      if (membership && membership.id) {
         goToEdit(membership.id);
      }
   }, [loadingMembership]);

   useEffect(() => {
      if (!isMobile) {
         setIsPreview(false);
      }
   }, [isMobile]);


   const handleInputChange = (name, value, isPaymentMethodChanged) => {
      if (isPaymentMethodChanged && errorMessages['pricings.0.payment_method']?.length) {
         removeErrorMessage('pricings.0.payment_method');
      }
      // if (name === 'course_id') {
      //    setSelectedProduct(courses.filter((e) => e.id === value)[0]);
      // }
      if (name === 'image') {
         setData({
            ...data,
            picture_src: value.value,
            original_name: value.name,
         });
         return;
      }
      setData({
         ...data,
         [name]: value,
      });
   };

   // const getCoursesOptions = () => {
   //    return courses.map((e) => ({ label: e.name, value: e.id }));
   // };

   const handleCreatePlan = () => {
      create(
         data,
         (prev) => {
            toast.success('Membership has been created.');
            goToEdit(prev.id);
         },
         addErrorsFromQuery
      );
   };

   const goToIntegrations = () => {
      goTo(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#integrations`);
   };

   return (
      <>
         <MobileHeader>
            <SiteHeader
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <AdminContainer>
            <ComponentProgress loading={ loadingMembership }>
               {loadingMembership === false && !(membership && membership.id) && (
                  <HeaderTypeFirst
                     goBack={ () => {
                        if (isMobile && isPreview) {
                           setIsPreview(false);
                        } else {
                           history.goBack();
                        }
                     } }
                     title={ isMobile && isPreview ? 'Membership Preview' : 'New Membership' }
                     buttonText='Preview Membership'
                     onSave={ isMobile && !isPreview ? () => setIsPreview(true) : null }
                     buttonProps={ {
                        theme: btnThemes.secondary,
                        style: { padding: '8px 12px' },
                     } }
                  />
               ) }
               <AdminContainer.Content>
                  <PlanCreateView
                     inputs={ data }
                     // selectedProduct={ selectedProduct }
                     // courses={ getCoursesOptions() }
                     onChange={ handleInputChange }
                     handleCreatePlan={ handleCreatePlan }
                     isMobile={ isMobile }
                     isPreview={ isPreview }
                     isMembership={ true }
                     integrations={ integrations }
                     goToIntegrations={ goToIntegrations }
                     errorMessages={ errorMessages }
                     clearErrorMessages={ clearErrorMessages }
                     removeErrorMessage={ removeErrorMessage }
                     addTemporaryErrorMessage={ addTemporaryErrorMessage }
                  />
               </AdminContainer.Content>
            </ComponentProgress>
         </AdminContainer>
      </>
   );
};

MembershipCreate.propTypes = {
   goToEdit: PropTypes.func,
   getIntegrations: PropTypes.func,
   integrations: PropTypes.array,
   goTo: PropTypes.func,
};

const mapStateToProps = (state) => ({
   integrations: integrationSettingsSelector(state),
});
const mapDispatchToProps = (dispatch) => ({
   goTo: (location) => {
      dispatch(push(location));
   },
   goToEdit: (id) => {
      dispatch(
         push(`${ Router.route('ADMIN_MEMBERSHIP_EDIT').getCompiledPath({ id }) }#main`)
      );
   },
   getIntegrations: () => {
      dispatch(settingsGetOperation('integrations'));
   },
});

export default connect(mapStateToProps, mapDispatchToProps)(MembershipCreate);
