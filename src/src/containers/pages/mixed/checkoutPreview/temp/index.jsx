import React, { useEffect, useState } from 'react';
import CheckoutTemplatePreview from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutTemplatePreview';
import PropTypes from 'prop-types';

const CheckoutTempPreviewContainer = (props) => {
   const { match: { params: { templateType } } } = props;

   const [previewData, setPreviewData] = useState(null);

   useEffect(() => {
      const jsonPreviewData = localStorage.getItem('previewData');
      const parsedPreviewData = JSON.parse(jsonPreviewData);

      if (parsedPreviewData && parsedPreviewData.sections) {
         setPreviewData(parsedPreviewData);
      } else {
         window.location.href = '/admin';
      }
   }, []);

   if (!previewData) {
      return null;
   }

   return (
      <div>
         <CheckoutTemplatePreview
            course={ previewData.course }
            location={ templateType }
            sections={ previewData.sections }
         />
      </div>
   );
};

CheckoutTempPreviewContainer.propTypes = {
   match: PropTypes.object,
};

export default CheckoutTempPreviewContainer;