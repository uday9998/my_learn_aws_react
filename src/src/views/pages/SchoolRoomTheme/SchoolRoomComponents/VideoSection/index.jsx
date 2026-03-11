/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import VideoSub from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/SubComponents/Video';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Video = (props) => {
   const {
      slug, className, onClick, isPreview,
      subcomponent, props: { bgColor }, primaryTheme,
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
            'video_content': !active || isPreview,
            'video_content mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { backgroundColor: bgColor } }
      >
         <VideoSub
            { ...subcomponent[0].props }
            slug={ subcomponent[0].slug }
            onClick={ (e) => onClick(e) }
            isPreview={ isPreview }
            index={ 0 }
            subIndex={ 0 }
            style={ { fontFamily: primaryTheme } }
         />
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
   subcomponent: PropTypes.object,
   primaryTheme: PropTypes.string,
   props: PropTypes.object,
};

export default Video;
