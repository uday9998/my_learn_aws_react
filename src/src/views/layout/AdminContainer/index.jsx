/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
// import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
// import { authUserSelector } from 'state/modules/common/selectors';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import Header from '../AdminHeader';
import Content from '../AdminContent';
import ContentAlt from '../AdminContentAlt';

const AdminContainer = ({ children, className, isLoading }) => {
   const { pathname } = useLocation();

   // Allow translation for my-account pages (including hash sections like #settings, #my-portal, etc.)
   const [shouldAllowTranslation, setShouldAllowTranslation] = useState(
      pathname.includes('/my-account') || window.location.hash.includes('my-account')
   );
   const [pageLink, setPageLink] = useState({
      link: null,
      linkText: null,
   });

   // Update translation allowance when hash changes
   useEffect(() => {
      const updateTranslationAllowance = () => {
         const allowTranslation = pathname.includes('/my-account') || window.location.hash.includes('my-account');
         setShouldAllowTranslation(allowTranslation);

         // Apply saved translation when enabling translation for my-account pages
         if (allowTranslation) {
            const savedLanguage = localStorage.getItem('currentLanguage');
            if (savedLanguage && savedLanguage !== 'en') {
               setTimeout(() => {
                  const applyTranslation = () => {
                     const translateElement = document.querySelector('.goog-te-combo');
                     if (translateElement && translateElement.options && translateElement.options.length > 1) {
                        translateElement.value = savedLanguage;
                        translateElement.dispatchEvent(new Event('change'));
                     } else {
                        setTimeout(applyTranslation, 100);
                     }
                  };
                  applyTranslation();
               }, 100);
            }
         }
      };

      // Listen for hash changes
      window.addEventListener('hashchange', updateTranslationAllowance);

      // Check on mount
      updateTranslationAllowance();

      return () => {
         window.removeEventListener('hashchange', updateTranslationAllowance);
      };
   }, [pathname]);
   // const { email, is_verified_email } = useSelector(authUserSelector);
   // const closeVerifiedEmail = (location.pathname.includes('landings') && location.pathname.split('/').length > 3 && location.pathname.split('/')[location.pathname.split('/').length - 1] === 'edit')
   // || location.hash === '#checkout/template1' || location.hash === '#checkout/template2' || location.hash === '#checkout/template3'
   // || location.pathname.includes('schoolroom/template');

   useEffect(() => {
      if (pathname.includes('programs')) {
         setPageLink({
            link: 'https://support.miestro.com/993547-My-Products',
            linkText: 'Your Products', 
         });
      } else if (pathname.includes('library')) {
         setPageLink({
            link: 'https://support.miestro.com/164861-Media-Library',
            linkText: 'Media Library', 
         });
      } else if (pathname.includes('other-pages')) {
         setPageLink({
            link: 'https://support.miestro.com/702737-Other-Pages',
            linkText: 'Other Pages', 
         });
      } else if (pathname.includes('landings')) {
         setPageLink({
            link: 'https://support.miestro.com/585393-Landing-Pages',
            linkText: 'Landing Pages', 
         });
      } else if (pathname.includes('portal')) {
         setPageLink({
            link: 'https://support.miestro.com/575072-Portal-Themes',
            linkText: 'Portal', 
         });
      } else if (pathname.includes('members') && !pathname.includes('membership')) {
         setPageLink({
            link: 'https://support.miestro.com/727172-Members-Section',
            linkText: 'Members', 
         });
      } else if (pathname.includes('automations')) {
         setPageLink({
            link: 'https://support.miestro.com/714219-Automation-Section',
            linkText: 'Automations', 
         });
      } else if (pathname.includes('admin/dashboard') || pathname.includes('subscriptionMetrics') || pathname.includes('subscriptionMetrics') || pathname.includes('netRevenue') || pathname.includes('reports/view') || pathname.includes('class/progress') || pathname.includes('transactions') || pathname.includes('refunds') || pathname.includes('video/metrics')) {
         setPageLink({
            link: 'https://support.miestro.com/939754-Analytics-Section',
            linkText: 'Analytics', 
         });
      } else if (pathname.includes('membership') || pathname.includes('bundles') || pathname.includes('coupons') || pathname.includes('affiliate')) {
         setPageLink({
            link: 'https://support.miestro.com/936472-Sales-Section',
            linkText: 'Sales', 
         });
      } else if (pathname.includes('emails') || pathname.includes('blog') || pathname.includes('certificates')) {
         setPageLink({
            link: 'https://support.miestro.com/921477-Promotions-Section',
            linkText: 'Promotions', 
         });
      } else if (pathname.includes('admin/settings')) {
         setPageLink({
            link: 'https://support.miestro.com/427326-Settings-Section',
            linkText: 'Settings', 
         });
      } else {
         setPageLink({
            link: null,
            linkText: null, 
         });
      }
   }, []);

   const handleOpenLink = () => {
      window.open(pageLink.link, '_blank');
   };

   return (
      <div className={ `adminContainer ${ shouldAllowTranslation ? '' : 'notranslate' } ${ className }` }>
         {/* {!is_verified_email && !closeVerifiedEmail && (
            <div className='verify-email-alert'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.extraSmall }
                  inner={ `Please confirm your email address to verify your account as soon as possible. A confirmation message was sent to ${ email }` }
                  className='text-center'
                  color='#7cb740'
               />
            </div>
         )} */}
         {isLoading ? (
            <LoaderSpinner />
         ) : (
            pageLink.link && !(pathname.includes('landings') && pathname.includes('edit')) && !(pathname.includes('programs') && pathname.includes('edit')) && !(pathname.includes('portal/template')) && !(pathname.includes('programs/create')) && !(pathname.includes('programs/categories')) && !(pathname.includes('other-pages/')) && !(pathname.includes('portal/settings')) && !(pathname.includes('portal/customize')) && !(pathname.includes('members/member')) && !(pathname.includes('automations') && pathname.includes('edit')) && !pathname.includes('affiliate/create') && !pathname.includes('coupons/create') && !(pathname.includes('bundles') && pathname.includes('edit')) && !pathname.includes('bundles/create') && !pathname.includes('emails/create') && !(pathname.includes('blog') && pathname.includes('edit')) && !pathname.includes('createcertificates/template') ? (
               <>
                  <div
                     style={ {
                        background: (pathname.includes('edit') && !pathname.includes('membership')) || pathname.includes('subscriptionMetrics') || pathname.includes('reports/view') || pathname.includes('class/progress') || pathname.includes('transactions') ? '#fff' : 'transparent',
                     } }
                     className='icon__text__wrapper'>
                     <Icon name='ToolTipI' />
                     <Text 
                        inner={ `Learn More About ${ pageLink.linkText }` }
                        size={ sizes.size_14 }
                        className='link__text'
                        onClick={ handleOpenLink }
                     />
                  </div>
                  {children}
               </>
            ) : children
         )}
      </div>
   );
};

AdminContainer.defaultProps = {
   className: '',
};

AdminContainer.propTypes = {
   isLoading: PropTypes.bool,
   children: PropTypes.any,
   className: PropTypes.string,
};

AdminContainer.Header = Header;
AdminContainer.Content = Content;
AdminContainer.ContentAlt = ContentAlt;

export default AdminContainer;
