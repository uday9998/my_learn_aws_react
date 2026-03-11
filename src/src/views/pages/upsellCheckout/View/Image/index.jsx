/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';

const UpsellViewImage = (props) => {
   const {
      image_src: src, isPreview, selectItem, index,
      paddingTop, paddingBottom, paddingLeft, paddingRight,
      width, borderRadius, visibility, justifyContent, sectionIndex,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   return (
      <div
         onClick={ (e) => {
            if (!isPreview) {
               selectItem(e, sectionIndex, index);
            }
         } }
         role='presentation'
         style={ {
            margin: '0px auto',
            maxWidth: 'max-content',
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
            display: visibility ? 'flex' : 'none`1',
            justifyContent,

         } }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         className={ classNames({
            '': !active || isPreview,
            'mark': active && !isPreview,
         }) }
      >
         {src ? (
            <img
               src={ src }
               alt=''
               style={ {
                  width: `${ width }%`,
                  borderRadius: `${ borderRadius }%`,
               } }
            />
         ) : (
            <IconNew name='UpsellLogoM' />
         )}
      </div>
   );
};

UpsellViewImage.propTypes = {
   image_src: PropTypes.string,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.func,
   index: PropTypes.number,
   justifyContent: PropTypes.string,
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   width: PropTypes.any,
   borderRadius: PropTypes.any,
   visibility: PropTypes.bool,
   sectionIndex: PropTypes.number,
};

export default UpsellViewImage;
