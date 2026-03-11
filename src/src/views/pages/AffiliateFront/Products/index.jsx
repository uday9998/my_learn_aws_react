import React from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import PropTypes from 'prop-types';
import offers from 'containers/pages/mixed/offers';
import AffiliateProductsFilter from './components/Filter';
import AffiliateProductItem from './components/ProductItem';

const AffiliateFrontProducts = ({
   searchInput, setSearchInput, data, uuid, affiliate, sort, changeSort,
}) => {
   const getCheckoutUrl = (offer) => {
      // let url = `${ process.env.REACT_APP_CHECKOUT_URL }${ uuid }/0/${ offer.plan_id }`;
      let url = `${ process.env.REACT_APP_CHECKOUT_URL }${ uuid }/0/${ offer.plan_id }/${ offer.plan_pricing_id }`;
      if (offer.plan.test_mode) {
         url = `${ process.env.REACT_APP_CHECKOUT_URL }test_mode/${ offer.plan.test_mode.token }/${ uuid }/0/${ offer.plan_id }/${ offer.plan_pricing_id }`;
      }
      return url;
   };
   return (
      <div className='affiliate__front__products'>
         <TextWithTooltip
            inner='Product Offers'
            // tooltip='asdas'
            isIconRigth={ true }
            type={ types.regularDefaultSmall }
            size={ sizes.size_28 }
         />
         <Input
            value={ searchInput }
            placeholder='Search'
            type='search'
            onChange={ (name, value) => setSearchInput(value) }
         />
         <AffiliateProductsFilter
            offersCount={ data.length }
            sort={ sort }
            onChange={ changeSort }
         />
         <div className='affiliate__front__products__content'>
            <div className='affiliate__front__products__content__text'>
               <Text
                  inner='Offers'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <Text
                  inner='You will find all the information about the affiliate program here'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: '#444C4B' } }
               />
            </div>
            {data.map((offer, index) => {
               const {
                  id,
                  plan: {
                     name, pricings, courses, file, is_course: isCourse, is_membership: isMembership,
                  },
                  links,
                  program_promotional_documents: promotions,
                  program_documents: documents,
                  affiliate_programs_id: affiliateId,
               } = offer;

               const isFree = !pricings[index]?.pricing_type;

               const course = isCourse || isMembership ? courses[0] : null;
               const imageUrl = course
                  ? course.communities?.file_id || course.thumbnail_image
                  : file?.src || 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png';

               return (
                  <AffiliateProductItem
                     key={ id }
                     affiliateProgramId={ id }
                     affiliate={ affiliate }
                     checkoutUrl={ getCheckoutUrl(offer) }
                     promotions={ promotions }
                     documents={ documents }
                     offer={ {
                        name,
                        id: affiliateId,
                        image: imageUrl,
                        links: links[0] || {},
                        courses,
                     } }
                     isFree={ isFree }
                  />
               );
            })}
         </div>
      </div>
   );
};

AffiliateFrontProducts.propTypes = {
   searchInput: PropTypes.string,
   setSearchInput: PropTypes.func,
   uuid: PropTypes.string,
   affiliate: PropTypes.object,
   changeSort: PropTypes.func,
   sort: PropTypes.string,
   data: PropTypes.array,
};

export default AffiliateFrontProducts;
