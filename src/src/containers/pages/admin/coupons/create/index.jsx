import React, { useState, useEffect } from 'react';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import CouponCreateView from 'views/pages/Coupons/Create';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { createCouponNew, getPlansForCoupons, generateCouponCode } from 'api';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import ComponentProgress from 'components/modules/ComponentProgress';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';

const CouponCreate = ({ goToEditPage }) => {
   const history = useHistory();
   const [create, { loading }] = useSubmitForm(createCouponNew, {
      successMessage: 'Coupon created successfully.',
   });
   const [getPlans, { loading: initState }] = useSubmitForm(getPlansForCoupons);
   const [generateCouponCodeFunc, { loading: isCouponCodeGenerating }] = useSubmitForm(generateCouponCode);
   const [offers, setOffers] = useState([]);
   const [inputs, setInputs] = useState({
      type: 0,
      duration_type: 0,
      percent: 1,
      amount: 1,
      offer_name: [],
      offer: [],
      expiration_type: 0.0,
   });
   const { isMobile } = useWindowSizeChange();
   useEffect(() => {
      getPlans(0, (data) => setOffers(data));
   }, []);

   const generateCoupon = () => {
      generateCouponCodeFunc({}, (res) => {
         setInputs({
            ...inputs,
            code: res,
         });
      });
   };


   const handleInputChange = (name, value) => {
      switch (name) {
         case 'offer':
            setInputs({
               ...inputs,
               [name]: value,
               offer_name: value.map((e) => offers.find((z) => z.id === e).name),
            });
            break;
         case 'duration_type':
            setInputs({
               ...inputs,
               [name]: value,
               expiration_date: '',
               start_date: '',
               end_date: '',
               repetitions: '',
            });
            break;
         default:
            setInputs({
               ...inputs,
               [name]: value,
            });
      }
   };

   const handleCreateCoupon = () => {
      const data = {
         coupon_code: inputs.code,
         coupon_type: inputs.type === 0 ? 'percentage' : 'flate_rate',
         coupon_duration: inputs.duration_type,
         expiration_type: inputs.expiration_type,
         [`coupon_${ inputs.type === 0 ? 'percentage' : 'amount' }`]: inputs.type === 0 ? inputs.percent : inputs.amount,
      };
      if (inputs.offer) {
         data.plan_ids = inputs.offer;
      }
      switch (inputs.duration_type) {
         case 0:
            data.expire_time = inputs.expiration_date;
            break;
         case 1:
            data.expire_time = inputs.expiration_date;
            data.repeated_numbers = inputs.repetitions;
            break;
         case 2:
            data.start_time = inputs.start_date;
            data.end_time = inputs.end_date;
            data.expire_time = inputs.end_date;
            break;
         default:
      }

      return create(data, (prev) => goToEditPage(prev.id), () => true);
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
            <ComponentProgress loading={ initState }>
               <div className='coupon__create'>
                  {loading && (
                     <LoaderSpinner />
                  )}
                  <HeaderTypeFirst
                     goBack={ () => history.goBack() }
                     title='New Coupon'
                  />
                  <AdminContainer.Content>
                     <CouponCreateView
                        inputs={ inputs }
                        offerOptions={ offers }
                        handleInputChange={ handleInputChange }
                        onCreate={ handleCreateCoupon }
                        onCancel={ () => history.goBack() }
                        generateCoupon={ generateCoupon }
                        isCouponCodeGenerating={ isCouponCodeGenerating }
                        isMobile={ isMobile }
                     />
                  </AdminContainer.Content>
               </div>
            </ComponentProgress>
         </AdminContainer>
      </>
   );
};

CouponCreate.propTypes = {
   goToEditPage: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToEditPage: (id) => {
         dispatch(push(
            Router.route('ADMIN_COUPON_VIEW').getCompiledPath({ id })
         ));
      },
   };
};

export default connect(() => {}, mapDispatchToProps)(CouponCreate);
