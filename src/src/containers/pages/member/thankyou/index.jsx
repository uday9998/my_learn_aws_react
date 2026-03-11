import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withLoading from 'utils/withLoading';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getPlanByName } from 'api';
import { LinkHref } from 'utils/url';
import { siteInfoSelector, authUserSelector } from 'state/modules/common/selectors';
import { connect } from 'react-redux';
import ThankYouTemplate from 'views/other/ThankYou';

const ThankYouLoading = withLoading(ThankYouTemplate);

const ThankYou = (props) => {
   const { siteInfo, authUser, match: { params } } = props;
   const {
      data: course, loading,
   } = useApiQuery(getPlanByName, [params.course_name]);

   useEffect(() => {
      if (!authUser) {
         window.location.href = '/portal/membership';
      }
   }, []);
   let onSubmitText = '';
   const goToThankYouPage = () => {
      const value = course.plan.thank_you_page_id;
      let redirectUrl = '/portal/membership';
      switch (value) {
         case 1:
            if (course.plan.thank_you_page_url) {
               redirectUrl = LinkHref(course.plan.thank_you_page_url);
               onSubmitText = 'Go To Site';
            } else {
               redirectUrl = '/portal/membership';
            }
            break;
         case 3:
            redirectUrl = `/programs/${ course.url }`;
            onSubmitText = 'Go to Your Watch Room';
            break;
         default:
            redirectUrl = '/portal/membership';
      }
      window.location.href = redirectUrl;
   };


   const thankYouPageText = () => {
      const value = course && course.plan && course.plan.thank_you_page_id;
      onSubmitText = '';
      switch (value) {
         case 1:
            if (course.plan.thank_you_page_url) {
               onSubmitText = 'Go To Site';
            }
            break;
         case 3:
            onSubmitText = 'Go to Your Watch Room';
            break;
         default:
            onSubmitText = '';
      }
      return onSubmitText;
   };

   const templateProps = siteInfo.other_pages.thank_you.other_page_section.props;
   return (
      <ThankYouLoading
         isLoading={ loading }
         generalProps={ templateProps }
         email={ authUser.email }
         onSubmit={ goToThankYouPage }
         onSubmitText={ thankYouPageText() }
      />
   );
};

ThankYou.propTypes = {
   match: PropTypes.object,
   siteInfo: PropTypes.object,
   authUser: PropTypes.any,
};

const mapStateToProps = (state) => {
   return {
      siteInfo: siteInfoSelector(state),
      authUser: authUserSelector(state),
   };
};
const mapDispatchToProps = () => {
   return {


   };
};
export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
