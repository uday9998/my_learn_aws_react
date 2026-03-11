import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import Icon from 'components/elements/Icon';
// import IconNew from 'components/elements/iconsSize';
// import OfferSlider from 'components/elements/SwipeToSlide';
import NotFound from 'views/pages/Offers/components/NotFound';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { isArray } from 'utils/isArray';
import OfferCard from '../../OfferCard';
import './index.scss';


const SingleCategory = ({
   category,
   schoolRoomSettings,
   contentItem,
   isEditor,
   usdCurrency,
   handleBuyOffer,
   closeEditor,
   user,
   handleFavorite,
   checkIsFavorite,
   mainBackgroundColor,
   exploreOffer,
   categorySearch,
   loadingData,
   setSingleCategory,
   isPlaylistFrontPage,
   setSinglePlaylist,
   exploreCourse,
   membershipOffer,
}) => {
   const isPlaylist = category.blocks;
   let coursesOrOffers = category.lessons || category.blocks || [];
   if (!isPlaylist) {
      coursesOrOffers = isArray(coursesOrOffers);
   }
   if (isPlaylist) {
      coursesOrOffers.sort((a, b) => a.order - b.order);
   }

   const getCardImage = (offer) => {
      let imgSrc = 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png';
      if (offer.communities && offer.communities.file_id) {
         imgSrc = offer.communities.file_id;
      } else if (offer.file && offer.file.src) {
         imgSrc = offer.file.src;
      } else if (offer.thumbnail_image && !offer.thumbnail_image.includes('images/defaults/thumbnail.png')) {
         imgSrc = offer.thumbnail_image;
      } else if (offer.community_image && !offer.community_image.includes('images/defaults/thumbnail.png')) {
         imgSrc = offer.community_image;
      }
      return imgSrc;
   };

   return (
      <div
         className={ `offers__category__item__flex ${ schoolRoomSettings.school_room_theme_name }` }
      >
         <div className='category__header'>
            <Text
               inner={ `Videos (${ coursesOrOffers.length })` }
               type={ types.mediumSmall }
               size={ sizes.xxlarge }
               className='offers__category__item__name'
            />
         </div>
         {
            loadingData && <div className='offers__category__loader'><LoaderSpinner isPlayList={ true } /></div>
         }
         {((categorySearch.length > 0 && !coursesOrOffers.length)) && (
            <NotFound searchText={ categorySearch.search } />
         )}
         <div
            className={ `offer__cards__list categoryCard ${ schoolRoomSettings.school_room_theme_name === 'template3' ? 'template3__category' : 'template1' }` }
         >
            { coursesOrOffers.map((offer) => {
               const playlistVideoName = isPlaylist && offer.lesson_name?.length > 20 ? `${ offer.lesson_name?.slice(0, 34) }...` : offer.lesson_name;
               return (
                  <OfferCard
                     key={ offer.id }
                     item={ contentItem }
                     image={ getCardImage(offer) }
                     name={ isPlaylist ? playlistVideoName : offer.name }
                     priceBlockBackground={ mainBackgroundColor }
                     offer={ { ...offer, course_url: category.course_url || offer.course_url } }
                     usdCurrency={ usdCurrency }
                     isEditor={ isEditor }
                     onExplore={ (id) => exploreOffer(id) }
                     handleBuyOffer={ handleBuyOffer }
                     schoolRoomThemeName={ schoolRoomSettings.school_room_theme_name }
                     template={ schoolRoomSettings.css.offer_card_liquid.content }
                     closeEditor={ closeEditor }
                     user={ user }
                     handleFavorite={ handleFavorite }
                     checkIsFavorite={ checkIsFavorite }
                     joined={ category.joined }
                     type='membership'
                     isCategoryFrontPage={ true }
                     category={ category }
                     setSingleCategory={ setSingleCategory }
                     isPlaylistFrontPage={ isPlaylistFrontPage }
                     setSinglePlaylist={ setSinglePlaylist }
                     exploreCourse={ exploreCourse }
                     membershipOffer={ membershipOffer }
                  />
               );
            })}
         </div>
      </div>
   );
};

SingleCategory.propTypes = {
   category: PropTypes.array,
   schoolRoomSettings: PropTypes.object,
   usdCurrency: PropTypes.object,
   isEditor: PropTypes.bool,
   handleBuyOffer: PropTypes.func,
   closeEditor: PropTypes.bool,
   user: PropTypes.object,
   handleFavorite: PropTypes.func,
   checkIsFavorite: PropTypes.func,
   contentItem: PropTypes.object,
   mainBackgroundColor: PropTypes.string,
   exploreOffer: PropTypes.func,
   categorySearch: PropTypes.string,
   loadingData: PropTypes.bool,
   setSingleCategory: PropTypes.func,
   isPlaylistFrontPage: PropTypes.bool,
   setSinglePlaylist: PropTypes.func,
   exploreCourse: PropTypes.func,
   membershipOffer: PropTypes.object,
};

export default SingleCategory;
