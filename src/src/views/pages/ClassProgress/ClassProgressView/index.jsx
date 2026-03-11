import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import ReportsContainer from 'views/newLayout/reports';
import { useHistory } from 'react-router';
import Icon from 'components/elements/Icon';
import ClassProgressMember from './ClassProgressMember';
import ClassProgressModules from './ClassProgressModules';

const ClassProgressUserView = ({ member }) => {
   const history = useHistory();
   return (
      <div className='class__progress__member'>
         <ReportsContainer>
            <div className='class__progress__member__nav'>
               <div role='presentation' onClick={ () => history.goBack() } className='class__progress__member__nav__back'>
                  <Icon name='ArrowLeftLarge' />
               </div>
               <Text
                  inner={ member.member.name }
                  type={ txtTypes.regularDefaultSmallX }
                  size={ txtSizes.size_28 }
               />
            </div>
            <ClassProgressMember member={ member.member } />
            <ClassProgressModules
               modules={ member.courses }
               modulesCounts={ member.all_count }
               completedModules={ member.completed_count }
            />
         </ReportsContainer>
      </div>
   );
};


ClassProgressUserView.propTypes = {
   member: PropTypes.object,
};

export default ClassProgressUserView;
