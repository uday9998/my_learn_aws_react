import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import LoaderMini from 'components/elements/loaderMini';

const ClassProgressInfo = ({ data }) => {
   return (
      <div className='class__progress__info'>
         <div className='class__progress__info__item item-p-r'>
            {data.average_precentage_completed !== undefined ? (
               <>
                  <Text inner={ `${ data.average_precentage_completed || 0 }%` } type={ txtTypes.medium } size={ txtSizes.xxlarge } />
                  <Text inner='Average percentage completed' type={ txtTypes.regularDefault } size={ txtSizes.small } />
               </>
            ) : (
               <div className='class__progress__info__loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}
         </div>
         {/* <div className='class__progress__info__item item-p-r'>
            <Text inner={ `${ data.days } days` } type={ txtTypes.medium } size={ txtSizes.xxlarge } />
            <Text inner='Average days to complete' type={ txtTypes.regularDefault } size={ txtSizes.small } />
         </div>
         <div className='class__progress__info__item'>
            <Text inner={ `${ data.hours } hours` } type={ txtTypes.medium } size={ txtSizes.xxlarge } />
            <Text inner='Average Time to complete' type={ txtTypes.regularDefault } size={ txtSizes.small } />
         </div> */}
      </div>
   );
};

ClassProgressInfo.propTypes = {
   data: PropTypes.object,
};

export default ClassProgressInfo;
