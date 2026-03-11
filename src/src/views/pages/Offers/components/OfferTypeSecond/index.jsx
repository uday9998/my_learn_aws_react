/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
// import Axios from 'axios';
import getCurrencySumbol from 'utils/getCurrencySymbol';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import IconNew from 'components/elements/iconsSize';
import { OfferContext } from 'containers/pages/mixed/offers';
import moment from 'moment';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import SearchText from 'components/elements/searchText';
import { getLandingUrl } from 'utils/url';
// import Rater from 'react-rater';
import OfferEditorButton from '../Editor/Button';
import 'react-rater/lib/react-rater.css';

const OfferTypeSecond = ({
   offer, slug, item, handleFavorite, goToCheckout, onExplore, searchText, user,
}) => {
   const [currencyData, setCurrencyData] = useState(1);
   const [price, setPrice] = useState(0);
   const betweenDate = Math.floor(moment(offer.created_at).diff(moment(), 'days', true));
   const isFreeOffer = () => {
      return offer.pricings.length === 1 && offer.pricings.some((e) => e.pricing_type === 0);
   };
   const isFreeOfferPrice = () => {
      return offer.pricings.some((e) => e.pricing_type === 0);
   };
   const [active, setActive] = React.useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   // useEffect(() => {
   //    Axios.get(
   //       'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
   //       .then(({ data: res }) => {
   //          setCurrencyData(res.usd);
   //       });
   // }, []);

   // const getPriceOffer = () => {
   //    if (offer.pricings.length === 1) {
   //       return offer.pricings[0].price;
   //    }
   //    return offer.pricings[0].price;
   // };


   const getPriceOffer = () => {
      const all = offer.pricings.map((e) => {
         if (e.currency === 'USD' || e.price === 0) {
            return {
               price: e.price,
               realPrice: e.price,
               currencyData: e.currency,
            };
         }
         return {
            price: e.price,
            realPrice: e.price,
            currencyData: e.currency,
         };
      });


      const sortedPrice = all.sort((a, b) => (parseFloat(a.price) - parseFloat(b.price)));
      return sortedPrice && sortedPrice[0];
   };

   useEffect(() => {
      if (currencyData) {
         setPrice({ price: getPriceOffer().realPrice, currency: getPriceOffer().currencyData });
      }
   }, [currencyData]);


   const {
      isEditor, onClickElement, isPreview, checkIsFavorite,
   } = React.useContext(OfferContext);
   const titleColor = item.subcomponent[0].props.color;
   const background = item.props.bgColor;
   const offerDescription = item.subcomponent[1].props;
   const offerPrimaryButton = item.subcomponent[2].props;
   const offerSecondaryButton = item.subcomponent[3].props;
   const handleBuy = () => {
      if (offer.active_landing_url) {
         const url = getLandingUrl(offer.active_landing_url);
         window.open(url, '_blank');
         return;
      }
      goToCheckout();
   };
   return (
      <div
         role='presentation'
         style={ { background } }
         className={
            classNames({
               'offer__type__second': !active || !isEditor,
               'offer__type__second mark': active && isEditor,
            })

         }
         onClick={ (e) => onClickElement(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <div className='offer__type__second__left'>
            <div className='offer__type__second__left__top'>
               {betweenDate > -7 ? (
                  <SimpleStatus
                     color='new'
                     text='New Offer'
                  />
               ) : (
                  <div />
               )}
               <div className='right'>
                  {isFreeOffer() ? (
                     <div className='offer__type__second__free__button'>
                        <TextWithIcon
                           iconName='SchoolRoomUnlockedS'
                           iconGap={ 9 }
                           inner='Free'
                           type={ types.medium140 }
                           style={ { color: '#fff' } }
                           size={ sizes.xx_small }
                        />
                     </div>
                  ) : (
                     <div className='offer__type__second__button'>
                        <IconNew
                           name='SchoolRoomProductLockedM'
                        />
                     </div>
                  )}


                  <div className='offer__type__second__button'>
                     <TextWithIcon
                        iconName='SchoolRoomProductsM'
                        style={ { color: '#fff' } }
                        inner={ offer.pricings.length }
                        type={ types.medium140 }
                        size={ sizes.xx_small }
                     />
                  </div>
               </div>
            </div>
            {!!user
            && (
               <div className='offer__type__second__left__bottom'>
                  <div className='offer__type__second__button' role='presentation' onClick={ () => handleFavorite(offer.id) }>
                     {!checkIsFavorite(offer.id) ? (
                        <IconNew
                           name='SchoolRoomHeartS'
                        />
                     ) : (
                        <IconNew
                           name='SchoolRoomHeartSActive'
                        />
                     )}
                  </div>
               </div>
            ) }
            <img src={ offer.file ? offer.file.src : 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png' } alt='' />
         </div>
         <div className='offer__type__second__right'>
            <div className='data'>
               <div className='data__top'>

                  <SearchText
                     textProps={ {
                        color: titleColor, inner: offer.name, type: types.medium153, size: sizes.large,
                     } }
                     searchText={ searchText || '' }
                     activeColor='rgb( 0, 176, 255,0.2)'
                  />
                  {offerDescription.visibility && (
                     <Text
                        inner={ offer.description || '' }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: offerDescription.color } }
                     />
                  )}
               </div>
               {/* <div className='data__user'>
                  <Text
                     inner={ site.title }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div> */}
               {/* <div>
                  <Rater rating={ 2 } total={ 5 } interactive={ false } />
               </div> */}
            </div>
            <div className='purchase'>
               <div className='purchase__top'>
                  {isFreeOffer() ? (
                     <OfferEditorButton
                        bgColor='var(--secondaryButtonBgcolor)'
                        borderColor='var(--secondaryTextColor)'
                        textColor='var(--secondaryTextColor)'
                        fontSize={ offerSecondaryButton.fontSize }
                        onClick={ isEditor ? () => {} : () => onExplore(offer.id) }
                     >
                        <IconNew name='SchoolRoomExploreM' color='var(--secondaryTextColor)' />
                        Explore
                     </OfferEditorButton>
                  ) : (
                     <>
                        {!offer.joined && !offer.publish_without_integrations && (
                           <OfferEditorButton
                              bgColor='var(--buttonBgcolor)'
                              borderColor='var(--buttonBgcolor)'
                              fontSize={ offerPrimaryButton.fontSize }
                              textColor='var(--textColor)'
                              onClick={ isEditor ? () => {} : () => handleBuy() }
                           >
                              Buy Product
                           </OfferEditorButton>
                        )}
                        <OfferEditorButton
                           bgColor='var(--secondaryButtonBgcolor)'
                           borderColor='var(--secondaryTextColor)'
                           fontSize={ offerSecondaryButton.fontSize }
                           textColor='var(--secondaryTextColor)'
                           onClick={ isEditor || isPreview ? () => {} : () => onExplore(offer.id) }
                        >
                           <IconNew name='SchoolRoomExploreM' color='var(--secondaryTextColor)' />
                           Explore
                        </OfferEditorButton>
                     </>
                  )}
               </div>
               <div className='purchase__price'>
                  <TextWithIcon
                     iconGap={ 4 }
                     inner={ isFreeOffer() ? 'Price:' : `${ offer.pricings.length === 1 ? 'Price:' : 'Price at:' } ` }
                     iconName={ isFreeOffer() ? 'SchoolRoomFreeM' : 'SchoolRoomPriceM' }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner={ isFreeOfferPrice() ? 'Free' : `${ getCurrencySumbol(price.currency) || '$' } ${ price.price || 0 }` }
                     type={ types.medium150 }
                     size={ sizes.medium }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

OfferTypeSecond.propTypes = {
   slug: PropTypes.string,
   offer: PropTypes.object,
   handleFavorite: PropTypes.func,
   item: PropTypes.object,
   searchText: PropTypes.string,
   goToCheckout: PropTypes.func,
   onExplore: PropTypes.func,
   user: PropTypes.object,
};

export default OfferTypeSecond;
