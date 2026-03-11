import React, { useContext } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import IconButton from 'components/elements/buttons/IconButton';
import { AffiliateUserContext } from 'containers/pages/admin/affiliate/User';
import AffiliateUserTop from './components/UserTop';
import AffiliateStats from './components/Stats';
import AffiliateUserOffers from './components/Offers';

const AffiliateUserView = () => {
   const { user, goBack } = useContext(AffiliateUserContext);
   return (
      <div className='affiliate__user'>
         <div className='affiliate__user__top'>
            <IconButton
               name='arrowLeftL'
               onClick={ goBack }
            />
            <Text
               inner={ user.aff_user.name }
               type={ types.regularDefaultSmall }
               size={ sizes.size_28 }
            />
         </div>
         <AffiliateUserTop />
         {/* <AffiliateStats /> */}
         <AffiliateUserOffers />
      </div>
   );
};

AffiliateUserView.propTypes = {

};

export default AffiliateUserView;
