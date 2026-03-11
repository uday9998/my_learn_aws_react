import React from 'react';
import './index.scss';
import AffiliateProgram from '../../Components/Program';
import AffiliateStats from '../../Components/Stats';

const AffiliateOverview = () => {
   // const data = useContext(MainAffiliateContext);
   return (
      <div className='affiliate__overview'>
         <AffiliateStats />
         <AffiliateProgram />
         {/* <div className='affiliate__overview__links'>
            <Text
               inner='Add Affiliate Program Links'
               type={ types.medium153 }
               size={ sizes.large }
            />
            <div className='affiliate__overview__links__info'>
               <TextWithIcon
                  iconName='infoM'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  inner='Now you can add this link to your website, landing page, or school room in the footer or header'
                  isIconRight={ false }
               />
               <TextWithIcon
                  iconName='AffiliatePlusM'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  inner='Add Links'
                  onClick={ () => alert('add Link') }
                  style={ { color: '#24554E' } }
                  generalStyles={ { cursor: 'pointer' } }
                  isIconRight={ false }
               />
            </div>
            <div className='affiliate__overview__links__image'>
               <Text
                  inner='Examples'
                  type={ types.medium150 }
                  size={ sizes.medium }
               />
               <IconNew name='AffiliatePreview' />
            </div>
         </div> */}
      </div>
   );
};

AffiliateOverview.propTypes = {

};

export default AffiliateOverview;
