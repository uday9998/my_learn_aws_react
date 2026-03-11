/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Class from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Class';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Slider = (props) => {
   const {
      slug, className, onClick, isPreview, course, offer,
      primaryTheme, showOpacity, i, templateType, landing,
      scroll, menuVisible, toggleSidebar, sliderHeight, sliderOpacity,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible);
      }
   }, [scroll]);
   return (
   // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'school_room_slider': !active || isPreview,
            'school_room_slider mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <Class
            { ...course.props }
            offer={ offer }
            courseSubcomponent={ course.subcomponent }
            course={ course.course }
            pictureSrc={ course.props.picture_src }
            key={ course.slug }
            slug={ course.slug }
            index={ i }
            onClick={ (e) => onClick(e) }
            isPreview={ isPreview }
            showOpacity={ showOpacity }
            primaryTheme={ primaryTheme }
            templateType={ templateType }
            landing={ landing }
            sliderHeight={ sliderHeight }
            sliderOpacity={ sliderOpacity }
         />
      </div>

   );
};

Slider.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   picture_src: PropTypes.string,
   isPreview: PropTypes.bool,
   course: PropTypes.object,
   justifyContent: PropTypes.string,
   alignItems: PropTypes.string,
   showOpacity: PropTypes.bool,
   primaryTheme: PropTypes.string,
   i: PropTypes.number,
   templateType: PropTypes.string,
   landing: PropTypes.object,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   sliderHeight: PropTypes.string,
   offer: PropTypes.object,
   sliderOpacity: PropTypes.string,
};

export default Slider;
