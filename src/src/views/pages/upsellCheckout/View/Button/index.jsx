/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import UpsellInlineEditor from '../InlineEditor';

const UpsellViewButton = (props) => {
   const [active, setActive] = useState(false);
   const {
      inner, margin, isPreview, selectItem, index,
      width, paddingBottom, paddingTop, paddingLeft, paddingRight,
      justifyContent, background, color, visibility, sectionIndex,
      changeProp,
   } = props;
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   return (
      <div
         role='presentation'
         onClick={ (e) => {
            if (!isPreview) {
               selectItem(e, sectionIndex, index);
            }
         } }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         style={ {
            width: '100%',
            justifyContent,
            display: visibility ? 'flex' : 'none',

         } }
         className={ classNames({
            '': !active || isPreview,
            'mark': active && !isPreview,
         }) }
      >
         <div
            style={ {
               margin,
               paddingTop: `${ paddingTop }px`,
               width: `${ width }%`,
               paddingBottom: `${ paddingBottom }px`,
               background,
               color,
               paddingLeft: `${ paddingLeft }px`,
               paddingRight: `${ paddingRight }px`,
            } }
            className='upsell__view__button'
         >
            {isPreview ? (
               <>{inner}</>
            ) : (
               <UpsellInlineEditor
                  text={ inner }
                  onChange={ (e) => {
                     if (e.length <= 30) {
                        changeProp(e, 'inner');
                     }
                  } }
               />
            )}
         </div>
         {/* <Button
            theme={ theme }
            text={ inner }
            style={ {
               margin,
               paddingTop: `${ paddingTop }px`,
               width: `${ width }%`,
               paddingBottom: `${ paddingBottom }px`,
               background,
               color,
               paddingLeft: `${ paddingLeft }px`,
               paddingRight: `${ paddingRight }px`,
            } }
         /> */}
      </div>
   );
};

UpsellViewButton.propTypes = {
   inner: PropTypes.string,
   selectItem: PropTypes.func,
   index: PropTypes.number,
   margin: PropTypes.string,
   isPreview: PropTypes.bool,
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   background: PropTypes.string,
   color: PropTypes.string,
   width: PropTypes.string,
   justifyContent: PropTypes.string,
   visibility: PropTypes.bool,
   sectionIndex: PropTypes.number,
   changeProp: PropTypes.func,
};

export default UpsellViewButton;
