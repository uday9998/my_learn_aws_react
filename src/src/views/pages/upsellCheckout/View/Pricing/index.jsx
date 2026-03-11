/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import UpsellViewText from '../Text';

const UpsellViewPricing = (props) => {
   const { data: { offerView: product }, data: inputs } = props;
   const {
      // bgColor, margin, 
      subcomponents, isPreview, selectItem, index, sectionIndex, changeSubProp,
   } = props;
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const generateSubComponent = (type) => {
      switch (type) {
         case 'text':
            return UpsellViewText;
         case 'product-price':
            return () => (
               <div className='upsell__view__pricing__price'>
                  <Text
                     inner={ product.name }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner={ inputs.priceToView }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
            );
         case 'due':
            return ({ margin: m }) => (
               <div className='upsell__view__pricing__due' style={ { margin: m } }>
                  <Text
                     inner={ product.name }
                     type={ types.regular148 }
                     size={ sizes.large }
                  />
                  <Text
                     inner={ inputs.priceToView }
                     type={ types.regular148 }
                     size={ sizes.large }
                  />
               </div>
            );
         default:
            return () => (
               <div className='upsell__view__pricing__guarantee'>
                  <TextWithIcon
                     inner='30 Days'
                     type={ types.regularDefault }
                     iconName='MoneyBackGuaranteeM'
                     style={ { color: '#444C4B' } }
                     isIconRight={ true }
                     size={ sizes.small }
                  />
                  <Text
                     inner='Money-Back Guarantee'
                     type={ types.regularDefault }
                     style={ { color: '#444C4B' } }
                     size={ sizes.small }
                  />
               </div>
            );
      }
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
            className='upsell__view__pricing'
         >
            {subcomponents.map((e, i) => {
               const Component = generateSubComponent(e.type);
               return (
                  <Component
                     { ...e.props }
                     selectItem={ (event) => selectItem(event, sectionIndex, index, i) }
                     isPreview={ isPreview }
                     changeProp={ (value, name) => changeSubProp(value, name, 'subComponent', sectionIndex, index, i) }
                  />
               );
            })}
         </div>
         {/* <div className='upsell__view__pricing__guarantee'>
            <TextWithIcon
               inner='30 Days'
               type={ types.regularDefault }
               iconName='MoneyBackGuaranteeM'
               style={ { color: '#444C4B' } }
               isIconRight={ false }
               size={ sizes.small }
            />
            <Text
               inner='Money Back Guarantee'
               type={ types.regularDefault }
               style={ { color: '#444C4B' } }
               size={ sizes.small }
            />
         </div> */}
      </div>
   );
};

UpsellViewPricing.propTypes = {
   data: PropTypes.object,
   bgColor: PropTypes.string,
   subcomponents: PropTypes.array,
   margin: PropTypes.string,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.object,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
   changeSubProp: PropTypes.func,
};

export default UpsellViewPricing;
