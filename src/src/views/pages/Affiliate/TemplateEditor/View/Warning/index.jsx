import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AffiliateFrontContext } from 'containers/pages/affiliate/login';

const AffiliateViewWarning = (props) => {
   const {
      paddingTop, paddingBottom, paddingLeft, paddingRight, type, textAlign, isPreview, selectItem, index,
      sectionIndex, color,
   } = props;
   const [active, setActive] = useState(false);
   const { isLive } = React.useContext(AffiliateFrontContext);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const text = {
      'signin': "Don't have an account?",
      'signup': 'Already have an account?',
   };
   const signText = {
      'signin': 'Sign Up',
      'signup': 'Sign In',
   };

   const urls = {
      'signin': '/affiliate/register',
      'signup': '/affiliate/login',
   };

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         className={ classNames({
            'affiliate_view_warning': !active || isPreview,
            'mark affiliate_view_warning': active && !isPreview,
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
         } }
      >
         <Text
            inner={ text[type] }
            style={ { color, marginRight: '4px' } }
            type={ types.regular148 }
            size={ sizes.medium }
         />
         {isLive ? (
            <Link to={ urls[type] }>
               <Text
                  inner={ signText[type] }
                  style={ { color, cursor: 'pointer' } }
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
            </Link>
         ) : (
            <Text
               inner={ signText[type] }
               style={ { color, cursor: 'pointer' } }
               type={ types.regular148 }
               size={ sizes.medium }
            />
         )}

      </div>
   );
};

AffiliateViewWarning.propTypes = {
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   textAlign: PropTypes.string,
   isPreview: PropTypes.bool,
   index: PropTypes.number,
   selectItem: PropTypes.func,
   type: PropTypes.string,
   color: PropTypes.string,
   sectionIndex: PropTypes.number,
};

export default AffiliateViewWarning;
