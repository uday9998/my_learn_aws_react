import React from 'react';
import PropTypes from 'prop-types';
import CertificateGalleryView from '../certificateGalleryView';
import './index.scss';
import CertificateCustomView from '../certificateCustomView';

const CertificateTabView = (props) => {
   const { tab } = props;
   return (
      <div className='certificate__tab__view'>
         {tab === 'gallery' ? (
            <CertificateGalleryView { ...props } />
         ) : (
            <CertificateCustomView { ...props } />
         )}
      </div>
   );
};

CertificateTabView.propTypes = {
   tab: PropTypes.string,
};

export default CertificateTabView;
