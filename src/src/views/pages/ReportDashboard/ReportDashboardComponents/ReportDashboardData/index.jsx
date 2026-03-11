import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import { uniqueId } from 'lodash';
import getCurrencySumbol from 'utils/getCurrencySymbol';
import { useHistory } from 'react-router';

const ClassChooseByPlan = (plan) => {
   switch (plan) {
      case 'One Time Payment':
         return 'oneTime';
      case 'Subscribed':
         return 'subscribed';
      case 'Split Pay':
         return 'split';
      default:
         return 'free';
   }
};
export const ReportDashboardData = ({ data, date }) => {
   const history = useHistory();
   return (
      <div className='user-data'>
         <div className='user-data-date'>
            <Text inner={ date } type={ txtTypes.regularDefaultSmall } size={ txtSizes.xsmall } />
         </div>
         {data.map((e) => {
            return (
               <div className='report-dashboard-activity-user' key={ uniqueId() }>
                  <div className='left'>
                     <div className='user-image'>
                        <img src={ e.user.picture_full_src } alt='' />
                     </div>
                  </div>
                  <div className='right'>
                     <div className='user-info'>
                        <div className='user-name-sign'>
                           <Text
                              inner={ e.user.name }
                              onClick={ () => history.push(`/admin/members/member/${ e.user.id }#transactions`) }
                              style={ { cursor: 'pointer' } }
                              className='user-name'
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small14 }
                           />
                           <Text inner={ e.plan_type } className={ `plan-status  ${ `plan-status-${ ClassChooseByPlan(e.plan_type) }` }` } type={ txtTypes.regularDefault } size={ txtSizes.small14 } />
                        </div>
                        {e.plan && e.plan.name && <Text inner={ `[${ e.plan ? e.plan.name : '' }]` } style={ { color: '#24554E' } } type={ txtTypes.regularDefault } size={ txtSizes.small14 } />}
                     </div>
                     <div
                        className='user-last-date'
                        style={ {
                           whiteSpace: 'nowrap',
                        } }>
                        {!!e.amount && (
                           <Text
                              inner={ `${ getCurrencySumbol(e.currency) }` }
                              className={ e.amount ? 'success-text-light' : 'free-text' }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small14 }
                           />
                        )}
                        <Text
                           inner={ `${ Number.parseFloat(e.amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 'Free' }` }
                           className={ e.amount ? 'success-text-light' : 'free-text' }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small14 }
                        />
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
};

ReportDashboardData.propTypes = {
   data: PropTypes.array,
   date: PropTypes.string,
};
