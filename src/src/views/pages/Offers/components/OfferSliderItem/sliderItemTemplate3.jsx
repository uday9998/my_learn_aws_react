/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { OfferContext } from 'containers/pages/mixed/offers';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import { copyToClipBoard } from 'utils/copy';
import sliderDefaultImage from 'assets/images/schoolRoom/portal-3-slider-default.png';
import LiquidRenderer from '../../liquidRenderer';

const OfferSliderItemTemplate3 = (props) => {
   const {
      picture_src: image,
      showOpacity,
      height,
      alignItems,
      justifyContent,
      offer,
      paddingBottom,
      paddingTop,
      paddingLeft,
      paddingRight,
      slug,
      user,
      titleProps,
      descriptionProps,
      buttonProps,
      secondButtonProps,
      showPrimaryButton,
      coursesCount,
      lessonsCount,
   } = props;
   const [active, setActive] = React.useState(false);
   const {
      isEditor,
      onClickElement,
      handleFavorite,
      checkIsFavorite,
      handleBuyOffer,
      schoolRoomSettings,
   } = React.useContext(OfferContext);

   const toggle = e => {
      setActive(toggleHighlighted(e, active));
   };
   const { isMobile } = useWindowSizeChange();


   const getSliderImg = (image, offer) => {
      if (image) {
         return image;
      } if (offer && offer.type === '2' && offer.communities && offer.communities.file_id) {
         return offer.communities.file_id;
      } if (offer && offer.type !== '2' && !offer.thumbnail_image.includes('thumbnail.png')) {
         return offer.thumbnail_image;
      }
      return sliderDefaultImage;
   };

   return (
      <div
         data-slug={ slug }
         id={ slug }
         onMouseOver={ toggle }
         role='presentation'
         onMouseOut={ toggle }
         onClick={ (e) => onClickElement(e) }
         className={ classNames({
            'slider__template3': true,
            'offer__slider__item': !active || !isEditor,
            'offer__slider__item mark': active && isEditor,
         }) }
         style={ {
            height: height.includes('px') ? height : '549px', 
         } }
      >
         <LiquidRenderer
            template={ schoolRoomSettings.css.banner_slider_item_liquid.content }
            data={ {
               offer,
               imageSrc: getSliderImg(image, offer),
               showOpacity,
               contentStyles: `
                  padding: ${ paddingTop }px ${ paddingRight }px ${ paddingBottom }px ${ paddingLeft }px;
                  align-items: ${ alignItems };
                  justify-content: ${ justifyContent };
               `,
               user,
               // isFavorite: checkIsFavorite(offer.id),
               favoriteButtonIconColor: secondButtonProps?.color || 'var(--offersSliderColor)',
               favoriteButtonStyles: `
                  font-size: ${ secondButtonProps?.fontSize || 14 }px;
                  background-color: ${ secondButtonProps?.bgColor || 'transparent' };
                  color: ${ secondButtonProps?.color || 'var(--offersSliderColor)' };
               `,
               // favoriteButtonText: checkIsFavorite(offer.id) ? 'Saved to Favorites' : 'Add to Favorites',
               shareButtonStyles: `
                  font-size: ${ secondButtonProps?.fontSize || 14 }px;
                  background-color: ${ secondButtonProps?.bgColor || 'transparent' };
                  color: ${ secondButtonProps?.color || 'var(--offersSliderColor)' };
               `,
               shareIconColor: secondButtonProps?.color || 'var(--offersSliderColor)',
               productsBadgeText: `${ coursesCount } ${ coursesCount > 1 ? 'Products' : 'Product' }`,
               lessonsCountBadgeText: `${ lessonsCount } ${ lessonsCount > 1 ? 'Lessons' : 'Lesson' }`,
               priceBadgeText: offer?.pricings?.some(pricing => pricing.pricing_type === 0) ? 'Free' : 'Paid',
               offerNameStyles: `
                  color: ${ titleProps?.color || 'var(--offersSliderColor)' };
                  font-size: ${ isMobile ? 20 : titleProps?.fontSize || 48 }px;
               `,
               offerDescriptionStyles: `
                  color: ${ descriptionProps?.color || 'var(--offersSliderColor)' };
                  font-size: ${ isMobile ? 12 : descriptionProps?.fontSize || 14 }px;
               `,
               showPrimaryButton,
               primaryButtonColor: buttonProps?.color || 'var(--offersSliderColor)',
               primaryButtonStyles: `
                  font-size: ${ buttonProps?.fontSize || 14 }px;
                  background-color: ${ buttonProps?.bgColor || 'var(--buttonBgcolor)' };
                  color: ${ buttonProps?.color || 'var(--offersSliderColor)' };
               `,
               primaryButtonIconColor: buttonProps?.color || 'var(--offersSliderColor)',
            } }
            actions={ {
               onClickFavorite: isEditor ? () => {} : () => handleFavorite(offer.id),
               onClickShare: isEditor ? () => {} : () => copyToClipBoard(`${ window.location.origin }/offers?selectedOffer=${ offer.id }`),
               onClickGetStarted: () => {
                  if (isEditor) return;
                  if (handleBuyOffer) {
                     handleBuyOffer(offer.plan_for_course[0], offer);
                  }
               },
            } }
         />
      </div>
   );
};

OfferSliderItemTemplate3.defaultProps = {
   showPrimaryButton: true,
   paddingBottom: '64',
   paddingTop: '106',
   paddingLeft: '48',
   paddingRight: '48',
   alignItems: 'center',
   justifyContent: 'center',
};

OfferSliderItemTemplate3.propTypes = {
   picture_src: PropTypes.string,
   offer: PropTypes.object,
   height: PropTypes.string,
   slug: PropTypes.string,
   user: PropTypes.object,
   showOpacity: PropTypes.bool,
   showPrimaryButton: PropTypes.bool,
   alignItems: PropTypes.string,
   justifyContent: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   titleProps: PropTypes.object,
   descriptionProps: PropTypes.object,
   buttonProps: PropTypes.object,
   secondButtonProps: PropTypes.object,
   lessonsCount: PropTypes.number,
   coursesCount: PropTypes.number,
};

export default OfferSliderItemTemplate3;
