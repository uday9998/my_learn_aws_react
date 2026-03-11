import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { OfferContext } from 'containers/pages/mixed/offers';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import { copyToClipBoard } from 'utils/copy';
import sliderDefaultImage from 'assets/images/schoolRoom/portal-2-slider-default.png';
import ImageWithBlur from 'components/elements/ImageWithBlur';
import LiquidRenderer from '../../liquidRenderer';

const OfferSliderItemTemplate2 = (props) => {
   const {
      picture_src: image,
      showOpacity,
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

   const toggle = e => {
      setActive(toggleHighlighted(e, active));
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
            'slider__template2': true,
            'offer__slider__item': !active || !isEditor,
            'offer__slider__item mark': active && isEditor,
         }) }
         style={ {
            height: height.includes('px') ? height : '549px', 
         } }
      >
         <ImageWithBlur 
            src={ resolvedImage }
         />
         {showOpacity && (
            <div className='offer__slider__item__opacity' />
         )}
         <div
            className="offer__slider__item__content"
            style={{
               padding: `${ paddingTop }px ${ paddingRight }px ${ paddingBottom }px ${ paddingLeft }px`,
               justifyContent: justifyContent,
               alignItems: alignItems,
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               zIndex: 10,
               display: 'flex',
               flexDirection: 'column',
            }}
         >
            <div 
               className="offer__slider__item__content__wrapper"
               style={{
                  
                  borderRadius: '8px',
               }}
            >
               <span
                  className="offer__slider__item__content__name"
                  style={{
                     color: titleProps?.color || 'white',
                     fontSize: `${ isMobile ? 20 : titleProps?.fontSize || 40 }px`,
                     display: 'block',
                     marginBottom: '10px',
                     fontWeight: 'bold',
                  }}
               >
                  { offer?.name || 'Course Name' }
               </span>
               {offer?.description && (
                  <span
                     className="offer__slider__item__content__description"
                     style={{
                        color: descriptionProps?.color || 'white',
                        fontSize: `${ isMobile ? 12 : descriptionProps?.fontSize || 14 }px`,
                        display: 'block',
                        marginBottom: '15px',
                     }}
                  >
                     { offer.description }
                  </span>
               )}
               <div className="offer__slider__item__content__buttons">
                  {showPrimaryButton && (
                     <button
                        className="btnBasic"
                        onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           if (isEditor) return;
                           if (handleBuyOffer && offer?.plan_for_course?.[0]) {
                              handleBuyOffer(offer.plan_for_course[0], offer);
                           }
                        }}
                        style={{
                           fontSize: `${ buttonProps?.fontSize || 16 }px`,
                           backgroundColor: buttonProps?.bgColor || '#24554e',
                           color: buttonProps?.color || 'white',
                           border: 'none',
                           borderRadius: '5px',
                           padding: '12px 24px',
                           cursor: 'pointer',
                           display: 'flex',
                           alignItems: 'center',
                           gap: '8px',
                        }}
                     >
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fillRule="evenodd" clipRule="evenodd" d="M15.9998 2.41675C8.22183 2.41675 1.9165 8.72207 1.9165 16.5001C1.9165 24.2781 8.22183 30.5834 15.9998 30.5834C23.7778 30.5834 30.0832 24.2781 30.0832 16.5001C30.0832 8.72207 23.7778 2.41675 15.9998 2.41675ZM11.9998 18.8366V14.1636C11.9998 12.7503 11.9998 12.0437 12.2956 11.6454C12.5535 11.2983 12.9486 11.0793 13.3796 11.0446C13.8741 11.0049 14.4734 11.3794 15.6718 12.1284L19.4102 14.4649C20.49 15.1398 21.0299 15.4772 21.215 15.9092C21.3767 16.2865 21.3767 16.7136 21.215 17.0909C21.0299 17.523 20.49 17.8604 19.4102 18.5353L15.6718 20.8717C14.4734 21.6208 13.8741 21.9953 13.3796 21.9556C12.9486 21.9209 12.5535 21.7019 12.2956 21.3547C11.9998 20.9565 11.9998 20.2498 11.9998 18.8366Z" fill="white" />
                        </svg>
                        Watch Now
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

OfferSliderItemTemplate2.defaultProps = {
   showPrimaryButton: true,
   paddingBottom: 60,
   paddingTop: 60,
   paddingLeft: 16,
   paddingRight: 16,
};

OfferSliderItemTemplate2.propTypes = {
   picture_src: PropTypes.string,
   offer: PropTypes.object,
   height: PropTypes.string,
   slug: PropTypes.string,
   user: PropTypes.object,
   showPrimaryButton: PropTypes.bool,
   showOpacity: PropTypes.bool,
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

export default OfferSliderItemTemplate2;