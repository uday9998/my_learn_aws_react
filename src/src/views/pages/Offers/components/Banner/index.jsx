import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import { OfferContext } from 'containers/pages/mixed/offers';
import classNames from 'classnames';
import ImageWithBlur from 'components/elements/ImageWithBlur';
import BannerTitle from './BannerTitle';

const SchoolRoomBanner = (props) => {
   const {
      picture_src: image, 
      showOpacity, 
      sliderOpacity, 
      height,
      autoSlide = true,
      slideInterval = 3000,
      onSlideChange
   } = props;
   
   const [active, setActive] = React.useState(false);
   const [isPaused, setIsPaused] = React.useState(false);
   const { isEditor, template, onClickElement } = React.useContext(OfferContext);
   
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   // Auto-slide effect
   React.useEffect(() => {
      if (!autoSlide || isPaused) return;

      const interval = setInterval(() => {
         if (onSlideChange) {
            onSlideChange();
         }
      }, slideInterval);

      return () => clearInterval(interval);
   }, [autoSlide, isPaused, slideInterval, onSlideChange]);

   const handleMouseEnter = (e) => {
      toggle(e, 'enter');
      setIsPaused(true); // Pause auto-slide on hover
   };

   const handleMouseLeave = (e) => {
      toggle(e, 'leave');
      setIsPaused(false); // Resume auto-slide when not hovering
   };

   const slug = template[2].school_room_components[0].slug;
   
   return (
      <div
         role='presentation'
         className={classNames({
            'offer__slider__item banner': !active || !isEditor,
            'offer__slider__item banner mark': active && isEditor,
         })}
         onClick={(e) => onClickElement(e)}
         data-slug={slug}
         id={slug}
         style={{
            height: height.includes('px') ? height : '549px', 
         }}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <ImageWithBlur 
            src={image}
         />
         {showOpacity && (
            <div style={{ opacity: sliderOpacity }} className='offer__slider__item__opacity' />
         )}
         <BannerTitle
            {...props}
         />
      </div>
   );
};

SchoolRoomBanner.propTypes = {
   picture_src: PropTypes.string,
   showOpacity: PropTypes.bool,
   sliderOpacity: PropTypes.number,
   height: PropTypes.string,
   autoSlide: PropTypes.bool,
   slideInterval: PropTypes.number,
   onSlideChange: PropTypes.func,
};

export default SchoolRoomBanner;