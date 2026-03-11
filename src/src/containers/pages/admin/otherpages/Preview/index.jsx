import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { getPageByType } from 'views/pages/OtherPageEdit';

const OtherPagePreview = ({ match, siteInfo }) => {
   const pageData = window.otherPage || siteInfo.other_pages[match.params.type].other_page_section.props;
   const templateName = siteInfo.other_pages[match.params.type].tempplate.other_page_theme_name;
   const Component = getPageByType(match.params.type, templateName);
   return (
      <Component
         generalProps={ pageData }
         onSubmit={ () => {} }
      />
   );
};

OtherPagePreview.propTypes = {
   match: PropTypes.object,
   siteInfo: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      siteInfo: siteInfoSelector(state),
   };
};

const mapDispatchToProps = () => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherPagePreview);
