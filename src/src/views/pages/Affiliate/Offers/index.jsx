import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Button from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Info from 'components/elements/messages/info';
import Offer from './Offer';

const AffiliateOfferPage = ({
   offers, selectedOffers, onSelectOffer, onSelectAllOffers, onNextStep,
}) => {
   const isProductFree = (pricings) => {
      return pricings.some((e) => e.pricing_type === 0);
   };
   return (
      <div className='affiliate__offer__page'>
         <div className='affiliate__offer__page__top'>
            <div className='affiliate__offer__page__top__title'>
               <Text
                  inner='1. Choose Offers'
                  type={ types.medium150 }
                  size={ sizes.xlarge }
               />
               <Text
                  inner='Choose which of your offers will be able to be a part of the affiliate program'
                  type={ types.regular148 }
                  size={ sizes.medium }
                  style={ { color: '#444C4B', marginBottom: '8px' } }
               />
            </div>
            <div className='affiliate__offer__page__top'>
               <CheckBox
                  label={ `${ selectedOffers.length }/${ offers.length } Offers` }
                  checked={ selectedOffers.length === offers.length }
                  textProps={ { size: 'small' } }
                  onChange={ () => onSelectAllOffers() }
               />
               <div className='affiliate__offer__page__top__offers'>
                  {offers.map((offer) => {
                     const {
                        id, name, pricings, courses, file,
                        is_course: isCourse, is_membership: isMembership,
                     } = offer;

                     const course = isCourse || isMembership ? courses[0] : null;
                     const imageUrl = course
                        ? course.communities?.file_id || course.thumbnail_image
                        : file?.src || 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png';

                     return (
                        <Offer
                           picture={ imageUrl }
                           planName={ name }
                           key={ id }
                           pricings={ pricings }
                           isChecked={ selectedOffers.includes(id) }
                           onCheck={ () => onSelectOffer(id) }
                           isFree={ isProductFree(pricings) }
                        />
                     );
                  })}
               </div>
            </div>
            {selectedOffers.length === 0 && (
               <Info
                  isHaveCancel={ false }
                  title='Select at least one offer to continue'
               />
            )}
         </div>
         <div className='affiliate__offer__page__bottom'>
            <Button
               onClick={ () => onNextStep() }
               disabled={ selectedOffers.length === 0 }
               text='Next Step'
            />
         </div>
      </div>
   );
};

AffiliateOfferPage.propTypes = {
   onNextStep: PropTypes.func,
   offers: PropTypes.array,
   selectedOffers: PropTypes.array,
   onSelectAllOffers: PropTypes.func,
   onSelectOffer: PropTypes.func,
};

export default AffiliateOfferPage;
