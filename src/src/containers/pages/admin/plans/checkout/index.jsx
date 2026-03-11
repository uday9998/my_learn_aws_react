import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckoutTemplate from 'views/pages/DesignCourse/CheckoutTemplate';
import { getCustomFields } from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';
import * as selectors from 'state/modules/plans/selectors';
import * as operations from 'state/modules/plans/operations';
import { connect } from 'react-redux';
import image from 'assets/images/defaults/thumbnail.png';
import ComponentProgress from 'components/modules/ComponentProgress';
import { getHash } from 'connected-react-router';

const OfferCheckoutEdit = ({
   match, init, plan, progress,
}) => {
   const courseId = match.params.offerId;
   const { data: customFieldsData, loading: loadingCustomFields } = useApiQuery(
      getCustomFields, [{ courseId }]);
   useEffect(() => {
      init(courseId);

      return () => {
         localStorage.removeItem('previewData');
      };
   }, []);
   const [offer, setOffer] = useState({
      pricings: [],
   });
   useEffect(() => {
      if (plan.name) {
         setOffer({
            id: match.params.offerId,
            name: plan.name,
            pricings: plan.pricings || [],
            thumbnail_image: plan.file ? plan.file.src : image,
         });
      }
   }, [plan]);

   const getLocation = () => {
      return `#checkout/${ match.params.name }`;
   };

   return (
      <ComponentProgress loading={ progress || !offer.name || loadingCustomFields }>
         <CheckoutTemplate
            updateCourseNew={ () => {} }
            changeCourse={ (data) => setOffer(data) }
            course={ offer }
            templateName={ match.params.name }
            location={ getLocation() }
            landingId={ match.params.id }
            courseId={ courseId }
            offerId={ match.params.offerId }
            customFieldsData={ customFieldsData }
         />
      </ComponentProgress>
   );
};

OfferCheckoutEdit.propTypes = {
   match: PropTypes.object,
   plan: PropTypes.object,
   progress: PropTypes.bool,
   init: PropTypes.func,
};


const mapStateToProps = (state) => {
   return {
      plan: selectors.planSelector(state),
      progress: selectors.planProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => ({
   init: (id) => {
      dispatch(operations.getPlanOperation(id));
   },
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferCheckoutEdit);
