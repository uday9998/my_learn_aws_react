import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import background from 'assets/images/plan/banner.png';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import template1Img from 'assets/images/UpsellTemplates/template1.png';
import template1Preview from 'assets/images/UpsellTemplates/template1Preview.png';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import IconNew from 'components/elements/iconsSize';

const UpsellCreateCheckout = ({
   selectedTemplate, changeTemplate, onPreview, onEdit, onCreate, isEdit, isDownSell,
   onPrevious,
}) => {
   const [isHidenTop, setIsHidenTop] = React.useState(false);
   const checkoutTemplates = [
      {
         name: 'Template one',
         id: 1,
         img: template1Img,
         preview: template1Preview,
      },
   ];
   const [selected, setSelected] = React.useState(checkoutTemplates[0]);
   return (
      <div className='upsell__create__checkout'>
         {!isHidenTop && (
            <div className='upsell__create__checkout__top'>
               <img src={ background } alt='' className='upsell__create__checkout__top__background' />
               <div className='upsell__create__checkout__top__right'>
                  <div>
                     <Text
                        inner={ `${ isDownSell ? 'Downsell' : 'Upsell' } Templates` }
                        type={ types.medium153 }
                        size={ sizes.xxlarge }
                     />
                     <Text
                        inner='Offer users additional add on products'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  </div>
                  <Button
                     text='Got it'
                     theme={ btnThemes.secondary }
                     onClick={ () => setIsHidenTop(true) }
                  />
               </div>
            </div>
         )}
         <div className='upsell__create__checkout__templates'>
            <Text
               inner={ `Select ${ isDownSell ? 'Downsell' : 'Upsell' } Template` }
               type={ types.mediumLarge }
               size={ sizes.xlarge }
            />
            <div className='upsell__create__checkout__templates__view'>
               <div className='left'>
                  <Text
                     inner='Templates'
                     miniText={ checkoutTemplates.length }
                     type={ types.regular160 }
                     size={ sizes.xlarge }
                  />
                  <div />
                  {checkoutTemplates.map((e) => {
                     return (
                        <div className={ `left__item${ e.id === selectedTemplate ? ' left__item__active' : '' }` } role='presentation' onClick={ () => setSelected(e) }>
                           <img src={ e.img } alt='' />
                           <div className='left__item__bottom'>
                              <CheckboxCircle
                                 isChecked={ e.id === selectedTemplate }
                                 label={ e.name }
                                 onCheck={ () => setSelected(e) }
                              />
                           </div>
                        </div>
                     );
                  })}
               </div>
               <div className='right'>
                  <div className='right__top'>
                     <Text
                        inner='Preview'
                        type={ types.regular160 }
                        size={ sizes.xlarge }
                     />
                     <div className='right__top__actions'>
                        {selectedTemplate === selected.id && (
                           <div className='right__top__actions__button' role='presentation' onClick={ () => onEdit(selected.name) }>
                              <IconNew name='CheckoutEditM' />
                           </div>
                        )}
                        <div className='right__top__actions__button' role='presentation' onClick={ () => onPreview(selected.name) }>
                           <IconNew name='CheckoutPreviewM' />
                        </div>
                        <Button
                           text='Applied'
                           disabled={ selectedTemplate === selected.id }
                           onClick={ () => changeTemplate(selected.id) }
                        />
                     </div>
                  </div>
                  <img src={ selected.preview } alt='' />
               </div>
            </div>
            <div className='upsell__checkout__buttons'>
               <Button
                  text='Previous'
                  theme={ btnThemes.secondary }
                  onClick={ () => onPrevious() }
               />
               {isDownSell ? (
                  <Button
                     text={ isEdit ? 'Save Downsell Page' : 'Create Downsell Page' }
                     style={ { marginLeft: 'auto' } }
                     onClick={ () => onCreate() }
                  />
               ) : (
                  <Button
                     text={ isEdit ? 'Save Upsell Page' : 'Create Upsell Page' }
                     onClick={ () => onCreate() }
                  />

               )}
            </div>
         </div>
      </div>
   );
};

UpsellCreateCheckout.propTypes = {
   selectedTemplate: PropTypes.number,
   onPreview: PropTypes.func,
   changeTemplate: PropTypes.func,
   onEdit: PropTypes.func,
   isDownSell: PropTypes.bool,
   isEdit: PropTypes.bool,
   onCreate: PropTypes.func,
   onPrevious: PropTypes.func,
};

export default UpsellCreateCheckout;
