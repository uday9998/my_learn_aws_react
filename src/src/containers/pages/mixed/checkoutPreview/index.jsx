import React from 'react';
import CheckoutTemplatePreview from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutTemplatePreview';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getCheckoutLanding, getPlan, getCustomFields } from 'api/AuthApi';
import withLoading from 'utils/withLoading';
import PropTypes from 'prop-types';
import image from 'assets/images/defaults/thumbnail.png';

const CheckoutLoading = withLoading('div');

const CheckoutPreviewContainer = (props) => {
   const { match: { params: { courseId, templateType, templateId } } } = props;
   const { data, loading: loadingSections } = useApiQuery(
      getCheckoutLanding, [{ offerId: courseId, landingId: templateId }]);
   const { data: offer, loading } = useApiQuery(
      getPlan, [courseId]);
   const { data: customFieldsData, loading: loadingCustomFields } = useApiQuery(
      getCustomFields, [{ courseId }]);
   const sections = data && data.sections;

   return (
      <CheckoutLoading isLoading={ loadingSections || loading || loadingCustomFields }>
         <CheckoutTemplatePreview
            course={ {
               thumbnail_image: (offer && offer.file) ? offer.file.src : image,
               pricings: offer?.pricings || [],
               name: offer ? offer.name : '',
            } }
            location={ templateType }
            sections={ sections }
            customFieldsData={ customFieldsData }
         />
      </CheckoutLoading>
   );
};

CheckoutPreviewContainer.propTypes = {
   match: PropTypes.object,
};


export default CheckoutPreviewContainer;
