import React from 'react';
import Text, { SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import { uniqueId } from 'lodash';
import BaseButton, { THEMES as btnThemes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';

const PlanTemplate = ({
   type, isActive, price, functions = [], currentPlan, isUpgradeButton, onSelectPlan, isNotSpecialPlans,
}) => {
   return (
      <div className='plan__template'>
         <div className={ `plan__template__top plan__template__top__${ type }` }>
            <Text
               inner={ `${ type } Plan` }
               type={ txtTypes.mediumSmall }
               size={ txtSize.large }
               className='plan__template__top__title'
            />
            <div className='plan__template__top__price'>
               <Text
                  inner={ isNotSpecialPlans() ? `$${ price }` : 'LIFETIME' }
                  type={ txtTypes.medium }
                  style={ { fontSize: '40px' } }
                  size='2xlarge'
               />
               {isNotSpecialPlans() && (
                  <Text
                     inner='/mo'
                     size={ txtSize.xlarge }
                     type={ txtTypes.regular160 }
                  />
               )}
            </div>

            <div className='plan__template__top__price_yearly'>
               {isNotSpecialPlans() && (
                  <>
                     <Text
                        inner={ `$${ price * 12 }` }
                        type={ txtTypes.medium }
                        size={ txtSize.small }
                     />
                     <Text
                        inner='per year'
                        size={ txtSize.small14 }
                        type={ txtTypes.regularDefault }
                        style={ { color: '#F8FAFA' } }
                     />
                  </>
               )}
            </div>

            {isActive && (
               <div className='plan__template__top__current'>
                  <Text
                     inner='Current Plan'
                     type={ txtTypes.regular148 }
                     size={ txtSize.xsmall }
                     style={ { color: '#fff' } }
                  />
               </div>
            )}
         </div>
         <div className='plan__template__middle'>
            <div className='plan__template__middle__functions'>
               {type !== 'Essential' && (
                  <Text
                     inner={ `Includes Everything In ${ type === 'Surge' ? 'Essential Plan' : 'Surge Plan' } Plus:` }
                     type={ txtTypes.regular148 }
                     size={ txtSize.medium }
                     style={ { marginBottom: '4px' } }
                  />
               )}
               {functions.map((item) => {
                  return (
                     <div
                        key={ uniqueId() }
                        className={ `plan__template__middle__functions__item plan__template__middle__functions__item__${ type }` }
                     >
                        <div className='circle' />
                        <Text
                           inner={ item }
                           type={ txtTypes.regular148 }
                           size={ txtSize.medium }
                        />
                     </div>
                  );
               })}

            </div>
            {isNotSpecialPlans() && (
               <>
                  {currentPlan ? (
                     <>
                        {(isUpgradeButton || isActive) && (
                           <BaseButton
                              text={ isActive ? 'Current Plan' : `${ isUpgradeButton ? 'Upgrade' : 'Downgrade' } to ${ type }` }
                              theme={ isUpgradeButton ? btnThemes.primary : btnThemes.secondary }
                              size={ btnSizes.small }
                              onClick={ () => onSelectPlan() }
                              disabled={ isActive }
                              style={ {
                                 maxWidth: 'min-content',
                              } }
                           />
                        )}
                     </>
                  ) : (
                     <BaseButton
                        text={ `Choose ${ type }` }
                        onClick={ () => onSelectPlan() }
                        theme={ type === 'Launch' ? btnThemes.secondary : btnThemes.primary }
                        size={ btnSizes.small }
                        disabled={ isActive }
                        style={ { maxWidth: 'min-content' } }
                     />
                  )}
               </>
            )}
         </div>
      </div>
   );
};

PlanTemplate.defaultProps = {
   isNotSpecialPlans: () => { return true; },
};

PlanTemplate.propTypes = {
   type: PropTypes.string,
   isActive: PropTypes.bool,
   functions: PropTypes.array,
   price: PropTypes.number,
   currentPlan: PropTypes.object,
   isUpgradeButton: PropTypes.bool,
   onSelectPlan: PropTypes.func,
   isNotSpecialPlans: PropTypes.func,
};

export default PlanTemplate;
