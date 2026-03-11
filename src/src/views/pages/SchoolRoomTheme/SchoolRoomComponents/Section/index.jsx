import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Section = (props) => {
   const {
      slug,
      className,
      children,
      item,
      onClick,
      isPreview,
      isHeader,
      beforFooterIsEmpty,
      sectionStyles,
      dontMarkOnHover,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   // let style = { backgroundColor: item.school_room_section.props.bgColor, ...sectionStyles };
   let style = { ...sectionStyles };
   if (item.school_room_section.props.background_type === 'image' && item.school_room_section.props.bgImgSrc) {
      style = {
         backgroundImage: `url(${ item.school_room_section.props.bgImgSrc })`,
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat',
         backgroundPosition: 'center',
         position: 'relative',
      };
   }

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'Section': (!isPreview),
            'offers__section__editor': (!isPreview && !dontMarkOnHover),
            'header__hover': item.school_room_section.name === 'Header' && window.location.pathname.includes('template3'),
            // 'Section': !active || isPreview,
            // 'Section mark': active && !isPreview && !beforFooterIsEmpty && item.school_room_section.name !== 'Main Background' && item.school_room_section.name !== 'Hero',
            // 'mark-header': active && isHeader && !isPreview,
            [`${ item.school_room_section.props.duplicated }`]: item.school_room_section.props.duplicated !== 'header',
            [`${ className }`]: !!className,
         }) }
         onClick={ beforFooterIsEmpty ? () => {} : (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ style }
      >
         {children}
      </div>
   );
};


Section.defaultProps = {
   sectionStyles: {},
};

Section.propTypes = {
   className: PropTypes.string,
   item: PropTypes.object,
   children: PropTypes.any,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   slug: PropTypes.string,
   isHeader: PropTypes.bool,
   beforFooterIsEmpty: PropTypes.bool,
   sectionStyles: PropTypes.object,
   dontMarkOnHover: PropTypes.bool,
};

export default Section;
