/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';
import ClassTitle from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/ClassTitle';
import ClassDescription from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/ClassDescription';
import ClassAuthor from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/ClassAuthor';
import ClassButton from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/ClassButton';
import { useTranslate } from 'react-polyglot';

const Class = (props) => {
   const {
      slug, className, onClick, course, pictureSrc, isPreview, primaryTheme, showOpacity,
      paddingTop, paddingBottom, paddingLeft, paddingRight, justifyContent, alignItems,
      templateType, courseSubcomponent, landing, sliderHeight, sliderOpacity, offer,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const t = useTranslate();

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'slider_class sliderClassImg': !active || isPreview,
            'slider_class sliderClassImg mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ { '--blur-bg': `url("${ pictureSrc }")` } }
      >
         <div className='blur-bg' />

         <div
            className='sliderImgContent'
            style={ {
               backgroundImage: `url(${ pictureSrc })`,
               justifyContent,
               alignItems,
               height: `${ sliderHeight }vw`,
            } }
         >
            {showOpacity && (<div className='slider-overlay' style={ { opacity: sliderOpacity } } />
            )}
            <div />
            {offer && courseSubcomponent && courseSubcomponent[0] && courseSubcomponent[1] && (
               <div
                  className='sliderImg__footer'
               >
                  <div
                     className={ `sliederImg__${ templateType }` }
                     style={ {
                        paddingTop: `${ paddingTop }vw`,
                        paddingBottom: `${ paddingBottom }vw`,
                        paddingLeft: `${ paddingLeft }vw`,
                        paddingRight: `${ paddingRight }vw`,
                     } }
                  >
                     <div className='sliederImg__courseName'>
                        <ClassTitle
                           { ...courseSubcomponent[0].props }
                           title={ offer.name }
                           style={ { fontFamily: primaryTheme } }
                           slug={ courseSubcomponent[0].slug }
                           onClick={ (e) => onClick(e) }
                           isPreview={ isPreview }

                        />

                     </div>
                     <div className='sliederImg__courseCat'>
                        <ClassDescription
                           { ...courseSubcomponent[1].props }
                           title={ offer.description || '' }
                           style={ { fontFamily: primaryTheme } }
                           slug={ courseSubcomponent[1].slug }
                           onClick={ (e) => onClick(e) }
                           isPreview={ isPreview }
                        />
                     </div>
                     {/* {course.authors[0] && (
                        <ClassAuthor
                           className='m-t-m'
                           { ...courseSubcomponent[2].props }
                           slug={ courseSubcomponent[2].slug }
                           onClick={ (e) => onClick(e) }
                           name={ course.authors[0].name }
                           avatar={ course.authors[0].picture_src }
                           description={ course.authors[0].description }
                           isPreview={ isPreview }
                           style={ { fontFamily: primaryTheme } }
                        />
                     )} */}
                     <div className='sliederImg__btns m-t-exl'>
                        <div className='btn__left'>
                           <ClassButton
                              { ...courseSubcomponent[2].props }
                              slug={ courseSubcomponent[2].slug }
                              style={ { fontFamily: primaryTheme } }
                              title={ t('get_started') }
                              course={ course }
                              offer={ offer }
                              onClick={ (e) => onClick(e) }
                              isPreview={ isPreview }
                              landing={ landing }
                           />
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

Class.defaultProps = {
   sliderHeight: '55',
};

Class.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   course: PropTypes.object,
   primaryTheme: PropTypes.string,
   showOpacity: PropTypes.bool,
   pictureSrc: PropTypes.string,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   justifyContent: PropTypes.string,
   alignItems: PropTypes.string,
   templateType: PropTypes.string,
   courseSubcomponent: PropTypes.array,
   landing: PropTypes.object,
   sliderHeight: PropTypes.string,
   sliderOpacity: PropTypes.string,
   offer: PropTypes.object,
};

export default Class;
