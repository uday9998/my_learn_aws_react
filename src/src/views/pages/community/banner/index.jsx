import React from 'react';
import bannerImg from 'assets/images/community/banner.png';
import UploadImage from 'components/modules/uploadImage';
import PropTypes from 'prop-types';
import './index.scss';

const CummunityBanner = ({ community, changeCommunityBanner, role }) => {
   return (
      <div className='communityBanner'>
         {role === 'admin'
         && (
            <UploadImage
               label='' 
               src={ community.banner_image || bannerImg }
               onChange={ (name, value) => changeCommunityBanner(community.id, value) }
               name='banner_image'
               changeClose={ community.banner_image ? '' : 'remove' }
               imgText='Cover Photo'
               btnText='Cover Photo'
               otherProps={ {
                  cropRatio: 'free',
               } }
               cropRatio={ true }
               isHaveRecomenededText={ true }
               bottomText='Recommended size: 1467x274'
               isImageUpload={ true }
            />
         )}
         {role !== 'admin' && <img src={ community.banner_image || bannerImg } alt='banner' /> }
      </div>
   );
};

CummunityBanner.propTypes = {
   community: PropTypes.object,
   changeCommunityBanner: PropTypes.func,
   role: PropTypes.string,
};

export default CummunityBanner;