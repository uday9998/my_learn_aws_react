import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Icon from 'components/elements/Icon';
import './index.scss';
import PropTypes from 'prop-types';


function SampleNextArrow(props) {
   const { className, onClick, templateName } = props;
   const templateClassName = templateName === 'template7' ? 'mainSliderNext new_arrow' : 'mainSliderNext';
   return (
      <div
         className={ `${ className } ${ templateClassName }` }
         onClick={ onClick }
         role='presentation'
      >
         <Icon
            name={ templateName === 'template7' ? 'TestimonialRightTemplate7' : 'TestimonialRight' }
         />
      </div>
   );
}

function SamplePrevArrow(props) {
   const { className, onClick, templateName } = props;
   const templateClassName = templateName === 'template7' ? 'mainSliderPrev new_prev_arrow' : 'mainSliderPrev';
   return (
      <div
         className={ `${ className } ${ templateClassName }` }
         onClick={ onClick }
         role='presentation'
      >
         <Icon
            name={ templateName === 'template7' ? 'TestimonialLeftTemplate7' : 'TestimonialLeft' }
         />
      </div>
   );
}

export default class SimpleSlider extends Component {
   static propTypes = {
      children: PropTypes.any,
      disableArrow: PropTypes.bool,
      templateName: PropTypes.string,
   };

   render() {
      const { disableArrow, templateName } = this.props;
      const settings = {
         dots: true,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: false,
         arrows: !disableArrow,
         nextArrow: <SampleNextArrow templateName={ templateName } />,
         prevArrow: <SamplePrevArrow templateName={ templateName } />,
      };
      const { children, ...rest } = this.props;
      return (
         <Slider { ...settings } { ...rest } className={ templateName === 'template7' ? 'sliderWithDots template7__dots' : 'sliderWithDots' }>
            {children}
         </Slider>
      );
   }
}


SamplePrevArrow.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
   templateName: PropTypes.string,
};

SampleNextArrow.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
   templateName: PropTypes.string,
};
