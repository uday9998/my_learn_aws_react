import React from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconButton from 'components/elements/buttons/IconButton';
import Input from 'components/elements/inputNew';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';

const MessengerRightGroupTop = () => {
   const {
      search, setIsSearchActive,
      isSearchActive, handleSearchMessage,
   } = React.useContext(CommunityMessengerContext);
   if (isSearchActive) {
      return (
         <div className='messenger__right__top'>
            <Input
               type='search'
               value={ search }
               onChange={ (name, value) => handleSearchMessage(value) }
               placeholder='Search message'
            />
         </div>
      );
   }
   return (
      <div className='messenger__right__group__top'>
         <div className='messenger__right__group__top__left'>
            <img src='http://miestro.loc/images/account/user.png' alt='' />
            <Text
               inner='Group'
               type={ types.mediumLarge }
               size={ sizes.small }
            />
         </div>
         <div className='messenger__right__top__right'>
            <IconButton
               name='CommunityMessengerSearchL'
               onClick={ () => setIsSearchActive(true) }
            />
         </div>
      </div>
   );
};

export default MessengerRightGroupTop;
