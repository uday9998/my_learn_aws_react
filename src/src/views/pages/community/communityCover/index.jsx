import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import SimpleStatus from 'components/elements/SimpleStatus';
import './index.scss';
import communityLogo from 'assets/images/community/cover.png';

const CommunityCover = ({
   community,
}) => {
   return (
      <div className='community__right__info__header'>
         <div className='community__right__info__header__logo'> 
            <img src={ community.file_id ? community.file_id : communityLogo } alt='' />
         </div>
         <div className='community__right__info__header__texts'>
            <div>
               <Text
                  inner={ community.name }
                  type={ types.bold }
                  size={ sizes.large }
               />
               <SimpleStatus color='greyWhite' text='Private Community' size='small_14' />
            </div>
            {community.description && (
               <Text
                  inner={ community.description }
                  type={ types.regularDefault }
                  size={ sizes.small_new }
                  tooltipWithoutIcon={ community.description }
                  nameLength={ 60 }
                  style={ { color: '#444C4B' } }
               />
            )} 
         </div> 
      </div>
   );
};

CommunityCover.propTypes = {
   community: PropTypes.object,
};

export default CommunityCover;
