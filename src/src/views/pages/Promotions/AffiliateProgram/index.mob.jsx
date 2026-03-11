import React from 'react';
import './index.mob.scss';
import AffiliatesCard from 'components/modules/promotions/affiliates/AffiliatesCard/index.mob';
import DataTable from 'components/elements/DataTable';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const AffiliateProgram = () => {
   return (
      <div className='mob-affiliateProgram itemWrapper-f'>
         <AffiliatesCard />
         <div className='m-t-exl m-b-exl'>
            <DataTable match='Affiliates' />
         </div>
         <BaseButton
            size={ btnSize.full }
            text='Add Affiliate'
         />
      </div>
   );
};

export default AffiliateProgram;
