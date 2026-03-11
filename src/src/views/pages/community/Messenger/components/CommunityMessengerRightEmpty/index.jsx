import React from 'react';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const CommunityMessengerRightEmpty = () => {
   return (
      <div className='community__messenger__right__empty'>
         <IconNew name='CommunityMessengerM' />
         <Text
            inner='Start a conversation'
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { marginTop: '24px' } }
         />
         <Text
            inner='Communicate with community members to see messages here'
            type={ types.regularDefaultSmall }
            size={ sizes.size_28 }
            style={ { marginTop: '8px' } }
         />
      </div>
   );
};

export default CommunityMessengerRightEmpty;
