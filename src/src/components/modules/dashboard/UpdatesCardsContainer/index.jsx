import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as textSize, TYPE as textType } from 'components/elements/Text';
import UpdatesCard from 'components/elements/dashboard/UpdatesCard';

const UpdatesCardsContainer = ({ data }) => {
   return (
      <div className='updatesCards'>
         <div className='updatesCards__header'>
            <Text
               size={ textSize.large }
               type={ textType.bold }
               inner='Updates From Miestro'
            />
         </div>
         <div className='updatesCards__content'>
            {
               data && data.map((item) => {
                  return (
                     <UpdatesCard
                        key={ item.id }
                        title={ item.title }
                        imageSrc={ item.feature_image }
                        text={ item.excerpt }
                        link={ item.url }
                     />
                  );
               })
            }
         </div>
      </div>
   );
};
UpdatesCardsContainer.propTypes = {
   data: PropTypes.array,
};

export default UpdatesCardsContainer;
