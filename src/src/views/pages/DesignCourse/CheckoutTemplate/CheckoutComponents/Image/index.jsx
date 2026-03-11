/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import InlineActions from 'components/modules/InlineActions';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Image = (props) => {
   const {
      slug, className, onClick, picture_src, isPreview, checkoutType,
      width, borderRadius, justifyContent, course, isClassPic,
      paddingBottom, paddingLeft, paddingRight, paddingTop,
      handleDuplicateComponent, handleDeleteComponent, sectionIndex, index, isBorderRadiusPX, templateName,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   const getImage = () => {
      if (isClassPic && picture_src) {
         return picture_src;
      } if (isClassPic) {
         return course.thumbnail_image;
      }

      return picture_src;
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
         <div
            className={ `image-content-${ checkoutType }` }
            style={ {
               marginTop: `${ paddingTop }px`,
               marginBottom: `${ paddingBottom }px`,
               marginLeft: `${ paddingLeft }px`,
               marginRight: `${ paddingRight }px`,
            } }>
            {(picture_src || isClassPic) && (
               <img
                  src={ getImage() }
                  alt='checkout'
                  style={ {
                     width: templateName === 'template7' ? '100%' : `${ width }px`,
                     borderRadius: `${ borderRadius }px`,
                  } }
               />
            )}
         </div>
         {!isClassPic && (
            <InlineActions
               slug={ slug }
               handleDuplicateComponent={ handleDuplicateComponent }
               handleDeleteComponent={ handleDeleteComponent }
               sectionIndex={ sectionIndex }
               index={ index }
            />
         )}
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
   borderRadius: PropTypes.string,
   justifyContent: PropTypes.string,
   course: PropTypes.object,
   isClassPic: PropTypes.bool,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   index: PropTypes.number,
   sectionIndex: PropTypes.number,
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   isBorderRadiusPX: PropTypes.bool,
   templateName: PropTypes.string,
};

export default Image;
