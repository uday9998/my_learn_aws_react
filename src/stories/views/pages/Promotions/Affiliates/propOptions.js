import React from 'react';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import up from 'assets/images/promotions/up.png';


const LastLogin = () => {
   return (
      <div className='flex align-start'>
         <Text
            type={ TextType.normal }
            size={ TextSize.extraSmall }
            inner='Last Login'
            color='rgba(51, 51, 51, 0.5)'
         />
         <img src={ up } alt='' className='m-l-exs' />
      </div>
   );
};


export const header = [
   'Name', 'Email', 'Type', <LastLogin />, 'Join Date',
];

export const body = [
   ['Justin Burns', 'justin@miestro.com', 'Customer', 'Yesterday', '11/05/18'],
];
