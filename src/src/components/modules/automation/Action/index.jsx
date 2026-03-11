import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Card from 'components/modules/automation/Card';
import Text, { TYPES as textType, SIZES as textSizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';

const Action = ({
   actionData,
   addAction,
   timeingData,
   logicData,
}) => {
   return (
      <div className='Action'>
         <div className='Action-title'>
            <Text
               type={ textType.regularDefault }
               size={ textSizes.small }
               inner='Add Action'
            />
         </div>
         {
            actionData && actionData.map(data => {
               return (
                  <div
                     key={ data.id }
                     role='presentation'
                     className='m-t-m '
                     onClick={ () => addAction(data.type, data.id) }
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
         <div className='m-t-exl'> </div>
         <div className='Action-title'>
            <Text
               type={ textType.regularDefault }
               size={ textSizes.small }
               inner='Timing'
            />
         </div>
         {
            timeingData && timeingData.map(data => {
               return (
                  <div
                     key={ data.id }
                     role='presentation'
                     className='m-t-m '
                     onClick={ () => addAction(data.type) }
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
         <div className='m-t-exl'> </div>
         <div className='Action-title'>
            <Text
               type={ textType.regularDefault }
               size={ textSizes.small }
               inner='Logic'
            />
         </div>
         {
            logicData && logicData.map(data => {
               return (
                  <div
                     key={ data.id }
                     role='presentation'
                     className='m-t-m '
                     onClick={ () => addAction(data.type) }
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

Action.propTypes = {
   addAction: PropTypes.func,
   actionData: PropTypes.array,
   timeingData: PropTypes.array,
   logicData: PropTypes.array,
};

export default Action;
