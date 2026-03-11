/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import UpsellViewText from '../Text';

const UpsellViewContact = (props) => {
   const {
      subcomponents, isPreview, selectItem, index, sectionIndex, changeSubProp,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = e => {
      setActive(toggleHighlighted(e, active));
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
         onMouseOver={ toggle }
         onMouseOut={ toggle }
      >
         <div
            className='upsell__view__contact'
         >
            {subcomponents.map((e, i) => {
               return (
                  <UpsellViewText
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

UpsellViewContact.propTypes = {
   subcomponents: PropTypes.array,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.object,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
   changeSubProp: PropTypes.func,
};

export default UpsellViewContact;
