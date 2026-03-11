import React, { useState, useEffect } from 'react';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import PlanCreateView from 'views/pages/plansNew/create';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { createPlanNew, getAllCoursesOptimized } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';

const PlansCreate = ({ goToEdit }) => {
   const history = useHistory();
   const [courses, setCourses] = useState([]);
   const [data, setData] = useState({
      name: '',
      picture_src: 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png',
      original_name: 'default',
      pricings: [
         {
            currency: 'USD',
            name: '',
            price: '',
            'pricing_type': 2,
         },
      ],
   });
   const [get, { loading }] = useSubmitForm(getAllCoursesOptimized);
   const [create] = useSubmitForm(createPlanNew);
   const [selectedProduct, setSelectedProduct] = useState({
      name: 'Name of Your Product',
      description: 'Here you will see a description of the product...',
   });
   const { isMobile } = useWindowSizeChange();
   const [isPreview, setIsPreview] = useState(false);

   useEffect(() => {
      if (!isMobile) {
         setIsPreview(false);
      }
   }, [isMobile]);

   useEffect(() => {
      get({}, (response) => setCourses(response));
   }, []);

   const handleInputChange = (name, value) => {
      if (name === 'course_id') {
         setSelectedProduct(courses.filter((e) => e.id === value)[0]);
      }
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

   const getCoursesOptions = () => {
      return courses.map((e) => ({ label: e.name, value: e.id }));
   };


   const handleCreatePlan = () => {
      create(data, (prev) => {
         toast.success('Bundle has been created.');
         goToEdit(prev.id);
      });
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
            <ComponentProgress loading={ loading }>
               <HeaderTypeFirst
                  goBack={ () => {
                     if (isMobile && isPreview) {
                        setIsPreview(false);
                     } else {
                        history.goBack();
                     }
                  } }
                  title={ isMobile && isPreview ? 'Bundle Preview' : 'New Bundle' }
                  buttonText='Preview Bundle'
                  onSave={ isMobile && !isPreview ? () => setIsPreview(true) : null }
                  buttonProps={ {
                     theme: btnThemes.secondary,
                     style: { padding: '8px 12px' },
                  } }
               />
               <AdminContainer.Content>
                  <PlanCreateView
                     inputs={ data }
                     selectedProduct={ selectedProduct }
                     courses={ getCoursesOptions() }
                     onChange={ handleInputChange }
                     handleCreatePlan={ handleCreatePlan }
                     isMobile={ isMobile }
                     isPreview={ isPreview }
                  />
               </AdminContainer.Content>
            </ComponentProgress>
         </AdminContainer>
      </>
   );
};

PlansCreate.propTypes = {
   goToEdit: PropTypes.func,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
   goToEdit: (id) => {
      dispatch(
         push(`${ Router.route('ADMIN_PLAN_EDIT').getCompiledPath({ id }) }#main`)
      );
   },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlansCreate);
