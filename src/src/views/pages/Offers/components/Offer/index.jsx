/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
// import Axios from 'axios';
import getCurrencySumbol from 'utils/getCurrencySymbol';
// import SimpleStatus from 'components/elements/SimpleStatus';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Line from 'components/elements/Line';
import moment from 'moment';
import classNames from 'classnames';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import { getLandingUrl } from 'utils/url';
import { OfferContext } from 'containers/pages/mixed/offers';
import SearchText from 'components/elements/searchText';
import SliceAndConnectText from 'utils/getSplitedText';
import OfferEditorButton from '../Editor/Button';

const Offer = ({
   offer, onExplore, goToCheckout, handleFavorite, slug, item, searchText, user,
}) => {
   const betweenDate = Math.floor(moment(offer.created_at).diff(moment(), 'days', true));
   const [currencyData, setCurrencyData] = useState(1);
   const [price, setPrice] = useState(0);
   const {
      isEditor, onClickElement, isPreview, checkIsFavorite,
   } = React.useContext(OfferContext);
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
         className={
            classNames({
               'offer__card': !active || !isEditor,
               'offer__card mark': active && isEditor,
            })

         }
         style={ { background } }
         onClick={ (e) => onClickElement(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <div className='offer__card__top'>
            <div className='offer__card__top__header'>
               {betweenDate > -7 ? (
                  <div
                     className='offer-status'
                     style={ {
                        border: '1px solid var(--buttonBgcolor)',
                     } }
                  >
                     <span
                        style={ {
                           color: 'var(--buttonBgcolor)',
                        } }
                     >New Offer
                     </span>
                  </div>
               ) : (
                  <div />
               )}
               <div className='offer__card__top__header__right'>
                  {isFreeOffer() ? (
                     <div className='offer__card__free__button'>
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
                     <div className='offer__card__button'>
                        <IconNew
                           name='SchoolRoomProductLockedM'
                        />
                     </div>
                  )}
                  <div className='offer__card__button'>
                     <TextWithIcon
                        iconName='SchoolRoomProductsM'
                        style={ { color: '#fff' } }
                        inner={ offer.published_count }
                        type={ types.medium140 }
                        size={ sizes.xx_small }
                     />
                  </div>
               </div>
            </div>
            {!!user && (
               <div className='offer__card__top__favorite'>
                  <div className='offer__card__button' role='presentation' onClick={ () => handleFavorite(offer.id) }>
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
            )}
            <img src={ offer.file ? offer.file.src : 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png' } alt='' />
         </div>
         <div className='offer__card__info'>

            <SearchText
               textProps={ {
                  color: titleColor, inner: SliceAndConnectText(offer.name, 20), type: types.medium153, size: sizes.large,
               } }
               tooltip={ offer.name }
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
            <div className='offer__card__info__price'>
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
         <Line />
         <div className='offer__card__buttons'>
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
                        textColor='var(--textColor)'
                        fontSize={ offerPrimaryButton.fontSize }
                        onClick={ isEditor || isPreview ? () => {} : () => handleBuy() }
                     >
                        Buy Product
                     </OfferEditorButton>
                  )}
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
               </>
            )}
            {/* If Plan is not free */}
            {/* <OfferEditorButton
               bgColor='#7B53E9'
               borderColor='#7B53E9'
               textColor='#fff'
               onClick={ () => alert('incoming') }
            >
                Buy Product
            </OfferEditorButton>
            <OfferEditorButton
               bgColor='#fff'
               borderColor='#7B53E9'
               textColor='#7B53E9'
               onClick={ () => alert('incoming') }
            >
               <IconNew name='SchoolRoomExploreM' />
                Explore
            </OfferEditorButton> */}
            {/* If Plan Free */}

         </div>
      </div>
   );
};

Offer.propTypes = {
   offer: PropTypes.object,
   slug: PropTypes.string,
   handleFavorite: PropTypes.func,
   item: PropTypes.object,
   goToCheckout: PropTypes.func,
   searchText: PropTypes.string,
   onExplore: PropTypes.func,
   user: PropTypes.object,
};

export default Offer;
