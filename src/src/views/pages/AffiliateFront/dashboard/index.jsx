import React from 'react';
import './index.scss';
import { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
// import AffiliateDashboardStats from './components/Stats';
import AffiliateDashboardPrograms from './components/AffiliatePrograms';
import AffiliateDashboardStats from './components/Stats';

const AffiliateDashboardView = ({
   data, filterType, handleFilter, bottomInfo, goToProducts,
}) => {
   return (
      <div className='affiliate__dashboard__view'>
         <TextWithTooltip
            inner='Affiliate Program Dashboard'
            // tooltip='asdas'
            isIconRigth={ true }
            type={ types.regularDefaultSmall }
            size={ sizes.size_28 }
         />
         <div className='affiliate__dashboard__view__bottom'>
            <AffiliateDashboardStats filterType={ filterType } handleFilter={ handleFilter } userData={ data.data } />
            <AffiliateDashboardPrograms data={ bottomInfo } goToProducts={ goToProducts } />
         </div>
      </div>
   );
};

AffiliateDashboardView.propTypes = {
   data: PropTypes.object,
   filterType: PropTypes.string,
   handleFilter: PropTypes.func,
   goToProducts: PropTypes.func,
   bottomInfo: PropTypes.object,
};

export default AffiliateDashboardView;
