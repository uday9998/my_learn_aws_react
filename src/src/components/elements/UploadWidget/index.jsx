import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authUserSelector, mainAppSelector, appSelector } from 'state/modules/common/selectors';
import { getFileSizeSelector } from 'state/modules/settings/selectors';
import useS3Upload from 'components/modules/S3Upload';

function UploadWidget({
   format, onLoadingEnd, render, crop,
}) {
   const [inProgress, setInProgress] = useState(false);
   const widget = useRef();

   function handleLoadingEnd(info) {
      setInProgress(false);
      onLoadingEnd(info);
   }

   function onWidgetMount(widgetFunctions) {
      widget.current = widgetFunctions;
   }

   const { progressEL, uploadButton: uploadWidget } = useS3Upload(null, {
      fixedProgressBar: true,
      onChange: (src, name, file) => {
         const info = {
            cdnUrl: src,
            size: file.size,
            format,
            mimeType: file.type,
            name,
         };

         handleLoadingEnd(info);
      },
      fileLessonFormat: format,
      cropRatio: crop,
   }, onWidgetMount);


   function openWidget() {
      if (widget.current) {
         widget.current.openWidget();
      }
   }

   return (
      <>
         {uploadWidget}
         {progressEL}
         {render(openWidget, inProgress)}
      </>
   );
}

UploadWidget.defaultProps = {
   onLoadingEnd: () => {},
};

UploadWidget.propTypes = {
   format: PropTypes.string,
   onLoadingEnd: PropTypes.func,
   crop: PropTypes.string,
   render: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
      mainApp: mainAppSelector(state),
      app: appSelector(state),
      fileSizeInfo: getFileSizeSelector(state),
   };
};


export default connect(mapStateToProps)(UploadWidget);
