import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Line from 'components/elements/Line';
import UpsellEmpty from './components/UpsellEmpty';
import UpsellPlanItem from './components/UpsellPlanItem';

const UpsellPlan = ({
   plan, goToCreatePage, deleteUpsell, onDownsell, deleteDownsell, changeDownsellStatus, onPreviewUpsell,
   goToUpsellEdit, goToDownsellEdit, goToDownsellPreview,
}) => {
   return (
      <div className='plan__upsell'>
         {plan.upsells.length > 0 ? (
            <div className='plan__upsell__view'>
               <div className='plan__upsell__view__top'>
                  <Text
                     inner='Your Upsells for this Plan'
                     type={ types.medium153 }
                     size={ sizes.large }
                  />
                  <Text
                     inner='An Upsell is an additional and optional Offer that members can also purchase. It is prompted to members after they finish purchasing your initial Offer.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
               <div className='plan__upsell__view__bottom'>
                  {plan.upsells.map((upsell) => {
                     return (
                        <UpsellPlanItem
                           downsell={ upsell.downsell }
                           onEdit={ () => goToUpsellEdit(upsell.id) }
                           changeDownsellStatus={ changeDownsellStatus }
                           price={ upsell.pricing?.price || '$0.00' }
                           deleteDownsell={ deleteDownsell }
                           name={ upsell.headline }
                           goToDownsellPreview={ goToDownsellPreview }
                           goToDownsellEdit={ goToDownsellEdit }
                           image={ upsell.offer.file ? upsell.offer.file.src : null }
                           isActive={ true }
                           onDownsell={ () => onDownsell(upsell.id, upsell.offer.id) }
                           onPreview={ () => onPreviewUpsell(upsell.id) }
                           onDelete={ (callBack) => deleteUpsell(upsell.id, callBack) }
                        />
                     );
                  })}
               </div>
               <Line />
               <div className='plan__upsell__view__button__wrapper'>
                  <Button
                     text='Add One More Upsell'
                     iconName='plusNew'
                     theme={ themes.secondary }
                     isIconRight={ true }
                     onClick={ () => goToCreatePage() }
                  />
               </div>
            </div>
         ) : (
            <UpsellEmpty
               goToCreatePage={ goToCreatePage }
            />
         )}
      </div>
   );
};

UpsellPlan.propTypes = {
   goToCreatePage: PropTypes.func,
   onDownsell: PropTypes.func,
   plan: PropTypes.object,
   deleteDownsell: PropTypes.func,
   deleteUpsell: PropTypes.func,
   changeDownsellStatus: PropTypes.func,
   onPreviewUpsell: PropTypes.func,
   goToDownsellEdit: PropTypes.func,
   goToDownsellPreview: PropTypes.func,
   goToUpsellEdit: PropTypes.func,
};

export default UpsellPlan;
