import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import UpsellViewImage from '../../View/Image';
import UpsellViewProduct from '../../View/Product';
import UpsellViewText from '../../View/Text';
import UpsellViewPricing from '../../View/Pricing';
import UpsellViewButton from '../../View/Button';
import UpsellViewGuarantee from '../../View/Guarantee';
import UpsellViewContact from '../../View/Contact';

const UpsellPreview = ({
   section, data, isPreview, selectItem, sectionIndex,
}) => {
   const [active, setActive] = useState(false);
   const toggle = e => {
      setActive(toggleHighlighted(e, active));
   };
   const getCurrentItem = (type) => {
      switch (type) {
         case 'image':
            return UpsellViewImage;
         case 'product':
            return UpsellViewProduct;
         case 'text':
            return UpsellViewText;
         case 'pricing':
            return UpsellViewPricing;
         case 'button':
            return UpsellViewButton;
         case 'guarantee':
            return UpsellViewGuarantee;
         case 'contactBottom':
            return UpsellViewContact;
         default:
            return null;
      }
   };
   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         className={ classNames({
            'upsell__section__top': true,
         }) }
         onMouseOver={ toggle }
         onMouseOut={ toggle }
         onClick={ (e) => {
            if (!isPreview) {
               selectItem(e, sectionIndex);
            }
         } }
         role='presentation'
         style={ { background: section.upsell_section.props.bgColor } }
      >
         {section.upsell_components.map((e, index) => {
            const Component = getCurrentItem(e.type);
            if (!Component) {
               return (
                  <div>
                        undefined
                  </div>
               );
            }
            return (
               <div className='upsell__section__top__item'>
                  <Component
                     { ...e.props }
                     isPreview={ isPreview }
                     selectItem={ () => {} }
                     subcomponents={ e.subcomponents || e.subcomponent }
                     index={ index }
                     data={ data }
                     sectionIndex={ sectionIndex }
                  />
               </div>
            );
         })}
      </div>
   );
};

UpsellPreview.propTypes = {
   data: PropTypes.object,
   sectionIndex: PropTypes.number,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.func,
   section: PropTypes.object,
};

export default UpsellPreview;
