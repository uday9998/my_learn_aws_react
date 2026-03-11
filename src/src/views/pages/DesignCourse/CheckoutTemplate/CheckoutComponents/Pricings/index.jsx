/* eslint-disable */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import PropTypes from 'prop-types';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import classNames from 'classnames';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import RadioBox from 'components/elements/form/RadioNew';

import './style.scss';


const Pricings = ({
   data,
   slug,
   onClick,
   isPreview,
   bgColor,
   notChosenBgColor,
   type,
   templateName,
   sections
}) => {
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   const siteInfo = useSelector(siteInfoSelector)

   if (data.length === 0) return null;

   const getPricing = (pricing, templateName) => {
      let pricingnew = `${ pricing?.price?.toFixed(2) } ${ pricing.currency }`;

      if (pricing.pricing_type === 2) {
         pricingnew = `${ pricingnew } / ${ pricing.payment_frequence }`;
      } else if(pricing.pricing_type === 0) {
         pricingnew = 'Free';
      }

      return pricingnew;
   };

   return (
      <div
         className='pricings_wrapper'
      >
         {
            data.map((item, idx) => {
               if(type === '2') {
                  return (
                     <div
                        role='presentation'
                        className={ classNames({
                           'pricing_item type_2': true,
                           'active': idx === 0,
                           'mark': active && !isPreview,
                        }) }
                        style={ {
                           backgroundColor: idx === 0 ? bgColor : notChosenBgColor,
                        } }
                        onClick={ (e) => { onClick(e); }}
                        data-slug={ slug }
                        id={ slug }
                        onMouseEnter={ (e) => toggle(e, 'enter') }
                        onMouseLeave={ (e) => toggle(e, 'leave') }
                     >
                        <div className="row_between">
                           <div className='radio_price_name_wrapper'>
                              <RadioBox
                                 checked={ idx === 0 }
                                 onChange={ () => {} }
                                 label=''
                              />

                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.base }
                                 color='#ffff'
                                 inner={ item.name }
                              />
                           </div>
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.extraLarge40 }
                              color='#ffff'
                              inner={ getPricing(item) }
                              className='type_2_price'
                           />
                        </div>
                     </div>
                  )
               } else if(templateName === 'template7') {
                  return (
                     <div
                        role='presentation'
                        className={ classNames({
                           'pricing_item_template7': true,
                           'active': idx === 0,
                           'mark': active && !isPreview,
                        }) }
                        style={ {
                           backgroundColor: idx === 0 ? bgColor : notChosenBgColor,
                           maxWidth: '100%'
                        } }
                        onClick={ (e) => { onClick(e); } }
                        data-slug={ slug }
                        id={ slug }
                        onMouseOver={ (e) => toggle(e, 'enter') }
                        onMouseOut={ (e) => toggle(e, 'leave') }
                     >
                        <div className='settings__wrapper'>
                           <div className='radio__wrapper'>
                              <div className={idx !== 0 ? 'disabled' : ''}>
                                 <RadioBox
                                    checked={ idx === 0 }
                                    onChange={ () => {} }
                                    label=''
                                    borderColor={ sections[2].checkout_components[11]?.props.bgColor 
                                       ? sections[2].checkout_components[11]?.props.bgColor 
                                       : siteInfo.active_school_room.school_color }
                                 />
                              </div>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.extraSmall }
                                 color='#131F1E'
                                 inner={ item.name }
                              />
                           </div>
                           <div>
                              <Text
                                 type={ TextType.regular }
                                 inner={ getPricing(item, templateName) }
                                 style={{
                                    fontSize: '16px',
                                    color: '#131F1E',
                                    fontWeight: 'bold'
                                 }}
                              />
                           </div>
                        </div>
                        {/* <div className='row_between'>
                           <div className='price'>{ getPricing(item) }</div>
                           <RadioBox
                              checked={ idx === 0 }
                              onChange={ () => {} }
                              label=''
                           />
                        </div>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           color='#131F1E'
                           inner={ item.name }
                        /> */}
                     </div>
                  )
               } else {
                  return (
                     <div
                        role='presentation'
                        className={ classNames({
                           'pricing_item': true,
                           'active': idx === 0,
                           'mark': active && !isPreview,
                        }) }
                        style={ {
                           backgroundColor: idx === 0 ? bgColor : notChosenBgColor,
                        } }
                        onClick={ (e) => { onClick(e); }}
                        data-slug={ slug }
                        id={ slug }
                        onMouseOver={ (e) => toggle(e, 'enter')}
                        onMouseOut={ (e) => toggle(e, 'leave')}
                     >
                        <div className='row_between'>
                           <div className='price'>{ getPricing(item) }</div>
                           <RadioBox
                              checked={ idx === 0 }
                              onChange={ () => {} }
                              label=''
                           />
                        </div>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.extraSmall }
                           color='#131F1E'
                           inner={ item.name }
                        />
                     </div>
                  )
               }
            })
         }
      </div>
   );
};

Pricings.propTypes = {
   data: PropTypes.array,
   slug: PropTypes.string,
   onClick: PropTypes.func,
   isPreview: PropTypes.array,
   bgColor: PropTypes.string,
   notChosenBgColor: PropTypes.string,
   type: PropTypes.string,
   templateName: PropTypes.string,
   sections: PropTypes.object
};

export default Pricings;
