import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const AvatarBlock = ({
   avatar, avatarStyle,
}) => {
   return (
      <div className='avatar-container'>
         <div style={ avatarStyle }>
            <img
               src={ avatar }
               alt='avatar'
            />
         </div>
         {/* <Text
            style={ (!name && { display: 'none' }) || (studentRoom ? { fontFamily: primaryTheme, color: defaultColor } : {}) }
            size={ textSize.small }
            type={ textType.regularDefault }
            inner={ name }
         /> */}
      </div>
   );
};

AvatarBlock.propTypes = {
   avatar: PropTypes.string,
   avatarStyle: PropTypes.object,
};

AvatarBlock.defaultProps = {
   avatar: '',
   avatarStyle: {},
};

export default AvatarBlock;
