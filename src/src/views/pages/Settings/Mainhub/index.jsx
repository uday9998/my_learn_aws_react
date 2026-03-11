import React from 'react';
import CustomLinks from 'components/modules/settings/CustomLinks';
import Privacy from 'components/modules/settings/Privacy';
import TrackingList from 'components/modules/settings/TrackingList';
import './index.scss';

const Mainhub = (props) => {
   return (
      <div className='mainhub w-full'>
         <div className='m-t-exs' />
         <CustomLinks
            { ...props }
         />
         <div className='m-t-exs' />
         <Privacy { ...props } />
         <div className='m-t-exs' />
         {/* <TrackingList { ...props } /> */}
         <div className='m-t-exs' />
      </div>
   );
};


export default Mainhub;
