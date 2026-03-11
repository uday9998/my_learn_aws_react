/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import AffiliateViewText from '../Text';

const AffiliateViewContact = (props) => {
   const {
      subcomponents, isPreview, selectItem, index, sectionIndex, changeSubProp,
   } = props;
   const [active, setActive] = useState(false);
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
         className={ classNames({
            '': !active || isPreview,
            'mark': active && !isPreview,
         }) }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <div
            className='affiliate__view__contact'
         >
            {subcomponents && subcomponents.map((e, i) => {
               return (
                  <AffiliateViewText
                     { ...e.props }
                     selectItem={ (event) => {
                        if (!isPreview) {
                           selectItem(event, sectionIndex, index, i);
                        }
                     } }
                     isPreview={ isPreview }
                     changeProp={ (value, name) => changeSubProp(value, name, 'subComponent', sectionIndex, index, i) }
                  />
               );
            })}
         </div>
      </div>
   );
};

AffiliateViewContact.propTypes = {
   subcomponents: PropTypes.array,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.object,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
   changeSubProp: PropTypes.func,
};

export default AffiliateViewContact;
