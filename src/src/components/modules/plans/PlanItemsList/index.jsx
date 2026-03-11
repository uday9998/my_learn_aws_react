import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import PlanItem from 'components/elements/plans/PlanItem';
import checkmark from 'assets/images/plans/checkmark.svg';

const PlanItemsList = () => {
   return (
      <SelectedWrapper hasShadow>
         <div className='planItemsList'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='All Plans Include These Core Features:'
            />
            <table className='planItemsList__table'>
               <tbody>
                  <tr>
                     <td><PlanItem title='Create Certificates' icon={ checkmark } /></td>
                     <td><PlanItem title='Unlimited Emails' icon={ checkmark } /></td>
                     <td><PlanItem title='Powerful Automations' icon={ checkmark } /></td>
                  </tr>
                  <tr>
                     <td><PlanItem title='Landing Page Builder' icon={ checkmark } /></td>
                     <td><PlanItem title='Unlimited & Secure Cloud Hosting' icon={ checkmark } /></td>
                     <td><PlanItem title='Unlimited Video Hosting' icon={ checkmark } /></td>
                  </tr>
                  <tr>
                     <td><PlanItem title='99.9% uptime' icon={ checkmark } /></td>
                     <td><PlanItem title='Quiz Feature' icon={ checkmark } /></td>
                     <td><PlanItem title='Checkout Pages' icon={ checkmark } /></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </SelectedWrapper>
   );
};

export default PlanItemsList;
