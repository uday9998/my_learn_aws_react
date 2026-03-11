import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import CouponEditPage from 'views/pages/Coupons/Edit';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   attachPlanToCoupon,
   deleteCoupons, detachPlanFromCommunity, getCoupon,
   getPlansForCoupons,
} from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';

const EditCoupon = ({ match, goToList }) => {
   // queries
   const [init, { loading = true }] = useSubmitForm(getCoupon);
   const [handleDelete] = useSubmitForm(deleteCoupons);
   const [detachPlan] = useSubmitForm(detachPlanFromCommunity, {
      successMessage: 'Plan has been disconected.',
   });
   const [attachPlan] = useSubmitForm(attachPlanToCoupon, {
      successMessage: 'Plan has been connected.',
   });
   const [getPlans, { loading: initState }] = useSubmitForm(getPlansForCoupons);
   // states
   const [offers, setOffers] = useState([]);
   const [coupon, setCoupon] = useState({});
   const history = useHistory();
   const plans = useRef(null);
   const { isMobile } = useWindowSizeChange();

   const filterOptions = (data, couponPlans) => {
      plans.current = data;
      const filterData = data.filter((e) => !couponPlans.some((item) => item.id === e.id));
      setOffers(filterData.map((e) => ({ label: e.name, value: e.id })));
   };

   // effects
   useEffect(() => {
      init(match.params.id, (data) => {
         setCoupon(data);
         getPlans(0, (e) => filterOptions(e, data.plans));
      });
   }, []);
   const onDelete = () => {
      handleDelete([coupon.id], () => history.goBack());
   };

   const onDetach = (id) => {
      detachPlan([match.params.id, id], () => {
         const preview = plans.current.find(e => e.id === id);
         setCoupon({
            ...coupon,
            plans: coupon.plans.filter((e) => e.id !== id),
         });
         setOffers([
            ...offers,
            { label: preview.name, value: preview.id },
         ]);
      });
   };

   const onAttach = (id, callBack) => {
      attachPlan([match.params.id, [id]], () => {
         callBack();
         const preview = plans.current.find(e => e.id === id);
         setCoupon({
            ...coupon,
            plans: [
               ...coupon.plans,
               preview,
            ],
         });
         filterOptions([...plans.current, preview], [
            ...coupon.plans,
            preview,
         ]);
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
            <ComponentProgress loading={ initState || loading || coupon.id === undefined }>
               <AdminContainer.Content>
                  <CouponEditPage
                     coupon={ coupon }
                     offers={ offers }
                     goToList={ goToList }
                     onDelete={ onDelete }
                     onConnectPlan={ onAttach }
                     onDetach={ onDetach }
                     isMobile={ isMobile }
                  />
               </AdminContainer.Content>
            </ComponentProgress>
         </AdminContainer>
      </>
   );
};

EditCoupon.propTypes = {
   match: PropTypes.object,
   goToList: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToList: () => {
         dispatch(push(
            Router.route('ADMIN_COUPONS').getCompiledPath()
         ));
      },
   };
};

export default connect(() => {}, mapDispatchToProps)(EditCoupon);
