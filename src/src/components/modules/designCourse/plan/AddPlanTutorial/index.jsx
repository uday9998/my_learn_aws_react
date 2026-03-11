import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
// import gif from 'assets/images/add-section.gif';
import img from 'assets/images/plans.gif';

const AddPlanTutorial = () => {
   return (
      <ItemWrapper>
         <div className='addPlanTutorial'>
            <div className='addPlanTutorial__text'>
               <div className='text-center'>
                  <Text
                     type={ textType.bold }
                     size={ textSize.medium }
                     inner='It’s Time To Add Your Own Plan'
                  />
               </div>
               <div className='m-t-exs text-center'>
                  <Text
                     type={ textType.regular }
                     size={ textSize.extraSmall }
                     inner={ ['Now click to the left to get started adding a plan. Choose from Free, One Time Or Subscription option.'] }
                  />
               </div>
            </div>
            <div className='w-full'>
               <img className='' src={ img } alt='gif' width='100%' />
            </div>
         </div>
      </ItemWrapper>
   );
};

export default AddPlanTutorial;
