/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { siteDetailsInitOperation } from 'state/modules/common/operations';
import { connect } from 'react-redux';
import './index.scss';
import NotFoundTemplate from 'views/other/NotFound';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const NotFound = ({ siteInfo, init }) => {
   // const getView = () => {
   //    if (siteInfo && siteInfo.active_school_room) {
   //       if (siteInfo.active_school_room.school_logo) {
   //          return (
   //             <div className='error__user'>
   //                {siteInfo && siteInfo.active_school_room && siteInfo.active_school_room.school_logo && (
   //                   <img className='site_logo_img' src={ siteInfo.active_school_room.school_logo } />
   //                )}
   //                <h1>{siteInfo.title}</h1>
   //             </div>
   //          );
   //       }
   //       if (!siteInfo.active_school_room.remove_branding) {
   //          return (
   //             <div className='error__user'>
   //                <img src='https://miestro.com/sales/src/images/logo.png' />
   //                <h1>{siteInfo.title}</h1>
   //             </div>
   //          );
   //       }
   //       return (
   //          <div className='error__user'>
   //             <h1>{siteInfo.title}</h1>
   //          </div>
   //       );
   //    }
   //    return false;
   // };
   useEffect(() => {
      if (!(window.location.href.includes('portal/') || window.location.href.includes('programs/') || window.location.href.includes('admin/'))) {
         init();
      }

      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
         sidebar.style.display = 'none';
      }


      // const fonts = document.createElement('link');
      // fonts.setAttribute('href', 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,900%7CShare+Tech+Mono%7CSpace+Mono');
      // fonts.setAttribute('id', '404-fonts');
      // fonts.setAttribute('rel', 'stylesheet');

      // const style = document.createElement('link');
      // style.setAttribute('href', `${ process.env.REACT_APP_MAIN_DOMAIN_LIVE }/css/404/main.css`);
      // style.setAttribute('id', '404-style');
      // style.setAttribute('rel', 'stylesheet');

      // const jquery = document.createElement('script');
      // jquery.setAttribute('src', `${ process.env.REACT_APP_MAIN_DOMAIN_LIVE }/js/404/jquery.min.js`);
      // jquery.setAttribute('id', '404-jquery');

      // const main = document.createElement('script');
      // main.setAttribute('src', `${ process.env.REACT_APP_MAIN_DOMAIN_LIVE }/js/404/main.js`);
      // main.setAttribute('id', '404-main');

      // document.querySelector('head').appendChild(fonts);
      // document.querySelector('head').appendChild(style);
      // document.querySelector('body').appendChild(jquery);
      // document.querySelector('body').appendChild(main);
      // const menu = document.querySelector('.leftBar');
      // if (menu) {
      //    menu.style.display = 'none';
      // }
      // return () => {
      //    document.getElementById('404-fonts').remove();
      //    document.getElementById('404-style').remove();
      //    document.getElementById('404-jquery').remove();
      //    document.getElementById('404-main').remove();
      // };

      return () => {
         if (sidebar) {
            sidebar.style.display = 'block';
         }
      };
   }, []);
   // return (
   //    <>
   //       <div className='background' />
   //       <section className='error' style={ { zIndex: '999' } }>
   //          {/* {siteInfo && siteInfo.active_school_room && !siteInfo.active_school_room.remove_branding
   //          && <img src='https://miestro.com/sales/src/images/logo.png' />}
   //          <div className='error__user'>
   //             {siteInfo && siteInfo.active_school_room && siteInfo.active_school_room.school_logo && (
   //                <img src={ siteInfo.active_school_room.school_logo } />
   //             )}
   //             <h1>{siteInfo.title}</h1>
   //          </div> */}
   //          {getView()}
   //          <div className='error__content'>
   //             <div className='error__message message'>
   //                <h1 className='message__title'>Page Not Found</h1>
   //                <p className='message__text'>We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our site.
   //                </p>
   //             </div>
   //             <div className='error__nav e-nav'>
   //                <a href={ isAdmin ? '/admin' : '/courses' } className='e-nav__link' />
   //             </div>
   //          </div>
   //       </section>
   //    </>
   // );

   if (!siteInfo.other_pages) {
      return (
         <LoaderSpinner />
      );
   }

   const templateProps = siteInfo.other_pages['404'].other_page_section.props;
   return (
      <div style={ { height: '100vh', width: '100%' } }>
         <NotFoundTemplate
            generalProps={ typeof templateProps === 'string' ? JSON.parse(templateProps) : templateProps }
         />
      </div>
   );
};

NotFound.propTypes = {
   siteInfo: PropTypes.object,
   init: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      siteInfo: siteInfoSelector(state),
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      init: () => {
         dispatch(siteDetailsInitOperation());
      },

   };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
