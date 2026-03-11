import React from 'react';
import './index.mob.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import MiestroStep from 'components/elements/dashboard/MiestroStep/index.mob';

const GetStarted = () => {
   return (
      <div className='mob-getStarted'>
         <div className='mob-getStarted__progress'>
            <div className='mob-getStarted__diagram'>
               <div className='pos-center'>
                  <Text
                     type={ textType.normal }
                     size={ textSize.extraSmall }
                     inner={ ['4/5', <br />, 'Complited'] }
                  />
               </div>
               <Icon name='Progress' />
            </div>
            <div className='text-center m-b-m'>
               <Text
                  type={ textType.regular }
                  size={ textSize.medium }
                  bold={ true }
                  inner='Getting Started With Miestro Steps'
                  className='text-center'
               />
            </div>
         </div>
         <div className='mob-getStarted__steps'>
            <MiestroStep text='Start with your first class in Miestro' finished={ true } />
            <MiestroStep text='Sign up for training' />
            <MiestroStep text='Connect your payment methods' finished={ true } />
            <MiestroStep text='Subscribe to a payment plan' finished={ true } />
            <MiestroStep text='Integrate Miestro' finished={ true } />
         </div>
      </div>
   );
};

export default GetStarted;
