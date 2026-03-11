import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import AffiliateViewImage from '../../View/Image';
import AffiliateViewText from '../../View/Text';
import AffiliateViewButton from '../../View/Button';
import AffiliateViewContact from '../../View/Contact';
import AffiliateViewWarning from '../../View/Warning';
import AffiliateViewForm from '../../View/Form';

const AffiliatePreview = ({
   section, data, isPreview, selectItem, sectionIndex,
}) => {
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const getCurrentItem = (type) => {
      switch (type) {
         case 'image':
            return AffiliateViewImage;
         case 'text':
            return AffiliateViewText;
         case 'button':
            return AffiliateViewButton;
         case 'contactBottom':
            return AffiliateViewContact;
         case 'warning':
            return AffiliateViewWarning;
         case 'form':
            return AffiliateViewForm;
         default:
            return null;
      }
   };
   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         className={ classNames({
            'affiliate__section__top': true,
         }) }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
         onClick={ (e) => {
            if (!isPreview) {
               selectItem(e, sectionIndex);
            }
         } }
         role='presentation'
         style={ { background: section.affiliate_section.props.bgColor } }
      >
         {section.affiliate_components.map((e, index) => {
            const Component = getCurrentItem(e.type);
            if (!Component) {
               return (
                  <div />
               );
            }
            return (
               <div className='affiliate__section__top__item'>
                  <Component
                     { ...e.props }
                     isPreview={ isPreview }
                     selectItem={ () => {} }
                     name={ e.name }
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

AffiliatePreview.propTypes = {
   data: PropTypes.object,
   sectionIndex: PropTypes.number,
   isPreview: PropTypes.bool,
   selectItem: PropTypes.func,
   section: PropTypes.object,
};

export default AffiliatePreview;
