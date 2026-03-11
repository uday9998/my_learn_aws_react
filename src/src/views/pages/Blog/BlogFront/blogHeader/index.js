// import React from 'react';
// import PropTypes from 'prop-types';
// import './index.scss';
// import BlogHeaderImage from 'components/modules/blog/blogHeaderImage';
// import Router from 'routes/router';
// import Auth from 'utils/Auth';
// import { connect } from 'react-redux';
// import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
// import { push } from 'connected-react-router';
// import { resetCommonDetails } from 'state/modules/common/actions';
// // import CourseHeaderNav from 'components/modules/mainHub/CourseHeaderNav';
// import { customLogout } from 'utils/userMaven';

// const BlueHeader = ({
//    siteInfo, authUser, logout, blogSettingsFront,
// }) => {
//    // const handleLogout = () => {
//    //    customLogout(authUser);
//    //    logout();
//    //    window.location.reload();
//    // };

//    return (
//       <>
//          {/* <CourseHeaderNav
//             loggedIn={ !!authUser }
//             authUser={ authUser }
//             handleLogout={ handleLogout }
//             logo={ siteInfo.active_school_room.school_logo }
//             links={ siteInfo.custom_links && siteInfo.custom_links.items }
//             color={ siteInfo.landing_data[1].school_room_section.props.color }
//             primaryTheme={ siteInfo.active_school_room.school_font }
//             backgroundColor={ siteInfo.landing_data[1].school_room_section.props.bgColor }
//             siteInfo={ siteInfo }
//             isBlogPage={ true }
//          /> */}
//          <BlogHeaderImage blogSettingsFront={ blogSettingsFront } siteInfo={ siteInfo } />
//       </>
//    );
// };


// BlueHeader.propTypes = {
//    siteInfo: PropTypes.object,
//    authUser: PropTypes.object,
//    logout: PropTypes.func,
//    blogSettingsFront: PropTypes.object,
// };


// const mapStateToProps = (state) => {
//    return {
//       siteInfo: siteInfoSelector(state),
//       authUser: authUserSelector(state),
//    };
// };
// const mapDispatchToProps = (dispatch) => {
//    return {
//       logout: () => {
//          Auth.logout();
//          dispatch(resetCommonDetails());
//          dispatch(push(Router.route('COURSES').getMask()));
//       },
//    };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(BlueHeader);


import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BlogHeaderImage from 'components/modules/blog/blogHeaderImage';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';


const BlogHeader = ({
   title, blogSettingsFront, isSingle, siteInfo,
}) => {
   return (
      <div className='blogFrontHeader'>
         {!isSingle && (
            <div className='blogFrontHeader__title'>
               <Text
                  inner={ title }
                  type={ txtTypes.regularMin }
                  size={ txtSizes.size_28 }
               />
            </div>
         )}
         <BlogHeaderImage blogSettingsFront={ blogSettingsFront } siteInfo={ siteInfo } />
      </div>
   );
};

BlogHeader.propTypes = {
   title: PropTypes.string,
   blogSettingsFront: PropTypes.object,
   isSingle: PropTypes.bool,
   siteInfo: PropTypes.object,
};

export default BlogHeader;
