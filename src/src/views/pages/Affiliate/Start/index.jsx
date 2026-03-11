/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Button from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const AffiliateStartPage = ({ onNextStep }) => {
   const items = [
      {
         color: '#E8F2F1',
         iconName: 'AffiliateStepOneImageL',
         name: 'Choose Offers',
         description: 'Choose which of your offers will be able to be a part of the affiliate program',
      },
      {
         color: '#FFF6D7',
         iconName: 'AffiliateStepSecondImageL',
         name: 'Commissions',
         description: "What will be the affiliate's commission if the offer is sold through his link",
      },
      {
         color: '#FFF1F1',
         iconName: 'AffiliateStepThirdImageL',
         name: 'Affiliate Links',
         links: ['Landing Page Link', 'Portal Link', 'Checkout Page'],
         description: 'Set up all the links that users will see in their affiliate accounts',
      },
      {
         color: '#F1F6FF',
         iconName: 'AffiliateStepFourthImageL',
         name: 'Promotional Materials',
         links: ['Banners', 'Covers', 'Explainer Videos'],
         description: 'Share all your promotional materials with your affiliates as well',
      },
      {
         color: '#FAEBF8',
         iconName: 'AffiliateStepFifthImageL',
         name: 'Documents (Optional)',
         links: ['Texts', 'Scripts'],
         description: 'Share all your promotional materials with your affiliates as well',
      },
   ];
   return (
      <div className='affiliate__start__page'>
         <div className='affiliate__start__page__top'>
            <div className='affiliate__start__page__start'>
               <Text
                  inner='Set up these things to make the affiliate program work properly'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <Text
                  inner='You should be ready to take some time to set up.'
                  type={ types.regular148 }
                  size={ sizes.medium }
                  style={ { color: '#444C4B' } }
               />
            </div>
            <div className='affiliate__start__page__items'>
               {items.map((e, index) => {
                  return (
                     <div className='affiliate__start__page__item' key={ index }>
                        <div
                           style={ { background: e.color } }
                           className='affiliate__start__page__item__logo'
                        >
                           <IconNew name={ e.iconName } />
                        </div>
                        <div className='affiliate__start__page__item__info'>
                           <Text
                              inner={ `${ index + 1 }. ${ e.name }` }
                              type={ types.regular148 }
                              size={ sizes.medium }
                           />
                           <Text
                              inner={ e.description }
                              type={ types.regular148 }
                              size={ sizes.xsmall }
                              style={ { color: '#727978' } }
                           />
                        </div>
                        {e.links && (
                           <div className='affiliate__start__page__item__links'>
                              <ul>
                                 {e.links.map((link, i) => {
                                    return (
                                       <li key={ i } className='affiliate__start__page__item__link'>
                                          <Text
                                             inner={ link }
                                             type={ types.regular148 }
                                             size={ sizes.xsmall }
                                          />
                                       </li>
                                    );
                                 })}
                              </ul>
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>
         </div>
         <div className='affiliate__start__page__bottom'>
            <Button
               text='Start Now'
               onClick={ () => onNextStep() }
               style={ {
                  marginTop: '15px',
               } }
            />
         </div>
      </div>
   );
};

AffiliateStartPage.propTypes = {
   onNextStep: PropTypes.func,
};

export default AffiliateStartPage;
