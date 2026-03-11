import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Icon from 'components/elements/Icon';
import PropTypes from 'prop-types';
import './index.scss';

function SampleNextArrow(props) {
   const {
      className, onClick, darkMode, courseCategoryColor,
   } = props;
   return (
      <div
         className={ `${ className } swipeSliderNext slide-arrow ${ darkMode ? 'slide-arrow-dark' : 'slide-arrow-light' }` }
         onClick={ onClick }
         role='presentation'
      >
         <Icon
            name='SwipeRight'
            // name='SliderRight'
            color={ courseCategoryColor }
         />
      </div>
   );
}

// export function SampleNextNewArrow(props) {
//    const { className, onClick } = props;
//    return (
//       <div
//          className={ `${ className } mainSliderNext` }
//          onClick={ onClick }
//          role='presentation'
//       >
//          <Icon
//             name='SliderRight'
//          />
//       </div>
//    );
// }

// export function SamplePrevNewArrow(props) {
//    const { className, onClick } = props;
//    return (
//       <div
//          className={ `${ className } mainSliderPrev` }
//          onClick={ onClick }
//          role='presentation'
//       >
//          <Icon
//             name='SliderLeft'
//          />
//       </div>
//    );
// }

function SamplePrevArrow(props) {
   const {
      className, onClick, darkMode, courseCategoryColor,
   } = props;
   return (
      <div
         className={ `${ className } swipeSliderPrev slide-arrow ${ darkMode ? 'slide-arrow-dark' : 'slide-arrow-light' }` }
         onClick={ onClick }
         role='presentation'
      >
         <Icon
            name='SwipeLeft'
            color={ courseCategoryColor }
         />
      </div>
   );
}


export default class SwipeToSlide extends Component {
   static propTypes = {
      children: PropTypes.any,
      courses: PropTypes.array,
      textColor: PropTypes.string,
      templateType: PropTypes.string,
      darkMode: PropTypes.bool,
      courseCategoryColor: PropTypes.string,
      viewMode: PropTypes.string,
   };

   constructor(props) {
      super(props);
      this.state = {
         swiping: false,
      };
   }

   render() {
      const {
         children, courses, templateType, textColor, darkMode, courseCategoryColor, viewMode, ...rest
      } = this.props;
      const { swiping } = this.state;
      // eslint-disable-next-line no-nested-ternary
      let slidesToShow = 6;
      let slidesTOShow2100 = 5;
      let slidesTOShow1800 = 4;
      let slidesTOShow1200 = 3;
      let slidesToShow1024 = 2;
      if (viewMode === 'phone' || viewMode === 'tablet') {
         slidesToShow = 1;
         slidesTOShow2100 = 1;
         slidesTOShow1800 = 1;
         slidesTOShow1200 = 1;
         slidesToShow1024 = 1;
      }
      const settings = {
         infinite: false,
         slideToScroll: 1,
         slidesToShow,
         swipeToSlide: true,
         arrows: true,
         autoplay: false,
         autoplaySpeed: 5000,
         centerMode: false,
         onSwipe: () => {
            this.setState({ swiping: true });
            setTimeout(() => {
               this.setState({ swiping: false });
            }, 100);
         },
         onClick: () => {
            if (swiping) {
               return false;
            }
         },
         nextArrow: <SampleNextArrow
            textColor={ textColor }
            darkMode={ darkMode }
            courseCategoryColor={ courseCategoryColor }
         />,
         prevArrow: <SamplePrevArrow
            textColor={ textColor }
            darkMode={ darkMode }
            courseCategoryColor={ courseCategoryColor }
         />,
         responsive: [
            {
               breakpoint: 2100,
               settings: {
                  slidesToShow: slidesTOShow2100,
               },
            },
            {
               breakpoint: 1800,
               settings: {
                  slidesToShow: slidesTOShow1800,
               },
            },
            {
               breakpoint: 1350,
               settings: {
                  slidesToShow: slidesTOShow1200,
               },
            },
            {
               breakpoint: 1024,
               settings: {
                  slidesToShow: slidesToShow1024,
               },
            },
            {
               breakpoint: 600,
               settings: {
                  slidesToShow: 1,

               },
            },
            {
               breakpoint: 480,
               settings: {
                  slidesToShow: 1,
               },
            },
         ],
         ...rest,
      };

      return (
         <div
            className='offer__cards__list SwipeToSlide'
            role='presentation'>
            {
               templateType === 'template2' && viewMode === 'phone' ? (
                  <div className='cards__wrapper'>
                     {React.Children.map(children, (child) => child && React.cloneElement(child, {
                        ...child.props,
                        swiping,
                        onMouseDown: () => this.setState({ swiping: true }),
                        onMouseUp: () => this.setState({ swiping: false }),
                        onTouchStart: () => this.setState({ swiping: true }),
                        onTouchEnd: () => this.setState({ swiping: false }),
                     })
                     )}
                  </div>
               ) : (
                  <Slider { ...settings }>
                     {React.Children.map(children, (child) => child && React.cloneElement(child, {
                        ...child.props,
                        swiping,
                        onMouseDown: () => this.setState({ swiping: true }),
                        onMouseUp: () => this.setState({ swiping: false }),
                        onTouchStart: () => this.setState({ swiping: true }),
                        onTouchEnd: () => this.setState({ swiping: false }),
                     })
                     )}
                  </Slider>
               )
            }
         </div>
      );
   }
}


SamplePrevArrow.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
   darkMode: PropTypes.bool,
   courseCategoryColor: PropTypes.string,
};

SamplePrevArrow.defaultProps = {
   darkMode: false,
};

SampleNextArrow.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
   darkMode: PropTypes.bool,
   courseCategoryColor: PropTypes.string,
};

SampleNextArrow.defaultProps = {
   darkMode: false,
};
