import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Line from 'components/elements/Line';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';

const UpsellCreateRight = ({
   data, selectedOffer, selectedPrice, isPriceVisible,
}) => {
   return (
      <div className='upsel__create__bottom__right'>
         <div className='upsel__create__bottom__right__top'>
            <Text
               inner='Quick Preview'
               tooltip='asd'
               type={ types.medium150 }
               size={ sizes.medium }
            />
         </div>
         <div className='upsel__create__bottom__right__preview'>
            {selectedOffer ? (
               <div className='upsel__create__bottom__right__preview__offer'>
                  {selectedOffer.file ? (
                     <img src={ selectedOffer.file.src } alt='' />
                  ) : (
                     <div className='default'>
                        <IconNew name='ImageDefaultM' />
                     </div>
                  )}
                  <Text
                     inner={ selectedOffer.name }
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
               </div>
            ) : (
               <div className='upsel__create__bottom__right__preview__empty'>
                  <Text
                     inner='So far there are no products in this upsell'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#444C4B' } }
                  />
               </div>
            )}
            <Line />
            <div className='upsel__create__bottom__right__preview__texts'>
               <Text
                  inner={ data.headline || 'Headline' }
                  type={ types.mediumLarge }
                  size={ sizes.small }
               />
               <Text
                  inner={ data.description || 'Describe your product in the best way...' }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
            <Line />
            <Text
               inner='Order Summary'
               type={ types.regularLarge }
               size={ sizes.large }
            />
            {selectedOffer && (
            <>
               <div className='upsel__create__bottom__right__preview__offerPrice'>
                  <Text
                     inner={ selectedOffer.name }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner={ selectedPrice }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
               <Line />
            </>
            )}
            <div className='upsel__create__bottom__right__preview__price'>
               <Text
                  inner='Price:'
                  type={ types.mediumSmall }
                  size={ sizes.xxlarge }
               />
               <Text
                  inner={ selectedPrice }
                  style={ { color: '#24554E' } }
                  type={ types.mediumSmall }
                  size={ sizes.xxlarge }
               />
            </div>
         </div>
         <div className='upsel__create__bottom__right__button'>
            <Button
               text={ `${ data.purchase_button }${ isPriceVisible ? ` for ${ selectedPrice }` : '' }` }
               onClick={ () => {} }
            />
            <Button
               text={ data.cancel_button }
               theme={ themes.tertiary }
               onClick={ () => {} }
            />
         </div>
      </div>
   );
};

UpsellCreateRight.propTypes = {
   selectedOffer: PropTypes.object,
   data: PropTypes.object,
   isPriceVisible: PropTypes.string,
   selectedPrice: PropTypes.string,
};

export default UpsellCreateRight;
