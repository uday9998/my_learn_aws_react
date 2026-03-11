import React, { useContext } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { AffiliateUserContext } from 'containers/pages/admin/affiliate/User';
import EmptyPageWithImage from 'components/modules/EmptyPageWithImage';
import AffiliateUserOffer from './Offer';

const AffiliateUserOffers = () => {
   const { user } = useContext(AffiliateUserContext);
   const offers = user.offers;
   return (
      <div className='affiliate__user__offers'>
         {!offers.length && <EmptyPageWithImage title='No Products yet' />}
         {!!offers.length && (
            <div className='affiliate__user__offers__top'>
               <Text
                  inner='Products'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <Text
                  inner='Click on the products to show all the statistics'
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
            </div>
         )}
         {offers.map((e) => {
            return (
               <AffiliateUserOffer
                  key={ e.id }
                  offer={ {
                     landing_url: 'miestro.com/landing',
                     schoolRoom_url: 'miestro.com/school_room',
                     checkout_url: 'miestro.com/school_room/checkout_page',
                     affiliateIncome: e.income,
                     income: e.your_income,
                     pricings: [],
                     commission: e.commission,
                     picture_src: e.plan.file?.src ?? '',
                  } }
               />
            );
         })}
      </div>
   );
};

AffiliateUserOffers.propTypes = {

};

export default AffiliateUserOffers;
