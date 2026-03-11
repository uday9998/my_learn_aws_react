import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';

const UpsellCheckoutHeader = ({
   goBack, selectedMod, setSelectedMod, handleUndo, handleRedo, handlePreview, handleSave, isDownSell,
}) => {
   return (
      <div className='upsell__checkout__header'>
         <div className='upsell__checkout__header__left'>
            <div
               role='presentation'
               onClick={ () => goBack() }
               className='upsell__checkout__header__left__icon'
            >
               <IconNew name='arrowLeftL' />
            </div>
            <Text
               inner={ `Edit ${ isDownSell ? 'Downsell' : 'Upsell' } Page` }
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
         </div>
         <div className='upsell__checkout__header__mods'>
            <div className={ `upsell__checkout__header__mod${ selectedMod === 'desktop' ? ' upsell__checkout__header__mod__active' : '' }` } role='presentation' onClick={ () => setSelectedMod('desktop') }>
               <IconNew name='CheckoutDesktopM' />
            </div>
            {/* <div className={ `upsell__checkout__header__mod${ selectedMod === 'tablet' ? ' upsell__checkout__header__mod__active' : '' }` } role='presentation' onClick={ () => setSelectedMod('tablet') }>
               <IconNew name='CheckoutTabletM' />
            </div> */}
            <div className={ `upsell__checkout__header__mod${ selectedMod === 'phone' ? ' upsell__checkout__header__mod__active' : '' }` } role='presentation' onClick={ () => setSelectedMod('phone') }>
               <IconNew name='CheckoutPhoneM' />
            </div>
         </div>
         <div className='upsell__checkout__header__actions'>
            <div className='undoredo'>
               <div
                  className='undoredo__button'
                  role='presentation'
                  onClick={ () => handleUndo() }
               >
                  <IconNew
                     name='CheckoutUndoM'
                  />
               </div>
               <div
                  role='presentation'
                  onClick={ () => handleRedo() }
                  className='undoredo__button'
               >
                  <IconNew
                     name='CheckoutRedoM'
                  />
               </div>
            </div>
            <div className='liner' />
            <Button
               iconName='CheckoutActiveEyeM'
               isIconRight={ true }
               text='Preview Checkout'
               theme={ themes.secondary }
               size={ btnSizes.small }
               style={ { maxHeight: '36px' } }
               onClick={ () => handlePreview() }
            />
            {/* <Button
               text='Save'
               theme={ themes.secondary }
               size={ btnSizes.small }
               style={ { maxHeight: '36px' } }
               onClick={ () => handleSave() }
            /> */}
            <Button
               text='Save & Exit'
               size={ btnSizes.small }
               style={ { maxHeight: '36px' } }
               onClick={ () => handleSave(true) }
            />
         </div>
      </div>
   );
};

UpsellCheckoutHeader.propTypes = {
   goBack: PropTypes.func,
   handleUndo: PropTypes.func,
   handleRedo: PropTypes.func,
   setSelectedMod: PropTypes.func,
   selectedMod: PropTypes.string,
   isDownSell: PropTypes.bool,
   handlePreview: PropTypes.func,
   handleSave: PropTypes.func,
};

export default UpsellCheckoutHeader;
