import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import image from 'assets/images/community/emptyNotification.png';

const NotificationEmpty = () => {
   return (
      <div className='community__notifications__content__empty'>
         <img src={ image } alt='' />
         <Text
            inner='Currently, there are no notifications for you.'
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { color: '#727978' } }
         />
      </div>
   );
};

NotificationEmpty.propTypes = {

};

export default NotificationEmpty;
