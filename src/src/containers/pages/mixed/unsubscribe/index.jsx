import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { getPageByType } from 'views/pages/OtherPageEdit';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { unsubscribe } from 'api/GuestApi';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import { portalId } from 'utils/constants';

const OtherPagePreview = ({ match, siteInfo, goToOffers }) => {
   const [type, setType] = useState('unsubscribe');
   const pageData = siteInfo.other_pages[`${ type }`].other_page_section.props;
   const templateName = siteInfo.other_pages[`${ type }`].tempplate.other_page_theme_name;
   const Component = getPageByType(type, templateName);

   const [unsubscribeFunc, { loading: unsubscribeLoading }] = useSubmitForm(unsubscribe);

   const handleUnsubscribe = isCancel => {
      if (isCancel) {
         goToOffers();
      } else {
         unsubscribeFunc(
            { site_uiid: match.params.site_uiid, email: match.params.email },
            data => {
               if (data.status === 1) {
                  setType('unsubscribe_success');
               } else {
                  if (isPrint('Please contact support.')) {
                     toast.error('Please contact support.');
                  }
                  goToOffers();
               }
            }
         );
      }
   };

   return (
      <>
         {unsubscribeLoading && <LoaderSpinner />}
         {!unsubscribeLoading && (
            <Component
               generalProps={ pageData }
               match={ match }
               onSubmit={ isCancel => handleUnsubscribe(isCancel) }
            />
         )}
      </>
   );
};

OtherPagePreview.propTypes = {
   match: PropTypes.object,
   siteInfo: PropTypes.func,
   goToOffers: PropTypes.func,
};

const mapStateToProps = state => {
   return {
      siteInfo: siteInfoSelector(state),
   };
};

const mapDispatchToProps = dispatch => {
   return {
      goToOffers: () => dispatch(push(Router.route('OFFERS').getCompiledPath(portalId))),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherPagePreview);
