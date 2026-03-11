import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const CertificateNavbar = ({ currentTab, changeTab }) => {
   return (
      <div className='certificate__navbar'>
         <div
            role='presentation'
            onClick={ () => changeTab('gallery') }
            className={ currentTab === 'gallery' ? 'certificate__navbar__item__active' : 'certificate__navbar__item' }
         >
            <IconNew name='GalleryCertificateM' />
            <Text
               inner='Gallery'
               type={ textType.regularDefault }
               size={ textSize.small }
            />
         </div>
         <div
            role='presentation'
            onClick={ () => changeTab('customize') }
            className={ currentTab === 'customize' ? 'certificate__navbar__item__active' : 'certificate__navbar__item' }
         >
            <IconNew name='CustomSizeCertificateM' />
            <Text
               inner='Customize Style'
               type={ textType.regularDefault }
               size={ textSize.small }
            />
         </div>
      </div>
   );
};

CertificateNavbar.propTypes = {
   currentTab: PropTypes.string,
   changeTab: PropTypes.func,
};

export default CertificateNavbar;
