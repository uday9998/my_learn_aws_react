import React from 'react';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import courses from 'assets/images/dashboard/board.png';

const DashboardBoard = () => {
   return (
      <div className='welcomeDashboardCourses'>
         <div className='welcomeDashboardBoard__content'>
            <div className='welcomeDashboardBoard__content__text'>
               <div className='welcomeDashboardBoard__content__title'>
                  <Text
                     type={ textType.mediumSmall }
                     size={ textSize.size_28 }
                     inner='Onboarding Call'
                  />
               </div>
               <div>
                  <Text
                     type={ textType.regularDefaultGrey145 }
                     size={ textSize.medium }
                     inner='Schedule something with our team for them to set up.'
                     style={ { color: 'rgba(68, 76, 75, 1)' } }
                  />
               </div>
               <BaseButton
                  text='Schedule Onboarding Call'
                  theme={ btnTheme.primary }
                  size={ btnSize.largeFull }
                  onClick={ () => {} }
               />
            </div>
            <div className='welcomeDashboardBoard__content__img'>
               <img src={ courses } alt='programs' />
            </div>

         </div>
      </div>
   );
};

DashboardBoard.propTypes = {

};

export default DashboardBoard;
