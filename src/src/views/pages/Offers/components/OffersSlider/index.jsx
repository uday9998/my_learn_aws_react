import React, { useEffect } from "react";
import { OfferContext } from "containers/pages/mixed/offers";
import Slider from "components/elements/Slider";
import PropTypes from "prop-types";
import template1SliderDefaultImage from "assets/images/schoolRoom/portal-1-slider-default.png";
import template2SliderDefaultImage from "assets/images/schoolRoom/portal-2-slider-default.png";
import template3SliderDefaultImage from "assets/images/schoolRoom/portal-3-slider-default.png";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { setPrimaryColors } from "utils/pageBuilder/schoolRoomColor";
import { useSelector } from "react-redux";
import { siteInfoSelector } from "state/modules/common/selectors";
import LiquidRenderer from "../../liquidRenderer";

const OffersSlider = ({
   sliderArray,
   height,
   isPreview,
   showOpacity,
   defaultSliderTemplate,
   schoolRoomThemeName,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   const sliderRef = React.useRef(null);
   const { template } = React.useContext(OfferContext);
   const { landingType, templateId } = useParams();
   const contextSections = template;
   const hero = contextSections[2];
   const slug = hero.school_room_section.slug;

   const themeName = templateId
      ? hero.school_room_section.props.templateType
      : landingType || schoolRoomThemeName;

   const imagesByTemplateName = {
      template1: template1SliderDefaultImage,
      template2: template2SliderDefaultImage,
      template3: template3SliderDefaultImage,
   };

   useEffect(() => {
      setPrimaryColors(siteInfo, schoolRoomThemeName);
   }, []);

   return (
      <div className="offers__banner" data-slug={slug} id={slug}>
         <div data-slug={slug} id={slug} className="Section">
            <Slider
               autoplay
               autoplaySpeed={5000}
               isPreview={isPreview}
               responsive={[
                  {
                     breakpoint: 1024,
                     settings: {
                        arrows: false,
                     },
                  },
               ]}
               ref={sliderRef}
            >
               {sliderArray && sliderArray.length > 0 ? (
                  sliderArray
               ) : (
                  <LiquidRenderer
                     template={defaultSliderTemplate}
                     data={{
                        showOpacity,
                        sliderDefaultImage: imagesByTemplateName[themeName],
                        height: height.includes("px") ? height : "549px",
                     }}
                  />
               )}
            </Slider>
         </div>
      </div>
   );
};

OffersSlider.propTypes = {
   sliderArray: PropTypes.array,
   height: PropTypes.string,
   isPreview: PropTypes.bool,
   showOpacity: PropTypes.bool,
   defaultSliderTemplate: PropTypes.string,
   schoolRoomThemeName: PropTypes.string,
};

export default OffersSlider;