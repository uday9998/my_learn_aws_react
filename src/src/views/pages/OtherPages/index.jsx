import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconButton from 'components/elements/buttons/IconButton';
import moment from 'moment';
// Images
import SignInTemplate1Image from 'assets/images/OtherPages/SignInTemplate1Image.png';
import SignUpTemplate1Image from 'assets/images/OtherPages/SignUpTemplate1Image.png';
import NotFoundTemplate1Image from 'assets/images/OtherPages/NotFoundTemplate1Image.png';
import ThankYouTempalte1Image from 'assets/images/OtherPages/ThankYouTempalte1Image.png';
import UnsubscribeImg from 'assets/images/OtherPages/unsubscribeTemplate1Image.png';
import UnsubscribeSuccessImg from 'assets/images/OtherPages/unsubscribeSuccessTemplate1Image.png';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import OtherPageItemMobile from './OtherPageItemMobile';

export const signInTemplatesImages = {
   template1: SignInTemplate1Image,
};

export const signUpTemplatesImages = {
   template1: SignUpTemplate1Image,
};

export const notFoundTemplatesImages = {
   template1: NotFoundTemplate1Image,
};

export const thankYouTemplatesImages = {
   template1: ThankYouTempalte1Image,
};

export const unsubscribeTemplatesImages = {
   template1: UnsubscribeImg,
};

export const unsubscribeSuccessTemplatesImages = {
   template1: UnsubscribeSuccessImg,
};

export const pageData = {
   '404': {
      name: '404 page',
      url: '/not-found',
      image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
   },
   sign_up: {
      name: 'Sign Up',
      url: '/admin/other-pages/preview/sign_up',
      image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
   },
   sign_in: {
      name: 'Sign In',
      url: '/admin/other-pages/preview/sign_in',
      image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
   },
   thank_you: {
      name: 'Thank You',
      url: '/admin/thank-you/preview',
   },
   unsubscribe: {
      name: 'Unsubscribe',
      url: '/admin/other-pages/preview/unsubscribe',
   },
   unsubscribe_success: {
      name: 'Unsubscribe Success',
      url: '/admin/other-pages/preview/unsubscribe_success',
   },
};
const OtherPagesView = ({
   data,
   isReversedArray,
   setIsReversedArray,
   openItem,
   isMobile,
}) => {
   const openPreview = (event, url) => {
      event.stopPropagation();
      event.preventDefault();
      window.open(url, '_blank');
   };


   const getImageSrc = (type, templateName) => {
      switch (type) {
         case 'sign_in':
            return signInTemplatesImages[templateName];
         case 'sign_up':
            return signUpTemplatesImages[templateName];
         case 'thank_you':
            return thankYouTemplatesImages[templateName];
         case 'unsubscribe':
            return unsubscribeTemplatesImages[templateName];
         case 'unsubscribe_success':
            return unsubscribeSuccessTemplatesImages[templateName];
         default:
            return notFoundTemplatesImages[templateName];
      }
   };

   const reversedContent = () => {
      const content = data.arrayItems.sort((a, b) => {
         const dateA = new Date(a[0].updated_at);
         const dateB = new Date(b[0].updated_at);
         if (isReversedArray) {
            return dateA - dateB;
         }
         return dateB - dateA;
      });
      return content;
   };

   return (
      <div className='other__pages'>
         <div className='other__pages__content'>
            <Text
               inner={ `${ reversedContent().length } Pages` }
               type={ types.regularDefault }
               size={ sizes.small }
            />
            {
               isMobile ? (
                  <div
                     className='other__pages__content__mobile__table'
                  >
                     {
                        reversedContent().map(([e]) => {
                           const item = pageData[e.page_type];
                           return (
                              <OtherPageItemMobile
                                 key={ e.url }
                                 item={ item }
                                 imgSrc={ getImageSrc(e.page_type, e.other_page_theme_name) }
                                 openPreview={ openPreview }
                                 onClick={ () => openItem(e.page_type) }
                                 updatedAt={ moment(e.updated_at).format('M/D/YY LT') }
                              />
                           );
                        })
                     }
                  </div>
               ) : (
                  <div className='other__pages__content__table'>
                     <table>
                        <thead>
                           <tr>
                              <th>
                                 <Text
                                    inner='Page Name'
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                 />
                              </th>
                              <th>
                                 <div className='other__pages__content__updated'>
                                    <IconButton
                                       onClick={ () => setIsReversedArray(!isReversedArray) }
                                       name='OtherPagesFilterUpdateS'
                                       className={ isReversedArray ? 'other__pages__icon__reversed' : 'other__pages__icon' }
                                    />
                                    <Text
                                       inner='Updated'
                                       type={ types.mediumLarge }
                                       size={ sizes.small }
                                    />
                                 </div>
                              </th>
                              <th />
                           </tr>
                        </thead>
                        <tbody>
                           {reversedContent().map(([e]) => {
                              const item = pageData[e.page_type];
                              return (
                                 <tr onClick={ () => openItem(e.page_type) }>
                                    <td>
                                       <div className='other__pages__content__table__template'>
                                          <img src={ getImageSrc(e.page_type, e.other_page_theme_name) } alt='' />
                                          <Text
                                             type={ types.regularDefault }
                                             size={ sizes.small }
                                             inner={ item.name }
                                          />
                                       </div>
                                    </td>
                                    <td>
                                       <Text
                                          inner={ moment(e.updated_at).format('MMMM DD, YYYY hh:mm A') }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    </td>
                                    <td>
                                       <div className='other__pages__content__table__actions'>
                                          <IconButton
                                             name='AffiliateEditM'
                                          />
                                          <IconButton
                                             onClick={ (event) => openPreview(event, item.url) }
                                             name='EyeCommentM'
                                             color='#131F1E'
                                          />
                                       </div>
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               )
            }
         </div>
      </div>
   );
};

OtherPagesView.propTypes = {
   data: PropTypes.object,
   openItem: PropTypes.func,
   isReversedArray: PropTypes.bool,
   setIsReversedArray: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default OtherPagesView;
