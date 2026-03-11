import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import PlansTable from 'components/elements/plans/PlansTable';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';

const PlanHistory = ({ table }) => {
   return (
      <SelectedWrapper hasShadow>
         <div className='planHistory'>
            <div className='planHistory__header m-b-m'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner='History'
               />
            </div>
            <PlansTable table={ table } />
         </div>
      </SelectedWrapper>
   );
};

PlanHistory.propTypes = {
   table: PropTypes.object,
};

PlanHistory.defaultProps = {
   table: {},
};

export default PlanHistory;
