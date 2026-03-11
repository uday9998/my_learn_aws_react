/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import InlineEditor from 'components/modules/InlineEditor';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Testimonial = (props) => {
   const {
      slug, className, onClick, testimonial, isPreview, changeProp, subIndex, index,
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
            'testimonial': !active || isPreview,
            'testimonial mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <div className='testimonial-content'>
            <div className='testimonial-img'>
               {testimonial.picture_src && <img src={ testimonial.picture_src } alt='testimonial' />}
            </div>
            <div className='testimonial-texts'>
               <div className='testimonial-name' style={ { color: testimonial.author_color } }>
                  {isPreview ? (
                     <div
                        dangerouslySetInnerHTML={ { __html: testimonial.author_name } }
                     />
                  )
                     : (
                        <InlineEditor
                           text={ testimonial.author_name }
                           slug={ slug }
                           changeProp={ changeProp }
                           index={ index }
                           subIndex={ subIndex }
                           isSubcomponent={ true }
                           propsName='author_name'
                        />
                     )}
               </div>
               <div className='testimonial-desc' style={ { color: testimonial.color } }>
                  {isPreview ? (
                     <div
                        dangerouslySetInnerHTML={ { __html: testimonial.text } }
                     />
                  )
                     : (
                        <InlineEditor
                           text={ testimonial.text }
                           slug={ slug }
                           changeProp={ changeProp }
                           index={ index }
                           subIndex={ subIndex }
                           isSubcomponent={ true }
                        />
                     )}
               </div>
            </div>
         </div>
      </div>
   );
};

Testimonial.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   text: PropTypes.string,
   testimonial: PropTypes.object,
   picture_src: PropTypes.string,
   author_name: PropTypes.string,
   isPreview: PropTypes.bool,
   index: PropTypes.number,
   subIndex: PropTypes.number,
   changeProp: PropTypes.func,
};

export default Testimonial;
