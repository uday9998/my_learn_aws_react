import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import './index.scss';


const Info = ({
   title, isHaveCancel = true, children, bottomText,
}) => {
   const [closeInfo, setCloseInfo] = useState(false);
   if (closeInfo) {
      return null;
   }
   return (
      <div className='info'>
         <div className='info-left'>
            <div>
               <IconNew name='infoM' />
            </div>
            <div className='info-left-text'>
               <Text
                  inner={ title || '' }
                  type={ txtType.regularDefault }
                  size={ txtSizes.small }
               />
               {bottomText && (
                  <Text
                     inner={ bottomText || '' }
                     type={ txtType.regularDefault }
                     size={ txtSizes.small }
                     style={ { color: '#444C4B' } }
                  />
               )}
            </div>
         </div>
         {isHaveCancel && (
            <div onClick={ () => setCloseInfo(true) } role='presentation'>
               <IconNew name='filledCloseM' />
            </div>
         )}
         {children}
      </div>
   );
};

Info.propTypes = {
   title: PropTypes.string,
   isHaveCancel: PropTypes.bool,
   children: PropTypes.any,
   bottomText: PropTypes.string,
};

export default Info;
