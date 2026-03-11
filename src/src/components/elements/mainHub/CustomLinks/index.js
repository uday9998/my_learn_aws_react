import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import { isLocalhost } from 'utils/Helpers';

const CustomLinks = ({
   siteInfo, className, isHeader, setIsOpenTermsModal, setIsOpenPrivacyPolicy,
}) => {
   const customLinks = siteInfo.custom_links.items;
   customLinks.sort((a, b) => {
      if (a.order < b.order) return -1;
      return a.order > b.order ? 1 : 0;
   });
   const headerLinks = (customLinks && customLinks.filter(child => (child.position === 'right' || child.position === 'left')));
   const footerLinks = (customLinks && customLinks.filter(child => (child.position === 'f_right' || child.position === 'f_left')));

   if ((isHeader && headerLinks.length === 0) || (!isHeader && footerLinks.length === 0)) return null;

   const baseUrl = document.querySelector('meta[name="base_url"]')?.getAttribute('content');

   const apiUrl = (isLocalhost()) ? process.env.REACT_APP_API_LOCAL_ENDPOINT : (baseUrl || window.location.origin);

   const getHrefName = (value) => {
      let newValue = value;
      if (value === `${ apiUrl }/offers`) {
         newValue = 'Offer Page';
      } else if (value === `${ apiUrl }/my-account`) {
         newValue = 'Portal';
      } else if (value === `${ apiUrl }/my-account#saved`) {
         newValue = 'My Saved Courses';
      } else if (value === `${ apiUrl }/terms`) {
         newValue = 'Terms of Use';
      } else if (value === `${ apiUrl }/privacy`) {
         newValue = 'Privacy Policy';
      }
      return newValue;
   };

   return (
      <div className={ `custom-links ${ isHeader ? 'header-links' : 'footer-links' } ${ className }` }>
         { isHeader ? (
            <div className='links header-links'>
               {
                  headerLinks && headerLinks.map((link) => {
                     return (
                        <div key={ link.id } className='link'>
                           <a href={ link.href } target={ link.target } rel='noopener noreferrer'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner={ link.text }
                                 style={ { color: link.color ? link.color : 'var(--primaryColor)' } }
                              />
                           </a>
                        </div>
                     );
                  })
               }
               {/* {isBlogPage ? (
                     <div className='link'>
                        <a href={ `${ Router.route('OFFERS').getMask() }` } target='_blank' rel='noopener noreferrer'>
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.small }
                              inner='Classes'
                              color={ link.color ? link.color : '#fff' }
                           />
                        </a>
                     </div>
                  ) : (
                     !!total && total > 0 && (
                        <div className='link'>
                           <a href={ `${ Router.route('BLOG_LISTING').getMask() }` } target='_blank' rel='noopener noreferrer'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner='Blog'
                                 color={ siteInfo.header_text_color ? siteInfo.header_text_color : '#fff' }
                              />
                           </a>
                        </div>
                     )
                  ) } */}
            </div>
         ) : (
            <div className='links footer-links'>
               {
                  footerLinks && footerLinks.map((link) => {
                     if (getHrefName(link.href) === 'Terms of Use' && setIsOpenTermsModal) {
                        return (
                           <div key={ link.id } className='link' onClick={ () => setIsOpenTermsModal(true) } role='presentation'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner={ link.text }
                                 style={ { color: link.color ? link.color : 'var(--primaryColor)' } }
                              />
                           </div>
                        );
                     } if (getHrefName(link.href) === 'Privacy Policy' && setIsOpenPrivacyPolicy) {
                        return (
                           <div key={ link.id } className='link' onClick={ () => setIsOpenPrivacyPolicy(true) } role='presentation'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner={ link.text }
                                 style={ { color: link.color ? link.color : 'var(--primaryColor)' } }
                              />
                           </div>
                        );
                     }
                     return (
                        <div key={ link.id } className='link'>
                           <a href={ link.href } target={ link.target } rel='noopener noreferrer'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.small }
                                 inner={ link.text }
                                 style={ { color: link.color ? link.color : 'var(--primaryColor)' } }
                              />
                           </a>
                        </div>
                     );
                  })
               }
            </div>
         )
         }
      </div>
   );
};

CustomLinks.propTypes = {
   siteInfo: PropTypes.object,
   className: PropTypes.string,
   isHeader: PropTypes.bool,
   setIsOpenPrivacyPolicy: PropTypes.any,
   setIsOpenTermsModal: PropTypes.any,
};

CustomLinks.defaultProps = {
   className: '',
   isHeader: false,
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomLinks);
