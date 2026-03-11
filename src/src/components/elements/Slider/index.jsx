import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Icon from 'components/elements/Icon';
import './index.scss';
import PropTypes from 'prop-types';


function SampleNextArrow(props) {
   const { className, onClick } = props;
   return (
      <div
         className={ `${ className } mainSliderNext` }
         onClick={ onClick }
         role='presentation'
      >
         <Icon
            name='SliderRight'
         />
      </div>
   );
}

function SamplePrevArrow(props) {
   const { className, onClick } = props;
   return (
      <div
         className={ `${ className } mainSliderPrev` }
         onClick={ onClick }
         role='presentation'
      >
         <Icon
            name='SliderLeft'
         />
      </div>
   );
}

export default class SimpleSlider extends Component {
   static propTypes = {
      children: PropTypes.any,
      isPreview: PropTypes.bool,
   };

   constructor(props) {
      super(props);
      this.slider = React.createRef();
   }

   slickGoTo = (currentSlug) => {
      if (this.slider.current) {
         this.slider.current.props.children.forEach(element => {
            if (Array.isArray(element) && element.length !== 0) {
               element.forEach((el, i) => {
                  if (el && el.key === currentSlug) {
                     this.slider.current.slickGoTo(i);
                  }
               });
            }
         });
      }
   }

   render() {
      const settings = {
         dots: true,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         arrows: true,
         nextArrow: <SampleNextArrow />,
         prevArrow: <SamplePrevArrow />,
      };
      const { children, isPreview, ...rest } = this.props;

      return (
         <div>
            <Slider { ...settings } { ...rest } autoplay={ !!isPreview } ref={ this.slider } className='mainSlider'>
               {children}
            </Slider>
         </div>
      );
   }
}


SamplePrevArrow.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
};

SampleNextArrow.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
};
