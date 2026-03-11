/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Video = (props) => {
   const {
      slug, className, onClick, isPreview, src, width, spacing, borderRadius, justifyContent,
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
            'subvideo': !active || isPreview,
            'subvideo mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { justifyContent } }
      >
         <div className={ !isPreview ? 'video-content video-content-edit' : 'video-content' }>
            <iframe
               title='video'
               width='100%'
               height='100%'
               frameBorder={ 0 }
               src={ src }
               allow='autoplay; encrypted-media'
               allowFullScreen
               style={ {
                  width: `${ width }px`, height: `${ width }px`, borderRadius: `${ borderRadius }%`, padding: `${ spacing }px`,
               } }
            />
         </div>
      </div>
   );
};


Video.defaultProps = {
};

Video.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   src: PropTypes.string,
   isPreview: PropTypes.bool,
   width: PropTypes.string,
   spacing: PropTypes.string,
   borderRadius: PropTypes.string,
   justifyContent: PropTypes.string,
};

export default Video;
