import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import LoaderMini from 'components/elements/loaderMini';

const ClassProgressChart = ({ data }) => {
   return (
      <div className='class__progress__chart'>
         <div className='class__progress__chart__wrapper'>
            <div className='class__progress__chart__header'>
               <Text inner='Class Completion' type={ txtTypes.regularDefault } size={ txtSizes.medium } />
               <Text inner='Members' type={ txtTypes.regularDefault } size={ txtSizes.small } />
            </div>
            {data.in_progress !== undefined ? (
               <div className='class__progress__chart__items'>
                  <div className='class__progress__chart__item'>
                     <div className='chart__top'>
                        <div className='chart__item chart__item__in__progress'>
                           <div style={ { width: `${ data.in_progress.percentage }%` } } />
                        </div>
                        <Text
                           inner={ data.in_progress.count }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </div>
                     <div className='chart__bottom chart__bottom__progress'>
                        <Text inner='in Progress' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                        <Text inner={ `${ data.in_progress.percentage }%` } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                     </div>
                  </div>
                  <div className='class__progress__chart__item'>
                     <div className='chart__top'>
                        <div className='chart__item chart__item__completed'>
                           <div style={ { width: `${ data.done.percentage }%` } } />
                        </div>
                        <Text inner={ data.done.count } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                     </div>
                     <div className='chart__bottom chart__bottom__completed'>
                        <Text inner='Completed' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                        <Text inner={ `${ data.done.percentage }%` } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                     </div>
                  </div>
                  <div className='class__progress__chart__item'>
                     <div className='chart__top'>
                        <div className='chart__item chart__item__inactive'>
                           <div style={ { width: `${ data.inactive.percentage }%` } } />
                        </div>
                        <Text inner={ data.inactive.count } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                     </div>
                     <div className='chart__bottom chart__bottom__inactive'>
                        <Text inner='Inactive' type={ txtTypes.regularDefault } size={ txtSizes.small } />
                        <Text inner={ `${ data.inactive.percentage }%` } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                     </div>
                  </div>
               </div>
            ) : (
               <div className='class__progress__chart__loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}
         </div>
      </div>
   );
};


ClassProgressChart.propTypes = {
   data: PropTypes.object,
};


export default ClassProgressChart;
