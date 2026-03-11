import React from 'react';
import SchoolRoomPreview from 'views/pages/SchoolRoomTheme/SchoolRoomPreview';
import withLoading from 'utils/withLoading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import MultiLang from 'utils/MultiLang/MultiLang';

const SchoolRoomPreviewLoading = withLoading('div');

const SchoolRoomPreviewContainer = (props) => {
   const { match: { params: { landingType } }, siteInfo } = props;
   return (
      <MultiLang>
         <SchoolRoomPreviewLoading isLoading={ false }>
            <SchoolRoomPreview
               siteInfo={ siteInfo }
               landingType={ landingType }
            />
         </SchoolRoomPreviewLoading>
      </MultiLang>
   );
};

SchoolRoomPreviewContainer.propTypes = {
   match: PropTypes.object,
   siteInfo: PropTypes.object,
};


const mapStateToProps = (state) => {
   return {
      siteInfo: siteInfoSelector(state),
   };
};
const mapDispatchToProps = () => {
   return {


   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolRoomPreviewContainer);
