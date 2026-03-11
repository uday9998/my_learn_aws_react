import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import SliceAndConnectText from 'utils/getSplitedText';
import IconNew from 'components/elements/iconsSize';

const getUserIconName = (index) => {
   switch (index) {
      case 1:
         return 'CommunityGoldM';
      case 2:
         return 'CommunitySilverM';
      case 3:
         return 'CommunityBronzeM';
      default:
         return '';
   }
};

export const CommunityEngagedUser = ({ user, index, onClick }) => {
   return (
      <div
         className='community__engaged__user'
         role='presentation'
         onClick={ () => onClick() }
      >
         <div className='community__engaged__user__left'>
            <Text
               inner={ index }
               type={ types.bold }
               size={ sizes.xsmall }
               style={ { color: '#727978' } }
            />
            <img src={ user.picture_src || user.picture_full_src } alt='' />
            <Text
               inner={ SliceAndConnectText(user.name, 15) }
               type={ types.mediumLarge }
               size={ sizes.small }
            />
         </div>
         <IconNew name={ getUserIconName(index) } />
      </div>
   );
};

CommunityEngagedUser.propTypes = {
   user: PropTypes.object,
   onClick: PropTypes.func,
   index: PropTypes.number,
};
