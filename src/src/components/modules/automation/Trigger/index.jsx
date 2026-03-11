import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Card from 'components/modules/automation/Card';
import Text, { TYPES as textType, SIZES as textSizes } from 'components/elements/TextNew';

const Trigger = ({
   addTriggerData,
   addTrigger,
}) => {
   return (
      <div className='Trigger'>
         <div className='title'>
            <Text
               type={ textType.regularDefault }
               size={ textSizes.small }
               inner='Add Trigger'
            />
         </div>
         {
            addTriggerData && addTriggerData.map(data => {
               return (
                  <div
                     key={ data.id }
                     role='presentation'
                     onClick={ () => addTrigger(data) }
                  >
                     <Card
                        icon={ data.icon }
                        title={ data.title }
                        content={ data.content }
                     />
                  </div>
               );
            })
         }
      </div>
   );
};

Trigger.propTypes = {
   addTrigger: PropTypes.func,
   addTriggerData: PropTypes.array,
};

export default Trigger;
