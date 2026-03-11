import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPlanName, currencySymbols } from 'constants/pricing';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

import './index.scss';
import moment from 'moment';

const Invoices = ({
   plans,
   currency,
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

   return (
      <div className='invoice__wrapper'>
         <div className='invoice__top__wrapper'>
            <Text 
               inner='Invoices'
               size={ sizes.xxlarge }
               style={ {
                  color: '#131F1E',
               } }
            />
            <Text 
               inner='View and manage all invoices issued'
               size={ sizes.small14 }
               style={ {
                  color: '#444C4B',
               } }
            />
         </div>
         <div className='table__wrapper'>
            <table>
               <tr className='table__top'>
                  <th>Charged</th>
                  <th>Plan</th>
                  <th>Receipt</th>
                  <th>{isMobile ? 'Total' : 'Total Price'}</th>
               </tr>
               {
                  plans.subscriptions.map(data => {
                     return (
                        <tr>
                           <th style={ {
                              fontWeight: 400,
                           } }>{moment(data.amount_date, 'YYYY/MM/DD').format('MMM DD, YYYY')}
                           </th>
                           <th>{getPlanName(data.plan)}</th>
                           <th
                              className='download__wrapper'
                              style={ {
                                 fontWeight: 400,
                              } }>
                              <IconNew name='Download' />
                              <a href={ data.invoice_url } download='Invoice'>Download</a>
                           </th>
                           <th>{
                              currencySymbols[currency.currencyCode]}{currency.currencyAmount 
                              ? data.amount * currency.currencyAmount 
                              : data.amount
                           }
                           </th>
                        </tr>
                     );
                  })
               }
            </table>
         </div>
      </div>
   );
};

Invoices.propTypes = {
   plans: PropTypes.object,
   currency: PropTypes.object,
};

export default Invoices;