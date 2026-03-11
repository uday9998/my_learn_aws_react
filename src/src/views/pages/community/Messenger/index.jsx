import React from 'react';
import './index.scss';
import { TextWithTooltip, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import CommunityMessengerLeft from './components/CommunityMessengerLeft';
import CommunityMessengerRightEmpty from './components/CommunityMessengerRightEmpty';
import CommunityMessengerRight from './components/CommunityMessengerRight';

const CommunityMessenger = () => {
   const { selectedConverstation, socketConnected } = React.useContext(CommunityMessengerContext);

   return (
      <div className='community__messenger'>
         <TextWithTooltip
            tooltip=''
            inner='Messenger'
            type={ types.regularDefaultSmall }
            size={ sizes.size_28 }
            isIconRigth={ true }
         />
         <div className='community__messenger__bottom'>
            <CommunityMessengerLeft />
            <div className='community__messenger__bottom__divider' />
            {selectedConverstation && socketConnected ? (
               <CommunityMessengerRight />
            ) : (
               <CommunityMessengerRightEmpty />
            )}
            {/*
            {!initialLength ? (
               <CommunityMessengerRightEmpty />

            ) : (
               <CommunityMessengerRight />
            )} */}
         </div>
      </div>
   );
};

export default CommunityMessenger;
