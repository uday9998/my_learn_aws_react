/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.mob.scss';
import CustomSwitch from 'components/elements/form/CustomSwitch';
import AllPlansCard from 'components/modules/pricing/AllPlansCard';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PlanCard from 'components/modules/plans/PlanCard';
import DataTable from 'components/elements/DataTable/index.mob';
import PropTypes from 'prop-types';
import {
   plans, planCards, subTable,
} from './data';

const Plans = ({ empty, annually }) => {
   return (
      <div className='mob-plans'>
         <div className='flex justify-center'>
            <CustomSwitch
               firstOption='Monthly'
               secondOption='Annually'
               backgroundColor='#fbfdff'
               checkedBackground='#7cb740'
               checkedTextColor='#ffffff'
               checked={ annually ? 2 : 1 }
            />
         </div>
         {planCards.map((plan, i) => {
            return (
               <div className='m-t-exl' key={ i }>
                  <PlanCard
                     active={ i === 1 }
                     title={ plan.title }
                     price={ plan.price }
                     orders={ plan.orders }
                     popular={ i === 1 }
                     annuallyPrice={ annually ? plan.annuallyPrice : '' }
                     annually={ annually }
                  />
               </div>
            );
         })}
         <div className='mob-plansCard'>
            <AllPlansCard plans={ plans } title='All Plans Include These Core Features:' />
         </div>
         {!empty
         && (
         <>
            <div className='m-b-exl plans__dataTable'>
               <DataTable data={ subTable } dataTitle='Subscription' />
               <div className='plansData__btn'>
                  <BaseButton
                     size={ btnSize.full }
                     text='Update Card'
                     style={ { height: '48px' } }
                  />
               </div>
            </div>
            <div className='m-b-exl plans__dataTable'>
               <DataTable data={ subTable } dataTitle='History' />
            </div>
         </>
         )
         }
         <BaseButton
            theme={ btnTheme.lightGreen }
            size={ btnSize.full }
            text='Compare Plans Here'
            style={ { height: '48px' } }
         />
      </div>
   );
};

Plans.propTypes = {
   empty: PropTypes.bool,
   annually: PropTypes.bool,
};

Plans.defaultProps = {
   empty: false,
   annually: false,
};

export default Plans;
