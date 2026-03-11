import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTableMobileText } from 'utils/pricing';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const FeaturesLimits = ({
   limitData,
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

   const getComponent = (value) => {
      return (
         <div className='limit__wrapper'>
            <div className={ `limit__title__wrapper ${ value.isListItem ? 'list__item' : 'boldTitle' ? 'bold__title' : '' }` }>
               <Text
                  style={ {
                     fontWeight: value.boldTitle && 700,
                  } }
                  size={ sizes.large_new }
                  inner={ value.title } />
            </div>
            <div className='right__limits__wrapper'>
               {
                  value.values.map(item => {
                     return (
                        <div className='icon__text__wrapper'>
                           {
                              item.includes('#') ? (
                                 <div
                                    style={ {
                                       background: item,
                                    } }
                                    className='color__icon' />
                              ) : <Text size={ sizes.large } type={ types.bold400 } inner={ isMobile ? getTableMobileText(value.title, item) : item } />
                           }
                        </div>
                     );
                  })
               }
            </div>
         </div>
      );
   };
   return (
      <div className='limit__wrapper'>
         <div className={ limitData.isTopSection ? 'limit__title top__section' : 'limit__title' }>
            <Text 
               inner={ limitData.title.toUpperCase() }
               size={ sizes.xlarge }
            />
         </div>
         <div className={ `options__wrapper ${ limitData.isLastSection ? 'lastSection' : '' }` }>
            {
               limitData.options.map(option => {
                  return getComponent(option);
               })
            }
         </div>
      </div>
   );
};

FeaturesLimits.propTypes = { 
   limitData: PropTypes.any,
};

export default FeaturesLimits;