/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import PropTypes from 'prop-types';
// import Pagination from 'components/elements/Pagination';
import DomainItems from 'components/modules/domains/domainItems';
import withLoading from 'utils/withLoading';

const DomainItemsLoading = withLoading(DomainItems);

const Domains = ({
   sites, deleteSite, getSitesInProgress, chooseSite, loginSite,
}) => {
   return (
      <div className='d-domains'>
         {/* <Text
            type={ textType.demiBold }
            size={ textSizes.large }
            inner='Sites'
         /> */}
         <div className='domains__content'>
            {/* <div className='domains__title'>
               <div>
                  <Text
                     type={ textType.black }
                     size={ textSizes.medium }
                     inner='Sites'
                     color='#3errors333'
                  />
               </div>
            </div> */}
            <DomainItemsLoading
               isLoading={ getSitesInProgress }
               sites={ sites }
               deleteSite={ deleteSite }
               chooseSite={ chooseSite }
               loginSite={ loginSite }
            />
         </div>
      </div>
   );
};

Domains.propTypes = {
   sites: PropTypes.array,
   deleteSite: PropTypes.func,
   getSitesInProgress: PropTypes.bool,
   chooseSite: PropTypes.func,
   loginSite: PropTypes.func,
   // totalSites: PropTypes.number,
};
Domains.defaultProps = {

};

export default Domains;
