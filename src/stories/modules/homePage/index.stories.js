import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Order from 'components/modules/homePage/Order';
import image from 'assets/images/landings/group-3.png';
import 'index.scss';

const orders = [
   {
      icon: 'Website',
      text: 'Simple Point And Click Webpage Editor!',
   },
   {
      icon: 'Website',
      text: 'Simple Point And Click Webpage Editor!',
   },
   {
      icon: 'Website',
      text: 'Simple Point And Click Webpage Editor!',
   },
];

storiesOf('App|Modules/homePage', module)
   .addDecorator(withKnobs)
   .add('Order', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '1128px', margin: '0 auto' } }>
            <Order
               reverse={ boolean('reverse', false) }
               title={ text('title', 'Get All The Tools In One Place To Get Your Courses And Membership Sites Up And Running') }
               titleWidth='956px'
               orders={ orders }
               img={ image }
            />
         </div>
      );
   });
