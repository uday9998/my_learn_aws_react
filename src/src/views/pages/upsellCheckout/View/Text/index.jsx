import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import IconNew from 'components/elements/iconsSize';
import useAutosizeTextArea from 'utils/useAutosizeTextArea';
import Text, { TYPES as types } from 'components/elements/TextNew';
import UpsellInlineEditor from '../InlineEditor';

const UpsellViewText = (props) => {
   const {
      paddingTop, paddingBottom, paddingLeft, paddingRight, text, fontSize, fontWeight, lineHeight, textAlign, color = '#131F1E', isPreview, selectItem, index,
      bgColor, width, isIconText, iconColor, iconName, sectionIndex, changeProp,
   } = props;
   const [active, setActive] = useState(false);
   const textAreaRefText = useRef(null);
   useAutosizeTextArea(textAreaRefText.current, text);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         className={ classNames({
            'upsell__view__text': !active || isPreview,
            'upsell__view__text mark': active && !isPreview,
            'upsell__view__text__flex': isIconText,
         }) }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         onClick={ (e) => {
            if (!isPreview) {
               selectItem(e, sectionIndex, index);
            }
         } }
         role='presentation'
         style={ {
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
            backgroundColor: bgColor,
            width: `${ width }%`,
            textAlign,
         } }
      >
         {isIconText && (
            <IconNew name={ iconName } color={ iconColor } />
         )}
         {isPreview ? (
            <Text
               inner={ text }
               type={ types.mediumSmall }
               style={ {
                  fontSize: `${ fontSize }px`, fontWeight, lineHeight: `${ lineHeight }%`, color,
               } }
            />
         ) : (
            <UpsellInlineEditor
               text={ text }
               fontSize={ fontSize }
               fontWeight={ fontWeight }
               lineHeight={ lineHeight }
               color={ color }
               onChange={ (e) => {
                  changeProp(e, 'text');
               } }
            />
         )}
      </div>
   );
};

UpsellViewText.propTypes = {
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   text: PropTypes.string,
   lineHeight: PropTypes.string,
   fontWeight: PropTypes.string,
   textAlign: PropTypes.string,
   color: PropTypes.string,
   fontSize: PropTypes.string,
   isPreview: PropTypes.bool,
   index: PropTypes.number,
   selectItem: PropTypes.func,
   bgColor: PropTypes.string,
   width: PropTypes.any,
   sectionIndex: PropTypes.number,
   isIconText: PropTypes.any,
   iconColor: PropTypes.string,
   iconName: PropTypes.string,
   changeProp: PropTypes.func,
};

export default UpsellViewText;
