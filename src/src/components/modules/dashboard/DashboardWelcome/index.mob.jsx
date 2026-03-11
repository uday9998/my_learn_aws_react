import React from 'react';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import Select from 'components/elements/form/Select';
import './index.mob.scss';

const WelcomeDashboard = () => {
   return (
      <div className='mob-welcomeDashboard'>
         <div className='mob-welcomeDashboard__content'>
            <Text
               type={ textType.bold }
               size={ textSize.large }
               inner='Welcome to your Miestro Dashboard'
            />
            <div className='mob-welcomeDashboard__select'>
               <Select
                  placeholder='How Do I ...'
                  icon='TriangleSvg'
                  radius='40px'
                  padding='4px 12px 4px 24px'
                  typeOval
               />
            </div>
         </div>
      </div>
   );
};

export default WelcomeDashboard;
