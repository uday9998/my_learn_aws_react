/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import {
   getYoutubeId, getVimeoEmbed, getIframeEmbed, getWistiaEmbed,
} from 'utils/pageBuilder/video';
import PropTypes from 'prop-types';
import InlineActions from 'components/modules/InlineActions';
import './index.scss';

const Video = (props) => {
   const {
      slug, className, onClick, isPreview, src, source, width, borderRadius, justifyContent,
      paddingBottom, paddingLeft, paddingRight, paddingTop, handleDuplicateComponent, handleDeleteComponent,
      sectionIndex, index,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const SearchVideo = (type) => {
      if (type === 'youtube' && src && getYoutubeId(src) !== 'error' && !src.includes('<iframe')) {
         return true;
      } if (type === 'vimeo' && src && getVimeoEmbed(src) !== 'error' && !src.includes('<iframe')) {
         return true;
      } if (type === 'wistia' && src && getWistiaEmbed(src) !== 'error' && !src.includes('<iframe')) {
         return true;
      } if (type === 'iframe' && src && getIframeEmbed(src) !== 'error') {
         return true;
      }
      return false;
   };
   const styles = {
      width: `${ width }px`,
      height: `${ width }px`,
      borderRadius: `${ borderRadius }%`,
      marginTop: `${ paddingTop }px`,
      marginBottom: `${ paddingBottom }px`,
      marginLeft: `${ paddingLeft }px`,
      marginRight: `${ paddingRight }px`,
   };
   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'video': !active || isPreview,
            'video mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { justifyContent } }
      >
         <div className='video_play_block' />
         {SearchVideo(source)
            ? (
               <div className='video-content'>
                  {
                     source === 'iframe' && src[0] === '<'
                        ? <div dangerouslySetInnerHTML={ { __html: src } } className='iframe-video' style={ styles } />
                        : (
                           <iframe
                              title='video'
                              width='100%'
                              height='100%'
                              frameBorder={ 0 }
                              src={ src }
                              allow='autoplay; encrypted-media'
                              allowFullScreen
                              style={ { ...styles, pointerEvents: 'none' } }
                           />
                        )
                  }

               </div>
            )
            : (
               <div className='video-content'>
                  <iframe
                     title='video'
                     width='100%'
                     height='100%'
                     frameBorder={ 0 }
                     src='https://www.youtube.com/embed/RVjxFLTCngw'
                     allow='autoplay; encrypted-media'
                     allowFullScreen
                     style={ styles }
                  />
               </div>
            )
         }
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


Video.defaultProps = {
};

Video.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   src: PropTypes.string,
   isPreview: PropTypes.bool,
   width: PropTypes.string,
   borderRadius: PropTypes.string,
   justifyContent: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   source: PropTypes.string,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
};

export default Video;
