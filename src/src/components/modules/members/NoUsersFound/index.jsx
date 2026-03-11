import React from 'react';
import './index.scss';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import noUserPng from 'assets/images/no-users.png';
import PropTypes from 'prop-types';

const NoUsersFound = ({ switchToAddingMember }) => {
   return (
      <SelectedWrapper>
         <div className='NoUsersFound'>
            <img src={ noUserPng } alt='' />
            <div className='m-t-exl flex flex-col align-center'>
               <Text
                  type={ textType.bold }
                  size={ textSizes.medium }
                  inner='No users found'
               />
               <Text
                  type={ textType.regular }
                  size={ textSizes.small }
                  inner='All incoming requests will be listed in this folder'
                  style={ { textAlign: 'center' } }
                  color='#8a94a2'
                  bold
               />
               <div className='m-t-exl w-full'>
                  <BaseButton
                     theme={ btnTheme.darkBlue }
                     size={ btnSizes.full }
                     text='Add Member'
                     onClick={ () => switchToAddingMember(true) }
                  />
               </div>
            </div>
         </div>
      </SelectedWrapper>
   );
};

NoUsersFound.propTypes = {
   switchToAddingMember: PropTypes.func,
};

export default NoUsersFound;
