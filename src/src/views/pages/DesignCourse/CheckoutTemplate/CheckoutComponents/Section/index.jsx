import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.css';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { isLight } from 'utils/pageBuilder/schoolRoomColor';

export const checkLightOrDark = (sections, templateName) => {
   if (templateName !== 'template7') {
      if (sections && sections[0]?.checkout_section.props.bgColor && isLight(sections[0]?.checkout_section.props.bgColor)) {
         return sections[1]?.checkout_section.props.bgColor || '#F0F2F2';
      }
   
      return 'var(--mainBg005)';
   } 
   return 'transparent';
};

const Section = (props) => {
   const {
      slug, className, children, item, onClick, isPreview, templateName, sections, newTemplateLeftBackground,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const siteInfo = useSelector(siteInfoSelector);
   const backgroundColor = templateName === 'template4' || templateName === 'template7'
      ? item.checkout_section.props.bgColor || siteInfo.active_school_room.school_bg_color
      : item.checkout_section.props.bgColor;

   let style = {
      background: newTemplateLeftBackground
         || (
            templateName !== 'template4' && templateName !== 'template7'
               ? backgroundColor
               : item.checkout_section.name === 'Left Side' ? checkLightOrDark(sections) : backgroundColor
         ),
   };

   if (item.checkout_section.props.background_type === 'image' && item.checkout_section.props.bgImgSrc) {
      style = {
         backgroundImage: `url(${ item.checkout_section.props.bgImgSrc })`,
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
            'Section': !active || isPreview,
            'Section mark': active && !isPreview && item.checkout_section.props.duplicated !== 'main_background',
            [`${ className }`]: !!className,
            'paymentSection': item.checkout_section.props.duplicated === 'payment_section',
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         // onMouseOver={ toggle }
         // onMouseOut={ toggle }
         style={ { 
            ...style,
            borderRadius: item.checkout_section.name === 'Left Side'
               && (templateName !== 'template2' && templateName !== 'template3')
               && '32px',
         } }
      >
         {children}
      </div>
   );
};


Section.defaultProps = {
};

Section.propTypes = {
   className: PropTypes.string,
   item: PropTypes.object,
   children: PropTypes.any,
   onClick: PropTypes.func,
   isPreview: PropTypes.bool,
   slug: PropTypes.string,
   templateName: PropTypes.string,
   sections: PropTypes.array,
   newTemplateLeftBackground: PropTypes.string,
};

export default Section;
