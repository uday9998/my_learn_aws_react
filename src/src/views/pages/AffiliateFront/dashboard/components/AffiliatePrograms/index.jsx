import React from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';

const AffiliateDashboardPrograms = ({ data, goToProducts }) => {
   return (
      <div className='affiliate__dashboard__programs'>
         <div className='affiliate__dashboard__programs__top'>
            <Text
               inner='Affiliate Program'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Text
               inner='You will find all the information about the affiliate program here'
               type={ types.regular148 }
               size={ sizes.medium }
               style={ { color: '#444C4B' } }
            />
         </div>
         <div className='affiliate__dashboard__programs__content'>
            <div className='left'>
               {/* <div className='images'>
                  <img src='https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6' alt='' />
                  <img src='https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6' alt='' />
                  <img src='https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6' alt='' />
               </div> */}
               <div className='info'>
                  <Text
                     inner='Affiliate Program'
                     type={ types.regular148 }
                     size={ sizes.medium }
                  />
                  <div className='info__bottom'>
                     <TextWithIcon
                        iconName='AffiliateOffersL'
                        inner={ data.offer_count }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        generalStyles={ { paddingRight: '8px', marginRight: '8px', borderRight: '1px solid #E7E9E9' } }
                     />
                     <TextWithIcon
                        iconName='AffiliateMoneyS'
                        inner={ `$${ data.total } Total Revenue` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                     />
                  </div>
               </div>
            </div>
            <Button
               onClick={ () => goToProducts() }
               text='Go to Offers'
            />
         </div>
      </div>
   );
};

AffiliateDashboardPrograms.propTypes = {
   data: PropTypes.object,
   goToProducts: PropTypes.func,
};

export default AffiliateDashboardPrograms;
