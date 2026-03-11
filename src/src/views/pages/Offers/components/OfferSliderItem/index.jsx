import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { OfferContext } from 'containers/pages/mixed/offers';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import { copyToClipBoard } from 'utils/copy';
import sliderDefaultImage from 'assets/images/schoolRoom/portal-1-slider-default.png';
import avatarImg from 'assets/images/avatar/img.png';
import LiquidRenderer from '../../liquidRenderer';

const OfferSliderItem = (props) => {
   const {
      picture_src: image,
      showOpacity,
      sliderOpacity,
      height,
      alignItems,
      offer,
      justifyContent,
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
      lessonsCount,
      coursesCount,
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
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const { isMobile } = useWindowSizeChange();

   const getSliderImg = (image, offer) => {
      
      if (image) {
         return image;
      } 
      if (offer && offer.type === '2' && offer.communities && offer.communities.file_id) {
         return offer.communities.file_id;
      } 
      if (offer && offer.type !== '2' && offer.thumbnail_image && !offer.thumbnail_image.includes('thumbnail.png')) {
         return offer.thumbnail_image;
      }
      
      return sliderDefaultImage;
   };

   const resolvedImage = getSliderImg(image, offer);

   return (
      <div
         data-slug={ slug }
         id={ slug }
         onMouseOver={ toggle }
         role='presentation'
         onMouseOut={ toggle }
         onClick={ (e) => onClickElement(e) }
         className={ classNames({
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
               avatarImg,
               imageSrc: resolvedImage,
               showOpacity,
               sliderOpacity,
               offer,
               productsBadgeText: `${ coursesCount } ${ coursesCount > 1 ? 'Products' : 'Product' }`,
               lessonsCountBadgeText: `${ lessonsCount } ${ lessonsCount > 1 ? 'Lessons' : 'Lesson' }`,
               priceBadgeText: offer?.pricings?.some(pricing => pricing.pricing_type === 0) ? 'Free' : 'Paid',
               showPrimaryButton,
               primaryButtonColor: buttonProps?.color || 'var(--offersSliderColor)',
               user,
               contentStyles: `
                     padding: ${ paddingTop }px ${ paddingRight }px ${ paddingBottom }px ${ paddingLeft }px;
                     justify-content: ${ justifyContent };
                     align-items: ${ alignItems };
                  `,
               offerNameStyles: `
                  color: ${ titleProps?.color || 'var(--offersSliderColor)' };
                  font-size: ${ isMobile ? 20 : titleProps?.fontSize || 56 }px;
               `,
               offerDescriptionStyles: `
                  color: ${ descriptionProps?.color || 'var(--offersSliderColor)' };
                  font-size: ${ isMobile ? 12 : descriptionProps?.fontSize || 24 }px;
               `,
               primaryButtonStyles: `
                  font-size: ${ buttonProps?.fontSize || 16 }px;
                  background-color: ${ buttonProps?.bgColor || 'var(--buttonBgcolor)' };
                  color: ${ buttonProps?.color || 'var(--offersSliderColor)' };
               `,
               secondaryButtonStyles: `
                  font-size: ${ secondButtonProps?.fontSize || 16 }px;
                  background-color: ${ secondButtonProps?.bgColor || 'var(--offersSliderColor20)' };
                  color: ${ secondButtonProps?.color || 'var(--offersSliderColor)' };
               `,
               secondaryButtonsIconColor: secondButtonProps?.color || 'var(--offersSliderColor)',
            } }
            actions={ {
               onClickGetStarted: () => {
                  if (isEditor) return;
                  if (handleBuyOffer) {
                     handleBuyOffer(offer.plan_for_course[0], offer);
                  }
               },
               onClickShare: isEditor ? () => {} : () => copyToClipBoard(`${ window.location.origin }/offers?selectedOffer=${ offer.id }`),
               onClickFavorite: isEditor ? () => {} : () => handleFavorite(offer.id),
            } }
         />
      </div>
   );
};

OfferSliderItem.defaultProps = {
   showPrimaryButton: true,
   paddingTop: 0,
   paddingRight: 0,
   paddingBottom: 0,
};

OfferSliderItem.propTypes = {
   picture_src: PropTypes.string,
   showOpacity: PropTypes.bool,
   sliderOpacity: PropTypes.number,
   offer: PropTypes.object,
   height: PropTypes.string,
   justifyContent: PropTypes.string,
   alignItems: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   paddingTop: PropTypes.string,
   slug: PropTypes.string,
   user: PropTypes.object,
   titleProps: PropTypes.object,
   descriptionProps: PropTypes.object,
   buttonProps: PropTypes.object,
   secondButtonProps: PropTypes.object,
   showPrimaryButton: PropTypes.bool,
   lessonsCount: PropTypes.number,
   coursesCount: PropTypes.number,
};

export default OfferSliderItem;