import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const PopoverTriangle = ({
   hoverText,
}) => {
   return (
      <div className='triangle__popover'>
         <div className='triangle__popover__tr'>
            <svg width='37' height='18' viewBox='0 0 37 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
               <path d='M22.6719 3.22218L31.435 11.9853L5.56493 11.9853L14.328 3.22218C15.1259 2.42431 15.7033 1.84745 16.1943 1.43063C16.6808 1.0176 17.0495 0.791159 17.4184 0.671302C18.1213 0.442899 18.8786 0.442899 19.5815 0.671302C19.9504 0.791159 20.3191 1.0176 20.8056 1.43063C21.2966 1.84745 21.874 2.42431 22.6719 3.22218Z' fill='white' stroke='#E7E9E9' />
               <path d='M29.7363 11L36.3579 17L0.85791 17.5L7.29321 11L29.7363 11Z' fill='white' />
            </svg>
         </div>
         {hoverText}
      </div>
   );
};

PopoverTriangle.propTypes = {
   hoverText: PropTypes.string,
};

export default PopoverTriangle;
