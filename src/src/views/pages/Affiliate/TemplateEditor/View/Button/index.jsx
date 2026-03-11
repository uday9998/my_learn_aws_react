/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import { AffiliateFrontContext } from 'containers/pages/affiliate/login';
import AffiliateInlineEditor from '../InlineEditor';

const AffiliateViewButton = (props) => {
   const [active, setActive] = useState(false);
   const { onSubmit, disabledButton } = React.useContext(AffiliateFrontContext);
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
               return;
            }
            if (!disabledButton) {
               onSubmit();
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
               opacity: disabledButton ? 0.3 : 1,
               color,
               paddingLeft: `${ paddingLeft }px`,
               paddingRight: `${ paddingRight }px`,
               cursor: 'pointer',
            } }
            className='affiliate__view__button'
         >
            {isPreview ? (
               <div dangerouslySetInnerHTML={ { __html: inner } } />
            ) : (
               <AffiliateInlineEditor
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

AffiliateViewButton.propTypes = {
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

export default AffiliateViewButton;
