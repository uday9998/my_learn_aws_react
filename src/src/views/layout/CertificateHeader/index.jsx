import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, {
} from 'components/elements/buttons/BaseButtonNew';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMob from 'containers/modules/siteheader/index.mob';
import SiteHeader from 'views/layout/SiteHeader';
import Router from 'routes/router';


const CertificateHeader = ({
   createCertificatePage, certificatesCardpage, redirectCertificate, certificateInfoModalToggle, courses, goTo,
   isEmptyPage,
}) => {
   return (
      <div className='main'>
         <MobileHeader>
            <SiteHeaderMob
               isLeftAction
               goToBack={ () => goTo(Router.route('ADMIN_DASHBOARD').getMask()) }
               title='Certificates'
            />
         </MobileHeader>
         <SiteHeader
            title='Certificates'
            hintIcon={ false }
            iconWidth={ createCertificatePage && '16px' }
            iconHeight={ createCertificatePage && '16px' }
            hasArrow={ !certificatesCardpage }
            noBorderPadding={ createCertificatePage }
            // goBackTo={ redirectCertificate }
            tooltip='Select and customize your certificates.'
            right={ (
               <>
                  {/* <div className='certificateSearch'>
                     <CertificateSearch
                        sortbyHandle={ sortbyHandle }
                        searchOnEnter={ searchOnEnter }
                        changeSearchValue={ changeSearchValue }
                        searchOnIconClick={ searchOnIconClick }
                        searchValue={ searchValue }
                        certificateSortingValue={ certificateSortingValue }
                     />
                  </div> */}
                  {!isEmptyPage && (
                     <div className='createCertificate'>
                        <BaseButton
                           text='Create Certificate'
                           onClick={ certificateInfoModalToggle }
                           disabled={ courses === null }
                        />
                     </div>
                  )}
               </>
            ) }
         />
         {/* <div className='certificateSearchMob'>
            <CertificateSearch
               sortbyHandle={ sortbyHandle }
               searchOnEnter={ searchOnEnter }
               changeSearchValue={ changeSearchValue }
               searchOnIconClick={ searchOnIconClick }
               searchValue={ searchValue }
               certificateSortingValue={ certificateSortingValue }
            />
         </div> */}
      </div>
   );
};

CertificateHeader.propTypes = {
   createCertificatePage: PropTypes.bool,
   certificatesCardpage: PropTypes.bool,
   redirectCertificate: PropTypes.func,
   certificateInfoModalToggle: PropTypes.func,
   courses: PropTypes.array,
   goTo: PropTypes.func,
   isEmptyPage: PropTypes.bool,
};

export default CertificateHeader;
