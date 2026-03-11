import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import Axios from 'axios';
import getCurrencySumbol from 'utils/getCurrencySymbol';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import OfferEditorButton from 'views/pages/Offers/components/Editor/Button';
import SearchText from 'components/elements/searchText';
import SimpleStatus from 'components/elements/SimpleStatus';
import Line from 'components/elements/Line';
import moment from 'moment';
import './index.scss';

const SavedOfferTemplate = ({
   offer, onExplore, handleFavorite,
}) => {
   const [currencyData, setCurrencyData] = useState(1);
   const [price, setPrice] = useState(0);
   const [isFavorite, setIsFavorite] = React.useState(true);
   const betweenDate = Math.floor(moment(offer.created_at).diff(moment(), 'days', true));
   const isFreeOffer = () => {
      return offer.pricings.length === 1 && offer.pricings.some((e) => e.pricing_type === 0);
   };
   const isFreeOfferPrice = () => {
      return offer.pricings.some((e) => e.pricing_type === 0);
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


   return (
      <div
         role='presentation'
         className='offer__card'
         style={ { background: '#fff' } }
      >
         <div className='offer__card__top'>
            <div className='offer__card__top__header'>
               {betweenDate > -7 ? (
                  <SimpleStatus
                     color='new'
                     text='New Offer'
                  />
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
            <div className='offer__card__top__favorite'>
               {isFavorite ? (
                  <div className='offer__card__button' role='presentation' onClick={ () => { handleFavorite(offer.id); setIsFavorite(false); } }>
                     <IconNew
                        name='SchoolRoomHeartSActive'
                     />
                  </div>
               ) : (
                  <div className='offer__card__button' role='presentation' onClick={ () => { handleFavorite(offer.id); setIsFavorite(true); } }>
                     <IconNew
                        name='SchoolRoomHeartS'
                     />
                  </div>
               )}
            </div>
            <img src={ offer.file ? offer.file.src : 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png' } alt='' />
         </div>
         <div className='offer__card__info'>

            <SearchText
               textProps={ {
                  color: '#131F1E', inner: offer.name, type: types.medium153, size: sizes.large,
               } }
               searchText=''
               activeColor='rgb( 0, 176, 255,0.2)'
            />
            <Text
               inner={ offer.description || '' }
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
            />
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
            <OfferEditorButton
               bgColor='var(--secondaryButtonBgcolor)'
               borderColor='var(--secondaryTextColor)'
               textColor='var(--secondaryTextColor)'
               fontSize={ 14 }
               onClick={ () => onExplore(offer.id) }
            >
               <IconNew name='SchoolRoomExploreM' color='var(--secondaryTextColor)' />
               Explore
            </OfferEditorButton>
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

SavedOfferTemplate.propTypes = {
   offer: PropTypes.object,
   handleFavorite: PropTypes.func,
   onExplore: PropTypes.func,
};

export default SavedOfferTemplate;
