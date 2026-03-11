import React from 'react';
import PropTypes from 'prop-types';
import ThankYouTemplate from 'views/other/ThankYou';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';

const ThankYouPreviewPage = ({ site }) => {
   const templateProps = site.other_pages.thank_you.other_page_section.props;
   return (
      <ThankYouTemplate
         generalProps={ templateProps }
      />
   );
};

ThankYouPreviewPage.propTypes = {
   site: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      site: siteInfoSelector(state),
   };
};

const mapDispatchToProps = () => {
   return {
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouPreviewPage);
