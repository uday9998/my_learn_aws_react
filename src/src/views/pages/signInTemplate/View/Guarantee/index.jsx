import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import UpsellViewText from '../Text';
import './index.scss';

const UpsellViewGuarantee = (props) => {
   const {
      paddingTop, paddingBottom, paddingLeft, paddingRight, index, selectItem,
      background, isPreview, subcomponents, visibility, sectionIndex, changeSubProp,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = e => {
      setActive(toggleHighlighted(e, active));
   };
   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         onMouseOver={ toggle }
         role='presentation'
         onClick={ (event) => {
            if (!isPreview) {
               selectItem(event, sectionIndex, index);
            }
         } }
         onMouseOut={ toggle }
         className={ classNames({
            'upsell__view__guarantee': !active || isPreview,
            'upsell__view__guarantee mark': active && !isPreview,
         }) }
         style={ {
            paddingTop: `${ paddingTop }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingRight: `${ paddingRight }px`,
            background,
            display: visibility ? 'flex' : 'none',
         } }
      >
         {subcomponents.map((e, i) => {
            return (
               <UpsellViewText
                  { ...e.props }
                  isPreview={ isPreview }
                  changeProp={ (value, name) => changeSubProp(value, name, 'subComponent', sectionIndex, index, i) }
                  selectItem={ (event) => {
                     if (!isPreview) {
                        selectItem(event, 0, index, i);
                     }
                  } }
               />
            );
         })}
      </div>
   );
};

UpsellViewGuarantee.propTypes = {
   subcomponents: PropTypes.array,
   visibility: PropTypes.bool,
   selectItem: PropTypes.func,
   index: PropTypes.number,
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   background: PropTypes.string,
   isPreview: PropTypes.bool,
   sectionIndex: PropTypes.number,
   changeSubProp: PropTypes.func,
};

export default UpsellViewGuarantee;
