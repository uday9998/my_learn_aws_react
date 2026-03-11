import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AffiliateViewForm = (props) => {
   const {
      paddingTop, paddingBottom, paddingLeft, paddingRight, type, textAlign, isPreview, selectItem, index,
      sectionIndex, color, linksColor = '#24554E'
   } = props;
   const [active, setActive] = useState(false);

   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         className={ classNames({
            'affiliate_view_form': !active || isPreview,
            'mark affiliate_view_form': active && !isPreview,
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
            textAlign,
            gap: '4px',
            '*': { color },
         } }
      >
         <style>
            {`
               .affiliate_view_form .input__default__label,
               .affiliate_view_form input,
               .affiliate_view_form .affiliate__sign__accept__text div {
                  color: ${ color } !important;
               }
            `}
         </style>
         {type === 'signin' && (
            <SignInForm />
         )}
         {type === 'signup' && (
            <SignUpForm linksColor={ linksColor } />
         )}
      </div>
   );
};

AffiliateViewForm.propTypes = {
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   textAlign: PropTypes.string,
   isPreview: PropTypes.bool,
   index: PropTypes.number,
   selectItem: PropTypes.func,
   type: PropTypes.string,
   sectionIndex: PropTypes.number,
   color: PropTypes.string,
   linksColor: PropTypes.string,
};

export default AffiliateViewForm;
