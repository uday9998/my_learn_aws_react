import React from 'react';
import SignUpItem from 'components/modules/designCourse/signUp/SignUpItem';
import PropTypes from 'prop-types';

const SignUpItems = ({ checked }) => {
   return (
      <div className='signUpItems w-full'>
         <div className='m-b-exs'>
            <SignUpItem text='Edit Order Summary' icon='Order' active={ checked === 1 } />
         </div>
         <div className='m-b-exs'>
            <SignUpItem text='Edit Testimonials' icon='Testimonial' active={ checked === 2 } />
         </div>
         <div className='m-b-exs'>
            <SignUpItem text='Edit Bullet Points' icon='Bullet' active={ checked === 3 } />
         </div>
         <div className='m-b-exs'>
            <SignUpItem text='Edit Buy Button' icon='BuyButton' active={ checked === 4 } />
         </div>
      </div>
   );
};

SignUpItems.propTypes = {
   checked: PropTypes.number,
};

SignUpItems.defaultProps = {
   checked: 1,
};

export default SignUpItems;
