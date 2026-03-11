import React from 'react';
import ThumbnailCard from 'components/modules/settings/ThumbnailCard';
import CustomLinks from 'components/modules/settings/CustomLinks';
import Privacy from 'components/modules/settings/Privacy';

const Mainhub = () => {
   return (
      <div className='mainhub w-full'>
         <ThumbnailCard />
         <div className='m-t-exs' />
         <CustomLinks />
         <div className='m-t-exs' />
         <Privacy />
      </div>
   );
};

export default Mainhub;
