/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import BannerTitle from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/BannerTitle';
import InlineActions from 'components/modules/InlineActions';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Banner = (props) => {
   const {
      slug, className, onClick, isPreview,
      school_banner_src, title, primaryTheme,
      showOpacity, showTitle, bannerTitle, sliderHeight,
      sliderOpacity, duplicated, changeProp, handleDuplicateComponent,
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
            'banner sliderBannerImg': !active || isPreview,
            'banner sliderBannerImg mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { '--blur-bg': `url("${ school_banner_src }")` } }
      >
         <div className='blur-bg' />
         <div
            className='sliderImgContent'
            style={ {
               backgroundImage: `url(${ (school_banner_src) })`,
               justifyContent: bannerTitle.props.justifyContent,
               alignItems: bannerTitle.props.alignItems,
               height: `${ sliderHeight }vw`,
            } }
         >
            {showOpacity && (<div className='slider-overlay' style={ { opacity: sliderOpacity } } />
            )}
            {showTitle && (
               <div className='sliderImg__footer'>
                  <div className='sliederImg__courseName'>
                     <BannerTitle
                        { ...bannerTitle.props }
                        slug={ bannerTitle.slug }
                        title={ title }
                        onClick={ (e) => onClick(e) }
                        style={ { fontFamily: primaryTheme } }
                        subIndex={ 0 }
                        isPreview={ isPreview }
                        duplicated={ duplicated }
                        changeProp={ changeProp }
                        index={ index }
                        sectionIndex={ sectionIndex }
                        handleDuplicateComponent={ handleDuplicateComponent }
                        handleDeleteComponent={ handleDeleteComponent }
                     />
                  </div>
               </div>
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

Banner.defaultProps = {
   sliderHeight: '55',
};

Banner.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   picture_src: PropTypes.string,
   isPreview: PropTypes.bool,
   checkoutType: PropTypes.string,
   width: PropTypes.string,
   spacing: PropTypes.string,
   borderRadius: PropTypes.string,
   justifyContent: PropTypes.string,
   school_show_banner: PropTypes.bool,
   school_banner_src: PropTypes.string,
   showTitle: PropTypes.bool,
   bannerTitle: PropTypes.object,
   primaryTheme: PropTypes.string,
   title: PropTypes.string,
   showOpacity: PropTypes.bool,
   sliderHeight: PropTypes.string,
   sliderOpacity: PropTypes.string,
   duplicated: PropTypes.string,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   changeProp: PropTypes.func,
   index: PropTypes.number,
};


export default Banner;
