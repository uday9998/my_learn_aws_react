/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InlineActions from 'components/modules/InlineActions';
import './index.scss';

const Image = (props) => {
   const {
      slug, className, onClick, picture_src, isPreview, checkoutType,
      width, borderRadius, justifyContent, course, isClassPic,
      paddingBottom, paddingLeft, paddingRight, paddingTop, handleDuplicateComponent,
      handleDeleteComponent, sectionIndex, index,
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
            'image': !active || isPreview,
            'image mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { justifyContent } }
      >
         <div className={ `image-content-${ checkoutType }` }>
            {(picture_src || isClassPic) && (
               <img
                  src={ isClassPic ? course.thumbnail_image : picture_src }
                  alt='checkout'
                  style={ {
                     width: `${ width }px`,
                     borderRadius: `${ borderRadius }%`,
                     marginTop: `${ paddingTop }px`,
                     marginBottom: `${ paddingBottom }px`,
                     marginLeft: `${ paddingLeft }px`,
                     marginRight: `${ paddingRight }px`,
                  } }
               />
            )}
         </div>
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

Image.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   picture_src: PropTypes.string,
   isPreview: PropTypes.bool,
   checkoutType: PropTypes.string,
   width: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   borderRadius: PropTypes.string,
   justifyContent: PropTypes.string,
   course: PropTypes.object,
   isClassPic: PropTypes.bool,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
};

export default Image;
