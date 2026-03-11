import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Switch from 'components/elements/Switch';

import './index.scss';

const PricingTop = ({
   type,
   handleChangeType,
}) => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      if (isMobile) {
         document.querySelector('.adminContent').style.padding = '0 16px';
      }
   }, [isMobile]);

   return (
      <div className='pricing_top_wrapper'>
         <div className='title_wrapper'>
            {
               isMobile ? (
                  <Text 
                     inner='Pricing Plans'
                     type={ types.bold800 }
                     size={ sizes.size_32 }
                     style={ {
                        color: '#131F1E',
                     } }
                  />
               ) : (
                  <Text 
                     inner='Pricing Plans To Fit You'
                     type={ types.bold800 }
                     size={ sizes.size_32 }
                     className='gradient__text'
                  />
               )
            }
            
         </div>
         <div className='subtitle_wrapper'>
            <Text 
               inner='Choose A Miestro Plan Below To Fit Your Needs'
               type={ !isMobile && types.bold800 }
               size={ isMobile ? sizes.small14 : sizes.big54 }
               style={ {
                  color: isMobile && '#444C4B',
               } }
            />
         </div>
         <Switch 
            value={ type }
            onChange={ handleChangeType }
         />
         {
            !isMobile && (
               <div className='footer_text_wrapper'>
                  {/* <Text
                     inner='Potential Price Point: Look into the software service for predicting pricing'
                     size={ sizes.large }
                  /> */}
               </div>
            )
         }
      </div>
   );
};

PricingTop.propTypes = {
   type: PropTypes.string,
   handleChangeType: PropTypes.func,
};

export default PricingTop;