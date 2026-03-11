import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';
import moment from 'moment';

const SelectedMember = ({ currentMember, handleSendPassword }) => {
   const lastLogin = currentMember.last_login_at ? moment(currentMember.last_login_at).format('MM/DD/YYYY') : 'Not logged in yet';
   return (
      <SelectedWrapper>
         <div className='selectedMember'>
            <div className='selectedMember__data'>
               <div className='flex justify-between'>
                  <div className='flex align-start m-r-m'>
                     <div className='selectedMember__avatar'>
                        <img src={ currentMember.picture_full_src } alt='use' />
                     </div>
                  </div>
                  <div className='selectedMember__text'>
                     <Text
                        type={ textType.normal }
                        size={ textSizes.medium }
                        inner={ currentMember.name }
                     />
                     <Text
                        type={ textType.regular }
                        size={ textSizes.small }
                        inner={ currentMember.email }
                        color='#8a94a2'
                        bold
                        style={ { marginTop: '4px' } }
                     />
                     <div className='w-full flex m-t-exs'>
                        <div className='m-r-exs'>
                           <Icon name='Role' color={ lastLogin === 'Not logged in yet' ? '#8a94a2' : '#7cb740' } />
                        </div>
                        <Text
                           type={ textType.regular }
                           size={ textSizes.small }
                           inner={ lastLogin }
                           color='#8a94a2'
                           bold
                           style={ { fontSize: '12px' } }
                        />
                     </div>
                  </div>
               </div>
               <div className='selectedMember__settings'>
                  <div className='m-r-l flex justify-end'>
                     <BaseButton
                        theme={ btnTheme.darkGreen }
                        size={ btnSizes.large }
                        text='Send Password'
                        onClick={ () => handleSendPassword(currentMember.id) }
                     />
                  </div>
               </div>
            </div>

         </div>
      </SelectedWrapper>
   );
};

SelectedMember.propTypes = {
   currentMember: PropTypes.object,
   handleSendPassword: PropTypes.func,
};

export default SelectedMember;
