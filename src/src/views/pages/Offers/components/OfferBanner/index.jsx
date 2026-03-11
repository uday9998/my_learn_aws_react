import React from 'react';
import { OfferContext } from 'containers/pages/mixed/offers';
import './index.scss';
// import { BreadCrumb } from 'components/modules/breadcrumbs';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import { getLandingUrl } from 'utils/url';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import OfferEditorButton from '../Editor/Button';

const OfferBanner = () => {
   const {
      selectedOffer, goBackToOffers, uuid, checkIsFavorite, handleFavorite, user,
   } = React.useContext(OfferContext);
   // const breadcrumbsLinks = [
   //    { text: 'Portal', goTo: () => goBackToOffers() },
   //    { text: selectedOffer.plan.name, goTo: () => {} },
   // ];

   const goToCheckout = () => {
      const plan = selectedOffer.plan;
      let url = `${ process.env.REACT_APP_CHECKOUT_URL }${ plan.checkout_url?.url || uuid }/0/${ plan.id }`;
      if (user && user.id) {
         url = `${ process.env.REACT_APP_CHECKOUT_URL }${ plan.checkout_url?.url || uuid }/${ user.id }/${ plan.id }`;
      }
      if (plan.test_mode) {
         url = `${ process.env.REACT_APP_CHECKOUT_URL }test_mode/${ plan.test_mode.token }/${ uuid }/0/${ plan.id }`;
      }
      window.open(url, '_blank');
   };

   const handleBuy = () => {
      if (selectedOffer.plan.active_landing_url) {
         const url = getLandingUrl(selectedOffer.plan.active_landing_url);
         window.open(url, '_blank');
         return;
      }
      goToCheckout();
   };
   const { isMobile } = useWindowSizeChange();
   return (
      <div className='offer__banner'>
         <div className='offer__banner__container'>
            {/* <BreadCrumb
               links={ breadcrumbsLinks }
            /> */}
            <div className='offer__banner__content'>
               <div className='offer__banner__content__left'>
                  <Text
                     inner={ selectedOffer.plan.name }
                     type={ types.bold133 }
                     size={ sizes.size_40 }
                     className='offer__banner__title'
                     style={ { color: '#fff' } }
                  />
                  {selectedOffer.plan.description && (
                     <Text
                        inner={ selectedOffer.plan.description }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#fff' } }
                     />
                  )}
                  {isMobile && (
                     <div className='offer__banner__content__right'>
                        <img src={ selectedOffer.plan.file ? selectedOffer.plan.file.src : '' } alt='' />
                     </div>
                  )}
                  <div className='offer__banner__content__left__items'>
                     <div className='offer__banner__content__left__item'>
                        <IconNew name='SchoolRoomProductsS' />
                        <Text
                           inner={ `${ selectedOffer.courses_count } Products` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#E8F2F1' } }
                        />
                     </div>
                     <div className='offer__banner__content__left__item'>
                        <IconNew name='SchoolRoomLessonsS' />
                        <Text
                           inner={ `${ selectedOffer.lessons_count } Lessons` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#E8F2F1' } }
                        />
                     </div>
                  </div>
                  <div className='offer__banner__content__left__buttons'>
                     {!(selectedOffer.isFree && selectedOffer.plan.pricings.length === 1)
                     && !selectedOffer.joined && !selectedOffer.plan.publish_without_integrations
                     && !selectedOffer.plan.joined && (
                        <OfferEditorButton
                           bgColor={ 'var(--buttonBgcolor)' || '#7B53E9' }
                           borderColor={ 'var(--buttonBgcolor)' || '#7B53E9' }
                           fontSize='14px'
                           textColor={ 'var(--textColor)' || '#fff' }
                           onClick={ () => handleBuy() }
                        >
                           Buy Product
                        </OfferEditorButton>
                     )}
                     { !!user
                     && (
                        <div className='offer__banner__content__left__button' role='presentation' onClick={ () => handleFavorite(selectedOffer.plan.id) }>
                           {!checkIsFavorite(selectedOffer.plan.id) ? (
                              <IconNew
                                 name='SchoolRoomHeartS'
                              />
                           ) : (
                              <IconNew
                                 name='SchoolRoomHeartSActive'
                              />
                           )}
                        </div>
                     )}
                  </div>
               </div>
               {!isMobile && (
                  <div className='offer__banner__content__right'>
                     <img src={ selectedOffer.plan.file ? selectedOffer.plan.file.src : '' } alt='' />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

OfferBanner.propTypes = {

};

export default OfferBanner;
