import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import { File } from 'views/pages/Affiliate/OfferUploadItem';
import { apiUrl } from 'api';

const LeftTop = ({ image, name, linksCount }) => {
   return (
      <div className='left__top'>
         <div className='left__top__image_wrapper'>
            <img src={ image } alt='' />
         </div>
         <div className='left__top__text'>
            <Text
               inner={ name }
               type={ types.regular148 }
               size={ sizes.medium }
            />
            <TextWithIcon
               iconName='LinkAffiliateL'
               inner={ linksCount }
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div>
      </div>
   );
};

const LeftUrl = ({ url, label }) => {
   return (
      <div className='left__url'>
         <Text
            inner={ label }
            type={ types.regularDefault }
            size={ sizes.small }
         />
         <div className='left__url__bottom'>
            <Input
               value={ url }
               disabled={ true }
               isHaveCopyButton={ true }
            />
            <Button
               theme={ themes.secondary }
               text='Visit Url'
               onClick={ () => window.open(url, '_blank') }
            />
         </div>
      </div>
   );
};

const LeftUrls = ({
   schoolRoomLink, checkoutLink, landingLink, id, offer, isFree
}) => {
   const productUrl = () => {
      if (offer.courses?.length > 1) {
         return `${ apiUrl }/portal/bundle?selectedOffer=${ id }`;
      } if (offer.courses?.length === 1 && offer.courses[0] && offer.courses[0].type === '0') {
         return `${ apiUrl }/programs/${ offer.courses[0].url }`;
      } if (offer.courses?.length === 1 && offer.courses[0] && offer.courses[0].type === '1') {
         return `${ apiUrl }/portal/membership`;
      } if (offer.courses?.length === 1 && offer.courses[0] && offer.courses[0].type === '2') {
         return `${ apiUrl }/portal/community/${ offer.courses[0].community_id }`;
      }
   };
   return (
      <div className='left__urls'>
         <Text
            inner='Accessible links'
            type={ types.medium150 }
            size={ sizes.medium }
         />
         {schoolRoomLink && (
            <LeftUrl
               label='Portal Link'
               url={ schoolRoomLink }
            />
         )}
         {!isFree && checkoutLink && (
            <LeftUrl
               label='Checkout Page'
               url={ checkoutLink }
            />
         )}
         {landingLink && (
            <LeftUrl
               label='Landing Page'
               url={ landingLink }
            />
         )}
         <LeftUrl
            label='Offers Page'
            url={ productUrl() }
         />
      </div>
   );
};


