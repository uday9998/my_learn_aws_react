import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import Icon from 'components/elements/Icon';
import IconNew from 'components/elements/iconsSize';
import OfferSlider from 'components/elements/SwipeToSlide';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import OfferCard from '../../../OfferCard';

const Category = ({
   category,
   handleSeeAll,
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
   seeAll,
   handleBack,
   type,
   setSingleCategory,
   setSinglePlaylist,
   viewMode,
   exploreCourse,
   membershipOffer,
}) => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
   const [templateName, setTemplateName] = useState('');
   const siteInfo = useSelector(siteInfoSelector);

   useEffect(() => {
      const templateName = localStorage.getItem('templateName');

      if (templateName && (window.location.pathname.includes('admin') || window.location.pathname.includes('temp-portal'))) {
         setTemplateName(templateName);
      }

      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   let coursesOrOffers = category.offers || [];
   if (type === 'membership' && category.lessons) {
      coursesOrOffers = category.lessons;
   } else if (category.courses) {
      coursesOrOffers = category.courses || [];
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

   const findedTemplate = templateName ? siteInfo.all_school_room.find(template => template.school_room_theme_name === templateName)?.css.offer_card_liquid.content : null;
   return (
      <div
         className={ `offers__category__item__flex ${ templateName || schoolRoomSettings.school_room_theme_name }` }
      >
         <div className='category__header'>
            <Text
               inner={ category.name }
               type={ types.mediumSmall }
               size={ sizes.xxlarge }
               className='offers__category__item__name'
               onClick={ type === 'membership' ? () => { handleSeeAll(category); } : null }
               style={ type === 'membership' ? {
                  cursor: 'pointer',
                  color: 'var(--textColor)',
               } : { color: 'var(--textColor)' } }
            />
            {
               seeAll ? (
                  <IconNew
                     // size={ sizes.small14_500 }
                     style={ {
                        cursor: 'pointer',
                     } }
                     onClick={ handleBack }
                     // iconColor='#fff'
                     name='LeftArrowL'
                     color='var(--textColor)'
                  />
               ) : (
                  category.courses_count > 4 && (
                     <Text
                        inner='See All'
                        size={ sizes.small14_500 }
                        style={ {
                           cursor: 'pointer', color: 'var(--textColor)',
                        } }
                        onClick={ () => handleSeeAll(category) }
                        className='offers__category__item__name'
                     />
                  )

               )
            }
            {type === 'membership' && coursesOrOffers.length > 3 && (
               <Text
                  inner='See All'
                  size={ sizes.small14_500 }
                  style={ {
                     cursor: 'pointer', color: 'var(--textColor)',
                  } }
                  onClick={ () => { handleSeeAll(category); } }
                  className='offers__category__item__name'
               />
            )}
         </div>
         { ((schoolRoomSettings.school_room_theme_name !== 'template3' && !isMobile && !templateName) || (templateName && templateName !== 'template3')) && !seeAll ? (
            <div
               className={ `${ templateName || schoolRoomSettings.school_room_theme_name }` }
            >
               <OfferSlider
                  courses={ coursesOrOffers }
                  templateType={ templateName || schoolRoomSettings.school_room_theme_name }
                  textColor='#fff'
                  darkMode={ true }
                  courseCategoryColor='var(--memberButtonBgcolor)'
                  viewMode={ viewMode || 'desktop' }
               >
                  { coursesOrOffers.map((offer) => {
                     if (offer.community_member_data && offer.community_member_data.is_banned === 1) {
                        return null;
                     }
                     return (
                        <OfferCard
                           key={ offer.id }
                           item={ contentItem }
                           image={ getCardImage(offer) }
                           name={ offer.name }
                           priceBlockBackground={ mainBackgroundColor }
                           offer={ offer }
                           usdCurrency={ usdCurrency }
                           isEditor={ isEditor }
                           onExplore={ (id) => exploreOffer(id) }
                           handleBuyOffer={ handleBuyOffer }
                           schoolRoomThemeName={ templateName || schoolRoomSettings.school_room_theme_name }
                           template={ findedTemplate || schoolRoomSettings.css.offer_card_liquid.content }
                           closeEditor={ closeEditor }
                           user={ user }
                           handleFavorite={ handleFavorite }
                           checkIsFavorite={ checkIsFavorite }
                           joined={ offer.joined }
                           type={ type }
                           category={ category }
                           setSingleCategory={ setSingleCategory }
                           setSinglePlaylist={ setSinglePlaylist }
                           exploreCourse={ exploreCourse }
                           membershipOffer={ membershipOffer }
                        />
                     );
                  })}
               </OfferSlider>
            </div>
         ) : (
            <div className={ `${ (templateName === 'template2' || schoolRoomSettings.school_room_theme_name === 'template2') && !window.location.pathname.includes('temp-portal') ? 'cateogry__cards__wrapper' : '' }` }>
               {
                  coursesOrOffers.map(offer => {
                     if (offer.community_member_data && offer.community_member_data.is_banned === 1) {
                        return null;
                     }
                     return (
                        <OfferCard
                           key={ offer.id }
                           item={ contentItem }
                           image={ getCardImage(offer) }
                           name={ offer.name }
                           priceBlockBackground={ mainBackgroundColor }
                           offer={ offer }
                           usdCurrency={ usdCurrency }
                           isEditor={ isEditor }
                           onExplore={ (id) => exploreOffer(id) }
                           handleBuyOffer={ handleBuyOffer }
                           schoolRoomThemeName={ templateName || schoolRoomSettings.school_room_theme_name }
                           template={ findedTemplate || schoolRoomSettings.css.offer_card_liquid.content }
                           closeEditor={ closeEditor }
                           user={ user }
                           handleFavorite={ handleFavorite }
                           checkIsFavorite={ checkIsFavorite }
                           joined={ offer.joined }
                           type={ type }
                           category={ category }
                           setSingleCategory={ setSingleCategory }
                           setSinglePlaylist={ setSinglePlaylist }
                           exploreCourse={ exploreCourse }
                           membershipOffer={ membershipOffer }
                        />
                     );
                  })
               }
            </div>
         ) }
         { ((schoolRoomSettings.school_room_theme_name === 'template2' && isMobile)) || ((schoolRoomSettings.school_room_theme_name === 'template3' && templateName === 'template3')) || (window.location.pathname.includes('temp-portal') && templateName !== 'template2' && templateName !== 'template1') || (!templateName && window.location.pathname.includes('portal/onlinecourse') && schoolRoomSettings.school_room_theme_name !== 'template2') ? (
            <div
               className={ `offer__cards__list ${ templateName || schoolRoomSettings.school_room_theme_name }` }
            >
               { coursesOrOffers.map((offer) => {
                  if (offer.community_member_data && offer.community_member_data.is_banned === 1) {
                     return null;
                  }
                  return (
                     <OfferCard
                        key={ offer.id }
                        item={ contentItem }
                        image={ getCardImage(offer) }
                        name={ offer.name }
                        priceBlockBackground={ mainBackgroundColor }
                        offer={ offer }
                        usdCurrency={ usdCurrency }
                        isEditor={ isEditor }
                        onExplore={ (id) => exploreOffer(id) }
                        handleBuyOffer={ handleBuyOffer }
                        schoolRoomThemeName={ templateName || schoolRoomSettings.school_room_theme_name }
                        template={ findedTemplate || schoolRoomSettings.css.offer_card_liquid.content }
                        closeEditor={ closeEditor }
                        user={ user }
                        handleFavorite={ handleFavorite }
                        checkIsFavorite={ checkIsFavorite }
                        joined={ offer.joined }
                        type={ type }
                        category={ category }
                        setSingleCategory={ setSingleCategory }
                        setSinglePlaylist={ setSinglePlaylist }
                        membershipOffer={ membershipOffer }
                        exploreCourse={ exploreCourse }
                     />
                  );
               })}
            </div>
         ) : null}
      </div>
   );
};

Category.propTypes = {
   category: PropTypes.array,
   handleSeeAll: PropTypes.func,
   schoolRoomSettings: PropTypes.object,
   name: PropTypes.string,
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
   seeAll: PropTypes.bool,
   handleBack: PropTypes.func,
   type: PropTypes.string,
   setSingleCategory: PropTypes.func,
   setSinglePlaylist: PropTypes.func,
   viewMode: PropTypes.string,
   exploreCourse: PropTypes.func,
   membershipOffer: PropTypes.object,
};

export default Category;
