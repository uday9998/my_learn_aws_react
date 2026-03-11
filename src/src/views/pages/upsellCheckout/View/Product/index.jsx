/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import defaultCover from 'assets/images/plan/default.png';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';

const UpsellViewProduct = props => {
   const { data: { offerView: product }, data: inputs, isPreview } = props;
   const {
      bgColor, margin, selectItem, index, paddingTop, paddingBottom, paddingLeft, paddingRight,
      sectionIndex,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   return (
      <div
         className={ classNames({
            'upsell__view__product': !active || isPreview,
            'upsell__view__product mark': active && !isPreview,
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
            background: bgColor,
            margin,
            paddingTop: `${ paddingTop }px`,
            paddingBottom: `${ paddingBottom }px`,
            paddingLeft: `${ paddingLeft }px`,
            paddingRight: `${ paddingRight }px`,
         } }
      >
         <div className='upsell__view__product__left'>
            <img src={ product.file ? product.file.src : defaultCover } alt='' />
         </div>
         <div className='upsell__view__product__right'>
            <Text
               inner={ product.name }
               type={ types.mediumLarge }
               size={ sizes.small }
            />
            <TextWithIcon
               iconName='DollarPlanM'
               inner={ inputs.priceToView }
               type={ types.regularDefault }
               generalStyles={ { gap: '8px' } }
               size={ sizes.small }
            />
         </div>
      </div>
   );
};

UpsellViewProduct.propTypes = {
   data: PropTypes.object,
   bgColor: PropTypes.string,
   selectItem: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.any,
   isPreview: PropTypes.bool,
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   margin: PropTypes.string,
};

export default UpsellViewProduct;
