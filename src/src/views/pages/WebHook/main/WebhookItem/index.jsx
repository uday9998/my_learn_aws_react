import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import './index.scss';
import DropTriggle from 'components/elements/newDropTriggle';

const WebhookItem = ({
   webhook, onLogs, onDelete, onEdit,
}) => {
   return (
      <tr className='webhookItem__row'>
         <td>
            <Text
               inner={ webhook.name || '-' }
               type={ textType.regularDefault }
               size={ textSize.small }
            />
         </td>
         <td>
            <Text
               inner={ webhook.url || '-' }
               type={ textType.regularDefault }
               size={ textSize.small }
            />
         </td>
         <td>
            <Text
               inner={ webhook.event_triggers || '-' }
               type={ textType.regularDefault }
               size={ textSize.small }
            />
         </td>
         <td className={ `webhookItem__row-1 webhookItem__row__${ webhook.status }` }>
            <Text
               inner={ webhook.status || '-' }
               type={ textType.regularDefault }
               size={ textSize.small }
            />
         </td>
         <td className='webhookItem__row-3'>
            <Text
               inner={ webhook.number_of_triggers || '-' }
               type={ textType.regularDefault }
               size={ textSize.small }
            />
         </td>
         <td className='webhookItem__row-2'>
            <DropTriggle options={ [
               {
                  trash: false, iconName: 'LogWebhookSettingsM', name: 'See all logs', onClick: () => onLogs(),
               },
               {
                  trash: false, iconName: 'EditSettingsM', name: 'Edit', onClick: () => onEdit(),
               },
               {
                  trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => onDelete(),
               },
            ] }
            />
         </td>
      </tr>
   );
};

WebhookItem.propTypes = {
   webhook: PropTypes.object,
   onLogs: PropTypes.func,
   onDelete: PropTypes.func,
   onEdit: PropTypes.func,
};

export default WebhookItem;
