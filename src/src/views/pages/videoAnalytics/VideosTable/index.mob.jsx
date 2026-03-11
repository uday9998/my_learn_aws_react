import React from 'react';
import VideosTableCard from 'components/modules/videoAnalytics/VideosTableCard/index.mob';
import PagePagination from 'components/elements/videoAnalytics/PagePagination';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const VideosTable = () => {
   return (
      <div className='mob-videosTable w-full'>
         <VideosTableCard />
         <div className='m-t-exl m-b-exl flex justify-center'>
            <PagePagination />
         </div>
         <BaseButton
            size={ btnSize.full }
            text='Export'
         />
         <div className='m-t-m' />
         <BaseButton
            size={ btnSize.full }
            text='Print'
         />
      </div>
   );
};

export default VideosTable;
