import React from 'react';
import PropTypes from 'prop-types';
import AutomationItem from 'components/modules/automation/AutomationItem';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import './index.scss';


const AutomationContent = ({
   automations, handleDeleteAutomation, goTo, handleStatusChange,
}) => {
   return (
      <div className='automation_content'>
         <ItemWrapper>
            <div className='automation_table_header'>
               <div>
                  <Text
                     type={ textType.normal }
                     size={ textSizes.extraSmall }
                     inner='Automations Name'
                     color='#A9A8A8'
                  />
               </div>
               <div>
                  <Text
                     type={ textType.normal }
                     size={ textSizes.extraSmall }
                     inner='Date'
                     color='#A9A8A8'
                  />
               </div>
               <div>
                  <Text
                     type={ textType.normal }
                     size={ textSizes.extraSmall }
                     inner='Draft/Active'
                     color='#A9A8A8'
                  />
               </div>
               <div>
                  <Text
                     type={ textType.normal }
                     size={ textSizes.extraSmall }
                     inner='Actions'
                     color='#A9A8A8'
                  />
               </div>
            </div>
            {automations && automations.map(automation => {
               return (
                  <AutomationItem
                     key={ automation.id }
                     automation={ automation }
                     handleDeleteAutomation={ handleDeleteAutomation }
                     goTo={ goTo }
                     handleStatusChange={ handleStatusChange }
                  />
               );
            })}
         </ItemWrapper>
      </div>

   );
};

AutomationContent.propTypes = {
   automations: PropTypes.array,
   handleDeleteAutomation: PropTypes.func,
   goTo: PropTypes.func,
   handleStatusChange: PropTypes.func,
};

export default AutomationContent;