const AffiliateProductItem = ({
   promotions, documents, offer, checkoutUrl, affiliate, affiliateProgramId, isFree
}) => {
   const [isOpenPromotions, setIsOpenPromotions] = React.useState(false);
   const [isOpenDocuments, setIsOpenDocuments] = React.useState(false);
   const getLinksCount = () => {
      let count = 0;
      // if (offer.links.landing_page_url) {
      //    count++;
      // }
      // if (offer.links.school_room_page_url) {
      //    count++;
      // }
      if (offer.links.checkout_page_url) {
         count++;
      }
      return count;
   };

   const promotionFilesCount = promotions.filter((e) => e.file.extension !== undefined);
   const documentsFilesCount = documents.filter((e) => e.file.extension !== undefined);

   const getPromotions = () => {
      if (isOpenPromotions) {
         return promotions;
      }
      return promotions.slice(0, 3);
   };

   const getDocuments = () => {
      if (isOpenDocuments) {
         return documents;
      }
      return documents.slice(0, 3);
   };

   const downloadAllZip = (isPromotion) => {
      const url = `${ apiUrl }/api/v1/front/affiliates/download-zip/${ affiliateProgramId }?is_material=${ isPromotion ? 1 : 0 }`;
      window.open(url, '_blank');
   };

   return (
      <div className='affiliate__product__item'>
         <div className='affiliate__product__item__left'>
            <LeftTop
               image={ offer.image }
               name={ offer.name }
               linksCount={ getLinksCount() }
            />
            <LeftUrls
               // schoolRoomLink={ offer.links.school_room_page_url }
               // landingLink={ offer.links.landing_page_url }
               isFree={ isFree }
               offer={ offer }
               id={ offer.id }
               checkoutLink={ `${ checkoutUrl }/checkout/${ offer.links.checkout_page_url }/${ affiliate.checkout_page_url }` }
            />
         </div>
         <div className='affiliate__product__item__divider' />
         <div className='affiliate__product__item__right'>
            <div className='affiliate__product__item__right__promotions'>
               <div className='top'>
                  <Text
                     inner='Promotional materials'
                     miniText={ promotions.length }
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  {promotionFilesCount.length > 0 && (
                     <TextWithIcon
                        type={ types.regularDefaultSmall }
                        size={ sizes.small }
                        iconName='DownloadDocumentAffiliateM'
                        isIconRight={ false }
                        inner='Download all in zip format'
                        onClick={ () => downloadAllZip(true) }
                        style={ {
                           cursor: 'pointer',
                           color: '#24554E',
                        } }
                     />
                  )}
               </div>
               <div className='content'>
                  {getPromotions().map(media => {
                     return (
                        <File
                           key={ media.id }
                           type={ media.file.extension !== undefined ? 'document' : 'url' }
                           data={ media.file }
                        />
                     );
                  })}
               </div>
               {promotions.length > 3 && (
                  <Text
                     inner={ `${ isOpenPromotions ? 'Hide' : 'Show' } All Promotional Materials` }
                     type={ types.regularDefaultSmall }
                     size={ sizes.small }
                     onClick={ () => setIsOpenPromotions(!isOpenPromotions) }
                     style={ {
                        marginTop: '8px',
                        cursor: 'pointer',
                        color: '#24554E',
                        textAlign: 'center',
                     } }
                  />
               )}
            </div>
            <div className='affiliate__product__item__right__promotions' style={ { border: 'none' } }>
               <div className='top'>
                  <Text
                     inner='Documents'
                     miniText={ promotions.length }
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
                  {documentsFilesCount.length > 0 && (
                     <TextWithIcon
                        type={ types.regularDefaultSmall }
                        size={ sizes.small }
                        onClick={ () => downloadAllZip(false) }
                        iconName='DownloadDocumentAffiliateM'
                        isIconRight={ false }
                        inner='Download all in zip format'
                        style={ {
                           cursor: 'pointer',
                           color: '#24554E',
                        } }
                     />
                  )}
               </div>
               <div className='content'>
                  {getDocuments().map(media => {
                     return (
                        <File
                           key={ media.id }
                           type={ media.file.extension !== undefined ? 'document' : 'url' }
                           data={ media.file }
                        />
                     );
                  })}
               </div>
               {promotions.length > 3 && (
                  <Text
                     inner={ `${ isOpenDocuments ? 'Hide' : 'Show' } All Documents` }
                     type={ types.regularDefaultSmall }
                     size={ sizes.small }
                     onClick={ () => setIsOpenDocuments(!isOpenDocuments) }
                     style={ {
                        marginTop: '8px',
                        cursor: 'pointer',
                        color: '#24554E',
                        textAlign: 'center',
                     } }
                  />
               )}
            </div>
         </div>
      </div>
   );
};

AffiliateProductItem.propTypes = {
   offer: PropTypes.object,
   promotions: PropTypes.array,
   checkoutUrl: PropTypes.string,
   documents: PropTypes.array,
   affiliate: PropTypes.object,
   affiliateProgramId: PropTypes.number,
   isFree: PropTypes.bool,
};

LeftTop.propTypes = {
   image: PropTypes.string,
   name: PropTypes.string,
   linksCount: PropTypes.number,
};

LeftUrl.propTypes = {
   url: PropTypes.string,
   label: PropTypes.string,
};

LeftUrls.propTypes = {
   schoolRoomLink: PropTypes.string,
   checkoutLink: PropTypes.string,
   landingLink: PropTypes.string,
   id: PropTypes.number,
   offer: PropTypes.object,
   isFree: PropTypes.bool,
};

export default AffiliateProductItem;
