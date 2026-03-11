import React from 'react';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import './index.scss';
import suspendedImg from 'assets/images/upgrade-the-plan.png';
import PropTypes from 'prop-types';

const Suspended = ({
   headerTxt, contentTxt, onBtnClick,
}) => {
   return (
      <div className='Suspended-wraper'>
         <div className='SuspendedPopup'>
            <div className='flex justify-center'>
               <img src={ suspendedImg } alt='class' />
            </div>
            <div className='flex justify-center'>
               <Text
                  type={ TextType.medium160 }
                  size={ TextSize.large }
                  inner={ headerTxt }
               />
            </div>
            <div className='flex justify-center'>
               <Text
                  style={ { fontSize: '14px' } }
                  type={ TextType.regularDefault }
                  inner={ contentTxt }
               />
            </div>
            <div className='btnWrapper'>
               <BaseButton text='Support' onClick={ () => window.open('https://support.miestro.com/', '_blank') } />
               <BaseButton text='Reactivate Account' onClick={ onBtnClick } />
            </div>
         </div>
      </div>

   );
};

Suspended.propTypes = {
   headerTxt: PropTypes.string,
   contentTxt: PropTypes.string,
   onBtnClick: PropTypes.func,
};

export default Suspended;
