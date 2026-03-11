import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';
import badge from 'assets/images/plans/badge.png';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';

const PlanCard = ({
   popular, active, title, price, orders, annually, annuallyPrice, style,
   ordersTitle, hasPrice, openPlanModal, hasPriceGetStarted, name,
   setupdateCardModalOpen, isConnect, updateModalPlanName,
}) => {
   // eslint-disable-next-line no-nested-ternary
   const notActiveText = hasPrice ? (hasPriceGetStarted ? 'Get Started' : 'Connect To Plan') : 'Contact Us';
   const notActiveColor = (popular && btnTheme.darkBlue) || btnTheme.lightBlue;
   function handeConnectClick() {
      if (active) return;
      if (isConnect) {
         updateModalPlanName();
         setupdateCardModalOpen(true);
      } else {
         openPlanModal();
      }
   }
   return (
      <SelectedWrapper hasShadow active={ active }>
         <div className='planCard' style={ style }>
            <div className='planCard__title'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ title }
               />
            </div>
            {hasPrice ? (
               <div className='planCard__planPrice'>
                  <Text
                     type={ TextType.normal }
                     inner={ annually === 2 ? `$${ annuallyPrice }` : `$${ price }` }
                     className='planPriceValue'
                  />
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.large }
                     inner='/mo'
                     className='planPriceDuration'
                  />
                  {annually === 2 && (
                     <div className='oldPrice'>
                        <span style={ {
                           display: 'flex',
                           justifyContent: 'center',
                           textDecoration: 'none',
                        } }
                        >
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.small }
                              inner={ `$${ price }/mo` }
                           />
                           {/* <Text
                              type={ TextType.regular }
                              size={ TextSize.small }
                              inner={ `$${ parseInt(annuallyPrice / 12, 10) }` }
                              style={ {
                                 paddingLeft: '4px',
                              } }
                           /> */}
                        </span>
                        <Text
                           type={ TextType.regular }
                           size={ TextSize.small }
                           inner='Billed Annually'
                        />
                     </div>
                  )}
               </div>
            ) : (
               <div className='planCard__priceTxt'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner='Advanced features for large teams with complex projects.'
                     color='#8a94a2'
                  />
               </div>
            ) }
            <div className='planCardButton'>
               <BaseButton
                  size={ btnSize.medium }
                  theme={ active ? btnTheme.lightGreen : notActiveColor }
                  text={ active ? 'Connected' : notActiveText }
                  onClick={ handeConnectClick }
               />
            </div>
            <div className='m-b-m'>
               {ordersTitle && (
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner={ ordersTitle }
                  />
               )}
            </div>
            <div className='planCard__ordersList'>
               <div className='m-b-m'>
                  { name === 'miestro-professional-plan-monthly' || name === 'miestro-professional-plan-yearly' ? (
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.extraSmall }
                        inner='Includes Everything In Launch Plus:'
                     />
                  ) : null }
                  { name === 'miestro-business-plan-monthly' || name === 'miestro-business-plan-yearly' ? (
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.extraSmall }
                        inner='Includes Everything In Premium Plus:'
                     />
                  ) : null }
                  { name === 'miestro-starter-plan-monthly' || name === 'miestro-starter-plan-yearly' ? (
                     <Text
                        type={ TextType.regular }
                        size={ TextSize.extraSmall }
                        inner='Includes Everything In Premium Plus:'
                        style={ { visibility: 'hidden' } }
                     />
                  ) : null }
               </div>
               {
                  orders.map((order, index) => {
                     return (
                     // eslint-disable-next-line react/no-array-index-key
                        <div className='planCard__order' key={ index }>
                           <Icon name='Checkmark' />
                           <Text
                              type={ TextType.regular }
                              size={ TextSize.extraSmall }
                              inner={ order }
                           />
                        </div>
                     );
                  })
               }
            </div>
            { popular && (
               <div className='popularLogo'>
                  <img src={ badge } alt='popular' />
               </div>
            )}
         </div>
      </SelectedWrapper>
   );
};

PlanCard.propTypes = {
   popular: PropTypes.bool,
   active: PropTypes.bool,
   title: PropTypes.string,
   price: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
   ]),
   annuallyPrice: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
   ]),
   orders: PropTypes.array,
   annually: PropTypes.number,
   style: PropTypes.object,
   ordersTitle: PropTypes.string,
   hasPrice: PropTypes.bool,
   openPlanModal: PropTypes.func,
   hasPriceGetStarted: PropTypes.bool,
   isConnect: PropTypes.bool,
   setupdateCardModalOpen: PropTypes.func,
   updateModalPlanName: PropTypes.func,
};

PlanCard.defaultProps = {
   popular: false,
   active: false,
   title: 'Title',
   price: 'X price',
   annuallyPrice: 'Y price',
   orders: [],
   annually: 1,
   ordersTitle: '',
   hasPrice: true,
   hasPriceGetStarted: false,
   openPlanModal: () => {},
};

export default PlanCard;
