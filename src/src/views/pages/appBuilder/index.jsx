import React from 'react';
import './index.scss';

import FirstCard from 'components/modules/appBuilder/firstCard/FirstCard.jsx';
import AvailableApps from 'components/modules/appBuilder/availableApps/AvailableApps.jsx';

const AppBuilderView = () => {
   return (
      <div className='appBuilder__view'>
         <FirstCard />
         <AvailableApps />
      </div>
   );
};

export default AppBuilderView;