import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import DomainItem from 'components/modules/domains/domainItem';


const DomainItems = ({
   sites, deleteSite, chooseSite, loginSite,
}) => {
   return (

      <div className='domains__items'>
         {sites.map((site, i) => {
            const j = i;
            return (
               <DomainItem
                  key={ j }
                  site={ site }
                  deleteSite={ deleteSite }
                  chooseSite={ chooseSite }
                  loginSite={ loginSite }
               />
            );
         })}
      </div>


   );
};

DomainItems.propTypes = {
   sites: PropTypes.array,
   deleteSite: PropTypes.func,
   chooseSite: PropTypes.func,
   loginSite: PropTypes.func,
};
DomainItems.defaultProps = {

};

export default DomainItems;
