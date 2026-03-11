/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Testimonial from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Testimonial';
import InlineActions from 'components/modules/InlineActions';
import SliderWithDots from 'components/elements/SliderWithDots';
import InlineEditor from 'components/modules/InlineEditor';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Testimonials = (props) => {
   const {
      slug, onClick, subcomponent, isPreview, className, props: {
         bgColor, color, fontSize, text, paddingTop, paddingRight, paddingLeft, paddingBottom,
      }, disableArrow, checkoutType, index, changeProp, handleDuplicateComponent, handleDeleteComponent,
      sectionIndex, templateName,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'testimonials': !active || isPreview,
            'testimonials mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         data-index={ index }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ {
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
         } }
      >
         {!!subcomponent.length && (
            <div>
               <div className='testimonials-header' style={ { color, fontSize: `${ fontSize }px` } }>
                  {isPreview ? (
                     <div
                        dangerouslySetInnerHTML={ { __html: text } }
                     />
                  ) : (
                     <InlineEditor
                        text={ text }
                        slug={ slug }
                        changeProp={ changeProp }
                        index={ index }
                     />
                  )}
               </div>
               <div className={ `testimonials-content testimonials-content-${ checkoutType }` } style={ { background: bgColor } }>
                  <SliderWithDots
                     autoplay
                     disableArrow={ disableArrow }
                     autoplaySpeed={ 5000 }
                     responsive={ [{
                        breakpoint: 1024,
                     }] }
                     templateName={ templateName }
                  >
                     {subcomponent.map((testimonial, i) => {
                        return (
                           <Testimonial
                              testimonial={ testimonial.props }
                              key={ testimonial.slug }
                              slug={ testimonial.slug }
                              subIndex={ i }
                              index={ index }
                              onClick={ (e) => onClick(e) }
                              isPreview={ isPreview }
                              changeProp={ changeProp }
                           />
                        );
                     }
                     )}
                  </SliderWithDots>
               </div>
            </div>
         )}
         <InlineActions
            slug={ slug }
            handleDuplicateComponent={ handleDuplicateComponent }
            handleDeleteComponent={ handleDeleteComponent }
            sectionIndex={ sectionIndex }
            index={ index }
         />
      </div>
   );
};

Testimonials.defaultProps = {
   disableArrow: false,
};

Testimonials.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   subcomponent: PropTypes.array,
   isPreview: PropTypes.bool,
   props: PropTypes.object,
   disableArrow: PropTypes.bool,
   checkoutType: PropTypes.string,
   index: PropTypes.number,
   changeProp: PropTypes.func,
   sectionIndex: PropTypes.number,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   templateName: PropTypes.string,
};

export default Testimonials;
